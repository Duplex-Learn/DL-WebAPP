<template>
  <v-card class="mx-auto my-5">
    <v-card-title>
      <v-icon left>mdi-history</v-icon>
      最近学习
    </v-card-title>

    <v-card-text>
      <v-row>
        <v-col md="6" sm="12" v-for="(item, i) in recent" :key="`${i}-recent`">
          <DLProjectCard :slug="item" />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'DLRecentLearn',
  data() {
    return {
      recent: [],
    }
  },
  mounted() {
    if (window.localStorage.getItem('recentLearn')) {
      this.recent = window.localStorage.getItem('recentLearn').split(',')
    }
  },
}
</script>
