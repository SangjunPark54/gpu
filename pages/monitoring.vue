<template>
  <div class="p-6">
    <!-- Page Header -->
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Monitoring</h1>
      <p class="text-gray-600 dark:text-gray-400 mt-2">시스템 상태와 성능을 실시간으로 모니터링합니다.</p>
    </div>

    <!-- System Health Overview -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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
                <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">시스템 상태</dt>
                <dd class="text-lg font-medium text-gray-900 dark:text-white">정상</dd>
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
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">활성 알림</dt>
                <dd class="text-lg font-medium text-gray-900 dark:text-white">{{ alerts.active }}</dd>
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
                <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">모니터링 대상</dt>
                <dd class="text-lg font-medium text-gray-900 dark:text-white">{{ metrics.totalServices }}</dd>
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
                <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">평균 응답시간</dt>
                <dd class="text-lg font-medium text-gray-900 dark:text-white">{{ metrics.avgResponseTime }}ms</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Resource Usage -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      <!-- CPU Usage -->
      <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">CPU 사용률</h3>
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
              :stroke-dasharray="`${systemMetrics.cpu}, 100`"
            />
          </svg>
          <div class="absolute inset-0 flex items-center justify-center">
            <span class="text-xl font-bold text-gray-900 dark:text-white">{{ systemMetrics.cpu }}%</span>
          </div>
        </div>
        <div class="text-center">
          <p class="text-sm text-gray-600 dark:text-gray-400">{{ systemMetrics.cpuCores }}코어 사용 중</p>
        </div>
      </div>

      <!-- Memory Usage -->
      <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">메모리 사용률</h3>
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
              :stroke-dasharray="`${systemMetrics.memory}, 100`"
            />
          </svg>
          <div class="absolute inset-0 flex items-center justify-center">
            <span class="text-xl font-bold text-gray-900 dark:text-white">{{ systemMetrics.memory }}%</span>
          </div>
        </div>
        <div class="text-center">
          <p class="text-sm text-gray-600 dark:text-gray-400">{{ systemMetrics.memoryUsed }}GB / {{ systemMetrics.memoryTotal }}GB</p>
        </div>
      </div>

      <!-- Disk Usage -->
      <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">디스크 사용률</h3>
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
              :stroke-dasharray="`${systemMetrics.disk}, 100`"
            />
          </svg>
          <div class="absolute inset-0 flex items-center justify-center">
            <span class="text-xl font-bold text-gray-900 dark:text-white">{{ systemMetrics.disk }}%</span>
          </div>
        </div>
        <div class="text-center">
          <p class="text-sm text-gray-600 dark:text-gray-400">{{ systemMetrics.diskUsed }}TB / {{ systemMetrics.diskTotal }}TB</p>
        </div>
      </div>
    </div>

    <!-- Services Status and Alerts -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <!-- Service Status -->
      <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">서비스 상태</h3>
        <div class="space-y-4">
          <div v-for="service in services" :key="service.name" class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div class="flex items-center space-x-3">
              <div class="w-3 h-3 rounded-full" :class="getServiceStatusColor(service.status)"></div>
              <div>
                <p class="text-sm font-medium text-gray-900 dark:text-white">{{ service.name }}</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">{{ service.endpoint }}</p>
              </div>
            </div>
            <div class="text-right">
              <p class="text-sm font-medium text-gray-900 dark:text-white">{{ service.responseTime }}ms</p>
              <p class="text-xs text-gray-500 dark:text-gray-400">{{ service.uptime }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Alerts -->
      <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">최근 알림</h3>
        <div class="space-y-4">
          <div v-for="alert in recentAlerts" :key="alert.id" class="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div class="flex-shrink-0">
              <div class="w-6 h-6 rounded-full flex items-center justify-center" :class="getAlertTypeColor(alert.type)">
                <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
                </svg>
              </div>
            </div>
            <div class="flex-1">
              <p class="text-sm font-medium text-gray-900 dark:text-white">{{ alert.title }}</p>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">{{ alert.message }}</p>
              <p class="text-xs text-gray-400 dark:text-gray-500 mt-1">{{ alert.time }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Performance Metrics -->
    <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-8">
      <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">성능 지표 (최근 24시간)</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Response Time Trend -->
        <div>
          <h4 class="text-md font-medium text-gray-900 dark:text-white mb-3">응답 시간 추이</h4>
          <div class="space-y-2">
            <div v-for="hour in responseTimeTrend" :key="hour.time" class="flex items-center justify-between">
              <span class="text-sm text-gray-600 dark:text-gray-400">{{ hour.time }}</span>
              <div class="flex items-center space-x-2">
                <div class="w-32 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                  <div class="bg-blue-600 h-2 rounded-full" :style="{ width: (hour.responseTime / 500) * 100 + '%' }"></div>
                </div>
                <span class="text-sm font-medium text-gray-900 dark:text-white">{{ hour.responseTime }}ms</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Error Rate -->
        <div>
          <h4 class="text-md font-medium text-gray-900 dark:text-white mb-3">오류율</h4>
          <div class="space-y-2">
            <div v-for="service in errorRates" :key="service.name" class="flex items-center justify-between">
              <span class="text-sm font-medium text-gray-900 dark:text-white">{{ service.name }}</span>
              <div class="flex items-center space-x-2">
                <div class="w-24 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                  <div class="h-2 rounded-full" :class="service.rate > 5 ? 'bg-red-600' : service.rate > 2 ? 'bg-yellow-600' : 'bg-green-600'" :style="{ width: service.rate * 10 + '%' }"></div>
                </div>
                <span class="text-sm text-gray-600 dark:text-gray-400">{{ service.rate }}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Monitoring Tools -->
    <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
      <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">모니터링 도구</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div v-for="tool in monitoringTools" :key="tool.name" class="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <div class="flex items-center space-x-3 mb-3">
            <div class="w-10 h-10 rounded-lg flex items-center justify-center" :style="{ backgroundColor: tool.color }">
              <span class="text-white font-bold text-sm">{{ tool.name.substring(0, 2) }}</span>
            </div>
            <div>
              <h4 class="text-md font-medium text-gray-900 dark:text-white">{{ tool.name }}</h4>
              <p class="text-sm text-gray-500 dark:text-gray-400">{{ tool.description }}</p>
            </div>
          </div>
          <div class="space-y-2">
            <div class="flex justify-between text-sm">
              <span class="text-gray-500 dark:text-gray-400">상태</span>
              <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full" :class="getToolStatusClass(tool.status)">
                {{ tool.status }}
              </span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-500 dark:text-gray-400">버전</span>
              <span class="text-gray-900 dark:text-white">{{ tool.version }}</span>
            </div>
          </div>
          <div class="mt-3">
            <button class="w-full px-3 py-2 text-sm font-medium text-indigo-600 border border-indigo-600 rounded hover:bg-indigo-50 dark:hover:bg-indigo-900">
              대시보드 열기
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
  title: 'Monitoring - AXMP'
})

// Reactive data
const alerts = ref({
  active: 3
})

const metrics = ref({
  totalServices: 28,
  avgResponseTime: 145
})

const systemMetrics = ref({
  cpu: 68,
  cpuCores: 16,
  memory: 72,
  memoryUsed: 58,
  memoryTotal: 80,
  disk: 45,
  diskUsed: 2.3,
  diskTotal: 5.0
})

const services = ref([
  {
    name: 'API Gateway',
    endpoint: 'api.axmp.com',
    status: 'healthy',
    responseTime: 120,
    uptime: '99.9%'
  },
  {
    name: 'User Service',
    endpoint: 'user.axmp.com',
    status: 'healthy',
    responseTime: 85,
    uptime: '99.8%'
  },
  {
    name: 'Payment Service',
    endpoint: 'payment.axmp.com',
    status: 'warning',
    responseTime: 250,
    uptime: '99.5%'
  },
  {
    name: 'Notification Service',
    endpoint: 'notify.axmp.com',
    status: 'healthy',
    responseTime: 95,
    uptime: '99.9%'
  }
])

const recentAlerts = ref([
  {
    id: 1,
    type: 'warning',
    title: 'High Response Time',
    message: 'Payment Service 응답 시간이 임계치를 초과했습니다.',
    time: '5분 전'
  },
  {
    id: 2,
    type: 'info',
    title: 'Deployment Complete',
    message: 'User Service v2.1.0 배포가 완료되었습니다.',
    time: '1시간 전'
  },
  {
    id: 3,
    type: 'error',
    title: 'Service Down',
    message: 'Analytics Service가 일시적으로 중단되었습니다.',
    time: '2시간 전'
  }
])

const responseTimeTrend = ref([
  { time: '00:00', responseTime: 120 },
  { time: '04:00', responseTime: 95 },
  { time: '08:00', responseTime: 180 },
  { time: '12:00', responseTime: 220 },
  { time: '16:00', responseTime: 165 },
  { time: '20:00', responseTime: 140 }
])

const errorRates = ref([
  { name: 'API Gateway', rate: 0.5 },
  { name: 'User Service', rate: 0.2 },
  { name: 'Payment Service', rate: 1.8 },
  { name: 'Notification Service', rate: 0.3 }
])

const monitoringTools = ref([
  {
    name: 'Prometheus',
    description: '메트릭 수집 및 저장',
    status: 'Healthy',
    version: 'v2.45.0',
    color: '#E6522C'
  },
  {
    name: 'Grafana',
    description: '시각화 및 대시보드',
    status: 'Healthy',
    version: 'v10.1.0',
    color: '#F46800'
  },
  {
    name: 'AlertManager',
    description: '알림 관리',
    status: 'Healthy',
    version: 'v0.26.0',
    color: '#FF6B6B'
  }
])

// Methods
const getServiceStatusColor = (status: string) => {
  const colors = {
    'healthy': 'bg-green-500',
    'warning': 'bg-yellow-500',
    'error': 'bg-red-500',
    'down': 'bg-gray-500'
  }
  return colors[status as keyof typeof colors] || 'bg-gray-500'
}

const getAlertTypeColor = (type: string) => {
  const colors = {
    'info': 'bg-blue-500',
    'warning': 'bg-yellow-500',
    'error': 'bg-red-500',
    'success': 'bg-green-500'
  }
  return colors[type as keyof typeof colors] || 'bg-gray-500'
}

const getToolStatusClass = (status: string) => {
  const classes = {
    'Healthy': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    'Warning': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    'Error': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
  }
  return classes[status as keyof typeof classes] || 'bg-gray-100 text-gray-800'
}
</script> 