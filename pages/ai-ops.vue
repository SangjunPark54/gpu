<template>
  <div class="p-6">
    <!-- Page Header -->
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">AI Ops</h1>
      <p class="text-gray-600 dark:text-gray-400 mt-2">AI 기반 운영 자동화와 지능형 분석을 통해 시스템을 최적화합니다.</p>
    </div>

    <!-- AI Ops Overview -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div class="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                <svg class="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                </svg>
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">AI 모델</dt>
                <dd class="text-lg font-medium text-gray-900 dark:text-white">{{ stats.aiModels }}</dd>
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
                <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">자동화 작업</dt>
                <dd class="text-lg font-medium text-gray-900 dark:text-white">{{ stats.automatedTasks }}</dd>
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
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">예측 정확도</dt>
                <dd class="text-lg font-medium text-gray-900 dark:text-white">{{ stats.predictionAccuracy }}%</dd>
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
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">시간 절약</dt>
                <dd class="text-lg font-medium text-gray-900 dark:text-white">{{ stats.timeSaved }}h</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- AI Models and Automation -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <!-- Active AI Models -->
      <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">활성 AI 모델</h3>
        <div class="space-y-4">
          <div v-for="model in aiModels" :key="model.id" class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div class="flex items-center space-x-3">
              <div class="w-3 h-3 rounded-full" :class="getModelStatusColor(model.status)"></div>
              <div>
                <p class="text-sm font-medium text-gray-900 dark:text-white">{{ model.name }}</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">{{ model.type }} • v{{ model.version }}</p>
              </div>
            </div>
            <div class="text-right">
              <p class="text-sm font-medium text-gray-900 dark:text-white">{{ model.accuracy }}%</p>
              <p class="text-xs text-gray-500 dark:text-gray-400">{{ model.lastTrained }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Automation Workflows -->
      <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">자동화 워크플로우</h3>
        <div class="space-y-4">
          <div v-for="workflow in automationWorkflows" :key="workflow.id" class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div class="flex items-center space-x-3">
              <div class="w-3 h-3 rounded-full" :class="getWorkflowStatusColor(workflow.status)"></div>
              <div>
                <p class="text-sm font-medium text-gray-900 dark:text-white">{{ workflow.name }}</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">{{ workflow.trigger }} • {{ workflow.frequency }}</p>
              </div>
            </div>
            <div class="text-right">
              <p class="text-sm font-medium text-gray-900 dark:text-white">{{ workflow.executions }}</p>
              <p class="text-xs text-gray-500 dark:text-gray-400">실행 횟수</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Predictive Analytics -->
    <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-8">
      <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">예측 분석</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Resource Prediction -->
        <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <h4 class="text-md font-medium text-gray-900 dark:text-white mb-3">리소스 사용량 예측</h4>
          <div class="space-y-3">
            <div v-for="prediction in resourcePredictions" :key="prediction.resource" class="space-y-1">
              <div class="flex justify-between text-sm">
                <span class="text-gray-600 dark:text-gray-400">{{ prediction.resource }}</span>
                <span class="font-medium text-gray-900 dark:text-white">{{ prediction.predicted }}%</span>
              </div>
              <div class="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                <div 
                  class="h-2 rounded-full" 
                  :class="prediction.predicted > 80 ? 'bg-red-600' : prediction.predicted > 60 ? 'bg-yellow-600' : 'bg-green-600'"
                  :style="{ width: prediction.predicted + '%' }"
                ></div>
              </div>
              <p class="text-xs text-gray-500 dark:text-gray-400">다음 {{ prediction.timeframe }}일 예상</p>
            </div>
          </div>
        </div>

        <!-- Anomaly Detection -->
        <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <h4 class="text-md font-medium text-gray-900 dark:text-white mb-3">이상 탐지</h4>
          <div class="space-y-3">
            <div v-for="anomaly in anomalies" :key="anomaly.id" class="flex items-start space-x-2">
              <div class="w-4 h-4 rounded-full flex items-center justify-center mt-0.5" :class="getAnomalySeverityColor(anomaly.severity)">
                <div class="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <div class="flex-1">
                <p class="text-sm font-medium text-gray-900 dark:text-white">{{ anomaly.service }}</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">{{ anomaly.description }}</p>
                <p class="text-xs text-gray-400 dark:text-gray-500">{{ anomaly.time }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Performance Optimization -->
        <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <h4 class="text-md font-medium text-gray-900 dark:text-white mb-3">성능 최적화 제안</h4>
          <div class="space-y-3">
            <div v-for="suggestion in optimizationSuggestions" :key="suggestion.id" class="space-y-1">
              <p class="text-sm font-medium text-gray-900 dark:text-white">{{ suggestion.title }}</p>
              <p class="text-xs text-gray-500 dark:text-gray-400">{{ suggestion.description }}</p>
              <div class="flex items-center justify-between">
                <span class="text-xs text-green-600 dark:text-green-400">{{ suggestion.impact }} 개선 예상</span>
                <button class="text-xs text-indigo-600 hover:text-indigo-800 dark:text-indigo-400">
                  적용
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- AI Insights and Recommendations -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- AI Insights -->
      <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">AI 인사이트</h3>
        <div class="space-y-4">
          <div v-for="insight in aiInsights" :key="insight.id" class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <div class="flex items-start space-x-3">
              <div class="flex-shrink-0">
                <div class="w-8 h-8 rounded-lg flex items-center justify-center" :style="{ backgroundColor: insight.color }">
                  <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" clip-rule="evenodd"></path>
                  </svg>
                </div>
              </div>
              <div class="flex-1">
                <h4 class="text-sm font-medium text-gray-900 dark:text-white">{{ insight.title }}</h4>
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">{{ insight.description }}</p>
                <div class="flex items-center justify-between mt-2">
                  <span class="text-xs text-gray-400 dark:text-gray-500">신뢰도: {{ insight.confidence }}%</span>
                  <span class="text-xs text-gray-400 dark:text-gray-500">{{ insight.category }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ML Pipeline Status -->
      <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">ML 파이프라인 상태</h3>
        <div class="space-y-4">
          <div v-for="pipeline in mlPipelines" :key="pipeline.id" class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div class="flex items-center space-x-3">
              <div class="w-3 h-3 rounded-full" :class="getPipelineStatusColor(pipeline.status)"></div>
              <div>
                <p class="text-sm font-medium text-gray-900 dark:text-white">{{ pipeline.name }}</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">{{ pipeline.stage }} • {{ pipeline.progress }}%</p>
              </div>
            </div>
            <div class="text-right">
              <p class="text-sm font-medium text-gray-900 dark:text-white">{{ pipeline.duration }}</p>
              <p class="text-xs text-gray-500 dark:text-gray-400">{{ pipeline.lastRun }}</p>
            </div>
          </div>
        </div>
        
        <!-- Pipeline Performance Metrics -->
        <div class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <h4 class="text-md font-medium text-gray-900 dark:text-white mb-3">파이프라인 성능</h4>
          <div class="grid grid-cols-2 gap-4">
            <div class="text-center">
              <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ pipelineMetrics.avgTrainingTime }}</p>
              <p class="text-xs text-gray-500 dark:text-gray-400">평균 훈련 시간</p>
            </div>
            <div class="text-center">
              <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ pipelineMetrics.successRate }}%</p>
              <p class="text-xs text-gray-500 dark:text-gray-400">성공률</p>
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
  title: 'AI Ops - AXMP'
})

// Reactive data
const stats = ref({
  aiModels: 18,
  automatedTasks: 156,
  predictionAccuracy: 94.2,
  timeSaved: 2840
})

const aiModels = ref([
  {
    id: 1,
    name: 'Anomaly Detection Model',
    type: 'Classification',
    version: '2.1',
    status: 'active',
    accuracy: 94.2,
    lastTrained: '2일 전'
  },
  {
    id: 2,
    name: 'Resource Prediction Model',
    type: 'Regression',
    version: '1.8',
    status: 'active',
    accuracy: 89.7,
    lastTrained: '1주 전'
  },
  {
    id: 3,
    name: 'Performance Optimization Model',
    type: 'Reinforcement Learning',
    version: '3.0',
    status: 'training',
    accuracy: 91.5,
    lastTrained: '진행 중'
  },
  {
    id: 4,
    name: 'Security Threat Detection',
    type: 'Deep Learning',
    version: '1.5',
    status: 'active',
    accuracy: 96.8,
    lastTrained: '3일 전'
  }
])

const automationWorkflows = ref([
  {
    id: 1,
    name: 'Auto Scaling Workflow',
    trigger: 'CPU Threshold',
    frequency: '실시간',
    status: 'active',
    executions: 1247
  },
  {
    id: 2,
    name: 'Log Analysis & Alert',
    trigger: 'Error Pattern',
    frequency: '5분마다',
    status: 'active',
    executions: 892
  },
  {
    id: 3,
    name: 'Backup Optimization',
    trigger: 'Schedule',
    frequency: '일일',
    status: 'active',
    executions: 45
  },
  {
    id: 4,
    name: 'Security Patch Deployment',
    trigger: 'CVE Alert',
    frequency: '이벤트 기반',
    status: 'paused',
    executions: 23
  }
])

const resourcePredictions = ref([
  { resource: 'CPU', predicted: 78, timeframe: 7 },
  { resource: 'Memory', predicted: 65, timeframe: 7 },
  { resource: 'Storage', predicted: 45, timeframe: 30 },
  { resource: 'Network', predicted: 82, timeframe: 7 }
])

const anomalies = ref([
  {
    id: 1,
    service: 'API Gateway',
    description: '응답 시간 급증 감지',
    severity: 'high',
    time: '15분 전'
  },
  {
    id: 2,
    service: 'Database',
    description: '비정상적인 쿼리 패턴',
    severity: 'medium',
    time: '1시간 전'
  },
  {
    id: 3,
    service: 'Load Balancer',
    description: '트래픽 분산 불균형',
    severity: 'low',
    time: '2시간 전'
  }
])

const optimizationSuggestions = ref([
  {
    id: 1,
    title: 'Database Index 최적화',
    description: '자주 사용되는 쿼리에 대한 인덱스 추가',
    impact: '25% 성능'
  },
  {
    id: 2,
    title: 'Cache 전략 개선',
    description: 'Redis 캐시 TTL 조정으로 히트율 향상',
    impact: '15% 응답시간'
  },
  {
    id: 3,
    title: 'Container 리소스 조정',
    description: 'CPU/Memory 할당량 최적화',
    impact: '20% 비용'
  }
])

const aiInsights = ref([
  {
    id: 1,
    title: 'Peak Traffic Pattern Detected',
    description: '매주 화요일 오후 2-4시에 트래픽이 40% 증가하는 패턴이 발견되었습니다.',
    confidence: 92,
    category: 'Traffic Analysis',
    color: '#3B82F6'
  },
  {
    id: 2,
    title: 'Resource Optimization Opportunity',
    description: '개발 환경의 리소스 사용률이 낮아 30% 비용 절감이 가능합니다.',
    confidence: 87,
    category: 'Cost Optimization',
    color: '#10B981'
  },
  {
    id: 3,
    title: 'Security Risk Assessment',
    description: '최근 로그인 패턴에서 잠재적 보안 위험이 감지되었습니다.',
    confidence: 78,
    category: 'Security',
    color: '#EF4444'
  }
])

const mlPipelines = ref([
  {
    id: 1,
    name: 'Fraud Detection Pipeline',
    stage: 'Training',
    progress: 75,
    status: 'running',
    duration: '2h 15m',
    lastRun: '진행 중'
  },
  {
    id: 2,
    name: 'Recommendation Engine',
    stage: 'Validation',
    progress: 100,
    status: 'completed',
    duration: '45m',
    lastRun: '1시간 전'
  },
  {
    id: 3,
    name: 'Predictive Maintenance',
    stage: 'Deployment',
    progress: 90,
    status: 'deploying',
    duration: '1h 30m',
    lastRun: '30분 전'
  }
])

const pipelineMetrics = ref({
  avgTrainingTime: '1.2h',
  successRate: 96
})

// Methods
const getModelStatusColor = (status: string) => {
  const colors = {
    'active': 'bg-green-500',
    'training': 'bg-blue-500',
    'inactive': 'bg-gray-500',
    'error': 'bg-red-500'
  }
  return colors[status as keyof typeof colors] || 'bg-gray-500'
}

const getWorkflowStatusColor = (status: string) => {
  const colors = {
    'active': 'bg-green-500',
    'paused': 'bg-yellow-500',
    'error': 'bg-red-500',
    'inactive': 'bg-gray-500'
  }
  return colors[status as keyof typeof colors] || 'bg-gray-500'
}

const getAnomalySeverityColor = (severity: string) => {
  const colors = {
    'high': 'bg-red-500',
    'medium': 'bg-yellow-500',
    'low': 'bg-blue-500'
  }
  return colors[severity as keyof typeof colors] || 'bg-gray-500'
}

const getPipelineStatusColor = (status: string) => {
  const colors = {
    'running': 'bg-blue-500',
    'completed': 'bg-green-500',
    'deploying': 'bg-purple-500',
    'failed': 'bg-red-500'
  }
  return colors[status as keyof typeof colors] || 'bg-gray-500'
}
</script> 