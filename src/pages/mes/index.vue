<template>
  <view class="mes-container">
    <!-- 顶部导航栏 -->
    <view class="mes-header">
      <view class="header-content">
        <view class="platform-info">
          <uni-icons type="gear" size="24" color="#ffffff" />
          <view class="platform-text">
            <text class="platform-name">MES</text>
            <text class="platform-desc">制造执行系统</text>
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
        v-for="module in mesModules" 
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

    <!-- 生产状态 -->
    <view class="production-status">
      <text class="section-title">生产状态</text>
      <view class="status-cards">
        <view class="status-card running">
          <view class="status-info">
            <text class="status-value">{{ productionData.running }}</text>
            <text class="status-label">运行中</text>
          </view>
        </view>
        <view class="status-card idle">
          <view class="status-info">
            <text class="status-value">{{ productionData.idle }}</text>
            <text class="status-label">空闲</text>
          </view>
        </view>
        <view class="status-card maintenance">
          <view class="status-info">
            <text class="status-value">{{ productionData.maintenance }}</text>
            <text class="status-label">维护中</text>
          </view>
        </view>
        <view class="status-card error">
          <view class="status-info">
            <text class="status-value">{{ productionData.error }}</text>
            <text class="status-label">故障</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 今日生产数据 -->
    <view class="daily-production">
      <text class="section-title">今日生产数据</text>
      <view class="production-metrics">
        <view class="metric-item">
          <text class="metric-value">{{ dailyData.planned }}</text>
          <text class="metric-label">计划产量</text>
        </view>
        <view class="metric-item">
          <text class="metric-value">{{ dailyData.actual }}</text>
          <text class="metric-label">实际产量</text>
        </view>
        <view class="metric-item">
          <text class="metric-value">{{ dailyData.qualified }}</text>
          <text class="metric-label">合格品</text>
        </view>
        <view class="metric-item">
          <text class="metric-value">{{ dailyData.defective }}</text>
          <text class="metric-label">不良品</text>
        </view>
      </view>
      
      <!-- 生产效率 -->
      <view class="efficiency-bar">
        <view class="efficiency-label">
          <text>生产效率</text>
          <text class="efficiency-value">{{ efficiency }}%</text>
        </view>
        <view class="efficiency-progress">
          <view class="efficiency-fill" :style="{ width: efficiency + '%' }"></view>
        </view>
      </view>
    </view>

    <!-- 快捷操作 -->
    <view class="quick-actions">
      <text class="section-title">快捷操作</text>
      <view class="actions-list">
        <view class="action-item" @click="quickAction('start')">
          <uni-icons type="play-filled" size="24" color="#52c41a" />
          <text>开始生产</text>
        </view>
        <view class="action-item" @click="quickAction('pause')">
          <uni-icons type="pause-filled" size="24" color="#52c41a" />
          <text>暂停生产</text>
        </view>
        <view class="action-item" @click="quickAction('quality')">
          <uni-icons type="checkmarkempty" size="24" color="#52c41a" />
          <text>质量检验</text>
        </view>
        <view class="action-item" @click="quickAction('report')">
          <uni-icons type="list" size="24" color="#52c41a" />
          <text>生产报告</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

interface MESModule {
  id: string
  name: string
  description: string
  icon: string
  color: string
  path: string
}

const mesModules = ref<MESModule[]>([
  {
    id: 'production-plan',
    name: '生产计划',
    description: '制定和管理生产计划',
    icon: 'calendar',
    color: '#52c41a',
    path: '/pages/mes/production-plan'
  },
  {
    id: 'process',
    name: '工艺管理',
    description: '管理生产工艺流程',
    icon: 'gear',
    color: '#1890ff',
    path: '/pages/mes/process'
  },
  {
    id: 'quality',
    name: '质量控制',
    description: '质量检验和控制',
    icon: 'checkmarkempty',
    color: '#fa8c16',
    path: '/pages/mes/quality'
  },
  {
    id: 'equipment',
    name: '设备管理',
    description: '设备状态和维护',
    icon: 'settings',
    color: '#722ed1',
    path: '/pages/mes/equipment'
  },
  {
    id: 'work-order',
    name: '工单管理',
    description: '生产工单管理',
    icon: 'list',
    color: '#13c2c2',
    path: '/pages/mes/work-order'
  },
  {
    id: 'reports',
    name: '生产报表',
    description: '查看生产统计报表',
    icon: 'bars',
    color: '#eb2f96',
    path: '/pages/mes/reports'
  }
])

const productionData = ref({
  running: 8,
  idle: 3,
  maintenance: 1,
  error: 0
})

const dailyData = ref({
  planned: 1200,
  actual: 1156,
  qualified: 1120,
  defective: 36
})

const efficiency = computed(() => {
  return Math.round((dailyData.value.actual / dailyData.value.planned) * 100)
})

const navigateToModule = (path: string) => {
  uni.navigateTo({ url: path })
}

const quickAction = (action: string) => {
  switch (action) {
    case 'start':
      uni.showModal({
        title: '开始生产',
        content: '确定要开始生产吗？',
        success: (res) => {
          if (res.confirm) {
            uni.showToast({
              title: '生产已开始',
              icon: 'success'
            })
          }
        }
      })
      break
    case 'pause':
      uni.showModal({
        title: '暂停生产',
        content: '确定要暂停生产吗？',
        success: (res) => {
          if (res.confirm) {
            uni.showToast({
              title: '生产已暂停',
              icon: 'success'
            })
          }
        }
      })
      break
    case 'quality':
      uni.navigateTo({ url: '/pages/mes/quality' })
      break
    case 'report':
      uni.navigateTo({ url: '/pages/mes/reports' })
      break
  }
}

const showPlatformSwitcher = () => {
  uni.navigateTo({ url: '/pages/platform-switcher' })
}

onMounted(() => {
  loadProductionData()
})

const loadProductionData = () => {
  // 这里可以调用API获取实际数据
  console.log('加载MES生产数据')
}
</script>

<style lang="scss" scoped>
.mes-container {
  background: #f5f5f5;
  min-height: 100vh;
  
  .mes-header {
    background: linear-gradient(135deg, #52c41a 0%, #73d13d 100%);
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
  
  .production-status {
    padding: 0 30rpx 30rpx;
    
    .section-title {
      display: block;
      font-size: 32rpx;
      font-weight: bold;
      color: #333333;
      margin-bottom: 20rpx;
    }
    
    .status-cards {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 20rpx;
      
      .status-card {
        background: #ffffff;
        border-radius: 12rpx;
        padding: 30rpx 20rpx;
        display: flex;
        align-items: center;
        box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
        
        .status-icon {
          font-size: 40rpx;
          margin-right: 20rpx;
        }
        
        .status-info {
          .status-value {
            display: block;
            font-size: 32rpx;
            font-weight: bold;
            margin-bottom: 4rpx;
          }
          
          .status-label {
            display: block;
            font-size: 24rpx;
            color: #666666;
          }
        }
        
        &.running {
          .status-icon { color: #52c41a; }
          .status-value { color: #52c41a; }
        }
        
        &.idle {
          .status-icon { color: #faad14; }
          .status-value { color: #faad14; }
        }
        
        &.maintenance {
          .status-icon { color: #1890ff; }
          .status-value { color: #1890ff; }
        }
        
        &.error {
          .status-icon { color: #ff4d4f; }
          .status-value { color: #ff4d4f; }
        }
      }
    }
  }
  
  .daily-production {
    padding: 0 30rpx 30rpx;
    
    .section-title {
      display: block;
      font-size: 32rpx;
      font-weight: bold;
      color: #333333;
      margin-bottom: 20rpx;
    }
    
    .production-metrics {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 20rpx;
      margin-bottom: 30rpx;
      
      .metric-item {
        background: #ffffff;
        border-radius: 12rpx;
        padding: 30rpx 20rpx;
        text-align: center;
        box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
        
        .metric-value {
          display: block;
          font-size: 32rpx;
          font-weight: bold;
          color: #52c41a;
          margin-bottom: 8rpx;
        }
        
        .metric-label {
          display: block;
          font-size: 24rpx;
          color: #666666;
        }
      }
    }
    
    .efficiency-bar {
      background: #ffffff;
      border-radius: 12rpx;
      padding: 30rpx 20rpx;
      box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
      
      .efficiency-label {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20rpx;
        
        text:first-child {
          font-size: 28rpx;
          color: #333333;
        }
        
        .efficiency-value {
          font-size: 28rpx;
          font-weight: bold;
          color: #52c41a;
        }
      }
      
      .efficiency-progress {
        height: 12rpx;
        background: #f0f0f0;
        border-radius: 6rpx;
        overflow: hidden;
        
        .efficiency-fill {
          height: 100%;
          background: linear-gradient(90deg, #52c41a 0%, #73d13d 100%);
          border-radius: 6rpx;
          transition: width 0.3s ease;
        }
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
}
</style>
