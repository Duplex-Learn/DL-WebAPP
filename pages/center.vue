<template>
  <v-app>
    <v-app-bar app fixed>
      <v-app-bar-title> Duplex Learn 用户中心 </v-app-bar-title>

      <v-spacer></v-spacer>

      <DLLight />
      <v-btn icon to="/" nuxt>
        <v-icon>mdi-home</v-icon>
      </v-btn>
      <v-menu offset-y>
        <template #activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </template>
        <v-list>
          <DLCreateProject />
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-sign-direction-plus</v-icon>
            </v-list-item-icon>
            <v-list-item-title>创建路线图</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <template #extension>
        <v-tabs v-model="tab" align-with-title>
          <v-tab v-for="item in tabs" :key="item.title">
            <v-icon left>{{ item.icon }}</v-icon>
            {{ item.title }}
          </v-tab>
        </v-tabs>
      </template>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <v-row justify="center">
          <v-col cols="12">
            <v-tabs-items v-model="tab">
              <v-tab-item v-for="item in tabs" :key="item.title">
                <component :is="item.comp"></component>
              </v-tab-item>
            </v-tabs-items>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <!-- Footer -->
    <DLFooter />
  </v-app>
</template>

<script>
export default {
  name: 'CenterPage',
  middleware: ['jwt', 'auth'],
  data() {
    return {
      tabs: [
        { title: '总览', icon: 'mdi-apps', comp: 'DLOverview' },
        { title: '学习中心', icon: 'mdi-school', comp: 'DLLearn' },
        { title: '个人设置', icon: 'mdi-account-cog', comp: 'DLSettings' },
      ],
      tab: null,
    }
  },
  head: {
    title: '用户中心',
    meta: [
      {
        name: 'description',
        content: 'Duplex Learn 用户中心',
      },
    ],
  },
}
</script>
