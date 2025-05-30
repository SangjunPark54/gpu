<template>
  <div v-if="isVisible" class="fixed top-4 right-4 z-50 max-w-sm w-full">
    <div 
      :class="[
        'rounded-lg shadow-lg p-4 mb-4 transition-all duration-300 transform',
        typeClasses,
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      ]"
    >
      <div class="flex items-start">
        <div class="flex-shrink-0">
          <svg v-if="type === 'success'" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
          </svg>
          <svg v-else-if="type === 'error'" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
          </svg>
          <svg v-else-if="type === 'warning'" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
          </svg>
          <svg v-else class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
          </svg>
        </div>
        <div class="ml-3 flex-1">
          <h3 v-if="title" class="text-sm font-medium">{{ title }}</h3>
          <div class="text-sm" :class="title ? 'mt-1' : ''">
            <p>{{ message }}</p>
          </div>
        </div>
        <div class="ml-4 flex-shrink-0">
          <button @click="close" class="inline-flex rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2" :class="closeButtonClasses">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

interface Props {
  type?: 'success' | 'error' | 'warning' | 'info'
  title?: string
  message: string
  duration?: number
  autoClose?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'info',
  duration: 5000,
  autoClose: true
})

const emit = defineEmits<{
  close: []
}>()

const isVisible = ref(false)
let timeoutId: NodeJS.Timeout | null = null

const typeClasses = computed(() => {
  switch (props.type) {
    case 'success':
      return 'bg-green-50 border border-green-200 text-green-800'
    case 'error':
      return 'bg-red-50 border border-red-200 text-red-800'
    case 'warning':
      return 'bg-yellow-50 border border-yellow-200 text-yellow-800'
    default:
      return 'bg-blue-50 border border-blue-200 text-blue-800'
  }
})

const closeButtonClasses = computed(() => {
  switch (props.type) {
    case 'success':
      return 'text-green-400 hover:text-green-600 focus:ring-green-500'
    case 'error':
      return 'text-red-400 hover:text-red-600 focus:ring-red-500'
    case 'warning':
      return 'text-yellow-400 hover:text-yellow-600 focus:ring-yellow-500'
    default:
      return 'text-blue-400 hover:text-blue-600 focus:ring-blue-500'
  }
})

const close = () => {
  isVisible.value = false
  if (timeoutId) {
    clearTimeout(timeoutId)
  }
  setTimeout(() => {
    emit('close')
  }, 300) // Wait for animation to complete
}

onMounted(() => {
  // Show toast with slight delay for animation
  setTimeout(() => {
    isVisible.value = true
  }, 100)

  // Auto close if enabled
  if (props.autoClose) {
    timeoutId = setTimeout(() => {
      close()
    }, props.duration)
  }
})

onUnmounted(() => {
  if (timeoutId) {
    clearTimeout(timeoutId)
  }
})
</script> 