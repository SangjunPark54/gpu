import { ref, reactive, readonly } from 'vue'

interface ToastItem {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title?: string
  message: string
  duration?: number
  autoClose?: boolean
}

const toasts = ref<ToastItem[]>([])

export const useToast = () => {
  const addToast = (toast: Omit<ToastItem, 'id'>) => {
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 9)
    const newToast: ToastItem = {
      id,
      ...toast
    }
    toasts.value.push(newToast)
    return id
  }

  const removeToast = (id: string) => {
    const index = toasts.value.findIndex(toast => toast.id === id)
    if (index > -1) {
      toasts.value.splice(index, 1)
    }
  }

  const success = (message: string, title?: string, options?: Partial<ToastItem>) => {
    return addToast({
      type: 'success',
      title,
      message,
      duration: 5000,
      autoClose: true,
      ...options
    })
  }

  const error = (message: string, title?: string, options?: Partial<ToastItem>) => {
    return addToast({
      type: 'error',
      title,
      message,
      duration: 7000,
      autoClose: true,
      ...options
    })
  }

  const warning = (message: string, title?: string, options?: Partial<ToastItem>) => {
    return addToast({
      type: 'warning',
      title,
      message,
      duration: 6000,
      autoClose: true,
      ...options
    })
  }

  const info = (message: string, title?: string, options?: Partial<ToastItem>) => {
    return addToast({
      type: 'info',
      title,
      message,
      duration: 5000,
      autoClose: true,
      ...options
    })
  }

  const clear = () => {
    toasts.value = []
  }

  return {
    toasts: readonly(toasts),
    addToast,
    removeToast,
    success,
    error,
    warning,
    info,
    clear
  }
} 