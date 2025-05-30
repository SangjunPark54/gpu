<template>
  <div class="p-6">
    <!-- Page Header -->
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Security</h1>
      <p class="text-gray-600 dark:text-gray-400 mt-2">시스템 보안 상태와 취약점을 관리합니다.</p>
    </div>

    <!-- Security Overview -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div class="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                <svg class="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">보안 점수</dt>
                <dd class="text-lg font-medium text-gray-900 dark:text-white">{{ securityScore }}/100</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                <svg class="w-5 h-5 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                </svg>
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">취약점</dt>
                <dd class="text-lg font-medium text-gray-900 dark:text-white">{{ vulnerabilities.total }}</dd>
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
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                </svg>
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">컴플라이언스</dt>
                <dd class="text-lg font-medium text-gray-900 dark:text-white">{{ compliance.score }}%</dd>
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
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"></path>
                </svg>
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">활성 세션</dt>
                <dd class="text-lg font-medium text-gray-900 dark:text-white">{{ activeSessions }}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Vulnerability Management -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <!-- Critical Vulnerabilities -->
      <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">중요 취약점</h3>
        <div class="space-y-4">
          <div v-for="vuln in criticalVulnerabilities" :key="vuln.id" class="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div class="flex-shrink-0">
              <div class="w-6 h-6 rounded-full flex items-center justify-center" :class="getSeverityColor(vuln.severity)">
                <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
                </svg>
              </div>
            </div>
            <div class="flex-1">
              <p class="text-sm font-medium text-gray-900 dark:text-white">{{ vuln.title }}</p>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">{{ vuln.description }}</p>
              <div class="flex items-center space-x-4 mt-2">
                <span class="text-xs text-gray-400 dark:text-gray-500">CVSS: {{ vuln.cvss }}</span>
                <span class="text-xs text-gray-400 dark:text-gray-500">{{ vuln.component }}</span>
              </div>
            </div>
            <button class="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 text-sm">
              수정
            </button>
          </div>
        </div>
      </div>

      <!-- Security Scans -->
      <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">보안 스캔 결과</h3>
        <div class="space-y-4">
          <div v-for="scan in securityScans" :key="scan.id" class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div class="flex items-center space-x-3">
              <div class="w-3 h-3 rounded-full" :class="getScanStatusColor(scan.status)"></div>
              <div>
                <p class="text-sm font-medium text-gray-900 dark:text-white">{{ scan.type }}</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">{{ scan.target }} • {{ scan.time }}</p>
              </div>
            </div>
            <div class="text-right">
              <p class="text-sm font-medium text-gray-900 dark:text-white">{{ scan.issues }} 이슈</p>
              <p class="text-xs text-gray-500 dark:text-gray-400">{{ scan.duration }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Compliance Status -->
    <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-8">
      <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">컴플라이언스 상태</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div v-for="standard in complianceStandards" :key="standard.name" class="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <div class="flex items-center justify-between mb-3">
            <h4 class="text-md font-medium text-gray-900 dark:text-white">{{ standard.name }}</h4>
            <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full" :class="getComplianceStatusClass(standard.status)">
              {{ standard.status }}
            </span>
          </div>
          <div class="space-y-2">
            <div class="flex justify-between text-sm">
              <span class="text-gray-500 dark:text-gray-400">준수율</span>
              <span class="text-gray-900 dark:text-white">{{ standard.compliance }}%</span>
            </div>
            <div class="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
              <div class="bg-green-600 h-2 rounded-full" :style="{ width: standard.compliance + '%' }"></div>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-500 dark:text-gray-400">마지막 감사</span>
              <span class="text-gray-900 dark:text-white">{{ standard.lastAudit }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Security Tools and Access Control -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Security Tools -->
      <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">보안 도구</h3>
        <div class="space-y-4">
          <div v-for="tool in securityTools" :key="tool.name" class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 rounded-lg flex items-center justify-center" :style="{ backgroundColor: tool.color }">
                <span class="text-white font-bold text-xs">{{ tool.name.substring(0, 2) }}</span>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-900 dark:text-white">{{ tool.name }}</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">{{ tool.description }}</p>
              </div>
            </div>
            <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full" :class="getToolStatusClass(tool.status)">
              {{ tool.status }}
            </span>
          </div>
        </div>
      </div>

      <!-- Recent Security Events -->
      <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">최근 보안 이벤트</h3>
        <div class="space-y-4">
          <div v-for="event in securityEvents" :key="event.id" class="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div class="flex-shrink-0">
              <div class="w-6 h-6 rounded-full flex items-center justify-center" :class="getEventTypeColor(event.type)">
                <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                </svg>
              </div>
            </div>
            <div class="flex-1">
              <p class="text-sm font-medium text-gray-900 dark:text-white">{{ event.title }}</p>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">{{ event.description }}</p>
              <p class="text-xs text-gray-400 dark:text-gray-500 mt-1">{{ event.time }} • {{ event.source }}</p>
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
  title: 'Security - AXMP'
})

// Reactive data
const securityScore = ref(87)
const vulnerabilities = ref({
  total: 12,
  critical: 2,
  high: 4,
  medium: 6
})
const compliance = ref({
  score: 94
})
const activeSessions = ref(156)

const criticalVulnerabilities = ref([
  {
    id: 1,
    title: 'SQL Injection in User API',
    description: '사용자 API에서 SQL 인젝션 취약점이 발견되었습니다.',
    severity: 'critical',
    cvss: '9.8',
    component: 'user-service'
  },
  {
    id: 2,
    title: 'Cross-Site Scripting (XSS)',
    description: '웹 애플리케이션에서 XSS 취약점이 발견되었습니다.',
    severity: 'high',
    cvss: '7.5',
    component: 'frontend-app'
  },
  {
    id: 3,
    title: 'Insecure Direct Object Reference',
    description: '직접 객체 참조 취약점이 발견되었습니다.',
    severity: 'medium',
    cvss: '6.2',
    component: 'api-gateway'
  }
])

const securityScans = ref([
  {
    id: 1,
    type: 'Container Scan',
    target: 'user-service:latest',
    status: 'completed',
    issues: 3,
    time: '2시간 전',
    duration: '5분'
  },
  {
    id: 2,
    type: 'SAST Scan',
    target: 'frontend-app',
    status: 'running',
    issues: 0,
    time: '진행 중',
    duration: '15분'
  },
  {
    id: 3,
    type: 'DAST Scan',
    target: 'api.axmp.com',
    status: 'completed',
    issues: 2,
    time: '1일 전',
    duration: '45분'
  }
])

const complianceStandards = ref([
  {
    name: 'SOC 2',
    status: 'Compliant',
    compliance: 96,
    lastAudit: '2023-10-15'
  },
  {
    name: 'ISO 27001',
    status: 'Compliant',
    compliance: 94,
    lastAudit: '2023-09-20'
  },
  {
    name: 'GDPR',
    status: 'Partial',
    compliance: 88,
    lastAudit: '2023-11-01'
  }
])

const securityTools = ref([
  {
    name: 'Snyk',
    description: '취약점 스캔',
    status: 'Active',
    color: '#4C4A73'
  },
  {
    name: 'SonarQube',
    description: '코드 품질 분석',
    status: 'Active',
    color: '#4E9BCD'
  },
  {
    name: 'OWASP ZAP',
    description: '웹 애플리케이션 보안 테스트',
    status: 'Active',
    color: '#00549E'
  },
  {
    name: 'Vault',
    description: '시크릿 관리',
    status: 'Active',
    color: '#000000'
  }
])

const securityEvents = ref([
  {
    id: 1,
    type: 'success',
    title: 'Successful Login',
    description: '관리자 계정으로 성공적으로 로그인했습니다.',
    time: '5분 전',
    source: 'IAM Service'
  },
  {
    id: 2,
    type: 'warning',
    title: 'Failed Login Attempt',
    description: '잘못된 자격 증명으로 로그인 시도가 있었습니다.',
    time: '15분 전',
    source: 'API Gateway'
  },
  {
    id: 3,
    type: 'info',
    title: 'Security Scan Completed',
    description: '정기 보안 스캔이 완료되었습니다.',
    time: '1시간 전',
    source: 'Security Scanner'
  }
])

// Methods
const getSeverityColor = (severity: string) => {
  const colors = {
    'critical': 'bg-red-600',
    'high': 'bg-orange-500',
    'medium': 'bg-yellow-500',
    'low': 'bg-blue-500'
  }
  return colors[severity as keyof typeof colors] || 'bg-gray-500'
}

const getScanStatusColor = (status: string) => {
  const colors = {
    'completed': 'bg-green-500',
    'running': 'bg-blue-500',
    'failed': 'bg-red-500',
    'pending': 'bg-yellow-500'
  }
  return colors[status as keyof typeof colors] || 'bg-gray-500'
}

const getComplianceStatusClass = (status: string) => {
  const classes = {
    'Compliant': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    'Partial': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    'Non-Compliant': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
  }
  return classes[status as keyof typeof classes] || 'bg-gray-100 text-gray-800'
}

const getToolStatusClass = (status: string) => {
  const classes = {
    'Active': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    'Inactive': 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
    'Error': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
  }
  return classes[status as keyof typeof classes] || 'bg-gray-100 text-gray-800'
}

const getEventTypeColor = (type: string) => {
  const colors = {
    'success': 'bg-green-500',
    'warning': 'bg-yellow-500',
    'error': 'bg-red-500',
    'info': 'bg-blue-500'
  }
  return colors[type as keyof typeof colors] || 'bg-gray-500'
}
</script> 