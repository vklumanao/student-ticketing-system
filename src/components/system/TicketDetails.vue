<script setup>
import { computed } from 'vue'
const props = defineProps({
  ticket: { type: Object, required: true },
  //   open: { type: Boolean, default: true },
})
const emit = defineEmits(['update:open'])

const attachments = computed(() => props.ticket.files || [])

const close = () => emit('update:open', false)
</script>

<template>
  <v-dialog v-model="open" width="900">
    <v-card>
      <v-card-title class="d-flex align-center">
        <div>
          <div class="text-h6">{{ ticket.subject || 'Ticket details' }}</div>
          <div class="subtitle-2 grey--text">Tracking: {{ ticket.trackingCode }}</div>
        </div>

        <v-spacer />

        <v-chip
          :color="
            ticket.status === 'resolved'
              ? 'success'
              : ticket.status === 'investigating'
                ? 'warning'
                : ticket.status === 'verified'
                  ? 'primary'
                  : 'grey'
          "
          text-color="white"
        >
          {{ ticket.status }}
        </v-chip>
      </v-card-title>

      <v-divider />

      <v-card-text>
        <div class="mb-4">
          <div class="subtitle-2 font-weight-medium">Description</div>
          <div style="white-space: pre-wrap">{{ ticket.description }}</div>
        </div>

        <div v-if="attachments.length" class="mb-4">
          <div class="subtitle-2 mb-2">Attachments</div>
          <v-row dense>
            <v-col v-for="(f, i) in attachments" :key="i" cols="12" sm="6" md="4">
              <v-card outlined class="pa-2">
                <div class="d-flex justify-space-between align-center">
                  <div>
                    <div class="file-name">{{ f.name }}</div>
                    <div class="grey--text text--small">{{ f.type || 'file' }}</div>
                  </div>
                  <v-btn icon small :href="f.url || '#'" target="_blank" :disabled="!f.url">
                    <v-icon>mdi-open-in-new</v-icon>
                  </v-btn>
                </div>

                <div v-if="f.type && f.type.startsWith('image/')" class="mt-2">
                  <v-img :src="f.url || ''" max-height="120" contain />
                </div>
              </v-card>
            </v-col>
          </v-row>
        </div>

        <div class="mb-2">
          <div class="subtitle-2 mb-1">History</div>
          <v-timeline dense>
            <v-timeline-item
              v-for="(h, idx) in ticket.history || []"
              :key="idx"
              :icon="idx === 0 ? 'mdi-note-plus' : 'mdi-circle-outline'"
            >
              <template #opposite>
                <div class="text-caption grey--text">{{ new Date(h.at).toLocaleString() }}</div>
              </template>
              <div>{{ h.note || h.status }}</div>
            </v-timeline-item>
          </v-timeline>
        </div>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn text color="#003a6c" @click="close">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.file-name {
  font-weight: 600;
  color: #073a5a;
}
</style>
