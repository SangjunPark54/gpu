<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <!-- Background overlay -->
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" @click="handleClose"></div>

      <!-- Modal panel -->
      <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <!-- Icon -->
            <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
              <svg class="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
              </svg>
            </div>
            
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
              <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4" id="modal-title">
                Assign GPU Pool
              </h3>
              
              <!-- Pool Information -->
              <div class="bg-gray-50 rounded-lg p-4 mb-6">
                <h4 class="text-sm font-medium text-gray-900 mb-2">Pool Information</h4>
                <div class="text-sm text-gray-600 space-y-1">
                  <p><span class="font-medium">Pool Name:</span> {{ pool?.poolName }}</p>
                  <p><span class="font-medium">GPU Type:</span> {{ pool?.gpuType }}</p>
                  <p><span class="font-medium">Available:</span> {{ pool ? pool.capacity - pool.used : 0 }} / {{ pool?.capacity }} GPUs</p>
                  <p><span class="font-medium">Project:</span> {{ pool?.project || 'N/A' }}</p>
                </div>
              </div>

              <!-- Assignment Form -->
              <form @submit.prevent="handleSubmit" class="space-y-4">
                <!-- User Selection -->
                <div>
                  <label for="assignedUser" class="block text-sm font-medium text-gray-700 mb-1">
                    Assign to User <span class="text-red-500">*</span>
                  </label>
                  <select
                    id="assignedUser"
                    v-model="formData.assignedUser"
                    required
                    class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="">Select User</option>
                    <option v-for="user in users" :key="user.id" :value="user.id">
                      {{ user.name }} ({{ user.email }})
                    </option>
                  </select>
                </div>

                <!-- GPU Count -->
                <div>
                  <label for="gpuCount" class="block text-sm font-medium text-gray-700 mb-1">
                    Number of GPUs <span class="text-red-500">*</span>
                  </label>
                  <input
                    id="gpuCount"
                    v-model.number="formData.gpuCount"
                    type="number"
                    :min="1"
                    :max="pool ? pool.capacity - pool.used : 1"
                    required
                    class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="Enter number of GPUs"
                  />
                  <p class="mt-1 text-xs text-gray-500">
                    Available: {{ pool ? pool.capacity - pool.used : 0 }} GPUs
                  </p>
                </div>

                <!-- Duration -->
                <div>
                  <label for="duration" class="block text-sm font-medium text-gray-700 mb-1">
                    Duration (days) <span class="text-red-500">*</span>
                  </label>
                  <select
                    id="duration"
                    v-model.number="formData.duration"
                    required
                    class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="">Select Duration</option>
                    <option :value="7">7 days</option>
                    <option :value="14">14 days</option>
                    <option :value="30">30 days</option>
                    <option :value="60">60 days</option>
                    <option :value="90">90 days</option>
                  </select>
                </div>

                <!-- Priority -->
                <div>
                  <label for="priority" class="block text-sm font-medium text-gray-700 mb-1">
                    Priority
                  </label>
                  <select
                    id="priority"
                    v-model="formData.priority"
                    class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>

                <!-- Purpose -->
                <div>
                  <label for="purpose" class="block text-sm font-medium text-gray-700 mb-1">
                    Purpose <span class="text-red-500">*</span>
                  </label>
                  <textarea
                    id="purpose"
                    v-model="formData.purpose"
                    required
                    rows="3"
                    class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="Describe the purpose of this GPU allocation..."
                  ></textarea>
                </div>

                <!-- Auto-extend option -->
                <div class="flex items-center">
                  <input
                    id="autoExtend"
                    v-model="formData.autoExtend"
                    type="checkbox"
                    class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <label for="autoExtend" class="ml-2 block text-sm text-gray-700">
                    Auto-extend when approaching expiration
                  </label>
                </div>
              </form>
            </div>
          </div>
        </div>
        
        <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            type="button"
            @click="handleSubmit"
            :disabled="!isFormValid || isSaving"
            class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg v-if="isSaving" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ isSaving ? 'Assigning...' : 'Assign GPU Pool' }}
          </button>
          <button
            type="button"
            @click="handleClose"
            class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

// Props
interface Props {
  isOpen: boolean
  pool?: any | null
}

const props = withDefaults(defineProps<Props>(), {
  pool: null
})

// Emits
const emit = defineEmits<{
  close: []
  save: [formData: any]
}>()

// Reactive data
const isSaving = ref<boolean>(false)

// Mock users data - in real app, this would come from API
const users = ref([
  { id: 'user-001', name: 'John Doe', email: 'john.doe@company.com' },
  { id: 'user-002', name: 'Jane Smith', email: 'jane.smith@company.com' },
  { id: 'user-003', name: 'Mike Johnson', email: 'mike.johnson@company.com' },
  { id: 'user-004', name: 'Sarah Wilson', email: 'sarah.wilson@company.com' },
  { id: 'user-005', name: 'David Brown', email: 'david.brown@company.com' }
])

interface FormData {
  assignedUser: string
  gpuCount: number
  duration: number | ''
  priority: string
  purpose: string
  autoExtend: boolean
}

const formData = ref<FormData>({
  assignedUser: '',
  gpuCount: 1,
  duration: '',
  priority: 'medium',
  purpose: '',
  autoExtend: false
})

// Computed properties
const isFormValid = computed(() => {
  return formData.value.assignedUser && 
         formData.value.gpuCount > 0 && 
         formData.value.duration && 
         formData.value.purpose.trim()
})

// Methods
const handleClose = () => {
  resetForm()
  emit('close')
}

const handleSubmit = async () => {
  if (!isFormValid.value) return
  
  isSaving.value = true
  try {
    const durationInDays = Number(formData.value.duration)
    const assignmentData = {
      poolName: props.pool?.poolName,
      assignedUser: formData.value.assignedUser,
      gpuCount: formData.value.gpuCount,
      duration: durationInDays,
      priority: formData.value.priority,
      purpose: formData.value.purpose,
      autoExtend: formData.value.autoExtend,
      assignedAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + durationInDays * 24 * 60 * 60 * 1000).toISOString()
    }
    
    emit('save', assignmentData)
    handleClose()
  } catch (error) {
    console.error('Failed to assign pool:', error)
  } finally {
    isSaving.value = false
  }
}

const resetForm = () => {
  formData.value = {
    assignedUser: '',
    gpuCount: 1,
    duration: '',
    priority: 'medium',
    purpose: '',
    autoExtend: false
  }
  isSaving.value = false
}

// Watchers
watch(() => props.isOpen, (newValue) => {
  if (newValue) {
    resetForm()
    // Set default GPU count to 1 or max available
    if (props.pool) {
      const available = props.pool.capacity - props.pool.used
      formData.value.gpuCount = Math.min(1, available)
    }
  }
})

watch(() => props.pool, (newPool) => {
  if (newPool) {
    const available = newPool.capacity - newPool.used
    if (formData.value.gpuCount > available) {
      formData.value.gpuCount = available
    }
  }
})
</script> 