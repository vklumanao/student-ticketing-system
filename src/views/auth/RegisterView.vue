<script setup>
import { ref } from 'vue'

const firstName = ref('')
const lastName = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const studentId = ref('')
const errorMessage = ref('')

const handleRegister = async () => {
  try {
    if (
      !firstName.value ||
      !lastName.value ||
      !email.value ||
      !password.value ||
      !confirmPassword.value ||
      !studentId.value
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
            <input
              type="text"
              id="firstName"
              v-model="firstName"
              required
              placeholder="Enter your first name"
            />
          </div>
          <div class="form-group">
            <label for="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              v-model="lastName"
              required
              placeholder="Enter your last name"
            />
          </div>
        </div>

        <div class="form-group">
          <label for="studentId">Student ID</label>
          <input
            type="text"
            id="studentId"
            v-model="studentId"
            required
            placeholder="Enter your student ID"
          />
        </div>

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

        <div class="form-group">
          <label for="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            v-model="confirmPassword"
            required
            placeholder="Confirm your password"
          />
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
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 2rem;
}

.register-card {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 2rem;
}

.register-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
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

.register-button {
  background-color: #4a90e2;
  color: white;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.register-button:hover {
  background-color: #357abd;
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
}

.links a {
  color: #4a90e2;
  text-decoration: none;
  font-size: 0.875rem;
}

.links a:hover {
  text-decoration: underline;
}

@media (max-width: 600px) {
  .form-row {
    flex-direction: column;
  }
}
</style>
