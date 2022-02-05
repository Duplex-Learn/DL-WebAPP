<template>
  <v-app>
    <!-- App Bar -->
    <v-app-bar fixed app>
      <v-btn icon @click="$router.go(-1)">
        <v-icon> mdi-chevron-left </v-icon>
      </v-btn>
      <v-toolbar-title> Duplex Learn 捐助 </v-toolbar-title>
      <v-spacer />
      <DLLight />
      <v-btn icon to="/center" nuxt>
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- Main -->
    <v-main>
      <v-container fluid>
        <!-- Title -->
        <v-card class="my-10" flat>
          <v-card-title class="d-flex justify-center">
            <img src="/logo.svg" width="200" />
          </v-card-title>

          <v-card-title class="text-h2 d-flex justify-center text-center">
            Duplex Learn 捐助
          </v-card-title>

          <v-card-text class="text-h5 font-weight-light d-flex justify-center">
            <v-sheet max-width="700" class="text-center">
              如果您觉得这个网站对您有帮助，欢迎您的捐助，您捐助的每一份心意将用于网站建设，例如服务器的开销和日常维护等。
            </v-sheet>
          </v-card-text>

          <v-card-text class="text-h6 font-weight-light d-flex justify-center">
            <v-sheet max-width="700" class="text-center">
              <span>个人及商业捐助请联系：</span>
              <br />
              <v-icon left>mdi-qqchat</v-icon>
              <span>1390751361</span>
            </v-sheet>
          </v-card-text>
        </v-card>

        <v-divider />

        <!-- Sponsors -->
        <v-card class="my-10" flat>
          <v-card-title class="text-h4 d-flex justify-center">
            捐助列表
          </v-card-title>
          <v-card-subtitle class="text-h6 d-flex justify-center text-center">
            每笔赞助都会被永久记录下来，感谢您对我们的支持。
          </v-card-subtitle>
          <v-card-text>
            <v-row justify="center">
              <v-col sm="12" md="8">
                <v-simple-table>
                  <template #default>
                    <thead>
                      <tr>
                        <th class="text-left">捐助人</th>
                        <th class="text-left">金额</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, i) in sponsors" :key="`${i}-sponsor`">
                        <td>{{ item.name }}</td>
                        <td>{{ item.money }}</td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-container>
    </v-main>
    <!-- Footer -->
    <DLFooter />
  </v-app>
</template>

<script>
export default {
  name: 'SponsorPage',
  data() {
    return {
      sponsors: [{ name: 'LovelonelyTime', money: '63 ¥' }],
    }
  },
  head: {
    title: '捐助',
    meta: [
      {
        name: 'description',
        content: 'Duplex Learn 捐助',
      },
    ],
  },
}
</script>
