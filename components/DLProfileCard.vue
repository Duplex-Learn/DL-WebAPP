<template>
  <v-card class="mx-auto my-5">
    <!-- Loading -->
    <v-card-title v-if="$fetchState.pending" class="d-flex justify-center">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </v-card-title>

    <!-- Error -->
    <v-card-title v-else-if="$fetchState.error">
      <v-alert dense outlined type="error"> {{ text.error }} </v-alert>
    </v-card-title>

    <!-- Profile -->
    <v-card-text v-else>
      <v-list>
        <v-list-item three-line>
          <v-list-item-avatar size="120" color="grey">
            <v-avatar color="primary" size="120">
              <span class="text-h3">
                {{ user.email.substr(0, 2) }}
              </span>
            </v-avatar>
          </v-list-item-avatar>
          <v-list-item-content>
            <div class="text-overline mb-4">{{ text.user }}</div>
            <v-list-item-title class="text-h5 mb-1">
              {{ user.nickname }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ text.uid }} {{ user.id }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider />
      <v-list>
        <v-list-item>
          <v-list-item-icon>
            <v-icon> mdi-domain </v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>
              {{ user.organization || text.none }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ user.position || text.none }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider inset></v-divider>

        <v-list-item>
          <v-list-item-icon>
            <v-icon> mdi-email </v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ user.email }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider inset></v-divider>

        <v-list-item>
          <v-list-item-icon>
            <v-icon> mdi-link </v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{
              user.homeUrl || text.none
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'DLProfileCard',
  data() {
    return {
      text: {
        none: '暂无',
        uid: 'UID:',
        user: '用户',
        error: '加载失败，请检查您的网络',
      },
      user: {
        email: '',
        id: 0,
        nickname: '',
        organization: '',
        position: '',
        homeUrl: '',
        gender: '',
        age: 0,
      },
    }
  },
  async fetch() {
    await this.$axios
      .get('/user', {
        headers: {
          Authorization: 'Bearer ' + this.$store.state.jwt,
        },
      })
      .then((res) => {
        this.user = res.data
      })
  },
}
</script>
