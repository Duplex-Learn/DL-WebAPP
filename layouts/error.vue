<template>
  <v-app>
    <!-- App Bar -->
    <v-app-bar fixed app>
      <v-btn icon @click="$router.go(-1)">
        <v-icon> mdi-chevron-left </v-icon>
      </v-btn>
      <v-toolbar-title> Duplex Learn </v-toolbar-title>
      <v-spacer />
      <DLLight />
      <v-btn icon to="/center" nuxt>
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- Main -->
    <v-main>
      <v-container>
        <v-card flat>
          <v-card-title class="d-flex justify-center">
            <v-icon size="128">mdi-alert-circle</v-icon>
          </v-card-title>
          <v-card-title class="d-flex justify-center text-center">
            不好，出现了一些错误
          </v-card-title>
          <v-card-title class="d-flex justify-center text-center">
            <span>错误码：</span>
            {{ error.statusCode }}
            <span>，错误原因：</span>
            {{ error.message }}
            <span>，路径：</span>
            {{ error.path }}
          </v-card-title>
        </v-card>
      </v-container>
    </v-main>
    <!-- Footer -->
    <DLFooter />
  </v-app>
</template>

<script>
export default {
  name: 'EmptyLayout',
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred',
    }
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title,
    }
  },
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
