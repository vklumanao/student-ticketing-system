<script setup>
import RegisterForm from '@/components/auth/RegisterForm.vue'
</script>

<template>
  <div class="register-container">
    <v-card class="register-card" elevation="8">
      <v-card-title class="text-center text-h4 font-weight-bold mb-6">
        Create Account
      </v-card-title>
      <RegisterForm></RegisterForm>
    </v-card>
  </div>
</template>

<style scoped>
.register-container {
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

.register-container::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(0, 58, 108, 0.36);
}

.register-card {
  width: 100%;
  max-width: 700px;
  padding: 2rem;
  position: relative;
  border-top: 6px solid #003a6c !important;
}

.register-form {
  max-width: 600px;
  margin: 0 auto;
}
</style>
