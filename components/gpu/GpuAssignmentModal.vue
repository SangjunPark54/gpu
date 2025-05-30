<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <!-- Background overlay -->
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" @click="handleClose"></div>

      <!-- Modal panel -->
      <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <form @submit.prevent="handleSubmit">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mt-3 text-center sm:mt-0 sm:text-left w-full">
                <h3 class="text-lg leading-6 font-medium text-gray-900 mb-6" id="modal-title">
                  {{ isEditMode ? 'Edit GPU Assignment' : 'New GPU Assignment' }}
                </h3>

                <div class="space-y-6">
                  <!-- User Selection -->
                  <div>
                    <label for="userName" class="block text-sm font-medium text-gray-700 mb-2">User *</label>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <input
                          id="userName"
                          v-model="formData.userName"
                          type="text"
                          required
                          placeholder="User Name"
                          class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          :class="{ 'border-red-500': errors.userName }"
                        />
                        <p v-if="errors.userName" class="mt-1 text-sm text-red-600">{{ errors.userName }}</p>
                      </div>
                      <div>
                        <input
                          id="userEmail"
                          v-model="formData.userEmail"
                          type="email"
                          required
                          placeholder="user@company.com"
                          class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          :class="{ 'border-red-500': errors.userEmail }"
                        />
                        <p v-if="errors.userEmail" class="mt-1 text-sm text-red-600">{{ errors.userEmail }}</p>
                      </div>
                    </div>
                  </div>

                  <!-- Environment Configuration -->
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label for="realm" class="block text-sm font-medium text-gray-700 mb-2">Realm *</label>
                      <select
                        id="realm"
                        v-model="formData.realm"
                        required
                        class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        :class="{ 'border-red-500': errors.realm }"
                      >
                        <option value="">Select Realm</option>
                        <option v-for="realm in realms" :key="realm" :value="realm">{{ realm }}</option>
                      </select>
                      <p v-if="errors.realm" class="mt-1 text-sm text-red-600">{{ errors.realm }}</p>
                    </div>

                    <div>
                      <label for="project" class="block text-sm font-medium text-gray-700 mb-2">Project *</label>
                      <select
                        id="project"
                        v-model="formData.project"
                        required
                        class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        :class="{ 'border-red-500': errors.project }"
                      >
                        <option value="">Select Project</option>
                        <option v-for="project in projects" :key="project" :value="project">{{ project }}</option>
                      </select>
                      <p v-if="errors.project" class="mt-1 text-sm text-red-600">{{ errors.project }}</p>
                    </div>
                  </div>

                  <!-- GPU Pool Selection -->
                  <div>
                    <label for="poolName" class="block text-sm font-medium text-gray-700 mb-2">GPU Pool *</label>
                    <select
                      id="poolName"
                      v-model="formData.poolName"
                      required
                      @change="handlePoolChange"
                      class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      :class="{ 'border-red-500': errors.poolName }"
                    >
                      <option value="">Select GPU Pool</option>
                      <option v-for="pool in availablePools" :key="pool.name" :value="pool.name">
                        {{ pool.name }} ({{ pool.gpuType }} - {{ pool.available }}/{{ pool.capacity }} available)
                      </option>
                    </select>
                    <p v-if="errors.poolName" class="mt-1 text-sm text-red-600">{{ errors.poolName }}</p>
                  </div>

                  <!-- GPU Count and Duration -->
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label for="gpuCount" class="block text-sm font-medium text-gray-700 mb-2">GPU Count *</label>
                      <input
                        id="gpuCount"
                        v-model.number="formData.gpuCount"
                        type="number"
                        min="1"
                        :max="selectedPoolInfo?.available || 1"
                        required
                        class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        :class="{ 'border-red-500': errors.gpuCount }"
                      />
                      <p v-if="errors.gpuCount" class="mt-1 text-sm text-red-600">{{ errors.gpuCount }}</p>
                      <p v-if="selectedPoolInfo" class="mt-1 text-xs text-gray-500">
                        Available: {{ selectedPoolInfo.available }} GPUs
                      </p>
                    </div>

                    <div>
                      <label for="duration" class="block text-sm font-medium text-gray-700 mb-2">Duration (days) *</label>
                      <select
                        id="duration"
                        v-model.number="formData.duration"
                        required
                        class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        :class="{ 'border-red-500': errors.duration }"
                      >
                        <option value="">Select Duration</option>
                        <option :value="7">1 Week</option>
                        <option :value="14">2 Weeks</option>
                        <option :value="30">1 Month</option>
                        <option :value="60">2 Months</option>
                        <option :value="90">3 Months</option>
                        <option :value="180">6 Months</option>
                      </select>
                      <p v-if="errors.duration" class="mt-1 text-sm text-red-600">{{ errors.duration }}</p>
                    </div>
                  </div>

                  <!-- Assignment Details -->
                  <div>
                    <label for="purpose" class="block text-sm font-medium text-gray-700 mb-2">Purpose</label>
                    <textarea
                      id="purpose"
                      v-model="formData.purpose"
                      rows="3"
                      placeholder="Describe the purpose of this GPU assignment..."
                      class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    ></textarea>
                  </div>

                  <!-- Assignment Summary -->
                  <div v-if="formData.poolName && formData.gpuCount && formData.duration" class="bg-gray-50 rounded-lg p-4">
                    <h4 class="text-sm font-medium text-gray-900 mb-2">Assignment Summary</h4>
                    <div class="text-sm text-gray-600 space-y-1">
                      <p><span class="font-medium">User:</span> {{ formData.userName }} ({{ formData.userEmail }})</p>
                      <p><span class="font-medium">Pool:</span> {{ formData.poolName }}</p>
                      <p><span class="font-medium">GPUs:</span> {{ formData.gpuCount }} units</p>
                      <p><span class="font-medium">Duration:</span> {{ formData.duration }} days</p>
                      <p><span class="font-medium">Expires:</span> {{ calculateExpiryDate() }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="submit"
              :disabled="!isFormValid || isSubmitting"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg v-if="isSubmitting" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ isSubmitting ? 'Saving...' : (isEditMode ? 'Update Assignment' : 'Create Assignment') }}
            </button>
            <button
              type="button"
              @click="handleClose"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
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
import { ref, computed, watch, onMounted } from 'vue'

// Props
interface Props {
  isOpen: boolean
  assignment?: any | null
}

const props = withDefaults(defineProps<Props>(), {
  assignment: null
})

// Emits
const emit = defineEmits<{
  close: []
  save: [assignmentData: any]
}>()

// Types
interface GpuPool {
  name: string
  gpuType: string
  capacity: number
  available: number
  project: string
  realm: string
}

interface FormData {
  userName: string
  userEmail: string
  poolName: string
  project: string
  realm: string
  gpuCount: number
  duration: number
  purpose: string
}

interface Errors {
  userName?: string
  userEmail?: string
  poolName?: string
  project?: string
  realm?: string
  gpuCount?: string
  duration?: string
}

// Reactive data
const formData = ref<FormData>({
  userName: '',
  userEmail: '',
  poolName: '',
  project: '',
  realm: '',
  gpuCount: 1,
  duration: 30,
  purpose: ''
})

const errors = ref<Errors>({})
const isSubmitting = ref<boolean>(false)

const realms = ref<string[]>(['production', 'staging', 'development', 'testing'])
const projects = ref<string[]>(['ai-research', 'ml-training', 'data-analytics', 'computer-vision', 'nlp-processing'])
const gpuPools = ref<GpuPool[]>([])

// Computed properties
const isEditMode = computed(() => !!props.assignment)

const availablePools = computed(() => {
  return gpuPools.value.filter(pool => {
    if (formData.value.realm && pool.realm !== formData.value.realm) return false
    if (formData.value.project && pool.project !== formData.value.project) return false
    return pool.available > 0
  })
})

const selectedPoolInfo = computed(() => {
  return gpuPools.value.find(pool => pool.name === formData.value.poolName)
})

const isFormValid = computed(() => {
  return formData.value.userName &&
         formData.value.userEmail &&
         formData.value.poolName &&
         formData.value.project &&
         formData.value.realm &&
         formData.value.gpuCount > 0 &&
         formData.value.duration > 0 &&
         Object.keys(errors.value).length === 0
})

// Methods
const handleClose = () => {
  resetForm()
  emit('close')
}

const handleSubmit = async () => {
  if (!validateForm()) return

  isSubmitting.value = true
  try {
    const expiryDate = new Date()
    expiryDate.setDate(expiryDate.getDate() + formData.value.duration)

    const assignmentData = {
      ...formData.value,
      expiryDate: expiryDate.toISOString()
    }

    emit('save', assignmentData)
    handleClose()
  } catch (error) {
    console.error('Failed to save assignment:', error)
  } finally {
    isSubmitting.value = false
  }
}

const handlePoolChange = () => {
  // Reset GPU count when pool changes
  formData.value.gpuCount = 1
  validateField('gpuCount')
}

const validateForm = (): boolean => {
  errors.value = {}

  if (!formData.value.userName.trim()) {
    errors.value.userName = 'User name is required'
  }

  if (!formData.value.userEmail.trim()) {
    errors.value.userEmail = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.value.userEmail)) {
    errors.value.userEmail = 'Invalid email format'
  }

  if (!formData.value.realm) {
    errors.value.realm = 'Realm is required'
  }

  if (!formData.value.project) {
    errors.value.project = 'Project is required'
  }

  if (!formData.value.poolName) {
    errors.value.poolName = 'GPU Pool is required'
  }

  if (formData.value.gpuCount < 1) {
    errors.value.gpuCount = 'GPU count must be at least 1'
  } else if (selectedPoolInfo.value && formData.value.gpuCount > selectedPoolInfo.value.available) {
    errors.value.gpuCount = `Cannot exceed available GPUs (${selectedPoolInfo.value.available})`
  }

  if (formData.value.duration < 1) {
    errors.value.duration = 'Duration must be at least 1 day'
  }

  return Object.keys(errors.value).length === 0
}

const validateField = (field: keyof FormData) => {
  // Remove error for this field and re-validate
  delete errors.value[field as keyof Errors]
  
  switch (field) {
    case 'gpuCount':
      if (formData.value.gpuCount < 1) {
        errors.value.gpuCount = 'GPU count must be at least 1'
      } else if (selectedPoolInfo.value && formData.value.gpuCount > selectedPoolInfo.value.available) {
        errors.value.gpuCount = `Cannot exceed available GPUs (${selectedPoolInfo.value.available})`
      }
      break
  }
}

const calculateExpiryDate = (): string => {
  if (!formData.value.duration) return ''
  
  const expiry = new Date()
  expiry.setDate(expiry.getDate() + formData.value.duration)
  return expiry.toLocaleDateString('ko-KR')
}

const resetForm = () => {
  formData.value = {
    userName: '',
    userEmail: '',
    poolName: '',
    project: '',
    realm: '',
    gpuCount: 1,
    duration: 30,
    purpose: ''
  }
  errors.value = {}
}

const loadFormData = () => {
  if (props.assignment) {
    formData.value = {
      userName: props.assignment.userName || '',
      userEmail: props.assignment.userEmail || '',
      poolName: props.assignment.poolName || '',
      project: props.assignment.project || '',
      realm: props.assignment.realm || '',
      gpuCount: props.assignment.gpuCount || 1,
      duration: 30, // Default for editing
      purpose: props.assignment.purpose || ''
    }
  }
}

const fetchGpuPools = async () => {
  try {
    // Mock data - replace with actual API call
    gpuPools.value = [
      {
        name: 'gpu-pool-a100-01',
        gpuType: 'NVIDIA A100',
        capacity: 8,
        available: 2,
        project: 'ai-research',
        realm: 'production'
      },
      {
        name: 'gpu-pool-v100-01',
        gpuType: 'NVIDIA V100',
        capacity: 4,
        available: 2,
        project: 'ml-training',
        realm: 'production'
      },
      {
        name: 'gpu-pool-t4-01',
        gpuType: 'NVIDIA T4',
        capacity: 12,
        available: 4,
        project: 'data-analytics',
        realm: 'staging'
      },
      {
        name: 'gpu-pool-rtx3090-01',
        gpuType: 'NVIDIA RTX 3090',
        capacity: 10,
        available: 3,
        project: 'computer-vision',
        realm: 'development'
      },
      {
        name: 'gpu-pool-a100-02',
        gpuType: 'NVIDIA A100',
        capacity: 4,
        available: 4,
        project: 'nlp-processing',
        realm: 'production'
      }
    ]
  } catch (error) {
    console.error('Failed to fetch GPU pools:', error)
  }
}

// Watchers
watch(() => props.isOpen, (newValue) => {
  if (newValue) {
    loadFormData()
    fetchGpuPools()
  }
})

watch(() => formData.value.gpuCount, () => {
  validateField('gpuCount')
})

// Lifecycle
onMounted(() => {
  fetchGpuPools()
})
</script> 