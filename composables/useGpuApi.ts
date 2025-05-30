import { ref, readonly } from 'vue'

// Types
interface GpuVO {
  poolName: string
  project?: string
  gpuType: string
  status: string
  capacity: number
  used: number
  realm: string
}

interface GpuRequestVO {
  reqId: string
  project: string
  poolName: string
  requestedAt: string
  status: string
}

interface GpuStats {
  total: string
  available: string
  inUse: string
}

export const useGpuApi = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)

  const baseUrl = '/api/core/v1/realms'

  const handleApiCall = async <T>(apiCall: () => Promise<T>): Promise<T | null> => {
    loading.value = true
    error.value = null
    
    try {
      const result = await apiCall()
      return result
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred'
      console.error('API Error:', err)
      return null
    } finally {
      loading.value = false
    }
  }

  // [Realm] Get GpuStatus list
  const getAllGpuPoolList = async (realm: string): Promise<GpuVO[] | null> => {
    return handleApiCall(async () => {
      const response = await $fetch<GpuVO[]>(`${baseUrl}/${realm}/gpus/pool-list`)
      return response
    })
  }

  // [Project] Get Project GpuStatus list
  const getProjectGpuPoolList = async (realm: string, project: string): Promise<GpuVO[] | null> => {
    return handleApiCall(async () => {
      const response = await $fetch<GpuVO[]>(`${baseUrl}/${realm}/gpus/project/${project}/pool-list`)
      return response
    })
  }

  // [Realm] Get Gpu Count
  const getRealmGpuStatusCount = async (realm: string): Promise<GpuStats | null> => {
    return handleApiCall(async () => {
      const response = await $fetch<GpuStats>(`${baseUrl}/${realm}/gpus/count`)
      return response
    })
  }

  // [Project] Get Project Gpu Count
  const getProjectStatusCount = async (realm: string, project: string): Promise<GpuStats | null> => {
    return handleApiCall(async () => {
      const response = await $fetch<GpuStats>(`${baseUrl}/${realm}/gpus/project/${project}/count`)
      return response
    })
  }

  // [Realm] Gpu Pool Create
  const createGpuPool = async (realm: string, gpuVO: Partial<GpuVO>): Promise<any | null> => {
    return handleApiCall(async () => {
      const response = await $fetch(`${baseUrl}/${realm}/gpus/pools`, {
        method: 'POST',
        body: gpuVO
      })
      return response
    })
  }

  // [Realm] Gpu Pool update
  const updateGpuPool = async (realm: string, poolName: string, requestVO: any): Promise<any | null> => {
    return handleApiCall(async () => {
      const response = await $fetch(`${baseUrl}/${realm}/gpus/pools/${poolName}`, {
        method: 'PUT',
        body: requestVO
      })
      return response
    })
  }

  // [Realm] Gpu Pool delete
  const deleteGpuPool = async (realm: string, poolName: string): Promise<any | null> => {
    return handleApiCall(async () => {
      const response = await $fetch(`${baseUrl}/${realm}/gpus/pools/${poolName}`, {
        method: 'DELETE'
      })
      return response
    })
  }

  // [Project] Gpu Pool delete
  const deleteGpuPoolFromProject = async (realm: string, project: string, poolName: string): Promise<any | null> => {
    return handleApiCall(async () => {
      const response = await $fetch(`${baseUrl}/${realm}/gpus/project/${project}/pools/${poolName}`, {
        method: 'DELETE'
      })
      return response
    })
  }

  // [Project] Gpu Pool disable
  const disableGpuPoolFromProject = async (realm: string, project: string, poolName: string): Promise<any | null> => {
    return handleApiCall(async () => {
      const response = await $fetch(`${baseUrl}/${realm}/gpus/project/${project}/pools/${poolName}/disable`, {
        method: 'PUT'
      })
      return response
    })
  }

  // [Project] Gpu Request
  const gpuPoolRequest = async (realm: string, project: string, poolName: string, gpuVO: GpuVO): Promise<any | null> => {
    return handleApiCall(async () => {
      const response = await $fetch(`${baseUrl}/${realm}/gpus/project/${project}/pools/${poolName}/request`, {
        method: 'PUT',
        body: gpuVO
      })
      return response
    })
  }

  // [Realm] Gpu Request Lists
  const getGpuRequestList = async (realm: string): Promise<GpuRequestVO[] | null> => {
    return handleApiCall(async () => {
      const response = await $fetch<GpuRequestVO[]>(`${baseUrl}/${realm}/gpus/pool-requests`)
      return response
    })
  }

  // [Realm] Gpu Request Approve
  const approveGpuRequest = async (realm: string, reqId: string): Promise<GpuVO | null> => {
    return handleApiCall(async () => {
      const response = await $fetch<GpuVO>(`${baseUrl}/${realm}/gpus/pool-requests/${reqId}/approve`, {
        method: 'PUT'
      })
      return response
    })
  }

  return {
    loading: readonly(loading),
    error: readonly(error),
    
    // API methods
    getAllGpuPoolList,
    getProjectGpuPoolList,
    getRealmGpuStatusCount,
    getProjectStatusCount,
    createGpuPool,
    updateGpuPool,
    deleteGpuPool,
    deleteGpuPoolFromProject,
    disableGpuPoolFromProject,
    gpuPoolRequest,
    getGpuRequestList,
    approveGpuRequest
  }
} 