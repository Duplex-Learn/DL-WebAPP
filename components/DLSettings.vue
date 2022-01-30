<template>
  <v-container fluid>
    <v-alert
      border="left"
      colored-border
      prominent
      type="warning"
      elevation="2"
      icon="mdi-cloud-alert"
    >
      {{ text.warning }}
    </v-alert>
    <v-card>
      <v-card-title> {{ text.profile }} </v-card-title>
      <v-divider />
      <v-card-text>
        <form>
          <!-- Email -->
          <v-text-field
            :value="user.email"
            :label="text.email"
            :messages="text.emailWarning"
            prepend-icon="mdi-email"
            disabled
          ></v-text-field>

          <!-- Nickname -->
          <v-text-field
            v-model="user.nickname"
            :label="text.nickname"
            :error-messages="nicknameErrors"
            prepend-icon="mdi-card-account-details"
            required
            @input="$v.user.nickname.$touch()"
            @blur="$v.user.nickname.$touch()"
          ></v-text-field>

          <!-- Organization -->
          <v-text-field
            v-model="user.organization"
            :label="text.organization"
            prepend-icon="mdi-domain"
          >
          </v-text-field>

          <!-- Position -->
          <v-text-field
            v-model="user.position"
            :label="text.position"
            prepend-icon="mdi-briefcase"
          ></v-text-field>

          <!-- Home URL -->
          <v-text-field
            v-model="user.homeUrl"
            :label="text.homeUrl"
            prepend-icon="mdi-link"
          ></v-text-field>

          <!-- Gender -->
          <v-select
            v-model="user.gender"
            :items="genders"
            :label="text.gender"
            prepend-icon="mdi-gender-male-female-variant"
            item-text="text"
            item-value="value"
            required
          ></v-select>

          <!-- Age -->
          <v-text-field
            v-model="user.age"
            class="mt-0 pt-0"
            type="number"
            :label="text.age"
            prepend-icon="mdi-cake"
          ></v-text-field>

          <!-- Submit -->
          <v-btn
            class="mr-4"
            :loading="loading"
            :disabled="loading || $v.$invalid"
            @click="submit"
          >
            {{ text.submit }}
          </v-btn>
        </form>
      </v-card-text>
      <v-divider />

      <v-card-text>
        <v-btn color="red" class="mr-4" block @click="logout">
          {{ text.logout }}
        </v-btn>
      </v-card-text>
    </v-card>

    <!-- SnackBar -->
    <DLSnackBar ref="snackbar" />
  </v-container>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
import Cookie from 'js-cookie'

export default {
  name: 'DLSettings',
  mixins: [validationMixin],

  validations: {
    user: {
      nickname: { required },
    },
  },
  data() {
    return {
      text: {
        warning:
          '云端数据安全警告，此网站为全开源网站，这意味着网站的源代码全部对第三方可见，随时可能发送数据泄漏等情况，请不要在下面的表单中填写任何您的个人敏感、隐私（例如您的真实姓名）等信息，以下信息您完全可以选择不填写，如果您填写了则默认遵守相关协定，下面的信息仅作为后端数据统计，帮助我们改进平台。',
        profile: '个人资料',
        email: '邮箱',
        emailWarning: '您无法修改您的邮箱，邮箱是您账户登录的唯一凭证',
        nickname: '昵称',
        organization: '您所在的组织',
        position: '您所在组织的职位',
        homeUrl: '您的个人主页',
        gender: '性别',
        age: '年龄',
        submit: '提交',
        logout: '退出登录',
      },
      genders: [
        {
          text: '男',
          value: 'MALE',
        },
        {
          text: '女',
          value: 'FEMALE',
        },
        {
          text: '不显示',
          value: null,
        },
      ],
      user: {
        email: '',
        id: 0,
        nickname: '',
        organization: '',
        position: '',
        homeUrl: '',
        gender: '',
        age: 0,
      },
      loading: false,
    }
  },
  async fetch() {
    await this.$axios
      .get('/user', {
        headers: {
          Authorization: 'Bearer ' + this.$store.state.jwt,
        },
      })
      .then((res) => {
        this.user = res.data
      })
  },
  computed: {
    nicknameErrors() {
      const errors = []
      if (!this.$v.user.nickname.$dirty) return errors
      !this.$v.user.nickname.required && errors.push('昵称不能为空')
      return errors
    },
  },

  methods: {
    submit() {
      this.$v.$touch()
      if (this.$v.$invalid) return
      this.loading = true
      this.$axios
        .put('/user', this.user, {
          headers: {
            Authorization: 'Bearer ' + this.$store.state.jwt,
          },
        })
        .then(() => {
          this.$refs.snackbar.pushInfo('修改成功，刷新页面以更新页面')
        })
        .catch(() => {
          this.$refs.snackbar.pushInfo('修改失败，请检查您的网络')
        })
        .finally(() => {
          this.loading = false
        })
    },
    logout() {
      Cookie.remove('jwt')
      location.reload()
    },
  },
}
</script>
