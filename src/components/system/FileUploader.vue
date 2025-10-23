<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  files: { type: Array, default: () => [] },
})
const emit = defineEmits(['update:files'])

const internalFiles = ref([...props.files])

watch(
  () => props.files,
  (v) => {
    internalFiles.value = [...v]
  },
)

const maxSize = 10 * 1024 * 1024 // 10MB per file
const accept = 'image/*,application/pdf,video/*,audio/*'

const onFileChange = (files) => {
  const list = Array.from(files || [])
  const filtered = list.filter((f) => f.size <= maxSize)
  internalFiles.value = filtered
  emit('update:files', internalFiles.value)
}

const removeFile = (index) => {
  internalFiles.value.splice(index, 1)
  emit('update:files', internalFiles.value)
}
</script>

<template>
  <div class="file-uploader">
    <v-file-input
      show-size
      multiple
      v-model="internalFiles"
      :accept="accept"
      :counter-size="true"
      label="Upload supporting files (optional)"
      hint="Accepted: images, pdf, audio, video. Max 10MB per file."
      persistent-hint
      prepend-inner-icon="mdi-upload"
      @update:modelValue="onFileChange($event)"
      variant="outlined"
    />

    <v-row class="mt-3" dense>
      <v-col v-for="(f, idx) in internalFiles" :key="idx" cols="12" sm="6" md="4">
        <v-card class="file-card" outlined>
          <v-row no-gutters class="align-center">
            <v-col cols="9">
              <div class="file-name">{{ f.name }}</div>
              <div class="file-size grey--text text--small">
                {{ (f.size / 1024 / 1024).toFixed(2) }} MB
              </div>
            </v-col>

            <v-col cols="3" class="d-flex justify-end">
              <v-btn icon small @click="removeFile(idx)" title="Remove file">
                <v-icon color="#c62828">mdi-close</v-icon>
              </v-btn>
            </v-col>
          </v-row>

          <v-divider class="my-2" />

          <div v-if="f.type && f.type.startsWith('image/')" class="preview-wrap">
            <v-img :src="URL.createObjectURL(f)" class="preview" contain max-height="160" />
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<style scoped>
.file-uploader {
  margin-top: 6px;
}
.file-card {
  border-radius: 8px;
  padding: 10px;
  transition: box-shadow 0.18s ease;
}
.file-card:hover {
  box-shadow: 0 10px 24px rgba(3, 37, 76, 0.06);
}

.file-name {
  font-weight: 600;
  color: #073a5a;
}
.file-size {
  font-size: 0.82rem;
}

.preview-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 6px;
}
.preview {
  border-radius: 6px;
  width: 100%;
  object-fit: cover;
}
</style>
