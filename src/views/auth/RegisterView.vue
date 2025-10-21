<script setup>
import { ref } from 'vue'

const firstName = ref('')
const lastName = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const errorMessage = ref('')
const showPassword = ref(false)
const showConfirmPassword = ref(false)

const handleRegister = async () => {
  try {
    if (
      !firstName.value ||
      !lastName.value ||
      !email.value ||
      !password.value ||
      !confirmPassword.value
    ) {
      errorMessage.value = 'Please fill in all fields'
      return
    }

    if (password.value !== confirmPassword.value) {
      errorMessage.value = 'Passwords do not match'
      return
    }

    console.log('Registration attempted with:', email.value)
  } catch (error) {
    errorMessage.value = error.message
  }
}
</script>

<template>
  <div class="register-container">
    <v-card class="register-card" elevation="8">
      <v-card-title class="text-center text-h4 font-weight-bold mb-6">
        Create Account
      </v-card-title>

      <v-form @submit.prevent="handleRegister" class="register-form">
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="firstName"
              label="First Name"
              prepend-inner-icon="mdi-account"
              :rules="[(v) => !!v || 'First name is required']"
              variant="outlined"
              required
            />
          </v-col>

          <v-col cols="12" sm="6">
            <v-text-field
              v-model="lastName"
              label="Last Name"
              prepend-inner-icon="mdi-account"
              :rules="[(v) => !!v || 'Last name is required']"
              variant="outlined"
              required
            />
          </v-col>
        </v-row>

        <v-text-field
          v-model="email"
          label="Email"
          type="email"
          prepend-inner-icon="mdi-email"
          :rules="[(v) => !!v || 'Email is required']"
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

        <v-text-field
          v-model="confirmPassword"
          label="Confirm Password"
          :append-inner-icon="showConfirmPassword ? 'mdi-eye-off' : 'mdi-eye'"
          :type="showConfirmPassword ? 'text' : 'password'"
          prepend-inner-icon="mdi-lock-check"
          :rules="[
            (v) => !!v || 'Please confirm your password',
            (v) => v === password || 'Passwords do not match',
          ]"
          variant="outlined"
          required
          @click:append-inner="showConfirmPassword = !showConfirmPassword"
        />

        <v-alert v-if="errorMessage" type="error" variant="tonal" class="mb-4">
          {{ errorMessage }}
        </v-alert>

        <v-btn type="submit" color="#003a6c" block size="large" class="mb-4">
          Create Account
        </v-btn>

        <div class="text-center">
          <span>Already have an account? </span>
          <v-btn to="/" variant="text" color="#fdb913" class="font-weight-bold"> Login here </v-btn>
        </div>
      </v-form>
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
