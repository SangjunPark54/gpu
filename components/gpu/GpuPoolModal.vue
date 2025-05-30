<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <!-- Background overlay -->
      <div 
        class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" 
        aria-hidden="true"
        @click="handleClose"
      ></div>

      <!-- Modal panel -->
      <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <form @submit.prevent="handleSubmit">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mt-3 text-center sm:mt-0 sm:text-left w-full">
                <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4" id="modal-title">
                  {{ isEdit ? 'Edit GPU Pool' : 'Create GPU Pool' }}
                </h3>
                
                <div class="space-y-4">
                  <!-- Pool Name -->
                  <div>
                    <label for="poolName" class="block text-sm font-medium text-gray-700 mb-1">
                      Pool Name *
                    </label>
                    <input
                      id="poolName"
                      v-model="formData.poolName"
                      type="text"
                      required
                      :disabled="isEdit"
                      class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100"
                      placeholder="Enter pool name"
                    />
                  </div>

                  <!-- GPU Type -->
                  <div>
                    <label for="gpuType" class="block text-sm font-medium text-gray-700 mb-1">
                      GPU Type *
                    </label>
                    <select
                      id="gpuType"
                      v-model="formData.gpuType"
                      required
                      class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="">Select GPU Type</option>
                      <option value="NVIDIA A100">NVIDIA A100</option>
                      <option value="NVIDIA V100">NVIDIA V100</option>
                      <option value="NVIDIA RTX 4090">NVIDIA RTX 4090</option>
                      <option value="NVIDIA RTX 3090">NVIDIA RTX 3090</option>
                      <option value="NVIDIA T4">NVIDIA T4</option>
                    </select>
                  </div>

                  <!-- Capacity -->
                  <div>
                    <label for="capacity" class="block text-sm font-medium text-gray-700 mb-1">
                      Capacity *
                    </label>
                    <input
                      id="capacity"
                      v-model.number="formData.capacity"
                      type="number"
                      min="1"
                      max="100"
                      required
                      class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Enter capacity"
                    />
                  </div>

                  <!-- Project (optional) -->
                  <div>
                    <label for="project" class="block text-sm font-medium text-gray-700 mb-1">
                      Project
                    </label>
                    <select
                      id="project"
                      v-model="formData.project"
                      class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="">No specific project</option>
                      <option v-for="project in availableProjects" :key="project" :value="project">
                        {{ project }}
                      </option>
                    </select>
                  </div>

                  <!-- Status -->
                  <div>
                    <label for="status" class="block text-sm font-medium text-gray-700 mb-1">
                      Status *
                    </label>
                    <select
                      id="status"
                      v-model="formData.status"
                      required
                      class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="maintenance">Maintenance</option>
                    </select>
                  </div>

                  <!-- Description -->
                  <div>
                    <label for="description" class="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      id="description"
                      v-model="formData.description"
                      rows="3"
                      class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Enter description (optional)"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Modal actions -->
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="submit"
              :disabled="loading"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ loading ? 'Saving...' : (isEdit ? 'Update' : 'Create') }}
            </button>
            <button
              type="button"
              @click="handleClose"
              :disabled="loading"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed, onMounted, onUnmounted } from 'vue'

// Props
interface Props {
  isOpen: boolean
  poolData?: any
  availableProjects?: string[]
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  availableProjects: () => [],
  loading: false
})

// Emits
const emit = defineEmits<{
  close: []
  submit: [data: any]
}>()

// Reactive data
const formData = ref({
  poolName: '',
  gpuType: '',
  capacity: 1,
  project: '',
  status: 'active',
  description: ''
})

// Computed
const isEdit = computed(() => !!props.poolData)

// Watchers
watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    resetForm()
    if (props.poolData) {
      // Populate form with existing data for editing
      formData.value = {
        poolName: props.poolData.poolName || '',
        gpuType: props.poolData.gpuType || '',
        capacity: props.poolData.capacity || 1,
        project: props.poolData.project || '',
        status: props.poolData.status || 'active',
        description: props.poolData.description || ''
      }
    }
  }
})

// Methods
const resetForm = () => {
  formData.value = {
    poolName: '',
    gpuType: '',
    capacity: 1,
    project: '',
    status: 'active',
    description: ''
  }
}

const handleClose = () => {
  if (!props.loading) {
    emit('close')
  }
}

const handleSubmit = () => {
  // Validate form
  if (!formData.value.poolName || !formData.value.gpuType || !formData.value.capacity) {
    return
  }

  // Emit submit event with form data
  emit('submit', { ...formData.value })
}

// Handle escape key
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && props.isOpen && !props.loading) {
    handleClose()
  }
}

// Add event listener for escape key
onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script> 