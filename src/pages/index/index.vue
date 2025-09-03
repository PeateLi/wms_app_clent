<script lang="ts" setup>
import { LOGIN_PAGE } from '@/router/config'
import { useTokenStore } from '@/store/token'
import { useUserStore } from '@/store/user'

defineOptions({
  name: 'Home',
})
definePage({
  // 使用 type: "home" 属性设置首页，其他页面不需要设置，默认为page
  type: 'home',
  style: {
    // 'default' 表示使用默认导航栏，这样底部tabbar会显示
    navigationStyle: 'default',
    navigationBarTitleText: 'MOM制造运营管理系统',
  },
})



const tokenStore = useTokenStore()
const userStore = useUserStore()

onLoad(() => {
  console.log('测试 uni API 自动引入: onLoad')
  console.log('登录状态:', tokenStore.hasLogin)
  console.log('用户信息:', userStore.userInfo)
})

function toLogin() {
  uni.navigateTo({
    url: LOGIN_PAGE,
  })
}

function logout() {
  uni.showModal({
    title: '确认退出',
    content: '确定要退出登录吗？',
    success: async (res) => {
      if (res.confirm) {
        try {
          await tokenStore.logout()
          uni.showToast({
            title: '退出成功',
            icon: 'success',
          })
        } catch (error) {
          console.error('退出登录失败:', error)
        }
      }
    },
  })
}

function navigateToPlatform(platform: string) {
  if (platform === 'wms') {
    uni.navigateTo({ url: '/pages/wms/index' })
  } else if (platform === 'mes') {
    uni.navigateTo({ url: '/pages/mes/index' })
  }
}

function showPlatformSwitcher() {
  uni.navigateTo({ url: '/pages/platform-switcher' })
}
</script>

<template>
  <view class="bg-white px-4 pt-2">

    <!-- 用户信息区域 -->
    <view class="user-section">
      <view v-if="tokenStore.hasLogin" class="user-info">
        <image 
          class="avatar" 
          :src="userStore.userInfo.avatar" 
          mode="aspectFill"
        />
        <view class="user-details">
          <text class="username">{{ userStore.userInfo.nickname || userStore.userInfo.username }}</text>
          <text class="user-id">ID: {{ userStore.userInfo.userId }}</text>
        </view>
        <button class="logout-btn" @click="logout">退出</button>
      </view>
      <view v-else class="login-prompt">
        <text class="prompt-text">请先登录以使用完整功能</text>
        <button class="login-btn" @click="toLogin">立即登录</button>
      </view>
    </view>

    <!-- 平台切换区域 -->
    <view class="platform-section">
      <text class="section-title">选择平台</text>
      <view class="platform-grid">
        <view class="platform-item" @click="navigateToPlatform('wms')">
          <view class="platform-icon wms-icon">
            <uni-icons type="list" size="24" color="#ffffff" />
          </view>
          <text class="platform-name">WMS</text>
          <text class="platform-desc">仓库管理系统</text>
        </view>
        <view class="platform-item" @click="navigateToPlatform('mes')">
          <view class="platform-icon mes-icon">
            <uni-icons type="gear" size="24" color="#ffffff" />
          </view>
          <text class="platform-name">MES</text>
          <text class="platform-desc">制造执行系统</text>
        </view>
      </view>
    </view>


  </view>
</template>

<style lang="scss" scoped>


.user-section {
  margin-bottom: 60rpx;
  
  .user-info {
    display: flex;
    align-items: center;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 20rpx;
    padding: 30rpx;
    color: #fff;
    
    .avatar {
      width: 100rpx;
      height: 100rpx;
      border-radius: 50%;
      margin-right: 30rpx;
      border: 4rpx solid rgba(255, 255, 255, 0.3);
    }
    
    .user-details {
      flex: 1;
      
      .username {
        display: block;
        font-size: 32rpx;
        font-weight: bold;
        margin-bottom: 10rpx;
      }
      
      .user-id {
        font-size: 24rpx;
        opacity: 0.8;
      }
    }
    
    .logout-btn {
      background: rgba(255, 255, 255, 0.2);
      color: #fff;
      border: 2rpx solid rgba(255, 255, 255, 0.3);
      border-radius: 12rpx;
      padding: 16rpx 24rpx;
      font-size: 24rpx;
    }
  }
  
  .login-prompt {
    text-align: center;
    background: #f8f9fa;
    border-radius: 20rpx;
    padding: 60rpx 40rpx;
    
    .prompt-text {
      display: block;
      font-size: 28rpx;
      color: #666;
      margin-bottom: 30rpx;
    }
    
    .login-btn {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: #fff;
      border: none;
      border-radius: 12rpx;
      padding: 20rpx 40rpx;
      font-size: 28rpx;
    }
  }
}

.platform-section {
  margin-bottom: 60rpx;
  
  .section-title {
    display: block;
    font-size: 32rpx;
    font-weight: bold;
    color: #333;
    margin-bottom: 30rpx;
  }
  
  .platform-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 30rpx;
    
    .platform-item {
      background: #fff;
      border-radius: 20rpx;
      padding: 40rpx 20rpx;
      text-align: center;
      box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
      
      &:active {
        transform: translateY(4rpx);
        box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.15);
      }
      
      .platform-icon {
        width: 80rpx;
        height: 80rpx;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 20rpx;
        
        .uni-icons {
          font-size: 40rpx;
        }
        
        &.wms-icon {
          background: linear-gradient(135deg, #1890ff 0%, #40a9ff 100%);
        }
        
        &.mes-icon {
          background: linear-gradient(135deg, #52c41a 0%, #73d13d 100%);
        }
      }
      
      .platform-name {
        display: block;
        font-size: 32rpx;
        font-weight: bold;
        color: #333;
        margin-bottom: 8rpx;
      }
      
      .platform-desc {
        display: block;
        font-size: 24rpx;
        color: #666;
      }
    }
  }
}


</style>
