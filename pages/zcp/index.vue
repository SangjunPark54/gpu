<template>
  <div class="p-6">
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">ZCP Dashboard</h1>
      <p class="text-gray-600 dark:text-gray-400 mt-2">ZCP 플랫폼의 전체 현황을 모니터링합니다.</p>
    </div>

    <!-- ZCP Overview -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <!-- 활성 클러스터 카드 -->
      <NuxtLink 
        to="/zcp/clusters"
        class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border-l-4 border-blue-500 cursor-pointer hover:shadow-md transition-shadow duration-200"
      >
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14-7H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2z"></path>
              </svg>
            </div>
          </div>
          <div class="ml-4 flex-1">
            <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">활성 클러스터</h3>
            <p class="text-3xl font-bold text-gray-900 dark:text-white">{{ stats.activeClusters }}</p>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">멀티 클러스터</p>
          </div>
          <div class="ml-2">
            <svg class="w-5 h-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </div>
        </div>
      </NuxtLink>

      <!-- 실행 중인 프로젝트 카드 -->
      <NuxtLink 
        to="/zcp/projects"
        class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border-l-4 border-green-500 cursor-pointer hover:shadow-md transition-shadow duration-200"
      >
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
              </svg>
            </div>
          </div>
          <div class="ml-4 flex-1">
            <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">실행 중인 프로젝트</h3>
            <p class="text-3xl font-bold text-gray-900 dark:text-white">{{ stats.runningProjects }}</p>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">활성 프로젝트</p>
          </div>
          <div class="ml-2">
            <svg class="w-5 h-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </div>
        </div>
      </NuxtLink>

      <!-- 활성 파이프라인 카드 -->
      <NuxtLink 
        to="/zcp/pipelines"
        class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border-l-4 border-purple-500 cursor-pointer hover:shadow-md transition-shadow duration-200"
      >
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
          </div>
          <div class="ml-4 flex-1">
            <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">활성 파이프라인</h3>
            <p class="text-3xl font-bold text-gray-900 dark:text-white">{{ stats.activePipelines }}</p>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">CI/CD 파이프라인</p>
          </div>
          <div class="ml-2">
            <svg class="w-5 h-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </div>
        </div>
      </NuxtLink>

      <!-- 배포된 애플리케이션 카드 -->
      <NuxtLink 
        to="/applications"
        class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border-l-4 border-orange-500 cursor-pointer hover:shadow-md transition-shadow duration-200"
      >
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14-7H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2z"></path>
              </svg>
            </div>
          </div>
          <div class="ml-4 flex-1">
            <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">배포된 애플리케이션</h3>
            <p class="text-3xl font-bold text-gray-900 dark:text-white">{{ stats.deployedApps }}</p>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">운영 중인 앱</p>
          </div>
          <div class="ml-2">
            <svg class="w-5 h-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </div>
        </div>
      </NuxtLink>
    </div>

    <!-- Recent Activities -->
    <div class="bg-white dark:bg-gray-800 shadow rounded-lg mb-8">
      <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white">최근 활동</h3>
      </div>
      <div class="p-6">
        <div class="space-y-4">
          <div v-for="activity in recentActivities" :key="activity.id" class="flex items-center space-x-3">
            <div class="w-2 h-2 rounded-full" :class="getActivityColor(activity.type)"></div>
            <div class="flex-1">
              <p class="text-sm text-gray-900 dark:text-white">{{ activity.message }}</p>
              <p class="text-xs text-gray-500 dark:text-gray-400">{{ activity.timestamp }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="bg-white dark:bg-gray-800 shadow rounded-lg">
      <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white">빠른 작업</h3>
      </div>
      <div class="p-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <NuxtLink to="/zcp/clusters" class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <svg class="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14-7H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2z"></path>
                </svg>
              </div>
              <div>
                <h4 class="text-sm font-medium text-gray-900 dark:text-white">클러스터 관리</h4>
                <p class="text-xs text-gray-500 dark:text-gray-400">멀티 클러스터 관리</p>
              </div>
            </div>
          </NuxtLink>

          <NuxtLink to="/zcp/projects" class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                <svg class="w-4 h-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                </svg>
              </div>
              <div>
                <h4 class="text-sm font-medium text-gray-900 dark:text-white">프로젝트 생성</h4>
                <p class="text-xs text-gray-500 dark:text-gray-400">새 프로젝트 시작</p>
              </div>
            </div>
          </NuxtLink>

          <NuxtLink to="/zcp/pipelines" class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                <svg class="w-4 h-4 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <div>
                <h4 class="text-sm font-medium text-gray-900 dark:text-white">파이프라인 설정</h4>
                <p class="text-xs text-gray-500 dark:text-gray-400">CI/CD 파이프라인</p>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

useHead({
  title: 'ZCP Dashboard - AXMP'
})

const stats = ref({
  activeClusters: 7,
  runningProjects: 24,
  activePipelines: 18,
  deployedApps: 156
})

const recentActivities = ref([
  { id: 1, type: 'success', message: 'prod-cluster-01에서 새로운 애플리케이션이 배포되었습니다.', timestamp: '5분 전' },
  { id: 2, type: 'info', message: 'staging-cluster에서 파이프라인이 시작되었습니다.', timestamp: '12분 전' },
  { id: 3, type: 'warning', message: 'dev-cluster의 리소스 사용률이 80%를 초과했습니다.', timestamp: '25분 전' },
  { id: 4, type: 'success', message: '새로운 프로젝트 "ai-model-training"이 생성되었습니다.', timestamp: '1시간 전' },
  { id: 5, type: 'info', message: 'test-cluster에서 스케일링이 완료되었습니다.', timestamp: '2시간 전' }
])

const getActivityColor = (type: string) => {
  const colors = {
    'success': 'bg-green-500',
    'info': 'bg-blue-500',
    'warning': 'bg-yellow-500',
    'error': 'bg-red-500'
  }
  return colors[type as keyof typeof colors] || 'bg-gray-500'
}
</script> 