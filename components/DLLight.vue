<template>
  <v-btn icon @click="change">
    <v-icon>
      {{ this.$vuetify.theme.dark ? 'mdi-brightness-4' : 'mdi-brightness-7' }}
    </v-icon>
  </v-btn>
</template>

<script>
export default {
  name: 'DLLight',
  methods: {
    change() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
    },
  },
}
</script>
