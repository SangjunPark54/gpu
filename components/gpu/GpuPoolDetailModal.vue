<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto">
    <!-- Backdrop -->
    <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity" @click="closeModal"></div>
    
    <!-- Modal -->
    <div class="flex min-h-full items-center justify-center p-4">
      <div class="relative bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <!-- Header -->
        <div class="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 class="text-xl font-semibold text-gray-900">GPU Pool Details</h2>
            <p class="text-sm text-gray-500 mt-1">{{ pool?.poolName }}</p>
          </div>
          <button @click="closeModal" class="text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-lg p-2">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <!-- Content -->
        <div class="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div v-if="pool" class="space-y-6">
            <!-- Basic Information -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="bg-gray-50 rounded-lg p-4">
                <h3 class="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
                <dl class="space-y-3">
                  <div>
                    <dt class="text-sm font-medium text-gray-500">Pool Name</dt>
                    <dd class="text-sm text-gray-900 mt-1">{{ pool.poolName }}</dd>
                  </div>
                  <div>
                    <dt class="text-sm font-medium text-gray-500">Project</dt>
                    <dd class="text-sm text-gray-900 mt-1">{{ pool.project || 'N/A' }}</dd>
                  </div>
                  <div>
                    <dt class="text-sm font-medium text-gray-500">GPU Type</dt>
                    <dd class="text-sm text-gray-900 mt-1">{{ pool.gpuType }}</dd>
                  </div>
                  <div>
                    <dt class="text-sm font-medium text-gray-500">Status</dt>
                    <dd class="mt-1">
                      <span :class="getStatusBadgeClass(pool.status)" class="px-2 py-1 rounded-full text-xs font-medium">
                        {{ pool.status }}
                      </span>
                    </dd>
                  </div>
                </dl>
              </div>

              <div class="bg-gray-50 rounded-lg p-4">
                <h3 class="text-lg font-medium text-gray-900 mb-4">Resource Usage</h3>
                <dl class="space-y-3">
                  <div>
                    <dt class="text-sm font-medium text-gray-500">Total Capacity</dt>
                    <dd class="text-sm text-gray-900 mt-1">{{ pool.capacity }} GPUs</dd>
                  </div>
                  <div>
                    <dt class="text-sm font-medium text-gray-500">Currently Used</dt>
                    <dd class="text-sm text-gray-900 mt-1">{{ pool.used }} GPUs</dd>
                  </div>
                  <div>
                    <dt class="text-sm font-medium text-gray-500">Available</dt>
                    <dd class="text-sm text-gray-900 mt-1">{{ pool.capacity - pool.used }} GPUs</dd>
                  </div>
                  <div>
                    <dt class="text-sm font-medium text-gray-500">Utilization Rate</dt>
                    <dd class="text-sm text-gray-900 mt-1">{{ Math.round((pool.used / pool.capacity) * 100) }}%</dd>
                  </div>
                </dl>
              </div>
            </div>

            <!-- Usage Chart -->
            <div class="bg-gray-50 rounded-lg p-4">
              <h3 class="text-lg font-medium text-gray-900 mb-4">Usage Visualization</h3>
              <div class="flex items-center justify-center">
                <div class="relative w-48 h-48">
                  <svg class="w-48 h-48 transform -rotate-90" viewBox="0 0 36 36">
                    <path class="text-gray-200" stroke="currentColor" stroke-width="3" fill="none" 
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"></path>
                    <path :class="getUsageColor(pool)" stroke="currentColor" stroke-width="3" fill="none" 
                          :stroke-dasharray="`${(pool.used / pool.capacity) * 100}, 100`"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"></path>
                  </svg>
                  <div class="absolute inset-0 flex items-center justify-center">
                    <div class="text-center">
                      <div class="text-2xl font-bold text-gray-900">{{ Math.round((pool.used / pool.capacity) * 100) }}%</div>
                      <div class="text-sm text-gray-500">Used</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="mt-4 grid grid-cols-3 gap-4 text-center">
                <div>
                  <div class="text-lg font-semibold text-blue-600">{{ pool.used }}</div>
                  <div class="text-sm text-gray-500">Used</div>
                </div>
                <div>
                  <div class="text-lg font-semibold text-green-600">{{ pool.capacity - pool.used }}</div>
                  <div class="text-sm text-gray-500">Available</div>
                </div>
                <div>
                  <div class="text-lg font-semibold text-gray-600">{{ pool.capacity }}</div>
                  <div class="text-sm text-gray-500">Total</div>
                </div>
              </div>
            </div>

            <!-- Additional Details -->
            <div class="bg-gray-50 rounded-lg p-4">
              <h3 class="text-lg font-medium text-gray-900 mb-4">Additional Information</h3>
              <dl class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <dt class="text-sm font-medium text-gray-500">Created Date</dt>
                  <dd class="text-sm text-gray-900 mt-1">{{ formatDate(mockCreatedDate) }}</dd>
                </div>
                <div>
                  <dt class="text-sm font-medium text-gray-500">Last Updated</dt>
                  <dd class="text-sm text-gray-900 mt-1">{{ formatDate(mockUpdatedDate) }}</dd>
                </div>
                <div>
                  <dt class="text-sm font-medium text-gray-500">Realm</dt>
                  <dd class="text-sm text-gray-900 mt-1">{{ mockRealm }}</dd>
                </div>
                <div>
                  <dt class="text-sm font-medium text-gray-500">Region</dt>
                  <dd class="text-sm text-gray-900 mt-1">{{ mockRegion }}</dd>
                </div>
                <div>
                  <dt class="text-sm font-medium text-gray-500">Cost per Hour</dt>
                  <dd class="text-sm text-gray-900 mt-1">${{ mockCostPerHour }}/hour</dd>
                </div>
                <div>
                  <dt class="text-sm font-medium text-gray-500">Auto Scaling</dt>
                  <dd class="text-sm text-gray-900 mt-1">{{ mockAutoScaling ? 'Enabled' : 'Disabled' }}</dd>
                </div>
              </dl>
            </div>

            <!-- Recent Activity -->
            <div class="bg-gray-50 rounded-lg p-4">
              <h3 class="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
              <div class="space-y-3">
                <div v-for="activity in mockActivities" :key="activity.id" class="flex items-start space-x-3">
                  <div :class="activity.color" class="w-2 h-2 rounded-full mt-2"></div>
                  <div class="flex-1">
                    <p class="text-sm font-medium text-gray-900">{{ activity.action }}</p>
                    <p class="text-sm text-gray-500">{{ activity.description }}</p>
                    <p class="text-xs text-gray-400">{{ activity.timestamp }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="flex items-center justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50">
          <button @click="closeModal" class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            Close
          </button>
          <button @click="handleEdit" class="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            Edit Pool
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// Props
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
  pool: GpuPool | null
}

const props = defineProps<Props>()

// Emits
const emit = defineEmits<{
  close: []
  edit: [pool: GpuPool]
}>()

// Mock data for additional details
const mockCreatedDate = '2024-01-10T09:00:00Z'
const mockUpdatedDate = '2024-01-15T14:30:00Z'
const mockRealm = 'production'
const mockRegion = 'us-west-2'
const mockCostPerHour = computed(() => {
  if (!props.pool) return 0
  const baseCost = props.pool.gpuType.includes('A100') ? 3.2 : 
                   props.pool.gpuType.includes('V100') ? 2.1 : 
                   props.pool.gpuType.includes('RTX 4090') ? 1.8 : 
                   props.pool.gpuType.includes('RTX 3090') ? 1.2 : 0.8
  return (baseCost * props.pool.capacity).toFixed(2)
})
const mockAutoScaling = true

const mockActivities = computed(() => [
  {
    id: 1,
    action: 'GPU Allocation',
    description: `2 GPUs allocated to user john.doe for training job`,
    timestamp: '10 minutes ago',
    color: 'bg-blue-500'
  },
  {
    id: 2,
    action: 'Pool Scaling',
    description: `Pool capacity increased from ${props.pool?.capacity ? props.pool.capacity - 2 : 0} to ${props.pool?.capacity || 0}`,
    timestamp: '2 hours ago',
    color: 'bg-green-500'
  },
  {
    id: 3,
    action: 'Maintenance',
    description: 'Routine maintenance completed successfully',
    timestamp: '1 day ago',
    color: 'bg-yellow-500'
  },
  {
    id: 4,
    action: 'Pool Created',
    description: `Pool ${props.pool?.poolName} created for ${props.pool?.project} project`,
    timestamp: '5 days ago',
    color: 'bg-purple-500'
  }
])

// Methods
const closeModal = () => {
  emit('close')
}

const handleEdit = () => {
  if (props.pool) {
    emit('edit', props.pool)
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

const getUsageColor = (pool: GpuPool) => {
  const usage = (pool.used / pool.capacity) * 100
  if (usage >= 90) return 'text-red-500'
  if (usage >= 70) return 'text-yellow-500'
  if (usage >= 50) return 'text-blue-500'
  return 'text-green-500'
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script> 