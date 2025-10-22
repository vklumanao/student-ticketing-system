<script setup>
import LoginForm from '@/components/auth/LoginForm.vue'
</script>

<template>
  <div class="login-container">
    <v-card class="login-card" elevation="8">
      <LoginForm></LoginForm>
    </v-card>
  </div>
</template>

<style scoped>
.login-container {
  --bg-image: url('@/assets/images/background.jpg');
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: var(--bg-image);
  background-size: cover;
  background-position: center;
  padding: 1rem;
  position: relative;
}

.login-container::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(0, 58, 108, 0.36);
}

.login-card {
  width: 100%;
  max-width: 500px;
  padding: 2rem;
  position: relative;
  border-top: 6px solid #003a6c !important;
}

.login-form {
  max-width: 400px;
  margin: 0 auto;
}
</style>
