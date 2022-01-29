<template>
  <v-app dark>
    <v-main>
      <v-container>
        <v-row justify="center" align="center">
          <v-col cols="12" sm="8" md="6">
            <!-- Login UI -->
            <v-card class="pa-4">
              <v-card-title class="logo py-4 d-flex justify-center">
                <!-- Logo -->
                <DLLogo :size="180" />
              </v-card-title>

              <v-card-title class="text-h2 d-flex justify-center">
                {{ text.title }}
              </v-card-title>

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
                <v-btn text to="/signup"> {{ text.signup }} </v-btn>
                <v-spacer />
                <v-btn text> {{ text.forgot }} </v-btn>
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
import { required, email } from 'vuelidate/lib/validators'
import Cookie from 'js-cookie'

export default {
  name: 'LoginPage',
  middleware: ['jwt'],
  asyncData({ store, redirect }) {
    if (store.state.jwt) {
      redirect('/center')
    }
  },
  mixins: [validationMixin],
  validations: {
    form: {
      email: { required, email },
      password: { required },
    },
  },
  data() {
    return {
      text: {
        title: '登录',
        email: '电子邮箱',
        password: '密码',
        submit: '立即登录',
        signup: '注册',
        forgot: '忘记密码?',
      },
      form: {
        email: '',
        password: '',
      },
      loading: false,
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
          console.log(expiresDate)
          Cookie.set('jwt', jwt, { expires: expiresDate })
          this.$router.push('/center')
        })
        .catch((err) => {
          this.$refs.snackbar.pushError('登录失败，请检查您的账号信息是否正确')
          console.log(err)
        })
        .finally(() => {
          this.loading = false
        })
    },
  },
}
</script>
