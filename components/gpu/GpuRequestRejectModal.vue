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
            <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
              <svg class="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
              </svg>
            </div>
            
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
              <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4" id="modal-title">
                Reject Request
              </h3>
              
              <div v-if="request" class="mb-4">
                <div class="bg-gray-50 rounded-lg p-3">
                  <p class="text-sm text-gray-600">Request ID: <span class="font-medium text-gray-900">{{ request.requestId }}</span></p>
                  <p class="text-sm text-gray-600">Requester: <span class="font-medium text-gray-900">{{ request.requester }}</span></p>
                </div>
              </div>

              <form @submit.prevent="handleSubmit" class="space-y-4">
                <!-- Rejection Reason -->
                <div>
                  <label for="reason" class="block text-sm font-medium text-gray-700 mb-1">
                    Rejection Reason <span class="text-red-500">*</span>
                  </label>
                  <select
                    id="reason"
                    v-model="formData.reason"
                    required
                    class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  >
                    <option value="">Select a reason</option>
                    <option value="insufficient-resources">Insufficient Resources</option>
                    <option value="invalid-project">Invalid Project</option>
                    <option value="excessive-duration">Excessive Duration</option>
                    <option value="policy-violation">Policy Violation</option>
                    <option value="incomplete-information">Incomplete Information</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <!-- Additional Comments -->
                <div>
                  <label for="comments" class="block text-sm font-medium text-gray-700 mb-1">
                    Additional Comments
                  </label>
                  <textarea
                    id="comments"
                    v-model="formData.comments"
                    rows="4"
                    class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="Provide additional details about the rejection..."
                  ></textarea>
                </div>

                <!-- Alternative Suggestions -->
                <div>
                  <label for="suggestions" class="block text-sm font-medium text-gray-700 mb-1">
                    Alternative Suggestions
                  </label>
                  <textarea
                    id="suggestions"
                    v-model="formData.suggestions"
                    rows="3"
                    class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="Suggest alternatives or modifications..."
                  ></textarea>
                </div>

                <!-- Notify Requester -->
                <div class="flex items-center">
                  <input
                    id="notifyRequester"
                    v-model="formData.notifyRequester"
                    type="checkbox"
                    class="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                  />
                  <label for="notifyRequester" class="ml-2 block text-sm text-gray-700">
                    Send notification email to requester
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
            :disabled="!isFormValid || isSubmitting"
            class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg v-if="isSubmitting" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ isSubmitting ? 'Rejecting...' : 'Reject Request' }}
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
  request?: any | null
}

const props = withDefaults(defineProps<Props>(), {
  request: null
})

// Emits
const emit = defineEmits<{
  close: []
  confirm: [reason: string]
}>()

// Reactive data
const isSubmitting = ref<boolean>(false)

const formData = ref({
  reason: '',
  comments: '',
  suggestions: '',
  notifyRequester: true
})

// Computed properties
const isFormValid = computed(() => {
  return formData.value.reason.trim() !== ''
})

// Methods
const handleClose = () => {
  resetForm()
  emit('close')
}

const handleSubmit = async () => {
  if (!isFormValid.value) return
  
  isSubmitting.value = true
  try {
    const rejectionData = {
      reason: formData.value.reason,
      comments: formData.value.comments,
      suggestions: formData.value.suggestions,
      notifyRequester: formData.value.notifyRequester,
      rejectedAt: new Date().toISOString()
    }
    
    emit('confirm', JSON.stringify(rejectionData))
    handleClose()
  } catch (error) {
    console.error('Failed to reject request:', error)
  } finally {
    isSubmitting.value = false
  }
}

const resetForm = () => {
  formData.value = {
    reason: '',
    comments: '',
    suggestions: '',
    notifyRequester: true
  }
  isSubmitting.value = false
}

// Watchers
watch(() => props.isOpen, (newValue) => {
  if (newValue) {
    resetForm()
  }
})
</script> 