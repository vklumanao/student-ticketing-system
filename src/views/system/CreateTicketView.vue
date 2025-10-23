<script setup>
import { ref } from 'vue'
import TicketForm from '@/components/system/TicketForm.vue'

const successMessage = ref('')
const trackingCode = ref('')

const onTicketSubmitted = (payload) => {
  trackingCode.value = payload.trackingCode
  successMessage.value = `Ticket submitted. Your tracking code is ${trackingCode.value}`
  // optionally save payload.ticket to server here
}
</script>

<template>
  <v-container class="pa-8 create-ticket-root">
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8">
        <v-card class="elevated-card">
          <v-card-title class="title-row">
            <v-icon class="mr-3" color="#fdb913">mdi-ticket-outline</v-icon>
            <div>
              <div class="text-h6 primary--text">Create Ticket</div>
              <div class="subtitle-2 grey--text">Report an issue, suggestion, or inquiry</div>
            </div>
          </v-card-title>

          <v-divider />

          <v-card-text>
            <TicketForm @submitted="onTicketSubmitted" />
          </v-card-text>
        </v-card>

        <v-alert
          v-if="successMessage"
          type="success"
          class="mt-4 success-alert"
          border="left"
          colored-border
        >
          {{ successMessage }}
        </v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.create-ticket-root {
  background: linear-gradient(180deg, rgba(0, 58, 108, 0.04), rgba(255, 255, 255, 0));
  min-height: calc(100vh - 120px);
}

.elevated-card {
  border-radius: 12px;
  overflow: hidden;
  border-top: 6px solid #003a6c;
  box-shadow: 0 10px 30px rgba(2, 6, 23, 0.06);
}

.title-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.success-alert {
  border-left-color: #003a6c !important;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.6), rgba(248, 252, 255, 0.6));
}
</style>
