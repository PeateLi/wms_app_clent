import { defineStore } from 'pinia'
import { ref } from 'vue'

export type PlatformType = 'wms' | 'mes'

export interface PlatformConfig {
  id: PlatformType
  name: string
  icon: string
  color: string
  description: string
}

export const usePlatformStore = defineStore('platform', () => {
  const currentPlatform = ref<PlatformType>('wms')
  
  const platformConfigs: Record<PlatformType, PlatformConfig> = {
    wms: {
      id: 'wms',
      name: 'WMS',
      icon: 'list',
      color: '#1890ff',
      description: '仓库管理系统'
    },
    mes: {
      id: 'mes',
      name: 'MES',
      icon: 'gear',
      color: '#52c41a',
      description: '制造执行系统'
    }
  }

  const switchPlatform = (platform: PlatformType) => {
    currentPlatform.value = platform
  }

  const getCurrentPlatformConfig = () => {
    return platformConfigs[currentPlatform.value]
  }

  const getAllPlatforms = () => {
    return Object.values(platformConfigs)
  }

  return {
    currentPlatform,
    platformConfigs,
    switchPlatform,
    getCurrentPlatformConfig,
    getAllPlatforms
  }
}, {
  persist: {
    key: 'platform-store',
    storage: {
      getItem: (key: string) => uni.getStorageSync(key),
      setItem: (key: string, value: string) => uni.setStorageSync(key, value),
      removeItem: (key: string) => uni.removeItemSync(key)
    }
  }
})
