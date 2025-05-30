<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">리소스 할당</h1>
        <p class="text-gray-600 dark:text-gray-400 mt-1">프로젝트별 리소스 할당 현황을 관리합니다.</p>
      </div>
      <button 
        @click="showAllocationModal = true"
        class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-150 flex items-center space-x-2"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
        </svg>
        <span>리소스 할당</span>
      </button>
    </div>

    <!-- Resource Overview Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div class="flex items-center">
          <div class="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
            <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14-7H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2z"></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">총 CPU 코어</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ totalCpuCores }}</p>
            <p class="text-xs text-gray-500 dark:text-gray-400">사용률: {{ cpuUsagePercentage }}%</p>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div class="flex items-center">
          <div class="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
            <svg class="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">총 메모리</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ totalMemoryGb }}GB</p>
            <p class="text-xs text-gray-500 dark:text-gray-400">사용률: {{ memoryUsagePercentage }}%</p>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div class="flex items-center">
          <div class="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
            <svg class="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">총 스토리지</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ totalStorageTb }}TB</p>
            <p class="text-xs text-gray-500 dark:text-gray-400">사용률: {{ storageUsagePercentage }}%</p>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div class="flex items-center">
          <div class="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
            <svg class="w-6 h-6 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">월 예산</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">₩{{ totalBudget.toLocaleString() }}</p>
            <p class="text-xs text-gray-500 dark:text-gray-400">사용률: {{ budgetUsagePercentage }}%</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Resource Usage Charts -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- CPU Usage Chart -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">CPU 사용률</h3>
        <div class="space-y-4">
          <div v-for="project in resourceAllocations" :key="project.id" class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <div class="w-3 h-3 rounded-full" :style="{ backgroundColor: project.color }"></div>
              <span class="text-sm font-medium text-gray-900 dark:text-white">{{ project.name }}</span>
            </div>
            <div class="flex items-center space-x-2">
              <span class="text-sm text-gray-600 dark:text-gray-400">{{ project.cpuCores }}코어</span>
              <div class="w-24 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                <div 
                  class="h-2 rounded-full transition-all duration-300" 
                  :style="{ 
                    width: (project.cpuCores / totalCpuCores * 100) + '%',
                    backgroundColor: project.color 
                  }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Memory Usage Chart -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">메모리 사용률</h3>
        <div class="space-y-4">
          <div v-for="project in resourceAllocations" :key="project.id" class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <div class="w-3 h-3 rounded-full" :style="{ backgroundColor: project.color }"></div>
              <span class="text-sm font-medium text-gray-900 dark:text-white">{{ project.name }}</span>
            </div>
            <div class="flex items-center space-x-2">
              <span class="text-sm text-gray-600 dark:text-gray-400">{{ project.memoryGb }}GB</span>
              <div class="w-24 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                <div 
                  class="h-2 rounded-full transition-all duration-300" 
                  :style="{ 
                    width: (project.memoryGb / totalMemoryGb * 100) + '%',
                    backgroundColor: project.color 
                  }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters and Search -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div class="flex flex-col sm:flex-row gap-4">
        <!-- Search -->
        <div class="flex-1">
          <div class="relative">
            <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="프로젝트 이름으로 검색..."
              class="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
          </div>
        </div>

        <!-- Department Filter -->
        <select 
          v-model="selectedDepartment"
          class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
        >
          <option value="">모든 부서</option>
          <option value="AI Research">AI Research</option>
          <option value="Data Science">Data Science</option>
          <option value="Engineering">Engineering</option>
          <option value="Product">Product</option>
          <option value="Marketing">Marketing</option>
        </select>

        <!-- Status Filter -->
        <select 
          v-model="selectedStatus"
          class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
        >
          <option value="">모든 상태</option>
          <option value="ACTIVE">활성</option>
          <option value="PENDING">대기 중</option>
          <option value="SUSPENDED">일시 중단</option>
          <option value="COMPLETED">완료</option>
        </select>
      </div>
    </div>

    <!-- Resource Allocations Table -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white">리소스 할당 현황</h3>
      </div>
      
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead class="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer" @click="sortBy('name')">
                프로젝트
                <svg v-if="sortField === 'name'" class="inline w-4 h-4 ml-1" :class="sortDirection === 'asc' ? 'transform rotate-180' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">부서</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer" @click="sortBy('cpuCores')">
                CPU 코어
                <svg v-if="sortField === 'cpuCores'" class="inline w-4 h-4 ml-1" :class="sortDirection === 'asc' ? 'transform rotate-180' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer" @click="sortBy('memoryGb')">
                메모리 (GB)
                <svg v-if="sortField === 'memoryGb'" class="inline w-4 h-4 ml-1" :class="sortDirection === 'asc' ? 'transform rotate-180' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer" @click="sortBy('storageTb')">
                스토리지 (TB)
                <svg v-if="sortField === 'storageTb'" class="inline w-4 h-4 ml-1" :class="sortDirection === 'asc' ? 'transform rotate-180' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer" @click="sortBy('monthlyBudget')">
                월 예산
                <svg v-if="sortField === 'monthlyBudget'" class="inline w-4 h-4 ml-1" :class="sortDirection === 'asc' ? 'transform rotate-180' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">상태</th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">액션</th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="allocation in paginatedAllocations" :key="allocation.id" class="hover:bg-gray-50 dark:hover:bg-gray-700">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10">
                    <div class="h-10 w-10 rounded-lg flex items-center justify-center text-white font-bold text-sm" :style="{ backgroundColor: allocation.color }">
                      {{ allocation.name.substring(0, 2).toUpperCase() }}
                    </div>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900 dark:text-white">{{ allocation.name }}</div>
                    <div class="text-sm text-gray-500 dark:text-gray-400">{{ allocation.code }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900 dark:text-white">{{ allocation.department }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900 dark:text-white">{{ allocation.cpuCores }}코어</div>
                <div class="text-xs text-gray-500 dark:text-gray-400">{{ ((allocation.cpuCores / totalCpuCores) * 100).toFixed(1) }}%</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900 dark:text-white">{{ allocation.memoryGb }}GB</div>
                <div class="text-xs text-gray-500 dark:text-gray-400">{{ ((allocation.memoryGb / totalMemoryGb) * 100).toFixed(1) }}%</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900 dark:text-white">{{ allocation.storageTb }}TB</div>
                <div class="text-xs text-gray-500 dark:text-gray-400">{{ ((allocation.storageTb / totalStorageTb) * 100).toFixed(1) }}%</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900 dark:text-white">₩{{ allocation.monthlyBudget.toLocaleString() }}</div>
                <div class="text-xs text-gray-500 dark:text-gray-400">{{ ((allocation.monthlyBudget / totalBudget) * 100).toFixed(1) }}%</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full" :class="getStatusClass(allocation.status)">
                  {{ getStatusText(allocation.status) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="flex justify-end space-x-2">
                  <button 
                    @click="viewAllocation(allocation)"
                    class="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                  >
                    보기
                  </button>
                  <button 
                    @click="editAllocation(allocation)"
                    class="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300"
                  >
                    편집
                  </button>
                  <button 
                    @click="removeAllocation(allocation)"
                    class="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                  >
                    해제
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="bg-white dark:bg-gray-800 px-4 py-3 border-t border-gray-200 dark:border-gray-700 sm:px-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <p class="text-sm text-gray-700 dark:text-gray-300">
              <span class="font-medium">{{ (currentPage - 1) * itemsPerPage + 1 }}</span>
              -
              <span class="font-medium">{{ Math.min(currentPage * itemsPerPage, filteredAllocations.length) }}</span>
              of
              <span class="font-medium">{{ filteredAllocations.length }}</span>
              결과
            </p>
            <select 
              v-model="itemsPerPage" 
              class="ml-4 px-3 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm dark:bg-gray-700 dark:text-white"
            >
              <option :value="10">10개씩</option>
              <option :value="25">25개씩</option>
              <option :value="50">50개씩</option>
            </select>
          </div>
          <div class="flex space-x-2">
            <button 
              @click="currentPage--" 
              :disabled="currentPage === 1"
              class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              이전
            </button>
            <button 
              @click="currentPage++" 
              :disabled="currentPage >= totalPages"
              class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              다음
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Resource Allocation Modal -->
    <ResourceAllocationModal 
      v-if="showAllocationModal"
      :projects="availableProjects"
      @close="showAllocationModal = false"
      @allocate="allocateResource"
    />

    <!-- Resource Detail Modal -->
    <ResourceDetailModal 
      v-if="showDetailModal"
      :allocation="selectedAllocation"
      @close="showDetailModal = false"
      @edit="editAllocation"
    />

    <!-- Edit Allocation Modal -->
    <ResourceEditModal 
      v-if="showEditModal"
      :allocation="selectedAllocation"
      @close="closeEditModal"
      @save="saveAllocation"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

// Types
interface ResourceAllocation {
  id: string
  name: string
  code: string
  department: string
  cpuCores: number
  memoryGb: number
  storageTb: number
  monthlyBudget: number
  status: 'ACTIVE' | 'PENDING' | 'SUSPENDED' | 'COMPLETED'
  color: string
  allocatedAt: string
}

interface Project {
  id: string
  name: string
  code: string
  department: string
  status: string
}

// Reactive data
const resourceAllocations = ref<ResourceAllocation[]>([])
const availableProjects = ref<Project[]>([])
const searchQuery = ref('')
const selectedDepartment = ref('')
const selectedStatus = ref('')
const sortField = ref('allocatedAt')
const sortDirection = ref<'asc' | 'desc'>('desc')
const currentPage = ref(1)
const itemsPerPage = ref(10)

// Modal states
const showAllocationModal = ref(false)
const showDetailModal = ref(false)
const showEditModal = ref(false)
const selectedAllocation = ref<ResourceAllocation | null>(null)

// Computed properties
const filteredAllocations = computed(() => {
  let filtered = resourceAllocations.value

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(allocation => 
      allocation.name.toLowerCase().includes(query) ||
      allocation.code.toLowerCase().includes(query)
    )
  }

  if (selectedDepartment.value) {
    filtered = filtered.filter(allocation => allocation.department === selectedDepartment.value)
  }

  if (selectedStatus.value) {
    filtered = filtered.filter(allocation => allocation.status === selectedStatus.value)
  }

  // Sort
  filtered.sort((a, b) => {
    let aValue = a[sortField.value as keyof ResourceAllocation]
    let bValue = b[sortField.value as keyof ResourceAllocation]

    if (typeof aValue === 'string') aValue = aValue.toLowerCase()
    if (typeof bValue === 'string') bValue = bValue.toLowerCase()

    if (sortDirection.value === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
    }
  })

  return filtered
})

const paginatedAllocations = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredAllocations.value.slice(start, end)
})

const totalPages = computed(() => {
  return Math.ceil(filteredAllocations.value.length / itemsPerPage.value)
})

const totalCpuCores = computed(() => resourceAllocations.value.reduce((sum, a) => sum + a.cpuCores, 0))
const totalMemoryGb = computed(() => resourceAllocations.value.reduce((sum, a) => sum + a.memoryGb, 0))
const totalStorageTb = computed(() => resourceAllocations.value.reduce((sum, a) => sum + a.storageTb, 0))
const totalBudget = computed(() => resourceAllocations.value.reduce((sum, a) => sum + a.monthlyBudget, 0))

const cpuUsagePercentage = computed(() => Math.round((totalCpuCores.value / 128) * 100))
const memoryUsagePercentage = computed(() => Math.round((totalMemoryGb.value / 512) * 100))
const storageUsagePercentage = computed(() => Math.round((totalStorageTb.value / 50) * 100))
const budgetUsagePercentage = computed(() => Math.round((totalBudget.value / 10000000) * 100))

// Methods
const sortBy = (field: string) => {
  if (sortField.value === field) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortField.value = field
    sortDirection.value = 'asc'
  }
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

const viewAllocation = (allocation: ResourceAllocation) => {
  selectedAllocation.value = allocation
  showDetailModal.value = true
}

const editAllocation = (allocation: ResourceAllocation) => {
  selectedAllocation.value = allocation
  showEditModal.value = true
}

const removeAllocation = (allocation: ResourceAllocation) => {
  if (confirm(`"${allocation.name}" 프로젝트의 리소스 할당을 해제하시겠습니까?`)) {
    resourceAllocations.value = resourceAllocations.value.filter(a => a.id !== allocation.id)
  }
}

const closeEditModal = () => {
  showEditModal.value = false
  selectedAllocation.value = null
}

const allocateResource = (allocationData: any) => {
  const newAllocation: ResourceAllocation = {
    id: `alloc-${Date.now()}`,
    name: allocationData.name,
    code: allocationData.code,
    department: allocationData.department,
    cpuCores: allocationData.cpuCores,
    memoryGb: allocationData.memoryGb,
    storageTb: allocationData.storageTb,
    monthlyBudget: allocationData.monthlyBudget,
    status: 'ACTIVE',
    color: allocationData.color,
    allocatedAt: new Date().toISOString()
  }
  resourceAllocations.value.push(newAllocation)
  showAllocationModal.value = false
}

const saveAllocation = (allocationData: any) => {
  if (selectedAllocation.value) {
    const index = resourceAllocations.value.findIndex(a => a.id === selectedAllocation.value!.id)
    if (index !== -1) {
      resourceAllocations.value[index] = { ...resourceAllocations.value[index], ...allocationData }
    }
  }
  closeEditModal()
}

// Initialize dummy data
const initializeData = () => {
  availableProjects.value = [
    { id: 'proj-001', name: 'AI 챗봇 개발', code: 'AI-CHAT-001', department: 'AI Research', status: 'ACTIVE' },
    { id: 'proj-002', name: '데이터 분석 플랫폼', code: 'DATA-PLATFORM-002', department: 'Data Science', status: 'ACTIVE' },
    { id: 'proj-003', name: '모바일 앱 리뉴얼', code: 'MOBILE-RENEWAL-003', department: 'Engineering', status: 'PENDING' },
    { id: 'proj-004', name: '클라우드 마이그레이션', code: 'CLOUD-MIG-004', department: 'Engineering', status: 'ACTIVE' },
    { id: 'proj-007', name: '신제품 개발', code: 'NEW-PROD-007', department: 'Product', status: 'ACTIVE' }
  ]

  resourceAllocations.value = [
    {
      id: 'alloc-001',
      name: 'AI 챗봇 개발',
      code: 'AI-CHAT-001',
      department: 'AI Research',
      cpuCores: 16,
      memoryGb: 64,
      storageTb: 2,
      monthlyBudget: 1500000,
      status: 'ACTIVE',
      color: '#4F46E5',
      allocatedAt: '2024-01-15T09:00:00Z'
    },
    {
      id: 'alloc-002',
      name: '데이터 분석 플랫폼',
      code: 'DATA-PLATFORM-002',
      department: 'Data Science',
      cpuCores: 32,
      memoryGb: 128,
      storageTb: 10,
      monthlyBudget: 3000000,
      status: 'ACTIVE',
      color: '#10B981',
      allocatedAt: '2024-01-10T10:00:00Z'
    },
    {
      id: 'alloc-003',
      name: '모바일 앱 리뉴얼',
      code: 'MOBILE-RENEWAL-003',
      department: 'Engineering',
      cpuCores: 8,
      memoryGb: 32,
      storageTb: 1,
      monthlyBudget: 800000,
      status: 'PENDING',
      color: '#F59E0B',
      allocatedAt: '2024-01-20T11:30:00Z'
    },
    {
      id: 'alloc-004',
      name: '클라우드 마이그레이션',
      code: 'CLOUD-MIG-004',
      department: 'Engineering',
      cpuCores: 24,
      memoryGb: 96,
      storageTb: 5,
      monthlyBudget: 2200000,
      status: 'ACTIVE',
      color: '#8B5CF6',
      allocatedAt: '2024-01-05T08:00:00Z'
    },
    {
      id: 'alloc-005',
      name: '신제품 개발',
      code: 'NEW-PROD-007',
      department: 'Product',
      cpuCores: 12,
      memoryGb: 48,
      storageTb: 3,
      monthlyBudget: 1200000,
      status: 'ACTIVE',
      color: '#06B6D4',
      allocatedAt: '2024-01-08T10:30:00Z'
    }
  ]
}

onMounted(() => {
  initializeData()
})
</script> 