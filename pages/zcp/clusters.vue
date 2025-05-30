<template>
  <div class="p-6">
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">클러스터 관리</h1>
      <p class="text-gray-600 dark:text-gray-400 mt-2">ZCP 멀티 클러스터를 관리합니다.</p>
    </div>

    <!-- Clusters Overview -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div class="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <svg class="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14-7H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2z"></path>
                </svg>
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">총 클러스터</dt>
                <dd class="text-lg font-medium text-gray-900 dark:text-white">{{ stats.totalClusters }}</dd>
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
                <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">활성 클러스터</dt>
                <dd class="text-lg font-medium text-gray-900 dark:text-white">{{ stats.activeClusters }}</dd>
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
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                </svg>
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">총 노드</dt>
                <dd class="text-lg font-medium text-gray-900 dark:text-white">{{ stats.totalNodes }}</dd>
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
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">CPU 사용률</dt>
                <dd class="text-lg font-medium text-gray-900 dark:text-white">{{ stats.cpuUsage }}%</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Clusters Table -->
    <div class="bg-white dark:bg-gray-800 shadow rounded-lg">
      <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white">클러스터 목록</h3>
          <button class="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700">
            새 클러스터 추가
          </button>
        </div>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead class="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">클러스터 이름</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">환경</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">노드 수</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">상태</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Kubernetes 버전</th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">작업</th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="cluster in clusters" :key="cluster.id" class="hover:bg-gray-50 dark:hover:bg-gray-700">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="w-8 h-8 rounded-full flex items-center justify-center" :class="getEnvironmentIconClass(cluster.environment)">
                    <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clip-rule="evenodd"></path>
                    </svg>
                  </div>
                  <div class="ml-3">
                    <div class="text-sm font-medium text-gray-900 dark:text-white">{{ cluster.name }}</div>
                    <div class="text-sm text-gray-500 dark:text-gray-400">{{ cluster.region }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full" :class="getEnvironmentClass(cluster.environment)">
                  {{ cluster.environment }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{{ cluster.nodes }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full" :class="getStatusClass(cluster.status)">
                  {{ cluster.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{{ cluster.k8sVersion }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="flex items-center justify-end space-x-2">
                  <button class="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400">관리</button>
                  <button class="text-blue-600 hover:text-blue-900 dark:text-blue-400">모니터링</button>
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
  title: '클러스터 관리 - AXMP'
})

const stats = ref({
  totalClusters: 7,
  activeClusters: 6,
  totalNodes: 42,
  cpuUsage: 68
})

const clusters = ref([
  { id: 1, name: 'prod-cluster-01', environment: 'Production', region: 'ap-northeast-2', nodes: 12, status: 'Running', k8sVersion: 'v1.28.3' },
  { id: 2, name: 'staging-cluster', environment: 'Staging', region: 'ap-northeast-2', nodes: 6, status: 'Running', k8sVersion: 'v1.28.3' },
  { id: 3, name: 'dev-cluster', environment: 'Development', region: 'ap-northeast-2', nodes: 8, status: 'Running', k8sVersion: 'v1.27.8' },
  { id: 4, name: 'test-cluster', environment: 'Testing', region: 'us-west-2', nodes: 4, status: 'Maintenance', k8sVersion: 'v1.28.3' }
])

const getEnvironmentIconClass = (environment: string) => {
  const classes = {
    'Production': 'bg-red-500',
    'Staging': 'bg-yellow-500',
    'Development': 'bg-blue-500',
    'Testing': 'bg-green-500'
  }
  return classes[environment as keyof typeof classes] || 'bg-gray-500'
}

const getEnvironmentClass = (environment: string) => {
  const classes = {
    'Production': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    'Staging': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    'Development': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    'Testing': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
  }
  return classes[environment as keyof typeof classes] || 'bg-gray-100 text-gray-800'
}

const getStatusClass = (status: string) => {
  const classes = {
    'Running': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    'Maintenance': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    'Error': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
  }
  return classes[status as keyof typeof classes] || 'bg-gray-100 text-gray-800'
}
</script> 