<template>
  <div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50" @click="closeModal">
    <div class="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white dark:bg-gray-800" @click.stop>
      <!-- Modal Header -->
      <div class="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-700">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white">리소스 할당</h3>
        <button @click="closeModal" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <!-- Modal Body -->
      <form @submit.prevent="handleSubmit" class="mt-6 space-y-6">
        <!-- Project Selection -->
        <div>
          <label for="projectId" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            프로젝트 선택 *
          </label>
          <select
            id="projectId"
            v-model="formData.projectId"
            required
            @change="onProjectChange"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="">프로젝트를 선택하세요</option>
            <option v-for="project in projects" :key="project.id" :value="project.id">
              {{ project.name }} ({{ project.code }})
            </option>
          </select>
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
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">사용 가능: {{ availableCpuCores }}코어</p>
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
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">사용 가능: {{ availableMemoryGb }}GB</p>
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
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">사용 가능: {{ availableStorageTb }}TB</p>
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
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">예상 비용: ₩{{ formData.monthlyBudget?.toLocaleString() || 0 }}</p>
            </div>
          </div>
        </div>

        <!-- Allocation Period -->
        <div class="border-t border-gray-200 dark:border-gray-700 pt-6">
          <h4 class="text-md font-medium text-gray-900 dark:text-white mb-4">할당 기간</h4>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Start Date -->
            <div>
              <label for="startDate" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                시작일 *
              </label>
              <input
                id="startDate"
                v-model="formData.startDate"
                type="date"
                required
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              >
            </div>

            <!-- End Date -->
            <div>
              <label for="endDate" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                종료일 *
              </label>
              <input
                id="endDate"
                v-model="formData.endDate"
                type="date"
                required
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              >
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
        </div>

        <!-- Additional Notes -->
        <div class="border-t border-gray-200 dark:border-gray-700 pt-6">
          <label for="notes" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            추가 메모
          </label>
          <textarea
            id="notes"
            v-model="formData.notes"
            rows="3"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
            placeholder="리소스 할당에 대한 추가 정보를 입력하세요..."
          ></textarea>
        </div>

        <!-- Resource Summary -->
        <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">할당 요약</h4>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span class="text-gray-600 dark:text-gray-400">CPU:</span>
              <span class="font-medium text-gray-900 dark:text-white ml-1">{{ formData.cpuCores || 0 }}코어</span>
            </div>
            <div>
              <span class="text-gray-600 dark:text-gray-400">메모리:</span>
              <span class="font-medium text-gray-900 dark:text-white ml-1">{{ formData.memoryGb || 0 }}GB</span>
            </div>
            <div>
              <span class="text-gray-600 dark:text-gray-400">스토리지:</span>
              <span class="font-medium text-gray-900 dark:text-white ml-1">{{ formData.storageTb || 0 }}TB</span>
            </div>
            <div>
              <span class="text-gray-600 dark:text-gray-400">월 예산:</span>
              <span class="font-medium text-gray-900 dark:text-white ml-1">₩{{ (formData.monthlyBudget || 0).toLocaleString() }}</span>
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
            리소스 할당
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// Props
interface Props {
  projects: any[]
}

const props = defineProps<Props>()

// Emits
const emit = defineEmits<{
  close: []
  allocate: [allocationData: any]
}>()

// Form data
const formData = ref({
  projectId: '',
  cpuCores: 8,
  memoryGb: 32,
  storageTb: 1,
  monthlyBudget: 1000000,
  startDate: new Date().toISOString().split('T')[0],
  endDate: '',
  autoScaling: false,
  notes: ''
})

// Available resources (mock data)
const availableCpuCores = ref(64)
const availableMemoryGb = ref(256)
const availableStorageTb = ref(20)

// Computed
const isFormValid = computed(() => {
  return formData.value.projectId !== '' &&
         formData.value.cpuCores > 0 &&
         formData.value.memoryGb > 0 &&
         formData.value.storageTb > 0 &&
         formData.value.monthlyBudget > 0 &&
         formData.value.startDate !== '' &&
         formData.value.endDate !== ''
})

// Methods
const closeModal = () => {
  emit('close')
}

const onProjectChange = () => {
  const selectedProject = props.projects.find(p => p.id === formData.value.projectId)
  if (selectedProject) {
    // Set default end date to 3 months from start date
    const startDate = new Date(formData.value.startDate)
    const endDate = new Date(startDate)
    endDate.setMonth(endDate.getMonth() + 3)
    formData.value.endDate = endDate.toISOString().split('T')[0]
  }
}

const handleSubmit = () => {
  if (isFormValid.value) {
    const selectedProject = props.projects.find(p => p.id === formData.value.projectId)
    const allocationData = {
      ...formData.value,
      name: selectedProject?.name,
      code: selectedProject?.code,
      department: selectedProject?.department,
      color: selectedProject?.color || '#4F46E5'
    }
    emit('allocate', allocationData)
  }
}

// Set default end date
const today = new Date()
const defaultEndDate = new Date(today)
defaultEndDate.setMonth(defaultEndDate.getMonth() + 3)
formData.value.endDate = defaultEndDate.toISOString().split('T')[0]
</script> 