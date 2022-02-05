<template>
  <!-- Loading -->
  <v-skeleton-loader v-if="$fetchState.pending" type="card"></v-skeleton-loader>

  <!-- Error -->
  <v-card v-else-if="$fetchState.error">
    <v-card-title class="text-h3"> 加载失败 </v-card-title>
    <v-divider></v-divider>
    <v-card-text class="text-body-1 text--primary">
      加载失败，请检查您的网络
    </v-card-text>
  </v-card>

  <!-- Card -->
  <v-card v-else class="my-10 pa-5 rounded-tl-xl rounded-br-xl" elevation="5">
    <v-card-title class="text-h3">
      {{ name }}
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text class="text-body-1 text--primary" v-html="content">
    </v-card-text>
  </v-card>
</template>

<script>
import { marked } from 'marked'
export default {
  name: 'DLStep',
  props: {
    id: {
      type: Number,
      default: 0,
    },
    slug: {
      type: String,
      default: '',
    },
    s_slug: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      content: '',
    }
  },
  async fetch() {
    await this.$axios
      .get(`/project/${this.id}/classes/${this.slug}/steps/${this.s_slug}`, {
        headers: {
          Authorization: 'Bearer ' + this.$store.state.jwt,
        },
      })
      .then((res) => {
        this.content = marked.parse(res.data)
      })
  },
}
</script>
