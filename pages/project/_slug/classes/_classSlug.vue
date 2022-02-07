<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" fixed clipped right app>
      <v-list>
        <v-subheader>目录</v-subheader>
        <v-list-item
          v-for="(item, i) in meta.steps"
          :key="`${i}-toc`"
          :href="`#${item.slug}`"
        >
          <v-list-item-content>
            <v-list-item-title>
              {{ i + 1 }}. {{ item.name }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar clipped-right fixed app>
      <v-btn icon @click="$router.go(-1)">
        <v-icon> mdi-chevron-left </v-icon>
      </v-btn>
      <v-toolbar-title>
        {{ meta.name }}
      </v-toolbar-title>
      <v-spacer />
      <DLLight />
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
    </v-app-bar>
    <v-main>
      <v-parallax dark height="300" :src="meta.logo">
        <v-row align="center" justify="center">
          <v-col cols="12">
            <h1 class="text-h4 font-weight-thin mb-4">
              {{ meta.name }}
            </h1>
            <v-divider />
            <h4 class="subheading">
              <div>
                <v-chip
                  v-for="(item, i) in meta.label"
                  :key="`${i}-label`"
                  class="ma-1"
                >
                  {{ item }}
                </v-chip>
              </div>
            </h4>
            <div class="my-3">
              <v-avatar color="primary" size="32">
                {{ project.nickname.substr(0, 1) }}
              </v-avatar>
              <span class="text-overline"> {{ project.nickname }} </span>
            </div>
            <div class="my-3">
              <v-btn :href="project.url" color="primary">
                <v-icon left>mdi-git</v-icon>
                <span>帮助我们改进页面</span>
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-parallax>

      <v-card>
        <v-tabs v-model="tab" grow>
          <v-tab> 概述 </v-tab>
          <v-tab> 资源 </v-tab>
          <v-tab> 技能 </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item>
            <v-card flat>
              <v-card-title class="text-h5"> 概述 </v-card-title>
              <v-card-text>
                <p>
                  {{ meta.overview }}
                </p>
              </v-card-text>
            </v-card>
          </v-tab-item>

          <v-tab-item>
            <v-card flat>
              <v-card-title class="text-h5"> 资源 </v-card-title>
              <v-card-text>
                <ul>
                  <li
                    v-for="(item, i) in meta.resources"
                    :key="`${i}-resources`"
                  >
                    <v-btn text :href="item.url">
                      {{ item.name }} - {{ item.version }}
                    </v-btn>
                  </li>
                </ul>
              </v-card-text>
            </v-card>
          </v-tab-item>

          <v-tab-item>
            <v-card flat>
              <v-card-title class="text-h5"> 技能 </v-card-title>
              <v-card-text>
                <ul>
                  <li v-for="(item, i) in meta.target" :key="`${i}-target`">
                    {{ item }}
                  </li>
                </ul>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-card>

      <v-container>
        <DLStep
          v-for="(step, i) in meta.steps"
          :slug="slug"
          :key="`${i}-step`"
          :classSlug="classSlug"
          :stepSlug="step.slug"
          :name="`${i + 1}. ${step.name}`"
        />
      </v-container>
    </v-main>
    <DLFooter />
  </v-app>
</template>

<script>
export default {
  name: 'ClassPage',
  async asyncData(app) {
    const data = {}
    data.slug = app.params.slug
    data.classSlug = app.params.classSlug
    await app.$axios
      .get(`/project/${data.slug}/classes/${data.classSlug}`, {
        headers: {
          Authorization: 'Bearer ' + app.store.state.jwt,
        },
      })
      .then((res) => {
        data.meta = res.data
      })
    await app.$axios
      .get(`/project/${data.slug}/`, {
        headers: {
          Authorization: 'Bearer ' + app.store.state.jwt,
        },
      })
      .then((res) => {
        data.project = res.data
      })
    return data
  },
  data() {
    return {
      tab: null,
      drawer: null,
    }
  },
  head() {
    return {
      title: this.meta.name,
      meta: [
        {
          name: 'description',
          content: `Duplex Learn - ${this.meta.name}`,
        },
        {
          name: 'keywords',
          content:
            'Duplex Learn,免费,开源,计算机,学习,知识库,实践,软件开发,计算机教程,计算机企业,高校,计算机专业,' +
            this.meta.label.join(','),
        },
      ],
    }
  },
  mounted() {
    // let recent = []
    // if (window.localStorage.getItem('recentLearn')) {
    //   recent = window.localStorage.getItem('recentLearn').split(',')
    // }
    // let exists = false
    // for (const item in recent) {
    //   if (item === this.id) {
    //     exists = true
    //     break
    //   }
    // }
    // if (!exists) {
    //   if (recent.length >= 6) {
    //     recent.shift()
    //   }
    //   recent.unshift(this.id)
    //   window.localStorage.setItem('recentLearn', recent.join())
    // }
  },
}
</script>
