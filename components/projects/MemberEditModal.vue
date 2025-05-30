<template>
  <div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50" @click="closeModal">
    <div class="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white dark:bg-gray-800" @click.stop>
      <!-- Modal Header -->
      <div class="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-700">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white">멤버 정보 편집</h3>
        <button @click="closeModal" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <!-- Modal Body -->
      <form @submit.prevent="handleSubmit" class="mt-6 space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Member Name -->
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              이름 *
            </label>
            <input
              id="name"
              v-model="formData.name"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              placeholder="멤버 이름을 입력하세요"
            >
          </div>

          <!-- Email -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              이메일 *
            </label>
            <input
              id="email"
              v-model="formData.email"
              type="email"
              required
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              placeholder="이메일 주소를 입력하세요"
            >
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Project -->
          <div>
            <label for="projectId" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              프로젝트 *
            </label>
            <select
              id="projectId"
              v-model="formData.projectId"
              required
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="">프로젝트를 선택하세요</option>
              <option v-for="project in projects" :key="project.id" :value="project.id">{{ project.name }}</option>
            </select>
          </div>

          <!-- Role -->
          <div>
            <label for="role" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              역할 *
            </label>
            <select
              id="role"
              v-model="formData.role"
              required
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="">역할을 선택하세요</option>
              <option value="PROJECT_MANAGER">프로젝트 매니저</option>
              <option value="TECH_LEAD">기술 리드</option>
              <option value="SENIOR_DEVELOPER">시니어 개발자</option>
              <option value="DEVELOPER">개발자</option>
              <option value="DESIGNER">디자이너</option>
              <option value="QA">QA</option>
            </select>
          </div>
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
              <option value="ACTIVE">활성</option>
              <option value="INACTIVE">비활성</option>
              <option value="PENDING">대기 중</option>
            </select>
          </div>
        </div>

        <!-- Additional Information -->
        <div class="border-t border-gray-200 dark:border-gray-700 pt-6">
          <h4 class="text-md font-medium text-gray-900 dark:text-white mb-4">추가 정보</h4>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Phone Number -->
            <div>
              <label for="phone" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                전화번호
              </label>
              <input
                id="phone"
                v-model="formData.phone"
                type="tel"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                placeholder="010-0000-0000"
              >
            </div>

            <!-- Location -->
            <div>
              <label for="location" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                근무 위치
              </label>
              <select
                id="location"
                v-model="formData.location"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="">위치를 선택하세요</option>
                <option value="서울 본사">서울 본사</option>
                <option value="판교 오피스">판교 오피스</option>
                <option value="부산 지사">부산 지사</option>
                <option value="재택근무">재택근무</option>
              </select>
            </div>
          </div>

          <!-- Skills -->
          <div class="mt-6">
            <label for="skills" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              기술 스택 (쉼표로 구분)
            </label>
            <input
              id="skills"
              v-model="formData.skills"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              placeholder="예: JavaScript, Vue.js, Node.js, AWS"
            >
          </div>

          <!-- Notes -->
          <div class="mt-6">
            <label for="notes" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              메모
            </label>
            <textarea
              id="notes"
              v-model="formData.notes"
              rows="3"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              placeholder="추가 메모사항을 입력하세요..."
            ></textarea>
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
            저장
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
  member: any
  projects: any[]
}

const props = defineProps<Props>()

// Emits
const emit = defineEmits<{
  close: []
  save: [memberData: any]
}>()

// Form data
const formData = ref({
  name: '',
  email: '',
  projectId: '',
  role: '',
  department: '',
  status: 'ACTIVE',
  phone: '',
  location: '',
  skills: '',
  notes: ''
})

// Computed
const isFormValid = computed(() => {
  return formData.value.name.trim() !== '' &&
         formData.value.email.trim() !== '' &&
         formData.value.projectId !== '' &&
         formData.value.role !== '' &&
         formData.value.department !== ''
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
  if (props.member) {
    formData.value = {
      name: props.member.name || '',
      email: props.member.email || '',
      projectId: props.member.projectId || '',
      role: props.member.role || '',
      department: props.member.department || '',
      status: props.member.status || 'ACTIVE',
      phone: props.member.phone || '',
      location: props.member.location || '',
      skills: props.member.skills || '',
      notes: props.member.notes || ''
    }
  }
})
</script> 