<script setup>
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const showPassword = ref(false)

const handleLogin = async () => {
  try {
    if (!email.value || !password.value) {
      errorMessage.value = 'Please fill in all fields'
      return
    }
    console.log('Login attempted with:', email.value)
  } catch (error) {
    errorMessage.value = error.message
  }
}
</script>

<template>
  <v-card-title class="text-center text-h4 font-weight-bold mb-6"> Login </v-card-title>
  <v-form @submit.prevent="handleLogin" class="login-form">
    <v-text-field
      v-model="email"
      label="Email"
      type="email"
      :rules="[(v) => !!v || 'Email is required']"
      prepend-inner-icon="mdi-email"
      variant="outlined"
      required
    />

    <v-text-field
      v-model="password"
      label="Password"
      :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
      :type="showPassword ? 'text' : 'password'"
      prepend-inner-icon="mdi-lock"
      :rules="[(v) => !!v || 'Password is required']"
      variant="outlined"
      required
      @click:append-inner="showPassword = !showPassword"
    />

    <v-alert v-if="errorMessage" type="error" variant="tonal" class="mb-4">
      {{ errorMessage }}
    </v-alert>

    <v-btn type="submit" color="#003a6c" block size="large" class="mb-4"> Login </v-btn>

    <div class="text-center">
      <span>Don't have an account? </span>
      <v-btn to="/register" variant="text" color="#fdb913" class="font-weight-bold">
        Register here
      </v-btn>
    </div>
  </v-form>
</template>
