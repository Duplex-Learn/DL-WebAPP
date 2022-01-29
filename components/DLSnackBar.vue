<template>
  <v-snackbar
    v-model="snackbar"
    :timeout="timeout"
    :color="`${color} accent-2`"
  >
    {{ errorText }}

    <template #action="{ attrs }">
      <v-btn color="white" text v-bind="attrs" @click="snackbar = false">
        {{ text.close }}
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  name: 'DLSnackBar',
  data() {
    return {
      text: {
        close: '关闭',
      },
      timeout: 2000,
      snackbar: false,
      errorText: '',
      color: 'red',
    }
  },
  methods: {
    pushError(err) {
      this.color = 'red'
      this.errorText = err
      this.snackbar = true
    },
    pushInfo(err) {
      this.color = 'blue'
      this.errorText = err
      this.snackbar = true
    },
  },
}
</script>
