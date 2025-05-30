<template>
  <div class="p-6">
    <!-- Page Header -->
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">DevOps Toolchain</h1>
      <p class="text-gray-600 dark:text-gray-400 mt-2">CI/CD 파이프라인과 DevOps 도구들을 통합 관리합니다.</p>
    </div>

    <!-- Overview Cards -->
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
                <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">활성 파이프라인</dt>
                <dd class="text-lg font-medium text-gray-900 dark:text-white">{{ stats.activePipelines }}</dd>
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
              <div class="w-8 h-8 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center">
                <svg class="w-5 h-5 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">평균 배포 시간</dt>
                <dd class="text-lg font-medium text-gray-900 dark:text-white">{{ stats.avgDeployTime }}분</dd>
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
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14-7H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2z"></path>
                </svg>
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">연결된 도구</dt>
                <dd class="text-lg font-medium text-gray-900 dark:text-white">{{ stats.connectedTools }}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Pipeline Status -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <!-- Recent Pipelines -->
      <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">최근 파이프라인 실행</h3>
        <div class="space-y-4">
          <div v-for="pipeline in recentPipelines" :key="pipeline.id" class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div class="flex items-center space-x-3">
              <div class="w-3 h-3 rounded-full" :class="getStatusColor(pipeline.status)"></div>
              <div>
                <p class="text-sm font-medium text-gray-900 dark:text-white">{{ pipeline.name }}</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">{{ pipeline.branch }} • {{ pipeline.time }}</p>
              </div>
            </div>
            <div class="flex items-center space-x-2">
              <span class="text-xs text-gray-500 dark:text-gray-400">{{ pipeline.duration }}</span>
              <button class="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 text-sm">
                상세보기
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Tool Status -->
      <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">도구 상태</h3>
        <div class="space-y-4">
          <div v-for="tool in tools" :key="tool.name" class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 rounded-lg flex items-center justify-center" :style="{ backgroundColor: tool.color }">
                <span class="text-white font-bold text-xs">{{ tool.name.substring(0, 2) }}</span>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-900 dark:text-white">{{ tool.name }}</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">{{ tool.version }}</p>
              </div>
            </div>
            <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full" :class="getToolStatusClass(tool.status)">
              {{ tool.status }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Deployment Environments -->
    <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-8">
      <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">배포 환경</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div v-for="env in environments" :key="env.name" class="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <div class="flex items-center justify-between mb-3">
            <h4 class="text-md font-medium text-gray-900 dark:text-white">{{ env.name }}</h4>
            <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full" :class="getEnvStatusClass(env.status)">
              {{ env.status }}
            </span>
          </div>
          <div class="space-y-2">
            <div class="flex justify-between text-sm">
              <span class="text-gray-500 dark:text-gray-400">버전</span>
              <span class="text-gray-900 dark:text-white">{{ env.version }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-500 dark:text-gray-400">마지막 배포</span>
              <span class="text-gray-900 dark:text-white">{{ env.lastDeploy }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-500 dark:text-gray-400">인스턴스</span>
              <span class="text-gray-900 dark:text-white">{{ env.instances }}</span>
            </div>
          </div>
          <div class="mt-3 flex space-x-2">
            <button class="flex-1 px-3 py-1 text-xs font-medium text-indigo-600 border border-indigo-600 rounded hover:bg-indigo-50 dark:hover:bg-indigo-900">
              배포
            </button>
            <button class="flex-1 px-3 py-1 text-xs font-medium text-gray-600 border border-gray-300 rounded hover:bg-gray-50 dark:hover:bg-gray-700">
              롤백
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Metrics and Charts -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Deployment Frequency -->
      <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">배포 빈도 (최근 30일)</h3>
        <div class="space-y-3">
          <div v-for="day in deploymentFrequency" :key="day.date" class="flex items-center justify-between">
            <span class="text-sm text-gray-600 dark:text-gray-400">{{ day.date }}</span>
            <div class="flex items-center space-x-2">
              <div class="w-32 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                <div class="bg-blue-600 h-2 rounded-full" :style="{ width: (day.count / 10) * 100 + '%' }"></div>
              </div>
              <span class="text-sm font-medium text-gray-900 dark:text-white">{{ day.count }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Error Rate -->
      <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">오류율 추이</h3>
        <div class="space-y-3">
          <div v-for="metric in errorRates" :key="metric.service" class="flex items-center justify-between">
            <span class="text-sm font-medium text-gray-900 dark:text-white">{{ metric.service }}</span>
            <div class="flex items-center space-x-2">
              <div class="w-24 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                <div class="h-2 rounded-full" :class="metric.rate > 5 ? 'bg-red-600' : metric.rate > 2 ? 'bg-yellow-600' : 'bg-green-600'" :style="{ width: metric.rate + '%' }"></div>
              </div>
              <span class="text-sm text-gray-600 dark:text-gray-400">{{ metric.rate }}%</span>
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
  title: 'DevOps Toolchain - AXMP'
})

// Reactive data
const stats = ref({
  activePipelines: 24,
  successRate: 94.2,
  avgDeployTime: 8.5,
  connectedTools: 12
})

const recentPipelines = ref([
  {
    id: 1,
    name: 'frontend-app',
    branch: 'main',
    status: 'success',
    time: '5분 전',
    duration: '3m 24s'
  },
  {
    id: 2,
    name: 'api-service',
    branch: 'develop',
    status: 'running',
    time: '12분 전',
    duration: '진행 중'
  },
  {
    id: 3,
    name: 'data-pipeline',
    branch: 'feature/analytics',
    status: 'failed',
    time: '1시간 전',
    duration: '2m 15s'
  },
  {
    id: 4,
    name: 'mobile-app',
    branch: 'release/v2.1',
    status: 'success',
    time: '2시간 전',
    duration: '12m 45s'
  }
])

const tools = ref([
  { name: 'Jenkins', version: 'v2.401.3', status: 'Healthy', color: '#D33833' },
  { name: 'GitLab', version: 'v16.3.0', status: 'Healthy', color: '#FC6D26' },
  { name: 'Docker', version: 'v24.0.5', status: 'Healthy', color: '#2496ED' },
  { name: 'Kubernetes', version: 'v1.28.2', status: 'Warning', color: '#326CE5' },
  { name: 'Prometheus', version: 'v2.45.0', status: 'Healthy', color: '#E6522C' },
  { name: 'Grafana', version: 'v10.1.0', status: 'Healthy', color: '#F46800' }
])

const environments = ref([
  {
    name: 'Production',
    status: 'Healthy',
    version: 'v2.1.3',
    lastDeploy: '2시간 전',
    instances: '8/8'
  },
  {
    name: 'Staging',
    status: 'Deploying',
    version: 'v2.2.0-rc1',
    lastDeploy: '진행 중',
    instances: '3/4'
  },
  {
    name: 'Development',
    status: 'Healthy',
    version: 'v2.2.0-dev',
    lastDeploy: '30분 전',
    instances: '2/2'
  }
])

const deploymentFrequency = ref([
  { date: '11/20', count: 8 },
  { date: '11/21', count: 5 },
  { date: '11/22', count: 12 },
  { date: '11/23', count: 3 },
  { date: '11/24', count: 9 },
  { date: '11/25', count: 6 },
  { date: '11/26', count: 10 }
])

const errorRates = ref([
  { service: 'Frontend App', rate: 0.8 },
  { service: 'API Gateway', rate: 1.2 },
  { service: 'User Service', rate: 0.3 },
  { service: 'Payment Service', rate: 2.1 },
  { service: 'Notification Service', rate: 0.9 }
])

// Methods
const getStatusColor = (status: string) => {
  const colors = {
    'success': 'bg-green-500',
    'running': 'bg-blue-500',
    'failed': 'bg-red-500',
    'pending': 'bg-yellow-500'
  }
  return colors[status as keyof typeof colors] || 'bg-gray-500'
}

const getToolStatusClass = (status: string) => {
  const classes = {
    'Healthy': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    'Warning': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    'Error': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
  }
  return classes[status as keyof typeof classes] || 'bg-gray-100 text-gray-800'
}

const getEnvStatusClass = (status: string) => {
  const classes = {
    'Healthy': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    'Deploying': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    'Error': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
  }
  return classes[status as keyof typeof classes] || 'bg-gray-100 text-gray-800'
}
</script> 