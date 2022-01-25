<template>
  <v-footer app absolute>
    <span class="text-overline">
      &copy; {{ new Date().getFullYear() }} {{ text.title }}
    </span>
  </v-footer>
</template>

<script>
export default {
  name: 'DLFooter',
  data() {
    return {
      text: {
        title: 'Duplex Learn',
      },
    }
  },
}
</script>
