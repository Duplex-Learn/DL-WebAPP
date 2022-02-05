<template>
  <!-- Loading -->
  <v-skeleton-loader v-if="$fetchState.pending" type="card"></v-skeleton-loader>

  <!-- Error -->
  <v-card v-else-if="$fetchState.error">
    <v-card-title>
      <v-icon size="42" class="mr-4"> mdi-book </v-icon>
      <h2 class="text-h4 font-weight-light">加载失败</h2>
    </v-card-title>
    <v-divider />
    <v-card-text> 加载失败，请检查您的网络 </v-card-text>
    <v-card-actions>
      <v-btn text color="primary" disabled> 开始学习 </v-btn>
    </v-card-actions>
  </v-card>

  <!-- Card -->
  <v-card v-else>
    <v-card-title>
      <v-icon size="42" class="mr-4"> mdi-book </v-icon>
      <h2 class="text-h4 font-weight-light">
        {{ meta.name }}
      </h2>
    </v-card-title>
    <v-divider />
    <v-card-text>
      {{ meta.overview }}
    </v-card-text>
    <v-card-actions>
      <v-btn text color="primary" :to="`/project/${id}/classes/${slug}`" nuxt>
        开始学习
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'DLClassCard',
  props: {
    id: {
      type: Number,
      default: 0,
    },
    slug: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      meta: {},
    }
  },
  async fetch() {
    await this.$axios
      .get(`/project/${this.id}/classes/${this.slug}`, {
        headers: {
          Authorization: 'Bearer ' + this.$store.state.jwt,
        },
      })
      .then((res) => {
        this.meta = res.data
      })
  },
}
</script>
