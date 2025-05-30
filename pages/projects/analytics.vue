<template>
  <div class="p-6">
    <!-- Page Header -->
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">프로젝트 분석</h1>
      <p class="text-gray-600 dark:text-gray-400 mt-2">프로젝트 성과 및 리소스 사용률을 분석합니다.</p>
    </div>

    <!-- Filter Controls -->
    <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-6">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">기간</label>
          <select v-model="selectedPeriod" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white">
            <option value="7d">최근 7일</option>
            <option value="30d">최근 30일</option>
            <option value="90d">최근 90일</option>
            <option value="1y">최근 1년</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">부서</label>
          <select v-model="selectedDepartment" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white">
            <option value="">전체 부서</option>
            <option value="AI Research">AI Research</option>
            <option value="Data Science">Data Science</option>
            <option value="Engineering">Engineering</option>
            <option value="Product">Product</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">상태</label>
          <select v-model="selectedStatus" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white">
            <option value="">전체 상태</option>
            <option value="ACTIVE">활성</option>
            <option value="COMPLETED">완료</option>
            <option value="ON_HOLD">보류</option>
            <option value="CANCELLED">취소</option>
          </select>
        </div>
        <div class="flex items-end">
          <button
            @click="applyFilters"
            class="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            필터 적용
          </button>
        </div>
      </div>
    </div>

    <!-- Overview Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div class="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <svg class="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">총 프로젝트</dt>
                <dd class="text-lg font-medium text-gray-900 dark:text-white">{{ analytics.totalProjects }}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                <svg class="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">완료된 프로젝트</dt>
                <dd class="text-lg font-medium text-gray-900 dark:text-white">{{ analytics.completedProjects }}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center">
                <svg class="w-5 h-5 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                </svg>
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">총 예산</dt>
                <dd class="text-lg font-medium text-gray-900 dark:text-white">₩{{ analytics.totalBudget.toLocaleString() }}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                <svg class="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                </svg>
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">평균 성공률</dt>
                <dd class="text-lg font-medium text-gray-900 dark:text-white">{{ analytics.successRate }}%</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Charts Section -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <!-- Project Status Distribution -->
      <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">프로젝트 상태 분포</h3>
        <div class="h-64 flex items-center justify-center">
          <div class="text-center">
            <div class="grid grid-cols-2 gap-4">
              <div v-for="status in statusDistribution" :key="status.name" class="text-center">
                <div class="w-16 h-16 mx-auto rounded-full flex items-center justify-center text-white font-bold text-lg mb-2" :style="{ backgroundColor: status.color }">
                  {{ status.count }}
                </div>
                <p class="text-sm text-gray-600 dark:text-gray-400">{{ status.name }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Department Performance -->
      <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">부서별 성과</h3>
        <div class="space-y-4">
          <div v-for="dept in departmentPerformance" :key="dept.name" class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <div class="w-3 h-3 rounded-full" :style="{ backgroundColor: dept.color }"></div>
              <span class="text-sm font-medium text-gray-900 dark:text-white">{{ dept.name }}</span>
            </div>
            <div class="flex items-center space-x-4">
              <span class="text-sm text-gray-600 dark:text-gray-400">{{ dept.projects }}개</span>
              <div class="w-24 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                <div class="h-2 rounded-full" :style="{ width: dept.percentage + '%', backgroundColor: dept.color }"></div>
              </div>
              <span class="text-sm font-medium text-gray-900 dark:text-white">{{ dept.percentage }}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Resource Usage Analysis -->
    <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-8">
      <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">리소스 사용률 분석</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- CPU Usage -->
        <div class="text-center">
          <div class="relative w-32 h-32 mx-auto mb-4">
            <svg class="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#e5e7eb"
                stroke-width="3"
              />
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#3b82f6"
                stroke-width="3"
                :stroke-dasharray="`${resourceUsage.cpu}, 100`"
              />
            </svg>
            <div class="absolute inset-0 flex items-center justify-center">
              <span class="text-xl font-bold text-gray-900 dark:text-white">{{ resourceUsage.cpu }}%</span>
            </div>
          </div>
          <h4 class="text-sm font-medium text-gray-900 dark:text-white">CPU 사용률</h4>
          <p class="text-xs text-gray-500 dark:text-gray-400">{{ resourceUsage.cpuCores }}코어 사용 중</p>
        </div>

        <!-- Memory Usage -->
        <div class="text-center">
          <div class="relative w-32 h-32 mx-auto mb-4">
            <svg class="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#e5e7eb"
                stroke-width="3"
              />
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#10b981"
                stroke-width="3"
                :stroke-dasharray="`${resourceUsage.memory}, 100`"
              />
            </svg>
            <div class="absolute inset-0 flex items-center justify-center">
              <span class="text-xl font-bold text-gray-900 dark:text-white">{{ resourceUsage.memory }}%</span>
            </div>
          </div>
          <h4 class="text-sm font-medium text-gray-900 dark:text-white">메모리 사용률</h4>
          <p class="text-xs text-gray-500 dark:text-gray-400">{{ resourceUsage.memoryGb }}GB 사용 중</p>
        </div>

        <!-- Storage Usage -->
        <div class="text-center">
          <div class="relative w-32 h-32 mx-auto mb-4">
            <svg class="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#e5e7eb"
                stroke-width="3"
              />
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#8b5cf6"
                stroke-width="3"
                :stroke-dasharray="`${resourceUsage.storage}, 100`"
              />
            </svg>
            <div class="absolute inset-0 flex items-center justify-center">
              <span class="text-xl font-bold text-gray-900 dark:text-white">{{ resourceUsage.storage }}%</span>
            </div>
          </div>
          <h4 class="text-sm font-medium text-gray-900 dark:text-white">스토리지 사용률</h4>
          <p class="text-xs text-gray-500 dark:text-gray-400">{{ resourceUsage.storageTb }}TB 사용 중</p>
        </div>
      </div>
    </div>

    <!-- Top Performing Projects -->
    <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-8">
      <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">성과 우수 프로젝트</h3>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead class="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">프로젝트</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">부서</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">진행률</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">예산 효율성</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">성과 점수</th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="project in topProjects" :key="project.id">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="h-8 w-8 rounded-lg flex items-center justify-center text-white font-bold text-sm" :style="{ backgroundColor: project.color }">
                    {{ project.name.substring(0, 2).toUpperCase() }}
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900 dark:text-white">{{ project.name }}</div>
                    <div class="text-sm text-gray-500 dark:text-gray-400">{{ project.code }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{{ project.department }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="w-16 bg-gray-200 dark:bg-gray-600 rounded-full h-2 mr-2">
                    <div class="bg-green-600 h-2 rounded-full" :style="{ width: project.progress + '%' }"></div>
                  </div>
                  <span class="text-sm text-gray-900 dark:text-white">{{ project.progress }}%</span>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full" :class="getBudgetEfficiencyClass(project.budgetEfficiency)">
                  {{ project.budgetEfficiency }}%
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <span class="text-sm font-medium text-gray-900 dark:text-white mr-2">{{ project.score }}/100</span>
                  <div class="flex">
                    <svg v-for="i in 5" :key="i" class="w-4 h-4" :class="i <= Math.floor(project.score / 20) ? 'text-yellow-400' : 'text-gray-300'" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Budget Analysis -->
    <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
      <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">예산 분석</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Budget vs Actual -->
        <div>
          <h4 class="text-md font-medium text-gray-900 dark:text-white mb-3">예산 대비 실제 지출</h4>
          <div class="space-y-3">
            <div v-for="budget in budgetAnalysis" :key="budget.department" class="flex items-center justify-between">
              <span class="text-sm font-medium text-gray-900 dark:text-white">{{ budget.department }}</span>
              <div class="flex items-center space-x-2">
                <span class="text-sm text-gray-600 dark:text-gray-400">₩{{ budget.actual.toLocaleString() }}</span>
                <span class="text-sm text-gray-400 dark:text-gray-500">/</span>
                <span class="text-sm text-gray-600 dark:text-gray-400">₩{{ budget.budget.toLocaleString() }}</span>
                <span class="text-sm font-medium" :class="budget.variance >= 0 ? 'text-green-600' : 'text-red-600'">
                  {{ budget.variance >= 0 ? '+' : '' }}{{ budget.variance }}%
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Cost per Project -->
        <div>
          <h4 class="text-md font-medium text-gray-900 dark:text-white mb-3">프로젝트당 평균 비용</h4>
          <div class="space-y-3">
            <div v-for="cost in costPerProject" :key="cost.type" class="flex items-center justify-between">
              <span class="text-sm font-medium text-gray-900 dark:text-white">{{ cost.type }}</span>
              <span class="text-sm text-gray-600 dark:text-gray-400">₩{{ cost.amount.toLocaleString() }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Page title
useHead({
  title: '프로젝트 분석 - AXMP'
})

// Reactive data
const selectedPeriod = ref('30d')
const selectedDepartment = ref('')
const selectedStatus = ref('')

const analytics = ref({
  totalProjects: 24,
  completedProjects: 18,
  totalBudget: 125000000,
  successRate: 87
})

const statusDistribution = ref([
  { name: '활성', count: 12, color: '#10b981' },
  { name: '완료', count: 18, color: '#3b82f6' },
  { name: '보류', count: 3, color: '#f59e0b' },
  { name: '취소', count: 2, color: '#ef4444' }
])

const departmentPerformance = ref([
  { name: 'AI Research', projects: 8, percentage: 85, color: '#3b82f6' },
  { name: 'Data Science', projects: 6, percentage: 92, color: '#10b981' },
  { name: 'Engineering', projects: 7, percentage: 78, color: '#f59e0b' },
  { name: 'Product', projects: 3, percentage: 95, color: '#8b5cf6' }
])

const resourceUsage = ref({
  cpu: 73,
  cpuCores: 186,
  memory: 68,
  memoryGb: 512,
  storage: 45,
  storageTb: 12.5
})

const topProjects = ref([
  {
    id: 1,
    name: 'AI 모델 최적화',
    code: 'AI-OPT-001',
    department: 'AI Research',
    progress: 95,
    budgetEfficiency: 102,
    score: 94,
    color: '#3b82f6'
  },
  {
    id: 2,
    name: '데이터 파이프라인',
    code: 'DATA-PIPE-002',
    department: 'Data Science',
    progress: 88,
    budgetEfficiency: 98,
    score: 91,
    color: '#10b981'
  },
  {
    id: 3,
    name: '모바일 앱 개발',
    code: 'MOBILE-APP-003',
    department: 'Engineering',
    progress: 76,
    budgetEfficiency: 95,
    score: 87,
    color: '#f59e0b'
  },
  {
    id: 4,
    name: 'UX 리서치',
    code: 'UX-RES-004',
    department: 'Product',
    progress: 100,
    budgetEfficiency: 105,
    score: 96,
    color: '#8b5cf6'
  }
])

const budgetAnalysis = ref([
  { department: 'AI Research', budget: 50000000, actual: 48500000, variance: -3 },
  { department: 'Data Science', budget: 35000000, actual: 36200000, variance: 3.4 },
  { department: 'Engineering', budget: 25000000, actual: 23800000, variance: -4.8 },
  { department: 'Product', budget: 15000000, actual: 14900000, variance: -0.7 }
])

const costPerProject = ref([
  { type: 'AI/ML 프로젝트', amount: 8500000 },
  { type: '웹 개발 프로젝트', amount: 4200000 },
  { type: '모바일 앱 프로젝트', amount: 6800000 },
  { type: '데이터 분석 프로젝트', amount: 3900000 }
])

// Methods
const applyFilters = () => {
  console.log('Applying filters:', {
    period: selectedPeriod.value,
    department: selectedDepartment.value,
    status: selectedStatus.value
  })
  // TODO: Apply filters and refresh data
}

const getBudgetEfficiencyClass = (efficiency: number) => {
  if (efficiency >= 100) return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
  if (efficiency >= 90) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
  return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
}
</script> 