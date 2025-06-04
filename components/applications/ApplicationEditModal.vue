<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto">
    <div class="flex items-center justify-center min-h-screen p-4">
      <!-- Backdrop -->
      <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity" @click="$emit('close')"></div>
      
      <!-- Modal -->
      <div class="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        <!-- Header -->
        <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div class="flex items-center space-x-3">
            <div class="w-8 h-8 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center">
              <svg class="w-4 h-4 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14-7H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2z"></path>
              </svg>
            </div>
            <div>
              <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
                {{ isEdit ? 'Edit Application' : 'Create Application' }}
              </h2>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                {{ isEdit ? 'Update application configuration' : 'Configure your new application' }}
              </p>
            </div>
          </div>
          <button 
            @click="$emit('close')"
            class="text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-lg p-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <!-- Main Content -->
        <div class="flex h-[70vh]">
          <!-- Left Navigation -->
          <div class="w-64 bg-gray-50 dark:bg-gray-700 border-r border-gray-200 dark:border-gray-600">
            <nav class="p-4 space-y-2">
              <button
                v-for="tab in tabs"
                :key="tab.id"
                @click="activeTab = tab.id"
                :class="[
                  'w-full text-left px-4 py-3 rounded-lg transition-colors duration-150 flex items-center space-x-3',
                  activeTab === tab.id
                    ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                ]"
              >
                <component :is="'svg'" :class="tab.iconClass" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="tab.iconPath"></path>
                </component>
                <span class="font-medium">{{ tab.label }}</span>
              </button>
            </nav>
          </div>

          <!-- Right Content -->
          <div class="flex-1 overflow-y-auto">
            <form @submit.prevent="handleSubmit" class="p-6">
              
              <!-- General Tab -->
              <div v-if="activeTab === 'general'" class="space-y-6">
                <div>
                  <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">General Information</h3>
                  <div class="grid grid-cols-1 gap-6">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Application Name <span class="text-red-500">*</span>
                      </label>
                      <input
                        v-model="formData.applicationName"
                        type="text"
                        required
                        class="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        placeholder="Enter application name"
                      />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Description
                      </label>
                      <textarea
                        v-model="formData.description"
                        rows="3"
                        class="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        placeholder="Enter application description"
                      ></textarea>
                    </div>
                    
                    <!-- Tags Section -->
                    <div>
                      <div class="flex items-center justify-between mb-4">
                        <h4 class="text-md font-medium text-gray-900 dark:text-white">Tags</h4>
                        <button
                          type="button"
                          @click="addTag"
                          class="inline-flex items-center px-3 py-2 border border-dashed border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-150"
                        >
                          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                          </svg>
                          Add Tag
                        </button>
                      </div>
                      
                      <div class="space-y-2">
                        <div v-for="(tag, index) in formData.tags" :key="index" class="flex items-center space-x-2">
                          <input
                            v-model="tag.key"
                            type="text"
                            placeholder="Key"
                            class="flex-1 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                          />
                          <input
                            v-model="tag.value"
                            type="text"
                            placeholder="Value"
                            class="flex-1 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                          />
                          <button
                            type="button"
                            @click="removeTag(index)"
                            class="p-2 text-red-600 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
                          >
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Application Information Tab -->
              <div v-if="activeTab === 'application'" class="space-y-6">
                <div>
                  <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Application Configuration</h3>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Pipeline <span class="text-red-500">*</span>
                      </label>
                      <select
                        v-model="formData.selectedPipeline"
                        required
                        class="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      >
                        <option value="">Select Pipeline</option>
                        <option v-for="pipeline in availablePipelines" :key="pipeline.id" :value="pipeline.id">
                          {{ pipeline.name }} - {{ pipeline.status }}
                        </option>
                      </select>
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Display Name <span class="text-red-500">*</span>
                      </label>
                      <input
                        v-model="formData.displayName"
                        type="text"
                        required
                        class="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        placeholder="Enter display name"
                      />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Git Repository <span class="text-red-500">*</span>
                      </label>
                      <input
                        v-model="formData.gitRepository"
                        type="url"
                        required
                        class="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        placeholder="https://git.example.com/user/repo.git"
                      />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Deploy Repository <span class="text-red-500">*</span>
                      </label>
                      <input
                        v-model="formData.deployRepository"
                        type="url"
                        required
                        class="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        placeholder="https://git.example.com/user/deploy-repo.git"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <!-- Deploy Tab -->
              <div v-if="activeTab === 'deploy'" class="space-y-6">
                <div>
                  <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Deploy Configuration</h3>
                  
                  <!-- Target Configuration -->
                  <div class="mb-6">
                    <div class="flex items-center justify-between mb-4">
                      <h4 class="text-md font-medium text-gray-900 dark:text-white">Target Configuration</h4>
                      <button
                        type="button"
                        @click="addTarget"
                        class="inline-flex items-center px-3 py-2 border border-dashed border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-150"
                      >
                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                        </svg>
                        Add Target
                      </button>
                    </div>
                    
                    <div class="space-y-4">
                      <div v-for="(target, index) in formData.targetClusters" :key="index" class="border border-gray-200 dark:border-gray-600 rounded-lg p-6">
                        <div class="flex items-center justify-between mb-4">
                          <h5 class="text-sm font-medium text-gray-700 dark:text-gray-300">Target {{ index + 1 }}</h5>
                          <button
                            type="button"
                            @click="removeTarget(index)"
                            class="p-2 text-red-600 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
                          >
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                          </button>
                        </div>
                        
                        <!-- Cluster and Namespace -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Target Cluster</label>
                            <select
                              v-model="target.clusterId"
                              @change="updateAvailableNamespaces(index)"
                              class="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                            >
                              <option value="">Select Cluster</option>
                              <option value="cluster-1">zcp-dev-dev-eks (Ready)</option>
                              <option value="cluster-2">zdb-dev (Ready)</option>
                              <option value="cluster-3">prod-cluster-01 (Ready)</option>
                            </select>
                          </div>
                          <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Namespace</label>
                            <select
                              v-model="target.namespace"
                              :disabled="!target.clusterId"
                              class="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-600"
                            >
                              <option value="">Select Namespace</option>
                              <option v-for="ns in getAvailableNamespaces(target.clusterId)" :key="ns" :value="ns">{{ ns }}</option>
                            </select>
                          </div>
                        </div>
                        
                        <!-- Replicas and Port -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Replicas <span class="text-red-500">*</span>
                            </label>
                            <input
                              v-model.number="target.replicas"
                              type="number"
                              min="1"
                              max="10"
                              required
                              class="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                            />
                          </div>
                          <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Port <span class="text-red-500">*</span>
                            </label>
                            <input
                              v-model.number="target.port"
                              type="number"
                              min="1"
                              max="65535"
                              required
                              class="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                            />
                          </div>
                        </div>
                        
                        <!-- Resource Configuration -->
                        <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                          <h6 class="text-sm font-medium text-gray-900 dark:text-white mb-3">Resource Configuration</h6>
                          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                CPU Request: {{ target.cpuRequest || '100m' }}
                              </label>
                              <input
                                v-model="target.cpuRequestValue"
                                type="range"
                                min="100"
                                max="1000"
                                step="100"
                                @input="updateCpuRequest(index, $event)"
                                class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-600 slider"
                              />
                              <div class="flex justify-between text-xs text-gray-500 mt-1">
                                <span>100m</span>
                                <span>1000m</span>
                              </div>
                            </div>
                            <div>
                              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                CPU Limit: {{ target.cpuLimit || '500m' }}
                              </label>
                              <input
                                v-model="target.cpuLimitValue"
                                type="range"
                                min="200"
                                max="2000"
                                step="100"
                                @input="updateCpuLimit(index, $event)"
                                class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-600 slider"
                              />
                              <div class="flex justify-between text-xs text-gray-500 mt-1">
                                <span>200m</span>
                                <span>2000m</span>
                              </div>
                            </div>
                            <div>
                              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Memory Request: {{ target.memoryRequest || '128Mi' }}
                              </label>
                              <input
                                v-model="target.memoryRequestValue"
                                type="range"
                                min="128"
                                max="2048"
                                step="128"
                                @input="updateMemoryRequest(index, $event)"
                                class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-600 slider"
                              />
                              <div class="flex justify-between text-xs text-gray-500 mt-1">
                                <span>128Mi</span>
                                <span>2048Mi</span>
                              </div>
                            </div>
                            <div>
                              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Memory Limit: {{ target.memoryLimit || '256Mi' }}
                              </label>
                              <input
                                v-model="target.memoryLimitValue"
                                type="range"
                                min="256"
                                max="4096"
                                step="128"
                                @input="updateMemoryLimit(index, $event)"
                                class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-600 slider"
                              />
                              <div class="flex justify-between text-xs text-gray-500 mt-1">
                                <span>256Mi</span>
                                <span>4096Mi</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        <!-- Footer -->
        <div class="flex items-center justify-end space-x-3 p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
          <button 
            type="button"
            @click="$emit('close')"
            class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-150"
          >
            Cancel
          </button>
          <button 
            type="button"
            @click="handleSubmit"
            :disabled="!isFormValid"
            class="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
          >
            {{ isEdit ? 'Update' : 'Create' }} Application
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

// Props
interface Props {
  isOpen: boolean
  application?: any
}

const props = defineProps<Props>()

// Emits
const emit = defineEmits<{
  close: []
  save: [formData: any]
}>()

// Data
const activeTab = ref<string>('general')

const tabs = ref([
  {
    id: 'general',
    label: 'General',
    iconClass: 'w-5 h-5',
    iconPath: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
  },
  {
    id: 'application',
    label: 'Application',
    iconClass: 'w-5 h-5',
    iconPath: 'M19 11H5m14-7H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2z'
  },
  {
    id: 'deploy',
    label: 'Deploy',
    iconClass: 'w-5 h-5',
    iconPath: 'M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2'
  }
])

const formData = ref({
  // General tab fields
  applicationName: '',
  description: '',
  tags: [] as Array<{ key: string; value: string }>,
  // Application tab fields
  selectedPipeline: '',
  displayName: '',
  gitRepository: '',
  deployRepository: '',
  // Deployment settings
  targetClusters: [] as Array<{ 
    clusterId: string; 
    namespace: string; 
    clusterName: string; 
    replicas: number; 
    port: number;
    cpuRequest: string;
    cpuLimit: string;
    memoryRequest: string;
    memoryLimit: string;
    cpuRequestValue: number;
    cpuLimitValue: number;
    memoryRequestValue: number;
    memoryLimitValue: number;
  }>
})

// Available pipelines data
const availablePipelines = ref([
  { id: 'frontend-pipeline', name: 'Frontend Build Pipeline', status: 'Active' },
  { id: 'backend-api-pipeline', name: 'Backend API Pipeline', status: 'Active' },
  { id: 'microservice-pipeline', name: 'Microservice Pipeline', status: 'Active' },
  { id: 'mobile-app-pipeline', name: 'Mobile App Pipeline', status: 'Inactive' },
  { id: 'data-processing-pipeline', name: 'Data Processing Pipeline', status: 'Active' },
  { id: 'ml-model-pipeline', name: 'ML Model Training Pipeline', status: 'Active' }
])

// Computed
const isEdit = computed(() => !!props.application?.id)

const isFormValid = computed(() => {
  return formData.value.applicationName &&
         formData.value.selectedPipeline &&
         formData.value.displayName &&
         formData.value.gitRepository &&
         formData.value.deployRepository
})

const namespaceOptions = computed(() => [
  { value: 'default', label: 'default' },
  { value: 'kube-system', label: 'kube-system' },
  { value: 'dev', label: 'dev' },
  { value: 'staging', label: 'staging' },
  { value: 'production', label: 'production' },
  { value: 'test', label: 'test' }
])

// Watch for application changes
watch(() => props.application, (newApplication) => {
  if (newApplication) {
    formData.value = {
      // General tab fields
      applicationName: newApplication.applicationName || newApplication.name || '',
      description: newApplication.description || '',
      tags: newApplication.tags ? [...newApplication.tags] : [],
      // Application tab fields
      selectedPipeline: newApplication.selectedPipeline || '',
      displayName: newApplication.displayName || '',
      gitRepository: newApplication.gitRepository || '',
      deployRepository: newApplication.deployRepository || '',
      // Deployment settings
      targetClusters: newApplication.targetClusters && newApplication.targetClusters.length > 0 
        ? [...newApplication.targetClusters] 
        : [{ 
            clusterId: '', 
            namespace: '', 
            clusterName: '', 
            replicas: 1, 
            port: 8080, 
            cpuRequest: '100m', 
            cpuLimit: '500m', 
            memoryRequest: '128Mi', 
            memoryLimit: '256Mi',
            cpuRequestValue: 100,
            cpuLimitValue: 500,
            memoryRequestValue: 128,
            memoryLimitValue: 256
          }]
    }
  } else {
    // Reset form for new application
    formData.value = {
      // General tab fields
      applicationName: '',
      description: '',
      tags: [],
      // Application tab fields
      selectedPipeline: '',
      displayName: '',
      gitRepository: '',
      deployRepository: '',
      // Deployment settings
      targetClusters: [{ 
        clusterId: '', 
        namespace: '', 
        clusterName: '', 
        replicas: 1, 
        port: 8080, 
        cpuRequest: '100m', 
        cpuLimit: '500m', 
        memoryRequest: '128Mi', 
        memoryLimit: '256Mi',
        cpuRequestValue: 100,
        cpuLimitValue: 500,
        memoryRequestValue: 128,
        memoryLimitValue: 256
      }]
    }
  }
  
  // Reset to first tab when modal opens
  activeTab.value = 'general'
}, { immediate: true })

// Methods
const addTag = () => {
  formData.value.tags.push({ key: '', value: '' })
}

const removeTag = (index: number) => {
  formData.value.tags.splice(index, 1)
}

const addTarget = () => {
  formData.value.targetClusters.push({ 
    clusterId: '', 
    namespace: '', 
    clusterName: '', 
    replicas: 1, 
    port: 8080, 
    cpuRequest: '100m', 
    cpuLimit: '500m', 
    memoryRequest: '128Mi', 
    memoryLimit: '256Mi',
    cpuRequestValue: 100,
    cpuLimitValue: 500,
    memoryRequestValue: 128,
    memoryLimitValue: 256
  })
}

const removeTarget = (index: number) => {
  formData.value.targetClusters.splice(index, 1)
}

const getAvailableNamespaces = (clusterId: string) => {
  const namespaceMap: Record<string, string[]> = {
    'cluster-1': ['default', 'kube-system', 'zcp-dev', 'frontend'],
    'cluster-2': ['default', 'kube-system', 'user-service', 'notifications'],
    'cluster-3': ['default', 'kube-system', 'production', 'analytics']
  }
  return namespaceMap[clusterId] || []
}

const updateAvailableNamespaces = (index: number) => {
  const target = formData.value.targetClusters[index]
  target.namespace = ''
}

// Resource update methods
const updateCpuRequest = (index: number, event: Event) => {
  const value = parseInt((event.target as HTMLInputElement).value)
  formData.value.targetClusters[index].cpuRequestValue = value
  formData.value.targetClusters[index].cpuRequest = `${value}m`
}

const updateCpuLimit = (index: number, event: Event) => {
  const value = parseInt((event.target as HTMLInputElement).value)
  formData.value.targetClusters[index].cpuLimitValue = value
  formData.value.targetClusters[index].cpuLimit = `${value}m`
}

const updateMemoryRequest = (index: number, event: Event) => {
  const value = parseInt((event.target as HTMLInputElement).value)
  formData.value.targetClusters[index].memoryRequestValue = value
  formData.value.targetClusters[index].memoryRequest = `${value}Mi`
}

const updateMemoryLimit = (index: number, event: Event) => {
  const value = parseInt((event.target as HTMLInputElement).value)
  formData.value.targetClusters[index].memoryLimitValue = value
  formData.value.targetClusters[index].memoryLimit = `${value}Mi`
}

const handleSubmit = () => {
  if (!isFormValid.value) return
  
  // Filter out empty data
  const cleanedFormData = {
    ...formData.value,
    tags: formData.value.tags.filter(tag => tag.key && tag.value),
    targetClusters: formData.value.targetClusters.filter(tc => tc.clusterId && tc.namespace)
  }
  
  emit('save', cleanedFormData)
}
</script> 