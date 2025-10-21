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
          <div class="input-group">
            <i class="mdi mdi-email"></i>
            <input
              type="email"
              id="email"
              v-model="email"
              required
              placeholder="Enter your email"
            />
          </div>
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <div class="input-group">
            <i class="mdi mdi-lock"></i>
            <input
              type="password"
              id="password"
              v-model="password"
              required
              placeholder="Enter your password"
            />
          </div>
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
  --bg-image: url('@/assets/images/background.jpg');
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-image: var(--bg-image);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.login-container::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(0, 58, 108, 0.36);
  z-index: 1;
}

.login-card {
  position: relative;
  z-index: 2;
  background: rgba(255, 255, 255, 0.96);
  padding: 3rem;
  border-radius: 8px;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.18);
  width: 100%;
  max-width: 600px;
  border-top: 6px solid #003a6c;
  margin: 0 1rem;
}

h1 {
  text-align: center;
  color: #003a6c;
  margin-bottom: 1.75rem;
  font-weight: 700;
  font-size: 1.75rem;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

label {
  font-weight: 600;
  color: #003a6c;
}

input {
  padding: 1rem;
  border: 1px solid #e0e6ee;
  border-radius: 6px;
  font-size: 1.05rem;
  background: #fff;
  transition:
    border-color 0.15s,
    box-shadow 0.15s;
}

input:focus {
  outline: none;
  border-color: #003a6c;
  box-shadow: 0 0 0 4px rgba(0, 58, 108, 0.08);
}

.login-button {
  background-color: #003a6c;
  color: #fff;
  padding: 1rem 1.25rem;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition:
    background-color 0.15s,
    transform 0.08s;
}

.login-button:hover {
  background-color: #002548;
  transform: translateY(-1px);
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
  gap: 0.5rem;
  align-items: center;
}

.links a {
  color: #fdb913;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 600;
}

.links a:hover {
  color: #d99e00;
  text-decoration: underline;
}

.input-group {
  position: relative;
  display: flex;
  align-items: center;
}

.input-group i {
  position: absolute;
  left: 1rem;
  color: #003a6c;
  font-size: 1.25rem;
}

.input-group input {
  width: 100%;
  padding-left: 3rem;
}

@media (max-width: 900px) {
  .login-card {
    max-width: 620px;
    padding: 2.5rem;
  }
}

@media (max-width: 600px) {
  .login-card {
    margin: 1rem;
    padding: 1.25rem;
    max-width: 100%;
  }
  h1 {
    font-size: 1.5rem;
  }
  input {
    padding: 0.9rem;
    font-size: 1rem;
  }
  .login-button {
    padding: 0.9rem;
    font-size: 1rem;
  }
}
</style>
