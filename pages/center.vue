<template>
  <v-app dark>
    <v-app-bar app fixed>
      <v-app-bar-title> {{ text.title }} </v-app-bar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
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
            <v-list-item-title>{{ text.createMap }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <DLLight />

      <template #extension>
        <v-tabs v-model="tab" align-with-title>
          <v-tab v-for="item in text.tabs" :key="item.title">
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
              <v-tab-item v-for="item in text.tabs" :key="item.title">
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
      text: {
        title: 'Duplex Learn',
        tabs: [
          { title: '总览', icon: 'mdi-apps', comp: 'DLOverview' },
          { title: '学习中心', icon: 'mdi-school', comp: 'DLLearn' },
          { title: '个人设置', icon: 'mdi-account-cog', comp: 'DLSettings' },
        ],
        createMap: '创建路线图',
      },
      tab: null,
    }
  },
}
</script>
