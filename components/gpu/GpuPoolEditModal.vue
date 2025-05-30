<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto">
    <!-- Backdrop -->
    <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity" @click="closeModal"></div>
    
    <!-- Modal -->
    <div class="flex min-h-full items-center justify-center p-4">
      <div class="relative bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        <!-- Header -->
        <div class="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 class="text-xl font-semibold text-gray-900">
              {{ isEditMode ? 'Edit GPU Pool' : 'Create GPU Pool' }}
            </h2>
            <p class="text-sm text-gray-500 mt-1">
              {{ isEditMode ? `Editing ${formData.poolName}` : 'Create a new GPU pool' }}
            </p>
          </div>
          <button @click="closeModal" class="text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-lg p-2">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <!-- Content -->
        <form @submit.prevent="handleSubmit" class="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
          <div class="space-y-6">
            <!-- Basic Information -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label for="realm" class="block text-sm font-medium text-gray-700 mb-2">
                  Realm <span class="text-red-500">*</span>
                </label>
                <select 
                  id="realm"
                  v-model="formData.realm" 
                  required
                  class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Select Realm</option>
                  <option value="production">Production</option>
                  <option value="staging">Staging</option>
                  <option value="development">Development</option>
                  <option value="testing">Testing</option>
                </select>
              </div>

              <div>
                <label for="project" class="block text-sm font-medium text-gray-700 mb-2">
                  Project <span class="text-red-500">*</span>
                </label>
                <select 
                  id="project"
                  v-model="formData.project" 
                  required
                  class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Select Project</option>
                  <option value="ai-research">AI Research</option>
                  <option value="ml-training">ML Training</option>
                  <option value="data-analytics">Data Analytics</option>
                  <option value="computer-vision">Computer Vision</option>
                  <option value="nlp-processing">NLP Processing</option>
                </select>
              </div>
            </div>

            <div>
              <label for="poolName" class="block text-sm font-medium text-gray-700 mb-2">
                Pool Name <span class="text-red-500">*</span>
              </label>
              <input 
                id="poolName"
                v-model="formData.poolName" 
                type="text" 
                required
                :disabled="isEditMode"
                placeholder="e.g., gpu-pool-a100-01"
                class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
              <p v-if="isEditMode" class="text-xs text-gray-500 mt-1">Pool name cannot be changed after creation</p>
            </div>

            <!-- Resource Configuration -->
            <div class="border-t border-gray-200 pt-6">
              <h3 class="text-lg font-medium text-gray-900 mb-4">Resource Configuration</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label for="core" class="block text-sm font-medium text-gray-700 mb-2">
                    GPU Cores <span class="text-red-500">*</span>
                  </label>
                  <input 
                    id="core"
                    v-model.number="formData.core" 
                    type="number" 
                    min="1"
                    max="128"
                    required
                    placeholder="e.g., 8"
                    class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label for="memory" class="block text-sm font-medium text-gray-700 mb-2">
                    Memory (GB) <span class="text-red-500">*</span>
                  </label>
                  <input 
                    id="memory"
                    v-model.number="formData.memory" 
                    type="number" 
                    min="1"
                    max="1024"
                    required
                    placeholder="e.g., 80"
                    class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>

            <!-- Status Configuration -->
            <div class="border-t border-gray-200 pt-6">
              <h3 class="text-lg font-medium text-gray-900 mb-4">Status Configuration</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label for="status" class="block text-sm font-medium text-gray-700 mb-2">
                    Status <span class="text-red-500">*</span>
                  </label>
                  <select 
                    id="status"
                    v-model="formData.status" 
                    required
                    class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="">Select Status</option>
                    <option value="RUNNING">Running</option>
                    <option value="STOPPED">Stopped</option>
                  </select>
                </div>

                <div>
                  <label for="approval" class="block text-sm font-medium text-gray-700 mb-2">
                    Approval Status <span class="text-red-500">*</span>
                  </label>
                  <select 
                    id="approval"
                    v-model="formData.approval" 
                    required
                    class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="">Select Approval</option>
                    <option value="APPROVED">Approved</option>
                    <option value="REJECTED">Rejected</option>
                    <option value="PENDING">Pending</option>
                  </select>
                </div>
              </div>
            </div>

            <!-- Request Information (if applicable) -->
            <div v-if="formData.requestId" class="border-t border-gray-200 pt-6">
              <h3 class="text-lg font-medium text-gray-900 mb-4">Request Information</h3>
              <div>
                <label for="requestId" class="block text-sm font-medium text-gray-700 mb-2">
                  Request ID
                </label>
                <input 
                  id="requestId"
                  v-model="formData.requestId" 
                  type="text" 
                  placeholder="e.g., req-001"
                  class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            <!-- Validation Errors -->
            <div v-if="validationErrors.length > 0" class="bg-red-50 border border-red-200 rounded-md p-4">
              <div class="flex">
                <div class="flex-shrink-0">
                  <svg class="h-5 w-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z"></path>
                  </svg>
                </div>
                <div class="ml-3">
                  <h3 class="text-sm font-medium text-red-800">Validation Errors</h3>
                  <div class="mt-2 text-sm text-red-700">
                    <ul class="list-disc pl-5 space-y-1">
                      <li v-for="error in validationErrors" :key="error">{{ error }}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>

        <!-- Footer -->
        <div class="flex items-center justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50">
          <button 
            type="button"
            @click="closeModal" 
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button 
            type="submit"
            @click="handleSubmit"
            :disabled="isSubmitting"
            class="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="isSubmitting" class="flex items-center">
              <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Saving...
            </span>
            <span v-else>
              {{ isEditMode ? 'Update Pool' : 'Create Pool' }}
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

// Types based on GpuVO
interface GpuPoolFormData {
  realm: string
  project: string
  poolName: string
  core: number
  memory: number
  approval: 'APPROVED' | 'REJECTED' | 'PENDING' | ''
  status: 'RUNNING' | 'STOPPED' | ''
  requestId?: string
}

interface GpuPool {
  poolName: string
  project?: string
  gpuType: string
  status: 'active' | 'inactive' | 'maintenance'
  capacity: number
  used: number
}

interface Props {
  isOpen: boolean
  pool?: GpuPool | null
}

const props = defineProps<Props>()

// Emits
const emit = defineEmits<{
  close: []
  save: [data: GpuPoolFormData]
}>()

// Reactive data
const isSubmitting = ref(false)
const validationErrors = ref<string[]>([])

// Form data
const formData = ref<GpuPoolFormData>({
  realm: '',
  project: '',
  poolName: '',
  core: 1,
  memory: 1,
  approval: '',
  status: '',
  requestId: ''
})

// Computed
const isEditMode = computed(() => !!props.pool)

// Methods
const closeModal = () => {
  resetForm()
  emit('close')
}

const resetForm = () => {
  formData.value = {
    realm: '',
    project: '',
    poolName: '',
    core: 1,
    memory: 1,
    approval: '',
    status: '',
    requestId: ''
  }
  validationErrors.value = []
  isSubmitting.value = false
}

const validateForm = (): boolean => {
  validationErrors.value = []

  if (!formData.value.realm) {
    validationErrors.value.push('Realm is required')
  }

  if (!formData.value.project) {
    validationErrors.value.push('Project is required')
  }

  if (!formData.value.poolName) {
    validationErrors.value.push('Pool name is required')
  } else if (!/^[a-z0-9-]+$/.test(formData.value.poolName)) {
    validationErrors.value.push('Pool name must contain only lowercase letters, numbers, and hyphens')
  }

  if (!formData.value.core || formData.value.core < 1) {
    validationErrors.value.push('GPU cores must be at least 1')
  }

  if (!formData.value.memory || formData.value.memory < 1) {
    validationErrors.value.push('Memory must be at least 1 GB')
  }

  if (!formData.value.status) {
    validationErrors.value.push('Status is required')
  }

  if (!formData.value.approval) {
    validationErrors.value.push('Approval status is required')
  }

  return validationErrors.value.length === 0
}

const handleSubmit = async () => {
  if (!validateForm()) {
    return
  }

  isSubmitting.value = true

  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    emit('save', { ...formData.value })
    closeModal()
  } catch (error) {
    console.error('Failed to save GPU pool:', error)
    validationErrors.value = ['Failed to save GPU pool. Please try again.']
  } finally {
    isSubmitting.value = false
  }
}

const populateFormFromPool = (pool: GpuPool) => {
  // Map existing pool data to form data
  formData.value = {
    realm: 'production', // Default, would come from API
    project: pool.project || '',
    poolName: pool.poolName,
    core: pool.capacity, // Map capacity to core
    memory: pool.capacity * 10, // Estimate memory based on capacity
    approval: 'APPROVED', // Default for existing pools
    status: pool.status === 'active' ? 'RUNNING' : 'STOPPED',
    requestId: ''
  }
}

// Watch for pool changes
watch(() => props.pool, (newPool) => {
  if (newPool && props.isOpen) {
    populateFormFromPool(newPool)
  } else if (!newPool && props.isOpen) {
    resetForm()
  }
}, { immediate: true })

// Watch for modal open/close
watch(() => props.isOpen, (isOpen) => {
  if (!isOpen) {
    resetForm()
  } else if (props.pool) {
    populateFormFromPool(props.pool)
  }
})
</script> 