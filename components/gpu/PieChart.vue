<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
    <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">{{ title }}</h3>
    <div class="relative h-64">
      <canvas :id="chartId" class="w-full h-full"></canvas>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, onUnmounted } from 'vue'
import { Chart, registerables } from 'chart.js'

// Props
interface Props {
  title: string
  data: Array<{ label: string; value: number; color: string }>
  chartId: string
}

const props = defineProps<Props>()

// Chart instance
let chartInstance: Chart | null = null

// Dark mode state
const isDark = ref(false)

// Methods
const checkDarkMode = () => {
  isDark.value = document.documentElement.classList.contains('dark')
}

const createChart = () => {
  const canvas = document.getElementById(props.chartId) as HTMLCanvasElement
  if (!canvas) return

  // Destroy existing chart
  if (chartInstance) {
    chartInstance.destroy()
  }

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  Chart.register(...registerables)

  const labels = props.data.map(item => item.label)
  const values = props.data.map(item => item.value)
  const colors = props.data.map(item => item.color)

  // Determine text color based on dark mode
  const textColor = isDark.value ? '#e5e7eb' : '#374151'

  chartInstance = new Chart(ctx, {
    type: 'pie',
    data: {
      labels,
      datasets: [{
        data: values,
        backgroundColor: colors,
        borderColor: colors.map(color => color),
        borderWidth: 2,
        hoverOffset: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            padding: 20,
            usePointStyle: true,
            color: textColor,
            font: {
              size: 12
            },
            generateLabels: function(chart) {
              const data = chart.data
              if (data.labels && data.datasets.length) {
                const dataset = data.datasets[0]
                const dataArray = dataset.data as number[]
                const total = dataArray.reduce((a: number, b: number) => a + b, 0)
                
                return data.labels.map((label, i) => {
                  const value = dataArray[i]
                  const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : '0.0'
                  
                  return {
                    text: `${label}: ${value} (${percentage}%)`,
                    fillStyle: Array.isArray(dataset.backgroundColor) ? dataset.backgroundColor[i] as string : dataset.backgroundColor as string,
                    strokeStyle: Array.isArray(dataset.borderColor) ? dataset.borderColor[i] as string : dataset.borderColor as string,
                    lineWidth: dataset.borderWidth as number,
                    hidden: false,
                    index: i
                  }
                })
              }
              return []
            }
          }
        },
        tooltip: {
          backgroundColor: isDark.value ? '#374151' : '#ffffff',
          titleColor: textColor,
          bodyColor: textColor,
          borderColor: isDark.value ? '#6b7280' : '#e5e7eb',
          borderWidth: 1,
          callbacks: {
            label: function(context) {
              const label = context.label || ''
              const value = context.parsed || 0
              const dataArray = context.dataset.data as number[]
              const total = dataArray.reduce((a: number, b: number) => a + b, 0)
              const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : '0.0'
              return `${label}: ${value} (${percentage}%)`
            }
          }
        }
      }
    }
  })
}

// Lifecycle
onMounted(() => {
  checkDarkMode()
  createChart()
  
  // Watch for dark mode changes
  const observer = new MutationObserver(() => {
    checkDarkMode()
    createChart()
  })
  
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class']
  })
})

onUnmounted(() => {
  if (chartInstance) {
    chartInstance.destroy()
  }
})

// Watch for data changes
watch(() => props.data, () => {
  createChart()
}, { deep: true })
</script> 