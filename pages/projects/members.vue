<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">멤버 관리</h1>
        <p class="text-gray-600 dark:text-gray-400 mt-1">프로젝트별 멤버를 관리하고 역할을 할당합니다.</p>
      </div>
      <button 
        @click="showInviteModal = true"
        class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-150 flex items-center space-x-2"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
        </svg>
        <span>멤버 초대</span>
      </button>
    </div>

    <!-- Statistics Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div class="flex items-center">
          <div class="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
            <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">전체 멤버</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ totalMembers }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div class="flex items-center">
          <div class="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
            <svg class="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">활성 멤버</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ activeMembers }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div class="flex items-center">
          <div class="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
            <svg class="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">활성 프로젝트</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ activeProjects }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div class="flex items-center">
          <div class="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
            <svg class="w-6 h-6 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">대기 중인 초대</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ pendingInvitations }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters and Search -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div class="flex flex-col sm:flex-row gap-4">
        <!-- Search -->
        <div class="flex-1">
          <div class="relative">
            <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="이름, 이메일, 역할로 검색..."
              class="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
          </div>
        </div>

        <!-- Project Filter -->
        <select 
          v-model="selectedProject"
          class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
        >
          <option value="">모든 프로젝트</option>
          <option v-for="project in projects" :key="project.id" :value="project.id">{{ project.name }}</option>
        </select>

        <!-- Role Filter -->
        <select 
          v-model="selectedRole"
          class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
        >
          <option value="">모든 역할</option>
          <option value="PROJECT_MANAGER">프로젝트 매니저</option>
          <option value="TECH_LEAD">기술 리드</option>
          <option value="SENIOR_DEVELOPER">시니어 개발자</option>
          <option value="DEVELOPER">개발자</option>
          <option value="DESIGNER">디자이너</option>
          <option value="QA">QA</option>
        </select>

        <!-- Status Filter -->
        <select 
          v-model="selectedStatus"
          class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
        >
          <option value="">모든 상태</option>
          <option value="ACTIVE">활성</option>
          <option value="INACTIVE">비활성</option>
          <option value="PENDING">대기 중</option>
        </select>
      </div>
    </div>

    <!-- Members Table -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white">멤버 목록</h3>
      </div>
      
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead class="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer" @click="sortBy('name')">
                멤버
                <svg v-if="sortField === 'name'" class="inline w-4 h-4 ml-1" :class="sortDirection === 'asc' ? 'transform rotate-180' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">프로젝트</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer" @click="sortBy('role')">
                역할
                <svg v-if="sortField === 'role'" class="inline w-4 h-4 ml-1" :class="sortDirection === 'asc' ? 'transform rotate-180' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">부서</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer" @click="sortBy('status')">
                상태
                <svg v-if="sortField === 'status'" class="inline w-4 h-4 ml-1" :class="sortDirection === 'asc' ? 'transform rotate-180' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer" @click="sortBy('joinedAt')">
                참여일
                <svg v-if="sortField === 'joinedAt'" class="inline w-4 h-4 ml-1" :class="sortDirection === 'asc' ? 'transform rotate-180' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">액션</th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="member in paginatedMembers" :key="member.id" class="hover:bg-gray-50 dark:hover:bg-gray-700">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10">
                    <div class="h-10 w-10 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                      <span class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ member.name.substring(0, 2) }}</span>
                    </div>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900 dark:text-white">{{ member.name }}</div>
                    <div class="text-sm text-gray-500 dark:text-gray-400">{{ member.email }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900 dark:text-white">{{ getProjectName(member.projectId) }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full" :class="getRoleClass(member.role)">
                  {{ getRoleText(member.role) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900 dark:text-white">{{ member.department }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full" :class="getStatusClass(member.status)">
                  {{ getStatusText(member.status) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {{ formatDate(member.joinedAt) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="flex justify-end space-x-2">
                  <button 
                    @click="viewMember(member)"
                    class="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                  >
                    보기
                  </button>
                  <button 
                    @click="editMember(member)"
                    class="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300"
                  >
                    편집
                  </button>
                  <button 
                    @click="removeMember(member)"
                    class="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                  >
                    제거
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="bg-white dark:bg-gray-800 px-4 py-3 border-t border-gray-200 dark:border-gray-700 sm:px-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <p class="text-sm text-gray-700 dark:text-gray-300">
              <span class="font-medium">{{ (currentPage - 1) * itemsPerPage + 1 }}</span>
              -
              <span class="font-medium">{{ Math.min(currentPage * itemsPerPage, filteredMembers.length) }}</span>
              of
              <span class="font-medium">{{ filteredMembers.length }}</span>
              결과
            </p>
            <select 
              v-model="itemsPerPage" 
              class="ml-4 px-3 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm dark:bg-gray-700 dark:text-white"
            >
              <option :value="10">10개씩</option>
              <option :value="25">25개씩</option>
              <option :value="50">50개씩</option>
            </select>
          </div>
          <div class="flex space-x-2">
            <button 
              @click="currentPage--" 
              :disabled="currentPage === 1"
              class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              이전
            </button>
            <button 
              @click="currentPage++" 
              :disabled="currentPage >= totalPages"
              class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              다음
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Invite Member Modal -->
    <MemberInviteModal 
      v-if="showInviteModal"
      :projects="projects"
      @close="showInviteModal = false"
      @invite="inviteMember"
    />

    <!-- Member Detail Modal -->
    <MemberDetailModal 
      v-if="showDetailModal"
      :member="selectedMember"
      :project="getProjectById(selectedMember?.projectId)"
      @close="showDetailModal = false"
      @edit="editMember"
    />

    <!-- Edit Member Modal -->
    <MemberEditModal 
      v-if="showEditModal"
      :member="selectedMember"
      :projects="projects"
      @close="closeEditModal"
      @save="saveMember"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

// Types
interface Project {
  id: string
  name: string
  code: string
  department: string
}

interface Member {
  id: string
  name: string
  email: string
  projectId: string
  role: string
  department: string
  status: 'ACTIVE' | 'INACTIVE' | 'PENDING'
  joinedAt: string
}

// Reactive data
const members = ref<Member[]>([])
const projects = ref<Project[]>([])
const searchQuery = ref('')
const selectedProject = ref('')
const selectedRole = ref('')
const selectedStatus = ref('')
const sortField = ref('joinedAt')
const sortDirection = ref<'asc' | 'desc'>('desc')
const currentPage = ref(1)
const itemsPerPage = ref(10)

// Modal states
const showInviteModal = ref(false)
const showDetailModal = ref(false)
const showEditModal = ref(false)
const selectedMember = ref<Member | null>(null)

// Computed properties
const filteredMembers = computed(() => {
  let filtered = members.value

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(member => 
      member.name.toLowerCase().includes(query) ||
      member.email.toLowerCase().includes(query) ||
      getRoleText(member.role).toLowerCase().includes(query)
    )
  }

  if (selectedProject.value) {
    filtered = filtered.filter(member => member.projectId === selectedProject.value)
  }

  if (selectedRole.value) {
    filtered = filtered.filter(member => member.role === selectedRole.value)
  }

  if (selectedStatus.value) {
    filtered = filtered.filter(member => member.status === selectedStatus.value)
  }

  // Sort
  filtered.sort((a, b) => {
    let aValue = a[sortField.value as keyof Member]
    let bValue = b[sortField.value as keyof Member]

    if (typeof aValue === 'string') aValue = aValue.toLowerCase()
    if (typeof bValue === 'string') bValue = bValue.toLowerCase()

    if (sortDirection.value === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
    }
  })

  return filtered
})

const paginatedMembers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredMembers.value.slice(start, end)
})

const totalPages = computed(() => {
  return Math.ceil(filteredMembers.value.length / itemsPerPage.value)
})

const totalMembers = computed(() => members.value.length)
const activeMembers = computed(() => members.value.filter(m => m.status === 'ACTIVE').length)
const activeProjects = computed(() => new Set(members.value.filter(m => m.status === 'ACTIVE').map(m => m.projectId)).size)
const pendingInvitations = computed(() => members.value.filter(m => m.status === 'PENDING').length)

// Methods
const sortBy = (field: string) => {
  if (sortField.value === field) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortField.value = field
    sortDirection.value = 'asc'
  }
}

const getProjectName = (projectId: string) => {
  const project = projects.value.find(p => p.id === projectId)
  return project ? project.name : '알 수 없음'
}

const getProjectById = (projectId?: string) => {
  return projects.value.find(p => p.id === projectId) || null
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

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('ko-KR')
}

const viewMember = (member: Member) => {
  selectedMember.value = member
  showDetailModal.value = true
}

const editMember = (member: Member) => {
  selectedMember.value = member
  showEditModal.value = true
}

const removeMember = (member: Member) => {
  if (confirm(`"${member.name}" 멤버를 프로젝트에서 제거하시겠습니까?`)) {
    members.value = members.value.filter(m => m.id !== member.id)
  }
}

const closeEditModal = () => {
  showEditModal.value = false
  selectedMember.value = null
}

const inviteMember = (memberData: any) => {
  const newMember: Member = {
    id: `member-${Date.now()}`,
    name: memberData.name,
    email: memberData.email,
    projectId: memberData.projectId,
    role: memberData.role,
    department: memberData.department,
    status: 'PENDING',
    joinedAt: new Date().toISOString()
  }
  members.value.push(newMember)
  showInviteModal.value = false
}

const saveMember = (memberData: any) => {
  if (selectedMember.value) {
    const index = members.value.findIndex(m => m.id === selectedMember.value!.id)
    if (index !== -1) {
      members.value[index] = { ...members.value[index], ...memberData }
    }
  }
  closeEditModal()
}

// Initialize dummy data
const initializeData = () => {
  projects.value = [
    { id: 'proj-001', name: 'AI 챗봇 개발', code: 'AI-CHAT-001', department: 'AI Research' },
    { id: 'proj-002', name: '데이터 분석 플랫폼', code: 'DATA-PLATFORM-002', department: 'Data Science' },
    { id: 'proj-003', name: '모바일 앱 리뉴얼', code: 'MOBILE-RENEWAL-003', department: 'Engineering' },
    { id: 'proj-004', name: '클라우드 마이그레이션', code: 'CLOUD-MIG-004', department: 'Engineering' },
    { id: 'proj-007', name: '신제품 개발', code: 'NEW-PROD-007', department: 'Product' }
  ]

  members.value = [
    {
      id: 'member-001',
      name: '김철수',
      email: 'kim.cs@company.com',
      projectId: 'proj-001',
      role: 'PROJECT_MANAGER',
      department: 'AI Research',
      status: 'ACTIVE',
      joinedAt: '2024-01-15T09:00:00Z'
    },
    {
      id: 'member-002',
      name: '이영희',
      email: 'lee.yh@company.com',
      projectId: 'proj-002',
      role: 'PROJECT_MANAGER',
      department: 'Data Science',
      status: 'ACTIVE',
      joinedAt: '2024-01-10T10:00:00Z'
    },
    {
      id: 'member-003',
      name: '박민수',
      email: 'park.ms@company.com',
      projectId: 'proj-003',
      role: 'PROJECT_MANAGER',
      department: 'Engineering',
      status: 'ACTIVE',
      joinedAt: '2024-01-20T11:30:00Z'
    },
    {
      id: 'member-004',
      name: '정수진',
      email: 'jung.sj@company.com',
      projectId: 'proj-004',
      role: 'TECH_LEAD',
      department: 'Engineering',
      status: 'ACTIVE',
      joinedAt: '2024-01-05T08:00:00Z'
    },
    {
      id: 'member-005',
      name: '최지원',
      email: 'choi.jw@company.com',
      projectId: 'proj-001',
      role: 'SENIOR_DEVELOPER',
      department: 'AI Research',
      status: 'ACTIVE',
      joinedAt: '2024-01-16T14:00:00Z'
    },
    {
      id: 'member-006',
      name: '한동욱',
      email: 'han.dw@company.com',
      projectId: 'proj-002',
      role: 'DEVELOPER',
      department: 'Data Science',
      status: 'ACTIVE',
      joinedAt: '2024-01-12T09:00:00Z'
    },
    {
      id: 'member-007',
      name: '송미경',
      email: 'song.mk@company.com',
      projectId: 'proj-007',
      role: 'PROJECT_MANAGER',
      department: 'Product',
      status: 'ACTIVE',
      joinedAt: '2024-01-08T10:30:00Z'
    },
    {
      id: 'member-008',
      name: '임태현',
      email: 'lim.th@company.com',
      projectId: 'proj-003',
      role: 'DESIGNER',
      department: 'Engineering',
      status: 'PENDING',
      joinedAt: '2024-01-22T15:00:00Z'
    },
    {
      id: 'member-009',
      name: '윤서연',
      email: 'yoon.sy@company.com',
      projectId: 'proj-001',
      role: 'QA',
      department: 'AI Research',
      status: 'ACTIVE',
      joinedAt: '2024-01-18T11:00:00Z'
    },
    {
      id: 'member-010',
      name: '강민호',
      email: 'kang.mh@company.com',
      projectId: 'proj-004',
      role: 'DEVELOPER',
      department: 'Engineering',
      status: 'INACTIVE',
      joinedAt: '2024-01-07T13:30:00Z'
    }
  ]
}

onMounted(() => {
  initializeData()
})
</script> 