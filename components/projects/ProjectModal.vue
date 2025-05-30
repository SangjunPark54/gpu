<template>
  <div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50" @click="closeModal">
    <div class="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white dark:bg-gray-800" @click.stop>
      <!-- Modal Header -->
      <div class="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-700">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white">
          {{ isEdit ? '프로젝트 편집' : '새 프로젝트 생성' }}
        </h3>
        <button @click="closeModal" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <!-- Modal Body -->
      <form @submit.prevent="handleSubmit" class="mt-6 space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Project Name -->
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              프로젝트명 *
            </label>
            <input
              id="name"
              v-model="formData.name"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              placeholder="프로젝트 이름을 입력하세요"
            >
          </div>

          <!-- Project Code -->
          <div>
            <label for="code" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              프로젝트 코드 *
            </label>
            <input
              id="code"
              v-model="formData.code"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              placeholder="예: PROJ-001"
            >
          </div>
        </div>

        <!-- Description -->
        <div>
          <label for="description" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            프로젝트 설명 *
          </label>
          <textarea
            id="description"
            v-model="formData.description"
            rows="3"
            required
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
            placeholder="프로젝트에 대한 상세 설명을 입력하세요"
          ></textarea>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Department -->
          <div>
            <label for="department" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              부서 *
            </label>
            <select
              id="department"
              v-model="formData.department"
              required
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="">부서를 선택하세요</option>
              <option value="AI Research">AI Research</option>
              <option value="Data Science">Data Science</option>
              <option value="Engineering">Engineering</option>
              <option value="Product">Product</option>
              <option value="Marketing">Marketing</option>
              <option value="Operations">Operations</option>
              <option value="Finance">Finance</option>
            </select>
          </div>

          <!-- Status -->
          <div>
            <label for="status" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              상태 *
            </label>
            <select
              id="status"
              v-model="formData.status"
              required
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="PENDING">대기 중</option>
              <option value="ACTIVE">활성</option>
              <option value="SUSPENDED">일시 중단</option>
              <option value="COMPLETED">완료</option>
            </select>
          </div>
        </div>

        <!-- Project Manager -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            프로젝트 매니저 *
          </label>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input
                v-model="formData.manager.name"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                placeholder="매니저 이름"
              >
            </div>
            <div>
              <input
                v-model="formData.manager.email"
                type="email"
                required
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                placeholder="매니저 이메일"
              >
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Member Count -->
          <div>
            <label for="memberCount" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              예상 멤버 수
            </label>
            <input
              id="memberCount"
              v-model.number="formData.memberCount"
              type="number"
              min="1"
              max="100"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              placeholder="1"
            >
          </div>

          <!-- Project Color -->
          <div>
            <label for="color" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              프로젝트 색상
            </label>
            <div class="flex items-center space-x-3">
              <input
                id="color"
                v-model="formData.color"
                type="color"
                class="w-12 h-10 border border-gray-300 dark:border-gray-600 rounded cursor-pointer"
              >
              <input
                v-model="formData.color"
                type="text"
                class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                placeholder="#4F46E5"
              >
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
            {{ isEdit ? '수정' : '생성' }}
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
  project?: any
  isEdit?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  project: null,
  isEdit: false
})

// Emits
const emit = defineEmits<{
  close: []
  save: [projectData: any]
}>()

// Form data
const formData = ref({
  name: '',
  code: '',
  description: '',
  department: '',
  status: 'PENDING',
  manager: {
    id: '',
    name: '',
    email: ''
  },
  memberCount: 1,
  color: '#4F46E5'
})

// Computed
const isFormValid = computed(() => {
  return formData.value.name.trim() !== '' &&
         formData.value.code.trim() !== '' &&
         formData.value.description.trim() !== '' &&
         formData.value.department !== '' &&
         formData.value.manager.name.trim() !== '' &&
         formData.value.manager.email.trim() !== ''
})

// Methods
const closeModal = () => {
  emit('close')
}

const handleSubmit = () => {
  if (isFormValid.value) {
    emit('save', { ...formData.value })
  }
}

// Initialize form data
onMounted(() => {
  if (props.isEdit && props.project) {
    formData.value = {
      name: props.project.name || '',
      code: props.project.code || '',
      description: props.project.description || '',
      department: props.project.department || '',
      status: props.project.status || 'PENDING',
      manager: {
        id: props.project.manager?.id || '',
        name: props.project.manager?.name || '',
        email: props.project.manager?.email || ''
      },
      memberCount: props.project.memberCount || 1,
      color: props.project.color || '#4F46E5'
    }
  }
})
</script> 