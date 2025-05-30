<template>
  <div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50" @click="closeModal">
    <div class="relative top-10 mx-auto p-5 border w-11/12 md:w-4/5 lg:w-3/4 xl:w-2/3 shadow-lg rounded-md bg-white dark:bg-gray-800" @click.stop>
      <!-- Modal Header -->
      <div class="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-700">
        <div class="flex items-center space-x-4">
          <div class="h-12 w-12 rounded-lg flex items-center justify-center text-white font-bold text-lg" :style="{ backgroundColor: allocation.color }">
            {{ allocation.name.substring(0, 2).toUpperCase() }}
          </div>
          <div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">{{ allocation.name }}</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400">{{ allocation.code }}</p>
          </div>
        </div>
        <div class="flex items-center space-x-3">
          <button 
            @click="editAllocation"
            class="px-3 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 border border-indigo-600 rounded-md hover:bg-indigo-50 dark:hover:bg-indigo-900"
          >
            편집
          </button>
          <button @click="closeModal" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      </div>

      <!-- Modal Body -->
      <div class="mt-6 space-y-6">
        <!-- Resource Overview Cards -->
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <!-- CPU Usage -->
          <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">CPU 사용량</h4>
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600 dark:text-gray-400">할당된 코어</span>
                <span class="text-sm font-medium text-gray-900 dark:text-white">{{ allocation.cpuCores }}코어</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600 dark:text-gray-400">현재 사용률</span>
                <span class="text-sm font-medium text-gray-900 dark:text-white">{{ getCpuUsage() }}%</span>
              </div>
              <div class="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                <div class="bg-blue-600 h-2 rounded-full transition-all duration-300" :style="{ width: getCpuUsage() + '%' }"></div>
              </div>
            </div>
          </div>

          <!-- Memory Usage -->
          <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">메모리 사용량</h4>
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600 dark:text-gray-400">할당된 메모리</span>
                <span class="text-sm font-medium text-gray-900 dark:text-white">{{ allocation.memoryGb }}GB</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600 dark:text-gray-400">현재 사용률</span>
                <span class="text-sm font-medium text-gray-900 dark:text-white">{{ getMemoryUsage() }}%</span>
              </div>
              <div class="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                <div class="bg-green-600 h-2 rounded-full transition-all duration-300" :style="{ width: getMemoryUsage() + '%' }"></div>
              </div>
            </div>
          </div>

          <!-- Storage Usage -->
          <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">스토리지 사용량</h4>
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600 dark:text-gray-400">할당된 스토리지</span>
                <span class="text-sm font-medium text-gray-900 dark:text-white">{{ allocation.storageTb }}TB</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600 dark:text-gray-400">현재 사용률</span>
                <span class="text-sm font-medium text-gray-900 dark:text-white">{{ getStorageUsage() }}%</span>
              </div>
              <div class="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                <div class="bg-purple-600 h-2 rounded-full transition-all duration-300" :style="{ width: getStorageUsage() + '%' }"></div>
              </div>
            </div>
          </div>

          <!-- Budget Usage -->
          <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">예산 사용량</h4>
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600 dark:text-gray-400">월 예산</span>
                <span class="text-sm font-medium text-gray-900 dark:text-white">₩{{ allocation.monthlyBudget.toLocaleString() }}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600 dark:text-gray-400">현재 사용률</span>
                <span class="text-sm font-medium text-gray-900 dark:text-white">{{ getBudgetUsage() }}%</span>
              </div>
              <div class="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                <div class="bg-yellow-600 h-2 rounded-full transition-all duration-300" :style="{ width: getBudgetUsage() + '%' }"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Allocation Information -->
        <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
          <h4 class="text-lg font-medium text-gray-900 dark:text-white mb-4">할당 정보</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">부서</label>
              <span class="text-sm text-gray-900 dark:text-white">{{ allocation.department }}</span>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">할당일</label>
              <span class="text-sm text-gray-900 dark:text-white">{{ formatDate(allocation.allocatedAt) }}</span>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">상태</label>
              <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full" :class="getStatusClass(allocation.status)">
                {{ getStatusText(allocation.status) }}
              </span>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">할당 기간</label>
              <span class="text-sm text-gray-900 dark:text-white">{{ getAllocationPeriod() }}</span>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">자동 스케일링</label>
              <span class="text-sm text-gray-900 dark:text-white">{{ getAutoScalingStatus() }}</span>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">효율성 점수</label>
              <span class="text-sm text-gray-900 dark:text-white">{{ getEfficiencyScore() }}/100</span>
            </div>
          </div>
        </div>

        <!-- Resource Usage Chart -->
        <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
          <h4 class="text-lg font-medium text-gray-900 dark:text-white mb-4">리소스 사용률 추이</h4>
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- CPU & Memory Chart -->
            <div>
              <h5 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">CPU & 메모리 사용률 (최근 7일)</h5>
              <div class="space-y-2">
                <div v-for="day in getUsageHistory()" :key="day.date" class="flex items-center justify-between">
                  <span class="text-xs text-gray-600 dark:text-gray-400">{{ day.date }}</span>
                  <div class="flex space-x-2">
                    <div class="w-16 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                      <div class="bg-blue-500 h-2 rounded-full" :style="{ width: day.cpu + '%' }"></div>
                    </div>
                    <div class="w-16 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                      <div class="bg-green-500 h-2 rounded-full" :style="{ width: day.memory + '%' }"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex items-center space-x-4 mt-3 text-xs">
                <div class="flex items-center space-x-1">
                  <div class="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span class="text-gray-600 dark:text-gray-400">CPU</span>
                </div>
                <div class="flex items-center space-x-1">
                  <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span class="text-gray-600 dark:text-gray-400">메모리</span>
                </div>
              </div>
            </div>

            <!-- Cost Analysis -->
            <div>
              <h5 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">비용 분석</h5>
              <div class="space-y-3">
                <div class="flex items-center justify-between">
                  <span class="text-sm text-gray-600 dark:text-gray-400">CPU 비용</span>
                  <span class="text-sm font-medium text-gray-900 dark:text-white">₩{{ getCpuCost().toLocaleString() }}</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-sm text-gray-600 dark:text-gray-400">메모리 비용</span>
                  <span class="text-sm font-medium text-gray-900 dark:text-white">₩{{ getMemoryCost().toLocaleString() }}</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-sm text-gray-600 dark:text-gray-400">스토리지 비용</span>
                  <span class="text-sm font-medium text-gray-900 dark:text-white">₩{{ getStorageCost().toLocaleString() }}</span>
                </div>
                <div class="flex items-center justify-between border-t border-gray-200 dark:border-gray-600 pt-2">
                  <span class="text-sm font-medium text-gray-900 dark:text-white">총 비용</span>
                  <span class="text-sm font-bold text-gray-900 dark:text-white">₩{{ getTotalCost().toLocaleString() }}</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-sm text-gray-600 dark:text-gray-400">예산 대비</span>
                  <span class="text-sm font-medium" :class="getBudgetComparisonClass()">
                    {{ getBudgetComparison() }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Activities -->
        <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
          <h4 class="text-lg font-medium text-gray-900 dark:text-white mb-4">최근 활동</h4>
          <div class="space-y-3">
            <div v-for="activity in getRecentActivities()" :key="activity.id" class="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div class="flex-shrink-0 w-8 h-8 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center">
                <svg class="w-4 h-4 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div class="flex-1">
                <div class="flex items-center justify-between">
                  <p class="text-sm font-medium text-gray-900 dark:text-white">{{ activity.title }}</p>
                  <span class="text-xs text-gray-500 dark:text-gray-400">{{ activity.time }}</span>
                </div>
                <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">{{ activity.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Props
interface Props {
  allocation: any
}

const props = defineProps<Props>()

// Emits
const emit = defineEmits<{
  close: []
  edit: [allocation: any]
}>()

// Methods
const closeModal = () => {
  emit('close')
}

const editAllocation = () => {
  emit('edit', props.allocation)
  closeModal()
}

const getStatusClass = (status: string) => {
  const classes = {
    'ACTIVE': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    'PENDING': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    'SUSPENDED': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    'COMPLETED': 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
  }
  return classes[status as keyof typeof classes] || classes.PENDING
}

const getStatusText = (status: string) => {
  const texts = {
    'ACTIVE': '활성',
    'PENDING': '대기 중',
    'SUSPENDED': '일시 중단',
    'COMPLETED': '완료'
  }
  return texts[status as keyof typeof texts] || status
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const getCpuUsage = () => Math.floor(Math.random() * 40) + 60
const getMemoryUsage = () => Math.floor(Math.random() * 30) + 50
const getStorageUsage = () => Math.floor(Math.random() * 50) + 30
const getBudgetUsage = () => Math.floor(Math.random() * 20) + 70

const getAllocationPeriod = () => {
  return '3개월 (2024.01 - 2024.04)'
}

const getAutoScalingStatus = () => {
  return Math.random() > 0.5 ? '활성화' : '비활성화'
}

const getEfficiencyScore = () => {
  return Math.floor(Math.random() * 20) + 80
}

const getUsageHistory = () => {
  const days = ['01/20', '01/21', '01/22', '01/23', '01/24', '01/25', '01/26']
  return days.map(date => ({
    date,
    cpu: Math.floor(Math.random() * 40) + 50,
    memory: Math.floor(Math.random() * 30) + 60
  }))
}

const getCpuCost = () => props.allocation.cpuCores * 50000
const getMemoryCost = () => props.allocation.memoryGb * 15000
const getStorageCost = () => props.allocation.storageTb * 100000
const getTotalCost = () => getCpuCost() + getMemoryCost() + getStorageCost()

const getBudgetComparison = () => {
  const totalCost = getTotalCost()
  const budget = props.allocation.monthlyBudget
  const percentage = ((totalCost / budget) * 100).toFixed(1)
  return `${percentage}%`
}

const getBudgetComparisonClass = () => {
  const totalCost = getTotalCost()
  const budget = props.allocation.monthlyBudget
  const percentage = (totalCost / budget) * 100
  
  if (percentage > 100) return 'text-red-600 dark:text-red-400'
  if (percentage > 80) return 'text-yellow-600 dark:text-yellow-400'
  return 'text-green-600 dark:text-green-400'
}

const getRecentActivities = () => {
  return [
    {
      id: 1,
      title: '리소스 사용률 증가',
      description: `${props.allocation.name} 프로젝트의 CPU 사용률이 85%로 증가했습니다.`,
      time: '2시간 전'
    },
    {
      id: 2,
      title: '자동 스케일링 실행',
      description: '워크로드 증가로 인해 자동 스케일링이 실행되었습니다.',
      time: '1일 전'
    },
    {
      id: 3,
      title: '예산 알림',
      description: '월 예산의 80%를 사용했습니다.',
      time: '2일 전'
    },
    {
      id: 4,
      title: '리소스 할당 완료',
      description: '추가 스토리지 할당이 완료되었습니다.',
      time: '3일 전'
    }
  ]
}
</script> 