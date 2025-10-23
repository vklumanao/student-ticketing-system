<script setup>
import { ref, computed, onMounted } from 'vue'
import TicketDetails from './TicketDetails.vue'
import AdminUpdateDialog from './AdminUpdateDialog.vue'

const tickets = ref([]) // will hold ticket objects

// filter controls
const selectedCategory = ref('')
const selectedStatus = ref('')

// dialog state
const detailsOpen = ref(false)
const updateOpen = ref(false)
const selectedTicket = ref(null)

// table columns
const headers = [
  { title: 'Tracking', key: 'trackingCode' },
  { title: 'Subject', key: 'subject' },
  { title: 'Category', key: 'category' },
  { title: 'Status', key: 'status' },
  { title: 'Created', key: 'createdAt' },
  { title: 'Actions', key: 'actions' },
]

const categories = ['grievance', 'incident', 'suggestion', 'inquiry']
const statuses = ['created', 'verified', 'investigating', 'resolved']

// mock fetch — replace with real API call
const loadTickets = async () => {
  await new Promise((r) => setTimeout(r, 300))
  tickets.value = [
    {
      trackingCode: 'TRK-20251022-ABC123',
      subject: 'Network outage in lab 3',
      category: 'incident',
      status: 'investigating',
      createdAt: '2025-10-22T10:32:00Z',
      description: 'Network disconnected, multiple PCs affected.',
      history: [
        { status: 'created', at: '2025-10-22T10:32:00Z', note: 'Submitted' },
        { status: 'verified', at: '2025-10-22T10:40:00Z', note: 'Verified by staff' },
      ],
      files: [{ name: 'screenshot.png', url: null, type: 'image/png' }],
    },
    {
      trackingCode: 'TRK-20251021-XYZ789',
      subject: 'Suggestion: Add more power outlets',
      category: 'suggestion',
      status: 'created',
      createdAt: '2025-10-21T09:10:00Z',
      description: 'Please add outlets in study area.',
      history: [{ status: 'created', at: '2025-10-21T09:10:00Z', note: 'Submitted' }],
      files: [],
    },
  ]
}

onMounted(loadTickets)

const filteredTickets = computed(() => {
  return tickets.value.filter((t) => {
    if (selectedCategory.value && t.category !== selectedCategory.value) return false
    if (selectedStatus.value && t.status !== selectedStatus.value) return false
    return true
  })
})

const openDetails = (t) => {
  selectedTicket.value = t
  detailsOpen.value = true
}

const openUpdate = (t) => {
  selectedTicket.value = t
  updateOpen.value = true
}

const onSaved = (payload) => {
  // payload contains { trackingCode, status, note, at }
  const idx = tickets.value.findIndex((x) => x.trackingCode === payload.trackingCode)
  if (idx !== -1) {
    // update status and push history
    tickets.value[idx].status = payload.status
    tickets.value[idx].history = tickets.value[idx].history || []
    tickets.value[idx].history.push({ status: payload.status, at: payload.at, note: payload.note })
  }
  updateOpen.value = false
}
</script>

<template>
  <v-card elevation="2" class="pa-4">
    <v-row class="mb-4" align="center" dense>
      <v-col cols="12" sm="4">
        <v-text-field
          v-model="selectedCategory"
          label="Filter by category"
          placeholder="Select category"
          clearable
          variant="outlined"
          :items="categories"
          density="comfortable"
          readonly
        />
      </v-col>

      <v-col cols="12" sm="4">
        <v-text-field
          v-model="selectedStatus"
          label="Filter by status"
          placeholder="Select status"
          clearable
          variant="outlined"
          :items="statuses"
          density="comfortable"
          readonly
        />
      </v-col>

      <v-col cols="12" sm="4" class="d-flex justify-end">
        <v-btn color="#003a6c" class="mr-3" @click="loadTickets">
          <v-icon left>mdi-refresh</v-icon>
          Refresh
        </v-btn>
      </v-col>
    </v-row>

    <v-data-table :items="filteredTickets" :headers="headers" dense>
      <template #item.category="{ item }">
        <v-chip color="" text-color="">{{ item.category }}</v-chip>
      </template>

      <template #item.status="{ item }">
        <v-chip
          small
          :color="
            item.status === 'resolved'
              ? 'success'
              : item.status === 'investigating'
                ? 'warning'
                : item.status === 'verified'
                  ? 'primary'
                  : 'grey'
          "
          text-color="white"
        >
          {{ item.status }}
        </v-chip>
      </template>

      <template #item.createdAt="{ item }">
        {{ item.createdAt ? new Date(item.createdAt).toLocaleString() : '—' }}
      </template>

      <template #item.actions="{ item }">
        <v-btn icon small @click="openDetails(item)" title="View details">
          <v-icon>mdi-eye</v-icon>
        </v-btn>
        <v-btn icon small @click="openUpdate(item)" title="Update status">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </template>

      <template #no-data>
        <v-card flat class="pa-6 text-center grey--text">No tickets found</v-card>
      </template>
    </v-data-table>
  </v-card>

  <TicketDetails v-if="selectedTicket" :ticket="selectedTicket" v-model:open="detailsOpen" />
  <AdminUpdateDialog
    v-if="selectedTicket"
    :ticket="selectedTicket"
    v-model="updateOpen"
    @saved="onSaved"
  />
</template>

<style scoped>
/* simple spacing tweaks */
</style>
