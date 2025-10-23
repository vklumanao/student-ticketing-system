<script setup>
import { ref } from 'vue'
const props = defineProps({
  //   modelValue: { type: Boolean, default: false },
  ticket: { type: Object, required: true },
})
const emit = defineEmits(['update:modelValue', 'saved'])

const status = ref(props.ticket.status || 'created')
const note = ref('')

const saving = ref(false)

const save = async () => {
  saving.value = true
  // simulate API call
  await new Promise((r) => setTimeout(r, 600))
  const payload = {
    trackingCode: props.ticket.trackingCode,
    status: status.value,
    note: note.value || `Status changed to ${status.value}`,
    at: new Date().toISOString(),
  }
  emit('saved', payload)
  emit('update:modelValue', false)
  saving.value = false
}

const close = () => emit('update:modelValue', false)
</script>

<template>
  <v-dialog v-model="modelValue" width="520">
    <v-card>
      <v-card-title>
        <div>
          <div class="text-h6">Update Ticket</div>
          <div class="subtitle-2 grey--text">Tracking: {{ ticket.trackingCode }}</div>
        </div>
      </v-card-title>

      <v-divider />

      <v-card-text>
        <v-select
          v-model="status"
          :items="['created', 'verified', 'investigating', 'resolved']"
          label="Status"
          variant="outlined"
          required
        />

        <v-textarea
          v-model="note"
          label="Note / Resolution"
          rows="3"
          class="mt-4"
          variant="outlined"
        />
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn text color="#777" @click="close">Cancel</v-btn>
        <v-btn :loading="saving" color="#003a6c" @click="save">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
/* small adjustments */
</style>
