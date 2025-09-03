<template>
  <view class="platform-switcher">
    <!-- 顶部导航栏 -->
    <view class="switcher-navbar">
      <view class="navbar-left" @click="goBack">
        <uni-icons type="left" size="24" color="#ffffff" />
        <text class="back-text">返回</text>
      </view>
      <text class="navbar-title">平台切换</text>
      <view class="navbar-right" @click="closeSwitcher">
        <uni-icons type="close" size="24" color="#ffffff" />
      </view>
    </view>
    
    <view class="switcher-header">
      <text class="title">MOM系统</text>
      <text class="subtitle">制造运营管理平台</text>
    </view>
    
    <view class="platform-cards">
      <view 
        v-for="platform in allPlatforms" 
        :key="platform.id"
        class="platform-card"
        :class="{ active: currentPlatform === platform.id }"
        @click="handleSwitchPlatform(platform.id)"
      >
        <view class="card-icon" :style="{ color: platform.color }">
          <uni-icons :type="platform.icon" size="24" color="#40a9ff" />
        </view>
        <view class="card-content">
          <text class="platform-name">{{ platform.name }}</text>
          <text class="platform-desc">{{ platform.description }}</text>
        </view>
        <view v-if="currentPlatform === platform.id" class="active-indicator">
          <uni-icons type="checkmarkempty" size="24" color="#ffffff" />
        </view>
      </view>
    </view>
    
    <view class="current-platform-info">
      <text class="info-label">当前平台：</text>
      <text class="info-value" :style="{ color: currentConfig.color }">
        {{ currentConfig.name }} - {{ currentConfig.description }}
      </text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { usePlatformStore, type PlatformType } from '@/store/platform'

const platformStore = usePlatformStore()

const currentPlatform = computed(() => platformStore.currentPlatform)
const allPlatforms = computed(() => platformStore.getAllPlatforms())
const currentConfig = computed(() => platformStore.getCurrentPlatformConfig())

const handleSwitchPlatform = (platform: PlatformType) => {
  platformStore.switchPlatform(platform)
  
  // 显示切换成功提示
  uni.showToast({
    title: `已切换到${platformStore.platformConfigs[platform].name}平台`,
    icon: 'success',
    duration: 1500
  })
  
  // 根据平台跳转到对应的首页
  setTimeout(() => {
    if (platform === 'wms') {
      uni.navigateTo({ url: '/pages/wms/index' })
    } else if (platform === 'mes') {
      uni.navigateTo({ url: '/pages/mes/index' })
    }
  }, 500)
}

const goBack = () => {
  uni.navigateBack()
}

const closeSwitcher = () => {
  uni.navigateBack()
}
</script>

<style lang="scss" scoped>
.platform-switcher {
  padding: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  
  .switcher-navbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20rpx 30rpx;
    background: rgba(255, 255, 255, 0.1);
    
    .navbar-left {
      display: flex;
      align-items: center;
      
      .back-text {
        font-size: 28rpx;
        color: #ffffff;
        margin-left: 10rpx;
      }
    }
    
    .navbar-title {
      font-size: 32rpx;
      font-weight: bold;
      color: #ffffff;
    }
    
    .navbar-right {
      width: 40rpx;
      height: 40rpx;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  
  .switcher-header {
    text-align: center;
    margin-bottom: 60rpx;
    padding: 40rpx 30rpx 0;
    
    .title {
      display: block;
      font-size: 48rpx;
      font-weight: bold;
      color: #ffffff;
      margin-bottom: 10rpx;
    }
    
    .subtitle {
      display: block;
      font-size: 28rpx;
      color: rgba(255, 255, 255, 0.8);
    }
  }
  
  .platform-cards {
    display: flex;
    flex-direction: column;
    gap: 30rpx;
    margin-bottom: 60rpx;
    padding: 0 30rpx;
    
    .platform-card {
      background: rgba(255, 255, 255, 0.95);
      border-radius: 20rpx;
      padding: 40rpx 30rpx;
      display: flex;
      align-items: center;
      position: relative;
      box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
      
      &.active {
        background: #ffffff;
        box-shadow: 0 12rpx 40rpx rgba(0, 0, 0, 0.15);
        transform: translateY(-4rpx);
      }
      
      .card-icon {
        width: 80rpx;
        height: 80rpx;
        border-radius: 50%;
        background: rgba(24, 144, 255, 0.1);
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 30rpx;
        
        .uni-icons {
          font-size: 40rpx;
        }
      }
      
      .card-content {
        flex: 1;
        
        .platform-name {
          display: block;
          font-size: 32rpx;
          font-weight: bold;
          color: #333333;
          margin-bottom: 8rpx;
        }
        
        .platform-desc {
          display: block;
          font-size: 26rpx;
          color: #666666;
        }
      }
      
      .active-indicator {
        width: 40rpx;
        height: 40rpx;
        border-radius: 50%;
        background: #52c41a;
        display: flex;
        align-items: center;
        justify-content: center;
        
        .uni-icons {
          color: #ffffff;
          font-size: 24rpx;
        }
      }
    }
  }
  
  .current-platform-info {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 16rpx;
    padding: 30rpx;
    text-align: center;
    margin: 0 30rpx;
    
    .info-label {
      font-size: 28rpx;
      color: rgba(255, 255, 255, 0.8);
      margin-right: 10rpx;
    }
    
    .info-value {
      font-size: 28rpx;
      font-weight: bold;
      color: #ffffff;
    }
  }
}
</style>
