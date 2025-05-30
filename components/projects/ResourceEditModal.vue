<template>
  <div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50" @click="closeModal">
    <div class="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white dark:bg-gray-800" @click.stop>
      <!-- Modal Header -->
      <div class="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-700">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white">리소스 할당 편집</h3>
        <button @click="closeModal" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <!-- Modal Body -->
      <form @submit.prevent="handleSubmit" class="mt-6 space-y-6">
        <!-- Project Information (Read-only) -->
        <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">프로젝트 정보</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">프로젝트명</label>
              <span class="text-sm text-gray-900 dark:text-white">{{ allocation?.name }}</span>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">프로젝트 코드</label>
              <span class="text-sm text-gray-900 dark:text-white">{{ allocation?.code }}</span>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">부서</label>
              <span class="text-sm text-gray-900 dark:text-white">{{ allocation?.department }}</span>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">현재 상태</label>
              <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full" :class="getStatusClass(allocation?.status)">
                {{ getStatusText(allocation?.status) }}
              </span>
            </div>
          </div>
        </div>

        <!-- Resource Configuration -->
        <div class="border-t border-gray-200 dark:border-gray-700 pt-6">
          <h4 class="text-md font-medium text-gray-900 dark:text-white mb-4">리소스 구성</h4>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- CPU Cores -->
            <div>
              <label for="cpuCores" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                CPU 코어 수 *
              </label>
              <div class="relative">
                <input
                  id="cpuCores"
                  v-model.number="formData.cpuCores"
                  type="number"
                  min="1"
                  max="128"
                  required
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                  placeholder="예: 16"
                >
                <span class="absolute right-3 top-2 text-sm text-gray-500 dark:text-gray-400">코어</span>
              </div>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">현재: {{ allocation?.cpuCores }}코어</p>
            </div>

            <!-- Memory -->
            <div>
              <label for="memoryGb" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                메모리 (GB) *
              </label>
              <div class="relative">
                <input
                  id="memoryGb"
                  v-model.number="formData.memoryGb"
                  type="number"
                  min="1"
                  max="512"
                  required
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                  placeholder="예: 64"
                >
                <span class="absolute right-3 top-2 text-sm text-gray-500 dark:text-gray-400">GB</span>
              </div>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">현재: {{ allocation?.memoryGb }}GB</p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <!-- Storage -->
            <div>
              <label for="storageTb" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                스토리지 (TB) *
              </label>
              <div class="relative">
                <input
                  id="storageTb"
                  v-model.number="formData.storageTb"
                  type="number"
                  min="0.1"
                  max="50"
                  step="0.1"
                  required
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                  placeholder="예: 2.0"
                >
                <span class="absolute right-3 top-2 text-sm text-gray-500 dark:text-gray-400">TB</span>
              </div>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">현재: {{ allocation?.storageTb }}TB</p>
            </div>

            <!-- Monthly Budget -->
            <div>
              <label for="monthlyBudget" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                월 예산 (원) *
              </label>
              <div class="relative">
                <input
                  id="monthlyBudget"
                  v-model.number="formData.monthlyBudget"
                  type="number"
                  min="100000"
                  max="10000000"
                  step="100000"
                  required
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                  placeholder="예: 1500000"
                >
                <span class="absolute right-3 top-2 text-sm text-gray-500 dark:text-gray-400">원</span>
              </div>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">현재: ₩{{ allocation?.monthlyBudget?.toLocaleString() }}</p>
            </div>
          </div>
        </div>

        <!-- Status and Settings -->
        <div class="border-t border-gray-200 dark:border-gray-700 pt-6">
          <h4 class="text-md font-medium text-gray-900 dark:text-white mb-4">상태 및 설정</h4>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Status -->
            <div>
              <label for="status" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                할당 상태 *
              </label>
              <select
                id="status"
                v-model="formData.status"
                required
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="ACTIVE">활성</option>
                <option value="PENDING">대기 중</option>
                <option value="SUSPENDED">일시 중단</option>
                <option value="COMPLETED">완료</option>
              </select>
            </div>

            <!-- Priority -->
            <div>
              <label for="priority" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                우선순위
              </label>
              <select
                id="priority"
                v-model="formData.priority"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="LOW">낮음</option>
                <option value="MEDIUM">보통</option>
                <option value="HIGH">높음</option>
                <option value="CRITICAL">긴급</option>
              </select>
            </div>
          </div>

          <!-- Auto Scaling -->
          <div class="mt-6">
            <div class="flex items-center">
              <input
                id="autoScaling"
                v-model="formData.autoScaling"
                type="checkbox"
                class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              >
              <label for="autoScaling" class="ml-2 block text-sm text-gray-900 dark:text-white">
                자동 스케일링 활성화
              </label>
            </div>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">워크로드에 따라 리소스를 자동으로 조정합니다.</p>
          </div>

          <!-- Monitoring Alerts -->
          <div class="mt-4">
            <div class="flex items-center">
              <input
                id="monitoring"
                v-model="formData.monitoring"
                type="checkbox"
                class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              >
              <label for="monitoring" class="ml-2 block text-sm text-gray-900 dark:text-white">
                모니터링 알림 활성화
              </label>
            </div>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">리소스 사용률이 임계치를 초과할 때 알림을 받습니다.</p>
          </div>
        </div>

        <!-- Allocation Period -->
        <div class="border-t border-gray-200 dark:border-gray-700 pt-6">
          <h4 class="text-md font-medium text-gray-900 dark:text-white mb-4">할당 기간</h4>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Start Date -->
            <div>
              <label for="startDate" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                시작일
              </label>
              <input
                id="startDate"
                v-model="formData.startDate"
                type="date"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              >
            </div>

            <!-- End Date -->
            <div>
              <label for="endDate" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                종료일
              </label>
              <input
                id="endDate"
                v-model="formData.endDate"
                type="date"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              >
            </div>
          </div>
        </div>

        <!-- Additional Notes -->
        <div class="border-t border-gray-200 dark:border-gray-700 pt-6">
          <label for="notes" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            수정 사유 및 메모
          </label>
          <textarea
            id="notes"
            v-model="formData.notes"
            rows="3"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
            placeholder="리소스 할당 변경 사유나 추가 정보를 입력하세요..."
          ></textarea>
        </div>

        <!-- Resource Summary -->
        <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">변경 요약</h4>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span class="text-gray-600 dark:text-gray-400">CPU:</span>
              <span class="font-medium text-gray-900 dark:text-white ml-1">
                {{ allocation?.cpuCores }} → {{ formData.cpuCores || 0 }}코어
              </span>
            </div>
            <div>
              <span class="text-gray-600 dark:text-gray-400">메모리:</span>
              <span class="font-medium text-gray-900 dark:text-white ml-1">
                {{ allocation?.memoryGb }} → {{ formData.memoryGb || 0 }}GB
              </span>
            </div>
            <div>
              <span class="text-gray-600 dark:text-gray-400">스토리지:</span>
              <span class="font-medium text-gray-900 dark:text-white ml-1">
                {{ allocation?.storageTb }} → {{ formData.storageTb || 0 }}TB
              </span>
            </div>
            <div>
              <span class="text-gray-600 dark:text-gray-400">월 예산:</span>
              <span class="font-medium text-gray-900 dark:text-white ml-1">
                ₩{{ (formData.monthlyBudget || 0).toLocaleString() }}
              </span>
            </div>
          </div>
        </div>

        <!-- Modal Footer -->
        <div class="flex justify-end space-x-3 pt-6 border-t border-gray-200 dark:border-gray-700">
          <button
            type="button"
            @click="closeModal"
            class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            취소
          </button>
          <button
            type="submit"
            :disabled="!isFormValid"
            class="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            변경 사항 저장
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

// Props
interface Props {
  allocation: any
}

const props = defineProps<Props>()

// Emits
const emit = defineEmits<{
  close: []
  save: [allocationData: any]
}>()

// Form data
const formData = ref({
  cpuCores: 0,
  memoryGb: 0,
  storageTb: 0,
  monthlyBudget: 0,
  status: 'ACTIVE',
  priority: 'MEDIUM',
  autoScaling: false,
  monitoring: true,
  startDate: '',
  endDate: '',
  notes: ''
})

// Computed
const isFormValid = computed(() => {
  return formData.value.cpuCores > 0 &&
         formData.value.memoryGb > 0 &&
         formData.value.storageTb > 0 &&
         formData.value.monthlyBudget > 0
})

// Methods
const closeModal = () => {
  emit('close')
}

const getStatusClass = (status: string) => {
  const classes = {
    'ACTIVE': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    'PENDING': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    'SUSPENDED': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    'COMPLETED': 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
  }
  return classes[status as keyof typeof classes] || classes.PENDING
}

const getStatusText = (status: string) => {
  const texts = {
    'ACTIVE': '활성',
    'PENDING': '대기 중',
    'SUSPENDED': '일시 중단',
    'COMPLETED': '완료'
  }
  return texts[status as keyof typeof texts] || status
}

const handleSubmit = () => {
  if (isFormValid.value) {
    emit('save', { ...formData.value })
  }
}

// Initialize form data
onMounted(() => {
  if (props.allocation) {
    formData.value = {
      cpuCores: props.allocation.cpuCores || 0,
      memoryGb: props.allocation.memoryGb || 0,
      storageTb: props.allocation.storageTb || 0,
      monthlyBudget: props.allocation.monthlyBudget || 0,
      status: props.allocation.status || 'ACTIVE',
      priority: props.allocation.priority || 'MEDIUM',
      autoScaling: props.allocation.autoScaling || false,
      monitoring: props.allocation.monitoring || true,
      startDate: props.allocation.startDate || '',
      endDate: props.allocation.endDate || '',
      notes: ''
    }
  }
})
</script> 