<template>
  <div>
    <!-- Page Header -->
    <div class="mb-8">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Applications <span class="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full ml-2">14</span></h1>
          <p class="text-gray-600 dark:text-gray-400 mt-1">애플리케이션을 배포하고 관리합니다</p>
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
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
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
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">App Type</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Name</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Display Name</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Source Repo.</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Image Registry</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Last Build Pipeline</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Last Build</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Last Build Status</th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="(app, index) in applications" :key="app.id" :class="index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700'">
              <td class="px-6 py-4 whitespace-nowrap">
                <input type="checkbox" class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded">
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{{ app.type }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300 cursor-pointer">
                  {{ app.name }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{{ app.displayName }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300 cursor-pointer">{{ app.sourceRepo }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{{ app.imageRegistry }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{{ app.lastBuildPipeline || '-' }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{{ app.lastBuild || '-' }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{{ app.lastBuildStatus || '-' }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="flex justify-end space-x-2">
                  <button class="bg-yellow-500 text-white px-2 py-1 rounded text-xs hover:bg-yellow-600">
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                    </svg>
                  </button>
                  <button class="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600">
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                  </button>
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

// Mock data based on the attached image
const applications = ref([
  {
    id: 1,
    type: 'Git',
    name: 'app-1',
    displayName: 'Application 1',
    sourceRepo: 'https://app-1.com',
    imageRegistry: 'ags-registry.ags.cloudzcp.net/earth/hellozcp',
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
    lastBuildPipeline: null,
    lastBuild: null,
    lastBuildStatus: null
  }
])
</script> 