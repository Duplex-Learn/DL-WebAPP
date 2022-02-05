<template>
  <v-app>
    <!-- App Bar -->
    <v-app-bar fixed app>
      <v-toolbar-title> Duplex Learn </v-toolbar-title>
      <v-spacer />
      <DLLight />
      <v-btn icon to="/center" nuxt>
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- Main -->
    <v-main>
      <v-container fluid>
        <!-- Title -->
        <v-card class="my-10" flat>
          <v-card-title class="d-flex justify-center">
            <img src="/logo.svg" width="200" />
          </v-card-title>

          <v-hover v-slot="{ hover }">
            <v-card-title class="text-h2 d-flex justify-center text-center">
              <v-slide-x-transition>
                <span v-show="hover">&lt;</span>
              </v-slide-x-transition>
              <span> Duplex Learn </span>
              <v-slide-x-reverse-transition>
                <span v-show="hover">&nbsp;/&gt;</span>
              </v-slide-x-reverse-transition>
            </v-card-title>
          </v-hover>

          <v-card-text class="text-h5 font-weight-light d-flex justify-center">
            <v-sheet max-width="700" class="text-center">
              Duplex Learn
              是一个免费、开源的计算机知识库，利用引导式学习方案，理论 +
              实践相结合，内容完全开源，人人可创建并维护您的课程，一切都触手可及。
            </v-sheet>
          </v-card-text>

          <v-card-actions class="d-flex justify-center">
            <v-btn to="/center" outlined x-large color="primary">
              <v-icon left>mdi-navigation</v-icon>
              快速开始
            </v-btn>
            <v-btn
              href="https://github.com/Duplex-Learn/"
              outlined
              x-large
              color="primary"
            >
              <v-icon left>mdi-github</v-icon>
              GitHub
            </v-btn>
            <v-btn to="/sponsor" nuxt outlined x-large color="amber">
              <v-icon left>mdi-cash</v-icon>捐助
            </v-btn>
          </v-card-actions>
        </v-card>

        <v-divider />

        <!-- Card 1 -->
        <v-card class="my-10" flat>
          <v-card-title class="text-h4 d-flex justify-center">
            引导式学习方案
          </v-card-title>
          <v-card-subtitle class="text-h6 d-flex justify-center text-center">
            不闻不若闻之，闻之不若见之；见之不若知之，知之不若行之；学至于行而止矣。
          </v-card-subtitle>
          <v-card-text>
            <v-row justify="center">
              <v-col md="4" sm="12">
                <v-card flat>
                  <v-card-title class="d-flex justify-center">
                    <v-icon size="128">mdi-flask</v-icon>
                  </v-card-title>
                  <v-card-text
                    class="text-h6 d-flex justify-center text-center"
                  >
                    课程配合大量的实践，拒绝枯燥无味的文档式教学，让读者从实践中学习，真正地学会知识。
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col md="4" sm="12">
                <v-card flat>
                  <v-card-title class="d-flex justify-center">
                    <v-icon size="128">mdi-book-open-page-variant</v-icon>
                  </v-card-title>
                  <v-card-text
                    class="text-h6 d-flex justify-center text-center"
                  >
                    理论与实际相结合，让读者在知道怎么做的基础上学会为什么这么做，做的知其然，更要做到知其所以然。
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

        <v-divider />

        <!-- Card 2 -->
        <v-card class="my-10" flat>
          <v-card-title class="text-h4 d-flex justify-center">
            完全开源、免费
          </v-card-title>
          <v-card-subtitle class="text-h6 d-flex justify-center text-center">
            人人可参与，我们既是学生又是老师。
          </v-card-subtitle>
          <v-card-text>
            <v-row justify="center">
              <v-col md="4" sm="12">
                <v-card flat>
                  <v-card-title class="d-flex justify-center">
                    <v-icon size="128">mdi-git</v-icon>
                  </v-card-title>
                  <v-card-text
                    class="text-h6 d-flex justify-center text-center"
                  >
                    课程内容完全来源于第三方 Git
                    服务，内容完全开源、免费提供，人人都可参与到创建并维护课程中来，为中国计算机教育助力。
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col md="4" sm="12">
                <v-card flat>
                  <v-card-title class="d-flex justify-center">
                    <v-icon size="128">mdi-account-group</v-icon>
                  </v-card-title>
                  <v-card-text
                    class="text-h6 d-flex justify-center text-center"
                  >
                    强大活跃开源社区支持，您遇到的任何问题都有解答，扫请您学习路上的所有障碍。每个课程都有专门的社区维护，确保课程紧随时代，永不过时。
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

        <v-divider />

        <!-- Card 3 -->
        <v-card class="my-10" flat>
          <v-card-title class="text-h4 d-flex justify-center">
            连接课堂学习与企业开发
          </v-card-title>
          <v-card-subtitle class="text-h6 d-flex justify-center text-center">
            课堂理论与企业开发相结合，拉进理论与实际开发的距离。
          </v-card-subtitle>
          <v-card-text>
            <v-row justify="center">
              <v-col md="4" sm="12">
                <v-card flat>
                  <v-card-title class="d-flex justify-center">
                    <v-icon size="128">mdi-domain</v-icon>
                  </v-card-title>
                  <v-card-text
                    class="text-h6 d-flex justify-center text-center"
                  >
                    提供当今大量企业实际开发过程中所需要的知识，将堂理论与企业开发相结合，拉进理论与实际开发的距离。
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col md="4" sm="12">
                <v-card flat>
                  <v-card-title class="d-flex justify-center">
                    <v-icon size="128">mdi-school</v-icon>
                  </v-card-title>
                  <v-card-text
                    class="text-h6 d-flex justify-center text-center"
                  >
                    我们面向各大高校学生团体，我们也是由各大高校计算机专业学生团体组成，致力于将堂理论与企业开发相结合，实现每一位同学的代码梦想。
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
        <v-divider />

        <v-divider />

        <!-- Card 4 -->
        <v-card class="my-10" flat>
          <v-card-title class="text-h4 d-flex justify-center">
            关于我们
          </v-card-title>
          <v-card-text class="text-h6 d-flex justify-center text-center">
            Duplex Learn
            由各大高校计算机专业学生团体组成的非盈利、开源的计算机知识分享项目，致力于将堂理论与企业开发相结合。
          </v-card-text>

          <v-card-text class="text-h6 d-flex justify-center text-center">
            <v-icon left>mdi-qqchat</v-icon>
            <span>Duplex Learn 总群: 943470867</span>
          </v-card-text>
        </v-card>
        <v-divider />

        <!-- Card 5 -->
        <v-card class="my-10" flat>
          <v-card-title class="text-h4 d-flex justify-center">
            我们的课程
          </v-card-title>
          <v-card-text>
            <DLProjects />
          </v-card-text>
        </v-card>
      </v-container>
    </v-main>
    <!-- Footer -->
    <DLFooter />
  </v-app>
</template>

<script>
export default {
  name: 'IndexPage',
  head: {
    title: 'Duplex Learn 免费、开源的计算机知识库',
    meta: [
      {
        name: 'description',
        content:
          'Duplex Learn 是一个免费、开源的计算机知识库，利用引导式学习方案，理论 + 实践相结合，内容完全开源，人人可创建并维护您的课程，一切都触手可及。',
      },
      {
        name: 'keywords',
        content:
          'Duplex Learn,免费,开源,计算机,学习,知识库,实践,软件开发,计算机教程,计算机企业,高校,计算机专业',
      },
    ],
  },
}
</script>
