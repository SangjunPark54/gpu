<template>
  <div class="p-6">
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">CI/CD Pipelines</h1>
      <p class="text-gray-600 dark:text-gray-400 mt-2">ZCP 플랫폼의 CI/CD 파이프라인을 관리합니다.</p>
    </div>

    <!-- Pipelines Overview -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div class="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <svg class="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">총 파이프라인</dt>
                <dd class="text-lg font-medium text-gray-900 dark:text-white">{{ stats.totalPipelines }}</dd>
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
                <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">성공률</dt>
                <dd class="text-lg font-medium text-gray-900 dark:text-white">{{ stats.successRate }}%</dd>
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
                <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">평균 실행 시간</dt>
                <dd class="text-lg font-medium text-gray-900 dark:text-white">{{ stats.avgDuration }}분</dd>
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
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                </svg>
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">이번 주 배포</dt>
                <dd class="text-lg font-medium text-gray-900 dark:text-white">{{ stats.weeklyDeploys }}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Pipelines Table -->
    <div class="bg-white dark:bg-gray-800 shadow rounded-lg">
      <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white">파이프라인 목록</h3>
          <button class="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700">
            새 파이프라인 생성
          </button>
        </div>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead class="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">파이프라인 이름</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">프로젝트</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">상태</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">마지막 실행</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">실행 시간</th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">작업</th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="pipeline in pipelines" :key="pipeline.id" class="hover:bg-gray-50 dark:hover:bg-gray-700">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="w-8 h-8 rounded-full flex items-center justify-center" :class="getTypeIconClass(pipeline.type)">
                    <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clip-rule="evenodd"></path>
                    </svg>
                  </div>
                  <div class="ml-3">
                    <div class="text-sm font-medium text-gray-900 dark:text-white">{{ pipeline.name }}</div>
                    <div class="text-sm text-gray-500 dark:text-gray-400">{{ pipeline.branch }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{{ pipeline.project }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full" :class="getStatusClass(pipeline.status)">
                  {{ pipeline.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{{ pipeline.lastRun }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{{ pipeline.duration }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="flex items-center justify-end space-x-2">
                  <button class="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400">실행</button>
                  <button class="text-blue-600 hover:text-blue-900 dark:text-blue-400">편집</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

useHead({
  title: 'CI/CD Pipelines - AXMP'
})

const stats = ref({
  totalPipelines: 18,
  successRate: 94,
  avgDuration: 8.5,
  weeklyDeploys: 42
})

const pipelines = ref([
  { id: 1, name: 'frontend-build', project: 'frontend-app', type: 'build', branch: 'main', status: 'Success', lastRun: '2시간 전', duration: '5분 32초' },
  { id: 2, name: 'api-deploy', project: 'api-service', type: 'deploy', branch: 'main', status: 'Running', lastRun: '진행 중', duration: '3분 15초' },
  { id: 3, name: 'ml-training', project: 'ml-training', type: 'test', branch: 'develop', status: 'Failed', lastRun: '1시간 전', duration: '12분 45초' },
  { id: 4, name: 'data-pipeline', project: 'data-pipeline', type: 'build', branch: 'main', status: 'Success', lastRun: '3시간 전', duration: '7분 20초' }
])

const getTypeIconClass = (type: string) => {
  const classes = {
    'build': 'bg-blue-500',
    'deploy': 'bg-green-500',
    'test': 'bg-purple-500'
  }
  return classes[type as keyof typeof classes] || 'bg-gray-500'
}

const getStatusClass = (status: string) => {
  const classes = {
    'Success': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    'Running': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    'Failed': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    'Pending': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
  }
  return classes[status as keyof typeof classes] || 'bg-gray-100 text-gray-800'
}
</script> 