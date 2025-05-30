<template>
  <div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50" @click="closeModal">
    <div class="relative top-10 mx-auto p-5 border w-11/12 md:w-4/5 lg:w-3/4 xl:w-2/3 shadow-lg rounded-md bg-white dark:bg-gray-800" @click.stop>
      <!-- Modal Header -->
      <div class="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-700">
        <div class="flex items-center space-x-4">
          <div class="h-12 w-12 rounded-lg flex items-center justify-center text-white font-bold text-lg" :style="{ backgroundColor: project.color }">
            {{ project.name.substring(0, 2).toUpperCase() }}
          </div>
          <div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">{{ project.name }}</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400">{{ project.code }}</p>
          </div>
        </div>
        <div class="flex items-center space-x-3">
          <button 
            @click="editProject"
            class="px-3 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 border border-indigo-600 rounded-md hover:bg-indigo-50 dark:hover:bg-indigo-900"
          >
            편집
          </button>
          <button @click="closeModal" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      </div>

      <!-- Modal Body -->
      <div class="mt-6 space-y-6">
        <!-- Project Status and Basic Info -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Status Card -->
          <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">프로젝트 상태</h4>
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600 dark:text-gray-400">현재 상태</span>
                <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full" :class="getStatusClass(project.status)">
                  {{ getStatusText(project.status) }}
                </span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600 dark:text-gray-400">생성일</span>
                <span class="text-sm font-medium text-gray-900 dark:text-white">{{ formatDate(project.createdAt) }}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600 dark:text-gray-400">최종 수정</span>
                <span class="text-sm font-medium text-gray-900 dark:text-white">{{ formatDate(project.updatedAt) }}</span>
              </div>
            </div>
          </div>

          <!-- Team Info -->
          <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">팀 정보</h4>
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600 dark:text-gray-400">부서</span>
                <span class="text-sm font-medium text-gray-900 dark:text-white">{{ project.department }}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600 dark:text-gray-400">팀 멤버</span>
                <span class="text-sm font-medium text-gray-900 dark:text-white">{{ project.memberCount }}명</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600 dark:text-gray-400">예상 기간</span>
                <span class="text-sm font-medium text-gray-900 dark:text-white">{{ getProjectDuration() }}</span>
              </div>
            </div>
          </div>

          <!-- Progress Info -->
          <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">진행률</h4>
            <div class="space-y-3">
              <div>
                <div class="flex items-center justify-between mb-1">
                  <span class="text-sm text-gray-600 dark:text-gray-400">전체 진행률</span>
                  <span class="text-sm font-medium text-gray-900 dark:text-white">{{ getProgressPercentage() }}%</span>
                </div>
                <div class="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                  <div class="bg-indigo-600 h-2 rounded-full transition-all duration-300" :style="{ width: getProgressPercentage() + '%' }"></div>
                </div>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600 dark:text-gray-400">완료된 작업</span>
                <span class="text-sm font-medium text-gray-900 dark:text-white">{{ getCompletedTasks() }}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600 dark:text-gray-400">남은 작업</span>
                <span class="text-sm font-medium text-gray-900 dark:text-white">{{ getRemainingTasks() }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Project Description -->
        <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
          <h4 class="text-lg font-medium text-gray-900 dark:text-white mb-3">프로젝트 설명</h4>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed">{{ project.description }}</p>
        </div>

        <!-- Project Manager -->
        <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
          <h4 class="text-lg font-medium text-gray-900 dark:text-white mb-4">프로젝트 매니저</h4>
          <div class="flex items-center space-x-4">
            <div class="h-16 w-16 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
              <span class="text-lg font-medium text-gray-700 dark:text-gray-300">{{ project.manager.name.substring(0, 2) }}</span>
            </div>
            <div class="flex-1">
              <h5 class="text-lg font-medium text-gray-900 dark:text-white">{{ project.manager.name }}</h5>
              <p class="text-gray-600 dark:text-gray-400">{{ project.manager.email }}</p>
              <div class="flex items-center space-x-4 mt-2">
                <button class="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 text-sm font-medium">
                  이메일 보내기
                </button>
                <button class="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300 text-sm font-medium">
                  프로필 보기
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Project Timeline -->
        <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
          <h4 class="text-lg font-medium text-gray-900 dark:text-white mb-4">프로젝트 타임라인</h4>
          <div class="space-y-4">
            <div v-for="milestone in getProjectMilestones()" :key="milestone.id" class="flex items-start space-x-3">
              <div class="flex-shrink-0 w-3 h-3 rounded-full mt-1" :class="milestone.completed ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'"></div>
              <div class="flex-1">
                <div class="flex items-center justify-between">
                  <h6 class="text-sm font-medium text-gray-900 dark:text-white">{{ milestone.title }}</h6>
                  <span class="text-xs text-gray-500 dark:text-gray-400">{{ milestone.date }}</span>
                </div>
                <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">{{ milestone.description }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Activities -->
        <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
          <h4 class="text-lg font-medium text-gray-900 dark:text-white mb-4">최근 활동</h4>
          <div class="space-y-3">
            <div v-for="activity in getRecentActivities()" :key="activity.id" class="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div class="flex-shrink-0 w-8 h-8 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center">
                <svg class="w-4 h-4 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div class="flex-1">
                <div class="flex items-center justify-between">
                  <p class="text-sm font-medium text-gray-900 dark:text-white">{{ activity.title }}</p>
                  <span class="text-xs text-gray-500 dark:text-gray-400">{{ activity.time }}</span>
                </div>
                <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">{{ activity.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// Props
interface Props {
  project: any
}

const props = defineProps<Props>()

// Emits
const emit = defineEmits<{
  close: []
  edit: [project: any]
}>()

// Methods
const closeModal = () => {
  emit('close')
}

const editProject = () => {
  emit('edit', props.project)
  closeModal()
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

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const getProjectDuration = () => {
  const statusDurations = {
    'ACTIVE': '3-6개월',
    'PENDING': '미정',
    'SUSPENDED': '일시 중단',
    'COMPLETED': '완료됨'
  }
  return statusDurations[props.project.status as keyof typeof statusDurations] || '미정'
}

const getProgressPercentage = () => {
  const statusProgress = {
    'PENDING': 0,
    'ACTIVE': 45,
    'SUSPENDED': 30,
    'COMPLETED': 100
  }
  return statusProgress[props.project.status as keyof typeof statusProgress] || 0
}

const getCompletedTasks = () => {
  const progress = getProgressPercentage()
  const totalTasks = Math.floor(Math.random() * 20) + 10
  return Math.floor((totalTasks * progress) / 100)
}

const getRemainingTasks = () => {
  const progress = getProgressPercentage()
  const totalTasks = Math.floor(Math.random() * 20) + 10
  return totalTasks - Math.floor((totalTasks * progress) / 100)
}

const getProjectMilestones = () => {
  return [
    {
      id: 1,
      title: '프로젝트 기획 완료',
      description: '요구사항 분석 및 프로젝트 범위 정의',
      date: '2024-01-15',
      completed: true
    },
    {
      id: 2,
      title: '설계 단계 완료',
      description: '시스템 아키텍처 및 UI/UX 설계',
      date: '2024-02-01',
      completed: props.project.status !== 'PENDING'
    },
    {
      id: 3,
      title: '개발 단계 진행 중',
      description: '핵심 기능 개발 및 테스트',
      date: '2024-03-15',
      completed: props.project.status === 'COMPLETED'
    },
    {
      id: 4,
      title: '배포 및 런칭',
      description: '프로덕션 환경 배포 및 서비스 오픈',
      date: '2024-04-01',
      completed: props.project.status === 'COMPLETED'
    }
  ]
}

const getRecentActivities = () => {
  return [
    {
      id: 1,
      title: '새로운 팀 멤버 추가',
      description: `${props.project.manager.name}님이 새로운 개발자를 팀에 추가했습니다.`,
      time: '2시간 전'
    },
    {
      id: 2,
      title: '마일스톤 업데이트',
      description: '설계 단계가 완료되어 개발 단계로 진행합니다.',
      time: '1일 전'
    },
    {
      id: 3,
      title: '프로젝트 상태 변경',
      description: `프로젝트 상태가 ${getStatusText(props.project.status)}로 변경되었습니다.`,
      time: '3일 전'
    },
    {
      id: 4,
      title: '회의 일정 등록',
      description: '주간 스프린트 리뷰 미팅이 예정되었습니다.',
      time: '5일 전'
    }
  ]
}
</script> 