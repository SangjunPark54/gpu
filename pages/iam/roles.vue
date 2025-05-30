<template>
  <div class="p-6">
    <!-- Page Header -->
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">역할 관리</h1>
      <p class="text-gray-600 dark:text-gray-400 mt-2">시스템 역할과 권한을 정의하고 관리합니다.</p>
    </div>

    <!-- Roles Overview -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div class="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                <svg class="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">전체 역할</dt>
                <dd class="text-lg font-medium text-gray-900 dark:text-white">{{ stats.totalRoles }}</dd>
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
                <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">활성 역할</dt>
                <dd class="text-lg font-medium text-gray-900 dark:text-white">{{ stats.activeRoles }}</dd>
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
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
                </svg>
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">할당된 사용자</dt>
                <dd class="text-lg font-medium text-gray-900 dark:text-white">{{ stats.assignedUsers }}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center">
                <svg class="w-5 h-5 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"></path>
                </svg>
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">권한 수</dt>
                <dd class="text-lg font-medium text-gray-900 dark:text-white">{{ stats.totalPermissions }}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Roles Management -->
    <div class="bg-white dark:bg-gray-800 shadow rounded-lg">
      <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white">역할 목록</h3>
          <button class="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            새 역할 생성
          </button>
        </div>
      </div>

      <!-- Search and Filter -->
      <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <div class="flex items-center space-x-4">
          <div class="flex-1">
            <input
              type="text"
              placeholder="역할 이름으로 검색..."
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <select class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white">
            <option value="">모든 유형</option>
            <option value="system">시스템</option>
            <option value="custom">사용자 정의</option>
          </select>
        </div>
      </div>

      <!-- Roles Table -->
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead class="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                역할 이름
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                설명
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                권한
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                할당된 사용자
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                유형
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                생성일
              </th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                작업
              </th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="role in roles" :key="role.id" class="hover:bg-gray-50 dark:hover:bg-gray-700">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="w-8 h-8 rounded-full flex items-center justify-center" :class="getRoleIconClass(role.type)">
                    <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M9.243 3.03a1 1 0 01.727 1.213L9.53 6h2.94l.56-2.243a1 1 0 111.94.486L14.53 6H17a1 1 0 110 2h-2.97l-1 4H15a1 1 0 110 2h-2.47l-.56 2.242a1 1 0 11-1.94-.485L10.47 14H7.53l-.56 2.242a1 1 0 11-1.94-.485L5.47 14H3a1 1 0 110-2h2.97l1-4H5a1 1 0 110-2h2.47l.56-2.243a1 1 0 011.213-.727zM9.03 8l-1 4h2.94l1-4H9.03z" clip-rule="evenodd"></path>
                    </svg>
                  </div>
                  <div class="ml-3">
                    <div class="text-sm font-medium text-gray-900 dark:text-white">{{ role.name }}</div>
                    <div class="text-sm text-gray-500 dark:text-gray-400">{{ role.code }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="text-sm text-gray-900 dark:text-white">{{ role.description }}</div>
              </td>
              <td class="px-6 py-4">
                <div class="flex flex-wrap gap-1">
                  <span v-for="permission in role.permissions.slice(0, 3)" :key="permission" class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                    {{ permission }}
                  </span>
                  <span v-if="role.permissions.length > 3" class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                    +{{ role.permissions.length - 3 }}
                  </span>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900 dark:text-white">{{ role.assignedUsers }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full" :class="getTypeClass(role.type)">
                  {{ role.type === 'system' ? '시스템' : '사용자 정의' }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {{ role.createdAt }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="flex items-center justify-end space-x-2">
                  <button class="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400">편집</button>
                  <button v-if="role.type === 'custom'" class="text-red-600 hover:text-red-900 dark:text-red-400">삭제</button>
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
            총 {{ roles.length }}개 역할 중 1-{{ roles.length }}개 표시
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
  title: '역할 관리 - AXMP'
})

// Reactive data
const stats = ref({
  totalRoles: 18,
  activeRoles: 16,
  assignedUsers: 142,
  totalPermissions: 64
})

const roles = ref([
  {
    id: 1,
    name: 'Super Administrator',
    code: 'SUPER_ADMIN',
    description: '시스템 전체에 대한 모든 권한을 가진 최고 관리자',
    permissions: ['*'],
    assignedUsers: 2,
    type: 'system',
    createdAt: '2023-01-01'
  },
  {
    id: 2,
    name: 'System Administrator',
    code: 'SYS_ADMIN',
    description: '시스템 관리 및 설정 권한',
    permissions: ['system.read', 'system.write', 'user.manage', 'role.manage'],
    assignedUsers: 5,
    type: 'system',
    createdAt: '2023-01-01'
  },
  {
    id: 3,
    name: 'Project Manager',
    code: 'PROJECT_MANAGER',
    description: '프로젝트 관리 및 팀 리드 권한',
    permissions: ['project.read', 'project.write', 'team.manage', 'resource.allocate'],
    assignedUsers: 12,
    type: 'custom',
    createdAt: '2023-02-15'
  },
  {
    id: 4,
    name: 'Developer',
    code: 'DEVELOPER',
    description: '개발 환경 접근 및 코드 관리 권한',
    permissions: ['code.read', 'code.write', 'deploy.staging', 'debug.access'],
    assignedUsers: 45,
    type: 'custom',
    createdAt: '2023-02-20'
  },
  {
    id: 5,
    name: 'DevOps Engineer',
    code: 'DEVOPS',
    description: 'CI/CD 파이프라인 및 인프라 관리 권한',
    permissions: ['infrastructure.read', 'infrastructure.write', 'deploy.production', 'monitoring.access'],
    assignedUsers: 8,
    type: 'custom',
    createdAt: '2023-03-01'
  },
  {
    id: 6,
    name: 'Security Analyst',
    code: 'SECURITY',
    description: '보안 모니터링 및 취약점 관리 권한',
    permissions: ['security.read', 'security.write', 'audit.access', 'compliance.manage'],
    assignedUsers: 6,
    type: 'custom',
    createdAt: '2023-03-10'
  },
  {
    id: 7,
    name: 'QA Engineer',
    code: 'QA',
    description: '품질 보증 및 테스트 환경 접근 권한',
    permissions: ['test.read', 'test.write', 'qa.environment', 'bug.report'],
    assignedUsers: 15,
    type: 'custom',
    createdAt: '2023-03-15'
  },
  {
    id: 8,
    name: 'Viewer',
    code: 'VIEWER',
    description: '읽기 전용 접근 권한',
    permissions: ['read.only'],
    assignedUsers: 49,
    type: 'system',
    createdAt: '2023-01-01'
  }
])

// Methods
const getRoleIconClass = (type: string) => {
  return type === 'system' 
    ? 'bg-purple-500'
    : 'bg-blue-500'
}

const getTypeClass = (type: string) => {
  return type === 'system'
    ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
    : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
}
</script> 