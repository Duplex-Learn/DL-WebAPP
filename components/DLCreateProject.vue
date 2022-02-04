<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-list-item v-bind="attrs" v-on="on">
        <v-list-item-icon>
          <v-icon>mdi-book-plus-multiple</v-icon>
        </v-list-item-icon>
        <v-list-item-title>
          {{ text.createProject }}
        </v-list-item-title>
      </v-list-item>
    </template>
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>{{ text.title }}</v-toolbar-title>
      </v-toolbar>

      <v-stepper v-model="e1">
        <v-stepper-header>
          <v-stepper-step :complete="e1 > 1" step="1">
            {{ text.step1Title }}
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step :complete="e1 > 2" step="2">
            {{ text.step2Title }}
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step step="3">
            {{ text.step3Title }}
          </v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content step="1">
            <v-card class="mb-12">
              <v-card-title> {{ text.step1Title }} </v-card-title>
              <v-divider />
              <v-card-text class="text-h6 white--text">
                <v-alert border="top" colored-border type="info" elevation="2">
                  {{ text.agreement }}
                </v-alert>
              </v-card-text>
            </v-card>

            <v-btn color="primary" @click="e1 = 2"> {{ text.agree }} </v-btn>
          </v-stepper-content>

          <v-stepper-content step="2">
            <v-card class="mb-12">
              <v-card-title> {{ text.step2Title }} </v-card-title>
              <v-divider />
              <v-card-text>
                <v-alert
                  border="top"
                  colored-border
                  type="warning"
                  elevation="2"
                >
                  {{ text.warning }}
                </v-alert>
              </v-card-text>
              <v-card-text>
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-text-field
                    v-model="git"
                    :label="text.git"
                    prepend-icon="mdi-git"
                    required
                  ></v-text-field>
                </v-form>
              </v-card-text>
            </v-card>

            <v-btn color="primary" @click="doVerify" :loading="loading">
              {{ text.import }}
            </v-btn>
          </v-stepper-content>

          <v-stepper-content step="3">
            <v-card class="mb-12">
              <v-card-title> {{ text.step3Title }} </v-card-title>
              <v-divider />
              <v-card-text>
                <DLProjectCard :id="id" ref="pcard" />
              </v-card-text>
            </v-card>

            <v-btn color="primary" @click="finish"> {{ text.finish }} </v-btn>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-card>
    <!-- SnackBar -->
    <DLSnackBar ref="snackbar" />
  </v-dialog>
</template>

<script>
export default {
  name: 'DLCreateProject',
  data() {
    return {
      text: {
        title: '从 Git 上导入您的项目到服务器',
        createProject: '创建项目',
        step1Title: '同意协议',
        step2Title: '导入 Git 仓库到服务器',
        step3Title: '查看您的项目',
        agree: '我同意',
        import: '开始导入',
        finish: '完成',
        git: '请输入您仓库的 Git 地址',
        agreement:
          '用户提交须知，请勿提交任何非法内容（包括但不限于反动、色情、政治敏感等信息），请勿重复提交仓库，您的仓库必须符合标准才能提交',
        warning:
          '本网站并不提供任何数据，而是通过用户直接访问 git 仓库，故建议您使用码云等国内第三方 Git 服务以提高用户的体验，您的仓库地址应以 / 结尾，并且确保您的主分支是 master 分支',
      },
      dialog: false,
      e1: 1,
      git: '',
      valid: true,
      loading: false,
      id: 0,
    }
  },
  methods: {
    doVerify() {
      console.log(this.git)
      this.loading = true
      this.$axios
        .post(
          '/project',
          {
            git: this.git,
          },
          {
            headers: {
              Authorization: 'Bearer ' + this.$store.state.jwt,
            },
          }
        )
        .then((res) => {
          this.e1 = 3
          this.id = res.data.id
          this.$refs.pcard.refresh(this.id)
        })
        .catch((err) => {
          console.log(err)
          this.$refs.snackbar.pushError('导入失败，请确保您的仓库符合标准')
        })
        .finally(() => {
          this.loading = false
        })
    },
    finish() {
      this.dialog = false
      this.e1 = 1
    },
  },
}
</script>
