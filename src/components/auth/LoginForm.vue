<script setup>
import { ref } from 'vue'
import { emailValidator, requiredValidator } from '@/utils/validator'

const refVform = ref()
const showPassword = ref(false)
const errorMessage = ref('')

const formDataDefault = {
  email: '',
  password: '',
}

const formData = ref({
  ...formDataDefault,
})

const onSubmit = () => {
  alert(formData.value.email + ' logged in!')
}

const onFormSubmit = () => {
  refVform.value?.validate().then(({ valid: isValid }) => {
    if (isValid) onSubmit()
  })
}
</script>

<template>
  <v-card-title class="text-center text-h3 font-weight-bold mb-6"> Login </v-card-title>
  <v-form ref="refVform" @submit.prevent="onFormSubmit" class="login-form">
    <v-text-field
      v-model="formData.email"
      label="Email"
      type="email"
      :rules="[requiredValidator, emailValidator]"
      prepend-inner-icon="mdi-email"
      variant="outlined"
      required
    />

    <v-text-field
      v-model="formData.password"
      label="Password"
      :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
      :type="showPassword ? 'text' : 'password'"
      prepend-inner-icon="mdi-lock"
      :rules="[requiredValidator]"
      variant="outlined"
      required
      @click:append-inner="showPassword = !showPassword"
    />

    <!-- <v-alert v-if="errorMessage" type="error" variant="tonal" class="mb-4">
      {{ errorMessage }}
    </v-alert> -->

    <v-btn type="submit" color="#003a6c" block size="large" class="mb-4"> Login </v-btn>

    <div class="text-center">
      <span>Don't have an account? </span>
      <v-btn to="/register" variant="text" color="#fdb913" class="font-weight-bold">
        Register here
      </v-btn>
    </div>
  </v-form>
</template>
