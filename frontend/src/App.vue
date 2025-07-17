<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Navbar from './components/Navbar.vue'
import AuthNavbar from './components/AuthNavbar.vue'
import LoginModal from './components/LoginModal.vue'
import RegisterModal from './components/RegisterModal.vue'
import { useUIStore } from './store/uiStore'
import { useAuthStore } from './store/authStore'

const uiStore = useUIStore()
const authStore = useAuthStore()
const showLoginModal = ref(false)
const showRegisterModal = ref(false)

// 处理登录模态框打开
const handleOpenLoginModal = () => {
  showLoginModal.value = true
  console.log('打开登录模态框')
}

// 处理注册模态框打开
const handleOpenRegisterModal = () => {
  showRegisterModal.value = true
  console.log('打开注册模态框')
}

// 处理登录模态框关闭
const handleCloseLoginModal = () => {
  showLoginModal.value = false
}

// 处理注册模态框关闭
const handleCloseRegisterModal = () => {
  showRegisterModal.value = false
}

// 从登录切换到注册
const handleSwitchToRegister = () => {
  showLoginModal.value = false
  showRegisterModal.value = true
}

// 从注册切换到登录
const handleSwitchToLogin = () => {
  showRegisterModal.value = false
  showLoginModal.value = true
}

onMounted(() => {
  uiStore.initializeUI()
})
</script>

<template>
  <div id="app">
    <!-- 根据登录状态切换导航栏 -->
    <AuthNavbar v-if="authStore.isAuthenticated" />
    <Navbar
      v-else
      @openLoginModal="handleOpenLoginModal"
      @openRegisterModal="handleOpenRegisterModal"
    />

    <!-- 主内容区域 -->
    <main class="main-content">
      <RouterView />
    </main>

    <!-- 登录模态框 -->
    <LoginModal
      v-if="showLoginModal"
      @close="handleCloseLoginModal"
      @openRegister="handleSwitchToRegister"
    />

    <!-- 注册模态框 -->
    <RegisterModal
      v-if="showRegisterModal"
      @close="handleCloseRegisterModal"
      @openLogin="handleSwitchToLogin"
    />
  </div>
</template>

<style>
/* 全局样式 */
body {
  margin: 0;
  padding: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: #ffffff;
  min-height: 100vh;
}

#app {
  min-height: 100vh;
}

.main-content {
  padding-top: 0; /* 让轮播图贴着导航栏 */
  min-height: 100vh;
}

/* Bootstrap样式覆盖 */
.container {
  max-width: 1200px;
}

/* 自定义工具类 */
.text-tech-blue {
  color: #1e7f98 !important;
}

.bg-tech-blue {
  background-color: #1e7f98 !important;
}

.border-tech-blue {
  border-color: #1e7f98 !important;
}
</style>
