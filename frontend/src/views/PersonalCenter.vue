<template>
  <div>
    <!-- 导航栏 -->
    <AuthNavbar />

    <!-- 主要内容区域 -->
    <div class="container-fluid">
      <div class="row min-vh-100">
        <!-- 左侧边栏 -->
        <SidebarUserPanel :current-page="currentPage" @page-change="handlePageChange" />

        <!-- 右侧内容 -->
        <div class="col main-content">
          <div class="p-4">
            <!-- 个人中心仪表板 -->
            <PersonalDashboard v-if="currentPage === 'personal-center'" />

            <!-- 账户设置 -->
            <AccountSettings v-if="currentPage === 'account-settings'" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AuthNavbar from '../components/AuthNavbar.vue'
import SidebarUserPanel from '../components/personCenter/SidebarUserPanel.vue'
import PersonalDashboard from '../components/personCenter/PersonalDashboard.vue'
import AccountSettings from '../components/personCenter/AccountSettings.vue'

// 当前页面状态
const currentPage = ref('personal-center')

// 处理页面切换
const handlePageChange = (page: string) => {
  currentPage.value = page
}
</script>

<style scoped>
.main-content {
  background-color: #f8f9fa;
}
</style>
