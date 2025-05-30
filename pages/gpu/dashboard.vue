<template>
  <div>
    <!-- Page Header -->
    <div class="mb-8">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white">GPU Dashboard</h1>
          <p class="text-gray-600 dark:text-gray-400 mt-1">Monitor and manage GPU resources across all environments</p>
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

    <!-- GPU Status Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <!-- Total GPUs Card -->
      <div 
        @click="navigateToGpuPools"
        class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border-l-4 border-green-500 cursor-pointer hover:shadow-md transition-shadow duration-200"
      >
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 002 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
              </svg>
            </div>
          </div>
          <div class="ml-4 flex-1">
            <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Total GPUs</h3>
            <p class="text-3xl font-bold text-gray-900 dark:text-white">{{ gpuStats.total || 0 }}</p>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">Available: {{ gpuStats.available || 0 }}</p>
          </div>
          <div class="ml-2">
            <svg class="w-5 h-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </div>
        </div>
      </div>

      <!-- In Use GPUs Card -->
      <div 
        @click="navigateToGpuPools"
        class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border-l-4 border-blue-500 cursor-pointer hover:shadow-md transition-shadow duration-200"
      >
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
          </div>
          <div class="ml-4 flex-1">
            <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">In Use</h3>
            <p class="text-3xl font-bold text-gray-900 dark:text-white">{{ gpuStats.inUse || 0 }}</p>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">Utilization: {{ utilizationRate }}%</p>
          </div>
          <div class="ml-2">
            <svg class="w-5 h-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </div>
        </div>
      </div>

      <!-- Pending Requests Card -->
      <div 
        @click="navigateToGpuRequests"
        class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border-l-4 border-yellow-500 cursor-pointer hover:shadow-md transition-shadow duration-200"
      >
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
          </div>
          <div class="ml-4 flex-1">
            <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Pending Requests</h3>
            <p class="text-3xl font-bold text-gray-900 dark:text-white">{{ pendingRequests.length }}</p>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">Awaiting approval</p>
          </div>
          <div class="ml-2">
            <svg class="w-5 h-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Usage Analytics Charts -->
    <div class="mb-8">
      <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-6">Usage Analytics</h2>
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Realm Usage Chart -->
        <PieChart
          title="Usage by Realm"
          :data="realmUsageData"
          chart-id="realm-usage-chart"
        />
        
        <!-- Project Usage Chart -->
        <PieChart
          title="Usage by Project"
          :data="projectUsageData"
          chart-id="project-usage-chart"
        />
        
        <!-- Pool Type Usage Chart -->
        <PieChart
          title="Usage by GPU Type"
          :data="poolTypeUsageData"
          chart-id="pool-type-usage-chart"
        />
      </div>
    </div>

    <!-- 사용자 통계 차트 -->
    <div class="mb-8">
      <UserStatsChart />
    </div>

    <!-- Dashboard Tables -->
    <div class="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
      <!-- Top 5 GPU Pools -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white">Top 5 GPU Pools</h3>
          <NuxtLink 
            to="/gpu/pools"
            class="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300 font-medium"
          >
            View All →
          </NuxtLink>
        </div>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead class="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Pool Name</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Project</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Type</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Usage</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              <tr v-for="(pool, index) in topGpuPools" :key="pool.poolName" :class="index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700'">
                <td class="px-4 py-3 whitespace-nowrap text-sm font-medium">
                  <button 
                    @click="handleViewPoolDetail(pool)"
                    class="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300 hover:underline focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
                  >
                    {{ pool.poolName }}
                  </button>
                </td>
                <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{{ pool.project || 'N/A' }}</td>
                <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{{ pool.gpuType.replace('NVIDIA ', '') }}</td>
                <td class="px-4 py-3 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="w-12 bg-gray-200 dark:bg-gray-600 rounded-full h-2 mr-2">
                      <div 
                        class="h-2 rounded-full"
                        :class="getUtilizationColor(pool.used / pool.capacity * 100)"
                        :style="{ width: `${(pool.used / pool.capacity * 100)}%` }"
                      ></div>
                    </div>
                    <span class="text-sm text-gray-500 dark:text-gray-400">{{ pool.used }}/{{ pool.capacity }}</span>
                  </div>
                </td>
                <td class="px-4 py-3 whitespace-nowrap">
                  <span :class="getStatusBadgeClass(pool.status)" class="px-2 py-1 rounded-full text-xs font-medium">
                    {{ pool.status }}
                  </span>
                </td>
              </tr>
              <tr v-if="topGpuPools.length === 0">
                <td colspan="5" class="px-4 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                  No GPU pools available
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Pending Requests Table -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white">Pending GPU Requests</h3>
          <div class="text-sm text-gray-500 dark:text-gray-400">
            {{ pendingRequests.length }} pending
          </div>
        </div>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead class="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Request ID</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Project</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Pool Name</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Requested</th>
                <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              <tr v-for="(request, index) in pendingRequests" :key="request.reqId" :class="index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700'">
                <td class="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{{ request.reqId }}</td>
                <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{{ request.project }}</td>
                <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{{ request.poolName }}</td>
                <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{{ formatDate(request.requestedAt) }}</td>
                <td class="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                  <div class="flex justify-end space-x-1">
                    <button 
                      @click="handleApproveRequest(request.reqId)"
                      class="bg-green-600 text-white px-2 py-1 rounded text-xs hover:bg-green-700"
                    >
                      Approve
                    </button>
                    <button 
                      @click="handleRejectRequest(request.reqId)"
                      class="bg-red-600 text-white px-2 py-1 rounded text-xs hover:bg-red-700"
                    >
                      Reject
                    </button>
                  </div>
                </td>
              </tr>
              <tr v-if="pendingRequests.length === 0">
                <td colspan="5" class="px-4 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                  No pending requests
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

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
import PieChart from '~/components/gpu/PieChart.vue'
import GpuPoolDetailModal from '~/components/gpu/GpuPoolDetailModal.vue'
import GpuPoolEditModal from '~/components/gpu/GpuPoolEditModal.vue'
import GpuPoolDeleteModal from '~/components/gpu/GpuPoolDeleteModal.vue'
import { useToast } from '~/composables/useToast'
import UserStatsChart from '~/components/charts/UserStatsChart.vue'

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

interface GpuRequest {
  reqId: string
  project: string
  poolName: string
  requestedAt: string
}

interface GpuStats {
  total: number
  available: number
  inUse: number
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
const realms = ref<string[]>(['production', 'staging', 'development', 'testing'])
const gpuPools = ref<GpuPool[]>([])
const pendingRequests = ref<GpuRequest[]>([])
const gpuStats = ref<GpuStats>({ total: 0, available: 0, inUse: 0 })

// Modal state
const showDetailModal = ref<boolean>(false)
const selectedPool = ref<GpuPool | null>(null)
const showEditModal = ref<boolean>(false)
const selectedPoolForEdit = ref<GpuPool | null>(null)
const showDeleteModal = ref<boolean>(false)
const selectedPoolForDelete = ref<GpuPool | null>(null)

// Computed properties
const utilizationRate = computed(() => {
  if (gpuStats.value.total === 0) return 0
  return Math.round((gpuStats.value.inUse / gpuStats.value.total) * 100)
})

// Top 5 GPU Pools sorted by usage percentage
const topGpuPools = computed(() => {
  return [...gpuPools.value]
    .sort((a, b) => {
      const aUtilization = a.used / a.capacity
      const bUtilization = b.used / b.capacity
      return bUtilization - aUtilization
    })
    .slice(0, 5)
})

// Chart data computed properties
const realmUsageData = computed(() => {
  const realmData = new Map<string, number>()
  
  // Mock realm distribution - in real app, this would come from API
  realmData.set('Production', 28)
  realmData.set('Staging', 15)
  realmData.set('Development', 8)
  realmData.set('Testing', 1)
  
  const colors = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444']
  
  return Array.from(realmData.entries()).map(([realm, usage], index) => ({
    label: realm,
    value: usage,
    color: colors[index % colors.length]
  }))
})

const projectUsageData = computed(() => {
  const projectData = new Map<string, number>()
  
  // Calculate usage by project from GPU pools
  gpuPools.value.forEach(pool => {
    if (pool.project) {
      const currentUsage = projectData.get(pool.project) || 0
      projectData.set(pool.project, currentUsage + pool.used)
    }
  })
  
  const colors = ['#8B5CF6', '#10B981', '#F59E0B', '#EF4444', '#3B82F6']
  
  return Array.from(projectData.entries()).map(([project, usage], index) => ({
    label: project,
    value: usage,
    color: colors[index % colors.length]
  }))
})

const poolTypeUsageData = computed(() => {
  const typeData = new Map<string, number>()
  
  // Calculate usage by GPU type
  gpuPools.value.forEach(pool => {
    const currentUsage = typeData.get(pool.gpuType) || 0
    typeData.set(pool.gpuType, currentUsage + pool.used)
  })
  
  const colors = ['#6366F1', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6']
  
  return Array.from(typeData.entries()).map(([type, usage], index) => ({
    label: type,
    value: usage,
    color: colors[index % colors.length]
  }))
})

// Methods
const handleRealmChange = async () => {
  if (selectedRealm.value) {
    await fetchGpuData()
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
    const totalCapacity = gpuPools.value.reduce((sum, pool) => sum + pool.capacity, 0)
    const totalUsed = gpuPools.value.reduce((sum, pool) => sum + pool.used, 0)
    const totalAvailable = totalCapacity - totalUsed
    
    gpuStats.value = {
      total: totalCapacity,
      available: totalAvailable,
      inUse: totalUsed
    }
    
    // Show success message (you could add a toast notification here)
    console.log('GPU pool saved successfully')
    
  } catch (error) {
    console.error('Failed to save GPU pool:', error)
    // Handle error (show error message to user)
  }
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
      const deletedPool = gpuPools.value[poolIndex]
      gpuPools.value.splice(poolIndex, 1)
      
      // Recalculate stats
      const totalCapacity = gpuPools.value.reduce((sum, pool) => sum + pool.capacity, 0)
      const totalUsed = gpuPools.value.reduce((sum, pool) => sum + pool.used, 0)
      const totalAvailable = totalCapacity - totalUsed
      
      gpuStats.value = {
        total: totalCapacity,
        available: totalAvailable,
        inUse: totalUsed
      }
      
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

const handleApproveRequest = async (reqId: string) => {
  try {
    // Find the request to get details
    const request = pendingRequests.value.find(req => req.reqId === reqId)
    if (!request) {
      showError('요청을 찾을 수 없습니다.')
      return
    }

    // API call to approve request
    console.log('Approve request:', reqId)
    
    // Remove from pending requests
    const requestIndex = pendingRequests.value.findIndex(req => req.reqId === reqId)
    if (requestIndex !== -1) {
      pendingRequests.value.splice(requestIndex, 1)
    }

    // Show success toast
    success(
      `PoolName: ${request.poolName}이 Project: ${request.project}에 할당되었습니다.`,
      `RequestID: ${reqId}가 처리되었습니다.`
    )

    await fetchGpuData()
  } catch (error) {
    console.error('Failed to approve request:', error)
    showError('요청 승인 중 오류가 발생했습니다.')
  }
}

const handleRejectRequest = async (reqId: string) => {
  if (confirm('정말로 이 요청을 거부하시겠습니까?')) {
    try {
      // Find the request to get details
      const request = pendingRequests.value.find(req => req.reqId === reqId)
      if (!request) {
        showError('요청을 찾을 수 없습니다.')
        return
      }

      // API call to reject request
      console.log('Reject request:', reqId)
      
      // Remove from pending requests
      const requestIndex = pendingRequests.value.findIndex(req => req.reqId === reqId)
      if (requestIndex !== -1) {
        pendingRequests.value.splice(requestIndex, 1)
      }

      // Show error toast for rejection
      showError(
        `PoolName: ${request.poolName} 요청이 거부되었습니다.`,
        `RequestID: ${reqId}가 처리되었습니다.`
      )

      await fetchGpuData()
    } catch (error) {
      console.error('Failed to reject request:', error)
      showError('요청 거부 중 오류가 발생했습니다.')
    }
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

const navigateToGpuPools = () => {
  navigateTo('/gpu/pools')
}

const navigateToGpuRequests = () => {
  navigateTo('/gpu/requests')
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString()
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
    
    pendingRequests.value = [
      {
        reqId: 'req-001',
        project: 'ai-research',
        poolName: 'gpu-pool-a100-03',
        requestedAt: '2024-01-15T10:30:00Z'
      },
      {
        reqId: 'req-002',
        project: 'ml-training',
        poolName: 'gpu-pool-v100-03',
        requestedAt: '2024-01-15T14:20:00Z'
      },
      {
        reqId: 'req-003',
        project: 'data-analytics',
        poolName: 'gpu-pool-rtx4090-02',
        requestedAt: '2024-01-16T09:15:00Z'
      },
      {
        reqId: 'req-004',
        project: 'computer-vision',
        poolName: 'gpu-pool-t4-02',
        requestedAt: '2024-01-16T11:45:00Z'
      }
    ]
    
    // Calculate total stats from pool data
    const totalCapacity = gpuPools.value.reduce((sum, pool) => sum + pool.capacity, 0)
    const totalUsed = gpuPools.value.reduce((sum, pool) => sum + pool.used, 0)
    const totalAvailable = totalCapacity - totalUsed
    
    gpuStats.value = {
      total: totalCapacity,
      available: totalAvailable,
      inUse: totalUsed
    }
  } catch (error) {
    console.error('Failed to fetch GPU data:', error)
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