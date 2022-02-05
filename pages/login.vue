<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center" align="center">
          <v-col cols="12" sm="8" md="6">
            <!-- Login UI -->
            <v-card class="pa-4">
              <!-- Logo -->
              <v-card-title class="logo py-4 d-flex justify-center">
                <img src="/logo.svg" width="200" />
              </v-card-title>

              <v-card-title class="text-h2 d-flex justify-center">
                登录
              </v-card-title>

              <!-- From -->
              <v-card-text>
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
                  立即登录
                </v-btn>
              </v-card-actions>

              <!-- Link -->
              <v-card-actions>
                <v-btn text to="/signup" nuxt> 注册 </v-btn>
                <v-spacer />
                <v-btn text to="/agreement" nuxt> 忘记密码？ </v-btn>
              </v-card-actions>
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
import { required, email, minLength } from 'vuelidate/lib/validators'
import Cookie from 'js-cookie'

export default {
  name: 'LoginPage',
  mixins: [validationMixin],
  middleware: ['jwt'],
  asyncData({ store, redirect }) {
    if (store.state.jwt) {
      redirect('/center')
    }
  },
  validations: {
    form: {
      email: { required, email },
      password: { required, minLength: minLength(6) },
    },
  },
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
      loading: false,
    }
  },
  head: {
    title: '登录',
    meta: [
      {
        name: 'description',
        content: 'Duplex Learn 登录',
      },
    ],
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
  },
  methods: {
    submit() {
      this.$v.$touch()
      if (this.$v.$invalid) return
      this.loading = true
      this.$axios
        .post('/token', {
          email: this.form.email,
          password: this.form.password,
        })
        .then((res) => {
          // Cookies
          const jwt = res.data.jwt
          const time = JSON.parse(window.atob(jwt.split('.')[1])).exp
          const expiresDate = new Date()
          expiresDate.setTime(time * 1000)
          Cookie.set('jwt', jwt, { expires: expiresDate })
          this.$router.push('/center')
        })
        .catch(() => {
          this.$refs.snackbar.pushError('登录失败，请检查您的账号信息是否正确')
        })
        .finally(() => {
          this.loading = false
        })
    },
  },
}
</script>
