<template>
  <v-card>
    <v-card-title>
      <v-icon size="42" class="mr-4"> mdi-magnify </v-icon>
      <h2 class="text-h4 font-weight-light">
        {{ meta.name }}
      </h2>
    </v-card-title>
    <v-divider />
    <v-card-text>
      {{ meta.overview }}
    </v-card-text>
    <v-card-actions>
      <v-btn
        text
        color="primary"
        :to="`/project/${this.id}/classes/${this.slug}`"
      >
        {{ text.start }}
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
      text: {
        start: '开始学习',
      },
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
