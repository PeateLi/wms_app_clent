<script lang="ts" setup>
import { LOGIN_PAGE } from '@/router/config'

definePage({
  style: {
    navigationStyle: 'custom',
  },
})

// 注册表单数据
const registerForm = ref({
  username: '',
  password: '',
  confirmPassword: '',
  email: '',
  phone: '',
})

// 注册状态
const loading = ref(false)

// 注册处理
const handleRegister = async () => {
  // 表单验证
  if (!registerForm.value.username.trim()) {
    uni.showToast({
      title: '请输入用户名',
      icon: 'none',
    })
    return
  }
  
  if (!registerForm.value.password.trim()) {
    uni.showToast({
      title: '请输入密码',
      icon: 'none',
    })
    return
  }
  
  if (registerForm.value.password !== registerForm.value.confirmPassword) {
    uni.showToast({
      title: '两次密码输入不一致',
      icon: 'none',
    })
    return
  }
  
  if (registerForm.value.password.length < 6) {
    uni.showToast({
      title: '密码长度不能少于6位',
      icon: 'none',
    })
    return
  }

  loading.value = true
  
  try {
    // 这里应该调用注册API，暂时模拟注册成功
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    uni.showToast({
      title: '注册成功',
      icon: 'success',
    })
    
    // 注册成功后跳转到登录页
    setTimeout(() => {
      uni.navigateTo({
        url: LOGIN_PAGE,
      })
    }, 1500)
  } catch (error) {
    console.error('注册失败:', error)
    uni.showToast({
      title: '注册失败，请重试',
      icon: 'error',
    })
  } finally {
    loading.value = false
  }
}

// 返回登录页
const goToLogin = () => {
  uni.navigateTo({
    url: LOGIN_PAGE,
  })
}
</script>

<template>
  <view class="register">
    <view class="register-container">
      <!-- 返回按钮 -->
      <view class="back-section">
        <view class="back-btn" @click="goToLogin">
          <up-icon name="arrow-left" color="#2979ff" size="22"></up-icon>
          <text class="back-text">返回</text>
        </view>
      </view>

      <!-- Logo区域 -->
      <view class="logo-section">
        <text class="app-name">WMS管理系统</text>
        <text class="register-title">用户注册</text>
      </view>

      <!-- 注册表单 -->
      <view class="form-section">
        <view class="form-item">
          <view class="input-wrapper">
            <uni-icons type="person" size="20" color="#999" />
            <input 
              v-model="registerForm.username"
              class="input"
              placeholder="请输入用户名"
              placeholder-style="color: #999"
            />
          </view>
        </view>

        <view class="form-item">
          <view class="input-wrapper">
            <uni-icons type="locked" size="20" color="#999" />
            <input 
              v-model="registerForm.password"
              class="input"
              type="password"
              placeholder="请输入密码（至少6位）"
              placeholder-style="color: #999"
            />
          </view>
        </view>

        <view class="form-item">
          <view class="input-wrapper">
            <uni-icons type="locked" size="20" color="#999" />
            <input 
              v-model="registerForm.confirmPassword"
              class="input"
              type="password"
              placeholder="请确认密码"
              placeholder-style="color: #999"
            />
          </view>
        </view>

        <view class="form-item">
          <view class="input-wrapper">
            <uni-icons type="email" size="20" color="#999" />
            <input 
              v-model="registerForm.email"
              class="input"
              type="email"
              placeholder="请输入邮箱（可选）"
              placeholder-style="color: #999"
            />
          </view>
        </view>

        <view class="form-item">
          <view class="input-wrapper">
            <uni-icons type="phone" size="20" color="#999" />
            <input 
              v-model="registerForm.phone"
              class="input"
              type="number"
              placeholder="请输入手机号（可选）"
              placeholder-style="color: #999"
            />
          </view>
        </view>

        <!-- 注册按钮 -->
        <button 
          class="register-btn"
          :class="{ 'loading': loading }"
          :disabled="loading"
          @click="handleRegister"
        >
          <text v-if="!loading">注册</text>
          <text v-else>注册中...</text>
        </button>

        <!-- 登录链接 -->
        <view class="login-link">
          <text>已有账号？</text>
          <text class="link" @click="goToLogin">立即登录</text>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.register {
  height: 100vh;
  width: 100vw;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
}

.register-container {
  width: 100%;
  max-width: 600rpx;
  max-height: 90vh;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20rpx;
  padding: 20rpx 30rpx 40rpx 30rpx;
  box-shadow: 0 20rpx 40rpx rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10rpx);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.back-section {
  margin-bottom: 20rpx;
  flex-shrink: 0;
  
  .back-btn {
    display: flex;
    align-items: center;
    gap: 8rpx;
    padding: 15rpx 0rpx;
    cursor: pointer;
    border-radius: 12rpx;
    transition: all 0.3s ease;
    // background: rgba(0, 0, 0, 0.05);
    
    &:active {
      background: rgba(0, 0, 0, 0.1);
      transform: translateX(-2rpx);
    }
    
    .back-text {
      font-size: 28rpx;
      color: #333;
      font-weight: 500;
    }
  }
}

.logo-section {
  text-align: center;
  margin-bottom: 30rpx;
  flex-shrink: 0;
  
  .app-name {
    display: block;
    font-size: 30rpx;
    font-weight: bold;
    color: #333;
    margin-bottom: 8rpx;
  }
  
  .register-title {
    display: block;
    font-size: 24rpx;
    color: #666;
  }
}

.form-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow-y: auto;
  
  .form-item {
    margin-bottom: 20rpx;
    
    .input-wrapper {
      display: flex;
      align-items: center;
      background: #f8f9fa;
      border-radius: 12rpx;
      padding: 0 20rpx;
      height: 88rpx;
      border: 2rpx solid transparent;
      transition: all 0.3s ease;
      
      &:focus-within {
        border-color: #667eea;
        background: #fff;
        box-shadow: 0 0 0 4rpx rgba(102, 126, 234, 0.1);
      }
      
      .input {
        flex: 1;
        margin-left: 20rpx;
        font-size: 28rpx;
        color: #333;
        background: transparent;
        border: none;
        outline: none;
      }
    }
  }
  
  .register-btn {
    width: 100%;
    height: 80rpx;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: #fff;
    border: none;
    border-radius: 12rpx;
    font-size: 30rpx;
    font-weight: bold;
    margin-bottom: 20rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    
    &:not(.loading):active {
      transform: translateY(2rpx);
      box-shadow: 0 4rpx 12rpx rgba(102, 126, 234, 0.3);
    }
    
    &.loading {
      opacity: 0.7;
    }
  }
  
  .login-link {
    text-align: center;
    font-size: 26rpx;
    color: #666;
    margin-top: auto;
    
    .link {
      color: #667eea;
      font-weight: bold;
      margin-left: 10rpx;
    }
  }
}

// 响应式设计
@media (max-width: 750rpx) {
  .register {
    padding: 15rpx;
  }
  
  .register-container {
    padding: 15rpx 20rpx 30rpx 20rpx;
    max-height: 95vh;
  }
  
  .logo-section {
    margin-bottom: 20rpx;
    
    .app-name {
      font-size: 26rpx;
    }
    
    .register-title {
      font-size: 22rpx;
    }
  }
  
  .form-section {
    .form-item {
      margin-bottom: 15rpx;
    }
    
    .register-btn {
      height: 70rpx;
      font-size: 26rpx;
    }
  }
}
</style>
