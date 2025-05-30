<template>
  <div class="p-6">
    <!-- Page Header -->
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">그룹 관리</h1>
      <p class="text-gray-600 dark:text-gray-400 mt-2">사용자 그룹을 생성하고 관리합니다.</p>
    </div>

    <!-- Groups Overview -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div class="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <svg class="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">전체 그룹</dt>
                <dd class="text-lg font-medium text-gray-900 dark:text-white">{{ stats.totalGroups }}</dd>
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
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
                </svg>
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">활성 그룹</dt>
                <dd class="text-lg font-medium text-gray-900 dark:text-white">{{ stats.activeGroups }}</dd>
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
                <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">총 멤버</dt>
                <dd class="text-lg font-medium text-gray-900 dark:text-white">{{ stats.totalMembers }}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center">
                <svg class="w-5 h-5 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">할당된 권한</dt>
                <dd class="text-lg font-medium text-gray-900 dark:text-white">{{ stats.assignedPermissions }}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Groups Management -->
    <div class="bg-white dark:bg-gray-800 shadow rounded-lg">
      <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white">그룹 목록</h3>
          <button class="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            새 그룹 생성
          </button>
        </div>
      </div>

      <!-- Search and Filter -->
      <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <div class="flex items-center space-x-4">
          <div class="flex-1">
            <input
              type="text"
              placeholder="그룹 이름으로 검색..."
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <select v-model="selectedStatus" class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white">
            <option value="">모든 상태</option>
            <option value="active">활성</option>
            <option value="inactive">비활성</option>
          </select>
        </div>
      </div>

      <!-- Groups Table -->
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead class="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                그룹 이름
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                설명
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                멤버 수
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                권한
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                상태
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                생성일
              </th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                작업
              </th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="group in filteredGroups" :key="group.id" class="hover:bg-gray-50 dark:hover:bg-gray-700">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="w-8 h-8 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center">
                    <span class="text-indigo-600 dark:text-indigo-400 font-medium text-sm">{{ group.name.charAt(0) }}</span>
                  </div>
                  <div class="ml-3">
                    <button
                      @click="handleShowGroupInfo(group)"
                      class="text-sm font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 focus:outline-none"
                      aria-label="그룹 정보 보기"
                    >
                      {{ group.name }}
                    </button>
                    <div class="text-sm text-gray-500 dark:text-gray-400">{{ group.type }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="text-sm text-gray-900 dark:text-white">{{ group.description }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <button @click="handleShowMemberModal(group)" class="text-sm text-blue-600 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-200 focus:outline-none">
                  {{ group.memberCount }}
                </button>
              </td>
              <td class="px-6 py-4">
                <div class="flex flex-wrap gap-1">
                  <span v-for="permission in group.permissions.slice(0, 2)" :key="permission"
                    class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 cursor-help relative group"
                    @mouseenter="showPermissionTooltip(permission, $event)" @mouseleave="hidePermissionTooltip"
                  >
                    {{ permission }}
                    <div v-if="tooltip.visible && tooltip.permission === permission" class="absolute left-0 top-full mt-1 z-50 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow-lg px-3 py-2 text-xs text-gray-700 dark:text-gray-200 whitespace-nowrap">
                      {{ getPermissionDescription(permission) }}
                    </div>
                  </span>
                  <span v-if="group.permissions.length > 2" class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                    +{{ group.permissions.length - 2 }}
                  </span>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full" :class="getStatusClass(group.status)">
                  {{ group.status === 'active' ? '활성' : '비활성' }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {{ group.createdAt }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="flex items-center justify-end space-x-2">
                  <button @click="handleEditGroup(group)" class="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400">편집</button>
                  <button @click="handleDeleteGroup(group)" class="text-red-600 hover:text-red-900 dark:text-red-400">삭제</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between">
          <div class="text-sm text-gray-700 dark:text-gray-300">
            총 {{ groups.length }}개 그룹 중 1-{{ groups.length }}개 표시
          </div>
          <div class="flex items-center space-x-2">
            <button class="px-3 py-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300">
              이전
            </button>
            <button class="px-3 py-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300">
              다음
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- 그룹 정보 모달 -->
  <div v-if="showGroupInfoModal && selectedGroup" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 w-full max-w-md overflow-hidden">
      <div class="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-xl font-bold text-white">그룹 정보</h3>
            <p class="text-blue-100 text-sm mt-1">{{ selectedGroup.name }}</p>
          </div>
          <button @click="showGroupInfoModal = false" class="text-white hover:text-gray-200 transition-colors">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      </div>
      <div class="p-6 space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-500 dark:text-gray-400">설명</label>
          <p class="mt-1 text-sm text-gray-900 dark:text-white">{{ selectedGroup.description }}</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-500 dark:text-gray-400">타입</label>
          <p class="mt-1 text-sm text-gray-900 dark:text-white">{{ selectedGroup.type }}</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-500 dark:text-gray-400">멤버 수</label>
          <p class="mt-1 text-sm text-gray-900 dark:text-white">{{ selectedGroup.memberCount }}</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-500 dark:text-gray-400">권한</label>
          <div class="mt-1 flex flex-wrap gap-1">
            <span v-for="permission in selectedGroup.permissions" :key="permission" class="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 cursor-help relative group"
              @mouseenter="showPermissionTooltip(permission, $event)" @mouseleave="hidePermissionTooltip"
            >
              {{ permission }}
              <div v-if="tooltip.visible && tooltip.permission === permission" class="absolute left-0 top-full mt-1 z-50 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow-lg px-3 py-2 text-xs text-gray-700 dark:text-gray-200 whitespace-nowrap">
                {{ getPermissionDescription(permission) }}
              </div>
            </span>
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-500 dark:text-gray-400">상태</label>
          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
            :class="selectedGroup.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'"
          >
            {{ selectedGroup.status === 'active' ? '활성' : '비활성' }}
          </span>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-500 dark:text-gray-400">생성일</label>
          <p class="mt-1 text-sm text-gray-900 dark:text-white">{{ selectedGroup.createdAt }}</p>
        </div>
      </div>
      <div class="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600 flex justify-end space-x-3">
        <button @click="showGroupInfoModal = false" class="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 font-medium transition-all duration-200">
          닫기
        </button>
        <button @click="handleEditGroupFromInfo" class="px-4 py-2 text-sm bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 font-medium transition-all duration-200 shadow-sm hover:shadow-md">
          편집
        </button>
      </div>
    </div>
  </div>

  <!-- 멤버 관리 모달 -->
  <div v-if="showMemberModal && selectedGroup" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 w-full max-w-lg overflow-hidden">
      <div class="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 flex items-center justify-between">
        <h3 class="text-xl font-bold text-white">멤버 관리 - {{ selectedGroup.name }}</h3>
        <button @click="showMemberModal = false" class="text-white hover:text-gray-200 transition-colors">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      <div class="p-6">
        <p class="text-gray-700 dark:text-gray-200">여기에 멤버 관리 UI를 구현하세요.</p>
      </div>
    </div>
  </div>

  <!-- 그룹 편집 모달 (상세 스크린샷 스타일) -->
  <div v-if="showEditGroupModal && selectedGroup" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 w-full max-w-2xl min-w-[480px] overflow-hidden transition-all duration-200">
      <!-- 상단 헤더 -->
      <div class="flex items-center justify-between px-8 py-5 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
        <h2 class="text-2xl font-extrabold text-gray-900 dark:text-white">{{ selectedGroup.name }}</h2>
        <div class="flex items-center gap-2">
          <button class="px-4 py-2 border border-indigo-500 text-indigo-600 rounded-lg bg-white hover:bg-indigo-50 dark:border-indigo-400 dark:hover:bg-indigo-900 font-semibold transition-all" @click="showEditGroupModal = false">
            Back
          </button>
          <button class="px-4 py-2 border border-blue-500 text-blue-600 rounded-lg bg-white hover:bg-blue-50 dark:border-blue-400 dark:hover:bg-blue-900 font-semibold transition-all" disabled>
            Update
          </button>
          <button class="px-4 py-2 border border-red-200 text-red-600 rounded-lg bg-white hover:bg-red-50 dark:border-red-700 dark:hover:bg-red-900 font-semibold transition-all">
            삭제
          </button>
        </div>
      </div>
      <!-- 탭 -->
      <div class="flex border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-8">
        <button @click="editGroupTab = 'overview'" :class="['px-6 py-3 text-base font-semibold', editGroupTab === 'overview' ? 'border-b-2 border-indigo-600 text-indigo-600 dark:text-indigo-400' : 'text-gray-500 dark:text-gray-300']">Overview</button>
        <button @click="editGroupTab = 'users'" :class="['px-6 py-3 text-base font-semibold', editGroupTab === 'users' ? 'border-b-2 border-indigo-600 text-indigo-600 dark:text-indigo-400' : 'text-gray-500 dark:text-gray-300']">Users</button>
      </div>
      <!-- 탭 내용 -->
      <div class="px-8 py-6 bg-white dark:bg-gray-800 min-h-[320px]">
        <!-- Overview 탭 -->
        <div v-if="editGroupTab === 'overview'" class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-500 dark:text-gray-400">Name<span class="text-red-500">*</span></label>
            <input v-model="selectedGroup.name" class="mt-1 w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-500 dark:text-gray-400">Roles</label>
            <select v-model="selectedGroup.role" class="mt-1 w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white">
              <option value="">Group roles</option>
              <option v-for="role in allRoles" :key="role" :value="role">{{ role }}</option>
            </select>
          </div>
          <div class="flex gap-6">
            <div class="flex-1">
              <label class="block text-sm font-medium text-gray-500 dark:text-gray-400">Created at</label>
              <input :value="formatDate(selectedGroup.createdAt)" readonly class="mt-1 w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white bg-gray-100 dark:bg-gray-700" />
            </div>
            <div class="flex-1">
              <label class="block text-sm font-medium text-gray-500 dark:text-gray-400">Creator</label>
              <input :value="selectedGroup.creator || 'admin'" readonly class="mt-1 w-full px-3 py-2 border rounded-md dark:bg-gray-100 dark:bg-gray-700 dark:text-white" />
            </div>
          </div>
        </div>
        <!-- Users 탭 -->
        <div v-else class="space-y-4">
          <div class="flex justify-end mb-2">
            <button class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-semibold transition-all">Add users</button>
          </div>
          <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead class="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300">User ID</th>
                <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300">Name</th>
                <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300">Email</th>
                <th class="px-4 py-2 text-center text-xs font-medium text-gray-500 dark:text-gray-300">MFA</th>
                <th class="px-4 py-2 text-center text-xs font-medium text-gray-500 dark:text-gray-300">Approved</th>
                <th class="px-4 py-2 text-center text-xs font-medium text-gray-500 dark:text-gray-300">Action</th>
              </tr>
            </thead>
            <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              <tr v-for="user in selectedGroup.users || []" :key="user.id">
                <td class="px-4 py-2 text-blue-600 underline cursor-pointer">{{ user.loginId }}</td>
                <td class="px-4 py-2">{{ user.name }}</td>
                <td class="px-4 py-2">{{ user.email }}</td>
                <td class="px-4 py-2 text-center">
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" class="sr-only peer" :checked="user.mfa" disabled />
                    <div class="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700"></div>
                  </label>
                </td>
                <td class="px-4 py-2 text-center">
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" class="sr-only peer" :checked="user.approved" disabled />
                    <div class="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700"></div>
                  </label>
                </td>
                <td class="px-4 py-2 text-center">
                  <button class="text-red-600 hover:text-red-900 dark:text-red-400">삭제</button>
                </td>
              </tr>
            </tbody>
          </table>
          <!-- 페이지네이션 등 추가 가능 -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// Page title
useHead({
  title: '그룹 관리 - AXMP'
})

// Reactive data
const stats = ref({
  totalGroups: 24,
  activeGroups: 22,
  totalMembers: 156,
  assignedPermissions: 48
})

const groups = ref([
  {
    id: 1,
    name: 'Administrators',
    type: 'System',
    description: '시스템 전체 관리 권한을 가진 관리자 그룹',
    memberCount: 5,
    permissions: ['admin', 'read', 'write', 'delete'],
    status: 'active',
    createdAt: '2023-01-15'
  },
  {
    id: 2,
    name: 'Developers',
    type: 'Project',
    description: '개발 프로젝트 접근 권한을 가진 개발자 그룹',
    memberCount: 28,
    permissions: ['read', 'write', 'deploy'],
    status: 'active',
    createdAt: '2023-02-20'
  },
  {
    id: 3,
    name: 'DevOps Engineers',
    type: 'Operations',
    description: 'DevOps 도구 및 인프라 관리 권한',
    memberCount: 12,
    permissions: ['infrastructure', 'monitoring', 'deploy'],
    status: 'active',
    createdAt: '2023-03-10'
  },
  {
    id: 4,
    name: 'Security Team',
    type: 'Security',
    description: '보안 정책 및 취약점 관리 권한',
    memberCount: 8,
    permissions: ['security', 'audit', 'compliance'],
    status: 'active',
    createdAt: '2023-04-05'
  },
  {
    id: 5,
    name: 'QA Team',
    type: 'Quality',
    description: '품질 보증 및 테스트 권한',
    memberCount: 15,
    permissions: ['test', 'read'],
    status: 'active',
    createdAt: '2023-05-12'
  },
  {
    id: 6,
    name: 'Project Managers',
    type: 'Management',
    description: '프로젝트 관리 및 리포팅 권한',
    memberCount: 10,
    permissions: ['project-management', 'reporting'],
    status: 'active',
    createdAt: '2023-06-18'
  }
])

// Methods
const getStatusClass = (status: string) => {
  return status === 'active' 
    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
}

const showGroupInfoModal = ref(false)
const selectedGroup = ref<any>(null)
const showEditGroupModal = ref(false)
const showMemberModal = ref(false)

const tooltip = ref({ visible: false, permission: '', x: 0, y: 0 })

const handleShowGroupInfo = (group: any) => {
  selectedGroup.value = group
  showGroupInfoModal.value = true
}
const handleEditGroupFromInfo = () => {
  showGroupInfoModal.value = false
  showEditGroupModal.value = true
}
const handleShowMemberModal = (group: any) => {
  selectedGroup.value = group
  showMemberModal.value = true
}
const showPermissionTooltip = (permission: string, event: MouseEvent) => {
  tooltip.value = { visible: true, permission, x: event.clientX, y: event.clientY }
}
const hidePermissionTooltip = () => {
  tooltip.value.visible = false
  tooltip.value.permission = ''
}
const getPermissionDescription = (permission: string) => {
  const map: Record<string, string> = {
    admin: '시스템 전체 관리 권한',
    read: '읽기 권한',
    write: '쓰기 권한',
    delete: '삭제 권한',
    deploy: '배포 권한',
    infrastructure: '인프라 관리 권한',
    monitoring: '모니터링 권한',
    security: '보안 관리 권한',
    audit: '감사 권한',
    compliance: '컴플라이언스 권한',
    test: '테스트 권한',
    reporting: '리포트 권한',
    'project-management': '프로젝트 관리 권한'
  }
  return map[permission] || '권한 정보 없음'
}

const saveGroupEdit = () => {
  // 실제 저장 로직 필요시 구현
  showEditGroupModal.value = false
}

const editGroupTab = ref('overview')
const allRoles = ref(['admin', 'read', 'write', 'delete', 'deploy'])
const formatDate = (date: string) => {
  if (!date) return ''
  const d = new Date(date)
  return isNaN(d.getTime()) ? '' : d.toISOString().slice(0, 10)
}

if (!selectedGroup.value?.users) {
  selectedGroup.value = {
    ...selectedGroup.value,
    users: [
      { id: 1, loginId: 'cloudzcp-admin', name: 'admin', email: 'cloudzcp-admin@sk.com', mfa: false, approved: true },
      { id: 2, loginId: 'fpt-lunar', name: 'Nguyen', email: 'fpt-lunar@fpt.com', mfa: false, approved: false },
      { id: 3, loginId: 'fptlunar', name: 'Nguyen', email: 'nhan@fpt.com', mfa: false, approved: false },
      { id: 4, loginId: 'tinatrinh', name: 'Tina', email: 'trinh@fpt.com', mfa: false, approved: false }
    ]
  }
}

const selectedStatus = ref('')
const filteredGroups = computed(() =>
  selectedStatus.value
    ? groups.value.filter(g => g.status === selectedStatus.value)
    : groups.value
)
const handleEditGroup = (group: any) => {
  selectedGroup.value = { ...group, users: group.users || [] }
  showEditGroupModal.value = true
  editGroupTab.value = 'overview'
}
const handleDeleteGroup = (group: any) => {
  if (confirm(`${group.name} 그룹을 삭제하시겠습니까?`)) {
    groups.value = groups.value.filter(g => g.id !== group.id)
  }
}
</script> 