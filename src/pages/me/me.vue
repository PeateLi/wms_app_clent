<script lang="ts" setup>
import type { IUploadSuccessInfo } from '@/api/types/login'
import { storeToRefs } from 'pinia'
import { LOGIN_PAGE } from '@/router/config'
import { useUserStore } from '@/store'
import { useTokenStore } from '@/store/token'
import { useUpload } from '@/utils/uploadFile'

definePage({
  style: {
    navigationBarTitleText: '我的',
  },
})

const userStore = useUserStore()
const tokenStore = useTokenStore()
// 使用storeToRefs解构userInfo
const { userInfo } = storeToRefs(userStore)

// #ifndef MP-WEIXIN
// 上传头像
const { run: uploadAvatar } = useUpload<IUploadSuccessInfo>(
  import.meta.env.VITE_UPLOAD_BASEURL,
  {},
  {
    onSuccess: (res) => {
      console.log('h5头像上传成功', res)
      useUserStore().setUserAvatar(res.url)
    },
  },
)
// #endif

// 微信小程序下登录
async function handleLogin() {
  // #ifdef MP-WEIXIN

  // 微信登录
  await tokenStore.wxLogin()
  // #endif
  // #ifndef MP-WEIXIN
  uni.navigateTo({ url: LOGIN_PAGE })
  // #endif
}

// #ifdef MP-WEIXIN

// 微信小程序下选择头像事件
function onChooseAvatar(e: any) {
  const { avatarUrl } = e.detail
  const { run } = useUpload<IUploadSuccessInfo>(
    import.meta.env.VITE_UPLOAD_BASEURL,
    {},
    {
      onSuccess: (res) => {
        console.log('wx头像上传成功', res)
        useUserStore().setUserAvatar(res.url)
      },
    },
    avatarUrl,
  )
  run()
}
// #endif
// #ifdef MP-WEIXIN
// 微信小程序下设置用户名
function getUserInfo(e: any) {
  console.log(e.detail)
}
// #endif

// 退出登录
function handleLogout() {
  uni.showModal({
    title: '提示',
    content: '确定要退出登录吗？',
    success: (res) => {
      if (res.confirm) {
        // 清空用户信息
        useTokenStore().logout()
        // 执行退出登录逻辑
        uni.showToast({
          title: '退出登录成功',
          icon: 'success',
        })
        // #ifdef MP-WEIXIN
        // 微信小程序，去首页
        // uni.reLaunch({ url: '/pages/index/index' })
        // #endif
        // #ifndef MP-WEIXIN
        // 非微信小程序，去登录页
        uni.navigateTo({ url: LOGIN_PAGE })
        // #endif
      }
    },
  })
}
</script>

<template>
  <view class="profile-container">
    
  </view>
</template>

<style lang="scss" scoped>

</style>
