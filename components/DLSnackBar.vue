<template>
  <v-snackbar
    v-model="snackbar"
    :timeout="timeout"
    :color="`${color} accent-2`"
  >
    {{ text }}

    <template #action="{ attrs }">
      <v-btn color="white" text v-bind="attrs" @click="snackbar = false">
        关闭
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  name: 'DLSnackBar',
  data() {
    return {
      timeout: 2000,
      snackbar: false,
      text: '',
      color: 'red',
    }
  },
  methods: {
    pushError(msg) {
      this.color = 'red'
      this.text = msg
      this.snackbar = true
    },
    pushInfo(msg) {
      this.color = 'blue'
      this.text = msg
      this.snackbar = true
    },
  },
}
</script>
