<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer" fixed clipped right app>
      <v-list>
        <v-list-item v-for="(item, i) in meta.steps" :key="`${i}-toc`" href="#">
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
                <v-chip v-for="(item, i) in meta.label" :key="i" class="ma-1">
                  {{ item }}
                </v-chip>
              </div>
            </h4>
            <div class="my-3">
              <v-avatar color="primary" size="32">
                {{ author.nickname.substr(0, 1) }}
              </v-avatar>
              <span class="text-overline"> {{ author.nickname }} </span>
            </div>
          </v-col>
        </v-row>
      </v-parallax>

      <v-card>
        <v-tabs v-model="tab" grow>
          <v-tab> {{ text.overview }} </v-tab>
          <v-tab> {{ text.resources }} </v-tab>
          <v-tab> {{ text.ability }} </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item>
            <v-card flat>
              <v-card-title class="text-h5">
                {{ text.overview }}
              </v-card-title>
              <v-card-text>
                <p>
                  {{ meta.overview }}
                </p>
              </v-card-text>
            </v-card>
          </v-tab-item>

          <v-tab-item>
            <v-card flat>
              <v-card-title class="text-h5">
                {{ text.resources }}
              </v-card-title>
              <v-card-text>
                <ul>
                  <li v-for="(item, i) in meta.resources" :key="`${i}-res`">
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
              <v-card-title class="text-h5">
                {{ text.ability }}
              </v-card-title>
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
          :key="`${i}-step`"
          :id="id"
          :slug="slug"
          :s_slug="step.slug"
          :name="`${i + 1}. ${meta.name}`"
        />
      </v-container>
    </v-main>
    <DLFooter />
  </v-app>
</template>

<script>
export default {
  name: 'ClassPage',
  data() {
    return {
      tab: null,
      drawer: null,
      text: {
        overview: '概述',
        resources: '资源',
        ability: '技能',
      },
    }
  },
  async asyncData(app) {
    const id = parseInt(app.params.id)
    const data = {}
    data.id = id
    data.slug = app.params.slug
    await app.$axios
      .get(`/project/${data.id}/classes/${data.slug}`, {
        headers: {
          Authorization: 'Bearer ' + app.store.state.jwt,
        },
      })
      .then((res) => {
        data.meta = res.data
      })
    await app.$axios
      .get(`/project/${id}/author`, {
        headers: {
          Authorization: 'Bearer ' + app.store.state.jwt,
        },
      })
      .then((res) => {
        data.author = res.data
      })
    return data
  },
  mounted() {
    let recent = []
    if (window.localStorage.getItem('recentLearn')) {
      recent = window.localStorage.getItem('recentLearn').split(',')
    }
    let exists = false
    for (const item in recent) {
      if (item === this.id) {
        exists = true
        break
      }
    }
    if (!exists) {
      if (recent.length >= 6) {
        recent.shift()
      }
      recent.unshift(this.id)
      window.localStorage.setItem('recentLearn', recent.join())
    }
  },
}
</script>
