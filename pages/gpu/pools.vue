<template>
  <div>
    <!-- Page Header -->
    <div class="mb-8">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white">GPU Pools</h1>
          <p class="text-gray-600 dark:text-gray-400 mt-1">GPU Pool을 생성, 관리하고 모니터링합니다</p>
        </div>
        <div class="flex items-center space-x-4">
          <select 
            v-model="selectedRealm" 
            @change="handleRealmChange"
            class="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            aria-label="Select Realm"
          >
            <option value="">Select Realm</option>
            <option v-for="realm in realms" :key="realm" :value="realm">{{ realm }}</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Pool Statistics -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <!-- Total Pools -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border-l-4 border-blue-500">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14-7H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2z"></path>
              </svg>
            </div>
          </div>
          <div class="ml-4 flex-1">
            <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Total Pools</h3>
            <p class="text-3xl font-bold text-gray-900 dark:text-white">{{ poolStats.total }}</p>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">Active: {{ poolStats.active }}</p>
          </div>
        </div>
      </div>

      <!-- Total Capacity -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border-l-4 border-green-500">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
              </svg>
            </div>
          </div>
          <div class="ml-4 flex-1">
            <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Total Capacity</h3>
            <p class="text-3xl font-bold text-gray-900 dark:text-white">{{ poolStats.totalCapacity }}</p>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">GPUs available</p>
          </div>
        </div>
      </div>

      <!-- In Use -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border-l-4 border-purple-500">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
          </div>
          <div class="ml-4 flex-1">
            <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">In Use</h3>
            <p class="text-3xl font-bold text-gray-900 dark:text-white">{{ poolStats.totalUsed }}</p>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">{{ utilizationRate }}% utilization</p>
          </div>
        </div>
      </div>

      <!-- Maintenance -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border-l-4 border-yellow-500">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
              </svg>
            </div>
          </div>
          <div class="ml-4 flex-1">
            <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Maintenance</h3>
            <p class="text-3xl font-bold text-gray-900 dark:text-white">{{ poolStats.maintenance }}</p>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">Pools offline</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="flex justify-between items-center mb-6">
      <div class="flex space-x-4">
        <button 
          @click="handleCreatePool"
          class="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          :disabled="!selectedRealm"
        >
          Create GPU Pool
        </button>
        <button 
          @click="handleRefresh"
          class="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Refresh
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

    <!-- GPU Pools Table -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
      <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white">GPU Pool Management</h3>
        <div class="text-sm text-gray-500 dark:text-gray-400">
          {{ paginatedPools.length }} of {{ filteredGpuPools.length }} pools
        </div>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead class="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer" @click="handleSort('poolName')">
                Pool Name
                <svg class="w-4 h-4 inline ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"></path>
                </svg>
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Project</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">GPU Type</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Capacity</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Usage</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Utilization</th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="(pool, index) in paginatedPools" :key="pool.poolName" :class="index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700'">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button 
                  @click="handleViewPoolDetail(pool)"
                  class="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300 hover:underline focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
                >
                  {{ pool.poolName }}
                </button>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{{ pool.project || 'N/A' }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{{ pool.gpuType.replace('NVIDIA ', '') }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="getStatusBadgeClass(pool.status)" class="px-2 py-1 rounded-full text-xs font-medium">
                  {{ pool.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{{ pool.capacity }} GPUs</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{{ pool.used }}/{{ pool.capacity }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="w-16 bg-gray-200 dark:bg-gray-600 rounded-full h-2 mr-2">
                    <div 
                      class="h-2 rounded-full"
                      :class="getUtilizationColor(pool.used / pool.capacity * 100)"
                      :style="{ width: `${(pool.used / pool.capacity * 100)}%` }"
                    ></div>
                  </div>
                  <span class="text-sm text-gray-500 dark:text-gray-400">{{ Math.round(pool.used / pool.capacity * 100) }}%</span>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="flex justify-end space-x-2">
                  <button 
                    @click="handleAssignPool(pool)"
                    class="inline-flex items-center px-2 py-1 text-xs font-medium text-green-600 dark:text-green-400 hover:text-green-900 dark:hover:text-green-300 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-md transition-colors duration-150"
                    :aria-label="`Assign ${pool.poolName}`"
                    :disabled="pool.status !== 'active'"
                    :class="{ 'opacity-50 cursor-not-allowed': pool.status !== 'active' }"
                  >
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
                    </svg>
                    Assign
                  </button>
                  <button 
                    @click="handleEditPool(pool)"
                    class="inline-flex items-center px-2 py-1 text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-md transition-colors duration-150"
                    :aria-label="`Edit ${pool.poolName}`"
                  >
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                    </svg>
                    Edit
                  </button>
                  <button 
                    @click="handleDeletePool(pool)"
                    class="inline-flex items-center px-2 py-1 text-xs font-medium text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors duration-150"
                    :aria-label="`Delete ${pool.poolName}`"
                  >
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- Pagination for GPU Pools -->
      <div class="px-6 py-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-2">
            <span class="text-sm text-gray-700 dark:text-gray-300">Show</span>
            <select 
              v-model="poolsPerPage" 
              @change="handlePoolsPerPageChange"
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

    <!-- GPU Pool Assign Modal -->
    <GpuPoolAssignModal
      :is-open="showAssignModal"
      :pool="selectedPoolForAssign"
      @close="handleCloseAssignModal"
      @save="handleSaveAssignment"
    />

    <!-- GPU Pool Detail Modal -->
    <GpuPoolDetailModal
      :is-open="showDetailModal"
      :pool="selectedPool"
      @close="handleCloseDetailModal"
      @edit="handleEditFromModal"
    />

    <!-- GPU Pool Edit Modal -->
    <GpuPoolEditModal
      :is-open="showEditModal"
      :pool="selectedPoolForEdit"
      @close="handleCloseEditModal"
      @save="handleSavePool"
    />

    <!-- GPU Pool Delete Modal -->
    <GpuPoolDeleteModal
      :is-open="showDeleteModal"
      :pool="selectedPoolForDelete"
      @close="handleCloseDeleteModal"
      @confirm="handleConfirmDelete"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import GpuPoolDetailModal from '~/components/gpu/GpuPoolDetailModal.vue'
import GpuPoolEditModal from '~/components/gpu/GpuPoolEditModal.vue'
import GpuPoolDeleteModal from '~/components/gpu/GpuPoolDeleteModal.vue'
import GpuPoolAssignModal from '~/components/gpu/GpuPoolAssignModal.vue'
import { useToast } from '~/composables/useToast'

// Toast composable
const { success, error: showError } = useToast()

// Types
interface GpuPool {
  poolName: string
  project?: string
  gpuType: string
  status: 'active' | 'inactive' | 'maintenance'
  capacity: number
  used: number
}

interface PoolStats {
  total: number
  active: number
  totalCapacity: number
  totalUsed: number
  maintenance: number
}

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

// Reactive data
const selectedRealm = ref<string>('')
const selectedProject = ref<string>('')
const realms = ref<string[]>(['production', 'staging', 'development', 'testing'])
const projects = ref<string[]>(['ai-research', 'ml-training', 'data-analytics', 'computer-vision', 'nlp-processing'])
const gpuPools = ref<GpuPool[]>([])
const poolStats = ref<PoolStats>({ total: 0, active: 0, totalCapacity: 0, totalUsed: 0, maintenance: 0 })
const sortField = ref<string>('')
const sortDirection = ref<'asc' | 'desc'>('asc')
const poolsPerPage = ref<number>(10)
const currentPage = ref<number>(1)

// Modal state
const showDetailModal = ref<boolean>(false)
const selectedPool = ref<GpuPool | null>(null)
const showEditModal = ref<boolean>(false)
const selectedPoolForEdit = ref<GpuPool | null>(null)
const showDeleteModal = ref<boolean>(false)
const selectedPoolForDelete = ref<GpuPool | null>(null)
const showAssignModal = ref<boolean>(false)
const selectedPoolForAssign = ref<GpuPool | null>(null)

// Computed properties
const utilizationRate = computed(() => {
  if (poolStats.value.totalCapacity === 0) return 0
  return Math.round((poolStats.value.totalUsed / poolStats.value.totalCapacity) * 100)
})

const filteredGpuPools = computed(() => {
  let filtered = gpuPools.value
  
  if (selectedProject.value) {
    filtered = filtered.filter(pool => pool.project === selectedProject.value)
  }
  
  if (sortField.value) {
    filtered = [...filtered].sort((a, b) => {
      const aVal = a[sortField.value as keyof GpuPool]
      const bVal = b[sortField.value as keyof GpuPool]
      
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

const paginatedPools = computed(() => {
  const start = (currentPage.value - 1) * poolsPerPage.value
  const end = start + poolsPerPage.value
  return filteredGpuPools.value.slice(start, end)
})

const totalPages = computed(() => {
  return Math.ceil(filteredGpuPools.value.length / poolsPerPage.value)
})

// Methods
const handleRealmChange = async () => {
  if (selectedRealm.value) {
    await fetchGpuData()
  }
}

const handleProjectChange = () => {
  // Filter is handled by computed property
}

const handleCreatePool = () => {
  selectedPoolForEdit.value = null
  showEditModal.value = true
}

const handleRefresh = async () => {
  await fetchGpuData()
}

const handleSort = (field: string) => {
  if (sortField.value === field) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortField.value = field
    sortDirection.value = 'asc'
  }
}

const handleViewPoolDetail = (pool: GpuPool) => {
  selectedPool.value = pool
  showDetailModal.value = true
}

const handleCloseDetailModal = () => {
  showDetailModal.value = false
  selectedPool.value = null
}

const handleEditFromModal = (pool: GpuPool) => {
  showDetailModal.value = false
  selectedPoolForEdit.value = pool
  showEditModal.value = true
}

const handleEditPool = (pool: GpuPool) => {
  selectedPoolForEdit.value = pool
  showEditModal.value = true
}

const handleCloseEditModal = () => {
  showEditModal.value = false
  selectedPoolForEdit.value = null
}

const handleSavePool = async (formData: GpuPoolFormData) => {
  try {
    console.log('Saving GPU pool:', formData)
    
    if (selectedPoolForEdit.value) {
      // Update existing pool
      const poolIndex = gpuPools.value.findIndex(p => p.poolName === selectedPoolForEdit.value?.poolName)
      if (poolIndex !== -1) {
        gpuPools.value[poolIndex] = {
          ...gpuPools.value[poolIndex],
          project: formData.project,
          capacity: formData.core,
          status: formData.status === 'RUNNING' ? 'active' : 'inactive'
        }
      }
    } else {
      // Create new pool
      const newPool: GpuPool = {
        poolName: formData.poolName,
        project: formData.project,
        gpuType: 'NVIDIA A100', // Default, would be determined by API
        status: formData.status === 'RUNNING' ? 'active' : 'inactive',
        capacity: formData.core,
        used: 0
      }
      gpuPools.value.push(newPool)
    }
    
    // Recalculate stats
    calculateStats()
    
    success('GPU pool이 성공적으로 저장되었습니다.', 'Pool 저장 완료')
    
  } catch (error) {
    console.error('Failed to save GPU pool:', error)
    showError('Pool 저장 중 오류가 발생했습니다.')
  }
}

const handleDeletePool = async (pool: GpuPool) => {
  selectedPoolForDelete.value = pool
  showDeleteModal.value = true
}

const handleCloseDeleteModal = () => {
  showDeleteModal.value = false
  selectedPoolForDelete.value = null
}

const handleConfirmDelete = async (poolName: string) => {
  try {
    console.log('Delete pool:', poolName)
    
    // Remove from local data
    const poolIndex = gpuPools.value.findIndex(p => p.poolName === poolName)
    if (poolIndex !== -1) {
      gpuPools.value.splice(poolIndex, 1)
      calculateStats()
      
      success(
        `GPU Pool "${poolName}"이 성공적으로 삭제되었습니다.`,
        'Pool 삭제 완료'
      )
    }
  } catch (error) {
    console.error('Failed to delete pool:', error)
    showError('Pool 삭제 중 오류가 발생했습니다.')
  }
}

const getStatusBadgeClass = (status: string) => {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-green-800'
    case 'inactive':
      return 'bg-gray-100 text-gray-800'
    case 'maintenance':
      return 'bg-yellow-100 text-yellow-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const getUtilizationColor = (utilization: number) => {
  if (utilization >= 90) return 'bg-red-500'
  if (utilization >= 70) return 'bg-yellow-500'
  return 'bg-green-500'
}

const handlePoolsPerPageChange = () => {
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
  const total = gpuPools.value.length
  const active = gpuPools.value.filter(p => p.status === 'active').length
  const maintenance = gpuPools.value.filter(p => p.status === 'maintenance').length
  const totalCapacity = gpuPools.value.reduce((sum, pool) => sum + pool.capacity, 0)
  const totalUsed = gpuPools.value.reduce((sum, pool) => sum + pool.used, 0)
  
  poolStats.value = {
    total,
    active,
    maintenance,
    totalCapacity,
    totalUsed
  }
}

const fetchGpuData = async () => {
  if (!selectedRealm.value) return
  
  try {
    // Mock data - replace with actual API calls
    gpuPools.value = [
      {
        poolName: 'gpu-pool-a100-01',
        project: 'ai-research',
        gpuType: 'NVIDIA A100',
        status: 'active',
        capacity: 8,
        used: 6
      },
      {
        poolName: 'gpu-pool-v100-01',
        project: 'ml-training',
        gpuType: 'NVIDIA V100',
        status: 'active',
        capacity: 4,
        used: 2
      },
      {
        poolName: 'gpu-pool-rtx4090-01',
        project: 'ai-research',
        gpuType: 'NVIDIA RTX 4090',
        status: 'maintenance',
        capacity: 6,
        used: 0
      },
      {
        poolName: 'gpu-pool-t4-01',
        project: 'data-analytics',
        gpuType: 'NVIDIA T4',
        status: 'active',
        capacity: 12,
        used: 8
      },
      {
        poolName: 'gpu-pool-a100-02',
        project: 'ml-training',
        gpuType: 'NVIDIA A100',
        status: 'inactive',
        capacity: 4,
        used: 0
      },
      {
        poolName: 'gpu-pool-v100-02',
        project: 'computer-vision',
        gpuType: 'NVIDIA V100',
        status: 'active',
        capacity: 8,
        used: 5
      },
      {
        poolName: 'gpu-pool-rtx3090-01',
        project: 'nlp-processing',
        gpuType: 'NVIDIA RTX 3090',
        status: 'active',
        capacity: 10,
        used: 7
      }
    ]
    
    calculateStats()
  } catch (error) {
    console.error('Failed to fetch GPU data:', error)
  }
}

const handleAssignPool = (pool: GpuPool) => {
  selectedPoolForAssign.value = pool
  showAssignModal.value = true
}

const handleCloseAssignModal = () => {
  showAssignModal.value = false
  selectedPoolForAssign.value = null
}

const handleSaveAssignment = async (formData: any) => {
  try {
    console.log('Saving assignment:', formData)
    
    // Logic to save assignment
    
    success('GPU pool 할당이 성공적으로 저장되었습니다.', '할당 저장 완료')
  } catch (error) {
    console.error('Failed to save assignment:', error)
    showError('할당 저장 중 오류가 발생했습니다.')
  }
}

// Lifecycle
onMounted(() => {
  // Set default realm and load data
  if (realms.value.length > 0) {
    selectedRealm.value = realms.value[0]
    fetchGpuData()
  }
})
</script> 