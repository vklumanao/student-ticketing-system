<script setup>
import { ref } from 'vue'

const firstName = ref('')
const lastName = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const errorMessage = ref('')

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

    // TODO: Implement actual registration logic here
    console.log('Registration attempted with:', email.value)
  } catch (error) {
    errorMessage.value = error.message
  }
}
</script>

<template>
  <div class="register-container">
    <div class="register-card">
      <h1>Create Account</h1>
      <form @submit.prevent="handleRegister" class="register-form">
        <div class="form-row">
          <div class="form-group">
            <label for="firstName">First Name</label>
            <div class="input-group">
              <i class="mdi mdi-account"></i>
              <input
                type="text"
                id="firstName"
                v-model="firstName"
                required
                placeholder="Enter your first name"
              />
            </div>
          </div>
          <div class="form-group">
            <label for="lastName">Last Name</label>
            <div class="input-group">
              <i class="mdi mdi-account"></i>
              <input
                type="text"
                id="lastName"
                v-model="lastName"
                required
                placeholder="Enter your last name"
              />
            </div>
          </div>
        </div>

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

        <div class="form-group">
          <label for="confirmPassword">Confirm Password</label>
          <div class="input-group">
            <i class="mdi mdi-lock-check"></i>
            <input
              type="password"
              id="confirmPassword"
              v-model="confirmPassword"
              required
              placeholder="Confirm your password"
            />
          </div>
        </div>

        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

        <button type="submit" class="register-button">Create Account</button>

        <div class="links">
          <span>Already have an account?</span>
          <a href="#" class="login-link">Login</a>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.register-container {
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
  padding: 2rem;
}

.register-container::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(0, 58, 108, 0.36);
  z-index: 1;
}

.register-card {
  position: relative;
  z-index: 2;
  background: rgba(255, 255, 255, 0.96);
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.18);
  width: 100%;
  max-width: 600px;
  border-top: 6px solid #003a6c;
}

h1 {
  text-align: center;
  color: #003a6c;
  margin-bottom: 1.5rem;
  font-weight: 700;
}

.register-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-row {
  display: flex;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
}

label {
  font-weight: 600;
  color: #003a6c;
}

input {
  padding: 0.75rem;
  border: 1px solid #e0e6ee;
  border-radius: 6px;
  font-size: 1rem;
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

.register-button {
  background-color: #003a6c;
  color: #fff;
  padding: 0.75rem;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition:
    background-color 0.15s,
    transform 0.08s;
}

.register-button:hover {
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
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
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

@media (max-width: 600px) {
  .form-row {
    flex-direction: column;
  }
  .register-card {
    margin: 1rem;
    padding: 1.25rem;
  }
}
</style>
