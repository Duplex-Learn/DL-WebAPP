<template>
  <v-card class="mx-auto my-5">
    <!-- Loading -->
    <v-card-title v-if="$fetchState.pending" class="d-flex justify-center">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </v-card-title>

    <!-- Error -->
    <v-card-title v-else-if="$fetchState.error">
      <v-alert dense outlined type="error"> 加载失败，请检查您的网络 </v-alert>
    </v-card-title>

    <!-- Profile -->
    <template v-else>
      <v-card-title>
        <v-icon left>mdi-history</v-icon>
        最新的项目
      </v-card-title>

      <v-card-text>
        <v-row>
          <v-col v-for="project in projects" :key="project.id" md="6" sm="12">
            <DLProjectCard :slug="project.slug" />
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions class="d-flex justify-center">
        <div class="text-center">
          <v-pagination v-model="page" :length="totalPages"></v-pagination>
        </div>
      </v-card-actions>
    </template>
  </v-card>
</template>

<script>
export default {
  name: 'DLProjects',
  data() {
    return {
      page: 1,
      totalPages: 1,
      projects: [],
    }
  },
  async fetch() {
    await this.$axios
      .get('/projects/' + (this.page - 1), {
        headers: {
          Authorization: 'Bearer ' + this.$store.state.jwt,
        },
      })
      .then((res) => {
        this.totalPages = res.data.totalPages
        this.projects = res.data.projects
      })
  },
  watch: {
    page(val) {
      this.$fetch()
    },
  },
}
</script>
