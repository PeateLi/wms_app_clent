<script lang="ts" setup>
import { useTokenStore } from '@/store/token'
import { getCode } from '@/api/login'
import type { ILoginForm } from '@/api/login'
import type { ICaptcha } from '@/api/types/login'

definePage({
  style: {
    navigationStyle: 'custom',
  },
})

const redirectUrl = ref('')
const tokenStore = useTokenStore()

// 登录表单数据
const loginForm = ref<ILoginForm>({
  username: '',
  password: '',
  code: '',
  uuid: '',
})

// 验证码数据
const captcha = ref<ICaptcha>({
  captchaEnabled: false,
  uuid: '',
  image: '',
})

// 登录状态
const loading = ref(false)

// 页面加载时获取验证码
onLoad((options) => {
  if (options?.redirect) {
    redirectUrl.value = decodeURIComponent(options.redirect)
  }
  getCaptcha()
})

// 获取验证码
const getCaptcha = async () => {
  try {
    const res = await getCode()
    captcha.value = res.data
  } catch (error) {
    console.error('获取验证码失败:', error)
  }
}

// 登录处理
const handleLogin = async () => {
  // 表单验证
  if (!loginForm.value.username.trim()) {
    uni.showToast({
      title: '请输入用户名',
      icon: 'none',
    })
    return
  }
  
  if (!loginForm.value.password.trim()) {
    uni.showToast({
      title: '请输入密码',
      icon: 'none',
    })
    return
  }
  
  if (captcha.value.captchaEnabled && !loginForm.value.code.trim()) {
    uni.showToast({
      title: '请输入验证码',
      icon: 'none',
    })
    return
  }

  loading.value = true
  
  try {
    // await tokenStore.login(loginForm.value)
    
    // 登录成功后的跳转逻辑
    if (redirectUrl.value) {
      // 如果有重定向URL，跳转到指定页面
      uni.redirectTo({
        url: redirectUrl.value,
      })
    } else {
      // 否则跳转到首页
      uni.switchTab({
        url: '/pages/index/index',
      })
    }
  } catch (error) {
    console.error('登录失败:', error)
    // 登录失败后刷新验证码
    if (captcha.value.captchaEnabled) {
      getCaptcha()
      loginForm.value.code = ''
    }
  } finally {
    loading.value = false
  }
}

// 微信登录
const handleWxLogin = async () => {
  loading.value = true
  
  try {
    await tokenStore.wxLogin()
    
    // 登录成功后的跳转逻辑
    if (redirectUrl.value) {
      uni.redirectTo({
        url: redirectUrl.value,
      })
    } else {
      uni.switchTab({
        url: '/pages/index/index',
      })
    }
  } catch (error) {
    console.error('微信登录失败:', error)
  } finally {
    loading.value = false
  }
}

// 跳转到注册页面
const goToRegister = () => {
  uni.navigateTo({
    url: '/pages/login/register',
  })
}
</script>

<template>
  <view class="login">
    <view class="login-container">
      <!-- Logo区域 -->
      <view class="logo-section">
        <text class="app-name">WMS管理系统</text>
      </view>

      <!-- 登录表单 -->
      <view class="form-section">
        <view class="form-item">
          <view class="input-wrapper">
            <uni-icons type="person" size="20" color="#999" />
            <input 
              v-model="loginForm.username"
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
              v-model="loginForm.password"
              class="input"
              type="password"
              placeholder="请输入密码"
              placeholder-style="color: #999"
            />
          </view>
        </view>

        <!-- 验证码 -->
        <view v-if="captcha.captchaEnabled" class="form-item captcha-item">
          <view class="input-wrapper">
            <uni-icons type="checkmarkempty" size="20" color="#999" />
            <input 
              v-model="loginForm.code"
              class="input captcha-input"
              placeholder="请输入验证码"
              placeholder-style="color: #999"
            />
          </view>
          <view class="captcha-image" @click="getCaptcha">
            <image 
              v-if="captcha.image" 
              :src="captcha.image" 
              mode="aspectFit"
            />
            <text v-else class="captcha-placeholder">点击获取验证码</text>
          </view>
        </view>

        <!-- 登录按钮 -->
        <button 
          class="login-btn"
          :class="{ 'loading': loading }"
          :disabled="loading"
          @click="handleLogin"
        >
          <text v-if="!loading">登录</text>
          <text v-else>登录中...</text>
        </button>

        <!-- 注册链接 -->
        <view class="register-link">
          <text>还没有账号？</text>
          <text class="link" @click="goToRegister">立即注册</text>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.login {
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

.login-container {
  width: 100%;
  max-width: 600rpx;
  max-height: 90vh;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20rpx;
  padding: 40rpx 30rpx;
  box-shadow: 0 20rpx 40rpx rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10rpx);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.logo-section {
  text-align: center;
  margin-bottom: 30rpx;
  flex-shrink: 0;
  
  .app-name {
    display: block;
    font-size: 32rpx;
    font-weight: bold;
    color: #333;
  }
}

.form-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  .form-item {
    margin-bottom: 25rpx;
    
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
    
    &.captcha-item {
      display: flex;
      gap: 20rpx;
      
      .captcha-input {
        flex: 1;
      }
      
      .captcha-image {
        width: 200rpx;
        height: 88rpx;
        background: #f8f9fa;
        border-radius: 12rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2rpx solid #e9ecef;
        cursor: pointer;
        
        image {
          width: 100%;
          height: 100%;
          border-radius: 10rpx;
        }
        
        .captcha-placeholder {
          font-size: 24rpx;
          color: #999;
          text-align: center;
        }
      }
    }
  }
  
  .login-btn {
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
  
  .wx-login-btn {
    width: 100%;
    height: 80rpx;
    background: #07c160;
    color: #fff;
    border: none;
    border-radius: 12rpx;
    font-size: 26rpx;
    margin-bottom: 20rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10rpx;
    transition: all 0.3s ease;
    
    &:active {
      transform: translateY(2rpx);
      box-shadow: 0 4rpx 12rpx rgba(7, 193, 96, 0.3);
    }
  }
  
  .register-link {
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
  .login {
    padding: 15rpx;
  }
  
  .login-container {
    padding: 30rpx 20rpx;
    max-height: 95vh;
  }
  
  .logo-section {
    margin-bottom: 20rpx;
    
    .app-name {
      font-size: 28rpx;
    }
  }
  
  .form-section {
    .form-item {
      margin-bottom: 20rpx;
    }
    
    .login-btn, .wx-login-btn {
      height: 70rpx;
      font-size: 26rpx;
    }
  }
}
</style>
