<template>
  <view class="wms-container">
    <!-- 顶部导航栏 -->
    <view class="wms-header">
      <view class="header-content">
        <view class="platform-info">
          <uni-icons type="list" size="24" color="#ffffff" />
          <view class="platform-text">
            <text class="platform-name">WMS</text>
            <text class="platform-desc">仓库管理系统</text>
          </view>
        </view>
        <view class="switch-btn" @click="showPlatformSwitcher">
          <uni-icons type="loop" size="24" color="#ffffff" />
        </view>
      </view>
    </view>

    <!-- 功能模块网格 -->
    <view class="modules-grid">
      <view 
        v-for="module in wmsModules" 
        :key="module.id"
        class="module-card"
        @click="navigateToModule(module.path)"
      >
        <view class="module-icon" :style="{ backgroundColor: module.color }">
          <uni-icons :type="module.icon" size="24" color="#ffffff" />
        </view>
        <text class="module-name">{{ module.name }}</text>
        <text class="module-desc">{{ module.description }}</text>
      </view>
    </view>

    <!-- 快捷操作 -->
    <view class="quick-actions">
      <text class="section-title">快捷操作</text>
      <view class="actions-list">
        <view class="action-item" @click="quickAction('inbound')">
          <uni-icons type="plus" size="24" color="#1890ff" />
          <text>快速入库</text>
        </view>
        <view class="action-item" @click="quickAction('outbound')">
          <uni-icons type="minus" size="24" color="#1890ff" />
          <text>快速出库</text>
        </view>
        <view class="action-item" @click="quickAction('inventory')">
          <uni-icons type="list" size="24" color="#1890ff" />
          <text>库存查询</text>
        </view>
        <view class="action-item" @click="quickAction('scan')">
          <uni-icons type="scan" size="24" color="#1890ff" />
          <text>扫码操作</text>
        </view>
      </view>
    </view>

    <!-- 数据概览 -->
    <view class="data-overview">
      <text class="section-title">数据概览</text>
      <view class="overview-cards">
        <view class="overview-card">
          <text class="card-value">{{ overviewData.totalItems }}</text>
          <text class="card-label">总库存</text>
        </view>
        <view class="overview-card">
          <text class="card-value">{{ overviewData.inboundToday }}</text>
          <text class="card-label">今日入库</text>
        </view>
        <view class="overview-card">
          <text class="card-value">{{ overviewData.outboundToday }}</text>
          <text class="card-label">今日出库</text>
        </view>
        <view class="overview-card">
          <text class="card-value">{{ overviewData.lowStock }}</text>
          <text class="card-label">低库存</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface WMSModule {
  id: string
  name: string
  description: string
  icon: string
  color: string
  path: string
}

const wmsModules = ref<WMSModule[]>([
  {
    id: 'inventory',
    name: '库存管理',
    description: '查看和管理库存信息',
    icon: 'list',
    color: '#1890ff',
    path: '/pages/wms/inventory'
  },
  {
    id: 'inbound',
    name: '入库管理',
    description: '处理入库相关业务',
    icon: 'plus',
    color: '#52c41a',
    path: '/pages/wms/inbound'
  },
  {
    id: 'outbound',
    name: '出库管理',
    description: '处理出库相关业务',
    icon: 'minus',
    color: '#fa8c16',
    path: '/pages/wms/outbound'
  },
  {
    id: 'inventory-check',
    name: '盘点管理',
    description: '库存盘点和调整',
    icon: 'checkmarkempty',
    color: '#722ed1',
    path: '/pages/wms/inventory-check'
  },
  {
    id: 'location',
    name: '库位管理',
    description: '管理仓库库位信息',
    icon: 'location',
    color: '#13c2c2',
    path: '/pages/wms/location'
  },
  {
    id: 'reports',
    name: '报表统计',
    description: '查看各类统计报表',
    icon: 'bars',
    color: '#eb2f96',
    path: '/pages/wms/reports'
  }
])

const overviewData = ref({
  totalItems: 12580,
  inboundToday: 156,
  outboundToday: 89,
  lowStock: 23
})

const navigateToModule = (path: string) => {
  uni.navigateTo({ url: path })
}

const quickAction = (action: string) => {
  switch (action) {
    case 'inbound':
      uni.navigateTo({ url: '/pages/wms/inbound' })
      break
    case 'outbound':
      uni.navigateTo({ url: '/pages/wms/outbound' })
      break
    case 'inventory':
      uni.navigateTo({ url: '/pages/wms/inventory' })
      break
    case 'scan':
      uni.scanCode({
        success: (res) => {
          console.log('扫码结果:', res)
          uni.showToast({
            title: '扫码成功',
            icon: 'success'
          })
        }
      })
      break
  }
}

const showPlatformSwitcher = () => {
  uni.navigateTo({ url: '/pages/platform-switcher' })
}

onMounted(() => {
  // 加载数据概览
  loadOverviewData()
})

const loadOverviewData = () => {
  // 这里可以调用API获取实际数据
  console.log('加载WMS数据概览')
}
</script>

<style lang="scss" scoped>
.wms-container {
  background: #f5f5f5;
  min-height: 100vh;
  
  .wms-header {
    background: linear-gradient(135deg, #1890ff 0%, #40a9ff 100%);
    padding: 20rpx 30rpx 40rpx;
    
    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      
      .platform-info {
        display: flex;
        align-items: center;
        
        .uni-icons {
          margin-right: 20rpx;
        }
        
        .platform-text {
          .platform-name {
            display: block;
            font-size: 28rpx;
            font-weight: bold;
            color: #ffffff;
            margin-bottom: 4rpx;
          }
          
          .platform-desc {
            display: block;
            font-size: 24rpx;
            color: rgba(255, 255, 255, 0.8);
          }
        }
      }
      
      .switch-btn {
        width: 60rpx;
        height: 60rpx;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
  
  .modules-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20rpx;
    padding: 30rpx;
    
    .module-card {
      background: #ffffff;
      border-radius: 16rpx;
      padding: 30rpx 20rpx;
      text-align: center;
      box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
      
      .module-icon {
        width: 80rpx;
        height: 80rpx;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 20rpx;
        
        // uni-icons 图标样式
        .uni-icons {
          font-size: 40rpx;
        }
      }
      
      .module-name {
        display: block;
        font-size: 28rpx;
        font-weight: bold;
        color: #333333;
        margin-bottom: 8rpx;
      }
      
      .module-desc {
        display: block;
        font-size: 24rpx;
        color: #666666;
      }
    }
  }
  
  .quick-actions {
    padding: 0 30rpx 30rpx;
    
    .section-title {
      display: block;
      font-size: 32rpx;
      font-weight: bold;
      color: #333333;
      margin-bottom: 20rpx;
    }
    
    .actions-list {
      display: flex;
      justify-content: space-between;
      
      .action-item {
        flex: 1;
        background: #ffffff;
        border-radius: 12rpx;
        padding: 20rpx 10rpx;
        text-align: center;
        margin: 0 5rpx;
        box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
        
        .uni-icons {
          display: block;
          margin-bottom: 8rpx;
        }
        
        text:last-child {
          font-size: 24rpx;
          color: #666666;
        }
      }
    }
  }
  
  .data-overview {
    padding: 0 30rpx 30rpx;
    
    .section-title {
      display: block;
      font-size: 32rpx;
      font-weight: bold;
      color: #333333;
      margin-bottom: 20rpx;
    }
    
    .overview-cards {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 20rpx;
      
      .overview-card {
        background: #ffffff;
        border-radius: 12rpx;
        padding: 30rpx 20rpx;
        text-align: center;
        box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
        
        .card-value {
          display: block;
          font-size: 36rpx;
          font-weight: bold;
          color: #1890ff;
          margin-bottom: 8rpx;
        }
        
        .card-label {
          display: block;
          font-size: 24rpx;
          color: #666666;
        }
      }
    }
  }
}
</style>
