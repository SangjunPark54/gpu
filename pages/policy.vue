<template>
  <div class="p-6">
    <!-- Page Header -->
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Policy</h1>
      <p class="text-gray-600 dark:text-gray-400 mt-2">조직의 정책과 규정을 관리하고 준수 상태를 모니터링합니다.</p>
    </div>

    <!-- Policy Overview -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div class="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <svg class="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                </svg>
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">활성 정책</dt>
                <dd class="text-lg font-medium text-gray-900 dark:text-white">{{ stats.activePolicies }}</dd>
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
                <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">준수율</dt>
                <dd class="text-lg font-medium text-gray-900 dark:text-white">{{ stats.complianceRate }}%</dd>
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
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                </svg>
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">위반 사항</dt>
                <dd class="text-lg font-medium text-gray-900 dark:text-white">{{ stats.violations }}</dd>
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
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">검토 대기</dt>
                <dd class="text-lg font-medium text-gray-900 dark:text-white">{{ stats.pendingReviews }}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Policy Categories -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <!-- Policy List -->
      <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white">정책 목록</h3>
          <button class="px-3 py-1 text-sm font-medium text-indigo-600 border border-indigo-600 rounded hover:bg-indigo-50 dark:hover:bg-indigo-900">
            새 정책 추가
          </button>
        </div>
        <div class="space-y-4">
          <div v-for="policy in policies" :key="policy.id" class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div class="flex items-center space-x-3">
              <div class="w-3 h-3 rounded-full" :class="getPolicyStatusColor(policy.status)"></div>
              <div>
                <p class="text-sm font-medium text-gray-900 dark:text-white">{{ policy.name }}</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">{{ policy.category }} • v{{ policy.version }}</p>
              </div>
            </div>
            <div class="flex items-center space-x-2">
              <span class="text-xs text-gray-500 dark:text-gray-400">{{ policy.lastUpdated }}</span>
              <button class="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 text-sm">
                편집
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Compliance Status -->
      <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">부서별 준수 현황</h3>
        <div class="space-y-4">
          <div v-for="dept in departmentCompliance" :key="dept.name" class="space-y-2">
            <div class="flex justify-between text-sm">
              <span class="font-medium text-gray-900 dark:text-white">{{ dept.name }}</span>
              <span class="text-gray-600 dark:text-gray-400">{{ dept.compliance }}%</span>
            </div>
            <div class="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
              <div 
                class="h-2 rounded-full" 
                :class="dept.compliance >= 90 ? 'bg-green-600' : dept.compliance >= 70 ? 'bg-yellow-600' : 'bg-red-600'"
                :style="{ width: dept.compliance + '%' }"
              ></div>
            </div>
            <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>{{ dept.compliant }}/{{ dept.total }} 정책 준수</span>
              <span>{{ dept.violations }} 위반</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Violations and Governance -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <!-- Recent Violations -->
      <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">최근 위반 사항</h3>
        <div class="space-y-4">
          <div v-for="violation in recentViolations" :key="violation.id" class="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div class="flex-shrink-0">
              <div class="w-6 h-6 rounded-full flex items-center justify-center" :class="getSeverityColor(violation.severity)">
                <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
                </svg>
              </div>
            </div>
            <div class="flex-1">
              <p class="text-sm font-medium text-gray-900 dark:text-white">{{ violation.policy }}</p>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">{{ violation.description }}</p>
              <div class="flex items-center space-x-4 mt-2">
                <span class="text-xs text-gray-400 dark:text-gray-500">{{ violation.department }}</span>
                <span class="text-xs text-gray-400 dark:text-gray-500">{{ violation.time }}</span>
              </div>
            </div>
            <button class="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 text-sm">
              처리
            </button>
          </div>
        </div>
      </div>

      <!-- Governance Framework -->
      <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">거버넌스 프레임워크</h3>
        <div class="space-y-4">
          <div v-for="framework in governanceFrameworks" :key="framework.name" class="border border-gray-200 dark:border-gray-700 rounded-lg p-3">
            <div class="flex items-center justify-between mb-2">
              <h4 class="text-sm font-medium text-gray-900 dark:text-white">{{ framework.name }}</h4>
              <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full" :class="getFrameworkStatusClass(framework.status)">
                {{ framework.status }}
              </span>
            </div>
            <p class="text-xs text-gray-500 dark:text-gray-400 mb-2">{{ framework.description }}</p>
            <div class="flex justify-between text-xs">
              <span class="text-gray-500 dark:text-gray-400">적용 정책: {{ framework.policies }}</span>
              <span class="text-gray-500 dark:text-gray-400">마지막 업데이트: {{ framework.lastUpdate }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Policy Analytics -->
    <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
      <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">정책 분석</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Policy Effectiveness -->
        <div>
          <h4 class="text-md font-medium text-gray-900 dark:text-white mb-3">정책 효과성</h4>
          <div class="space-y-2">
            <div v-for="metric in policyEffectiveness" :key="metric.category" class="flex items-center justify-between">
              <span class="text-sm text-gray-600 dark:text-gray-400">{{ metric.category }}</span>
              <div class="flex items-center space-x-2">
                <div class="w-24 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                  <div class="bg-blue-600 h-2 rounded-full" :style="{ width: metric.effectiveness + '%' }"></div>
                </div>
                <span class="text-sm font-medium text-gray-900 dark:text-white">{{ metric.effectiveness }}%</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Violation Trends -->
        <div>
          <h4 class="text-md font-medium text-gray-900 dark:text-white mb-3">위반 추이 (월별)</h4>
          <div class="space-y-2">
            <div v-for="month in violationTrends" :key="month.month" class="flex items-center justify-between">
              <span class="text-sm text-gray-600 dark:text-gray-400">{{ month.month }}</span>
              <div class="flex items-center space-x-2">
                <div class="w-24 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                  <div class="bg-red-600 h-2 rounded-full" :style="{ width: (month.violations / 20) * 100 + '%' }"></div>
                </div>
                <span class="text-sm font-medium text-gray-900 dark:text-white">{{ month.violations }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Training Completion -->
        <div>
          <h4 class="text-md font-medium text-gray-900 dark:text-white mb-3">교육 이수율</h4>
          <div class="space-y-2">
            <div v-for="training in trainingCompletion" :key="training.course" class="flex items-center justify-between">
              <span class="text-sm text-gray-600 dark:text-gray-400">{{ training.course }}</span>
              <div class="flex items-center space-x-2">
                <div class="w-24 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                  <div class="bg-green-600 h-2 rounded-full" :style="{ width: training.completion + '%' }"></div>
                </div>
                <span class="text-sm font-medium text-gray-900 dark:text-white">{{ training.completion }}%</span>
              </div>
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
  title: 'Policy - AXMP'
})

// Reactive data
const stats = ref({
  activePolicies: 45,
  complianceRate: 92,
  violations: 8,
  pendingReviews: 12
})

const policies = ref([
  {
    id: 1,
    name: 'Data Protection Policy',
    category: 'Security',
    version: '2.1',
    status: 'active',
    lastUpdated: '2023-11-15'
  },
  {
    id: 2,
    name: 'Access Control Policy',
    category: 'Security',
    version: '1.8',
    status: 'active',
    lastUpdated: '2023-11-10'
  },
  {
    id: 3,
    name: 'Code Review Guidelines',
    category: 'Development',
    version: '3.0',
    status: 'draft',
    lastUpdated: '2023-11-20'
  },
  {
    id: 4,
    name: 'Incident Response Plan',
    category: 'Operations',
    version: '1.5',
    status: 'active',
    lastUpdated: '2023-10-28'
  }
])

const departmentCompliance = ref([
  {
    name: 'Engineering',
    compliance: 95,
    compliant: 38,
    total: 40,
    violations: 2
  },
  {
    name: 'Operations',
    compliance: 88,
    compliant: 35,
    total: 40,
    violations: 5
  },
  {
    name: 'Security',
    compliance: 98,
    compliant: 39,
    total: 40,
    violations: 1
  },
  {
    name: 'HR',
    compliance: 85,
    compliant: 34,
    total: 40,
    violations: 6
  }
])

const recentViolations = ref([
  {
    id: 1,
    policy: 'Password Policy',
    description: '약한 패스워드 사용으로 인한 정책 위반',
    severity: 'medium',
    department: 'Engineering',
    time: '2시간 전'
  },
  {
    id: 2,
    policy: 'Data Access Policy',
    description: '권한 없는 데이터 접근 시도',
    severity: 'high',
    department: 'Operations',
    time: '5시간 전'
  },
  {
    id: 3,
    policy: 'Code Review Policy',
    description: '코드 리뷰 없이 프로덕션 배포',
    severity: 'critical',
    department: 'Engineering',
    time: '1일 전'
  }
])

const governanceFrameworks = ref([
  {
    name: 'COBIT 2019',
    description: 'IT 거버넌스 및 관리 프레임워크',
    status: 'Implemented',
    policies: 25,
    lastUpdate: '2023-09-15'
  },
  {
    name: 'ITIL 4',
    description: 'IT 서비스 관리 모범 사례',
    status: 'In Progress',
    policies: 18,
    lastUpdate: '2023-11-01'
  },
  {
    name: 'ISO 27001',
    description: '정보보안 관리 시스템',
    status: 'Implemented',
    policies: 32,
    lastUpdate: '2023-10-20'
  }
])

const policyEffectiveness = ref([
  { category: 'Security', effectiveness: 94 },
  { category: 'Operations', effectiveness: 87 },
  { category: 'Development', effectiveness: 91 },
  { category: 'HR', effectiveness: 89 }
])

const violationTrends = ref([
  { month: '8월', violations: 12 },
  { month: '9월', violations: 8 },
  { month: '10월', violations: 15 },
  { month: '11월', violations: 8 }
])

const trainingCompletion = ref([
  { course: 'Security Awareness', completion: 96 },
  { course: 'Data Protection', completion: 89 },
  { course: 'Code Quality', completion: 92 },
  { course: 'Incident Response', completion: 85 }
])

// Methods
const getPolicyStatusColor = (status: string) => {
  const colors = {
    'active': 'bg-green-500',
    'draft': 'bg-yellow-500',
    'deprecated': 'bg-red-500',
    'review': 'bg-blue-500'
  }
  return colors[status as keyof typeof colors] || 'bg-gray-500'
}

const getSeverityColor = (severity: string) => {
  const colors = {
    'critical': 'bg-red-600',
    'high': 'bg-orange-500',
    'medium': 'bg-yellow-500',
    'low': 'bg-blue-500'
  }
  return colors[severity as keyof typeof colors] || 'bg-gray-500'
}

const getFrameworkStatusClass = (status: string) => {
  const classes = {
    'Implemented': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    'In Progress': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    'Planned': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
  }
  return classes[status as keyof typeof classes] || 'bg-gray-100 text-gray-800'
}
</script> 