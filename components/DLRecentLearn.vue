<template>
  <v-card class="mx-auto my-5">
    <v-card-title>
      <v-icon left>mdi-history</v-icon>
      最近学习
    </v-card-title>

    <v-card-text>
      <v-row>
        <v-col cols="6"> <DLTutorialItem /></v-col>
        <v-col cols="6"> <DLTutorialItem /></v-col>
        <v-col cols="6"> <DLTutorialItem /></v-col>
        <v-col cols="6"> <DLTutorialItem /></v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'DLRecentLearn',
}
</script>
