<script setup>
import { ref } from 'vue'
const drawer = ref(false)
</script>

<template>
  <v-app>
    <!-- Top App Bar -->
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-toolbar-title>🎫 Student Ticketing System</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn to="/admin" text>Admin</v-btn>
    </v-app-bar>

    <!-- Navigation Drawer -->
    <v-navigation-drawer app v-model="drawer" temporary>
      <v-list>
        <v-list-item to="/">Home</v-list-item>
        <v-list-item to="/create-ticket">Create Ticket</v-list-item>
        <v-list-item to="/track/sample123">Track Ticket</v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Page content -->
    <v-main>
      <v-container class="py-6">
        <router-view />
      </v-container>
    </v-main>

    <v-footer app inset color="primary" dark>
      <v-col class="text-center">© {{ new Date().getFullYear() }} Student Ticketing System</v-col>
    </v-footer>
  </v-app>
</template>
