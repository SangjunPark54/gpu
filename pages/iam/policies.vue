<template>
  <div class="p-6">
    <!-- Page Header -->
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">정책 관리</h1>
      <p class="text-gray-600 dark:text-gray-400 mt-2">시스템 접근 정책과 권한을 정의하고 관리합니다.</p>
    </div>

    <!-- Policies Overview -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div class="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center">
                <svg class="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2H9z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 9h6m-6 4h6m-6 4h6"></path>
                </svg>
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">전체 정책</dt>
                <dd class="text-lg font-medium text-gray-900 dark:text-white">{{ stats.totalPolicies }}</dd>
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
              <div class="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <svg class="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">연결된 사용자</dt>
                <dd class="text-lg font-medium text-gray-900 dark:text-white">{{ stats.attachedUsers }}</dd>
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
                <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">검토 필요</dt>
                <dd class="text-lg font-medium text-gray-900 dark:text-white">{{ stats.needsReview }}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Policies Management -->
    <div class="bg-white dark:bg-gray-800 shadow rounded-lg">
      <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white">정책 목록</h3>
          <button class="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            새 정책 생성
          </button>
        </div>
      </div>

      <!-- Search and Filter -->
      <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <div class="flex items-center space-x-4">
          <div class="flex-1">
            <input
              type="text"
              placeholder="정책 이름으로 검색..."
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <select class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white">
            <option value="">모든 카테고리</option>
            <option value="access">접근 제어</option>
            <option value="security">보안</option>
            <option value="resource">리소스</option>
            <option value="compliance">컴플라이언스</option>
          </select>
          <select class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white">
            <option value="">모든 상태</option>
            <option value="active">활성</option>
            <option value="inactive">비활성</option>
            <option value="draft">초안</option>
          </select>
        </div>
      </div>

      <!-- Policies Table -->
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead class="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                정책 이름
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                설명
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                카테고리
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                연결된 엔티티
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                상태
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                마지막 수정
              </th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                작업
              </th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="policy in policies" :key="policy.id" class="hover:bg-gray-50 dark:hover:bg-gray-700">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="w-8 h-8 rounded-full flex items-center justify-center" :class="getCategoryIconClass(policy.category)">
                    <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"></path>
                    </svg>
                  </div>
                  <div class="ml-3">
                    <div class="text-sm font-medium text-gray-900 dark:text-white">{{ policy.name }}</div>
                    <div class="text-sm text-gray-500 dark:text-gray-400">v{{ policy.version }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="text-sm text-gray-900 dark:text-white">{{ policy.description }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full" :class="getCategoryClass(policy.category)">
                  {{ getCategoryLabel(policy.category) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900 dark:text-white">
                  {{ policy.attachedUsers }}명 사용자
                  <span v-if="policy.attachedGroups > 0" class="text-gray-500 dark:text-gray-400">
                    , {{ policy.attachedGroups }}개 그룹
                  </span>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full" :class="getStatusClass(policy.status)">
                  {{ getStatusLabel(policy.status) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {{ policy.lastModified }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="flex items-center justify-end space-x-2">
                  <button class="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400">편집</button>
                  <button class="text-blue-600 hover:text-blue-900 dark:text-blue-400">복제</button>
                  <button class="text-red-600 hover:text-red-900 dark:text-red-400">삭제</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between">
          <div class="text-sm text-gray-700 dark:text-gray-300">
            총 {{ policies.length }}개 정책 중 1-{{ policies.length }}개 표시
          </div>
          <div class="flex items-center space-x-2">
            <button class="px-3 py-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300">
              이전
            </button>
            <button class="px-3 py-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300">
              다음
            </button>
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
  title: '정책 관리 - AXMP'
})

// Reactive data
const stats = ref({
  totalPolicies: 32,
  activePolicies: 28,
  attachedUsers: 156,
  needsReview: 4
})

const policies = ref([
  {
    id: 1,
    name: 'Admin Full Access Policy',
    description: '시스템 전체에 대한 모든 권한을 부여하는 정책',
    category: 'access',
    version: '1.0',
    attachedUsers: 5,
    attachedGroups: 1,
    status: 'active',
    lastModified: '2023-11-20'
  },
  {
    id: 2,
    name: 'Developer Access Policy',
    description: '개발 환경 및 코드 저장소 접근 권한',
    category: 'access',
    version: '2.1',
    attachedUsers: 28,
    attachedGroups: 2,
    status: 'active',
    lastModified: '2023-11-18'
  },
  {
    id: 3,
    name: 'Security Compliance Policy',
    description: '보안 규정 준수를 위한 접근 제한 정책',
    category: 'security',
    version: '1.5',
    attachedUsers: 156,
    attachedGroups: 8,
    status: 'active',
    lastModified: '2023-11-15'
  },
  {
    id: 4,
    name: 'Resource Management Policy',
    description: 'GPU 및 컴퓨팅 리소스 할당 관리 정책',
    category: 'resource',
    version: '1.2',
    attachedUsers: 45,
    attachedGroups: 3,
    status: 'active',
    lastModified: '2023-11-12'
  },
  {
    id: 5,
    name: 'Data Protection Policy',
    description: '개인정보 및 민감 데이터 보호 정책',
    category: 'compliance',
    version: '2.0',
    attachedUsers: 156,
    attachedGroups: 8,
    status: 'active',
    lastModified: '2023-11-10'
  },
  {
    id: 6,
    name: 'QA Environment Access',
    description: '품질 보증 환경 접근 권한 정책',
    category: 'access',
    version: '1.0',
    attachedUsers: 15,
    attachedGroups: 1,
    status: 'active',
    lastModified: '2023-11-08'
  },
  {
    id: 7,
    name: 'Audit Log Policy',
    description: '시스템 감사 로그 접근 및 관리 정책',
    category: 'compliance',
    version: '1.1',
    attachedUsers: 8,
    attachedGroups: 1,
    status: 'active',
    lastModified: '2023-11-05'
  },
  {
    id: 8,
    name: 'Network Security Policy',
    description: '네트워크 보안 및 방화벽 관리 정책',
    category: 'security',
    version: '1.0',
    attachedUsers: 12,
    attachedGroups: 2,
    status: 'draft',
    lastModified: '2023-11-01'
  }
])

// Methods
const getCategoryIconClass = (category: string) => {
  const classes = {
    'access': 'bg-blue-500',
    'security': 'bg-red-500',
    'resource': 'bg-green-500',
    'compliance': 'bg-purple-500'
  }
  return classes[category as keyof typeof classes] || 'bg-gray-500'
}

const getCategoryClass = (category: string) => {
  const classes = {
    'access': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    'security': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    'resource': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    'compliance': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
  }
  return classes[category as keyof typeof classes] || 'bg-gray-100 text-gray-800'
}

const getCategoryLabel = (category: string) => {
  const labels = {
    'access': '접근 제어',
    'security': '보안',
    'resource': '리소스',
    'compliance': '컴플라이언스'
  }
  return labels[category as keyof typeof labels] || category
}

const getStatusClass = (status: string) => {
  const classes = {
    'active': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    'inactive': 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
    'draft': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
  }
  return classes[status as keyof typeof classes] || 'bg-gray-100 text-gray-800'
}

const getStatusLabel = (status: string) => {
  const labels = {
    'active': '활성',
    'inactive': '비활성',
    'draft': '초안'
  }
  return labels[status as keyof typeof labels] || status
}
</script> 