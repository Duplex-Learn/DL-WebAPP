<template>
  <v-app dark>
    <v-main>
      <v-container>
        <v-row justify="center" align="center">
          <v-col cols="12" sm="8" md="6">
            <!-- Signup UI -->
            <v-card class="pa-4">
              <!-- Logo -->
              <v-card-title class="logo py-4 d-flex justify-center">
                <img src="/logo.svg" width="200" />
              </v-card-title>

              <v-card-title class="text-h2 d-flex justify-center">
                注册
              </v-card-title>

              <v-card-title
                class="text-subtitle-1 font-italic d-flex justify-center"
              >
                欢迎来到 Duplex Learn
              </v-card-title>
              <template v-if="!finish">
                <v-card-text>
                  <!-- From -->
                  <v-form ref="form">
                    <!-- E-mail -->
                    <v-text-field
                      v-model="form.email"
                      :error-messages="emailErrors"
                      label="电子邮箱"
                      prepend-icon="mdi-email"
                      required
                      @input="$v.form.email.$touch()"
                      @blur="$v.form.email.$touch()"
                    ></v-text-field>

                    <!-- Password -->
                    <v-text-field
                      v-model="form.password"
                      :error-messages="passwordErrors"
                      label="密码"
                      prepend-icon="mdi-key"
                      type="password"
                      required
                      @input="$v.form.password.$touch()"
                      @blur="$v.form.password.$touch()"
                    ></v-text-field>

                    <!-- Password Again -->
                    <v-text-field
                      v-model="form.passwordAgain"
                      :error-messages="passwordAgainErrors"
                      label="确认密码"
                      type="password"
                      prepend-icon="mdi-check"
                      required
                      @input="$v.form.passwordAgain.$touch()"
                      @blur="$v.form.passwordAgain.$touch()"
                    ></v-text-field>

                    <!-- Captcha -->
                    <v-scroll-y-transition>
                      <v-text-field
                        v-if="!preReg"
                        v-model="form.captcha"
                        prepend-icon="mdi-check-decagram"
                        label="验证码"
                        required
                      ></v-text-field>
                    </v-scroll-y-transition>

                    <!-- Checkbox -->
                    <v-checkbox
                      v-model="form.checkbox"
                      :error-messages="checkboxErrors"
                      label="我同意下列协议"
                      required
                      @change="$v.form.checkbox.$touch()"
                      @blur="$v.form.checkbox.$touch()"
                    ></v-checkbox>

                    <!-- Agreement -->
                    <div>
                      <v-chip class="ma-2" to="/agreement" nuxt>
                        《Duplex Learn 用户协议》
                      </v-chip>
                    </div>
                  </v-form>
                </v-card-text>

                <!-- Submit -->
                <v-card-actions>
                  <v-btn
                    block
                    :loading="loading"
                    :disabled="loading || $v.$invalid"
                    color="primary"
                    @click="submit"
                  >
                    立即注册
                  </v-btn>
                </v-card-actions>

                <!-- Link -->
                <v-card-actions>
                  <v-btn text to="/login" nuxt> 登录 </v-btn>
                </v-card-actions>
              </template>

              <!-- Welcome -->
              <v-card-title v-if="finish" class="text-h6 d-flex justify-center">
                <v-icon size="50" color="primary" left>mdi-check</v-icon>
                <span>注册成功，即将前往登录页面</span>
              </v-card-title>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <!-- Footer -->
    <DLFooter />

    <!-- SnackBar -->
    <DLSnackBar ref="snackbar" />
  </v-app>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, email, sameAs, minLength } from 'vuelidate/lib/validators'

export default {
  name: 'SignupPage',
  mixins: [validationMixin],
  data() {
    return {
      form: {
        email: '',
        password: '',
        passwordAgain: '',
        captcha: '',
        checkbox: false,
      },
      loading: false,
      preReg: true,
      finish: false,
    }
  },
  head: {
    title: '注册',
    meta: [
      {
        name: 'description',
        content: 'Duplex Learn 注册',
      },
    ],
  },
  validations: {
    form: {
      email: { required, email },
      password: { required, minLength: minLength(6) },
      passwordAgain: { sameAsPassword: sameAs('password') },
      checkbox: {
        checked(val) {
          return val
        },
      },
    },
  },
  computed: {
    emailErrors() {
      const errors = []
      if (!this.$v.form.email.$dirty) return errors
      !this.$v.form.email.email && errors.push('请输入合法的电子邮箱')
      !this.$v.form.email.required && errors.push('电子邮箱不能为空')
      return errors
    },
    passwordErrors() {
      const errors = []
      if (!this.$v.form.password.$dirty) return errors
      !this.$v.form.password.required && errors.push('密码不能为空')
      !this.$v.form.password.minLength && errors.push('密码最少为6位')
      return errors
    },
    passwordAgainErrors() {
      const errors = []
      if (!this.$v.form.passwordAgain.$dirty) return errors
      !this.$v.form.passwordAgain.sameAsPassword &&
        errors.push('两次输入的密码不同')
      return errors
    },
    checkboxErrors() {
      const errors = []
      if (!this.$v.form.checkbox.$dirty) return errors
      !this.$v.form.checkbox.checked && errors.push('你必须同意后才能注册')
      return errors
    },
  },
  methods: {
    submit() {
      this.$v.$touch()
      if (this.$v.$invalid) return
      this.loading = true
      if (this.preReg) {
        this.$axios
          .post('/puser', {
            email: this.form.email,
          })
          .then(() => {
            this.preReg = false
            this.$refs.snackbar.pushInfo(
              '请前往您的邮箱查看您的验证码以继续注册'
            )
          })
          .catch(() => {
            this.$refs.snackbar.pushError('注册失败，请检查您填写的内容')
          })
          .finally(() => {
            this.loading = false
          })
      } else {
        this.$axios
          .post('/user', {
            email: this.form.email,
            password: this.form.password,
            uuid: this.form.captcha,
          })
          .then(() => {
            this.finish = true
            setTimeout(() => {
              this.$router.push('/login')
            }, 2000)
          })
          .catch(() => {
            this.$refs.snackbar.pushError('注册失败，请检查您填写的内容')
          })
          .finally(() => {
            this.loading = false
          })
      }
    },
  },
}
</script>
