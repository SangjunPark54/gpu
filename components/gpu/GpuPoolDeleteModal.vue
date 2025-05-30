<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <!-- Background overlay -->
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" @click="handleClose"></div>

      <!-- Modal panel -->
      <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <!-- Warning Icon -->
            <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
              <svg class="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
              </svg>
            </div>
            
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
              <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4" id="modal-title">
                Delete GPU Pool
              </h3>
              
              <div class="mt-2">
                <p class="text-sm text-gray-500 mb-4">
                  이 작업은 되돌릴 수 없습니다. GPU Pool을 삭제하면 모든 관련 데이터가 영구적으로 제거됩니다.
                </p>
                
                <!-- Pool Information -->
                <div class="bg-gray-50 rounded-lg p-4 mb-4">
                  <h4 class="text-sm font-medium text-gray-900 mb-2">삭제할 GPU Pool 정보</h4>
                  <div class="text-sm text-gray-600 space-y-1">
                    <p><span class="font-medium">Pool Name:</span> {{ pool?.poolName }}</p>
                    <p><span class="font-medium">Project:</span> {{ pool?.project || 'N/A' }}</p>
                    <p><span class="font-medium">GPU Type:</span> {{ pool?.gpuType }}</p>
                    <p><span class="font-medium">Capacity:</span> {{ pool?.capacity }} GPUs</p>
                    <p><span class="font-medium">Currently Used:</span> {{ pool?.used }} GPUs</p>
                  </div>
                </div>

                <!-- Warning for active usage -->
                <div v-if="pool?.used && pool.used > 0" class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                  <div class="flex">
                    <div class="flex-shrink-0">
                      <svg class="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
                      </svg>
                    </div>
                    <div class="ml-3">
                      <h3 class="text-sm font-medium text-yellow-800">
                        주의: 현재 사용 중인 GPU가 있습니다
                      </h3>
                      <div class="mt-2 text-sm text-yellow-700">
                        <p>이 Pool에는 현재 {{ pool.used }}개의 GPU가 사용 중입니다. 삭제하면 관련된 모든 할당이 중단됩니다.</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <!-- Confirmation Input -->
                <div class="mb-4">
                  <label for="confirmPoolName" class="block text-sm font-medium text-gray-700 mb-2">
                    삭제를 확인하려면 Pool 이름을 정확히 입력하세요:
                  </label>
                  <div class="text-sm text-gray-500 mb-2">
                    입력해야 할 이름: <span class="font-mono font-medium text-gray-900">{{ pool?.poolName }}</span>
                  </div>
                  <input
                    id="confirmPoolName"
                    v-model="confirmationInput"
                    type="text"
                    placeholder="Pool 이름을 입력하세요"
                    class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    :class="{ 
                      'border-red-500': confirmationInput && !isConfirmationValid,
                      'border-green-500': isConfirmationValid 
                    }"
                    @keyup.enter="isConfirmationValid && handleConfirmDelete()"
                  />
                  <p v-if="confirmationInput && !isConfirmationValid" class="mt-1 text-sm text-red-600">
                    Pool 이름이 일치하지 않습니다.
                  </p>
                  <p v-if="isConfirmationValid" class="mt-1 text-sm text-green-600">
                    ✓ Pool 이름이 확인되었습니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            type="button"
            @click="handleConfirmDelete"
            :disabled="!isConfirmationValid || isDeleting"
            class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg v-if="isDeleting" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ isDeleting ? 'Deleting...' : 'Delete GPU Pool' }}
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
  confirm: [poolName: string]
}>()

// Reactive data
const confirmationInput = ref<string>('')
const isDeleting = ref<boolean>(false)

// Computed properties
const isConfirmationValid = computed(() => {
  return confirmationInput.value === props.pool?.poolName
})

// Methods
const handleClose = () => {
  confirmationInput.value = ''
  isDeleting.value = false
  emit('close')
}

const handleConfirmDelete = async () => {
  if (!isConfirmationValid.value) return
  
  isDeleting.value = true
  try {
    emit('confirm', props.pool.poolName)
    handleClose()
  } catch (error) {
    console.error('Failed to delete pool:', error)
  } finally {
    isDeleting.value = false
  }
}

// Watchers
watch(() => props.isOpen, (newValue) => {
  if (newValue) {
    confirmationInput.value = ''
    isDeleting.value = false
  }
})
</script> 