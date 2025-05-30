<template>
  <div class="p-6">
    <!-- Page Header -->
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">프로젝트 설정</h1>
      <p class="text-gray-600 dark:text-gray-400 mt-2">프로젝트 전반적인 설정을 관리합니다.</p>
    </div>

    <!-- Settings Tabs -->
    <div class="mb-6">
      <nav class="flex space-x-8" aria-label="Tabs">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="activeTab = tab.id"
          :class="[
            'whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm',
            activeTab === tab.id
              ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
          ]"
        >
          {{ tab.name }}
        </button>
      </nav>
    </div>

    <!-- General Settings -->
    <div v-if="activeTab === 'general'" class="space-y-6">
      <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">일반 설정</h3>
        
        <div class="space-y-6">
          <!-- Default Project Settings -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              기본 프로젝트 템플릿
            </label>
            <select class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white">
              <option>AI Research Template</option>
              <option>Data Science Template</option>
              <option>Web Development Template</option>
              <option>Mobile App Template</option>
            </select>
          </div>

          <!-- Auto Assignment -->
          <div>
            <div class="flex items-center">
              <input
                id="autoAssignment"
                type="checkbox"
                v-model="settings.autoAssignment"
                class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              >
              <label for="autoAssignment" class="ml-2 block text-sm text-gray-900 dark:text-white">
                자동 리소스 할당 활성화
              </label>
            </div>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">새 프로젝트 생성 시 자동으로 기본 리소스를 할당합니다.</p>
          </div>

          <!-- Project Approval -->
          <div>
            <div class="flex items-center">
              <input
                id="requireApproval"
                type="checkbox"
                v-model="settings.requireApproval"
                class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              >
              <label for="requireApproval" class="ml-2 block text-sm text-gray-900 dark:text-white">
                프로젝트 생성 승인 필요
              </label>
            </div>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">새 프로젝트는 관리자 승인 후 활성화됩니다.</p>
          </div>

          <!-- Default Budget -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              기본 월 예산 (원)
            </label>
            <input
              type="number"
              v-model="settings.defaultBudget"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              placeholder="1000000"
            >
          </div>
        </div>
      </div>
    </div>

    <!-- Resource Settings -->
    <div v-if="activeTab === 'resources'" class="space-y-6">
      <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">리소스 설정</h3>
        
        <div class="space-y-6">
          <!-- Resource Limits -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                최대 CPU 코어 수
              </label>
              <input
                type="number"
                v-model="settings.maxCpuCores"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                placeholder="64"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                최대 메모리 (GB)
              </label>
              <input
                type="number"
                v-model="settings.maxMemoryGb"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                placeholder="256"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                최대 스토리지 (TB)
              </label>
              <input
                type="number"
                v-model="settings.maxStorageTb"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                placeholder="10"
              >
            </div>
          </div>

          <!-- Auto Scaling -->
          <div>
            <div class="flex items-center">
              <input
                id="enableAutoScaling"
                type="checkbox"
                v-model="settings.enableAutoScaling"
                class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              >
              <label for="enableAutoScaling" class="ml-2 block text-sm text-gray-900 dark:text-white">
                자동 스케일링 기본 활성화
              </label>
            </div>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">새 프로젝트에서 자동 스케일링을 기본으로 활성화합니다.</p>
          </div>

          <!-- Resource Monitoring -->
          <div>
            <div class="flex items-center">
              <input
                id="enableMonitoring"
                type="checkbox"
                v-model="settings.enableMonitoring"
                class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              >
              <label for="enableMonitoring" class="ml-2 block text-sm text-gray-900 dark:text-white">
                리소스 모니터링 기본 활성화
              </label>
            </div>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">리소스 사용률 모니터링 및 알림을 기본으로 활성화합니다.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Security Settings -->
    <div v-if="activeTab === 'security'" class="space-y-6">
      <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">보안 설정</h3>
        
        <div class="space-y-6">
          <!-- Access Control -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              기본 접근 권한
            </label>
            <select v-model="settings.defaultAccessLevel" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white">
              <option value="PRIVATE">비공개</option>
              <option value="INTERNAL">내부 공개</option>
              <option value="PUBLIC">공개</option>
            </select>
          </div>

          <!-- Two-Factor Authentication -->
          <div>
            <div class="flex items-center">
              <input
                id="require2FA"
                type="checkbox"
                v-model="settings.require2FA"
                class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              >
              <label for="require2FA" class="ml-2 block text-sm text-gray-900 dark:text-white">
                2단계 인증 필수
              </label>
            </div>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">프로젝트 접근 시 2단계 인증을 필수로 요구합니다.</p>
          </div>

          <!-- IP Whitelist -->
          <div>
            <div class="flex items-center">
              <input
                id="enableIPWhitelist"
                type="checkbox"
                v-model="settings.enableIPWhitelist"
                class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              >
              <label for="enableIPWhitelist" class="ml-2 block text-sm text-gray-900 dark:text-white">
                IP 화이트리스트 활성화
              </label>
            </div>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">허용된 IP 주소에서만 프로젝트에 접근할 수 있습니다.</p>
          </div>

          <!-- Session Timeout -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              세션 타임아웃 (분)
            </label>
            <input
              type="number"
              v-model="settings.sessionTimeout"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              placeholder="30"
            >
          </div>
        </div>
      </div>
    </div>

    <!-- Notification Settings -->
    <div v-if="activeTab === 'notifications'" class="space-y-6">
      <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">알림 설정</h3>
        
        <div class="space-y-6">
          <!-- Email Notifications -->
          <div>
            <h4 class="text-md font-medium text-gray-900 dark:text-white mb-3">이메일 알림</h4>
            <div class="space-y-3">
              <div class="flex items-center">
                <input
                  id="emailProjectCreated"
                  type="checkbox"
                  v-model="settings.notifications.email.projectCreated"
                  class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                >
                <label for="emailProjectCreated" class="ml-2 block text-sm text-gray-900 dark:text-white">
                  프로젝트 생성 알림
                </label>
              </div>
              <div class="flex items-center">
                <input
                  id="emailResourceAlert"
                  type="checkbox"
                  v-model="settings.notifications.email.resourceAlert"
                  class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                >
                <label for="emailResourceAlert" class="ml-2 block text-sm text-gray-900 dark:text-white">
                  리소스 사용률 경고
                </label>
              </div>
              <div class="flex items-center">
                <input
                  id="emailBudgetAlert"
                  type="checkbox"
                  v-model="settings.notifications.email.budgetAlert"
                  class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                >
                <label for="emailBudgetAlert" class="ml-2 block text-sm text-gray-900 dark:text-white">
                  예산 초과 경고
                </label>
              </div>
            </div>
          </div>

          <!-- Slack Notifications -->
          <div>
            <h4 class="text-md font-medium text-gray-900 dark:text-white mb-3">Slack 알림</h4>
            <div class="space-y-3">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Slack Webhook URL
                </label>
                <input
                  type="url"
                  v-model="settings.notifications.slack.webhookUrl"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                  placeholder="https://hooks.slack.com/services/..."
                >
              </div>
              <div class="flex items-center">
                <input
                  id="slackEnabled"
                  type="checkbox"
                  v-model="settings.notifications.slack.enabled"
                  class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                >
                <label for="slackEnabled" class="ml-2 block text-sm text-gray-900 dark:text-white">
                  Slack 알림 활성화
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Integration Settings -->
    <div v-if="activeTab === 'integrations'" class="space-y-6">
      <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">외부 연동 설정</h3>
        
        <div class="space-y-6">
          <!-- Git Integration -->
          <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <div class="flex items-center justify-between mb-3">
              <h4 class="text-md font-medium text-gray-900 dark:text-white">Git 연동</h4>
              <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                연결됨
              </span>
            </div>
            <div class="space-y-3">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  기본 Git 서버
                </label>
                <span class="text-sm text-gray-900 dark:text-white">GitHub Enterprise</span>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  서버 URL
                </label>
                <span class="text-sm text-gray-900 dark:text-white">https://github.company.com</span>
              </div>
              <button class="px-3 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 border border-indigo-600 rounded-md hover:bg-indigo-50 dark:hover:bg-indigo-900">
                설정 변경
              </button>
            </div>
          </div>

          <!-- CI/CD Integration -->
          <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <div class="flex items-center justify-between mb-3">
              <h4 class="text-md font-medium text-gray-900 dark:text-white">CI/CD 연동</h4>
              <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                설정 필요
              </span>
            </div>
            <div class="space-y-3">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  CI/CD 플랫폼
                </label>
                <select class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white">
                  <option>Jenkins</option>
                  <option>GitLab CI</option>
                  <option>GitHub Actions</option>
                  <option>Azure DevOps</option>
                </select>
              </div>
              <button class="px-3 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700">
                연동 설정
              </button>
            </div>
          </div>

          <!-- Monitoring Integration -->
          <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <div class="flex items-center justify-between mb-3">
              <h4 class="text-md font-medium text-gray-900 dark:text-white">모니터링 연동</h4>
              <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                연결됨
              </span>
            </div>
            <div class="space-y-3">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  모니터링 도구
                </label>
                <span class="text-sm text-gray-900 dark:text-white">Prometheus + Grafana</span>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  대시보드 URL
                </label>
                <span class="text-sm text-gray-900 dark:text-white">https://grafana.company.com</span>
              </div>
              <button class="px-3 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 border border-indigo-600 rounded-md hover:bg-indigo-50 dark:hover:bg-indigo-900">
                설정 변경
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Save Button -->
    <div class="flex justify-end mt-8">
      <button
        @click="saveSettings"
        class="px-6 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        설정 저장
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Page title
useHead({
  title: '프로젝트 설정 - AXMP'
})

// Reactive data
const activeTab = ref('general')

const tabs = [
  { id: 'general', name: '일반' },
  { id: 'resources', name: '리소스' },
  { id: 'security', name: '보안' },
  { id: 'notifications', name: '알림' },
  { id: 'integrations', name: '연동' }
]

const settings = ref({
  // General settings
  autoAssignment: true,
  requireApproval: false,
  defaultBudget: 1000000,
  
  // Resource settings
  maxCpuCores: 64,
  maxMemoryGb: 256,
  maxStorageTb: 10,
  enableAutoScaling: true,
  enableMonitoring: true,
  
  // Security settings
  defaultAccessLevel: 'PRIVATE',
  require2FA: false,
  enableIPWhitelist: false,
  sessionTimeout: 30,
  
  // Notification settings
  notifications: {
    email: {
      projectCreated: true,
      resourceAlert: true,
      budgetAlert: true
    },
    slack: {
      enabled: false,
      webhookUrl: ''
    }
  }
})

// Methods
const saveSettings = () => {
  // TODO: API call to save settings
  console.log('Settings saved:', settings.value)
  
  // Show success message
  alert('설정이 저장되었습니다.')
}
</script> 