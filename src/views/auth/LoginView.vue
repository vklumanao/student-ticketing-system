<script setup>
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const errorMessage = ref('')

const handleLogin = async () => {
  try {
    // TODO: Implement actual login logic here
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
  <div class="login-container">
    <div class="login-card">
      <h1>Login</h1>
      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="email" required placeholder="Enter your email" />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            required
            placeholder="Enter your password"
          />
        </div>

        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

        <button type="submit" class="login-button">Login</button>

        <div class="links">
          <a href="#" class="forgot-password">Forgot Password?</a>
          <a href="#" class="register">Create Account</a>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.login-card {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 2rem;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

label {
  font-weight: 600;
  color: #444;
}

input {
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

input:focus {
  outline: none;
  border-color: #4a90e2;
}

.login-button {
  background-color: #4a90e2;
  color: white;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.login-button:hover {
  background-color: #357abd;
}

.error-message {
  color: #dc3545;
  font-size: 0.875rem;
  margin: 0;
}

.links {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
}

.links a {
  color: #4a90e2;
  text-decoration: none;
  font-size: 0.875rem;
}

.links a:hover {
  text-decoration: underline;
}
</style>
