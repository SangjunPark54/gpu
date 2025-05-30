<template>
  <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
    <div class="flex items-center justify-between mb-8">
      <div>
        <h3 class="text-xl font-bold text-gray-900 dark:text-white">사용자 통계</h3>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">시스템 사용자 현황 및 보안 상태</p>
      </div>
      <div class="flex items-center space-x-3 text-sm text-gray-500 bg-gray-50 dark:bg-gray-700 rounded-lg px-4 py-2">
        <button class="p-1.5 hover:bg-white dark:hover:bg-gray-600 rounded-md transition-colors">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>
        <span class="font-medium">2025.04.30 - 2025.05.30</span>
        <button class="p-1.5 hover:bg-white dark:hover:bg-gray-600 rounded-md transition-colors">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </div>

    <!-- 통계 카드들 -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div class="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg p-4 border border-blue-200 dark:border-blue-700">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
            </svg>
          </div>
          <div>
            <p class="text-2xl font-bold text-blue-700 dark:text-blue-300">{{ currentStats.totalUsers }}</p>
            <p class="text-xs text-blue-600 dark:text-blue-400 font-medium">전체 사용자</p>
          </div>
        </div>
      </div>

      <div class="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-lg p-4 border border-red-200 dark:border-red-700">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
            </svg>
          </div>
          <div>
            <p class="text-2xl font-bold text-red-700 dark:text-red-300">{{ currentStats.overduePasswords }}</p>
            <p class="text-xs text-red-600 dark:text-red-400 font-medium">비밀번호 만료</p>
          </div>
        </div>
      </div>

      <div class="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg p-4 border border-purple-200 dark:border-purple-700">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728"></path>
            </svg>
          </div>
          <div>
            <p class="text-2xl font-bold text-purple-700 dark:text-purple-300">{{ currentStats.lockedAccounts }}</p>
            <p class="text-xs text-purple-600 dark:text-purple-400 font-medium">잠긴 계정</p>
          </div>
        </div>
      </div>

      <div class="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 rounded-lg p-4 border border-amber-200 dark:border-amber-700">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"></path>
            </svg>
          </div>
          <div>
            <p class="text-2xl font-bold text-amber-700 dark:text-amber-300">{{ currentStats.overdueApiKeys }}</p>
            <p class="text-xs text-amber-600 dark:text-amber-400 font-medium">API 키 만료</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 범례 -->
    <div class="flex flex-wrap items-center justify-center gap-6 mb-8 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
      <div class="flex items-center space-x-2">
        <div class="w-4 h-4 rounded-full bg-gradient-to-r from-blue-400 to-blue-600"></div>
        <span class="text-sm font-medium text-gray-700 dark:text-gray-300">전체 사용자</span>
      </div>
      <div class="flex items-center space-x-2">
        <div class="w-4 h-4 rounded-full bg-gradient-to-r from-red-400 to-red-600"></div>
        <span class="text-sm font-medium text-gray-700 dark:text-gray-300">비밀번호 만료</span>
      </div>
      <div class="flex items-center space-x-2">
        <div class="w-4 h-4 rounded-full bg-gradient-to-r from-purple-400 to-purple-600"></div>
        <span class="text-sm font-medium text-gray-700 dark:text-gray-300">잠긴 계정</span>
      </div>
      <div class="flex items-center space-x-2">
        <div class="w-4 h-4 rounded-full bg-gradient-to-r from-amber-400 to-amber-600"></div>
        <span class="text-sm font-medium text-gray-700 dark:text-gray-300">API 키 만료</span>
      </div>
    </div>

    <!-- 차트 컨테이너 -->
    <div class="relative h-96 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 rounded-xl p-4 border border-gray-200 dark:border-gray-600">
      <canvas ref="chartCanvas" class="w-full h-full"></canvas>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

const chartCanvas = ref<HTMLCanvasElement>()
let chart: any = null

// 샘플 데이터 (실제로는 props나 API에서 받아올 데이터)
const chartData = {
  labels: [
    '04-30', '05-01', '05-02', '05-03', '05-04', 
    '05-05', '05-06', '05-07', '05-08', '05-09',
    '05-10', '05-11', '05-12', '05-13', '05-14',
    '05-15', '05-16', '05-17', '05-18', '05-19',
    '05-20', '05-21', '05-22', '05-23', '05-24',
    '05-25', '05-26', '05-27', '05-28', '05-29',
    '05-30'
  ],
  datasets: [
    {
      label: '전체 사용자',
      data: [
        23, 23, 23, 23, 23, 23, 23, 2, 1, 4, 4, 4, 7, 7, 7, 7, 7, 8, 8, 8, 8, 8, 9, 9, 9, 9, 9, 9, 9, 9, 0
      ],
      borderColor: '#3B82F6',
      backgroundColor: (context: any) => {
        const chart = context.chart
        const {ctx, chartArea} = chart
        if (!chartArea) return null
        
        const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom)
        gradient.addColorStop(0, 'rgba(59, 130, 246, 0.3)')
        gradient.addColorStop(1, 'rgba(59, 130, 246, 0.05)')
        return gradient
      },
      borderWidth: 3,
      fill: true,
      tension: 0.4,
      pointBackgroundColor: '#3B82F6',
      pointBorderColor: '#ffffff',
      pointBorderWidth: 2,
      pointRadius: 0,
      pointHoverRadius: 6,
      pointHoverBackgroundColor: '#3B82F6',
      pointHoverBorderColor: '#ffffff',
      pointHoverBorderWidth: 3
    },
    {
      label: '비밀번호 만료',
      data: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 7, 7, 7, 0
      ],
      borderColor: '#EF4444',
      backgroundColor: (context: any) => {
        const chart = context.chart
        const {ctx, chartArea} = chart
        if (!chartArea) return null
        
        const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom)
        gradient.addColorStop(0, 'rgba(239, 68, 68, 0.3)')
        gradient.addColorStop(1, 'rgba(239, 68, 68, 0.05)')
        return gradient
      },
      borderWidth: 3,
      fill: true,
      tension: 0.4,
      pointBackgroundColor: '#EF4444',
      pointBorderColor: '#ffffff',
      pointBorderWidth: 2,
      pointRadius: 0,
      pointHoverRadius: 6,
      pointHoverBackgroundColor: '#EF4444',
      pointHoverBorderColor: '#ffffff',
      pointHoverBorderWidth: 3
    },
    {
      label: '잠긴 계정',
      data: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
      ],
      borderColor: '#8B5CF6',
      backgroundColor: (context: any) => {
        const chart = context.chart
        const {ctx, chartArea} = chart
        if (!chartArea) return null
        
        const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom)
        gradient.addColorStop(0, 'rgba(139, 92, 246, 0.3)')
        gradient.addColorStop(1, 'rgba(139, 92, 246, 0.05)')
        return gradient
      },
      borderWidth: 3,
      fill: true,
      tension: 0.4,
      pointBackgroundColor: '#8B5CF6',
      pointBorderColor: '#ffffff',
      pointBorderWidth: 2,
      pointRadius: 0,
      pointHoverRadius: 6,
      pointHoverBackgroundColor: '#8B5CF6',
      pointHoverBorderColor: '#ffffff',
      pointHoverBorderWidth: 3
    },
    {
      label: 'API 키 만료',
      data: [
        3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0
      ],
      borderColor: '#F59E0B',
      backgroundColor: (context: any) => {
        const chart = context.chart
        const {ctx, chartArea} = chart
        if (!chartArea) return null
        
        const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom)
        gradient.addColorStop(0, 'rgba(245, 158, 11, 0.3)')
        gradient.addColorStop(1, 'rgba(245, 158, 11, 0.05)')
        return gradient
      },
      borderWidth: 3,
      fill: true,
      tension: 0.4,
      pointBackgroundColor: '#F59E0B',
      pointBorderColor: '#ffffff',
      pointBorderWidth: 2,
      pointRadius: 0,
      pointHoverRadius: 6,
      pointHoverBackgroundColor: '#F59E0B',
      pointHoverBorderColor: '#ffffff',
      pointHoverBorderWidth: 3
    }
  ]
}

// 현재 통계 계산
const currentStats = computed(() => {
  const latestData = chartData.datasets.map(dataset => 
    dataset.data[dataset.data.length - 2] || 0 // 마지막에서 두 번째 값 (마지막은 0이므로)
  )
  
  return {
    totalUsers: latestData[0],
    overduePasswords: latestData[1],
    lockedAccounts: latestData[2],
    overdueApiKeys: latestData[3]
  }
})

onMounted(async () => {
  if (process.client && chartCanvas.value) {
    // Chart.js를 동적으로 import
    const { Chart, registerables } = await import('chart.js')
    Chart.register(...registerables)

    const ctx = chartCanvas.value.getContext('2d')
    if (ctx) {
      chart = new Chart(ctx, {
        type: 'line',
        data: chartData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          interaction: {
            mode: 'index',
            intersect: false,
          },
          plugins: {
            legend: {
              display: false // 커스텀 legend 사용
            },
            tooltip: {
              backgroundColor: 'rgba(0, 0, 0, 0.9)',
              titleColor: '#ffffff',
              bodyColor: '#ffffff',
              borderColor: 'rgba(255, 255, 255, 0.2)',
              borderWidth: 1,
              cornerRadius: 12,
              displayColors: true,
              padding: 12,
              titleFont: {
                size: 14,
                weight: 'bold'
              },
              bodyFont: {
                size: 13
              },
              callbacks: {
                title: function(context: any) {
                  return `2025-${context[0].label}`
                },
                label: function(context: any) {
                  return `${context.dataset.label}: ${context.parsed.y}명`
                }
              }
            }
          },
          scales: {
            x: {
              display: true,
              grid: {
                color: 'rgba(0, 0, 0, 0.05)',
                lineWidth: 1
              },
              ticks: {
                maxTicksLimit: 8,
                color: '#6B7280',
                font: {
                  size: 12,
                  weight: 'normal'
                },
                padding: 8
              },
              border: {
                display: false
              }
            },
            y: {
              display: true,
              beginAtZero: true,
              max: 25,
              grid: {
                color: 'rgba(0, 0, 0, 0.05)',
                lineWidth: 1
              },
              ticks: {
                stepSize: 5,
                color: '#6B7280',
                font: {
                  size: 12,
                  weight: 'normal'
                },
                padding: 12,
                callback: function(value: any) {
                  return value + '명'
                }
              },
              border: {
                display: false
              }
            }
          },
          elements: {
            point: {
              radius: 0,
              hoverRadius: 6,
              hitRadius: 10
            },
            line: {
              borderJoinStyle: 'round',
              borderCapStyle: 'round'
            }
          },
          animation: {
            duration: 2000,
            easing: 'easeInOutQuart'
          },
          hover: {
            mode: 'nearest',
            intersect: false
          }
        }
      })
    }
  }
})

onUnmounted(() => {
  if (chart) {
    chart.destroy()
  }
})
</script> 