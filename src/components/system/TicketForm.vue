<script setup>
import { ref, reactive } from 'vue'
import FileUploader from './FileUploader.vue'

const categories = [
  { label: 'Grievance', value: 'grievance' },
  { label: 'Incident', value: 'incident' },
  { label: 'Suggestion', value: 'suggestion' },
  { label: 'Inquiry', value: 'inquiry' },
]

const formRef = ref(null)
const form = reactive({
  category: '',
  subject: '',
  description: '',
  files: [], // File list from FileUploader
})

const submitting = ref(false)
const error = ref('')

const generateTrackingCode = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let part = ''
  for (let i = 0; i < 6; i++) part += chars.charAt(Math.floor(Math.random() * chars.length))
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, '')
  return `TRK-${date}-${part}`
}

const resetForm = () => {
  form.category = ''
  form.subject = ''
  form.description = ''
  form.files = []
  formRef.value?.resetValidation?.()
}

const onSubmit = async () => {
  error.value = ''
  const valid = await formRef.value?.validate?.()
  if (!valid) {
    error.value = 'Please fix the highlighted fields.'
    return
  }

  submitting.value = true

  try {
    // Simulate upload / API call
    await new Promise((r) => setTimeout(r, 900))

    const trackingCode = generateTrackingCode()
    const ticket = {
      category: form.category,
      subject: form.subject,
      description: form.description,
      files: form.files,
      createdAt: new Date().toISOString(),
    }

    const payload = { trackingCode, ticket }
    emit('submitted', payload)

    resetForm()
  } catch (e) {
    error.value = 'Failed to submit ticket. Try again.'
  } finally {
    submitting.value = false
  }
}

const emit = defineEmits(['submitted'])
</script>

<template>
  <v-form ref="formRef" @submit.prevent="onSubmit" class="ticket-form">
    <v-row class="form-row" dense>
      <v-col cols="12" sm="6">
        <v-select
          v-model="form.category"
          :items="categories"
          item-title="label"
          item-value="value"
          label="Category"
          :rules="[(v) => !!v || 'Category is required']"
          prepend-inner-icon="mdi-shape-outline"
          variant="outlined"
          density="comfortable"
          required
        />
      </v-col>

      <v-col cols="12" sm="6">
        <v-text-field
          v-model="form.subject"
          label="Subject (short)"
          :rules="[(v) => !!v || 'Subject is required']"
          prepend-inner-icon="mdi-text-box-outline"
          variant="outlined"
          density="comfortable"
          required
        />
      </v-col>

      <v-col cols="12">
        <v-textarea
          v-model="form.description"
          label="Description"
          auto-grow
          :rules="[(v) => !!v || 'Description is required']"
          hint="Explain the issue in detail. Include dates, locations, persons involved where relevant."
          persistent-hint
          prepend-inner-icon="mdi-note-text"
          variant="outlined"
          required
        />
      </v-col>

      <v-col cols="12">
        <FileUploader v-model:files="form.files" />
      </v-col>

      <v-col cols="12" class="d-flex justify-end align-center action-row">
        <div class="mr-4" v-if="form.files.length">
          <small class="grey--text">Attachments: {{ form.files.length }}</small>
        </div>

        <v-btn :loading="submitting" :disabled="submitting" class="submit-btn" @click="onSubmit">
          <v-icon left>mdi-send</v-icon>
          Submit ticket
        </v-btn>
      </v-col>
    </v-row>

    <v-alert v-if="error" type="error" class="mt-4">
      {{ error }}
    </v-alert>
  </v-form>
</template>

<style scoped>
.ticket-form {
  margin: 0 auto;
  padding: 16px 6px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(250, 250, 252, 0.98));
  border-radius: 10px;
}

.form-row > .v-col {
  padding-top: 10px;
  padding-bottom: 10px;
}

.action-row {
  margin-top: 6px;
}

.submit-btn {
  background-color: #003a6c;
  color: #fff;
  border-radius: 8px;
  padding: 10px 18px;
  box-shadow: 0 6px 18px rgba(0, 58, 108, 0.12);
}
.submit-btn:hover {
  background-color: #002548;
}
</style>
