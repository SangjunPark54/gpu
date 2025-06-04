<template>
  <div class="p-6">
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Cluster Management</h1>
      <p class="text-gray-600 dark:text-gray-400 mt-2">Manage ZCP multi-clusters</p>
    </div>

    <!-- Clusters Overview -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div class="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <svg class="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14-7H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2z"></path>
                </svg>
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Total Clusters</dt>
                <dd class="text-lg font-medium text-gray-900 dark:text-white">{{ stats.totalClusters }}</dd>
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
                <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Active Clusters</dt>
                <dd class="text-lg font-medium text-gray-900 dark:text-white">{{ stats.activeClusters }}</dd>
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
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                </svg>
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Total Nodes</dt>
                <dd class="text-lg font-medium text-gray-900 dark:text-white">{{ stats.totalNodes }}</dd>
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
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">CPU Usage</dt>
                <dd class="text-lg font-medium text-gray-900 dark:text-white">{{ stats.cpuUsage }}%</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Clusters Table -->
    <div class="bg-white dark:bg-gray-800 shadow rounded-lg">
      <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white">Cluster List</h3>
          <button 
            @click="handleCreateCluster"
            class="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-150"
          >
            <svg class="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
            Create New Cluster
          </button>
        </div>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead class="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Cluster Name</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Environment</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Nodes</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Kubernetes Version</th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="cluster in clusters" :key="cluster.id" class="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="w-8 h-8 rounded-full flex items-center justify-center" :class="getEnvironmentIconClass(cluster.environment)">
                    <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clip-rule="evenodd"></path>
                    </svg>
                  </div>
                  <div class="ml-3">
                    <div class="text-sm font-medium text-gray-900 dark:text-white">{{ cluster.name }}</div>
                    <div class="text-sm text-gray-500 dark:text-gray-400">{{ cluster.region }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full" :class="getEnvironmentClass(cluster.environment)">
                  {{ cluster.environment }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{{ cluster.nodes }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full" :class="getStatusClass(cluster.status)">
                  {{ cluster.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{{ cluster.k8sVersion }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="flex items-center justify-end space-x-2">
                  <button 
                    @click="handleEditCluster(cluster)"
                    class="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-150"
                  >
                    <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                    </svg>
                    Edit
                  </button>
                  <button 
                    @click="handleMonitorCluster(cluster)"
                    class="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-150"
                  >
                    <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                    </svg>
                    Monitor
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- Edit Cluster Modal -->
  <div v-if="showEditModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50" @click="closeEditModal">
    <div class="relative top-6 mx-auto p-4 border w-11/12 max-w-6xl shadow-2xl rounded-xl bg-white dark:bg-gray-800" @click.stop>
      <!-- Modal Header with Progress -->
      <div class="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-700">
        <div class="flex items-center space-x-3">
          <div class="w-8 h-8 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center">
            <svg class="w-4 h-4 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14-7H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2z"></path>
            </svg>
          </div>
          <div>
            <h3 class="text-lg font-bold text-gray-900 dark:text-white">{{ selectedCluster ? 'Edit Cluster' : 'Create Cluster' }}</h3>
            <p class="text-xs text-gray-500 dark:text-gray-400">Manage Kubernetes cluster configuration</p>
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
                
                <!-- Infrastructure Icon -->
                <svg v-else-if="tab.id === 'infrastructure'" :class="[
                  'mr-2 h-4 w-4 transition-colors duration-200',
                  activeEditTab === tab.id ? 'text-white' : 'text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300'
                ]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14-7H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2z"></path>
                </svg>
                
                <!-- Security Icon -->
                <svg v-else-if="tab.id === 'security'" :class="[
                  'mr-2 h-4 w-4 transition-colors duration-200',
                  activeEditTab === tab.id ? 'text-white' : 'text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300'
                ]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
                
                <!-- Networking Icon -->
                <svg v-else-if="tab.id === 'networking'" :class="[
                  'mr-2 h-4 w-4 transition-colors duration-200',
                  activeEditTab === tab.id ? 'text-white' : 'text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300'
                ]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9-9a9 9 0 00-9 9m9-9v18"></path>
                </svg>
                
                <!-- Monitoring Icon -->
                <svg v-else-if="tab.id === 'monitoring'" :class="[
                  'mr-2 h-4 w-4 transition-colors duration-200',
                  activeEditTab === tab.id ? 'text-white' : 'text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300'
                ]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
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
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <div>
                <h4 class="text-base font-bold text-gray-900 dark:text-white">General Information</h4>
                <p class="text-xs text-gray-500 dark:text-gray-400">Configure basic cluster metadata</p>
              </div>
            </div>
            
            <div class="grid grid-cols-2 gap-4">
              <!-- Cluster Name Card -->
              <div class="border border-gray-200 dark:border-gray-600 rounded-md p-4">
                <div class="flex items-center justify-between mb-2">
                  <label class="text-xs font-semibold text-gray-700 dark:text-gray-300 flex items-center">
                    <svg class="w-3 h-3 mr-1 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                    </svg>
                    Cluster Name <span class="text-red-500 ml-1">*</span>
                  </label>
                  <div class="text-xs text-gray-500 dark:text-gray-400">Required</div>
                </div>
                <input 
                  v-model="editForm.general.clusterName"
                  type="text" 
                  class="w-full border border-gray-200 dark:border-gray-600 rounded-md px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors duration-200"
                  placeholder="e.g. production-cluster-01"
                />
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Lowercase letters, numbers, and hyphens (-) only</p>
              </div>
              
              <!-- Environment Card -->
              <div class="border border-gray-200 dark:border-gray-600 rounded-md p-4">
                <label class="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                  <svg class="w-3 h-3 mr-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  Environment
                </label>
                <select 
                  v-model="editForm.general.environment"
                  class="w-full border border-gray-200 dark:border-gray-600 rounded-md px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors duration-200"
                >
                  <option value="">Select environment</option>
                  <option value="production">Production</option>
                  <option value="staging">Staging</option>
                  <option value="development">Development</option>
                  <option value="testing">Testing</option>
                </select>
              </div>
            </div>

            <!-- Region and Description -->
            <div class="grid grid-cols-2 gap-4">
              <div class="border border-gray-200 dark:border-gray-600 rounded-md p-4">
                <label class="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                  <svg class="w-3 h-3 mr-1 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  Region
                </label>
                <select 
                  v-model="editForm.general.region"
                  class="w-full border border-gray-200 dark:border-gray-600 rounded-md px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors duration-200"
                >
                  <option value="">Select region</option>
                  <option value="ap-northeast-2">Asia Pacific (Seoul)</option>
                  <option value="us-west-2">US West (Oregon)</option>
                  <option value="eu-west-1">Europe (Ireland)</option>
                </select>
              </div>
              
              <div class="border border-gray-200 dark:border-gray-600 rounded-md p-4">
                <label class="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                  <svg class="w-3 h-3 mr-1 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                  Description
                </label>
                <textarea 
                  v-model="editForm.general.description"
                  rows="3"
                  class="w-full border border-gray-200 dark:border-gray-600 rounded-md px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors duration-200 resize-none"
                  placeholder="Enter detailed description of this cluster..."
                ></textarea>
              </div>
            </div>
          </div>

          <!-- Infrastructure Tab -->
          <div v-if="activeEditTab === 'infrastructure'" class="space-y-4">
            <div class="flex items-center space-x-3 mb-4">
              <div class="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                <svg class="w-4 h-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14-7H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2z"></path>
                </svg>
              </div>
              <div>
                <h4 class="text-base font-bold text-gray-900 dark:text-white">Infrastructure Configuration</h4>
                <p class="text-xs text-gray-500 dark:text-gray-400">Configure cluster infrastructure and nodes</p>
              </div>
            </div>
            
            <div class="space-y-4">
              <!-- Kubernetes Version -->
              <div class="border border-gray-200 dark:border-gray-600 rounded-md p-4">
                <label class="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                  <svg class="w-3 h-3 mr-1 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                  </svg>
                  Kubernetes Version <span class="text-red-500 ml-1">*</span>
                </label>
                <select 
                  v-model="editForm.infrastructure.k8sVersion"
                  class="w-full border border-gray-200 dark:border-gray-600 rounded px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors duration-200"
                >
                  <option value="">Select Kubernetes version</option>
                  <option value="v1.28.3">v1.28.3</option>
                  <option value="v1.27.8">v1.27.8</option>
                  <option value="v1.26.12">v1.26.12</option>
                </select>
              </div>

              <!-- Node Pool Configuration -->
              <div class="border border-gray-200 dark:border-gray-600 rounded-md p-4">
                <div class="flex items-center justify-between mb-3">
                  <label class="text-xs font-semibold text-gray-700 dark:text-gray-300 flex items-center">
                    <svg class="w-3 h-3 mr-1 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                    </svg>
                    Node Pools
                  </label>
                  <button class="inline-flex items-center px-2 py-1 bg-purple-600 text-white text-xs font-medium rounded hover:bg-purple-700">
                    <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                    Add Node Pool
                  </button>
                </div>
                <div class="grid grid-cols-3 gap-2">
                  <input type="text" placeholder="Node Pool Name" class="border border-gray-200 dark:border-gray-600 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-purple-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white" />
                  <select class="border border-gray-200 dark:border-gray-600 rounded px-2 py-1 text-xs bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                    <option>m5.large</option>
                    <option>m5.xlarge</option>
                    <option>m5.2xlarge</option>
                  </select>
                  <input type="number" placeholder="Node Count" min="1" class="border border-gray-200 dark:border-gray-600 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-purple-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white" />
                </div>
              </div>
            </div>
          </div>

          <!-- Security, Networking, Monitoring tabs would follow similar pattern -->
          
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
          <button @click="saveCluster" class="px-4 py-2 text-xs font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 border border-transparent rounded hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-1 focus:ring-indigo-500 shadow-md transform hover:scale-105 transition-all duration-200">
            <svg class="w-3 h-3 mr-1 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            Save and Apply
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

useHead({
  title: 'Cluster Management - AXMP'
})

const stats = ref({
  totalClusters: 7,
  activeClusters: 6,
  totalNodes: 42,
  cpuUsage: 68
})

const clusters = ref([
  { id: 1, name: 'prod-cluster-01', environment: 'Production', region: 'ap-northeast-2', nodes: 12, status: 'Running', k8sVersion: 'v1.28.3' },
  { id: 2, name: 'staging-cluster', environment: 'Staging', region: 'ap-northeast-2', nodes: 6, status: 'Running', k8sVersion: 'v1.28.3' },
  { id: 3, name: 'dev-cluster', environment: 'Development', region: 'ap-northeast-2', nodes: 8, status: 'Running', k8sVersion: 'v1.27.8' },
  { id: 4, name: 'test-cluster', environment: 'Testing', region: 'us-west-2', nodes: 4, status: 'Maintenance', k8sVersion: 'v1.28.3' }
])

// Edit Modal State
const showEditModal = ref(false)
const selectedCluster = ref<any>(null)
const activeEditTab = ref('general')

// Edit Tabs Configuration for Cluster
const editTabs = [
  { id: 'general', name: 'General' },
  { id: 'infrastructure', name: 'Infrastructure' },
  { id: 'security', name: 'Security' },
  { id: 'networking', name: 'Networking' },
  { id: 'monitoring', name: 'Monitoring' }
]

// Edit Form Data for Cluster
interface ClusterFormData {
  general: {
    clusterName: string
    environment: string
    region: string
    description: string
  }
  infrastructure: {
    k8sVersion: string
    nodePools: Array<{
      name: string
      instanceType: string
      nodeCount: number
    }>
  }
}

const editForm = ref<ClusterFormData>({
  general: {
    clusterName: '',
    environment: '',
    region: '',
    description: ''
  },
  infrastructure: {
    k8sVersion: '',
    nodePools: [{
      name: '',
      instanceType: '',
      nodeCount: 1
    }]
  }
})

// Methods
const handleCreateCluster = () => {
  selectedCluster.value = null
  editForm.value = {
    general: {
      clusterName: '',
      environment: '',
      region: '',
      description: ''
    },
    infrastructure: {
      k8sVersion: '',
      nodePools: [{
        name: '',
        instanceType: '',
        nodeCount: 1
      }]
    }
  }
  showEditModal.value = true
  activeEditTab.value = 'general'
}

const handleEditCluster = (cluster: any) => {
  selectedCluster.value = cluster
  editForm.value.general.clusterName = cluster.name
  editForm.value.general.environment = cluster.environment.toLowerCase()
  editForm.value.general.region = cluster.region
  editForm.value.general.description = cluster.description || ''
  editForm.value.infrastructure.k8sVersion = cluster.k8sVersion
  
  showEditModal.value = true
  activeEditTab.value = 'general'
}

const handleMonitorCluster = (cluster: any) => {
  console.log('Monitor cluster:', cluster.name)
}

const closeEditModal = () => {
  showEditModal.value = false
  selectedCluster.value = null
  activeEditTab.value = 'general'
}

const saveCluster = () => {
  console.log('Save cluster:', editForm.value)
  closeEditModal()
}

const getTabCompletionIcon = (tabId: string) => {
  switch (tabId) {
    case 'general':
      return editForm.value.general.clusterName && editForm.value.general.environment
    case 'infrastructure':
      return editForm.value.infrastructure.k8sVersion
    default:
      return false
  }
}

const getProgressPercentage = () => {
  let completedSections = 0
  let totalSections = 5
  
  // General completion
  if (editForm.value.general.clusterName && editForm.value.general.environment) {
    completedSections++
  }
  
  // Infrastructure completion  
  if (editForm.value.infrastructure.k8sVersion) {
    completedSections++
  }
  
  // Add base completion for demo
  completedSections += 1
  
  return Math.round((completedSections / totalSections) * 100)
}

const getEnvironmentIconClass = (environment: string) => {
  const classes = {
    'Production': 'bg-red-500',
    'Staging': 'bg-yellow-500',
    'Development': 'bg-blue-500',
    'Testing': 'bg-green-500'
  }
  return classes[environment as keyof typeof classes] || 'bg-gray-500'
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
    'Maintenance': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    'Error': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
  }
  return classes[status as keyof typeof classes] || 'bg-gray-100 text-gray-800'
}
</script> 