<script setup>
import { computed } from 'vue'

const props = defineProps({
  currentStatus: { type: String, required: true },
  events: { type: Array, default: () => [] },
  showTimestamps: { type: Boolean, default: true },
})

const steps = [
  { key: 'created', label: 'Created', icon: 'mdi-note-plus' },
  { key: 'verified', label: 'Verified', icon: 'mdi-check-decagram' },
  { key: 'investigating', label: 'Investigating', icon: 'mdi-magnify' },
  { key: 'resolved', label: 'Resolved', icon: 'mdi-flag-checkered' },
]

const activeIndex = computed(() => steps.findIndex((s) => s.key === props.currentStatus))

const getStepColor = (step, index) => {
  if (index > activeIndex.value) return 'grey'
  switch (step.key) {
    case 'resolved':
      return 'success'
    case 'investigating':
      return 'warning'
    default:
      return 'primary'
  }
}

const eventFor = (status) => {
  return (
    props.events
      ?.slice()
      .reverse()
      .find((e) => e.status === status) || null
  )
}
</script>

<template>
  <v-timeline align="start" density="comfortable">
    <v-timeline-item
      v-for="(step, index) in steps"
      :key="step.key"
      :dot-color="getStepColor(step, index)"
      :icon="step.icon"
      :size="index <= activeIndex ? 'default' : 'small'"
      :fill-dot="index <= activeIndex"
    >
      <template #opposite>
        <div v-if="showTimestamps && eventFor(step.key)" class="text-caption text-grey">
          {{ new Date(eventFor(step.key).at).toLocaleString() }}
        </div>
      </template>

      <div class="d-flex flex-column">
        <span
          :class="['text-subtitle-2 font-weight-medium', index <= activeIndex ? '' : 'text-grey']"
        >
          {{ step.label }}
        </span>

        <span v-if="eventFor(step.key)?.note" class="text-caption text-grey mt-1">
          {{ eventFor(step.key).note }}
        </span>
      </div>
    </v-timeline-item>
  </v-timeline>
</template>

<style scoped>
.v-timeline {
  padding-left: 0;
}
</style>
