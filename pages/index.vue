<template>
  <v-app dark>
    <v-app-bar clipped-right fixed app>
      <v-toolbar-title>
        {{ text.title }}
      </v-toolbar-title>
      <v-spacer />
      <DLLight />
      <v-btn icon to="/center">
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <v-card flat>
          <v-card-title class="d-flex justify-center">
            <DLLogo />
          </v-card-title>

          <v-card-title class="text-h2 d-flex justify-center">
            {{ text.title }}
          </v-card-title>

          <v-card-text class="text-h5 font-weight-light d-flex justify-center">
            <v-sheet max-width="700" class="text-center">
              {{ text.desc }}
            </v-sheet>
          </v-card-text>
          <v-card-actions class="d-flex justify-center">
            <v-btn to="/center" outlined x-large color="primary">
              快速开始
            </v-btn>
            <v-btn
              href="https://github.com/Duplex-Learn/DL-WebAPP"
              outlined
              x-large
              color="primary"
            >
              GitHub
            </v-btn>
            <v-btn to="/center" outlined x-large color="amber"> 捐助 </v-btn>
          </v-card-actions>
        </v-card>
        <DLProjects />
      </v-container>
    </v-main>
    <!-- Footer -->
    <DLFooter />
  </v-app>
</template>

<script>
export default {
  name: 'IndexPage',
  data() {
    return {
      text: {
        title: 'Duplex Learn',
        desc: 'Duplex Learn 是一个免费、开源的计算机知识学习库。利用引导式学习方案，理论 + 实践相结合。内容完全开源，人人可创建并维护您的课程。一切都触手可及。',
      },
    }
  },
}
</script>
