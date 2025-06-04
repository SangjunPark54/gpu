<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-slate-900 dark:to-gray-800">
    <div class="p-8">
      <!-- Header -->
      <div class="flex items-center justify-between mb-8">
        <div class="flex items-center space-x-4">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
                </svg>
            </div>
            <div>
              <h1 class="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">Users</h1>
              <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">사용자 계정을 관리하고 권한을 설정하세요</p>
            </div>
          </div>
          <div class="bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-md border border-gray-200 dark:border-gray-700">
            <span class="text-sm font-semibold text-gray-700 dark:text-gray-300">{{ filteredUsers.length }}명</span>
          </div>
        </div>
        <button 
          @click="showAddUserModal = true"
          class="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center space-x-3 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          <span>새 사용자 추가</span>
        </button>
      </div>

      <!-- Search and Filter Bar -->
      <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/50 p-6 mb-8">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-6 flex-1">
            <!-- Search Input -->
            <div class="relative flex-1 max-w-lg">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
              <input
                v-model="searchQuery"
                type="text"
                placeholder="사용자 검색..."
                class="block w-full pl-12 pr-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl bg-white/50 dark:bg-gray-700/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm"
              />
            </div>
          </div>

          <!-- Pagination Controls -->
          <div class="flex items-center space-x-6">
            <div class="flex items-center space-x-3">
              <span class="text-sm font-medium text-gray-700 dark:text-gray-300">페이지당</span>
              <select 
                v-model="itemsPerPage" 
                class="border border-gray-200 dark:border-gray-600 rounded-lg bg-white/80 dark:bg-gray-700/80 text-gray-900 dark:text-white text-sm px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
              >
                <option value="10">10개</option>
                <option value="20">20개</option>
                <option value="50">50개</option>
                <option value="100">100개</option>
              </select>
            </div>
            
            <div class="flex items-center space-x-2">
              <button 
                @click="currentPage = Math.max(1, currentPage - 1)"
                :disabled="currentPage === 1"
                class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                </svg>
              </button>
              
              <div class="bg-blue-50 dark:bg-blue-900/30 px-4 py-2 rounded-lg">
                <span class="text-sm font-semibold text-blue-700 dark:text-blue-300">{{ currentPage }} / {{ totalPages }}</span>
              </div>
              
              <button 
                @click="currentPage = Math.min(totalPages, currentPage + 1)"
                :disabled="currentPage === totalPages"
                class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Users Table -->
      <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/50 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full">
            <thead class="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800">
              <tr>
                <th class="px-6 py-4 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200" @click="sortBy('loginId')">
                  <div class="flex items-center space-x-2">
                    <span>Login ID</span>
                    <svg class="w-4 h-4 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4"></path>
                    </svg>
                  </div>
                </th>
                <th class="px-6 py-4 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200" @click="sortBy('name')">
                  <div class="flex items-center space-x-2">
                    <span>이름</span>
                    <svg class="w-4 h-4 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4"></path>
                    </svg>
                  </div>
                </th>
                <th class="px-6 py-4 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200" @click="sortBy('email')">
                  <div class="flex items-center space-x-2">
                    <span>이메일</span>
                    <svg class="w-4 h-4 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4"></path>
                    </svg>
                  </div>
                </th>
                <th class="px-6 py-4 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">역할</th>
                <th class="px-6 py-4 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">그룹</th>
                <th class="px-6 py-4 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200" @click="sortBy('created')">
                  <div class="flex items-center space-x-2">
                    <span>생성일</span>
                    <svg class="w-4 h-4 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4"></path>
                    </svg>
                  </div>
                </th>
                <th class="px-6 py-4 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">승인</th>
                <th class="px-6 py-4 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">작업</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100 dark:divide-gray-700">
              <tr v-for="user in paginatedUsers" :key="user.id" class="hover:bg-blue-50/50 dark:hover:bg-gray-700/50 transition-all duration-200">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center space-x-3">
                    <div class="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md">
                      {{ user.loginId.charAt(0).toUpperCase() }}
                    </div>
                    <button 
                      @click="showUserInfo(user)"
                      class="text-sm font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                    >
                      {{ user.loginId }}
                    </button>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="text-sm font-medium text-gray-900 dark:text-white">{{ user.name || '-' }}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="text-sm text-gray-600 dark:text-gray-400">{{ user.email || '-' }}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex flex-wrap gap-1">
                    <div v-for="role in user.roles" :key="role" class="relative group">
                      <span class="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 dark:from-blue-900 dark:to-blue-800 dark:text-blue-200 shadow-sm cursor-help">
                        {{ role }}
                      </span>
                      <div class="absolute left-0 bottom-full mb-2 hidden group-hover:block z-50">
                        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-3 min-w-[200px]">
                          <h4 class="font-semibold text-sm text-gray-900 dark:text-white mb-2">{{ role }} 권한</h4>
                          <ul class="text-xs text-gray-600 dark:text-gray-300 space-y-1">
                            <li v-for="(permission, index) in getRolePermissions()" :key="index" class="flex items-start">
                              <svg class="w-4 h-4 mr-1 text-green-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                              </svg>
                              {{ permission }}
                            </li>
                          </ul>
                        </div>
                        <div class="w-2 h-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 transform rotate-45 absolute left-4 -bottom-1"></div>
                      </div>
                    </div>
                    <span v-if="user.roles.length === 0" class="text-xs text-gray-400">-</span>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex flex-wrap gap-1">
                    <div v-for="group in user.groups" :key="group" class="relative group">
                      <span class="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 dark:from-gray-700 dark:to-gray-600 dark:text-gray-300 shadow-sm cursor-help">
                        {{ group }}
                      </span>
                      <div class="absolute left-0 bottom-full mb-2 hidden group-hover:block z-50">
                        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-3 min-w-[200px]">
                          <h4 class="font-semibold text-sm text-gray-900 dark:text-white mb-2">{{ group }} 권한</h4>
                          <ul class="text-xs text-gray-600 dark:text-gray-300 space-y-1">
                            <li v-for="(permission, index) in getGroupPermissions()" :key="index" class="flex items-start">
                              <svg class="w-4 h-4 mr-1 text-green-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                              </svg>
                              {{ permission }}
                            </li>
                          </ul>
                        </div>
                        <div class="w-2 h-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 transform rotate-45 absolute left-4 -bottom-1"></div>
                      </div>
                    </div>
                    <span v-if="user.groups.length === 0" class="text-xs text-gray-400">-</span>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="text-sm text-gray-600 dark:text-gray-400">{{ formatDate(user.created) }}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="mt-1">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                      :class="user.approved ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'"
                    >
                      {{ user.approved ? '승인됨' : '미승인' }}
                    </span>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="relative" v-click-outside="() => closeActionMenu(user.id)">
                    <button 
                      @click="toggleActionMenu(user.id)"
                      class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-200 hover:shadow-md"
                    >
                      <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
                      </svg>
                    </button>
                    
                    <div v-if="activeActionMenu === user.id" class="absolute right-0 mt-2 w-52 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 z-10 overflow-hidden">
                      <div class="py-2">
                        <button 
                          @click="editUser(user)"
                          class="flex items-center w-full px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors duration-200"
                        >
                          <svg class="w-4 h-4 mr-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                          </svg>
                          <span class="font-medium">편집</span>
                        </button>
                        <button 
                          @click="resetPassword(user)"
                          class="flex items-center w-full px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-yellow-50 dark:hover:bg-gray-700 transition-colors duration-200"
                        >
                          <svg class="w-4 h-4 mr-3 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"></path>
                          </svg>
                          <span class="font-medium">비밀번호 재설정</span>
                        </button>
                        <button 
                          @click="unlockUser(user)"
                          class="flex items-center w-full px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-gray-700 transition-colors duration-200"
                        >
                          <svg class="w-4 h-4 mr-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                          </svg>
                          <span class="font-medium">잠금 해제</span>
                        </button>
                        <button 
                          @click="deleteUser(user)"
                          class="flex items-center w-full px-4 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-gray-700 transition-colors duration-200"
                        >
                          <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
                          <span class="font-medium">삭제</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Add User Modal -->
      <div v-if="showAddUserModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 w-full max-w-md overflow-hidden">
          <div class="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
            <h3 class="text-xl font-bold text-white">새 사용자 추가</h3>
            <p class="text-blue-100 text-sm mt-1">새로운 사용자 계정을 생성합니다</p>
          </div>
          <form @submit.prevent="addUser" class="p-6">
            <div class="space-y-5">
              <div>
                <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Login ID</label>
                <input 
                  v-model="newUser.loginId" 
                  type="text" 
                  required 
                  class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="사용자 ID를 입력하세요"
                >
              </div>
              <div>
                <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">이름</label>
                <input 
                  v-model="newUser.name" 
                  type="text" 
                  required 
                  class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="사용자 이름을 입력하세요"
                >
              </div>
              <div>
                <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">이메일</label>
                <input 
                  v-model="newUser.email" 
                  type="email" 
                  required 
                  class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="이메일 주소를 입력하세요"
                >
              </div>
            </div>
            <div class="flex justify-end space-x-3 mt-8">
              <button 
                type="button" 
                @click="showAddUserModal = false" 
                class="px-6 py-3 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 font-medium transition-all duration-200"
              >
                취소
              </button>
              <button 
                type="submit" 
                class="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                사용자 추가
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Edit User Modal -->
      <div v-if="showEditUserModal && editingUser" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 w-full max-w-4xl max-h-[90vh] overflow-hidden">
          <!-- Header -->
          <div class="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-xl font-bold text-white">{{ editingUser.name || editingUser.loginId }} 편집</h3>
                <p class="text-blue-100 text-sm mt-1">사용자 정보를 수정합니다</p>
              </div>
              <button 
                @click="showEditUserModal = false"
                class="text-white hover:text-gray-200 transition-colors"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
          </div>

          <!-- Breadcrumb -->
          <div class="px-6 py-3 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
            <nav class="flex text-sm text-gray-500 dark:text-gray-400">
              <span>Home</span>
              <svg class="w-4 h-4 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
              <span>Users</span>
              <svg class="w-4 h-4 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
              <span class="text-blue-600 dark:text-blue-400 font-medium">Detail</span>
            </nav>
          </div>

          <!-- Content -->
          <div class="flex-1 overflow-y-auto">
            <!-- User Title -->
            <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-600">
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
                {{ editingUser.name || 'undefined' }} {{ editingUser.loginId }}
              </h2>
            </div>

            <!-- Tabs -->
            <div class="px-6 py-4">
              <div class="flex space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                <button 
                  @click="activeTab = 'basic'"
                  :class="[
                    'px-4 py-2 rounded-md text-sm font-medium transition-all duration-200',
                    activeTab === 'basic' 
                      ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-sm' 
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  ]"
                >
                  Basic info
                </button>
                <button 
                  @click="activeTab = 'credentials'"
                  :class="[
                    'px-4 py-2 rounded-md text-sm font-medium transition-all duration-200',
                    activeTab === 'credentials' 
                      ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-sm' 
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  ]"
                >
                  Credentials
                </button>
                <button 
                  @click="activeTab = 'roles'"
                  :class="[
                    'px-4 py-2 rounded-md text-sm font-medium transition-all duration-200',
                    activeTab === 'roles' 
                      ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-sm' 
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  ]"
                >
                  Roles
                </button>
                <button 
                  @click="activeTab = 'groups'"
                  :class="[
                    'px-4 py-2 rounded-md text-sm font-medium transition-all duration-200',
                    activeTab === 'groups' 
                      ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-sm' 
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  ]"
                >
                  Groups
                </button>
                <button 
                  @click="activeTab = 'history'"
                  :class="[
                    'px-4 py-2 rounded-md text-sm font-medium transition-all duration-200',
                    activeTab === 'history' 
                      ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-sm' 
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  ]"
                >
                  History log
                </button>
              </div>
            </div>

            <!-- Tab Content -->
            <div class="px-6 pb-6">
              <!-- Basic Info Tab -->
              <div v-if="activeTab === 'basic'" class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Account ID:</label>
                    <div class="px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-sm text-gray-600 dark:text-gray-400 font-mono">
                      1a1bf6bd-45ff-420d-be82-15cdbc9cd8ed
            </div>
          </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Login ID:</label>
                    <div class="px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-sm text-gray-900 dark:text-white font-medium">
                      {{ editingUser.loginId }}
        </div>
      </div>
    </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Last Name: <span class="text-red-500">*</span>
                    </label>
                    <input 
                      v-model="editingUser.name"
                      type="text" 
                      class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      First Name: <span class="text-red-500">*</span>
                    </label>
                    <input 
                      type="text" 
                      class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder=""
                    >
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email: <span class="text-red-500">*</span>
                  </label>
                  <input 
                    v-model="editingUser.email"
                    type="email" 
                    class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Effective roles:</label>
                  <div class="flex flex-wrap gap-2">
                    <span v-for="role in editingUser.roles" :key="role" class="inline-flex px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                      {{ role }}
                    </span>
                    <span v-if="editingUser.roles.length === 0" class="text-sm text-gray-500">역할이 없습니다</span>
                  </div>
                </div>

                <!-- Toggle Switches -->
                <div class="space-y-4">
                  <div class="flex items-center justify-between">
                    <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Approved:</label>
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        v-model="editingUser.approved"
                        class="sr-only peer"
                      >
                      <div class="w-12 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div class="flex items-center justify-between">
                    <div>
                      <label class="text-sm font-medium text-gray-700 dark:text-gray-300">User Enable:</label>
                      <p class="text-xs text-orange-500 mt-1">When set to "OFF", you cannot log in</p>
                    </div>
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked
                        class="sr-only peer"
                      >
                      <div class="w-12 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

        <div class="flex items-center justify-between">
                    <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Email Verified:</label>
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked
                        class="sr-only peer"
                      >
                      <div class="w-12 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Created Date:</label>
                  <div class="px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-sm text-gray-600 dark:text-gray-400">
                    {{ formatDate(editingUser.created) }}
                  </div>
                </div>
              </div>

              <!-- Credential Tab -->
              <div v-else-if="activeTab === 'credentials'" class="space-y-8">
                <div>
                  <h3 class="font-bold text-lg text-gray-800 mb-4">Password</h3>
                  <div class="grid gap-4 max-w-xl">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">New Password: <span class="text-red-500">*</span></label>
                      <input v-model="credentials.password" type="password" class="w-full px-4 py-2 border rounded" />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">New Password Confirmation: <span class="text-red-500">*</span></label>
                      <input v-model="credentials.passwordConfirm" type="password" class="w-full px-4 py-2 border rounded" />
                    </div>
                  </div>
                </div>
                <div>
                  <h3 class="font-bold text-lg text-gray-800 mb-4">Double login security settings</h3>
                  <label class="flex items-center space-x-3">
                    <input type="checkbox" v-model="credentials.mobileVerification" class="toggle" />
                    <span>Mobile verification: <span class="text-orange-500">When set to "OFF", you cannot log in</span></span>
                  </label>
                </div>
              </div>

              <!-- Roles Tab -->
              <div v-else-if="activeTab === 'roles'" class="flex gap-6">
                <div class="w-1/3">
                  <h4 class="font-bold mb-2">Roles</h4>
                  <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 max-h-72 overflow-y-auto">
                    <div>
                      <label><input type="checkbox" @change="selectedRoles = allRoles.slice()" :checked="selectedRoles.length === allRoles.length"> Select all</label>
                    </div>
                    <div v-for="role in allRoles" :key="role">
                      <label><input type="checkbox" :value="role" v-model="selectedRoles"> {{ role }}</label>
        </div>
      </div>
                  <button @click="addRoles" class="mt-2 w-full bg-blue-100 text-blue-700 rounded py-2">Add selected</button>
                </div>
                <div class="w-1/3">
                  <h4 class="font-bold mb-2">Assigned roles</h4>
                  <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 max-h-72 overflow-y-auto">
                    <div>
                      <label><input type="checkbox" @change="removeRoles = editingUser.roles.slice()" :checked="removeRoles.length === editingUser.roles.length"> Select all</label>
                    </div>
                    <div v-for="role in editingUser.roles" :key="role">
                      <label><input type="checkbox" :value="role" v-model="removeRoles"> {{ role }}</label>
                    </div>
                  </div>
                  <button @click="removeSelectedRoles" class="mt-2 w-full bg-red-100 text-red-700 rounded py-2">Remove selected</button>
                </div>
                <div class="w-1/3">
                  <h4 class="font-bold mb-2">Effective roles</h4>
                  <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 min-h-[120px]">
                    <div v-for="role in editingUser.roles" :key="role">{{ role }}</div>
                  </div>
                </div>
              </div>

              <!-- Groups Tab -->
              <div v-else-if="activeTab === 'groups'" class="flex gap-6">
                <div class="w-1/3">
                  <h4 class="font-bold mb-2">Groups</h4>
                  <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 max-h-72 overflow-y-auto">
                    <div v-for="group in allGroups" :key="group">
                      <label><input type="checkbox" :value="group" v-model="selectedGroups"> {{ group }}</label>
                    </div>
                  </div>
                  <button @click="addGroups" class="mt-2 w-full bg-blue-100 text-blue-700 rounded py-2">Add selected</button>
                </div>
                <div class="w-1/3">
                  <h4 class="font-bold mb-2">Assigned groups</h4>
                  <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 max-h-72 overflow-y-auto">
                    <div v-for="group in editingUser.groups" :key="group">
                      <label><input type="checkbox" :value="group" v-model="removeGroups"> {{ group }}</label>
                    </div>
                  </div>
                  <button @click="removeSelectedGroups" class="mt-2 w-full bg-red-100 text-red-700 rounded py-2">Remove selected</button>
                </div>
                <div class="w-1/3">
                  <h4 class="font-bold mb-2">Effective roles</h4>
                  <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 min-h-[120px]">
                    <div v-for="role in editingUser.roles" :key="role">{{ role }}</div>
                  </div>
                </div>
              </div>

              <!-- History Log Tab -->
              <div v-else-if="activeTab === 'history'" class="overflow-x-auto">
                <table class="min-w-full">
                  <thead>
                    <tr>
                      <th class="px-4 py-2">Date time</th>
                      <th class="px-4 py-2">IP address</th>
                      <th class="px-4 py-2">Event resource</th>
                      <th class="px-4 py-2">Action type</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="log in historyLogs" :key="log.id">
                      <td class="px-4 py-2">{{ log.date }}</td>
                      <td class="px-4 py-2">{{ log.ip }}</td>
                      <td class="px-4 py-2">{{ log.resource }}</td>
                      <td class="px-4 py-2">{{ log.action }}</td>
            </tr>
          </tbody>
        </table>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div class="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600 flex justify-end space-x-3">
            <button 
              @click="showEditUserModal = false"
              class="px-6 py-3 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-600 font-medium transition-all duration-200"
            >
              취소
            </button>
            <button 
              @click="saveUser"
              class="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              저장
            </button>
          </div>
        </div>
      </div>

      <!-- User Info Modal -->
      <div v-if="showUserInfoModal && selectedUser" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 w-full max-w-md overflow-hidden">
          <div class="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-xl font-bold text-white">사용자 정보</h3>
                <p class="text-blue-100 text-sm mt-1">{{ selectedUser.loginId }}</p>
              </div>
              <button 
                @click="showUserInfoModal = false"
                class="text-white hover:text-gray-200 transition-colors"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
          </div>
          
          <div class="p-6 space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-500 dark:text-gray-400">이름</label>
              <p class="mt-1 text-sm text-gray-900 dark:text-white">{{ selectedUser.name || '-' }}</p>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-500 dark:text-gray-400">이메일</label>
              <p class="mt-1 text-sm text-gray-900 dark:text-white">{{ selectedUser.email || '-' }}</p>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-500 dark:text-gray-400">역할</label>
              <div class="mt-1 flex flex-wrap gap-1">
                <span v-for="role in selectedUser.roles" :key="role" class="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  {{ role }}
                </span>
                <span v-if="selectedUser.roles.length === 0" class="text-sm text-gray-500">-</span>
              </div>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-500 dark:text-gray-400">그룹</label>
              <div class="mt-1 flex flex-wrap gap-1">
                <span v-for="group in selectedUser.groups" :key="group" class="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                  {{ group }}
                </span>
                <span v-if="selectedUser.groups.length === 0" class="text-sm text-gray-500">-</span>
              </div>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-500 dark:text-gray-400">생성일</label>
              <p class="mt-1 text-sm text-gray-900 dark:text-white">{{ formatDate(selectedUser.created) }}</p>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-500 dark:text-gray-400">상태</label>
              <div class="mt-1">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                  :class="selectedUser.approved ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'"
                >
                  {{ selectedUser.approved ? '승인됨' : '미승인' }}
                </span>
              </div>
            </div>
          </div>
          
          <div class="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600 flex justify-end space-x-3">
            <button 
              @click="showUserInfoModal = false"
              class="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 font-medium transition-all duration-200"
            >
              닫기
            </button>
            <button 
              @click="handleEditUserFromInfo"
              class="px-4 py-2 text-sm bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 font-medium transition-all duration-200 shadow-sm hover:shadow-md"
            >
              편집
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

useHead({
  title: 'Users - AXMP'
})

interface User {
  id: number
  loginId: string
  name: string
  email: string
  roles: string[]
  groups: string[]
  created: string
  approved: boolean
}

// Reactive data
const searchQuery = ref('')
const currentPage = ref(1)
const itemsPerPage = ref(20)
const sortField = ref('loginId')
const sortDirection = ref('asc')
const activeActionMenu = ref<number | null>(null)
const showAddUserModal = ref(false)
const showEditUserModal = ref(false)
const editingUser = ref<User | null>(null)
const activeTab = ref('basic')

// Credential tab state
const credentials = ref({
  password: '',
  passwordConfirm: '',
  mobileVerification: false,
});

// Roles tab state
const allRoles = [
  'cluster-administrator', 'dashboard-reader', 'git-administrator', 'global-administrator',
  'global-reader', 'group-administrator', 'harbor-administrator', 'logging-administrator', 'admin_test'
];
const selectedRoles = ref<string[]>([]);
const removeRoles = ref<string[]>([]);
const addRoles = () => {
  if (!editingUser.value) return;
  editingUser.value.roles = Array.from(new Set([...editingUser.value.roles, ...selectedRoles.value]));
  selectedRoles.value = [];
};
const removeSelectedRoles = () => {
  if (!editingUser.value) return;
  editingUser.value.roles = editingUser.value.roles.filter(r => !removeRoles.value.includes(r));
  removeRoles.value = [];
};

// Groups tab state
const allGroups = [
  'ArgoCDAdmins', 'administrator', 'cluster-manager', 'iam-manager', 'observer', 'project-manager'
];
const selectedGroups = ref<string[]>([]);
const removeGroups = ref<string[]>([]);
const addGroups = () => {
  if (!editingUser.value) return;
  editingUser.value.groups = Array.from(new Set([...editingUser.value.groups, ...selectedGroups.value]));
  selectedGroups.value = [];
};
const removeSelectedGroups = () => {
  if (!editingUser.value) return;
  editingUser.value.groups = editingUser.value.groups.filter(g => !removeGroups.value.includes(g));
  removeGroups.value = [];
};

// History log tab state
const historyLogs = ref([
  { id: 1, date: '2024-06-01 10:00', ip: '192.168.0.1', resource: 'User', action: 'Login' },
  { id: 2, date: '2024-06-02 11:30', ip: '192.168.0.2', resource: 'User', action: 'Update' },
]);

// Sample users data
const users = ref<User[]>([
  {
    id: 1,
    loginId: 'admin',
    name: 'admin test',
    email: 'admin-test@sk.com',
    roles: ['ags.admin_test'],
    groups: [],
    created: '2025-05-23T08:14:24.197Z',
    approved: true
  },
  {
    id: 2,
    loginId: 'amdpuser',
    name: 'Admin AMDP',
    email: 'amdpuser@skcc.com',
    roles: [],
    groups: ['administrator'],
    created: '2025-05-13T04:16:20.084Z',
    approved: false
  },
  {
    id: 3,
    loginId: 'apimuser',
    name: 'Admin APIM',
    email: 'apim.admin@skcc.com',
    roles: [],
    groups: ['administrator'],
    created: '2025-05-13T04:15:10.238Z',
    approved: false
  },
  {
    id: 4,
    loginId: 'cloudzcp-admin',
    name: 'cloudzcp admin',
    email: 'cloudzcp-admin@sk.com',
    roles: ['ags.role-administrator', 'ags.user-administrator'],
    groups: ['ArgoCDAdmins', 'cluster-manager'],
    created: '1970-01-21T01:06:23.336Z',
    approved: true
  },
  {
    id: 5,
    loginId: 'fpt-lunar',
    name: 'Nha Nguyen',
    email: 'fpt-lunar@fpt.com',
    roles: ['ags.project-administrator', 'ags.role-administrator'],
    groups: ['ArgoCDAdmins', 'administrator', 'cluster-manager'],
    created: '2025-05-09T03:25:30.393Z',
    approved: true
  },
  {
    id: 6,
    loginId: 'fptlunar',
    name: 'Nha Nguyen',
    email: 'nhan@fpt.com',
    roles: ['ags.project-administrator', 'ags.role-administrator'],
    groups: ['ArgoCDAdmins', 'project-manager'],
    created: '2025-05-09T01:31:50.734Z',
    approved: true
  },
  {
    id: 7,
    loginId: 'kilsoo75',
    name: 'Kilsoo Kang',
    email: 'kilsoo75@gmail.com',
    roles: [],
    groups: ['administrator'],
    created: '2025-05-12T16:44:56.375Z',
    approved: true
  },
  {
    id: 8,
    loginId: 'test',
    name: 'test test',
    email: 'test@sk.com',
    roles: [],
    groups: [],
    created: '2025-05-22T10:31:04.882Z',
    approved: true
  },
  {
    id: 9,
    loginId: 'tinatrinh',
    name: 'Trinh Tina',
    email: 'trinh@fpt.com',
    roles: ['ags.project-administrator', 'ags.role-administrator'],
    groups: ['ArgoCDAdmins', 'administrator', 'cluster-manager'],
    created: '2025-05-09T01:29:32.501Z',
    approved: true
  },
  {
    id: 10,
    loginId: 'zcp-cicd',
    name: '',
    email: '',
    roles: [],
    groups: [],
    created: '2025-05-29T05:13:41.519Z',
    approved: false
  }
])

const newUser = ref({
  loginId: '',
  name: '',
  email: ''
})

// Computed properties
const filteredUsers = computed(() => {
  if (!searchQuery.value) return users.value
  
  const query = searchQuery.value.toLowerCase()
  return users.value.filter(user => 
    user.loginId.toLowerCase().includes(query) ||
    user.name.toLowerCase().includes(query) ||
    user.email.toLowerCase().includes(query) ||
    user.roles.some(role => role.toLowerCase().includes(query)) ||
    user.groups.some(group => group.toLowerCase().includes(query))
  )
})

const sortedUsers = computed(() => {
  const sorted = [...filteredUsers.value].sort((a, b) => {
    let aVal = a[sortField.value as keyof User]
    let bVal = b[sortField.value as keyof User]
    
    if (typeof aVal === 'string') aVal = aVal.toLowerCase()
    if (typeof bVal === 'string') bVal = bVal.toLowerCase()
    
    if (aVal < bVal) return sortDirection.value === 'asc' ? -1 : 1
    if (aVal > bVal) return sortDirection.value === 'asc' ? 1 : -1
    return 0
  })
  
  return sorted
})

const totalPages = computed(() => Math.ceil(sortedUsers.value.length / itemsPerPage.value))

const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return sortedUsers.value.slice(start, end)
})

// Methods
const sortBy = (field: string) => {
  if (sortField.value === field) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortField.value = field
    sortDirection.value = 'asc'
  }
}

const toggleActionMenu = (userId: number) => {
  activeActionMenu.value = activeActionMenu.value === userId ? null : userId
}

const closeActionMenu = (userId: number) => {
  if (activeActionMenu.value === userId) {
    activeActionMenu.value = null
  }
}

const toggleApproval = (user: User) => {
  // API call would go here
  console.log(`Toggled approval for user ${user.loginId}: ${user.approved}`)
}

const editUser = (user: User) => {
  activeActionMenu.value = null
  editingUser.value = user
  showEditUserModal.value = true
}

const resetPassword = (user: User) => {
  activeActionMenu.value = null
  console.log('Reset password for user:', user)
  // Implement password reset functionality
}

const deleteUser = (user: User) => {
  activeActionMenu.value = null
  if (confirm(`Are you sure you want to delete user ${user.loginId}?`)) {
    const index = users.value.findIndex(u => u.id === user.id)
    if (index > -1) {
      users.value.splice(index, 1)
    }
  }
}

const addUser = () => {
  const user: User = {
    id: Date.now(),
    loginId: newUser.value.loginId,
    name: newUser.value.name,
    email: newUser.value.email,
    roles: [],
    groups: [],
    created: new Date().toISOString(),
    approved: false
  }
  
  users.value.push(user)
  showAddUserModal.value = false
  newUser.value = { loginId: '', name: '', email: '' }
}

const saveUser = () => {
  if (editingUser.value) {
    const index = users.value.findIndex(u => u.id === editingUser.value!.id)
    if (index > -1) {
      users.value[index] = { ...editingUser.value }
    }
  }
  showEditUserModal.value = false
  editingUser.value = null
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const unlockUser = (user: User) => {
  activeActionMenu.value = null
  console.log('Unlock user:', user.loginId)
  // 실제 unlock API 연동 시 여기에 추가
}

// Click outside directive
const vClickOutside = {
  beforeMount(el: any, binding: any) {
    el.clickOutsideEvent = (event: Event) => {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value()
      }
    }
    document.addEventListener('click', el.clickOutsideEvent)
  },
  unmounted(el: any) {
    document.removeEventListener('click', el.clickOutsideEvent)
  }
}

// Watch for page changes when filtered results change
watch(filteredUsers, () => {
  if (currentPage.value > totalPages.value) {
    currentPage.value = 1
  }
})

// Reactive data 섹션에 추가
const showUserInfoModal = ref(false)
const selectedUser = ref<User | null>(null)

// Methods 섹션에 추가
const showUserInfo = (user: User) => {
  selectedUser.value = user
  showUserInfoModal.value = true
}

const getRolePermissions = () => ['Mock 권한1', 'Mock 권한2']
const getGroupPermissions = () => ['Mock 권한A', 'Mock 권한B']

// '편집' 버튼 클릭 시 사용자 정보 모달 닫고 편집 모달만 열리도록 수정
const handleEditUserFromInfo = () => {
  showUserInfoModal.value = false
  if (selectedUser.value) {
    editUser(selectedUser.value)
  }
}
</script> 