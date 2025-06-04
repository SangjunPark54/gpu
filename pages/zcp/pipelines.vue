<template>
  <div class="p-6">
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">CI/CD Pipelines</h1>
      <p class="text-gray-600 dark:text-gray-400 mt-2">Manage continuous integration and deployment pipelines</p>
    </div>

    <!-- Pipelines Overview -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div class="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <svg class="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Total Pipelines</dt>
                <dd class="text-lg font-medium text-gray-900 dark:text-white">{{ stats.totalPipelines }}</dd>
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
                <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Active Pipelines</dt>
                <dd class="text-lg font-medium text-gray-900 dark:text-white">{{ stats.activePipelines }}</dd>
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
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Recent Runs</dt>
                <dd class="text-lg font-medium text-gray-900 dark:text-white">{{ stats.recentRuns }}</dd>
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
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                </svg>
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Success Rate</dt>
                <dd class="text-lg font-medium text-gray-900 dark:text-white">{{ stats.successRate }}%</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Pipelines Table -->
    <div class="bg-white dark:bg-gray-800 shadow rounded-lg">
      <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white">Pipeline List</h3>
          <button 
            @click="handleCreatePipeline"
            class="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-150"
          >
            <svg class="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
            Create New Pipeline
          </button>
        </div>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead class="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Pipeline Name</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Repository</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Branch</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Last Run</th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="pipeline in pipelines" :key="pipeline.id" class="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="w-8 h-8 rounded-full flex items-center justify-center" :class="getPipelineIconClass(pipeline.type)">
                    <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clip-rule="evenodd"></path>
                    </svg>
                  </div>
                  <div class="ml-3">
                    <button 
                      @click="handleEditPipeline(pipeline)"
                      class="text-sm font-medium text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-150 text-left"
                    >
                      {{ pipeline.name }}
                    </button>
                    <div class="text-sm text-gray-500 dark:text-gray-400">{{ pipeline.description }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{{ pipeline.repository }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                  {{ pipeline.branch }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full" :class="getStatusClass(pipeline.status)">
                  {{ pipeline.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{{ pipeline.lastRun }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="flex items-center justify-end space-x-2">
                  <button 
                    @click="handleEditPipeline(pipeline)"
                    class="relative inline-flex items-center justify-center w-8 h-8 border border-transparent rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-150 group"
                    title="Edit"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                    </svg>
                    <span class="absolute bottom-full mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                      Edit
                    </span>
                  </button>
                  <button 
                    @click="handleRunPipeline(pipeline)"
                    class="relative inline-flex items-center justify-center w-8 h-8 border border-transparent rounded text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors duration-150 group"
                    title="Run"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8m2-10h.01M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                    <span class="absolute bottom-full mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                      Run
                    </span>
                  </button>
                  <button 
                    @click="handleShowHistory(pipeline)"
                    class="relative inline-flex items-center justify-center w-8 h-8 border border-transparent rounded text-purple-700 bg-purple-100 hover:bg-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors duration-150 group"
                    title="History"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span class="absolute bottom-full mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                      History
                    </span>
                  </button>
                  <button 
                    @click="handleDeletePipeline(pipeline)"
                    class="relative inline-flex items-center justify-center w-8 h-8 border border-transparent rounded text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors duration-150 group"
                    title="Delete"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                    <span class="absolute bottom-full mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                      Delete
                    </span>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- Edit Pipeline Modal -->
  <div v-if="showEditModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50" @click="closeEditModal">
    <div class="relative top-6 mx-auto p-4 border w-11/12 max-w-6xl shadow-2xl rounded-xl bg-white dark:bg-gray-800" @click.stop>
      <!-- Modal Header with Progress -->
      <div class="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-700">
        <div class="flex items-center space-x-3">
          <div class="w-8 h-8 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center">
            <svg class="w-4 h-4 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
          </div>
          <div>
            <h3 class="text-lg font-bold text-gray-900 dark:text-white">{{ selectedPipeline ? 'Edit Pipeline' : 'Create Pipeline' }}</h3>
            <p class="text-xs text-gray-500 dark:text-gray-400">Manage CI/CD pipeline configuration</p>
          </div>
        </div>
        
        <!-- Progress Indicator -->
        <div class="flex items-center space-x-3">
          <div class="flex items-center space-x-2">
            <div class="text-xs text-gray-600 dark:text-gray-400">Progress</div>
            <div class="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
              <div :style="{ width: getProgressPercentage() + '%' }" class="bg-indigo-600 h-1.5 rounded-full transition-all duration-300"></div>
            </div>
            <div class="text-xs font-medium text-gray-900 dark:text-white">{{ Math.round(getProgressPercentage()) }}%</div>
          </div>
          <button @click="closeEditModal" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 transition-colors duration-200">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
            </svg>
          </button>
        </div>
      </div>

      <!-- Modal Body with Enhanced LNB Layout -->
      <div class="flex mt-4 h-[720px]">
        <!-- Enhanced Left Navigation -->
        <div class="w-56 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-lg border border-gray-200 dark:border-gray-600 shadow-sm">
          <div class="p-3">
            <h4 class="text-xs font-semibold text-gray-900 dark:text-white mb-3 uppercase tracking-wider">Configuration Categories</h4>
            <nav class="space-y-1">
              <button 
                v-for="tab in editTabs" 
                :key="tab.id"
                @click="activeEditTab = tab.id"
                :class="[
                  'w-full flex items-center px-3 py-2 text-xs font-medium rounded-md transition-all duration-200 group',
                  activeEditTab === tab.id
                    ? 'bg-indigo-600 text-white shadow-md transform scale-105'
                    : 'text-gray-700 hover:bg-white hover:shadow-sm dark:text-gray-300 dark:hover:bg-gray-600'
                ]"
              >
                <!-- General Icon -->
                <svg v-if="tab.id === 'general'" :class="[
                  'mr-2 h-4 w-4 transition-colors duration-200',
                  activeEditTab === tab.id ? 'text-white' : 'text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300'
                ]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                
                <!-- Source Icon -->
                <svg v-else-if="tab.id === 'source'" :class="[
                  'mr-2 h-4 w-4 transition-colors duration-200',
                  activeEditTab === tab.id ? 'text-white' : 'text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300'
                ]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
                </svg>
                
                <!-- Build Icon -->
                <svg v-else-if="tab.id === 'build'" :class="[
                  'mr-2 h-4 w-4 transition-colors duration-200',
                  activeEditTab === tab.id ? 'text-white' : 'text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300'
                ]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
                </svg>
                
                <!-- Repository Icon -->
                <svg v-else-if="tab.id === 'repository'" :class="[
                  'mr-2 h-4 w-4 transition-colors duration-200',
                  activeEditTab === tab.id ? 'text-white' : 'text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300'
                ]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5a2 2 0 012-2h4a2 2 0 012 2v1H8V5z"></path>
                </svg>
                
                <!-- History Icon -->
                <svg v-else-if="tab.id === 'history'" :class="[
                  'mr-2 h-4 w-4 transition-colors duration-200',
                  activeEditTab === tab.id ? 'text-white' : 'text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300'
                ]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>

                <span>{{ tab.name }}</span>
                <div v-if="getTabCompletionIcon(tab.id)" class="ml-auto">
                  <svg class="w-3 h-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
              </button>
            </nav>
          </div>
        </div>

        <!-- Enhanced Right Content -->
        <div class="flex-1 p-5 bg-white dark:bg-gray-800 rounded-lg ml-3 overflow-y-auto border border-gray-200 dark:border-gray-600">
          <!-- General Tab -->
          <div v-if="activeEditTab === 'general'" class="space-y-4">
            <div class="flex items-center space-x-3 mb-4">
              <div class="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                <svg class="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                </svg>
              </div>
              <div>
                <h4 class="text-base font-bold text-gray-900 dark:text-white">General Information</h4>
                <p class="text-xs text-gray-500 dark:text-gray-400">Configure basic pipeline metadata</p>
              </div>
            </div>
            
            <div class="grid grid-cols-2 gap-4">
              <!-- Pipeline Name Card -->
              <div class="border border-gray-200 dark:border-gray-600 rounded-md p-4">
                <div class="flex items-center justify-between mb-2">
                  <label class="text-xs font-semibold text-gray-700 dark:text-gray-300 flex items-center">
                    <svg class="w-3 h-3 mr-1 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                    </svg>
                    Pipeline Name <span class="text-red-500 ml-1">*</span>
                  </label>
                  <div class="text-xs text-gray-500 dark:text-gray-400">Required</div>
                </div>
                <input 
                  v-model="editForm.general.pipelineName"
                  type="text" 
                  class="w-full border border-gray-200 dark:border-gray-600 rounded-md px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors duration-200"
                  placeholder="e.g. test-movie"
                />
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Lowercase letters, numbers, and hyphens (-) only</p>
              </div>
              
              <!-- Branch Card -->
              <div class="border border-gray-200 dark:border-gray-600 rounded-md p-4">
                <label class="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                  <svg class="w-3 h-3 mr-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
                  </svg>
                  Branch <span class="text-red-500 ml-1">*</span>
                </label>
                <input 
                  v-model="editForm.general.branch"
                  type="text" 
                  class="w-full border border-gray-200 dark:border-gray-600 rounded-md px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors duration-200"
                  placeholder="main"
                />
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <!-- Submodule Branch -->
              <div class="border border-gray-200 dark:border-gray-600 rounded-md p-4">
                <label class="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                  <svg class="w-3 h-3 mr-1 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2v0a2 2 0 01-2-2v-5H8z"></path>
                  </svg>
                  Submodule Branch
                </label>
                <input 
                  v-model="editForm.general.submoduleBranch"
                  type="text" 
                  class="w-full border border-gray-200 dark:border-gray-600 rounded-md px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors duration-200"
                  placeholder="Optional submodule branch"
                />
              </div>
              
              <!-- Build History Count -->
              <div class="border border-gray-200 dark:border-gray-600 rounded-md p-4">
                <label class="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                  <svg class="w-3 h-3 mr-1 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  Build History Count <span class="text-red-500 ml-1">*</span>
                </label>
                <input 
                  v-model.number="editForm.general.buildHistoryCount"
                  type="number" 
                  min="1"
                  max="100"
                  class="w-full border border-gray-200 dark:border-gray-600 rounded-md px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors duration-200"
                  placeholder="10"
                />
              </div>
            </div>
          </div>

          <!-- Build Tab -->
          <div v-if="activeEditTab === 'build'" class="space-y-4">
            <div class="flex items-center space-x-3 mb-4">
              <div class="w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
                <svg class="w-4 h-4 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
                </svg>
              </div>
              <div>
                <h4 class="text-base font-bold text-gray-900 dark:text-white">Build Configuration</h4>
                <p class="text-xs text-gray-500 dark:text-gray-400">Configure build tools and commands</p>
              </div>
            </div>
            
            <div class="space-y-4">
              <!-- Build Tool & Language Version -->
              <div class="grid grid-cols-2 gap-4">
                <div class="border border-gray-200 dark:border-gray-600 rounded-md p-4">
                  <label class="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                    <svg class="w-3 h-3 mr-1 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    Build Tool <span class="text-red-500 ml-1">*</span>
                  </label>
                  <select v-model="editForm.build.buildTool" class="w-full border border-gray-200 dark:border-gray-600 rounded px-3 py-2 text-xs bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                    <option value="">Select build tool</option>
                    <option value="maven">Maven</option>
                    <option value="gradle">Gradle</option>
                    <option value="npm">NPM</option>
                    <option value="yarn">Yarn</option>
                  </select>
                </div>
                
                <div class="border border-gray-200 dark:border-gray-600 rounded-md p-4">
                  <label class="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {{ getLanguageLabel() }}
                  </label>
                  <select v-model="editForm.build.languageVersion" class="w-full border border-gray-200 dark:border-gray-600 rounded px-3 py-2 text-xs bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                    <option value="">Select version</option>
                    <template v-if="editForm.build.buildTool === 'maven' || editForm.build.buildTool === 'gradle'">
                      <option value="jdk-8">JDK 8</option>
                      <option value="jdk-11">JDK 11</option>
                      <option value="jdk-17">JDK 17</option>
                      <option value="jdk-21">JDK 21</option>
                    </template>
                    <template v-else-if="editForm.build.buildTool === 'npm' || editForm.build.buildTool === 'yarn'">
                      <option value="node-16">Node.js 16</option>
                      <option value="node-18">Node.js 18</option>
                      <option value="node-20">Node.js 20</option>
                      <option value="node-21">Node.js 21</option>
                    </template>
                  </select>
                </div>
              </div>

              <!-- Maven Goals & Mirror URL (only for Maven/Gradle) -->
              <div v-if="editForm.build.buildTool === 'maven' || editForm.build.buildTool === 'gradle'" class="grid grid-cols-2 gap-4">
                <div class="border border-gray-200 dark:border-gray-600 rounded-md p-4">
                  <label class="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {{ editForm.build.buildTool === 'maven' ? 'Maven Goals' : 'Gradle Tasks' }}
                  </label>
                  <input v-model="editForm.build.mavenGoals" type="text" class="w-full border border-gray-200 dark:border-gray-600 rounded px-3 py-2 text-xs bg-white dark:bg-gray-800 text-gray-900 dark:text-white" :placeholder="editForm.build.buildTool === 'maven' ? 'package' : 'build'" />
                </div>
                
                <div class="border border-gray-200 dark:border-gray-600 rounded-md p-4">
                  <label class="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">Mirror URL</label>
                  <input v-model="editForm.build.mirrorUrl" type="url" class="w-full border border-gray-200 dark:border-gray-600 rounded px-3 py-2 text-xs bg-white dark:bg-gray-800 text-gray-900 dark:text-white" placeholder="Optional mirror URL" />
                </div>
              </div>

              <!-- SonarQube Configuration -->
              <div class="border border-gray-200 dark:border-gray-600 rounded-md p-4">
                <h5 class="text-xs font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  <svg class="w-3 h-3 mr-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  SonarQube Configuration
                </h5>
                
                <div class="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <label class="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">SonarScanning</label>
                    <select v-model="editForm.build.sonarScanning" class="w-full border border-gray-200 dark:border-gray-600 rounded px-3 py-2 text-xs bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                      <option value="Disabled">Disabled</option>
                      <option value="Enabled">Enabled</option>
                    </select>
                  </div>
                  
                  <div>
                    <label class="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">SonarQube URL</label>
                    <input v-model="editForm.build.sonarQubeUrl" type="url" class="w-full border border-gray-200 dark:border-gray-600 rounded px-3 py-2 text-xs bg-white dark:bg-gray-800 text-gray-900 dark:text-white" placeholder="SonarQube server URL" />
                  </div>
                </div>
                
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">Project Key</label>
                    <input v-model="editForm.build.sonarProjectKey" type="text" class="w-full border border-gray-200 dark:border-gray-600 rounded px-3 py-2 text-xs bg-white dark:bg-gray-800 text-gray-900 dark:text-white" placeholder="Sonar project key" />
                  </div>
                  
                  <div>
                    <label class="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">Login Token</label>
                    <input v-model="editForm.build.sonarProjectLoginToken" type="password" class="w-full border border-gray-200 dark:border-gray-600 rounded px-3 py-2 text-xs bg-white dark:bg-gray-800 text-gray-900 dark:text-white" placeholder="Authentication token" />
                  </div>
                </div>
              </div>

              <!-- Workspace & Cache -->
              <div class="grid grid-cols-2 gap-4">
                <div class="border border-gray-200 dark:border-gray-600 rounded-md p-4">
                  <label class="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">Workspace Disk Size (Gi)</label>
                  <input v-model.number="editForm.build.workspaceDiskSize" type="number" min="1" max="100" class="w-full border border-gray-200 dark:border-gray-600 rounded px-3 py-2 text-xs bg-white dark:bg-gray-800 text-gray-900 dark:text-white" placeholder="2" />
                  <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">(Default 2Gi)</p>
                </div>
                
                <div class="border border-gray-200 dark:border-gray-600 rounded-md p-4">
                  <label class="flex items-center text-xs">
                    <input type="checkbox" v-model="editForm.build.cacheEnable" class="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 mr-2" />
                    Cache Enable
                  </label>
                  <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">If enabled, the packages and libraries for application rebuild are cached in the persistent disk but the concurrent build is not supported.</p>
                </div>
              </div>

              <!-- Advanced Section -->
              <div class="border border-gray-200 dark:border-gray-600 rounded-md p-4">
                <h5 class="text-xs font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  <svg class="w-3 h-3 mr-1 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"></path>
                  </svg>
                  Advanced
                </h5>
                
                <!-- Dockerfile Path -->
                <div class="mb-3">
                  <label class="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">Dockerfile Path</label>
                  <input v-model="editForm.build.dockerfilePath" type="text" class="w-full border border-gray-200 dark:border-gray-600 rounded px-3 py-2 text-xs bg-white dark:bg-gray-800 text-gray-900 dark:text-white" placeholder="Optional dockerfile path" />
                </div>
                
                <!-- Auto Tagging -->
                <div class="mb-3">
                  <label class="flex items-center text-xs">
                    <input type="checkbox" v-model="editForm.build.autoTagging" class="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 mr-2" />
                    Auto Tagging
                  </label>
                </div>
                
                <!-- Tag Prefix (only if Auto Tagging is enabled) -->
                <div v-if="editForm.build.autoTagging" class="mb-3">
                  <label class="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Tag Prefix <span class="text-red-500 ml-1">*</span>
                  </label>
                  <input v-model="editForm.build.tagPrefix" type="text" class="w-full border border-gray-200 dark:border-gray-600 rounded px-3 py-2 text-xs bg-white dark:bg-gray-800 text-gray-900 dark:text-white" placeholder="test" />
                </div>
                
                <!-- Image Build Arguments -->
                <div>
                  <div class="flex items-center justify-between mb-3">
                    <label class="text-xs font-semibold text-gray-700 dark:text-gray-300">Image Build Argument</label>
                    <button @click="addImageBuildArgument" type="button" class="text-xs bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">
                      <svg class="w-3 h-3 mr-1 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                      </svg>
                      Add
                    </button>
                  </div>
                  
                  <div class="space-y-2">
                    <div v-for="(arg, index) in editForm.build.imageBuildArguments" :key="index" class="grid grid-cols-12 gap-2">
                      <div class="col-span-2 text-xs font-medium text-gray-500 dark:text-gray-400 flex items-center">Key</div>
                      <div class="col-span-4">
                        <input v-model="arg.key" type="text" class="w-full border border-gray-200 dark:border-gray-600 rounded px-2 py-1 text-xs bg-white dark:bg-gray-800 text-gray-900 dark:text-white" placeholder="--custom-platform" />
                      </div>
                      <div class="col-span-1 text-xs font-medium text-gray-500 dark:text-gray-400 flex items-center">Value</div>
                      <div class="col-span-4">
                        <input v-model="arg.value" type="text" class="w-full border border-gray-200 dark:border-gray-600 rounded px-2 py-1 text-xs bg-white dark:bg-gray-800 text-gray-900 dark:text-white" placeholder="linux/arm64" />
                      </div>
                      <div class="col-span-1 flex items-center">
                        <button @click="removeImageBuildArgument(index)" type="button" class="bg-red-100 text-red-700 rounded px-2 py-1 hover:bg-red-200 text-xs">
                          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                    
                    <!-- Default row if no arguments -->
                    <div v-if="editForm.build.imageBuildArguments.length === 0" class="grid grid-cols-12 gap-2 text-gray-500 dark:text-gray-400">
                      <div class="col-span-2 text-xs font-medium flex items-center">Key</div>
                      <div class="col-span-4 text-xs">--custom-platform</div>
                      <div class="col-span-1 text-xs font-medium flex items-center">Value</div>
                      <div class="col-span-4 text-xs">linux/arm64</div>
                      <div class="col-span-1"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Repository Tab -->
          <div v-if="activeEditTab === 'repository'" class="space-y-4">
            <div class="flex items-center space-x-3 mb-4">
              <div class="w-8 h-8 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center">
                <svg class="w-4 h-4 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
                </svg>
              </div>
              <div>
                <h4 class="text-base font-bold text-gray-900 dark:text-white">Repository Configuration</h4>
                <p class="text-xs text-gray-500 dark:text-gray-400">Configure all repository and container image settings</p>
              </div>
            </div>
            
            <div class="space-y-4">
              <!-- Source Repository Section -->
              <div class="border border-gray-200 dark:border-gray-600 rounded-md p-4">
                <h5 class="text-xs font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  <svg class="w-3 h-3 mr-1 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                  Source Repository
                </h5>
                
                <!-- Git Repository -->
                <div class="mb-3">
                  <label class="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Git Repository URL <span class="text-red-500 ml-1">*</span>
                  </label>
                  <input 
                    v-model="editForm.source.gitRepository"
                    type="url" 
                    class="w-full border border-gray-200 dark:border-gray-600 rounded px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    placeholder="https://git.dev.cloudzcp.net/cloudzcp-admin/cloud-movie-demo.git"
                  />
                </div>

                <!-- Deploy Repository -->
                <div class="mb-3">
                  <label class="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Deploy Repository URL
                  </label>
                  <input 
                    v-model="editForm.source.deployRepository"
                    type="url" 
                    class="w-full border border-gray-200 dark:border-gray-600 rounded px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    placeholder="https://git.dev.cloudzcp.net/cloudzcp-admin/deploy-cloud-movie-demo.git"
                  />
                </div>
                
                <!-- Checkout Submodule -->
                <div class="mb-3">
                  <label class="flex items-center text-xs">
                    <input type="checkbox" v-model="editForm.source.checkoutSubmodule" class="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 mr-2" />
                    Checkout Submodule
                  </label>
                </div>

                <!-- Secret -->
                <div>
                  <label class="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                    <svg class="w-3 h-3 mr-1 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"></path>
                    </svg>
                    Secret
                  </label>
                  <select v-model="editForm.source.secret" class="w-full border border-gray-200 dark:border-gray-600 rounded px-3 py-2 text-xs bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                    <option value="">Please select</option>
                    <option value="git-secret">Git Secret</option>
                    <option value="registry-secret">Registry Secret</option>
                  </select>
                  <div class="flex items-center space-x-2 mt-2">
                    <button class="text-xs bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">Manage</button>
                    <button class="text-xs bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">Test Connection</button>
                  </div>
                </div>
              </div>

              <!-- Container Image Section -->
              <div class="border border-gray-200 dark:border-gray-600 rounded-md p-4">
                <h5 class="text-xs font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  <svg class="w-3 h-3 mr-1 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                  </svg>
                  Container Image
                </h5>
                
                <!-- Image Build -->
                <div class="mb-3">
                  <label class="flex items-center text-xs">
                    <input type="checkbox" v-model="editForm.container.imageBuild" class="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 mr-2" />
                    Image Build
                  </label>
                </div>

                <!-- Image Repository -->
                <div class="mb-3">
                  <label class="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">Image Repository</label>
                  <input v-model="editForm.container.imageRepository" type="text" class="w-full border border-gray-200 dark:border-gray-600 rounded px-3 py-2 text-xs bg-white dark:bg-gray-800 text-gray-900 dark:text-white" placeholder="dev-registry.dev.cloudzcp.net/dev-test/cloud-movie-demo1" />
                </div>

                <!-- Container Secret -->
                <div class="mb-3">
                  <label class="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">Secret</label>
                  <select v-model="editForm.container.secret" class="w-full border border-gray-200 dark:border-gray-600 rounded px-3 py-2 text-xs bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                    <option value="">Please select</option>
                    <option value="container-secret">Container Secret</option>
                  </select>
                  <div class="flex items-center space-x-2 mt-2">
                    <button class="text-xs bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">Manage</button>
                    <button class="text-xs bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">Test Connection</button>
                  </div>
                </div>

                <!-- Context & Dockerfile -->
                <div class="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <label class="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">Context</label>
                    <input v-model="editForm.container.context" type="text" class="w-full border border-gray-200 dark:border-gray-600 rounded px-3 py-2 text-xs bg-white dark:bg-gray-800 text-gray-900 dark:text-white" placeholder="." />
                  </div>
                  
                  <div>
                    <label class="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">Dockerfile</label>
                    <input v-model="editForm.container.dockerfile" type="text" class="w-full border border-gray-200 dark:border-gray-600 rounded px-3 py-2 text-xs bg-white dark:bg-gray-800 text-gray-900 dark:text-white" placeholder="Dockerfile" />
                  </div>
                </div>

                <!-- Image Build Argument -->
                <div>
                  <label class="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">Image Build Argument</label>
                  <div class="flex items-center space-x-2">
                    <input v-model="editForm.container.imageBuildArgument" type="text" class="flex-1 border border-gray-200 dark:border-gray-600 rounded px-3 py-2 text-xs bg-white dark:bg-gray-800 text-gray-900 dark:text-white" placeholder="Build arguments" />
                    <button class="text-xs bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">
                      <svg class="w-3 h-3 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- History Tab -->
          <div v-if="activeEditTab === 'history'" class="space-y-4">
            <div class="flex items-center space-x-3 mb-4">
              <div class="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                <svg class="w-4 h-4 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div>
                <h4 class="text-base font-bold text-gray-900 dark:text-white">Pipeline History</h4>
                <p class="text-xs text-gray-500 dark:text-gray-400">View recent pipeline execution logs and results</p>
              </div>
            </div>
            
            <div class="space-y-4">
              <!-- Recent Runs Summary -->
              <div class="grid grid-cols-4 gap-4">
                <div class="border border-gray-200 dark:border-gray-600 rounded-md p-3 text-center">
                  <div class="text-lg font-bold text-green-600 dark:text-green-400">24</div>
                  <div class="text-xs text-gray-500 dark:text-gray-400">Total Runs</div>
                </div>
                <div class="border border-gray-200 dark:border-gray-600 rounded-md p-3 text-center">
                  <div class="text-lg font-bold text-green-600 dark:text-green-400">21</div>
                  <div class="text-xs text-gray-500 dark:text-gray-400">Successful</div>
                </div>
                <div class="border border-gray-200 dark:border-gray-600 rounded-md p-3 text-center">
                  <div class="text-lg font-bold text-red-600 dark:text-red-400">3</div>
                  <div class="text-xs text-gray-500 dark:text-gray-400">Failed</div>
                </div>
                <div class="border border-gray-200 dark:border-gray-600 rounded-md p-3 text-center">
                  <div class="text-lg font-bold text-blue-600 dark:text-blue-400">89%</div>
                  <div class="text-xs text-gray-500 dark:text-gray-400">Success Rate</div>
                </div>
              </div>

              <!-- Pipeline Run History -->
              <div class="border border-gray-200 dark:border-gray-600 rounded-md overflow-hidden">
                <div class="bg-gray-50 dark:bg-gray-700 px-4 py-2 border-b border-gray-200 dark:border-gray-600">
                  <h5 class="text-xs font-semibold text-gray-900 dark:text-white">Recent Executions</h5>
                </div>
                <div class="divide-y divide-gray-200 dark:divide-gray-600">
                  <div class="p-3 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <div class="flex items-center justify-between">
                      <div class="flex items-center space-x-3">
                        <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                        <div>
                          <div class="text-xs font-medium text-gray-900 dark:text-white">#42 - Success</div>
                          <div class="text-xs text-gray-500 dark:text-gray-400">2024-01-15 14:30:15</div>
                        </div>
                      </div>
                      <div class="flex items-center space-x-2">
                        <span class="text-xs text-gray-500 dark:text-gray-400">5m 32s</span>
                        <button class="text-xs text-indigo-600 hover:text-indigo-900 dark:text-indigo-400">View Logs</button>
                      </div>
                    </div>
                  </div>
                  
                  <div class="p-3 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <div class="flex items-center justify-between">
                      <div class="flex items-center space-x-3">
                        <div class="w-2 h-2 bg-red-500 rounded-full"></div>
                        <div>
                          <div class="text-xs font-medium text-gray-900 dark:text-white">#41 - Failed</div>
                          <div class="text-xs text-gray-500 dark:text-gray-400">2024-01-15 13:15:22</div>
                        </div>
                      </div>
                      <div class="flex items-center space-x-2">
                        <span class="text-xs text-gray-500 dark:text-gray-400">2m 15s</span>
                        <button class="text-xs text-indigo-600 hover:text-indigo-900 dark:text-indigo-400">View Logs</button>
                      </div>
                    </div>
                  </div>
                  
                  <div class="p-3 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <div class="flex items-center justify-between">
                      <div class="flex items-center space-x-3">
                        <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                        <div>
                          <div class="text-xs font-medium text-gray-900 dark:text-white">#40 - Success</div>
                          <div class="text-xs text-gray-500 dark:text-gray-400">2024-01-15 12:45:10</div>
                        </div>
                      </div>
                      <div class="flex items-center space-x-2">
                        <span class="text-xs text-gray-500 dark:text-gray-400">4m 58s</span>
                        <button class="text-xs text-indigo-600 hover:text-indigo-900 dark:text-indigo-400">View Logs</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Enhanced Modal Footer -->
      <div class="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div class="flex items-center space-x-3">
          <div class="text-xs text-gray-500 dark:text-gray-400 flex items-center">
            <svg class="w-3 h-3 mr-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            Auto-saved
          </div>
        </div>
        <div class="flex items-center space-x-2">
          <button @click="closeEditModal" class="px-4 py-2 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-gray-500 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600 transition-colors duration-200">
            Cancel
          </button>
          <button @click="savePipeline" class="px-4 py-2 text-xs font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 border border-transparent rounded hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-1 focus:ring-indigo-500 shadow-md transform hover:scale-105 transition-all duration-200">
            <svg class="w-3 h-3 mr-1 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            Save and Apply
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Delete Confirmation Modal -->
  <div v-if="showDeleteModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50" @click="closeDeleteModal">
    <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white dark:bg-gray-800" @click.stop>
      <div class="mt-3 text-center">
        <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900">
          <svg class="h-6 w-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.934-.833-2.664 0L3.732 16c-.77.833.192 2.5 1.732 2.5z"></path>
          </svg>
        </div>
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mt-2">Delete Pipeline</h3>
        <div class="mt-2 px-7 py-3">
          <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">
            This action cannot be undone. This will permanently delete the pipeline 
            <span class="font-medium text-gray-900 dark:text-white">{{ selectedPipelineForDelete?.name }}</span> 
            and all of its build history.
          </p>
          <p class="text-sm text-gray-500 dark:text-gray-400 mb-3">
            Please type <span class="font-medium text-red-600 dark:text-red-400">{{ selectedPipelineForDelete?.name }}</span> to confirm.
          </p>
          <input 
            v-model="deleteConfirmationText"
            type="text" 
            class="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
            placeholder="Type pipeline name here"
            @keyup.enter="confirmDelete"
          />
        </div>
        <div class="flex items-center space-x-4 px-4 py-3">
          <button @click="closeDeleteModal" class="flex-1 px-4 py-2 bg-gray-300 text-gray-800 text-sm font-medium rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors">
            Cancel
          </button>
          <button 
            @click="confirmDelete" 
            :disabled="deleteConfirmationText !== selectedPipelineForDelete?.name"
            :class="[
              'flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-red-500',
              deleteConfirmationText === selectedPipelineForDelete?.name 
                ? 'bg-red-600 text-white hover:bg-red-700' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            ]"
          >
            Delete Pipeline
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- History Modal -->
  <div v-if="showHistoryModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50" @click="closeHistoryModal">
    <div class="relative top-6 mx-auto p-4 border w-11/12 max-w-4xl shadow-2xl rounded-xl bg-white dark:bg-gray-800" @click.stop>
      <!-- Modal Header -->
      <div class="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-700">
        <div class="flex items-center space-x-3">
          <div class="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
            <svg class="w-4 h-4 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div>
            <h3 class="text-lg font-bold text-gray-900 dark:text-white">Pipeline History</h3>
            <p class="text-xs text-gray-500 dark:text-gray-400">{{ selectedPipelineForHistory?.name }}</p>
          </div>
        </div>
        <button @click="closeHistoryModal" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 transition-colors duration-200">
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
          </svg>
        </button>
      </div>

      <!-- Modal Body -->
      <div class="mt-4 h-96 overflow-y-auto">
        <!-- History Stats -->
        <div class="grid grid-cols-4 gap-4 mb-6">
          <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 text-center">
            <div class="text-lg font-bold text-gray-900 dark:text-white">{{ pipelineHistory.totalRuns }}</div>
            <div class="text-xs text-gray-500 dark:text-gray-400">Total Runs</div>
          </div>
          <div class="bg-green-50 dark:bg-green-900 rounded-lg p-3 text-center">
            <div class="text-lg font-bold text-green-600 dark:text-green-400">{{ pipelineHistory.successfulRuns }}</div>
            <div class="text-xs text-gray-500 dark:text-gray-400">Successful</div>
          </div>
          <div class="bg-red-50 dark:bg-red-900 rounded-lg p-3 text-center">
            <div class="text-lg font-bold text-red-600 dark:text-red-400">{{ pipelineHistory.failedRuns }}</div>
            <div class="text-xs text-gray-500 dark:text-gray-400">Failed</div>
          </div>
          <div class="bg-blue-50 dark:bg-blue-900 rounded-lg p-3 text-center">
            <div class="text-lg font-bold text-blue-600 dark:text-blue-400">{{ pipelineHistory.successRate }}%</div>
            <div class="text-xs text-gray-500 dark:text-gray-400">Success Rate</div>
          </div>
        </div>

        <!-- History List -->
        <div class="space-y-3">
          <div v-for="run in pipelineHistory.runs" :key="run.id" class="border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <div :class="[
                  'w-3 h-3 rounded-full',
                  run.status === 'Success' ? 'bg-green-500' :
                  run.status === 'Failed' ? 'bg-red-500' :
                  run.status === 'Running' ? 'bg-blue-500 animate-pulse' : 'bg-gray-400'
                ]"></div>
                <div>
                  <div class="flex items-center space-x-2">
                    <span class="text-sm font-medium text-gray-900 dark:text-white">#{{ run.buildNumber }}</span>
                    <span :class="[
                      'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                      run.status === 'Success' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                      run.status === 'Failed' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' :
                      run.status === 'Running' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' :
                      'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
                    ]">{{ run.status }}</span>
                  </div>
                  <div class="text-xs text-gray-500 dark:text-gray-400">{{ run.timestamp }}</div>
                  <div v-if="run.commit" class="text-xs text-gray-500 dark:text-gray-400">
                    <span class="font-mono">{{ run.commit.hash }}</span> - {{ run.commit.message }}
                  </div>
                </div>
              </div>
              <div class="flex items-center space-x-4">
                <div class="text-right">
                  <div class="text-xs text-gray-500 dark:text-gray-400">Duration</div>
                  <div class="text-sm font-medium text-gray-900 dark:text-white">{{ run.duration }}</div>
                </div>
                <div class="flex items-center space-x-1">
                  <button class="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded hover:bg-indigo-200 transition-colors">
                    <svg class="w-3 h-3 mr-1 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                    Logs
                  </button>
                  <button v-if="run.status === 'Failed'" class="text-xs bg-green-100 text-green-700 px-2 py-1 rounded hover:bg-green-200 transition-colors">
                    <svg class="w-3 h-3 mr-1 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                    </svg>
                    Retry
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

useHead({
  title: 'CI/CD Pipelines - AXMP'
})

const stats = ref({
  totalPipelines: 8,
  activePipelines: 6,
  recentRuns: 24,
  successRate: 89
})

const pipelines = ref([
  { id: 1, name: 'frontend-ci-cd', description: 'Frontend application CI/CD', repository: 'github.com/frontend/app.git', branch: 'main', status: 'Success', lastRun: '2024-01-15 14:30', type: 'web' },
  { id: 2, name: 'api-service-build', description: 'API service build pipeline', repository: 'github.com/api/service.git', branch: 'main', status: 'Running', lastRun: '2024-01-15 13:45', type: 'api' },
  { id: 3, name: 'mobile-backend-cd', description: 'Mobile backend deployment', repository: 'github.com/mobile/backend.git', branch: 'develop', status: 'Failed', lastRun: '2024-01-15 12:20', type: 'mobile' },
  { id: 4, name: 'data-pipeline-etl', description: 'Data processing ETL pipeline', repository: 'github.com/data/pipeline.git', branch: 'main', status: 'Success', lastRun: '2024-01-15 11:15', type: 'service' }
])

// Edit Modal State
const showEditModal = ref(false)
const selectedPipeline = ref<any>(null)
const activeEditTab = ref('general')

// Edit Tabs Configuration for Pipeline
const editTabs = [
  { id: 'general', name: 'General' },
  { id: 'repository', name: 'Repository' },
  { id: 'build', name: 'Build' },
  { id: 'history', name: 'History' }
]

// Edit Form Data for Pipeline
interface PipelineFormData {
  general: {
    pipelineName: string
    branch: string
    submoduleBranch: string
    buildHistoryCount: number
  }
  source: {
    gitRepository: string
    deployRepository: string
    checkoutSubmodule: boolean
    secret: string
  }
  build: {
    buildTool: string
    languageVersion: string
    mavenGoals: string
    mirrorUrl: string
    sonarScanning: string
    sonarQubeUrl: string
    sonarProjectKey: string
    sonarProjectLoginToken: string
    workspaceDiskSize: number
    cacheEnable: boolean
    // Advanced settings
    dockerfilePath: string
    autoTagging: boolean
    tagPrefix: string
    imageBuildArguments: Array<{key: string, value: string}>
  }
  container: {
    imageBuild: boolean
    imageRepository: string
    secret: string
    context: string
    dockerfile: string
    imageBuildArgument: string
  }
}

const editForm = ref<PipelineFormData>({
  general: {
    pipelineName: '',
    branch: 'main',
    submoduleBranch: '',
    buildHistoryCount: 10
  },
  source: {
    gitRepository: '',
    deployRepository: '',
    checkoutSubmodule: false,
    secret: ''
  },
  build: {
    buildTool: '',
    languageVersion: '',
    mavenGoals: '',
    mirrorUrl: '',
    sonarScanning: 'Disabled',
    sonarQubeUrl: '',
    sonarProjectKey: '',
    sonarProjectLoginToken: '',
    workspaceDiskSize: 2,
    cacheEnable: false,
    dockerfilePath: '',
    autoTagging: false,
    tagPrefix: '',
    imageBuildArguments: []
  },
  container: {
    imageBuild: false,
    imageRepository: '',
    secret: '',
    context: '',
    dockerfile: '',
    imageBuildArgument: ''
  }
})

// Methods
const handleCreatePipeline = () => {
  selectedPipeline.value = null
  editForm.value = {
    general: {
      pipelineName: '',
      branch: 'main',
      submoduleBranch: '',
      buildHistoryCount: 10
    },
    source: {
      gitRepository: '',
      deployRepository: '',
      checkoutSubmodule: false,
      secret: ''
    },
    build: {
      buildTool: '',
      languageVersion: '',
      mavenGoals: '',
      mirrorUrl: '',
      sonarScanning: 'Disabled',
      sonarQubeUrl: '',
      sonarProjectKey: '',
      sonarProjectLoginToken: '',
      workspaceDiskSize: 2,
      cacheEnable: false,
      dockerfilePath: '',
      autoTagging: false,
      tagPrefix: '',
      imageBuildArguments: []
    },
    container: {
      imageBuild: false,
      imageRepository: '',
      secret: '',
      context: '',
      dockerfile: '',
      imageBuildArgument: ''
    }
  }
  showEditModal.value = true
  activeEditTab.value = 'general'
}

const handleEditPipeline = (pipeline: any) => {
  selectedPipeline.value = pipeline
  editForm.value.general.pipelineName = pipeline.name
  editForm.value.general.branch = pipeline.branch || 'main'
  editForm.value.source.gitRepository = pipeline.repository
  
  showEditModal.value = true
  activeEditTab.value = 'general'
}

const handleRunPipeline = (pipeline: any) => {
  console.log('Run pipeline:', pipeline.name)
}

const closeEditModal = () => {
  showEditModal.value = false
  selectedPipeline.value = null
  activeEditTab.value = 'general'
}

const savePipeline = () => {
  console.log('Save pipeline:', editForm.value)
  closeEditModal()
}

const getTabCompletionIcon = (tabId: string) => {
  switch (tabId) {
    case 'general':
      return editForm.value.general.pipelineName && editForm.value.general.branch
    case 'build':
      return editForm.value.build.buildTool && editForm.value.build.languageVersion
    case 'repository':
      return editForm.value.source.gitRepository && (editForm.value.source.deployRepository || editForm.value.container.imageRepository)
    case 'history':
      return true // History tab is always considered complete
    default:
      return false
  }
}

const getProgressPercentage = () => {
  let completedSections = 0
  let totalSections = 4
  
  // General completion
  if (editForm.value.general.pipelineName && editForm.value.general.branch) {
    completedSections++
  }
  
  // Build completion
  if (editForm.value.build.buildTool && editForm.value.build.languageVersion) {
    completedSections++
  }
  
  // Repository completion
  if (editForm.value.source.gitRepository && (editForm.value.source.deployRepository || editForm.value.container.imageRepository)) {
    completedSections++
  }
  
  // History is always complete
  completedSections++
  
  return Math.round((completedSections / totalSections) * 100)
}

const getPipelineIconClass = (type: string) => {
  const classes = {
    'web': 'bg-blue-500',
    'api': 'bg-green-500',
    'mobile': 'bg-purple-500',
    'service': 'bg-orange-500'
  }
  return classes[type as keyof typeof classes] || 'bg-gray-500'
}

const getStatusClass = (status: string) => {
  const classes = {
    'Success': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    'Running': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    'Failed': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
  }
  return classes[status as keyof typeof classes] || 'bg-gray-100 text-gray-800'
}

const getLanguageLabel = () => {
  if (editForm.value.build.buildTool === 'maven' || editForm.value.build.buildTool === 'gradle') {
    return 'JDK Version'
  } else if (editForm.value.build.buildTool === 'npm' || editForm.value.build.buildTool === 'yarn') {
    return 'Node.js Version'
  }
  return 'Language Version'
}

const addImageBuildArgument = () => {
  editForm.value.build.imageBuildArguments.push({ key: '', value: '' })
}

const removeImageBuildArgument = (index: number) => {
  editForm.value.build.imageBuildArguments.splice(index, 1)
}

const showDeleteModal = ref(false)
const selectedPipelineForDelete = ref<any>(null)
const deleteConfirmationText = ref('')

const closeDeleteModal = () => {
  showDeleteModal.value = false
  selectedPipelineForDelete.value = null
  deleteConfirmationText.value = ''
}

const confirmDelete = () => {
  console.log('Delete pipeline:', selectedPipelineForDelete.value)
  closeDeleteModal()
}

const showHistoryModal = ref(false)
const selectedPipelineForHistory = ref<any>(null)
const pipelineHistory = ref({
  totalRuns: 0,
  successfulRuns: 0,
  failedRuns: 0,
  successRate: 0,
  runs: [] as Array<{
    id: number
    buildNumber: number
    status: string
    timestamp: string
    duration: string
    commit?: {
      hash: string
      message: string
    }
  }>
})

const closeHistoryModal = () => {
  showHistoryModal.value = false
  selectedPipelineForHistory.value = null
}

const handleShowHistory = (pipeline: any) => {
  selectedPipelineForHistory.value = pipeline
  // Generate mock history data
  pipelineHistory.value = {
    totalRuns: 25,
    successfulRuns: 22,
    failedRuns: 3,
    successRate: 88,
    runs: [
      {
        id: 1,
        buildNumber: 25,
        status: 'Success',
        timestamp: '2024-01-15 14:30:15',
        duration: '5m 32s',
        commit: {
          hash: 'a1b2c3d',
          message: 'Update user authentication flow'
        }
      },
      {
        id: 2,
        buildNumber: 24,
        status: 'Failed',
        timestamp: '2024-01-15 13:15:22',
        duration: '2m 15s',
        commit: {
          hash: 'e4f5g6h',
          message: 'Fix database connection issue'
        }
      },
      {
        id: 3,
        buildNumber: 23,
        status: 'Success',
        timestamp: '2024-01-15 12:45:10',
        duration: '4m 58s',
        commit: {
          hash: 'i7j8k9l',
          message: 'Add new feature for user dashboard'
        }
      },
      {
        id: 4,
        buildNumber: 22,
        status: 'Running',
        timestamp: '2024-01-15 11:30:05',
        duration: '3m 12s',
        commit: {
          hash: 'm0n1o2p',
          message: 'Optimize API performance'
        }
      },
      {
        id: 5,
        buildNumber: 21,
        status: 'Success',
        timestamp: '2024-01-15 10:15:30',
        duration: '6m 05s',
        commit: {
          hash: 'q3r4s5t',
          message: 'Update dependencies'
        }
      }
    ]
  }
  showHistoryModal.value = true
}

const handleDeletePipeline = (pipeline: any) => {
  selectedPipelineForDelete.value = pipeline
  showDeleteModal.value = true
}
</script> 