<template>
  <view class="container">
    <!-- 渐变背景层 -->
    <view class="gradient-bg"></view>
    
    <!-- 用户卡片 -->
    <view class="user-card">
      <!-- 头像带光环效果 -->
      <view class="avatar-wrapper">
        <image 
          class="avatar" 
          :src="userInfo.avatar" 
          mode="aspectFill"
          @click="handleAvatarClick"
        />
        <view class="halo"></view>
      </view>
      
      <!-- 用户信息 -->
      <view class="user-meta">
        <text class="username">{{ userInfo.name }}</text>
        <text class="user-bio">{{ userInfo.bio }}</text>
      </view>
      
      <!-- 数据统计 -->
      <view class="stats-grid">
        <view class="stat-item" v-for="item in stats" :key="item.label">
          <text class="stat-value">{{ item.value }}</text>
          <text class="stat-label">{{ item.label }}</text>
        </view>
      </view>
    </view>

    <!-- 详细信息列表 -->
    <view class="detail-list">
      <view 
        class="list-item"
        v-for="(item, index) in infoItems"
        :key="index"
        @touchstart="touchStart(index)"
        @touchend="touchEnd(index)"
        :class="{ 'item-active': activeIndex === index }"
      >
        <view class="item-icon-box" :style="{ backgroundColor: item.color }">
          <text class="item-icon">{{ item.icon }}</text>
        </view>
        <view class="item-content">
          <text class="item-title">{{ item.title }}</text>
          <text class="item-subtitle">{{ userInfo[item.key] }}</text>
        </view>
        <text class="item-arrow">→</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

// 响应式数据
const activeIndex = ref(-1)

const userInfo = reactive({
  avatar: '/static/avatar.jpg',
  name: '张三',
  bio: '操作工',
  email: 'test@ytot.com',
  location: '东莞长安',
  phone: '+86 1234567890'
})

const stats = ref([
  { label: '项目', value: '86' },
  { label: '待办事项', value: '2.4k' },
  { label: '内容', value: '548' }
])

const infoItems = ref([
  { 
    icon: '✉️', 
    title: '邮箱', 
    key: 'email', 
    color: '#FF6B6B' 
  },
  { 
    icon: '📱', 
    title: '联系方式', 
    key: 'phone', 
    color: '#4ECDC4' 
  },
  { 
    icon: '📍', 
    title: '地址', 
    key: 'location', 
    color: '#45B7D1' 
  }
])

// 方法
const touchStart = (index: number) => {
  activeIndex.value = index
}

const touchEnd = () => {
  activeIndex.value = -1
}

const handleAvatarClick = () => {
  uni.previewImage({
    urls: [userInfo.avatar]
  })
}
</script>

<style lang="scss">
page {
  background-color: #f8f9fa;
}

.container {
  position: relative;
}

.gradient-bg {
  height: 380rpx;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-bottom-left-radius: 40rpx;
  border-bottom-right-radius: 40rpx;
}

.user-card {
  position: relative;
  margin: -200rpx 30rpx 0;
  padding: 40rpx;
  background: #fff;
  border-radius: 24rpx;
  box-shadow: 0 20rpx 60rpx rgba(0,0,0,0.08);
}

.avatar-wrapper {
  position: relative;
  width: 160rpx;
  height: 160rpx;
  margin: -100rpx auto 20rpx;
  
  .avatar {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 4rpx solid #fff;
    box-shadow: 0 10rpx 30rpx rgba(0,0,0,0.1);
    position: relative;
    z-index: 2;
    transition: transform 0.3s ease;
    
    &:active {
      transform: scale(0.95);
    }
  }
  
  .halo {
    position: absolute;
    top: -10rpx;
    left: -10rpx;
    right: -10rpx;
    bottom: -10rpx;
    border-radius: 50%;
    background: linear-gradient(45deg, #667eea33, #764ba233);
    animation: haloPulse 2s infinite;
  }
}

.user-meta {
  text-align: center;
  margin-bottom: 40rpx;
  
  .username {
    display: block;
    font-size: 36rpx;
    font-weight: 600;
    color: #2d3436;
    margin-bottom: 12rpx;
  }
  
  .user-bio {
    font-size: 26rpx;
    color: #636e72;
    line-height: 1.4;
  }
}

.stats-grid {
  display: flex;
  justify-content: space-around;
  margin: 30rpx 0;
  padding: 30rpx 0;
  border-top: 1rpx solid #f1f2f6;
  border-bottom: 1rpx solid #f1f2f6;
  
  .stat-item {
    text-align: center;
    
    .stat-value {
      display: block;
      font-size: 34rpx;
      font-weight: 600;
      color: #2d3436;
    }
    
    .stat-label {
      display: block;
      font-size: 24rpx;
      color: #636e72;
      margin-top: 8rpx;
    }
  }
}

.detail-list {
  margin: 40rpx 30rpx;
  
  .list-item {
    display: flex;
    align-items: center;
    padding: 30rpx;
    background: #fff;
    border-radius: 16rpx;
    margin-bottom: 24rpx;
    transition: all 0.2s ease;
    box-shadow: 0 8rpx 24rpx rgba(0,0,0,0.04);
    
    &.item-active {
      transform: scale(0.98);
      box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.08);
    }
  }
  
  .item-icon-box {
    width: 80rpx;
    height: 80rpx;
    border-radius: 16rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 24rpx;
    
    .item-icon {
      font-size: 44rpx;
    }
  }
  
  .item-content {
    flex: 1;
    
    .item-title {
      display: block;
      font-size: 28rpx;
      color: #2d3436;
      font-weight: 500;
    }
    
    .item-subtitle {
      display: block;
      font-size: 24rpx;
      color: #636e72;
      margin-top: 8rpx;
    }
  }
  
  .item-arrow {
    font-size: 36rpx;
    color: #ced6e0;
    margin-left: 20rpx;
    transition: transform 0.2s ease;
  }
}

@keyframes haloPulse {
  0% { opacity: 0.8; transform: scale(1); }
  50% { opacity: 0.4; transform: scale(1.1); }
  100% { opacity: 0.8; transform: scale(1); }
}
</style>