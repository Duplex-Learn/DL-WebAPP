<template>
  <v-app dark>
    <v-app-bar fixed elevate-on-scroll>
      <v-btn icon @click="$router.go(-1)">
        <v-icon> mdi-chevron-left </v-icon>
      </v-btn>
      <v-toolbar-title>{{ meta.name }}</v-toolbar-title>
      <v-spacer />
      <DLLight />
    </v-app-bar>
    <v-main>
      <v-parallax height="300" :src="meta.logo">
        <v-row align="center" justify="center">
          <v-col cols="12">
            <h1 class="text-h4 mb-4">
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
              <v-card-title class="text-h5"> {{ text.overview }} </v-card-title>
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
              <v-card-title class="text-h5"> {{ text.ability }} </v-card-title>
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
      <v-card flat class="my-3">
        <v-card-title> {{ text.cover }} </v-card-title>
        <v-divider />
        <v-card-text>
          <v-timeline dense>
            <v-timeline-item
              v-for="(slug, i) in meta.classes"
              :key="`${i}-class`"
              right
            >
              <DLClassCard :id="id" :slug="slug" />
            </v-timeline-item>
          </v-timeline>
        </v-card-text>
      </v-card>
    </v-main>

    <!-- Footer -->
    <DLFooter />
  </v-app>
</template>

<script>
export default {
  name: 'ProjectPage',
  data() {
    return {
      tab: null,
      text: {
        overview: '概述',
        resources: '资源',
        ability: '技能',
        cover: '项目下包含的课程',
      },
    }
  },
  async asyncData(app) {
    const id = parseInt(app.params.id)
    const data = {}
    data.id = id
    await app.$axios
      .get(`/project/${id}/meta`, {
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
}
</script>
