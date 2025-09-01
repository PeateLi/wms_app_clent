<script lang="ts" setup>
import { isApp, isAppAndroid, isAppHarmony, isAppIOS, isAppPlus, isH5, isMpWeixin, isWeb } from '@uni-helper/uni-env'
import { LOGIN_PAGE } from '@/router/config'
import { tabbarStore } from '@/tabbar/store'
import RequestComp from './components/request.vue'
import VBindCss from './components/VBindCss.vue'

definePage({
  style: {
    navigationBarTitleText: '关于',
  },
})

console.log({ isApp, isAppAndroid, isAppHarmony, isAppIOS, isAppPlus, isH5, isMpWeixin, isWeb })

// uniLayout里面的变量通过 expose 暴露出来后可以在 onReady 钩子获取到（onLoad 钩子不行）
const uniLayout = ref()
onLoad(() => {
  console.log('onLoad:', uniLayout.value) // onLoad: undefined
})
onReady(() => {
  console.log('onReady:', uniLayout.value) // onReady: Proxy(Object)
  console.log('onReady:', uniLayout.value.testUniLayoutExposedData) // onReady: testUniLayoutExposedData
})
// 结论：第一次通过onShow获取不到，但是可以通过 onReady获取到，后面就可以通过onShow获取到了
onShow(() => {
  console.log('onShow:', uniLayout.value) // onReady: Proxy(Object)
  console.log('onShow:', uniLayout.value?.testUniLayoutExposedData) // onReady: testUniLayoutExposedData
})

function gotoTabbar() {
  uni.switchTab({
    url: '/pages/index/index',
  })
}
// #region setTabbarBadge
function setTabbarBadge() {
  tabbarStore.setTabbarItemBadge(1, 100)
}
// #endregion

const uniKuRoot = ref()
// 结论：(同上）第一次通过onShow获取不到，但是可以通过 onReady获取到，后面就可以通过onShow获取到了
onReady(() => {
  console.log('onReady uniKuRoot exposeRef', uniKuRoot.value?.exposeRef)
})
onShow(() => {
  console.log('onShow uniKuRoot exposeRef', uniKuRoot.value?.exposeRef)
})
</script>

<template root="uniKuRoot">
  <view>
    
  </view>
</template>
