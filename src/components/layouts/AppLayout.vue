<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import FooterView from '@/components/common/FooterView.vue'

const drawer = ref(false)
const mini = ref(false)
const router = useRouter()

const navItems = [
  { title: 'Create Ticket', icon: 'mdi-ticket-plus', to: { name: 'create-ticket' } },
  { title: 'Track Ticket', icon: 'mdi-magnify', to: { name: 'track' } },
  { title: 'Admin', icon: 'mdi-shield-account', to: { name: 'admin' } },
]

const go = (to) => {
  router.push(to).catch(() => {})
}
</script>

<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      app
      elevation="5"
      :mini-variant="mini"
      width="300"
      class="app-drawer"
    >
      <div class="drawer-top pa-4 d-flex align-center">
        <img src="" alt="logo" class="logo" />
        <div class="ml-3">
          <div class="title">Student Ticketing System</div>
        </div>
      </div>

      <v-divider />

      <v-list nav density="comfortable" class="mt-2">
        <v-list-item
          v-for="(item, i) in navItems"
          :key="i"
          link
          @click="go(item.to)"
          class="d-flex align-center px-3 py-2 rounded-lg hover:bg-primary-lighten-5"
        >
          <v-icon size="22" class="mr-3 text-primary">{{ item.icon }}</v-icon>
          <v-list-item-title class="text-body-2 font-weight-medium">{{
            item.title
          }}</v-list-item-title>
        </v-list-item>
      </v-list>

      <v-spacer />

      <v-divider />

      <div class="pa-4">
        <small class="grey--text">Signed in as:</small>
        <div class="font-weight-medium">Guest</div>
      </div>
    </v-navigation-drawer>

    <v-app-bar app color="white" elevation="2" class="app-bar">
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-toolbar-title class="d-flex align-center">
        <img src="" alt="logo" class="logo-small" />
        <span class="ml-3">Student Ticketing System</span>
      </v-toolbar-title>

      <v-spacer />

      <v-btn icon title="Notifications">
        <v-icon>mdi-bell-outline</v-icon>
      </v-btn>
      <v-btn icon title="Profile">
        <v-icon>mdi-account-circle</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <!-- reserve bottom space for footer by using padding-bottom equal to footer height -->
      <v-container fluid class="pa-6 main-container">
        <router-view />
      </v-container>
    </v-main>

    <!-- Footer must use `app` so Vuetify places it at bottom -->
    <!-- <FooterView /> -->
  </v-app>
</template>

<style scoped>
.app-drawer {
  background: #ffffff;
  border-right: 1px solid rgba(16, 24, 40, 0.04);
}

.drawer-top .logo {
  width: 46px;
  height: 46px;
  object-fit: contain;
  border-radius: 6px;
  box-shadow: 0 6px 18px rgba(3, 37, 76, 0.06);
}

.app-bar {
  backdrop-filter: blur(6px);
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.96), rgba(255, 255, 255, 0.92));
  border-bottom: 1px solid rgba(2, 6, 23, 0.04);
}

.logo-small {
  width: 34px;
  height: 34px;
  object-fit: contain;
}

.title {
  font-weight: 700;
  color: #003a6c;
}

/* IMPORTANT: leave space for footer height (match your FooterView height) */
.main-container {
  min-height: calc(100vh - 120px); /* adjust 120px if your header+footer height differs */
}

/* small screens adjustments */
@media (max-width: 960px) {
  .app-drawer {
    width: 220px;
  }
  .main-container {
    padding-left: 12px;
    padding-right: 12px;
  }
}
</style>
