<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Global Navigation Bar (GNB) -->
    <header class="bg-slate-800 dark:bg-slate-900 shadow-sm fixed top-0 left-0 right-0 z-50">
      <!-- Top Bar -->
      <div class="flex items-center justify-between h-12 px-4">
        <!-- Left side - Logo and Platform Title -->
        <div class="flex items-center space-x-4">
          <div class="flex items-center space-x-3">
            <!-- Logo -->
            <div class="w-6 h-6 bg-white rounded flex items-center justify-center">
              <span class="text-slate-800 font-bold text-xs">A</span>
            </div>
            <h1 class="text-lg font-semibold text-white">AXMP</h1>
          </div>
          
          <!-- Platform Subtitle -->
          <div class="hidden md:flex items-center space-x-2">
            <svg class="w-3 h-3 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
            <span class="text-slate-300 text-sm">AX & Modernization Platform</span>
          </div>
        </div>

        <!-- Right side - User menu and notifications -->
        <div class="flex items-center space-x-3">
          <!-- Dark Mode Toggle -->
          <DarkModeToggle />
          
          <!-- Notifications -->
          <button class="relative p-1.5 text-slate-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white rounded">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5zM10.5 3.75a6 6 0 0 1 6 6v2.25l2.25 2.25v2.25H2.25v-2.25L4.5 12V9.75a6 6 0 0 1 6-6z"></path>
            </svg>
            <span class="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          <!-- Settings -->
          <button class="p-1.5 text-slate-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white rounded">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
          </button>

          <!-- User Profile -->
          <div class="relative">
            <button @click="toggleUserMenu" class="flex items-center space-x-2 p-1.5 rounded hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-white">
              <div class="w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center">
                <span class="text-slate-800 font-medium text-xs">AD</span>
              </div>
              <div class="hidden md:block text-left">
                <p class="text-sm font-medium text-white">Admin User</p>
                <p class="text-xs text-slate-300">admin@axmp.com</p>
              </div>
              <svg class="w-3 h-3 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>

            <!-- User dropdown menu -->
            <div v-if="showUserMenu" class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50">
              <a href="#" class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">Profile</a>
              <a href="#" class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">Settings</a>
              <hr class="my-1 border-gray-200 dark:border-gray-600">
              <a href="#" class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">Sign out</a>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Navigation Tabs -->
      <div class="bg-slate-700 dark:bg-slate-800 border-t border-slate-600 dark:border-slate-700">
        <div class="px-4">
          <nav class="flex space-x-6">
            <NuxtLink 
              to="/gpu/dashboard"
              class="px-3 py-2.5 text-sm font-medium border-b-2 transition-colors duration-150"
              :class="isActiveTab('/gpu') ? 'border-white text-white' : 'border-transparent text-slate-300 hover:text-white hover:border-slate-400'"
            >
              GPU Management
            </NuxtLink>
            
            <NuxtLink 
              to="/iam"
              class="px-3 py-2.5 text-sm font-medium border-b-2 transition-colors duration-150"
              :class="isActiveTab('/iam') ? 'border-white text-white' : 'border-transparent text-slate-300 hover:text-white hover:border-slate-400'"
            >
              IAM
            </NuxtLink>
            
            <NuxtLink 
              to="/kubernetes"
              class="px-3 py-2.5 text-sm font-medium border-b-2 transition-colors duration-150"
              :class="isActiveTab('/kubernetes') ? 'border-white text-white' : 'border-transparent text-slate-300 hover:text-white hover:border-slate-400'"
            >
              Kubernetes
            </NuxtLink>
            
            <NuxtLink 
              to="/projects"
              class="px-3 py-2.5 text-sm font-medium border-b-2 transition-colors duration-150"
              :class="isActiveTab('/projects') ? 'border-white text-white' : 'border-transparent text-slate-300 hover:text-white hover:border-slate-400'"
            >
              Project
            </NuxtLink>
            
            <NuxtLink 
              to="/devops"
              class="px-3 py-2.5 text-sm font-medium border-b-2 transition-colors duration-150"
              :class="isActiveTab('/devops') ? 'border-white text-white' : 'border-transparent text-slate-300 hover:text-white hover:border-slate-400'"
            >
              DevOps Toolchain
            </NuxtLink>
            
            <NuxtLink 
              to="/monitoring"
              class="px-3 py-2.5 text-sm font-medium border-b-2 transition-colors duration-150"
              :class="isActiveTab('/monitoring') ? 'border-white text-white' : 'border-transparent text-slate-300 hover:text-white hover:border-slate-400'"
            >
              Monitoring
            </NuxtLink>
            
            <NuxtLink 
              to="/security"
              class="px-3 py-2.5 text-sm font-medium border-b-2 transition-colors duration-150"
              :class="isActiveTab('/security') ? 'border-white text-white' : 'border-transparent text-slate-300 hover:text-white hover:border-slate-400'"
            >
              Security
            </NuxtLink>
            
            <NuxtLink 
              to="/policy"
              class="px-3 py-2.5 text-sm font-medium border-b-2 transition-colors duration-150"
              :class="isActiveTab('/policy') ? 'border-white text-white' : 'border-transparent text-slate-300 hover:text-white hover:border-slate-400'"
            >
              Policy
            </NuxtLink>
            
            <NuxtLink 
              to="/ai-ops"
              class="px-3 py-2.5 text-sm font-medium border-b-2 transition-colors duration-150"
              :class="isActiveTab('/ai-ops') ? 'border-white text-white' : 'border-transparent text-slate-300 hover:text-white hover:border-slate-400'"
            >
              AI Ops
            </NuxtLink>
            
            <NuxtLink 
              to="/zcp"
              class="px-3 py-2.5 text-sm font-medium border-b-2 transition-colors duration-150"
              :class="isActiveTab('/zcp') ? 'border-white text-white' : 'border-transparent text-slate-300 hover:text-white hover:border-slate-400'"
            >
              ZCP
            </NuxtLink>
          </nav>
        </div>
      </div>
    </header>

    <!-- Main Layout -->
    <div class="flex pt-24">
      <!-- Navigation Left Bar (NLB) -->
      <aside class="w-64 bg-white dark:bg-gray-800 shadow-sm border-r border-gray-200 dark:border-gray-700 fixed left-0 top-24 bottom-0 overflow-y-auto">
        <nav class="p-4 space-y-2">
          <!-- Main Dashboard Section - 메인 페이지일 때만 표시 -->
          <div v-if="!isActiveTab('/gpu') && !isActiveTab('/iam') && !isActiveTab('/kubernetes') && !isActiveTab('/projects') && !isActiveTab('/devops') && !isActiveTab('/monitoring') && !isActiveTab('/security') && !isActiveTab('/policy') && !isActiveTab('/ai-ops') && !isActiveTab('/zcp')" class="mb-6">
            <h3 class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Overview</h3>
            <nav class="space-y-1">
              <NuxtLink 
                to="/"
                class="group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150"
                :class="$route.path === '/' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'"
              >
                <svg class="mr-3 h-5 w-5" :class="$route.path === '/' ? 'text-indigo-500' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-500'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z"></path>
                </svg>
                Dashboard
              </NuxtLink>
              
              <NuxtLink 
                to="/quickstart"
                class="group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150"
                :class="$route.path === '/quickstart' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'"
              >
                <svg class="mr-3 h-5 w-5" :class="$route.path === '/quickstart' ? 'text-indigo-500' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-500'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
                Quickstart
              </NuxtLink>
            </nav>
          </div>

          <!-- GPU Management Section - GPU 탭일 때만 표시 -->
          <div v-if="isActiveTab('/gpu')" class="mb-6">
            <h3 class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Overview</h3>
            <nav class="space-y-1">
              <NuxtLink 
                to="/gpu/dashboard"
                class="group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150"
                :class="isActive('/gpu/dashboard') ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'"
              >
                <svg class="mr-3 h-5 w-5" :class="isActive('/gpu/dashboard') ? 'text-indigo-500' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-500'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z"></path>
                </svg>
                Dashboard
              </NuxtLink>
              
              <NuxtLink 
                to="/gpu/quickstart"
                class="group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150"
                :class="isActive('/gpu/quickstart') ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'"
              >
                <svg class="mr-3 h-5 w-5" :class="isActive('/gpu/quickstart') ? 'text-indigo-500' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-500'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
                Quickstart
              </NuxtLink>
            </nav>
            
            <h3 class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 mt-6">GPU Management</h3>
            <nav class="space-y-1">
              <NuxtLink 
                to="/gpu/pools"
                class="group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150"
                :class="isActive('/gpu/pools') ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'"
              >
                <svg class="mr-3 h-5 w-5" :class="isActive('/gpu/pools') ? 'text-indigo-500' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-500'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14-7H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2z"></path>
                </svg>
                GPU Pools
              </NuxtLink>
              
              <NuxtLink 
                to="/gpu/requests"
                class="group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150"
                :class="isActive('/gpu/requests') ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'"
              >
                <svg class="mr-3 h-5 w-5" :class="isActive('/gpu/requests') ? 'text-indigo-500' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-500'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2H9z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 9h6m-6 4h6m-6 4h6"></path>
                </svg>
                Requests
              </NuxtLink>
              
              <NuxtLink 
                to="/monitoring"
                class="group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150"
                :class="isActive('/monitoring') ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'"
              >
                <svg class="mr-3 h-5 w-5" :class="isActive('/monitoring') ? 'text-indigo-500' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-500'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
                Monitoring
              </NuxtLink>
            </nav>
          </div>

          <!-- IAM Section - IAM 탭일 때만 표시 -->
          <div v-if="isActiveTab('/iam')" class="mb-6">
            <h3 class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Overview</h3>
            <nav class="space-y-1">
              <NuxtLink 
                to="/iam"
                class="group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150"
                :class="isActive('/iam') && $route.path === '/iam' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'"
              >
                <svg class="mr-3 h-5 w-5" :class="isActive('/iam') && $route.path === '/iam' ? 'text-indigo-500' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-500'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z"></path>
                </svg>
                Dashboard
              </NuxtLink>
              
              <NuxtLink 
                to="/iam/quickstart"
                class="group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150"
                :class="isActive('/iam/quickstart') ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'"
              >
                <svg class="mr-3 h-5 w-5" :class="isActive('/iam/quickstart') ? 'text-indigo-500' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-500'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
                Quickstart
              </NuxtLink>
            </nav>
            
            <h3 class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 mt-6">Identity & Access Management</h3>
            <nav class="space-y-1">
              <NuxtLink 
                to="/iam/users"
                class="group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150"
                :class="isActive('/iam/users') ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'"
              >
                <svg class="mr-3 h-5 w-5" :class="isActive('/iam/users') ? 'text-indigo-500' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-500'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
                </svg>
                사용자 관리
              </NuxtLink>
              
              <NuxtLink 
                to="/iam/groups"
                class="group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150"
                :class="isActive('/iam/groups') ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'"
              >
                <svg class="mr-3 h-5 w-5" :class="isActive('/iam/groups') ? 'text-indigo-500' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-500'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
                그룹 관리
              </NuxtLink>
              
              <NuxtLink 
                to="/iam/roles"
                class="group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150"
                :class="isActive('/iam/roles') ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'"
              >
                <svg class="mr-3 h-5 w-5" :class="isActive('/iam/roles') ? 'text-indigo-500' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-500'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
                역할 관리
              </NuxtLink>
              
              <NuxtLink 
                to="/iam/policies"
                class="group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150"
                :class="isActive('/iam/policies') ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'"
              >
                <svg class="mr-3 h-5 w-5" :class="isActive('/iam/policies') ? 'text-indigo-500' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-500'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2H9z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 9h6m-6 4h6m-6 4h6"></path>
                </svg>
                정책 관리
              </NuxtLink>
            </nav>
          </div>

          <!-- Kubernetes Section - Kubernetes 탭일 때만 표시 -->
          <div v-if="isActiveTab('/kubernetes')" class="mb-6">
            <h3 class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Overview</h3>
            <nav class="space-y-1">
              <NuxtLink 
                to="/kubernetes"
                class="group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150"
                :class="isActive('/kubernetes') && $route.path === '/kubernetes' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'"
              >
                <svg class="mr-3 h-5 w-5" :class="isActive('/kubernetes') && $route.path === '/kubernetes' ? 'text-indigo-500' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-500'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z"></path>
                </svg>
                Dashboard
              </NuxtLink>
              
              <NuxtLink 
                to="/kubernetes/quickstart"
                class="group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150"
                :class="isActive('/kubernetes/quickstart') ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'"
              >
                <svg class="mr-3 h-5 w-5" :class="isActive('/kubernetes/quickstart') ? 'text-indigo-500' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-500'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
                Quickstart
              </NuxtLink>
            </nav>
            
            <h3 class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 mt-6">Kubernetes</h3>
            <nav class="space-y-1">
              <NuxtLink 
                to="/kubernetes/clusters"
                class="group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150"
                :class="isActive('/kubernetes/clusters') ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'"
              >
                <svg class="mr-3 h-5 w-5" :class="isActive('/kubernetes/clusters') ? 'text-indigo-500' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-500'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14-7H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2z"></path>
                </svg>
                클러스터 관리
              </NuxtLink>
              
              <NuxtLink 
                to="/kubernetes/workloads"
                class="group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150"
                :class="isActive('/kubernetes/workloads') ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'"
              >
                <svg class="mr-3 h-5 w-5" :class="isActive('/kubernetes/workloads') ? 'text-indigo-500' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-500'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                </svg>
                워크로드
              </NuxtLink>
              
              <NuxtLink 
                to="/kubernetes/services"
                class="group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150"
                :class="isActive('/kubernetes/services') ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'"
              >
                <svg class="mr-3 h-5 w-5" :class="isActive('/kubernetes/services') ? 'text-indigo-500' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-500'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"></path>
                </svg>
                서비스 & 네트워킹
              </NuxtLink>
            </nav>
          </div>

          <!-- Project Section - Project 탭일 때만 표시 -->
          <div v-if="isActiveTab('/projects')" class="mb-6">
            <h3 class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Overview</h3>
            <nav class="space-y-1">
              <NuxtLink 
                to="/projects"
                class="group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150"
                :class="isActive('/projects') && $route.path === '/projects' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'"
              >
                <svg class="mr-3 h-5 w-5" :class="isActive('/projects') && $route.path === '/projects' ? 'text-indigo-500' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-500'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z"></path>
                </svg>
                Dashboard
              </NuxtLink>
              
              <NuxtLink 
                to="/projects/quickstart"
                class="group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150"
                :class="isActive('/projects/quickstart') ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'"
              >
                <svg class="mr-3 h-5 w-5" :class="isActive('/projects/quickstart') ? 'text-indigo-500' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-500'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
                Quickstart
              </NuxtLink>
            </nav>
            
            <h3 class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 mt-6">Project Management</h3>
            <nav class="space-y-1">
              <NuxtLink 
                to="/projects/list"
                class="group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150"
                :class="isActive('/projects/list') ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'"
              >
                <svg class="mr-3 h-5 w-5" :class="isActive('/projects/list') ? 'text-indigo-500' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-500'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                </svg>
                프로젝트 목록
              </NuxtLink>
              
              <NuxtLink 
                to="/projects/members"
                class="group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150"
                :class="isActive('/projects/members') ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'"
              >
                <svg class="mr-3 h-5 w-5" :class="isActive('/projects/members') ? 'text-indigo-500' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-500'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
                </svg>
                멤버 관리
              </NuxtLink>
              
              <NuxtLink 
                to="/projects/resources"
                class="group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150"
                :class="isActive('/projects/resources') ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'"
              >
                <svg class="mr-3 h-5 w-5" :class="isActive('/projects/resources') ? 'text-indigo-500' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-500'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14-7H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2z"></path>
                </svg>
                리소스 할당
              </NuxtLink>
              
              <NuxtLink 
                to="/projects/analytics"
                class="group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150"
                :class="isActive('/projects/analytics') ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'"
              >
                <svg class="mr-3 h-5 w-5" :class="isActive('/projects/analytics') ? 'text-indigo-500' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-500'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
                분석
              </NuxtLink>
              
              <NuxtLink 
                to="/projects/settings"
                class="group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150"
                :class="isActive('/projects/settings') ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'"
              >
                <svg class="mr-3 h-5 w-5" :class="isActive('/projects/settings') ? 'text-indigo-500' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-500'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                설정
              </NuxtLink>
            </nav>
          </div>

          <!-- ZCP Section - ZCP 탭일 때만 표시 -->
          <div v-if="isActiveTab('/zcp') || isActiveTab('/applications')" class="mb-6">
            <h3 class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Overview</h3>
            <nav class="space-y-1">
              <NuxtLink 
                to="/zcp"
                class="group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150"
                :class="isActive('/zcp') && $route.path === '/zcp' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'"
              >
                <svg class="mr-3 h-5 w-5" :class="isActive('/zcp') && $route.path === '/zcp' ? 'text-indigo-500' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-500'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z"></path>
                </svg>
                Dashboard
              </NuxtLink>
            </nav>
            
            <h3 class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 mt-6">ZCP Platform</h3>
            <nav class="space-y-1">
              <NuxtLink 
                to="/zcp/clusters"
                class="group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150"
                :class="isActive('/zcp/clusters') ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'"
              >
                <svg class="mr-3 h-5 w-5" :class="isActive('/zcp/clusters') ? 'text-indigo-500' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-500'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14-7H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2z"></path>
                </svg>
                Multi-Clusters
              </NuxtLink>
              
              <NuxtLink 
                to="/zcp/projects"
                class="group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150"
                :class="isActive('/zcp/projects') ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'"
              >
                <svg class="mr-3 h-5 w-5" :class="isActive('/zcp/projects') ? 'text-indigo-500' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-500'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                </svg>
                Projects
              </NuxtLink>
              
              <NuxtLink 
                to="/zcp/pipelines"
                class="group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150"
                :class="isActive('/zcp/pipelines') ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'"
              >
                <svg class="mr-3 h-5 w-5" :class="isActive('/zcp/pipelines') ? 'text-indigo-500' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-500'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
                CI/CD Pipelines
              </NuxtLink>
              
              <NuxtLink 
                to="/applications"
                class="group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150"
                :class="isActive('/applications') ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'"
              >
                <svg class="mr-3 h-5 w-5" :class="isActive('/applications') ? 'text-indigo-500' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-500'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14-7H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2z"></path>
                </svg>
                Applications
              </NuxtLink>
            </nav>
          </div>

          <!-- DevOps Section - DevOps 탭일 때만 표시 -->
          <div v-if="isActiveTab('/devops')" class="mb-6">
            <h3 class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Overview</h3>
            <nav class="space-y-1">
              <NuxtLink 
                to="/devops"
                class="group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150"
                :class="isActive('/devops') && $route.path === '/devops' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'"
              >
                <svg class="mr-3 h-5 w-5" :class="isActive('/devops') && $route.path === '/devops' ? 'text-indigo-500' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-500'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z"></path>
                </svg>
                Dashboard
              </NuxtLink>
              
              <NuxtLink 
                to="/devops/quickstart"
                class="group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150"
                :class="isActive('/devops/quickstart') ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'"
              >
                <svg class="mr-3 h-5 w-5" :class="isActive('/devops/quickstart') ? 'text-indigo-500' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-500'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
                Quickstart
              </NuxtLink>
            </nav>
            
            <h3 class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 mt-6">DevOps Toolchain</h3>
            <nav class="space-y-1">
              <NuxtLink 
                to="/devops/pipelines"
                class="group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150"
                :class="isActive('/devops/pipelines') ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'"
              >
                <svg class="mr-3 h-5 w-5" :class="isActive('/devops/pipelines') ? 'text-indigo-500' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-500'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
                CI/CD 파이프라인
              </NuxtLink>
              
              <NuxtLink 
                to="/devops/tools"
                class="group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150"
                :class="isActive('/devops/tools') ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'"
              >
                <svg class="mr-3 h-5 w-5" :class="isActive('/devops/tools') ? 'text-indigo-500' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-500'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14-7H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2z"></path>
                </svg>
                도구 관리
              </NuxtLink>
              
              <NuxtLink 
                to="/devops/deployments"
                class="group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150"
                :class="isActive('/devops/deployments') ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'"
              >
                <svg class="mr-3 h-5 w-5" :class="isActive('/devops/deployments') ? 'text-indigo-500' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-500'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                </svg>
                배포 관리
              </NuxtLink>
            </nav>
          </div>

          <!-- Monitoring Section - Monitoring 탭일 때만 표시 -->
          <div v-if="isActiveTab('/monitoring')" class="mb-6">
            <h3 class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Overview</h3>
            <nav class="space-y-1">
              <NuxtLink 
                to="/monitoring"
                class="group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150"
                :class="isActive('/monitoring') && $route.path === '/monitoring' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'"
              >
                <svg class="mr-3 h-5 w-5" :class="isActive('/monitoring') && $route.path === '/monitoring' ? 'text-indigo-500' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-500'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z"></path>
                </svg>
                Dashboard
              </NuxtLink>
              
              <NuxtLink 
                to="/monitoring/quickstart"
                class="group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150"
                :class="isActive('/monitoring/quickstart') ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'"
              >
                <svg class="mr-3 h-5 w-5" :class="isActive('/monitoring/quickstart') ? 'text-indigo-500' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-500'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
                Quickstart
              </NuxtLink>
            </nav>
            
            <h3 class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 mt-6">Monitoring</h3>
            <nav class="space-y-1">
              <NuxtLink 
                to="/monitoring/systems"
                class="group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150"
                :class="isActive('/monitoring/systems') ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'"
              >
                <svg class="mr-3 h-5 w-5" :class="isActive('/monitoring/systems') ? 'text-indigo-500' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-500'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
                시스템 모니터링
              </NuxtLink>
              
              <NuxtLink 
                to="/monitoring/alerts"
                class="group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150"
                :class="isActive('/monitoring/alerts') ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'"
              >
                <svg class="mr-3 h-5 w-5" :class="isActive('/monitoring/alerts') ? 'text-indigo-500' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-500'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5zM10.5 3.75a6 6 0 0 1 6 6v2.25l2.25 2.25v2.25H2.25v-2.25L4.5 12V9.75a6 6 0 0 1 6-6z"></path>
                </svg>
                알림 관리
              </NuxtLink>
              
              <NuxtLink 
                to="/monitoring/metrics"
                class="group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150"
                :class="isActive('/monitoring/metrics') ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'"
              >
                <svg class="mr-3 h-5 w-5" :class="isActive('/monitoring/metrics') ? 'text-indigo-500' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-500'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                메트릭 분석
              </NuxtLink>
            </nav>
          </div>

          <!-- Security Section - Security 탭일 때만 표시 -->
          <div v-if="isActiveTab('/security')" class="mb-6">
            <h3 class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Overview</h3>
            <nav class="space-y-1">
              <NuxtLink 
                to="/security"
                class="group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150"
                :class="isActive('/security') && $route.path === '/security' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'"
              >
                <svg class="mr-3 h-5 w-5" :class="isActive('/security') && $route.path === '/security' ? 'text-indigo-500' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-500'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
                Dashboard
              </NuxtLink>
              
              <NuxtLink 
                to="/security/quickstart"
                class="group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150"
                :class="isActive('/security/quickstart') ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'"
              >
                <svg class="mr-3 h-5 w-5" :class="isActive('/security/quickstart') ? 'text-indigo-500' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-500'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
                Quickstart
              </NuxtLink>
            </nav>
            
            <h3 class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 mt-6">Security</h3>
            <nav class="space-y-1">
              <NuxtLink 
                to="/security/vulnerabilities"
                class="group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150"
                :class="isActive('/security/vulnerabilities') ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'"
              >
                <svg class="mr-3 h-5 w-5" :class="isActive('/security/vulnerabilities') ? 'text-indigo-500' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-500'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                </svg>
                취약점 관리
              </NuxtLink>
              
              <NuxtLink 
                to="/security/compliance"
                class="group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150"
                :class="isActive('/security/compliance') ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'"
              >
                <svg class="mr-3 h-5 w-5" :class="isActive('/security/compliance') ? 'text-indigo-500' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-500'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                </svg>
                컴플라이언스
              </NuxtLink>
            </nav>
          </div>

          <!-- Policy Section - Policy 탭일 때만 표시 -->
          <div v-if="isActiveTab('/policy')" class="mb-6">
            <h3 class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Overview</h3>
            <nav class="space-y-1">
              <NuxtLink 
                to="/policy"
                class="group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150"
                :class="isActive('/policy') && $route.path === '/policy' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'"
              >
                <svg class="mr-3 h-5 w-5" :class="isActive('/policy') && $route.path === '/policy' ? 'text-indigo-500' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-500'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                </svg>
                Dashboard
              </NuxtLink>
              
              <NuxtLink 
                to="/policy/quickstart"
                class="group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150"
                :class="isActive('/policy/quickstart') ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'"
              >
                <svg class="mr-3 h-5 w-5" :class="isActive('/policy/quickstart') ? 'text-indigo-500' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-500'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
                Quickstart
              </NuxtLink>
            </nav>
            
            <h3 class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 mt-6">Policy</h3>
            <nav class="space-y-1">
              <NuxtLink 
                to="/policy"
                class="group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150"
                :class="isActive('/policy') ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'"
              >
                <svg class="mr-3 h-5 w-5" :class="isActive('/policy') ? 'text-indigo-500' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-500'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                </svg>
                정책 관리
              </NuxtLink>
            </nav>
          </div>

          <!-- AI Ops Section - AI Ops 탭일 때만 표시 -->
          <div v-if="isActiveTab('/ai-ops')" class="mb-6">
            <h3 class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Overview</h3>
            <nav class="space-y-1">
              <NuxtLink 
                to="/ai-ops"
                class="group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150"
                :class="isActive('/ai-ops') && $route.path === '/ai-ops' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'"
              >
                <svg class="mr-3 h-5 w-5" :class="isActive('/ai-ops') && $route.path === '/ai-ops' ? 'text-indigo-500' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-500'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                </svg>
                Dashboard
              </NuxtLink>
              
              <NuxtLink 
                to="/ai-ops/quickstart"
                class="group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150"
                :class="isActive('/ai-ops/quickstart') ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'"
              >
                <svg class="mr-3 h-5 w-5" :class="isActive('/ai-ops/quickstart') ? 'text-indigo-500' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-500'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
                Quickstart
              </NuxtLink>
            </nav>
            
            <h3 class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 mt-6">AI Ops</h3>
            <nav class="space-y-1">
              <NuxtLink 
                to="/ai-ops"
                class="group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150"
                :class="isActive('/ai-ops') ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'"
              >
                <svg class="mr-3 h-5 w-5" :class="isActive('/ai-ops') ? 'text-indigo-500' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-500'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                </svg>
                AI 운영
              </NuxtLink>
            </nav>
          </div>
        </nav>
      </aside>

      <!-- Main Content Area -->
      <main class="flex-1 ml-64 p-6 bg-gray-50 dark:bg-gray-900">
        <slot />
      </main>
    </div>

    <!-- Toast Container -->
    <ToastContainer />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import ToastContainer from '~/components/common/ToastContainer.vue'
import { useRoute } from 'vue-router'

// Reactive data
const showUserMenu = ref(false)
const route = useRoute()

// Methods
const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value
}

const getLinkClass = (path: string) => {
  const isActive = route.path === path || (path !== '/' && route.path.startsWith(path))
  return [
    'flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
    isActive 
      ? 'bg-indigo-50 text-indigo-700 border-r-2 border-indigo-700' 
      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900'
  ].join(' ')
}

const isActive = (path: string) => {
  return route.path === path || (path !== '/' && route.path.startsWith(path))
}

const isActiveTab = (tabPath: string) => {
  if (!route || !route.path) return false
  return route.path.startsWith(tabPath)
}

// Close user menu when clicking outside
const handleClickOutside = (event: Event) => {
  if (showUserMenu.value) {
    showUserMenu.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script> 