<template>
  <div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50" @click="closeModal">
    <div class="relative top-10 mx-auto p-5 border w-11/12 md:w-4/5 lg:w-3/4 xl:w-2/3 shadow-lg rounded-md bg-white dark:bg-gray-800" @click.stop>
      <!-- Modal Header -->
      <div class="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-700">
        <div class="flex items-center space-x-4">
          <div class="h-12 w-12 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
            <span class="text-lg font-medium text-gray-700 dark:text-gray-300">{{ member.name.substring(0, 2) }}</span>
          </div>
          <div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">{{ member.name }}</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400">{{ member.email }}</p>
          </div>
        </div>
        <div class="flex items-center space-x-3">
          <button 
            @click="editMember"
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
        <!-- Member Status and Basic Info -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Status Card -->
          <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">멤버 상태</h4>
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600 dark:text-gray-400">현재 상태</span>
                <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full" :class="getStatusClass(member.status)">
                  {{ getStatusText(member.status) }}
                </span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600 dark:text-gray-400">참여일</span>
                <span class="text-sm font-medium text-gray-900 dark:text-white">{{ formatDate(member.joinedAt) }}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600 dark:text-gray-400">부서</span>
                <span class="text-sm font-medium text-gray-900 dark:text-white">{{ member.department }}</span>
              </div>
            </div>
          </div>

          <!-- Role Info -->
          <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">역할 정보</h4>
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600 dark:text-gray-400">현재 역할</span>
                <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full" :class="getRoleClass(member.role)">
                  {{ getRoleText(member.role) }}
                </span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600 dark:text-gray-400">권한 레벨</span>
                <span class="text-sm font-medium text-gray-900 dark:text-white">{{ getRoleLevel(member.role) }}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600 dark:text-gray-400">접근 권한</span>
                <span class="text-sm font-medium text-gray-900 dark:text-white">{{ getAccessLevel(member.role) }}</span>
              </div>
            </div>
          </div>

          <!-- Project Info -->
          <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">프로젝트 정보</h4>
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600 dark:text-gray-400">프로젝트</span>
                <span class="text-sm font-medium text-gray-900 dark:text-white">{{ project?.name || '알 수 없음' }}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600 dark:text-gray-400">프로젝트 코드</span>
                <span class="text-sm font-medium text-gray-900 dark:text-white">{{ project?.code || 'N/A' }}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600 dark:text-gray-400">기여도</span>
                <span class="text-sm font-medium text-gray-900 dark:text-white">{{ getContributionLevel() }}%</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Contact Information -->
        <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
          <h4 class="text-lg font-medium text-gray-900 dark:text-white mb-4">연락처 정보</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">이메일</label>
              <div class="flex items-center space-x-3">
                <span class="text-sm text-gray-900 dark:text-white">{{ member.email }}</span>
                <button class="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 text-sm font-medium">
                  이메일 보내기
                </button>
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">전화번호</label>
              <span class="text-sm text-gray-900 dark:text-white">{{ getPhoneNumber() }}</span>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Slack</label>
              <span class="text-sm text-gray-900 dark:text-white">@{{ member.name.toLowerCase().replace(' ', '.') }}</span>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">위치</label>
              <span class="text-sm text-gray-900 dark:text-white">{{ getLocation() }}</span>
            </div>
          </div>
        </div>

        <!-- Skills and Expertise -->
        <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
          <h4 class="text-lg font-medium text-gray-900 dark:text-white mb-4">기술 스택 & 전문 분야</h4>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">주요 기술</label>
              <div class="flex flex-wrap gap-2">
                <span v-for="skill in getSkills()" :key="skill" class="inline-flex px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 rounded-full">
                  {{ skill }}
                </span>
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">전문 분야</label>
              <div class="flex flex-wrap gap-2">
                <span v-for="expertise in getExpertise()" :key="expertise" class="inline-flex px-3 py-1 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 rounded-full">
                  {{ expertise }}
                </span>
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
// Props
interface Props {
  member: any
  project?: any
}

const props = defineProps<Props>()

// Emits
const emit = defineEmits<{
  close: []
  edit: [member: any]
}>()

// Methods
const closeModal = () => {
  emit('close')
}

const editMember = () => {
  emit('edit', props.member)
  closeModal()
}

const getStatusClass = (status: string) => {
  const classes = {
    'ACTIVE': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    'INACTIVE': 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
    'PENDING': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
  }
  return classes[status as keyof typeof classes] || classes.PENDING
}

const getStatusText = (status: string) => {
  const texts = {
    'ACTIVE': '활성',
    'INACTIVE': '비활성',
    'PENDING': '대기 중'
  }
  return texts[status as keyof typeof texts] || status
}

const getRoleClass = (role: string) => {
  const classes = {
    'PROJECT_MANAGER': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
    'TECH_LEAD': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    'SENIOR_DEVELOPER': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    'DEVELOPER': 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
    'DESIGNER': 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300',
    'QA': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
  }
  return classes[role as keyof typeof classes] || classes.DEVELOPER
}

const getRoleText = (role: string) => {
  const texts = {
    'PROJECT_MANAGER': '프로젝트 매니저',
    'TECH_LEAD': '기술 리드',
    'SENIOR_DEVELOPER': '시니어 개발자',
    'DEVELOPER': '개발자',
    'DESIGNER': '디자이너',
    'QA': 'QA'
  }
  return texts[role as keyof typeof texts] || role
}

const getRoleLevel = (role: string) => {
  const levels = {
    'PROJECT_MANAGER': 'Level 5',
    'TECH_LEAD': 'Level 4',
    'SENIOR_DEVELOPER': 'Level 3',
    'DEVELOPER': 'Level 2',
    'DESIGNER': 'Level 2',
    'QA': 'Level 2'
  }
  return levels[role as keyof typeof levels] || 'Level 1'
}

const getAccessLevel = (role: string) => {
  const access = {
    'PROJECT_MANAGER': 'Full Access',
    'TECH_LEAD': 'Admin',
    'SENIOR_DEVELOPER': 'Write',
    'DEVELOPER': 'Write',
    'DESIGNER': 'Write',
    'QA': 'Read/Write'
  }
  return access[role as keyof typeof access] || 'Read Only'
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const getContributionLevel = () => {
  const contributions = {
    'PROJECT_MANAGER': 95,
    'TECH_LEAD': 88,
    'SENIOR_DEVELOPER': 82,
    'DEVELOPER': 75,
    'DESIGNER': 78,
    'QA': 85
  }
  return contributions[props.member.role as keyof typeof contributions] || 70
}

const getPhoneNumber = () => {
  return '+82-10-' + Math.floor(Math.random() * 9000 + 1000) + '-' + Math.floor(Math.random() * 9000 + 1000)
}

const getLocation = () => {
  const locations = ['서울 본사', '판교 오피스', '부산 지사', '재택근무']
  return locations[Math.floor(Math.random() * locations.length)]
}

const getSkills = () => {
  const skillSets = {
    'PROJECT_MANAGER': ['Project Management', 'Agile', 'Scrum', 'Leadership'],
    'TECH_LEAD': ['Architecture', 'System Design', 'Microservices', 'DevOps'],
    'SENIOR_DEVELOPER': ['Vue.js', 'Node.js', 'TypeScript', 'AWS'],
    'DEVELOPER': ['JavaScript', 'Python', 'React', 'Git'],
    'DESIGNER': ['Figma', 'Sketch', 'Adobe XD', 'Prototyping'],
    'QA': ['Test Automation', 'Selenium', 'Jest', 'Quality Assurance']
  }
  return skillSets[props.member.role as keyof typeof skillSets] || ['General Skills']
}

const getExpertise = () => {
  const expertiseSets = {
    'PROJECT_MANAGER': ['팀 관리', '일정 관리', '리스크 관리'],
    'TECH_LEAD': ['시스템 아키텍처', '기술 전략', '코드 리뷰'],
    'SENIOR_DEVELOPER': ['풀스택 개발', '성능 최적화', '멘토링'],
    'DEVELOPER': ['웹 개발', 'API 개발', '데이터베이스'],
    'DESIGNER': ['UI/UX 디자인', '사용자 경험', '디자인 시스템'],
    'QA': ['테스트 전략', '품질 보증', '자동화 테스트']
  }
  return expertiseSets[props.member.role as keyof typeof expertiseSets] || ['일반 업무']
}

const getRecentActivities = () => {
  return [
    {
      id: 1,
      title: '코드 리뷰 완료',
      description: `${props.project?.name || '프로젝트'}의 새로운 기능에 대한 코드 리뷰를 완료했습니다.`,
      time: '2시간 전'
    },
    {
      id: 2,
      title: '회의 참석',
      description: '주간 스프린트 계획 회의에 참석했습니다.',
      time: '1일 전'
    },
    {
      id: 3,
      title: '작업 완료',
      description: '할당된 태스크를 성공적으로 완료했습니다.',
      time: '2일 전'
    },
    {
      id: 4,
      title: '문서 업데이트',
      description: '프로젝트 문서를 최신 상태로 업데이트했습니다.',
      time: '3일 전'
    }
  ]
}
</script> 