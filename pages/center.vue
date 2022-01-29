<template>
  <v-app dark>
    <v-app-bar
      app
      fixed
      color="#6A76AB"
      shrink-on-scroll
      prominent
      src="https://picsum.photos/1920/1080?random"
      fade-img-on-scroll
    >
      <template #img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"
        ></v-img>
      </template>

      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-app-bar-title> {{ text.title }} </v-app-bar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>

      <template #extension>
        <v-tabs v-model="tab" align-with-title color="white">
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
          { title: '创作中心', icon: 'mdi-pencil', comp: 'DLEdit' },
          { title: '消息', icon: 'mdi-message', comp: 'DLMessage' },
          { title: '个人设置', icon: 'mdi-account-cog', comp: 'DLSettings' },
        ],
      },
      tab: null,
    }
  },
}
</script>
