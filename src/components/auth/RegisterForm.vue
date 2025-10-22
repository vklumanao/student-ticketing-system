<script setup>
import { ref } from 'vue'
import {
  emailValidator,
  requiredValidator,
  passwordValidator,
  confirmedValidator,
} from '@/utils/validator'

const refVform = ref()
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const errorMessage = ref('')

const formDataDefault = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
}

const formData = ref({
  ...formDataDefault,
})

const onSubmit = () => {
  alert(formData.value.firstName + ' ' + formData.value.lastName + ' registered!')
}

const onFormSubmit = () => {
  refVform.value?.validate().then(({ valid: isValid }) => {
    if (isValid) onSubmit()
  })
}
</script>

<template>
  <v-card-title class="text-center text-h3 font-weight-bold mb-6"> Create Account </v-card-title>
  <v-form ref="refVform" @submit.prevent="onFormSubmit" class="register-form">
    <v-row>
      <v-col cols="12" sm="6">
        <v-text-field
          v-model="formData.firstName"
          label="First Name"
          prepend-inner-icon="mdi-account"
          :rules="[requiredValidator]"
          variant="outlined"
          required
        />
      </v-col>

      <v-col cols="12" sm="6">
        <v-text-field
          v-model="formData.lastName"
          label="Last Name"
          prepend-inner-icon="mdi-account"
          :rules="[requiredValidator]"
          variant="outlined"
          required
        />
      </v-col>
    </v-row>

    <v-text-field
      v-model="formData.email"
      label="Email"
      type="email"
      prepend-inner-icon="mdi-email"
      :rules="[requiredValidator, emailValidator]"
      variant="outlined"
      required
    />

    <v-text-field
      v-model="formData.password"
      label="Password"
      :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
      :type="showPassword ? 'text' : 'password'"
      prepend-inner-icon="mdi-lock"
      :rules="[requiredValidator, passwordValidator]"
      variant="outlined"
      required
      @click:append-inner="showPassword = !showPassword"
    />

    <v-text-field
      v-model="formData.confirmPassword"
      label="Confirm Password"
      :append-inner-icon="showConfirmPassword ? 'mdi-eye-off' : 'mdi-eye'"
      :type="showConfirmPassword ? 'text' : 'password'"
      prepend-inner-icon="mdi-lock-check"
      :rules="[requiredValidator, confirmedValidator(formData.confirmPassword, formData.password)]"
      variant="outlined"
      required
      @click:append-inner="showConfirmPassword = !showConfirmPassword"
    />

    <!-- <v-alert v-if="errorMessage" type="error" variant="tonal" class="mb-4">
      {{ errorMessage }}
    </v-alert> -->

    <v-btn type="submit" color="#003a6c" block size="large" class="mb-4"> Create Account </v-btn>

    <div class="text-center">
      <span>Already have an account? </span>
      <v-btn to="/" variant="text" color="#fdb913" class="font-weight-bold"> Login here </v-btn>
    </div>
  </v-form>
</template>
