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
                <DLLogo :size="180" />
              </v-card-title>

              <v-card-title class="text-h2 d-flex justify-center">
                {{ text.title }}
              </v-card-title>

              <v-card-title
                class="text-subtitle-1 font-italic d-flex justify-center"
              >
                {{ text.subtitle }}
              </v-card-title>
              <template v-if="!finish">
                <v-card-text>
                  <!-- From -->
                  <v-form ref="form">
                    <!-- E-mail -->
                    <v-text-field
                      v-model="form.email"
                      :error-messages="emailErrors"
                      :label="text.email"
                      required
                      @input="$v.form.email.$touch()"
                      @blur="$v.form.email.$touch()"
                    ></v-text-field>

                    <!-- Password -->
                    <v-text-field
                      v-model="form.password"
                      :error-messages="passwordErrors"
                      :label="text.password"
                      type="password"
                      required
                      @input="$v.form.password.$touch()"
                      @blur="$v.form.password.$touch()"
                    ></v-text-field>

                    <!-- Password Again -->
                    <v-text-field
                      v-model="form.passwordAgain"
                      :error-messages="passwordAgainErrors"
                      :label="text.passwordAgain"
                      type="password"
                      required
                      @input="$v.form.passwordAgain.$touch()"
                      @blur="$v.form.passwordAgain.$touch()"
                    ></v-text-field>

                    <!-- UUID -->
                    <v-text-field
                      v-if="!preReg"
                      v-model="form.uuid"
                      :label="text.uuid"
                      required
                    ></v-text-field>

                    <!-- Checkbox -->
                    <v-checkbox
                      v-model="form.checkbox"
                      :error-messages="checkboxErrors"
                      :label="text.agree"
                      required
                      @change="$v.form.checkbox.$touch()"
                      @blur="$v.form.checkbox.$touch()"
                    ></v-checkbox>
                    <div>
                      <v-chip
                        v-for="agreement in agreements"
                        :key="agreement.title"
                        class="ma-2"
                        :href="agreement.href"
                      >
                        {{ agreement.title }}
                      </v-chip>
                    </div>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <!-- Button -->
                  <v-btn
                    block
                    :loading="loading"
                    :disabled="loading || $v.$invalid"
                    color="primary"
                    @click="submit"
                  >
                    {{ text.submit }}
                  </v-btn>
                </v-card-actions>
                <v-card-actions>
                  <!-- Link -->
                  <v-btn text to="/login"> {{ text.login }} </v-btn>
                </v-card-actions>
              </template>

              <!-- Welcome -->
              <v-card-title v-if="finish" class="text-h6 d-flex justify-center">
                <v-icon size="50" color="primary" left>mdi-check</v-icon>
                {{ text.welcome }}
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
import { required, email, sameAs } from 'vuelidate/lib/validators'

export default {
  name: 'SignupPage',
  mixins: [validationMixin],
  validations: {
    form: {
      email: { required, email },
      password: { required },
      passwordAgain: { sameAsPassword: sameAs('password') },
      checkbox: {
        checked(val) {
          return val
        },
      },
    },
  },
  data() {
    return {
      text: {
        title: '注册',
        subtitle: '欢迎来到 Duplex Learn',
        email: '电子邮箱',
        password: '密码',
        passwordAgain: '确认密码',
        uuid: '验证码',
        submit: '立即注册',
        login: '登录',
        agree: '我同意下列协议',
        welcome: '注册成功，即将前往登录页面',
      },
      agreements: [
        {
          title: '《Duplex Learn 用户协议》',
          href: '#',
        },
      ],
      form: {
        email: '',
        password: '',
        passwordAgain: '',
        uuid: '',
        checkbox: false,
      },
      loading: false,
      preReg: true,
      finish: false,
    }
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
            this.text.submit = '继续注册'
          })
          .catch(() => {
            this.$refs.snackbar.pushError('注册失败，发生了未知错误')
          })
          .finally(() => {
            this.loading = false
          })
      } else {
        this.$axios
          .post('/user', {
            email: this.form.email,
            password: this.form.password,
            uuid: this.form.uuid,
          })
          .then(() => {
            this.finish = true
            setTimeout(() => {
              this.$router.push('/login')
            }, 2000)
          })
          .catch(() => {
            this.$refs.snackbar.pushError('注册失败，发生了未知错误')
          })
          .finally(() => {
            this.loading = false
          })
      }
    },
  },
}
</script>
