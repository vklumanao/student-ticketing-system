<script setup>
import { ref } from 'vue'
import TicketStatus from '@/components/system/TicketStatus.vue'

const code = ref('')
const ticket = ref(null)
const loading = ref(false)
const error = ref('')

async function fetchTicketFromApi(trackingCode) {
  // TODO: replace with real API call
  await new Promise((r) => setTimeout(r, 700))
  if (!trackingCode || trackingCode.trim().length < 5) return null

  // mock ticket (demo)
  return {
    trackingCode,
    category: 'inquiry',
    subject: 'Network outage in lab 3',
    description: 'Network disconnected at ~10:30 AM, affecting multiple PCs. Router blinking red.',
    status: 'resolved',
    createdAt: '2025-10-22T10:32:00Z',
    history: [
      { status: 'created', at: '2025-10-22T11:32:00Z', note: 'Ticket submitted' },
      { status: 'verified', at: '2025-10-22T10:40:00Z', note: 'Staff verified issue' },
      { status: 'investigating', at: '2025-10-22T11:05:00Z', note: 'Assigned to network team' },
    ],
    files: [{ name: 'screenshot.png', url: null, type: 'image/png' }],
  }
}

const onSearch = async () => {
  error.value = ''
  ticket.value = null
  if (!code.value) {
    error.value = 'Please enter a tracking code.'
    return
  }
  loading.value = true
  try {
    const res = await fetchTicketFromApi(code.value.trim())
    if (!res) {
      error.value = 'Ticket not found. Please check the tracking code.'
      ticket.value = null
    } else {
      ticket.value = res
    }
  } catch (e) {
    error.value = 'Failed to fetch ticket. Try again.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <v-container class="pa-6">
    <v-row justify="center">
      <v-col cols="12" md="8" lg="12">
        <v-card elevation="4">
          <v-card-title class="d-flex align-center">
            <v-icon color="#003a6c" class="mr-3">mdi-magnify</v-icon>
            <div>
              <div class="text-h6">Track Ticket</div>
              <div class="subtitle-2 grey--text">
                Enter your tracking code to view status and details
              </div>
            </div>
          </v-card-title>

          <v-divider />

          <v-card-text>
            <!-- aligned controls row -->
            <v-row class="control-row" align="center" dense>
              <v-col cols="12" sm="8">
                <v-text-field
                  v-model="code"
                  label="Tracking code"
                  placeholder="e.g. TRK-20251022-ABC123"
                  prepend-inner-icon="mdi-ticket"
                  variant="outlined"
                  density="comfortable"
                />
              </v-col>

              <v-col cols="12" sm="4" class="d-flex align-center">
                <v-btn :loading="loading" color="#003a6c" class="mr-3" @click="onSearch">
                  <v-icon left>mdi-magnify</v-icon>
                  Search
                </v-btn>

                <v-btn
                  variant="outlined"
                  color="#fdb913"
                  @click="
                    () => {
                      code = ''
                      ticket = null
                      error = ''
                    }
                  "
                >
                  Clear
                </v-btn>
              </v-col>
            </v-row>

            <v-alert v-if="error" type="error" class="mb-4">{{ error }}</v-alert>

            <TicketStatus v-if="ticket" :ticket="ticket" />
            <v-sheet v-else elevation="0" class="pa-6 grey--text text-center">
              Enter a valid tracking code and press Search to view ticket status.
            </v-sheet>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.control-row .v-field,
.control-row .v-text-field,
.control-row .v-input {
  min-height: 48px;
  height: 48px;
}

.control-row .v-field .v-field__control,
.control-row .v-input__control {
  min-height: 48px;
  height: 48px;
  display: flex;
  align-items: center;
}

.control-row .v-field .v-field__prepend,
.control-row .v-field .v-field__append,
.control-row .v-input__prepend,
.control-row .v-input__append {
  height: 48px;
  display: flex;
  align-items: center;
}

.control-row .v-btn {
  height: 48px;
  min-height: 48px;
  display: inline-flex;
  align-items: center;
}

.control-row .v-col.d-flex > .v-btn {
  width: auto;
}

@media (max-width: 600px) {
  .control-row .v-field,
  .control-row .v-btn {
    height: 44px;
    min-height: 44px;
  }
}
</style>
