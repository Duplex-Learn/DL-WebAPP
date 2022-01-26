<template>
  <v-card class="mx-auto my-5">
    <v-list>
      <v-list-item three-line>
        <v-list-item-avatar size="120" color="grey">
          <v-img
            src="https://avatars.githubusercontent.com/u/14014235?v=4"
          ></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <div class="text-overline mb-4">用户</div>
          <v-list-item-title class="text-h5 mb-1"> 用户名 </v-list-item-title>
          <v-list-item-subtitle> email </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-divider />
    <v-list>
      <v-list-item>
        <v-list-item-icon>
          <v-icon color="white"> mdi-domain </v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>哈尔滨工程大学</v-list-item-title>
          <v-list-item-subtitle>高校-本科生</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider inset></v-divider>

      <v-list-item>
        <v-list-item-icon>
          <v-icon color="white"> mdi-email </v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>xxxxxx@example.com</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider inset></v-divider>

      <v-list-item>
        <v-list-item-icon>
          <v-icon color="white"> mdi-link </v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>http://www.xxxx.com</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
export default {
  name: 'DLProfileCard',
}
</script>
