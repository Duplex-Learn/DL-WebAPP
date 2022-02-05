<template>
  <!-- Loading -->
  <v-skeleton-loader v-if="$fetchState.pending" type="card"></v-skeleton-loader>

  <!-- Error -->
  <v-card v-else-if="$fetchState.error">
    <v-img
      class="white--text align-end"
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
      height="200px"
    >
      <v-card-title> 加载失败，请检查您的网络 </v-card-title>
    </v-img>

    <v-card-actions>
      <v-btn text disabled> 开始学习 </v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>

  <!-- Card -->
  <v-card v-else>
    <v-img
      :src="meta.logo"
      class="white--text align-end"
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
      height="200px"
    >
      <v-card-title>
        {{ meta.name }}
      </v-card-title>
    </v-img>

    <v-card-actions>
      <v-btn text :to="`/project/${pid}/overview`" nuxt> 开始学习 </v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'DLProjectCard',
  props: {
    id: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      meta: {},
      pid: this.id,
    }
  },
  async fetch() {
    await this.$axios
      .get(`/project/${this.pid}/meta`, {
        headers: {
          Authorization: 'Bearer ' + this.$store.state.jwt,
        },
      })
      .then((res) => {
        this.meta = res.data
      })
  },
  methods: {
    refresh(id) {
      this.pid = id
      this.$fetch()
    },
  },
}
</script>
