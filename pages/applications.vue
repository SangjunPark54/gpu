<template>
  <div>
    <!-- Page Header -->
    <div class="mb-8">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Applications <span class="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full ml-2">14</span></h1>
          <p class="text-gray-600 dark:text-gray-400 mt-1">Deploy and manage applications</p>
        </div>
        <div class="flex items-center space-x-4">
          <NuxtLink to="/applications" class="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300 text-sm">Home</NuxtLink>
          <NuxtLink to="/applications" class="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300 text-sm">Applications</NuxtLink>
        </div>
      </div>
    </div>

    <!-- Filter Section -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
      <div class="flex items-center space-x-4">
        <svg class="w-5 h-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z"></path>
        </svg>
        <span class="text-lg font-medium text-gray-900 dark:text-white">Filter</span>
      </div>
      <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tags</label>
          <input
            type="text"
            placeholder="Select or enter the tags. Ex) > tag or tag:value"
            class="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name</label>
          <input
            type="text"
            placeholder="Application Name"
            class="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="flex justify-between items-center mb-6">
      <div class="flex space-x-4">
        <button class="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 flex items-center">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          Create Application
        </button>
        <button class="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8z"></path>
          </svg>
          Copy Application
        </button>
      </div>
      <div class="flex items-center space-x-4">
        <select class="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
        <div class="flex items-center space-x-2">
          <button class="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
            1
          </button>
          <span class="text-sm text-gray-500 dark:text-gray-400">of 1</span>
        </div>
      </div>
    </div>

    <!-- Applications Table -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead class="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th class="px-6 py-3 text-left">
                <input type="checkbox" class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded">
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">App Name</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Display Name</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Deployed Image</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Usage</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Deploy Status</th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="(app, index) in applications" :key="app.id" :class="index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700'" class="hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-150">
              <td class="px-6 py-4 whitespace-nowrap">
                <input type="checkbox" class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded">
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 w-10 h-10">
                    <div class="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                      <svg class="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14-7H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2z"></path>
                      </svg>
                    </div>
                  </div>
                  <div class="ml-4">
                    <button 
                      @click="handleViewApplication(app)"
                      class="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300 hover:underline focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
                    >
                      {{ app.name }}
                    </button>
                    <p class="text-sm text-gray-500 dark:text-gray-400">{{ app.type }} App</p>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                {{ app.displayName || '-' }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="max-w-xs truncate">
                  <span class="text-sm text-gray-900 dark:text-white font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-xs">
                    {{ app.deployedImage || '-' }}
                  </span>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="space-y-2">
                  <!-- CPU 사용률 -->
                  <div class="flex items-center space-x-2">
                    <div class="flex items-center space-x-1 w-16">
                      <svg class="w-3 h-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
                      </svg>
                      <span class="text-xs text-gray-600 dark:text-gray-400">CPU</span>
                    </div>
                    <div class="flex items-center space-x-2">
                      <span class="text-xs font-medium text-gray-900 dark:text-white w-8">{{ app.usage?.cpu || 0 }}%</span>
                      <div class="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                        <div 
                          :class="getUsageBarClass(app.usage?.cpu || 0)"
                          class="h-1.5 rounded-full transition-all duration-300"
                          :style="{ width: (app.usage?.cpu || 0) + '%' }"
                        ></div>
                      </div>
                    </div>
                  </div>
                  <!-- Memory 사용률 -->
                  <div class="flex items-center space-x-2">
                    <div class="flex items-center space-x-1 w-16">
                      <svg class="w-3 h-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                      </svg>
                      <span class="text-xs text-gray-600 dark:text-gray-400">MEM</span>
                    </div>
                    <div class="flex items-center space-x-2">
                      <span class="text-xs font-medium text-gray-900 dark:text-white w-8">{{ app.usage?.memory || 0 }}%</span>
                      <div class="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                        <div 
                          :class="getUsageBarClass(app.usage?.memory || 0)"
                          class="h-1.5 rounded-full transition-all duration-300"
                          :style="{ width: (app.usage?.memory || 0) + '%' }"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="getDeployStatusClass(app.deployStatus)" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium">
                  <svg :class="getDeployStatusIconClass(app.deployStatus)" class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path v-if="app.deployStatus === 'deployed'" fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                    <path v-else-if="app.deployStatus === 'failed'" fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
                    <path v-else-if="app.deployStatus === 'deploying'" fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"></path>
                    <path v-else fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clip-rule="evenodd"></path>
                  </svg>
                  {{ getDeployStatusText(app.deployStatus) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="flex justify-end space-x-2">
                  <button 
                    @click="handleEditApplication(app)"
                    class="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-150"
                  >
                    <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                    </svg>
                    Edit
                  </button>
                  <button 
                    @click="handleDeployApplication(app)"
                    :disabled="app.deployStatus === 'deploying'"
                    :class="[
                      'inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded transition-colors duration-150',
                      app.deployStatus === 'deploying'
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-green-100 text-green-700 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-500'
                    ]"
                  >
                    <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                    </svg>
                    Deploy
                  </button>
                  <button 
                    @click="handleDeleteApplication(app)"
                    class="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors duration-150"
                  >
                    <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- Edit Application Modal -->
  <div v-if="showEditModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50" @click="closeEditModal">
    <div class="relative top-6 mx-auto p-4 border w-11/12 max-w-6xl shadow-2xl rounded-xl bg-white dark:bg-gray-800" @click.stop>
      <!-- Modal Header with Progress -->
      <div class="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-700">
        <div class="flex items-center space-x-3">
          <div class="w-8 h-8 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center">
            <svg class="w-4 h-4 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
            </svg>
          </div>
          <div>
            <h3 class="text-lg font-bold text-gray-900 dark:text-white">Edit Application</h3>
            <p class="text-xs text-gray-500 dark:text-gray-400">Manage Kubernetes application settings</p>
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
                
                <!-- Application Icon -->
                <svg v-else-if="tab.id === 'application'" :class="[
                  'mr-2 h-4 w-4 transition-colors duration-200',
                  activeEditTab === tab.id ? 'text-white' : 'text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300'
                ]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14-7H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2z"></path>
                </svg>
                
                <!-- Deploy Icon -->
                <svg v-else-if="tab.id === 'deploy'" :class="[
                  'mr-2 h-4 w-4 transition-colors duration-200',
                  activeEditTab === tab.id ? 'text-white' : 'text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300'
                ]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                </svg>
                
                <!-- Storage Icon -->
                <svg v-else-if="tab.id === 'storage'" :class="[
                  'mr-2 h-4 w-4 transition-colors duration-200',
                  activeEditTab === tab.id ? 'text-white' : 'text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300'
                ]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"></path>
                </svg>
                
                <!-- Network Icon -->
                <svg v-else-if="tab.id === 'network'" :class="[
                  'mr-2 h-4 w-4 transition-colors duration-200',
                  activeEditTab === tab.id ? 'text-white' : 'text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300'
                ]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9-9a9 9 0 00-9 9m9-9v18"></path>
                </svg>
                
                <!-- Secret Icon -->
                <svg v-else-if="tab.id === 'secret'" :class="[
                  'mr-2 h-4 w-4 transition-colors duration-200',
                  activeEditTab === tab.id ? 'text-white' : 'text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300'
                ]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
                
                <!-- Taint/Tolerance Icon -->
                <svg v-else-if="tab.id === 'taint'" :class="[
                  'mr-2 h-4 w-4 transition-colors duration-200',
                  activeEditTab === tab.id ? 'text-white' : 'text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300'
                ]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
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
                <p class="text-xs text-gray-500 dark:text-gray-400">Configure basic application metadata</p>
              </div>
            </div>
            
            <div class="grid grid-cols-2 gap-4">
              <!-- App Name Card -->
              <div class="border border-gray-200 dark:border-gray-600 rounded-md p-4">
                <div class="flex items-center justify-between mb-2">
                  <label class="text-xs font-semibold text-gray-700 dark:text-gray-300 flex items-center">
                    <svg class="w-3 h-3 mr-1 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                    </svg>
                    Application Name <span class="text-red-500 ml-1">*</span>
                  </label>
                  <div class="text-xs text-gray-500 dark:text-gray-400">Required</div>
                </div>
                <input 
                  v-model="editForm.general.appName"
                  type="text" 
                  class="w-full border border-gray-200 dark:border-gray-600 rounded-md px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors duration-200"
                  placeholder="e.g. my-web-application"
                />
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Lowercase letters, numbers, and hyphens (-) only</p>
              </div>
              
              <!-- Description Card -->
              <div class="border border-gray-200 dark:border-gray-600 rounded-md p-4">
                <label class="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                  <svg class="w-3 h-3 mr-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"></path>
                  </svg>
                  Description
                </label>
                <textarea 
                  v-model="editForm.general.description"
                  rows="3"
                  class="w-full border border-gray-200 dark:border-gray-600 rounded-md px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors duration-200 resize-none"
                  placeholder="Enter detailed description of this application..."
                ></textarea>
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Maximum 500 characters</p>
              </div>
            </div>

            <!-- Tags Card -->
            <div class="border border-gray-200 dark:border-gray-600 rounded-md p-4">
              <div class="flex items-center justify-between mb-3">
                <label class="text-xs font-semibold text-gray-700 dark:text-gray-300 flex items-center">
                  <svg class="w-3 h-3 mr-1 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                  </svg>
                  Tags
                </label>
                <button @click="addTag" class="inline-flex items-center px-2 py-1 bg-indigo-600 text-white text-xs font-medium rounded hover:bg-indigo-700 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors duration-200">
                  <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                  Add Tag
                </button>
              </div>
              <div class="space-y-2">
                <div v-for="(tag, index) in editForm.general.tags" :key="index" class="flex items-center space-x-2 bg-gray-50 dark:bg-gray-700 rounded p-2">
                  <input 
                    v-model="tag.key"
                    type="text" 
                    placeholder="environment"
                    class="flex-1 border border-gray-200 dark:border-gray-600 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                  <span class="text-gray-400 text-xs">:</span>
                  <input 
                    v-model="tag.value"
                    type="text" 
                    placeholder="production"
                    class="flex-1 border border-gray-200 dark:border-gray-600 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                  <button @click="removeTag(index)" class="text-red-500 hover:text-red-700 p-1 rounded transition-colors duration-200">
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Application Tab -->
          <div v-if="activeEditTab === 'application'" class="space-y-4">
            <div class="flex items-center space-x-3 mb-4">
              <div class="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                <svg class="w-4 h-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14-7H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2z"></path>
                </svg>
              </div>
              <div>
                <h4 class="text-base font-bold text-gray-900 dark:text-white">Application Configuration</h4>
                <p class="text-xs text-gray-500 dark:text-gray-400">Connect source code and image repositories</p>
              </div>
            </div>
            
            <div class="grid grid-cols-1 gap-4">
              <!-- Pipeline Card -->
              <div class="border border-gray-200 dark:border-gray-600 rounded-md p-4">
                <label class="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                  <svg class="w-3 h-3 mr-1 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                  Connected Pipeline
                </label>
                <select 
                  v-model="editForm.application.pipeline"
                  @change="onPipelineChange"
                  class="w-full border border-gray-200 dark:border-gray-600 rounded px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors duration-200"
                >
                  <option value="">Select a pipeline</option>
                  <option v-for="pipeline in availablePipelines" :key="pipeline.id" :value="pipeline.id">
                    {{ pipeline.icon }} {{ pipeline.name }}
                  </option>
                </select>
              </div>

              <!-- Git Repository and Image Repository -->
              <div class="grid grid-cols-2 gap-4">
                <div class="border border-gray-200 dark:border-gray-600 rounded-md p-4">
                  <label class="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                    <svg class="w-3 h-3 mr-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
                    </svg>
                    Git Repository <span class="text-red-500 ml-1">*</span>
                  </label>
                  <input 
                    v-model="editForm.application.gitRepository"
                    type="text" 
                    class="w-full border border-gray-200 dark:border-gray-600 rounded px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors duration-200"
                    placeholder="https://github.com/username/repository.git"
                  />
                </div>

                <div class="border border-gray-200 dark:border-gray-600 rounded-md p-4">
                  <label class="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                    <svg class="w-3 h-3 mr-1 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14-7H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2z"></path>
                    </svg>
                    Image Repository <span class="text-red-500 ml-1">*</span>
                  </label>
                  <input 
                    v-model="editForm.application.imageRepository"
                    type="text" 
                    class="w-full border border-gray-200 dark:border-gray-600 rounded px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors duration-200"
                    placeholder="registry.example.com/username/image"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Deploy Tab with enhanced UI continues... -->
          <div v-if="activeEditTab === 'deploy'" class="space-y-4">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <div class="w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
                  <svg class="w-4 h-4 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
                  </svg>
                </div>
                <div>
                  <h4 class="text-base font-bold text-gray-900 dark:text-white">Kubernetes Deployment Configuration</h4>
                  <p class="text-xs text-gray-500 dark:text-gray-400">Manage container deployment and resource settings</p>
                </div>
              </div>
              <button @click="addDeployment" class="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-medium rounded hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-1 focus:ring-indigo-500 shadow-md transform hover:scale-105 transition-all duration-200">
                <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                Add Deployment Environment
              </button>
            </div>

            <div class="space-y-4">
              <div v-for="(deployment, index) in editForm.deploy.deployments" :key="index" class="border border-gray-200 dark:border-gray-600 rounded-lg p-4 shadow-sm">
                <div class="flex items-center justify-between mb-4">
                  <div class="flex items-center space-x-2">
                    <div class="w-6 h-6 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center">
                      <span class="text-xs font-bold text-indigo-600 dark:text-indigo-400">{{ index + 1 }}</span>
                    </div>
                    <h5 class="text-sm font-semibold text-gray-900 dark:text-white">Deployment Environment {{ index + 1 }}</h5>
                  </div>
                  <button v-if="editForm.deploy.deployments.length > 1" @click="removeDeployment(index)" class="text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 dark:bg-red-900 dark:hover:bg-red-800 p-1.5 rounded transition-colors duration-200">
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                  </button>
                </div>

                <div class="grid grid-cols-2 gap-4 mb-4">
                  <div class="space-y-1">
                    <label class="block text-xs font-semibold text-gray-700 dark:text-gray-300 flex items-center">
                      <svg class="w-3 h-3 mr-1 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                      </svg>
                      Deployment Name <span class="text-red-500 ml-1">*</span>
                    </label>
                    <input 
                      v-model="deployment.name"
                      type="text" 
                      placeholder="e.g. web-frontend"
                      class="w-full border border-gray-200 dark:border-gray-600 rounded px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors duration-200"
                    />
                  </div>
                  <div class="space-y-1">
                    <label class="block text-xs font-semibold text-gray-700 dark:text-gray-300 flex items-center">
                      <svg class="w-3 h-3 mr-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                      </svg>
                      Display Name
                    </label>
                    <input 
                      v-model="deployment.displayName"
                      type="text" 
                      placeholder="e.g. Web Frontend"
                      class="w-full border border-gray-200 dark:border-gray-600 rounded px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors duration-200"
                    />
                  </div>
                </div>

                <!-- Enhanced Resource Settings with Visual Sliders -->
                <div class="bg-gray-50 dark:bg-gray-800 rounded-md p-4">
                  <h6 class="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                    <svg class="w-4 h-4 mr-1 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                    </svg>
                    Resource Configuration
                  </h6>
                  
                  <div class="grid grid-cols-2 gap-4">
                    <div class="space-y-3">
                      <!-- CPU Request Slider -->
                      <div class="bg-white dark:bg-gray-700 rounded p-3 border border-gray-200 dark:border-gray-600">
                        <label class="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center justify-between">
                          <span class="flex items-center">
                            <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
                            </svg>
                            CPU Request
                          </span>
                          <span class="bg-gray-100 dark:bg-gray-600 px-1.5 py-0.5 rounded text-xs font-bold">{{ deployment.resources.cpuRequest }}m</span>
                        </label>
                        <input 
                          v-model="deployment.resources.cpuRequest"
                          type="range" 
                          min="100" 
                          max="2000" 
                          step="100"
                          class="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer slider-blue"
                        />
                        <div class="flex justify-between text-xs text-gray-500 mt-1">
                          <span>100m</span>
                          <span>2000m</span>
                        </div>
                      </div>

                      <!-- Memory Request Slider -->
                      <div class="bg-white dark:bg-gray-700 rounded p-3 border border-gray-200 dark:border-gray-600">
                        <label class="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center justify-between">
                          <span class="flex items-center">
                            <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"></path>
                            </svg>
                            Memory Request
                          </span>
                          <span class="bg-gray-100 dark:bg-gray-600 px-1.5 py-0.5 rounded text-xs font-bold">{{ deployment.resources.memoryRequest }}Mi</span>
                        </label>
                        <input 
                          v-model="deployment.resources.memoryRequest"
                          type="range" 
                          min="128" 
                          max="2048" 
                          step="128"
                          class="w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer slider-green"
                        />
                        <div class="flex justify-between text-xs text-gray-500 mt-1">
                          <span>128Mi</span>
                          <span>2048Mi</span>
                        </div>
                      </div>
                    </div>

                    <div class="space-y-3">
                      <!-- CPU Limit Slider -->
                      <div class="bg-white dark:bg-gray-700 rounded p-3 border border-gray-200 dark:border-gray-600">
                        <label class="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center justify-between">
                          <span class="flex items-center">
                            <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                            </svg>
                            CPU Limit
                          </span>
                          <span class="bg-gray-100 dark:bg-gray-600 px-1.5 py-0.5 rounded text-xs font-bold">{{ deployment.resources.cpuLimit }}m</span>
                        </label>
                        <input 
                          v-model="deployment.resources.cpuLimit"
                          type="range" 
                          min="100" 
                          max="4000" 
                          step="100"
                          class="w-full h-2 bg-orange-200 rounded-lg appearance-none cursor-pointer slider-orange"
                        />
                        <div class="flex justify-between text-xs text-gray-500 mt-1">
                          <span>100m</span>
                          <span>4000m</span>
                        </div>
                      </div>

                      <!-- Memory Limit Slider -->
                      <div class="bg-white dark:bg-gray-700 rounded p-3 border border-gray-200 dark:border-gray-600">
                        <label class="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center justify-between">
                          <span class="flex items-center">
                            <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            Memory Limit
                          </span>
                          <span class="bg-gray-100 dark:bg-gray-600 px-1.5 py-0.5 rounded text-xs font-bold">{{ deployment.resources.memoryLimit }}Mi</span>
                        </label>
                        <input 
                          v-model="deployment.resources.memoryLimit"
                          type="range" 
                          min="128" 
                          max="4096" 
                          step="128"
                          class="w-full h-2 bg-red-200 rounded-lg appearance-none cursor-pointer slider-red"
                        />
                        <div class="flex justify-between text-xs text-gray-500 mt-1">
                          <span>128Mi</span>
                          <span>4096Mi</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Storage Tab -->
          <div v-if="activeEditTab === 'storage'" class="space-y-4">
            <div class="flex items-center space-x-3 mb-4">
              <div class="w-8 h-8 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center">
                <svg class="w-4 h-4 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"></path>
                </svg>
              </div>
              <div>
                <h4 class="text-base font-bold text-gray-900 dark:text-white">Storage Configuration</h4>
                <p class="text-xs text-gray-500 dark:text-gray-400">Configure data storage and volumes</p>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <!-- PVC Configuration -->
              <div class="border border-gray-200 dark:border-gray-600 rounded-md p-4">
                <div class="flex items-center justify-between mb-3">
                  <label class="text-xs font-semibold text-gray-700 dark:text-gray-300 flex items-center">
                    <svg class="w-3 h-3 mr-1 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14-7H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2z"></path>
                    </svg>
                    Persistent Volume Claims
                  </label>
                  <button class="inline-flex items-center px-2 py-1 bg-amber-600 text-white text-xs font-medium rounded hover:bg-amber-700">
                    <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                    Add PVC
                  </button>
                </div>
                <div class="space-y-2">
                  <input type="text" placeholder="PVC Name" class="w-full border border-gray-200 dark:border-gray-600 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-amber-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white" />
                  <select class="w-full border border-gray-200 dark:border-gray-600 rounded px-2 py-1 text-xs bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                    <option>ReadWriteOnce</option>
                    <option>ReadOnlyMany</option>
                    <option>ReadWriteMany</option>
                  </select>
                  <input type="text" placeholder="Size (e.g. 10Gi)" class="w-full border border-gray-200 dark:border-gray-600 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-amber-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white" />
                </div>
              </div>

              <!-- ConfigMap Configuration -->
              <div class="border border-gray-200 dark:border-gray-600 rounded-md p-4">
                <div class="flex items-center justify-between mb-3">
                  <label class="text-xs font-semibold text-gray-700 dark:text-gray-300 flex items-center">
                    <svg class="w-3 h-3 mr-1 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                    ConfigMap
                  </label>
                  <button class="inline-flex items-center px-2 py-1 bg-teal-600 text-white text-xs font-medium rounded hover:bg-teal-700">
                    <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                    Add
                  </button>
                </div>
                <div class="space-y-2">
                  <input type="text" placeholder="ConfigMap Name" class="w-full border border-gray-200 dark:border-gray-600 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-teal-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white" />
                  <textarea rows="3" placeholder="key1=value1&#10;key2=value2" class="w-full border border-gray-200 dark:border-gray-600 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-teal-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"></textarea>
                </div>
              </div>
            </div>

            <!-- Volume Mount Configuration -->
            <div class="border border-gray-200 dark:border-gray-600 rounded-md p-4">
              <div class="flex items-center justify-between mb-3">
                <label class="text-xs font-semibold text-gray-700 dark:text-gray-300 flex items-center">
                  <svg class="w-3 h-3 mr-1 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                  </svg>
                  Volume Mount
                </label>
                <button class="inline-flex items-center px-2 py-1 bg-blue-600 text-white text-xs font-medium rounded hover:bg-blue-700">
                  <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                  Add Mount
                </button>
              </div>
              <div class="grid grid-cols-3 gap-2">
                <input type="text" placeholder="Volume Name" class="border border-gray-200 dark:border-gray-600 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white" />
                <input type="text" placeholder="Mount Path" class="border border-gray-200 dark:border-gray-600 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white" />
                <select class="border border-gray-200 dark:border-gray-600 rounded px-2 py-1 text-xs bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                  <option>ReadWrite</option>
                  <option>ReadOnly</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Network Tab -->
          <div v-if="activeEditTab === 'network'" class="space-y-4">
            <div class="flex items-center space-x-3 mb-4">
              <div class="w-8 h-8 bg-cyan-100 dark:bg-cyan-900 rounded-lg flex items-center justify-center">
                <svg class="w-4 h-4 text-cyan-600 dark:text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9-9a9 9 0 00-9 9m9-9v18"></path>
                </svg>
              </div>
              <div>
                <h4 class="text-base font-bold text-gray-900 dark:text-white">Network Configuration</h4>
                <p class="text-xs text-gray-500 dark:text-gray-400">Configure services and ingress</p>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <!-- Service Configuration -->
              <div class="border border-gray-200 dark:border-gray-600 rounded-md p-4">
                <div class="flex items-center justify-between mb-3">
                  <label class="text-xs font-semibold text-gray-700 dark:text-gray-300 flex items-center">
                    <svg class="w-3 h-3 mr-1 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h6a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h6a2 2 0 002-2v-4a2 2 0 00-2-2m8-8a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z"></path>
                    </svg>
                    Create Service
                  </label>
                  <button class="inline-flex items-center px-2 py-1 bg-cyan-600 text-white text-xs font-medium rounded hover:bg-cyan-700">
                    <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                    Add Service
                  </button>
                </div>
                <div class="space-y-2">
                  <input type="text" placeholder="Service Name" class="w-full border border-gray-200 dark:border-gray-600 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-cyan-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white" />
                  <select class="w-full border border-gray-200 dark:border-gray-600 rounded px-2 py-1 text-xs bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                    <option>ClusterIP</option>
                    <option>NodePort</option>
                    <option>LoadBalancer</option>
                  </select>
                  <div class="grid grid-cols-2 gap-2">
                    <input type="number" placeholder="Port" class="border border-gray-200 dark:border-gray-600 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-cyan-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white" />
                    <input type="number" placeholder="Target Port" class="border border-gray-200 dark:border-gray-600 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-cyan-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white" />
                  </div>
                </div>
              </div>

              <!-- Ingress Configuration -->
              <div class="border border-gray-200 dark:border-gray-600 rounded-md p-4">
                <div class="flex items-center justify-between mb-3">
                  <label class="text-xs font-semibold text-gray-700 dark:text-gray-300 flex items-center">
                    <svg class="w-3 h-3 mr-1 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m-6 3a2 2 0 11-4 0 2 2 0 014 0zM15 4a2 2 0 104 0 2 2 0 00-4 0z"></path>
                    </svg>
                    Create Ingress
                  </label>
                  <div class="flex items-center">
                    <input type="checkbox" class="h-3 w-3 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded mr-1" />
                    <span class="text-xs text-gray-600 dark:text-gray-400">TLS</span>
                  </div>
                </div>
                <div class="space-y-2">
                  <input type="text" placeholder="Ingress Name" class="w-full border border-gray-200 dark:border-gray-600 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white" />
                  <input type="text" placeholder="Host (e.g. app.example.com)" class="w-full border border-gray-200 dark:border-gray-600 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white" />
                  <input type="text" placeholder="Path (e.g. /api)" class="w-full border border-gray-200 dark:border-gray-600 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white" />
                </div>
              </div>
            </div>

            <!-- Port Mapping Configuration -->
            <div class="border border-gray-200 dark:border-gray-600 rounded-md p-4">
              <div class="flex items-center justify-between mb-3">
                <label class="text-xs font-semibold text-gray-700 dark:text-gray-300 flex items-center">
                  <svg class="w-3 h-3 mr-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                  </svg>
                  Port Mapping
                </label>
                <button class="inline-flex items-center px-2 py-1 bg-green-600 text-white text-xs font-medium rounded hover:bg-green-700">
                  <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                  Add Port
                </button>
              </div>
              <div class="grid grid-cols-4 gap-2">
                <input type="text" placeholder="Port Name" class="border border-gray-200 dark:border-gray-600 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-green-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white" />
                <input type="number" placeholder="Container Port" class="border border-gray-200 dark:border-gray-600 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-green-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white" />
                <select class="border border-gray-200 dark:border-gray-600 rounded px-2 py-1 text-xs bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                  <option>TCP</option>
                  <option>UDP</option>
                </select>
                <input type="text" placeholder="Description" class="border border-gray-200 dark:border-gray-600 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-green-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white" />
              </div>
            </div>
          </div>

          <!-- Secret Tab -->
          <div v-if="activeEditTab === 'secret'" class="space-y-4">
            <div class="flex items-center space-x-3 mb-4">
              <div class="w-8 h-8 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center">
                <svg class="w-4 h-4 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
              </div>
              <div>
                <h4 class="text-base font-bold text-gray-900 dark:text-white">Secret Configuration</h4>
                <p class="text-xs text-gray-500 dark:text-gray-400">Manage sensitive data and certificates</p>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <!-- General Secret -->
              <div class="border border-gray-200 dark:border-gray-600 rounded-md p-4">
                <div class="flex items-center justify-between mb-3">
                  <label class="text-xs font-semibold text-gray-700 dark:text-gray-300 flex items-center">
                    <svg class="w-3 h-3 mr-1 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                    Create Secret
                  </label>
                  <button class="inline-flex items-center px-2 py-1 bg-red-600 text-white text-xs font-medium rounded hover:bg-red-700">
                    <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                    Add
                  </button>
                </div>
                <div class="space-y-2">
                  <input type="text" placeholder="Secret Name" class="w-full border border-gray-200 dark:border-gray-600 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-red-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white" />
                  <select class="w-full border border-gray-200 dark:border-gray-600 rounded px-2 py-1 text-xs bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                    <option>Opaque</option>
                    <option>kubernetes.io/service-account-token</option>
                    <option>kubernetes.io/dockercfg</option>
                  </select>
                  <textarea rows="3" placeholder="key1=value1&#10;key2=value2" class="w-full border border-gray-200 dark:border-gray-600 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-red-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"></textarea>
                </div>
              </div>

              <!-- TLS Secret -->
              <div class="border border-gray-200 dark:border-gray-600 rounded-md p-4">
                <div class="flex items-center justify-between mb-3">
                  <label class="text-xs font-semibold text-gray-700 dark:text-gray-300 flex items-center">
                    <svg class="w-3 h-3 mr-1 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                    </svg>
                    TLS Secret
                  </label>
                  <button class="inline-flex items-center px-2 py-1 bg-orange-600 text-white text-xs font-medium rounded hover:bg-orange-700">
                    <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                    </svg>
                    Upload
                  </button>
                </div>
                <div class="space-y-2">
                  <input type="text" placeholder="TLS Secret Name" class="w-full border border-gray-200 dark:border-gray-600 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-orange-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white" />
                  <div class="border-2 border-dashed border-gray-200 dark:border-gray-600 rounded p-3 text-center">
                    <svg class="w-6 h-6 mx-auto text-gray-400 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                    <p class="text-xs text-gray-500 dark:text-gray-400">Drag and drop certificate files or click to upload</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Environment Variables from Secrets -->
            <div class="border border-gray-200 dark:border-gray-600 rounded-md p-4">
              <div class="flex items-center justify-between mb-3">
                <label class="text-xs font-semibold text-gray-700 dark:text-gray-300 flex items-center">
                  <svg class="w-3 h-3 mr-1 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
                  </svg>
                  Environment Variables (Secret Reference)
                </label>
                <button class="inline-flex items-center px-2 py-1 bg-purple-600 text-white text-xs font-medium rounded hover:bg-purple-700">
                  <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                  Add Variable
                </button>
              </div>
              <div class="grid grid-cols-3 gap-2">
                <input type="text" placeholder="Environment Variable Name" class="border border-gray-200 dark:border-gray-600 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-purple-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white" />
                <input type="text" placeholder="Secret Name" class="border border-gray-200 dark:border-gray-600 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-purple-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white" />
                <input type="text" placeholder="Secret Key" class="border border-gray-200 dark:border-gray-600 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-purple-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white" />
              </div>
            </div>
          </div>

          <!-- Taint/Tolerance Tab -->
          <div v-if="activeEditTab === 'taint'" class="space-y-4">
            <div class="flex items-center space-x-3 mb-4">
              <div class="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                <svg class="w-4 h-4 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
              </div>
              <div>
                <h4 class="text-base font-bold text-gray-900 dark:text-white">Taint/Tolerance Configuration</h4>
                <p class="text-xs text-gray-500 dark:text-gray-400">Configure node placement and scheduling rules</p>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <!-- Node Taint -->
              <div class="border border-gray-200 dark:border-gray-600 rounded-md p-4">
                <div class="flex items-center justify-between mb-3">
                  <label class="text-xs font-semibold text-gray-700 dark:text-gray-300 flex items-center">
                    <svg class="w-3 h-3 mr-1 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728"></path>
                    </svg>
                    Node Taint
                  </label>
                  <button class="inline-flex items-center px-2 py-1 bg-gray-600 text-white text-xs font-medium rounded hover:bg-gray-700">
                    <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                    Add Taint
                  </button>
                </div>
                <div class="space-y-2">
                  <input type="text" placeholder="Key (e.g. gpu-node)" class="w-full border border-gray-200 dark:border-gray-600 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-gray-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white" />
                  <input type="text" placeholder="Value (e.g. nvidia)" class="w-full border border-gray-200 dark:border-gray-600 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-gray-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white" />
                  <select class="w-full border border-gray-200 dark:border-gray-600 rounded px-2 py-1 text-xs bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                    <option>NoSchedule</option>
                    <option>PreferNoSchedule</option>
                    <option>NoExecute</option>
                  </select>
                </div>
              </div>

              <!-- Pod Tolerance -->
              <div class="border border-gray-200 dark:border-gray-600 rounded-md p-4">
                <div class="flex items-center justify-between mb-3">
                  <label class="text-xs font-semibold text-gray-700 dark:text-gray-300 flex items-center">
                    <svg class="w-3 h-3 mr-1 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    Pod Tolerance
                  </label>
                  <button class="inline-flex items-center px-2 py-1 bg-blue-600 text-white text-xs font-medium rounded hover:bg-blue-700">
                    <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                    Add Tolerance
                  </button>
                </div>
                <div class="space-y-2">
                  <input type="text" placeholder="Key (e.g. gpu-node)" class="w-full border border-gray-200 dark:border-gray-600 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white" />
                  <select class="w-full border border-gray-200 dark:border-gray-600 rounded px-2 py-1 text-xs bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                    <option>Equal</option>
                    <option>Exists</option>
                  </select>
                  <input type="text" placeholder="Value (for Equal)" class="w-full border border-gray-200 dark:border-gray-600 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white" />
                  <select class="w-full border border-gray-200 dark:border-gray-600 rounded px-2 py-1 text-xs bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                    <option>NoSchedule</option>
                    <option>PreferNoSchedule</option>
                    <option>NoExecute</option>
                  </select>
                </div>
              </div>
            </div>

            <!-- Node Selector -->
            <div class="border border-gray-200 dark:border-gray-600 rounded-md p-4">
              <div class="flex items-center justify-between mb-3">
                <label class="text-xs font-semibold text-gray-700 dark:text-gray-300 flex items-center">
                  <svg class="w-3 h-3 mr-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                  </svg>
                  Node Selector
                </label>
                <button class="inline-flex items-center px-2 py-1 bg-green-600 text-white text-xs font-medium rounded hover:bg-green-700">
                  <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                  Add Selector
                </button>
              </div>
              <div class="grid grid-cols-2 gap-2">
                <input type="text" placeholder="Label Key (e.g. node-type)" class="border border-gray-200 dark:border-gray-600 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-green-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white" />
                <input type="text" placeholder="Label Value (e.g. gpu)" class="border border-gray-200 dark:border-gray-600 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-green-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white" />
              </div>
            </div>
          </div>

          <!-- Continue with other tabs... -->
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
          <button class="text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 flex items-center">
            <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"></path>
            </svg>
            Preview
          </button>
        </div>
        <div class="flex items-center space-x-2">
          <button @click="closeEditModal" class="px-4 py-2 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-gray-500 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600 transition-colors duration-200">
            Cancel
          </button>
          <button @click="saveApplication" class="px-4 py-2 text-xs font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 border border-transparent rounded hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-1 focus:ring-indigo-500 shadow-md transform hover:scale-105 transition-all duration-200">
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
import { ref, watch } from 'vue'

// Mock data based on the attached image
const applications = ref([
  {
    id: 1,
    type: 'Git',
    name: 'app-1',
    displayName: 'Application 1',
    sourceRepo: 'https://app-1.com',
    imageRegistry: 'ags-registry.ags.cloudzcp.net/earth/hellozcp',
    deployedImage: 'hellozcp:v1.2.3',
    usage: { cpu: 45, memory: 62 },
    deployStatus: 'deployed',
    lastBuildPipeline: null,
    lastBuild: null,
    lastBuildStatus: null
  },
  {
    id: 2,
    type: 'Git',
    name: 'app-2',
    displayName: 'app-2',
    sourceRepo: 'http://app-2.com',
    imageRegistry: 'image/app-2/app-2',
    deployedImage: 'app-2:v2.1.0',
    usage: { cpu: 0, memory: 0 },
    deployStatus: 'failed',
    lastBuildPipeline: null,
    lastBuild: null,
    lastBuildStatus: null
  },
  {
    id: 3,
    type: 'Git',
    name: 'app-20',
    displayName: 'undefined',
    sourceRepo: 'http://app-20.com',
    imageRegistry: 'image/app-20',
    deployedImage: null,
    usage: { cpu: 0, memory: 0 },
    deployStatus: 'not-deployed',
    lastBuildPipeline: null,
    lastBuild: null,
    lastBuildStatus: null
  },
  {
    id: 4,
    type: 'Git',
    name: 'app-21',
    displayName: 'undefined',
    sourceRepo: 'http://app-21.com',
    imageRegistry: 'image/app-21',
    deployedImage: 'app-21:v1.0.0-beta',
    usage: { cpu: 23, memory: 41 },
    deployStatus: 'deploying',
    lastBuildPipeline: null,
    lastBuild: null,
    lastBuildStatus: null
  },
  {
    id: 5,
    type: 'Git',
    name: 'app-3',
    displayName: 'app-3',
    sourceRepo: 'http://app-3.com',
    imageRegistry: 'app-3',
    deployedImage: 'app-3:latest',
    usage: { cpu: 78, memory: 85 },
    deployStatus: 'deployed',
    lastBuildPipeline: null,
    lastBuild: null,
    lastBuildStatus: null
  },
  {
    id: 6,
    type: 'Git',
    name: 'app-4',
    displayName: 'app-4',
    sourceRepo: 'http://app-4.com',
    imageRegistry: 'app-4',
    deployedImage: 'app-4:v3.2.1',
    usage: { cpu: 15, memory: 28 },
    deployStatus: 'failed',
    lastBuildPipeline: null,
    lastBuild: null,
    lastBuildStatus: null
  },
  {
    id: 7,
    type: 'Git',
    name: 'app-5',
    displayName: 'app-5',
    sourceRepo: 'http://app-5.com',
    imageRegistry: 'app-5',
    deployedImage: 'app-5:v1.5.2',
    usage: { cpu: 92, memory: 73 },
    deployStatus: 'deployed',
    lastBuildPipeline: null,
    lastBuild: null,
    lastBuildStatus: null
  },
  {
    id: 8,
    type: 'Image',
    name: 'app-6',
    displayName: 'app-6',
    sourceRepo: null,
    imageRegistry: 'ags-registry.ags.cloudzcp.net/earth/hellozcp',
    deployedImage: null,
    usage: { cpu: 0, memory: 0 },
    deployStatus: 'not-deployed',
    lastBuildPipeline: null,
    lastBuild: null,
    lastBuildStatus: null
  },
  {
    id: 9,
    type: 'Git',
    name: 'app-7',
    displayName: 'app-7',
    sourceRepo: 'https://github.com/org/repo.git',
    imageRegistry: 'myregistry/myapp:latest',
    deployedImage: 'myapp:v4.1.0',
    usage: { cpu: 34, memory: 56 },
    deployStatus: 'deployed',
    lastBuildPipeline: null,
    lastBuild: null,
    lastBuildStatus: null
  },
  {
    id: 10,
    type: 'Git',
    name: 'app-8',
    displayName: 'app-7',
    sourceRepo: 'https://github.com/org/repo.git',
    imageRegistry: 'myregistry/myapp:latest',
    deployedImage: 'myapp:v4.0.5',
    usage: { cpu: 67, memory: 71 },
    deployStatus: 'deploying',
    lastBuildPipeline: null,
    lastBuild: null,
    lastBuildStatus: null
  },
  {
    id: 11,
    type: 'Git',
    name: 'app-9',
    displayName: 'app-9',
    sourceRepo: 'http://app-9.com',
    imageRegistry: 'image/app-9-copy',
    deployedImage: 'app-9:v2.3.1',
    usage: { cpu: 0, memory: 0 },
    deployStatus: 'failed',
    lastBuildPipeline: null,
    lastBuild: null,
    lastBuildStatus: null
  },
  {
    id: 12,
    type: 'Git',
    name: 'app-9-copy',
    displayName: 'app-9',
    sourceRepo: 'http://app-9.com',
    imageRegistry: 'image/app-9-copy1',
    deployedImage: 'app-9-copy:v2.3.2',
    usage: { cpu: 12, memory: 18 },
    deployStatus: 'deployed',
    lastBuildPipeline: null,
    lastBuild: null,
    lastBuildStatus: null
  },
  {
    id: 13,
    type: 'Git',
    name: 'hellozcp',
    displayName: null,
    sourceRepo: 'https://git.ags.cloudzcp.net/ags-earth/hellozcp.git',
    imageRegistry: 'ags-registry.ags.cloudzcp.net/earth/hellozcp',
    deployedImage: null,
    usage: { cpu: 0, memory: 0 },
    deployStatus: 'not-deployed',
    lastBuildPipeline: null,
    lastBuild: null,
    lastBuildStatus: null
  },
  {
    id: 14,
    type: 'Git',
    name: 'hellozcp-copy',
    displayName: null,
    sourceRepo: 'https://git.ags.cloudzcp.net/ags-earth/hellozcp.git',
    imageRegistry: 'ags-registry.ags.cloudzcp.net/earth/hellozcp1',
    deployedImage: 'hellozcp:v1.3.0',
    usage: { cpu: 89, memory: 94 },
    deployStatus: 'deployed',
    lastBuildPipeline: null,
    lastBuild: null,
    lastBuildStatus: null
  }
])

// Mock pipelines data
const availablePipelines = ref([
  {
    id: 'pipeline-1',
    name: 'Frontend Pipeline',
    icon: '🚀',
    gitRepository: 'https://github.com/company/frontend-app.git',
    imageRepository: 'registry.company.com/frontend-app'
  },
  {
    id: 'pipeline-2', 
    name: 'Backend API Pipeline',
    icon: '⚙️',
    gitRepository: 'https://github.com/company/backend-api.git',
    imageRepository: 'registry.company.com/backend-api'
  },
  {
    id: 'pipeline-3',
    name: 'Docker Build Pipeline', 
    icon: '🐳',
    gitRepository: 'https://github.com/company/docker-app.git',
    imageRepository: 'registry.company.com/docker-app'
  },
  {
    id: 'pipeline-4',
    name: 'Microservice Pipeline',
    icon: '🔧',
    gitRepository: 'https://github.com/company/microservice.git', 
    imageRepository: 'registry.company.com/microservice'
  }
])

// Edit Modal State
const showEditModal = ref(false)
const selectedApplicationForEdit = ref<any>(null)
const activeEditTab = ref('general')

// Edit Tabs Configuration
const editTabs = [
  { 
    id: 'general', 
    name: 'General', 
    icon: 'svg' 
  },
  { 
    id: 'application', 
    name: 'Application', 
    icon: 'svg' 
  },
  { 
    id: 'deploy', 
    name: 'Deploy', 
    icon: 'svg' 
  },
  { 
    id: 'storage', 
    name: 'Storage', 
    icon: 'svg' 
  },
  { 
    id: 'network', 
    name: 'Network', 
    icon: 'svg' 
  },
  { 
    id: 'secret', 
    name: 'Secret', 
    icon: 'svg' 
  },
  { 
    id: 'taint', 
    name: 'Taint/Tolerance', 
    icon: 'svg' 
  }
]

// Edit Form Data
interface DeploymentConfig {
  name: string
  displayName: string
  description: string
  cluster: string
  namespace: string
  containerPort: number
  replicas: number
  resources: {
    cpuRequest: number
    cpuLimit: number
    memoryRequest: number
    memoryLimit: number
  }
}

interface EditFormData {
  general: {
    appName: string
    description: string
    tags: Array<{ key: string; value: string }>
  }
  application: {
    pipeline: string
    gitRepository: string
    imageRepository: string
  }
  deploy: {
    deployments: DeploymentConfig[]
  }
}

const editForm = ref<EditFormData>({
  general: {
    appName: '',
    description: '',
    tags: [{ key: '', value: '' }]
  },
  application: {
    pipeline: '',
    gitRepository: '',
    imageRepository: ''
  },
  deploy: {
    deployments: [{
      name: '',
      displayName: '',
      description: '',
      cluster: '',
      namespace: '',
      containerPort: 8080,
      replicas: 1,
      resources: {
        cpuRequest: 500,
        cpuLimit: 1000,
        memoryRequest: 512,
        memoryLimit: 1024
      }
    }]
  }
})

// Methods
const handleViewApplication = (app: any) => {
  console.log('View application:', app.name)
}

const handleEditApplication = (app: any) => {
  selectedApplicationForEdit.value = app
  // Initialize form with app data
  editForm.value.general.appName = app.name
  editForm.value.general.description = app.description || ''
  editForm.value.application.gitRepository = app.sourceRepo || ''
  editForm.value.application.imageRepository = app.imageRegistry || ''
  
  showEditModal.value = true
  activeEditTab.value = 'general'
}

const handleDeployApplication = (app: any) => {
  if (app.deployStatus === 'deploying') return
  
  console.log('Start application deployment:', app.name)
  app.deployStatus = 'deploying'
  
  // Simulation: deployment completes after 5 seconds
  setTimeout(() => {
    const randomSuccess = Math.random() > 0.3 // 70% success rate
    app.deployStatus = randomSuccess ? 'deployed' : 'failed'
    console.log(`${app.name} deployment ${randomSuccess ? 'successful' : 'failed'}`)
  }, 5000)
}

const handleDeleteApplication = (app: any) => {
  console.log('Delete application:', app.name)
}

const getDeployStatusClass = (status: string) => {
  switch (status) {
    case 'deployed':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    case 'failed':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
    case 'deploying':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
    case 'not-deployed':
      return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
  }
}

const getDeployStatusIconClass = (status: string) => {
  switch (status) {
    case 'deployed':
      return 'text-green-500'
    case 'failed':
      return 'text-red-500'
    case 'deploying':
      return 'text-blue-500 animate-spin'
    case 'not-deployed':
      return 'text-gray-500'
    default:
      return 'text-gray-500'
  }
}

const getDeployStatusText = (status: string) => {
  switch (status) {
    case 'deployed':
      return 'Deployed'
    case 'failed':
      return 'Failed'
    case 'deploying':
      return 'Deploying'
    case 'not-deployed':
      return 'Not Deployed'
    default:
      return 'Unknown'
  }
}

const getUsageBarClass = (percentage: number) => {
  if (percentage >= 90) return 'bg-red-500'
  if (percentage >= 70) return 'bg-orange-500'
  if (percentage >= 50) return 'bg-yellow-500'
  if (percentage > 0) return 'bg-green-500'
  return 'bg-gray-400'
}

const closeEditModal = () => {
  showEditModal.value = false
  selectedApplicationForEdit.value = null
  activeEditTab.value = 'general'
}

const saveApplication = () => {
  console.log('Save application:', editForm.value)
  closeEditModal()
}

// Pipeline change handler
const onPipelineChange = () => {
  const selectedPipeline = availablePipelines.value.find(p => p.id === editForm.value.application.pipeline)
  if (selectedPipeline) {
    editForm.value.application.gitRepository = selectedPipeline.gitRepository
    editForm.value.application.imageRepository = selectedPipeline.imageRepository
  }
}

// Tag Management
const addTag = () => {
  editForm.value.general.tags.push({ key: '', value: '' })
}

const removeTag = (index: number) => {
  editForm.value.general.tags.splice(index, 1)
}

// Deployment Management
const addDeployment = () => {
  editForm.value.deploy.deployments.push({
    name: '',
    displayName: '',
    description: '',
    cluster: '',
    namespace: '',
    containerPort: 8080,
    replicas: 1,
    resources: {
      cpuRequest: 500,
      cpuLimit: 1000,
      memoryRequest: 512,
      memoryLimit: 1024
    }
  })
}

const removeDeployment = (index: number) => {
  editForm.value.deploy.deployments.splice(index, 1)
}

// UX Enhancement Functions
const getTabIcon = (tabId: string) => {
  const icons = {
    general: 'svg',
    application: 'svg', 
    deploy: 'svg',
    storage: 'svg',
    network: 'svg',
    secret: 'svg',
    taint: 'svg'
  }
  return icons[tabId as keyof typeof icons] || 'svg'
}

const getTabCompletionIcon = (tabId: string) => {
  switch (tabId) {
    case 'general':
      return editForm.value.general.appName && editForm.value.general.description
    case 'application':
      return editForm.value.application.gitRepository && editForm.value.application.imageRepository
    case 'deploy':
      return editForm.value.deploy.deployments.some(d => d.name && d.cluster && d.namespace)
    default:
      return false
  }
}

const getProgressPercentage = () => {
  let completedSections = 0
  let totalSections = 7
  
  // General completion
  if (editForm.value.general.appName && editForm.value.general.description) {
    completedSections++
  }
  
  // Application completion  
  if (editForm.value.application.gitRepository && editForm.value.application.imageRepository) {
    completedSections++
  }
  
  // Deploy completion
  if (editForm.value.deploy.deployments.some(d => d.name && d.cluster && d.namespace)) {
    completedSections++
  }
  
  // Add logic for other sections as they are implemented
  // For now, we'll add some base completion for demo
  completedSections += 2 // Assuming storage and network have some defaults
  
  return Math.round((completedSections / totalSections) * 100)
}

// Watch for pipeline changes
watch(() => editForm.value.application.pipeline, (newPipeline) => {
  if (newPipeline) {
    const selectedPipeline = availablePipelines.value.find(p => p.id === newPipeline)
    if (selectedPipeline) {
      editForm.value.application.gitRepository = selectedPipeline.gitRepository
      editForm.value.application.imageRepository = selectedPipeline.imageRepository
    }
  }
})
</script>

<style scoped>
/* Enhanced Slider Styles */
.slider-blue::-webkit-slider-thumb {
  appearance: none;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: #3B82F6;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(59, 130, 246, 0.4);
  border: 2px solid white;
}

.slider-blue::-moz-range-thumb {
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: #3B82F6;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(59, 130, 246, 0.4);
  border: 2px solid white;
}

.slider-green::-webkit-slider-thumb {
  appearance: none;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: #10B981;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(16, 185, 129, 0.4);
  border: 2px solid white;
}

.slider-green::-moz-range-thumb {
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: #10B981;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(16, 185, 129, 0.4);
  border: 2px solid white;
}

.slider-orange::-webkit-slider-thumb {
  appearance: none;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: #F59E0B;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(245, 158, 11, 0.4);
  border: 2px solid white;
}

.slider-orange::-moz-range-thumb {
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: #F59E0B;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(245, 158, 11, 0.4);
  border: 2px solid white;
}

.slider-red::-webkit-slider-thumb {
  appearance: none;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: #EF4444;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(239, 68, 68, 0.4);
  border: 2px solid white;
}

.slider-red::-moz-range-thumb {
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: #EF4444;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(239, 68, 68, 0.4);
  border: 2px solid white;
}

/* Card hover effects */
.deployment-card {
  transition: all 0.3s ease;
}

.deployment-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

/* Tab transition effects */
.tab-content {
  animation: fadeInUp 0.3s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Progress bar animation */
.progress-bar {
  transition: width 0.5s ease-in-out;
}

/* Input focus effects */
input:focus, select:focus, textarea:focus {
  transform: scale(1.02);
  transition: transform 0.2s ease;
}

/* Button hover effects */
button {
  transition: all 0.2s ease;
}

button:hover {
  transform: translateY(-1px);
}

/* Custom scrollbar */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 10px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>