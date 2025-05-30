<template>
  <div class="p-6">
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Kubernetes Dashboard</h1>
      <p class="text-gray-600 dark:text-gray-400 mt-2">Kubernetes 클러스터 현황을 모니터링합니다.</p>
    </div>

    <!-- Kubernetes Overview -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <!-- 클러스터 카드 -->
      <NuxtLink 
        to="/kubernetes/clusters"
        class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border-l-4 border-blue-500 cursor-pointer hover:shadow-md transition-shadow duration-200"
      >
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14-7H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2z"></path>
              </svg>
            </div>
          </div>
          <div class="ml-4 flex-1">
            <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">클러스터</h3>
            <p class="text-3xl font-bold text-gray-900 dark:text-white">{{ stats.clusters }}</p>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">활성 클러스터</p>
          </div>
          <div class="ml-2">
            <svg class="w-5 h-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </div>
        </div>
      </NuxtLink>

      <!-- 노드 카드 -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border-l-4 border-green-500 cursor-pointer hover:shadow-md transition-shadow duration-200">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
              </svg>
            </div>
          </div>
          <div class="ml-4 flex-1">
            <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">노드</h3>
            <p class="text-3xl font-bold text-gray-900 dark:text-white">{{ stats.nodes }}</p>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">워커 노드</p>
          </div>
          <div class="ml-2">
            <svg class="w-5 h-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </div>
        </div>
      </div>

      <!-- Pod 카드 -->
      <NuxtLink 
        to="/kubernetes/workloads"
        class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border-l-4 border-purple-500 cursor-pointer hover:shadow-md transition-shadow duration-200"
      >
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
              </svg>
            </div>
          </div>
          <div class="ml-4 flex-1">
            <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Pod</h3>
            <p class="text-3xl font-bold text-gray-900 dark:text-white">{{ stats.pods }}</p>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">실행 중인 Pod</p>
          </div>
          <div class="ml-2">
            <svg class="w-5 h-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </div>
        </div>
      </NuxtLink>

      <!-- 서비스 카드 -->
      <NuxtLink 
        to="/kubernetes/services"
        class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border-l-4 border-orange-500 cursor-pointer hover:shadow-md transition-shadow duration-200"
      >
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"></path>
              </svg>
            </div>
          </div>
          <div class="ml-4 flex-1">
            <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">서비스</h3>
            <p class="text-3xl font-bold text-gray-900 dark:text-white">{{ stats.services }}</p>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">네트워크 서비스</p>
          </div>
          <div class="ml-2">
            <svg class="w-5 h-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </div>
        </div>
      </NuxtLink>
    </div>

    <!-- Quick Actions -->
    <div class="bg-white dark:bg-gray-800 shadow rounded-lg">
      <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white">빠른 작업</h3>
      </div>
      <div class="p-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <NuxtLink to="/kubernetes/workloads" class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <svg class="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                </svg>
              </div>
              <div>
                <h4 class="text-sm font-medium text-gray-900 dark:text-white">워크로드 관리</h4>
                <p class="text-xs text-gray-500 dark:text-gray-400">Pod, Deployment 관리</p>
              </div>
            </div>
          </NuxtLink>

          <NuxtLink to="/kubernetes/services" class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                <svg class="w-4 h-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"></path>
                </svg>
              </div>
              <div>
                <h4 class="text-sm font-medium text-gray-900 dark:text-white">서비스 & 네트워킹</h4>
                <p class="text-xs text-gray-500 dark:text-gray-400">Service, Ingress 관리</p>
              </div>
            </div>
          </NuxtLink>

          <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg opacity-50">
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                <svg class="w-4 h-4 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"></path>
                </svg>
              </div>
              <div>
                <h4 class="text-sm font-medium text-gray-900 dark:text-white">스토리지</h4>
                <p class="text-xs text-gray-500 dark:text-gray-400">PV, PVC 관리 (준비 중)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

useHead({
  title: 'Kubernetes Dashboard - AXMP'
})

const stats = ref({
  clusters: 3,
  nodes: 12,
  pods: 156,
  services: 42
})
</script> 