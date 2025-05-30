<template>
  <div>
    <!-- Page Header -->
    <div class="mb-8">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white">GPU Requests</h1>
          <p class="text-gray-600 dark:text-gray-400 mt-1">GPU 요청을 검토하고 승인/거부를 관리합니다</p>
        </div>
        <div class="flex items-center space-x-4">
          <select 
            v-model="selectedStatus" 
            @change="handleStatusChange"
            class="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            aria-label="Select Status"
          >
            <option value="">All Status</option>
            <option value="PENDING">Pending</option>
            <option value="APPROVED">Approved</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Request Statistics -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <!-- Total Requests -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border-l-4 border-blue-500">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2H9z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 9h6m-6 4h6m-6 4h6"></path>
              </svg>
            </div>
          </div>
          <div class="ml-4 flex-1">
            <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Total Requests</h3>
            <p class="text-3xl font-bold text-gray-900 dark:text-white">{{ requestStats.total }}</p>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">This month</p>
          </div>
        </div>
      </div>

      <!-- Pending Requests -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border-l-4 border-yellow-500">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
          </div>
          <div class="ml-4 flex-1">
            <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Pending</h3>
            <p class="text-3xl font-bold text-gray-900 dark:text-white">{{ requestStats.pending }}</p>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">Awaiting review</p>
          </div>
        </div>
      </div>

      <!-- Approved Requests -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border-l-4 border-green-500">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
          </div>
          <div class="ml-4 flex-1">
            <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Approved</h3>
            <p class="text-3xl font-bold text-gray-900 dark:text-white">{{ requestStats.approved }}</p>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">{{ approvalRate }}% approval rate</p>
          </div>
        </div>
      </div>

      <!-- Rejected Requests -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border-l-4 border-red-500">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
          </div>
          <div class="ml-4 flex-1">
            <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Rejected</h3>
            <p class="text-3xl font-bold text-gray-900 dark:text-white">{{ requestStats.rejected }}</p>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">{{ rejectionRate }}% rejection rate</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="flex justify-between items-center mb-6">
      <div class="flex space-x-4">
        <button 
          @click="handleRefresh"
          class="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
          </svg>
          Refresh
        </button>
        <button 
          @click="handleBulkApprove"
          :disabled="selectedRequests.length === 0"
          class="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          Bulk Approve ({{ selectedRequests.length }})
        </button>
      </div>
      <div class="flex items-center space-x-4">
        <select 
          v-model="selectedProject" 
          @change="handleProjectChange"
          class="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          aria-label="Select Project"
        >
          <option value="">All Projects</option>
          <option v-for="project in projects" :key="project" :value="project">{{ project }}</option>
        </select>
      </div>
    </div>

    <!-- GPU Requests Table -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
      <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white">GPU Request Management</h3>
        <div class="text-sm text-gray-500 dark:text-gray-400">
          {{ paginatedRequests.length }} of {{ filteredRequests.length }} requests
        </div>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead class="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th class="px-6 py-3 text-left">
                <input
                  type="checkbox"
                  @change="handleSelectAll"
                  :checked="isAllSelected"
                  class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer" @click="handleSort('requestId')">
                Request ID
                <svg class="w-4 h-4 inline ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"></path>
                </svg>
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Requester</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Project</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">GPU Type</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Quantity</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Duration</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Requested</th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="(request, index) in paginatedRequests" :key="request.requestId" :class="index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700'">
              <td class="px-6 py-4 whitespace-nowrap">
                <input
                  type="checkbox"
                  :value="request.requestId"
                  v-model="selectedRequests"
                  class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button 
                  @click="handleViewRequestDetail(request)"
                  class="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300 hover:underline focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
                >
                  {{ request.requestId }}
                </button>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                <div class="flex items-center">
                  <div class="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center mr-3">
                    <span class="text-xs font-medium text-gray-600 dark:text-gray-300">{{ request.requester.charAt(0).toUpperCase() }}</span>
                  </div>
                  <div>
                    <div class="text-sm font-medium text-gray-900 dark:text-white">{{ request.requester }}</div>
                    <div class="text-sm text-gray-500 dark:text-gray-400">{{ request.requesterEmail }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{{ request.project }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{{ request.gpuType }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{{ request.quantity }} GPUs</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{{ request.duration }} days</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="getStatusBadgeClass(request.status)" class="px-2 py-1 rounded-full text-xs font-medium">
                  {{ request.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {{ formatDate(request.requestedAt) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="flex justify-end space-x-2">
                  <button 
                    v-if="request.status === 'PENDING'"
                    @click="handleApproveRequest(request)"
                    class="inline-flex items-center px-2 py-1 text-xs font-medium text-green-600 dark:text-green-400 hover:text-green-900 dark:hover:text-green-300 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-md transition-colors duration-150"
                    :aria-label="`Approve ${request.requestId}`"
                  >
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    Approve
                  </button>
                  <button 
                    v-if="request.status === 'PENDING'"
                    @click="handleRejectRequest(request)"
                    class="inline-flex items-center px-2 py-1 text-xs font-medium text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors duration-150"
                    :aria-label="`Reject ${request.requestId}`"
                  >
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    Reject
                  </button>
                  <button 
                    @click="handleViewRequestDetail(request)"
                    class="inline-flex items-center px-2 py-1 text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-md transition-colors duration-150"
                    :aria-label="`View ${request.requestId}`"
                  >
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                    View
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- Pagination -->
      <div class="px-6 py-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-2">
            <span class="text-sm text-gray-700 dark:text-gray-300">Show</span>
            <select 
              v-model="requestsPerPage" 
              @change="handleRequestsPerPageChange"
              class="border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option :value="10">10</option>
              <option :value="25">25</option>
              <option :value="50">50</option>
            </select>
            <span class="text-sm text-gray-700 dark:text-gray-300">per page</span>
          </div>
          <div class="flex items-center space-x-2">
            <button 
              @click="handlePreviousPage"
              :disabled="currentPage === 1"
              class="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              Previous
            </button>
            <span class="text-sm text-gray-700 dark:text-gray-300">
              Page {{ currentPage }} of {{ totalPages }}
            </span>
            <button 
              @click="handleNextPage"
              :disabled="currentPage === totalPages"
              class="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Request Detail Modal -->
    <GpuRequestDetailModal
      :is-open="showDetailModal"
      :request="selectedRequest"
      @close="handleCloseDetailModal"
      @approve="handleApproveFromModal"
      @reject="handleRejectFromModal"
    />

    <!-- Reject Reason Modal -->
    <GpuRequestRejectModal
      :is-open="showRejectModal"
      :request="selectedRequestForReject"
      @close="handleCloseRejectModal"
      @confirm="handleConfirmReject"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import GpuRequestDetailModal from '~/components/gpu/GpuRequestDetailModal.vue'
import GpuRequestRejectModal from '~/components/gpu/GpuRequestRejectModal.vue'
import { useToast } from '~/composables/useToast'

// Toast composable
const { success, error: showError } = useToast()

// Types
interface GpuRequest {
  requestId: string
  requester: string
  requesterEmail: string
  project: string
  gpuType: string
  quantity: number
  duration: number
  status: 'PENDING' | 'APPROVED' | 'REJECTED'
  requestedAt: string
  purpose: string
  priority: 'low' | 'medium' | 'high' | 'urgent'
}

interface RequestStats {
  total: number
  pending: number
  approved: number
  rejected: number
}

// Reactive data
const selectedStatus = ref<string>('')
const selectedProject = ref<string>('')
const projects = ref<string[]>(['ai-research', 'ml-training', 'data-analytics', 'computer-vision', 'nlp-processing'])
const gpuRequests = ref<GpuRequest[]>([])
const requestStats = ref<RequestStats>({ total: 0, pending: 0, approved: 0, rejected: 0 })
const sortField = ref<string>('')
const sortDirection = ref<'asc' | 'desc'>('asc')
const requestsPerPage = ref<number>(10)
const currentPage = ref<number>(1)
const selectedRequests = ref<string[]>([])

// Modal state
const showDetailModal = ref<boolean>(false)
const selectedRequest = ref<GpuRequest | null>(null)
const showRejectModal = ref<boolean>(false)
const selectedRequestForReject = ref<GpuRequest | null>(null)

// Computed properties
const approvalRate = computed(() => {
  if (requestStats.value.total === 0) return 0
  return Math.round((requestStats.value.approved / requestStats.value.total) * 100)
})

const rejectionRate = computed(() => {
  if (requestStats.value.total === 0) return 0
  return Math.round((requestStats.value.rejected / requestStats.value.total) * 100)
})

const filteredRequests = computed(() => {
  let filtered = gpuRequests.value
  
  if (selectedStatus.value) {
    filtered = filtered.filter(request => request.status === selectedStatus.value)
  }
  
  if (selectedProject.value) {
    filtered = filtered.filter(request => request.project === selectedProject.value)
  }
  
  if (sortField.value) {
    filtered = [...filtered].sort((a, b) => {
      const aVal = a[sortField.value as keyof GpuRequest]
      const bVal = b[sortField.value as keyof GpuRequest]
      
      if (aVal === undefined && bVal === undefined) return 0
      if (aVal === undefined) return 1
      if (bVal === undefined) return -1
      
      if (sortDirection.value === 'asc') {
        return aVal > bVal ? 1 : -1
      } else {
        return aVal < bVal ? 1 : -1
      }
    })
  }
  
  return filtered
})

const paginatedRequests = computed(() => {
  const start = (currentPage.value - 1) * requestsPerPage.value
  const end = start + requestsPerPage.value
  return filteredRequests.value.slice(start, end)
})

const totalPages = computed(() => {
  return Math.ceil(filteredRequests.value.length / requestsPerPage.value)
})

const isAllSelected = computed(() => {
  const pendingRequests = paginatedRequests.value.filter(r => r.status === 'PENDING')
  return pendingRequests.length > 0 && pendingRequests.every(r => selectedRequests.value.includes(r.requestId))
})

// Methods
const handleStatusChange = () => {
  currentPage.value = 1
}

const handleProjectChange = () => {
  currentPage.value = 1
}

const handleRefresh = async () => {
  await fetchRequestData()
  selectedRequests.value = []
}

const handleSort = (field: string) => {
  if (sortField.value === field) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortField.value = field
    sortDirection.value = 'asc'
  }
}

const handleSelectAll = (event: Event) => {
  const target = event.target as HTMLInputElement
  const pendingRequests = paginatedRequests.value.filter(r => r.status === 'PENDING')
  
  if (target.checked) {
    selectedRequests.value = [...new Set([...selectedRequests.value, ...pendingRequests.map(r => r.requestId)])]
  } else {
    const pendingIds = pendingRequests.map(r => r.requestId)
    selectedRequests.value = selectedRequests.value.filter(id => !pendingIds.includes(id))
  }
}

const handleBulkApprove = async () => {
  try {
    for (const requestId of selectedRequests.value) {
      const requestIndex = gpuRequests.value.findIndex(r => r.requestId === requestId)
      if (requestIndex !== -1 && gpuRequests.value[requestIndex].status === 'PENDING') {
        gpuRequests.value[requestIndex].status = 'APPROVED'
      }
    }
    
    calculateStats()
    selectedRequests.value = []
    
    success(`${selectedRequests.value.length}개의 요청이 일괄 승인되었습니다.`, '일괄 승인 완료')
  } catch (error) {
    console.error('Failed to bulk approve requests:', error)
    showError('일괄 승인 중 오류가 발생했습니다.')
  }
}

const handleViewRequestDetail = (request: GpuRequest) => {
  selectedRequest.value = request
  showDetailModal.value = true
}

const handleCloseDetailModal = () => {
  showDetailModal.value = false
  selectedRequest.value = null
}

const handleApproveRequest = async (request: GpuRequest) => {
  try {
    const requestIndex = gpuRequests.value.findIndex(r => r.requestId === request.requestId)
    if (requestIndex !== -1) {
      gpuRequests.value[requestIndex].status = 'APPROVED'
      calculateStats()
      
      success(
        `요청 ${request.requestId}가 승인되었습니다.`,
        '요청 승인 완료'
      )
    }
  } catch (error) {
    console.error('Failed to approve request:', error)
    showError('요청 승인 중 오류가 발생했습니다.')
  }
}

const handleRejectRequest = (request: GpuRequest) => {
  selectedRequestForReject.value = request
  showRejectModal.value = true
}

const handleCloseRejectModal = () => {
  showRejectModal.value = false
  selectedRequestForReject.value = null
}

const handleConfirmReject = async (reason: string) => {
  try {
    if (selectedRequestForReject.value) {
      const requestIndex = gpuRequests.value.findIndex(r => r.requestId === selectedRequestForReject.value!.requestId)
      if (requestIndex !== -1) {
        gpuRequests.value[requestIndex].status = 'REJECTED'
        calculateStats()
        
        success(
          `요청 ${selectedRequestForReject.value.requestId}가 거부되었습니다.`,
          '요청 거부 완료'
        )
      }
    }
  } catch (error) {
    console.error('Failed to reject request:', error)
    showError('요청 거부 중 오류가 발생했습니다.')
  }
}

const handleApproveFromModal = (request: GpuRequest) => {
  handleApproveRequest(request)
  handleCloseDetailModal()
}

const handleRejectFromModal = (request: GpuRequest) => {
  handleCloseDetailModal()
  handleRejectRequest(request)
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

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const handleRequestsPerPageChange = () => {
  currentPage.value = 1
}

const handlePreviousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const handleNextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const calculateStats = () => {
  const total = gpuRequests.value.length
  const pending = gpuRequests.value.filter(r => r.status === 'PENDING').length
  const approved = gpuRequests.value.filter(r => r.status === 'APPROVED').length
  const rejected = gpuRequests.value.filter(r => r.status === 'REJECTED').length
  
  requestStats.value = {
    total,
    pending,
    approved,
    rejected
  }
}

const fetchRequestData = async () => {
  try {
    // Mock data - replace with actual API calls
    gpuRequests.value = [
      {
        requestId: 'REQ-2024-001',
        requester: 'John Doe',
        requesterEmail: 'john.doe@company.com',
        project: 'ai-research',
        gpuType: 'NVIDIA A100',
        quantity: 4,
        duration: 30,
        status: 'PENDING',
        requestedAt: '2024-01-15T09:30:00Z',
        purpose: 'Large language model training for research project',
        priority: 'high'
      },
      {
        requestId: 'REQ-2024-002',
        requester: 'Jane Smith',
        requesterEmail: 'jane.smith@company.com',
        project: 'ml-training',
        gpuType: 'NVIDIA V100',
        quantity: 2,
        duration: 14,
        status: 'APPROVED',
        requestedAt: '2024-01-14T14:20:00Z',
        purpose: 'Computer vision model training',
        priority: 'medium'
      },
      {
        requestId: 'REQ-2024-003',
        requester: 'Mike Johnson',
        requesterEmail: 'mike.johnson@company.com',
        project: 'data-analytics',
        gpuType: 'NVIDIA T4',
        quantity: 8,
        duration: 7,
        status: 'PENDING',
        requestedAt: '2024-01-13T11:45:00Z',
        purpose: 'Data processing and analysis for quarterly report',
        priority: 'urgent'
      },
      {
        requestId: 'REQ-2024-004',
        requester: 'Sarah Wilson',
        requesterEmail: 'sarah.wilson@company.com',
        project: 'computer-vision',
        gpuType: 'NVIDIA RTX 4090',
        quantity: 1,
        duration: 21,
        status: 'REJECTED',
        requestedAt: '2024-01-12T16:10:00Z',
        purpose: 'Personal project development',
        priority: 'low'
      },
      {
        requestId: 'REQ-2024-005',
        requester: 'David Brown',
        requesterEmail: 'david.brown@company.com',
        project: 'nlp-processing',
        gpuType: 'NVIDIA A100',
        quantity: 2,
        duration: 45,
        status: 'PENDING',
        requestedAt: '2024-01-11T08:15:00Z',
        purpose: 'Natural language processing model fine-tuning',
        priority: 'medium'
      },
      {
        requestId: 'REQ-2024-006',
        requester: 'Emily Davis',
        requesterEmail: 'emily.davis@company.com',
        project: 'ai-research',
        gpuType: 'NVIDIA V100',
        quantity: 6,
        duration: 60,
        status: 'APPROVED',
        requestedAt: '2024-01-10T13:30:00Z',
        purpose: 'Deep learning research for academic publication',
        priority: 'high'
      }
    ]
    
    calculateStats()
  } catch (error) {
    console.error('Failed to fetch request data:', error)
  }
}

// Lifecycle
onMounted(() => {
  fetchRequestData()
})
</script> 