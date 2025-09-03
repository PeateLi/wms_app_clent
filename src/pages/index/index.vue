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
    // 'custom' 表示开启自定义导航栏，默认 'default'
    navigationStyle: 'custom',
    navigationBarTitleText: '首页',
  },
})

// 获取屏幕边界到安全区域距离
let safeAreaInsets
let systemInfo

// #ifdef MP-WEIXIN
systemInfo = uni.getWindowInfo()
safeAreaInsets = systemInfo.safeArea
  ? {
      top: systemInfo.safeArea.top,
      right: systemInfo.windowWidth - systemInfo.safeArea.right,
      bottom: systemInfo.windowHeight - systemInfo.safeArea.bottom,
      left: systemInfo.safeArea.left,
    }
  : null
// #endif

// #ifndef MP-WEIXIN
systemInfo = uni.getSystemInfoSync()
safeAreaInsets = systemInfo.safeAreaInsets
// #endif

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
</script>

<template>
  <view class="bg-white px-4 pt-2" :style="{ marginTop: `${safeAreaInsets?.top}px` }">
    <!-- 自定义导航栏 -->
    <view class="custom-navbar">
      <text class="navbar-title">WMS管理系统</text>
    </view>

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

    <!-- 功能区域 -->
    <view class="function-section">
      <text class="section-title">系统功能</text>
      <view class="function-grid">
        <view class="function-item">
          <uni-icons type="list" size="40" color="#667eea" />
          <text class="function-name">库存管理</text>
        </view>
        <view class="function-item">
          <uni-icons type="shop" size="40" color="#667eea" />
          <text class="function-name">订单管理</text>
        </view>
        <view class="function-item">
          <uni-icons type="gear" size="40" color="#667eea" />
          <text class="function-name">系统设置</text>
        </view>
        <view class="function-item">
          <uni-icons type="chat" size="40" color="#667eea" />
          <text class="function-name">消息中心</text>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.custom-navbar {
  height: 88rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 40rpx;
  
  .navbar-title {
    font-size: 36rpx;
    font-weight: bold;
    color: #333;
  }
}

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

.function-section {
  .section-title {
    display: block;
    font-size: 32rpx;
    font-weight: bold;
    color: #333;
    margin-bottom: 30rpx;
  }
  
  .function-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 30rpx;
    
    .function-item {
      background: #fff;
      border-radius: 16rpx;
      padding: 40rpx 20rpx;
      text-align: center;
      box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
      
      &:active {
        transform: translateY(2rpx);
        box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.15);
      }
      
      .function-name {
        display: block;
        font-size: 26rpx;
        color: #333;
        margin-top: 20rpx;
      }
    }
  }
}
</style>
