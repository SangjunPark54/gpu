<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <!-- Background overlay -->
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" @click="handleClose"></div>

      <!-- Modal panel -->
      <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <!-- Icon -->
            <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
              <svg class="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2H9z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 9h6m-6 4h6m-6 4h6"></path>
              </svg>
            </div>
            
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
              <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4" id="modal-title">
                Request Details
              </h3>
              
              <div v-if="request" class="space-y-6">
                <!-- Request Information -->
                <div class="bg-gray-50 rounded-lg p-4">
                  <h4 class="text-sm font-medium text-gray-900 mb-3">Request Information</h4>
                  <div class="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span class="font-medium text-gray-700">Request ID:</span>
                      <p class="text-gray-900">{{ request.requestId }}</p>
                    </div>
                    <div>
                      <span class="font-medium text-gray-700">Status:</span>
                      <span :class="getStatusBadgeClass(request.status)" class="inline-block px-2 py-1 rounded-full text-xs font-medium mt-1">
                        {{ request.status }}
                      </span>
                    </div>
                    <div>
                      <span class="font-medium text-gray-700">Priority:</span>
                      <span :class="getPriorityBadgeClass(request.priority)" class="inline-block px-2 py-1 rounded-full text-xs font-medium mt-1">
                        {{ request.priority.toUpperCase() }}
                      </span>
                    </div>
                    <div>
                      <span class="font-medium text-gray-700">Requested:</span>
                      <p class="text-gray-900">{{ formatDate(request.requestedAt) }}</p>
                    </div>
                  </div>
                </div>

                <!-- Requester Information -->
                <div class="bg-gray-50 rounded-lg p-4">
                  <h4 class="text-sm font-medium text-gray-900 mb-3">Requester Information</h4>
                  <div class="flex items-center space-x-3">
                    <div class="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <span class="text-sm font-medium text-gray-600">{{ request.requester.charAt(0).toUpperCase() }}</span>
                    </div>
                    <div>
                      <p class="text-sm font-medium text-gray-900">{{ request.requester }}</p>
                      <p class="text-sm text-gray-500">{{ request.requesterEmail }}</p>
                    </div>
                  </div>
                </div>

                <!-- Resource Requirements -->
                <div class="bg-gray-50 rounded-lg p-4">
                  <h4 class="text-sm font-medium text-gray-900 mb-3">Resource Requirements</h4>
                  <div class="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span class="font-medium text-gray-700">Project:</span>
                      <p class="text-gray-900">{{ request.project }}</p>
                    </div>
                    <div>
                      <span class="font-medium text-gray-700">GPU Type:</span>
                      <p class="text-gray-900">{{ request.gpuType }}</p>
                    </div>
                    <div>
                      <span class="font-medium text-gray-700">Quantity:</span>
                      <p class="text-gray-900">{{ request.quantity }} GPUs</p>
                    </div>
                    <div>
                      <span class="font-medium text-gray-700">Duration:</span>
                      <p class="text-gray-900">{{ request.duration }} days</p>
                    </div>
                  </div>
                </div>

                <!-- Purpose -->
                <div class="bg-gray-50 rounded-lg p-4">
                  <h4 class="text-sm font-medium text-gray-900 mb-3">Purpose</h4>
                  <p class="text-sm text-gray-700">{{ request.purpose }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <div v-if="request?.status === 'PENDING'" class="flex space-x-3">
            <button
              type="button"
              @click="handleApprove"
              class="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:text-sm"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              Approve
            </button>
            <button
              type="button"
              @click="handleReject"
              class="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              Reject
            </button>
          </div>
          <button
            type="button"
            @click="handleClose"
            class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
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
  approve: [request: any]
  reject: [request: any]
}>()

// Methods
const handleClose = () => {
  emit('close')
}

const handleApprove = () => {
  if (props.request) {
    emit('approve', props.request)
  }
}

const handleReject = () => {
  if (props.request) {
    emit('reject', props.request)
  }
}

const getStatusBadgeClass = (status: string) => {
  switch (status) {
    case 'PENDING':
      return 'bg-yellow-100 text-yellow-800'
    case 'APPROVED':
      return 'bg-green-100 text-green-800'
    case 'REJECTED':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const getPriorityBadgeClass = (priority: string) => {
  switch (priority) {
    case 'urgent':
      return 'bg-red-100 text-red-800'
    case 'high':
      return 'bg-orange-100 text-orange-800'
    case 'medium':
      return 'bg-blue-100 text-blue-800'
    case 'low':
      return 'bg-gray-100 text-gray-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script> 