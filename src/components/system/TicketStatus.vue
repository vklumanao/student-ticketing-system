<script setup>
import { computed } from 'vue'
import StatusTimeline from './StatusTimeline.vue'

const props = defineProps({
  ticket: { type: Object, required: true },
})

const statusColor = (s) => {
  switch (s) {
    case 'created':
      return 'grey'
    case 'verified':
      return 'primary'
    case 'investigating':
      return 'warning'
    case 'resolved':
      return 'success'
    default:
      return 'grey'
  }
}

const statusLabel = (s) => {
  switch (s) {
    case 'created':
      return 'Created'
    case 'verified':
      return 'Verified'
    case 'investigating':
      return 'Investigating'
    case 'resolved':
      return 'Resolved'
    default:
      return s
  }
}

const attachments = computed(() => props.ticket.files || [])
</script>

<template>
  <v-card class="pa-6">
    <v-row>
      <!-- LEFT SECTION: Ticket Details -->
      <v-col cols="12" md="8" class="pr-md-8">
        <!-- Header Chips -->
        <div class="d-flex flex-wrap align-center mb-4">
          <v-chip
            :color="statusColor(ticket.status)"
            class="text-white font-weight-medium"
            size="large"
            variant="flat"
          >
            {{ statusLabel(ticket.status) }}
          </v-chip>

          <v-chip
            class="ml-3 font-weight-medium"
            color="#fdb913"
            text-color="#002548"
            size="large"
            variant="flat"
          >
            {{ ticket.category || '—' }}
          </v-chip>

          <v-spacer></v-spacer>

          <v-tooltip text="Date the ticket was created">
            <template #activator="{ props }">
              <div v-bind="props" class="text-caption text-medium-emphasis">
                <v-icon size="small" class="mr-1">mdi-calendar</v-icon>
                {{ ticket.createdAt ? new Date(ticket.createdAt).toLocaleString() : '—' }}
              </div>
            </template>
          </v-tooltip>
        </div>

        <!-- Ticket Subject -->
        <div class="mb-4">
          <div class="text-h6 font-weight-semibold">{{ ticket.subject || 'No subject' }}</div>
          <div class="text-caption text-medium-emphasis mt-1">
            Tracking Code:
            <strong class="font-mono">{{ ticket.trackingCode || '—' }}</strong>
          </div>
        </div>

        <!-- Description -->
        <v-sheet color="grey-lighten-4" rounded="lg" class="pa-4 mb-5">
          <div class="text-subtitle-2 font-weight-medium mb-1">Description</div>
          <div class="text-body-2 text-medium-emphasis" style="white-space: pre-wrap">
            {{ ticket.description || '—' }}
          </div>
        </v-sheet>

        <!-- Attachments -->
        <div v-if="attachments.length" class="mb-6">
          <div class="text-subtitle-2 font-weight-medium mb-2">Attachments</div>
          <v-row dense>
            <v-col v-for="(f, i) in attachments" :key="i" cols="12" sm="6" md="4">
              <v-card variant="outlined" class="rounded-lg">
                <v-card-text class="d-flex align-center justify-space-between">
                  <div>
                    <div class="text-body-2 font-weight-medium">{{ f.name }}</div>
                    <div class="text-caption text-medium-emphasis">{{ f.type || 'file' }}</div>
                  </div>

                  <v-btn
                    icon
                    size="small"
                    :href="f.url || '#'"
                    target="_blank"
                    :disabled="!f.url"
                    title="Open Attachment"
                    variant="text"
                  >
                    <v-icon size="18">mdi-open-in-new</v-icon>
                  </v-btn>
                </v-card-text>

                <v-img
                  v-if="f.type && f.type.startsWith('image/')"
                  :src="f.url"
                  max-height="160"
                  class="rounded-b-lg"
                  cover
                />
              </v-card>
            </v-col>
          </v-row>
        </div>
      </v-col>

      <!-- RIGHT SECTION: Status Timeline -->
      <v-col cols="12" md="4">
        <v-sheet class="pa-4 sticky-timeline">
          <div class="text-subtitle-2 font-weight-medium mb-3">
            <v-icon size="18" class="mr-1 text-primary">mdi-timeline</v-icon>
            Status Timeline
          </div>

          <StatusTimeline
            :current-status="ticket.status || 'created'"
            :events="ticket.history || []"
          />
        </v-sheet>
      </v-col>
    </v-row>
  </v-card>
</template>

<style scoped>
.file-name {
  font-weight: 600;
  color: #073a5a;
}
.sticky-timeline {
  position: sticky;
  top: 20px;
}
</style>
