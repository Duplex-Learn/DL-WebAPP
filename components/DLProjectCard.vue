<template>
  <v-card>
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
      <v-btn text :to="`/project/${this.pid}/meta`"> {{ text.start }} </v-btn>
      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-bookmark</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-share-variant</v-icon>
      </v-btn>
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
  data() {
    return {
      meta: {},
      pid: this.id,
      text: {
        start: '开始学习',
      },
    }
  },
  methods: {
    refresh(id) {
      this.pid = id
      console.log(this.pid)
      this.$fetch()
    },
  },
}
</script>
