<template>
  <v-app>
    <!-- App Bar -->
    <v-app-bar fixed app>
      <v-btn icon @click="$router.go(-1)">
        <v-icon> mdi-chevron-left </v-icon>
      </v-btn>
      <v-toolbar-title> Duplex Learn 协议与帮助 </v-toolbar-title>
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

          <v-card-title class="text-h2 d-flex justify-center text-center">
            Duplex Learn 协议与帮助
          </v-card-title>

          <v-card-text class="text-h5 font-weight-light d-flex justify-center">
            <v-sheet max-width="700" class="text-center">
              此页面作为保留页面待完善。
            </v-sheet>
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
  name: 'AgreementPage',
  head: {
    title: '协议与帮助',
    meta: [
      {
        name: 'description',
        content: 'Duplex Learn 协议与帮助',
      },
    ],
  },
}
</script>
