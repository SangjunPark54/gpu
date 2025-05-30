<template>
  <div>
    <!-- Page Header -->
    <div class="mb-8">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white">System Overview</h1>
          <p class="text-gray-600 dark:text-gray-400 mt-1">Welcome to AXMP - Advanced eXtended Management Platform</p>
        </div>
        <div class="flex items-center space-x-4">
          <button class="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            System Health Check
          </button>
        </div>
      </div>
    </div>

    <!-- System Status Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <!-- System Status -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border-l-4 border-green-500 cursor-pointer hover:shadow-md transition-shadow duration-200">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
          </div>
          <div class="ml-4 flex-1">
            <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">System Status</h3>
            <p class="text-3xl font-bold text-gray-900 dark:text-white">Healthy</p>
            <p class="text-sm text-green-600 dark:text-green-400 mt-1">All systems operational</p>
          </div>
          <div class="ml-2">
            <svg class="w-5 h-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </div>
        </div>
      </div>

      <!-- Active Users -->
      <NuxtLink 
        to="/iam"
        class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border-l-4 border-blue-500 cursor-pointer hover:shadow-md transition-shadow duration-200"
      >
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
              </svg>
            </div>
          </div>
          <div class="ml-4 flex-1">
            <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Active Users</h3>
            <p class="text-3xl font-bold text-gray-900 dark:text-white">247</p>
            <p class="text-sm text-blue-600 dark:text-blue-400 mt-1">+12% from yesterday</p>
          </div>
          <div class="ml-2">
            <svg class="w-5 h-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </div>
        </div>
      </NuxtLink>

      <!-- Total Projects -->
      <NuxtLink 
        to="/projects"
        class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border-l-4 border-purple-500 cursor-pointer hover:shadow-md transition-shadow duration-200"
      >
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
              </svg>
            </div>
          </div>
          <div class="ml-4 flex-1">
            <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Total Projects</h3>
            <p class="text-3xl font-bold text-gray-900 dark:text-white">42</p>
            <p class="text-sm text-purple-600 dark:text-purple-400 mt-1">5 active deployments</p>
          </div>
          <div class="ml-2">
            <svg class="w-5 h-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </div>
        </div>
      </NuxtLink>

      <!-- Resource Usage -->
      <NuxtLink 
        to="/gpu/dashboard"
        class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border-l-4 border-orange-500 cursor-pointer hover:shadow-md transition-shadow duration-200"
      >
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
          </div>
          <div class="ml-4 flex-1">
            <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Resource Usage</h3>
            <p class="text-3xl font-bold text-gray-900 dark:text-white">68%</p>
            <p class="text-sm text-orange-600 dark:text-orange-400 mt-1">GPU utilization</p>
          </div>
          <div class="ml-2">
            <svg class="w-5 h-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </div>
        </div>
      </NuxtLink>
    </div>

    <!-- 사용자 통계 차트 -->
    <div class="mb-8">
      <UserStatsChart />
    </div>

    <!-- Quick Actions -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <!-- Quick Actions Panel -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Quick Actions</h3>
        <div class="grid grid-cols-2 gap-4">
          <NuxtLink to="/gpu/dashboard" class="flex items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <div class="w-10 h-10 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mr-3">
              <svg class="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
              </svg>
            </div>
            <div>
              <p class="font-medium text-gray-900 dark:text-white">GPU Dashboard</p>
              <p class="text-sm text-gray-500 dark:text-gray-400">Manage GPU resources</p>
            </div>
          </NuxtLink>

          <NuxtLink to="/users" class="flex items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <div class="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-3">
              <svg class="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
              </svg>
            </div>
            <div>
              <p class="font-medium text-gray-900 dark:text-white">User Management</p>
              <p class="text-sm text-gray-500 dark:text-gray-400">Manage system users</p>
            </div>
          </NuxtLink>

          <NuxtLink to="/projects" class="flex items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <div class="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mr-3">
              <svg class="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
              </svg>
            </div>
            <div>
              <p class="font-medium text-gray-900 dark:text-white">Projects</p>
              <p class="text-sm text-gray-500 dark:text-gray-400">Manage projects</p>
            </div>
          </NuxtLink>

          <NuxtLink to="/settings" class="flex items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <div class="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center mr-3">
              <svg class="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
            </div>
            <div>
              <p class="font-medium text-gray-900 dark:text-white">Settings</p>
              <p class="text-sm text-gray-500 dark:text-gray-400">System configuration</p>
            </div>
          </NuxtLink>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Recent Activity</h3>
        <div class="space-y-4">
          <div class="flex items-start space-x-3">
            <div class="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
            <div class="flex-1">
              <p class="text-sm font-medium text-gray-900 dark:text-white">GPU Pool Created</p>
              <p class="text-sm text-gray-500 dark:text-gray-400">gpu-pool-a100-03 created in production realm</p>
              <p class="text-xs text-gray-400 dark:text-gray-500">2 minutes ago</p>
            </div>
          </div>
          
          <div class="flex items-start space-x-3">
            <div class="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
            <div class="flex-1">
              <p class="text-sm font-medium text-gray-900 dark:text-white">User Added</p>
              <p class="text-sm text-gray-500 dark:text-gray-400">New user john.doe@company.com added to ai-research project</p>
              <p class="text-xs text-gray-400 dark:text-gray-500">15 minutes ago</p>
            </div>
          </div>
          
          <div class="flex items-start space-x-3">
            <div class="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
            <div class="flex-1">
              <p class="text-sm font-medium text-gray-900 dark:text-white">GPU Request Pending</p>
              <p class="text-sm text-gray-500 dark:text-gray-400">Request req-005 awaiting approval for ml-training project</p>
              <p class="text-xs text-gray-400 dark:text-gray-500">1 hour ago</p>
            </div>
          </div>
          
          <div class="flex items-start space-x-3">
            <div class="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
            <div class="flex-1">
              <p class="text-sm font-medium text-gray-900 dark:text-white">System Maintenance</p>
              <p class="text-sm text-gray-500 dark:text-gray-400">Scheduled maintenance completed for staging environment</p>
              <p class="text-xs text-gray-400 dark:text-gray-500">3 hours ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- System Health Overview -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-6">System Health Overview</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- CPU Usage -->
        <div class="text-center">
          <div class="relative inline-flex items-center justify-center w-24 h-24 mb-4">
            <svg class="w-24 h-24 transform -rotate-90" viewBox="0 0 36 36">
              <path class="text-gray-200 dark:text-gray-600" stroke="currentColor" stroke-width="3" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"></path>
              <path class="text-blue-500" stroke="currentColor" stroke-width="3" fill="none" stroke-dasharray="75, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"></path>
            </svg>
            <span class="absolute text-lg font-semibold text-gray-900 dark:text-white">75%</span>
          </div>
          <p class="text-sm font-medium text-gray-900 dark:text-white">CPU Usage</p>
          <p class="text-xs text-gray-500 dark:text-gray-400">Average across all nodes</p>
        </div>

        <!-- Memory Usage -->
        <div class="text-center">
          <div class="relative inline-flex items-center justify-center w-24 h-24 mb-4">
            <svg class="w-24 h-24 transform -rotate-90" viewBox="0 0 36 36">
              <path class="text-gray-200 dark:text-gray-600" stroke="currentColor" stroke-width="3" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"></path>
              <path class="text-green-500" stroke="currentColor" stroke-width="3" fill="none" stroke-dasharray="60, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"></path>
            </svg>
            <span class="absolute text-lg font-semibold text-gray-900 dark:text-white">60%</span>
          </div>
          <p class="text-sm font-medium text-gray-900 dark:text-white">Memory Usage</p>
          <p class="text-xs text-gray-500 dark:text-gray-400">System memory utilization</p>
        </div>

        <!-- Storage Usage -->
        <div class="text-center">
          <div class="relative inline-flex items-center justify-center w-24 h-24 mb-4">
            <svg class="w-24 h-24 transform -rotate-90" viewBox="0 0 36 36">
              <path class="text-gray-200 dark:text-gray-600" stroke="currentColor" stroke-width="3" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"></path>
              <path class="text-orange-500" stroke="currentColor" stroke-width="3" fill="none" stroke-dasharray="45, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"></path>
            </svg>
            <span class="absolute text-lg font-semibold text-gray-900 dark:text-white">45%</span>
          </div>
          <p class="text-sm font-medium text-gray-900 dark:text-white">Storage Usage</p>
          <p class="text-xs text-gray-500 dark:text-gray-400">Total storage utilization</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import UserStatsChart from '~/components/charts/UserStatsChart.vue'

useHead({
  title: 'Dashboard - AXMP'
})
</script> 