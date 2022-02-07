<template>
  <!-- Loading -->
  <v-skeleton-loader v-if="$fetchState.pending" type="card"></v-skeleton-loader>

  <!-- Error -->
  <v-card v-else-if="$fetchState.error">
    <v-card-title class="text-h3 my-10"> 加载失败 </v-card-title>
    <v-divider></v-divider>
    <v-card-text class="text-body-1 text--primary">
      加载失败，请检查您的网络
    </v-card-text>
  </v-card>

  <!-- Card -->
  <v-card v-else class="my-10 pa-5 rounded-tl-xl rounded-br-xl" elevation="5">
    <a class="anchor" :name="stepSlug" />
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
import createRenderer from '~/utils/renderer'
export default {
  name: 'DLStep',
  props: {
    slug: {
      type: String,
      default: '',
    },
    classSlug: {
      type: String,
      default: '',
    },
    stepSlug: {
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
    const data = {}
    await this.$axios
      .get(`/project/${this.slug}/`, {
        headers: {
          Authorization: 'Bearer ' + this.$store.state.jwt,
        },
      })
      .then((res) => {
        data.project = res.data
      })
    await this.$axios
      .get(
        `/project/${this.slug}/classes/${this.classSlug}/steps/${this.stepSlug}`,
        {
          headers: {
            Authorization: 'Bearer ' + this.$store.state.jwt,
          },
        }
      )
      .then((res) => {
        const renderer = createRenderer(data.project.url)
        marked.use({ renderer })
        this.content = marked.parse(res.data)
      })
  },
}
</script>

<style scoped>
.anchor {
  position: relative;
  top: -100px;
}
</style>
