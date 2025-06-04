<template>
  <div class="p-6">
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Projects</h1>
      <p class="text-gray-600 dark:text-gray-400 mt-2">ZCP 플랫폼의 프로젝트를 관리합니다.</p>
    </div>

    <!-- Projects Overview -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div class="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <svg class="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                </svg>
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">총 프로젝트</dt>
                <dd class="text-lg font-medium text-gray-900 dark:text-white">{{ stats.totalProjects }}</dd>
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
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">활성 프로젝트</dt>
                <dd class="text-lg font-medium text-gray-900 dark:text-white">{{ stats.activeProjects }}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                <svg class="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
                </svg>
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">팀 멤버</dt>
                <dd class="text-lg font-medium text-gray-900 dark:text-white">{{ stats.teamMembers }}</dd>
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
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                </svg>
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">배포 수</dt>
                <dd class="text-lg font-medium text-gray-900 dark:text-white">{{ stats.deployments }}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Projects Table -->
    <div class="bg-white dark:bg-gray-800 shadow rounded-lg">
      <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white">프로젝트 목록</h3>
          <button class="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700">
            새 프로젝트 생성
          </button>
        </div>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead class="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">프로젝트 이름</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">환경</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">클러스터</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">상태</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">마지막 배포</th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">작업</th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="project in projects" :key="project.id" class="hover:bg-gray-50 dark:hover:bg-gray-700">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="w-8 h-8 rounded-full flex items-center justify-center" :class="getProjectIconClass(project.type)">
                    <span class="text-white font-medium text-xs">{{ project.name.charAt(0) }}</span>
                  </div>
                  <div class="ml-3">
                    <div class="text-sm font-medium text-gray-900 dark:text-white">{{ project.name }}</div>
                    <div class="text-sm text-gray-500 dark:text-gray-400">{{ project.description }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full" :class="getEnvironmentClass(project.environment)">
                  {{ project.environment }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{{ project.cluster }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full" :class="getStatusClass(project.status)">
                  {{ project.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{{ project.lastDeploy }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="flex items-center justify-end space-x-2">
                  <button class="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400">관리</button>
                  <button class="text-blue-600 hover:text-blue-900 dark:text-blue-400">배포</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

useHead({
  title: 'Projects - AXMP'
})

const stats = ref({
  totalProjects: 12,
  activeProjects: 10,
  teamMembers: 45,
  deployments: 128
})

const projects = ref([
  { id: 1, name: 'frontend-webapp', displayName: 'Frontend Web App', description: 'Main customer portal', environment: 'Production', cluster: 'prod-cluster-01', status: 'Running', lastDeploy: '2024-01-15', type: 'web' },
  { id: 2, name: 'api-service', displayName: 'API Service', description: 'Core API microservice', environment: 'Production', cluster: 'prod-cluster-01', status: 'Running', lastDeploy: '2024-01-14', type: 'api' },
  { id: 3, name: 'mobile-backend', displayName: 'Mobile Backend', description: 'Mobile app backend service', environment: 'Staging', cluster: 'staging-cluster', status: 'Running', lastDeploy: '2024-01-13', type: 'mobile' },
  { id: 4, name: 'data-processor', displayName: 'Data Processor', description: 'Batch data processing service', environment: 'Development', cluster: 'dev-cluster', status: 'Development', lastDeploy: '2024-01-12', type: 'service' }
])

// Edit Modal State
const showEditModal = ref(false)
const selectedProject = ref<any>(null)
const activeEditTab = ref('general')

// Edit Tabs Configuration for Project
const editTabs = [
  { id: 'general', name: 'General' },
  { id: 'resources', name: 'Resources' },
  { id: 'members', name: 'Members' },
  { id: 'deployments', name: 'Deployments' },
  { id: 'settings', name: 'Settings' }
]

// Edit Form Data for Project
interface ProjectFormData {
  general: {
    projectName: string
    displayName: string
    description: string
    cluster: string
  }
  resources: {
    cpuLimit: number
    memoryLimit: number
  }
}

const editForm = ref<ProjectFormData>({
  general: {
    projectName: '',
    displayName: '',
    description: '',
    cluster: ''
  },
  resources: {
    cpuLimit: 0,
    memoryLimit: 0
  }
})

// Methods
const handleCreateProject = () => {
  selectedProject.value = null
  editForm.value = {
    general: {
      projectName: '',
      displayName: '',
      description: '',
      cluster: ''
    },
    resources: {
      cpuLimit: 0,
      memoryLimit: 0
    }
  }
  showEditModal.value = true
  activeEditTab.value = 'general'
}

const handleEditProject = (project: any) => {
  selectedProject.value = project
  editForm.value.general.projectName = project.name
  editForm.value.general.displayName = project.displayName
  editForm.value.general.description = project.description
  editForm.value.general.cluster = project.cluster
  
  showEditModal.value = true
  activeEditTab.value = 'general'
}

const handleDeployProject = (project: any) => {
  console.log('Deploy project:', project.name)
}

const closeEditModal = () => {
  showEditModal.value = false
  selectedProject.value = null
  activeEditTab.value = 'general'
}

const saveProject = () => {
  console.log('Save project:', editForm.value)
  closeEditModal()
}

const getTabCompletionIcon = (tabId: string) => {
  switch (tabId) {
    case 'general':
      return editForm.value.general.projectName && editForm.value.general.cluster
    case 'resources':
      return editForm.value.resources.cpuLimit > 0 && editForm.value.resources.memoryLimit > 0
    default:
      return false
  }
}

const getProgressPercentage = () => {
  let completedSections = 0
  let totalSections = 5
  
  // General completion
  if (editForm.value.general.projectName && editForm.value.general.cluster) {
    completedSections++
  }
  
  // Resources completion  
  if (editForm.value.resources.cpuLimit > 0 && editForm.value.resources.memoryLimit > 0) {
    completedSections++
  }
  
  // Add base completion for demo
  completedSections += 1
  
  return Math.round((completedSections / totalSections) * 100)
}

const getProjectIconClass = (type: string) => {
  const classes = {
    'web': 'bg-blue-500',
    'api': 'bg-green-500',
    'mobile': 'bg-purple-500',
    'service': 'bg-orange-500'
  }
  return classes[type as keyof typeof classes] || 'bg-gray-500'
}

const getEnvironmentClass = (environment: string) => {
  const classes = {
    'Production': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    'Staging': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    'Development': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    'Testing': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
  }
  return classes[environment as keyof typeof classes] || 'bg-gray-100 text-gray-800'
}

const getStatusClass = (status: string) => {
  const classes = {
    'Running': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    'Development': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    'Error': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
  }
  return classes[status as keyof typeof classes] || 'bg-gray-100 text-gray-800'
}
</script> 