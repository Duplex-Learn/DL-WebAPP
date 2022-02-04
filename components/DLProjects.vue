<template>
  <v-card class="mx-auto my-5">
    <v-card-title>
      <v-icon left>mdi-history</v-icon>
      {{ text.title }}
    </v-card-title>

    <v-card-text>
      <v-row>
        <v-col md="6" sm="12" v-for="project in projects" :key="project.id">
          <DLProjectCard :id="project.id" />
        </v-col>
      </v-row>
    </v-card-text>

    <v-card-actions class="d-flex justify-center">
      <div class="text-center">
        <v-pagination v-model="page" :length="totalPages"></v-pagination>
      </div>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'DLProjects',
  data() {
    return {
      text: {
        title: '最新的项目',
      },
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
