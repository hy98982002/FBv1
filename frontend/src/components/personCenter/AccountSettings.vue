<template>
  <div class="bg-white rounded shadow-sm">
    <!-- Settings标签导航 -->
    <SettingsTabs :current-tab="currentTab" @tab-change="handleTabChange" />

    <!-- 设置内容区域 -->
    <div class="settings-content">
      <!-- 基本资料 -->
      <SettingBasicInfo v-if="currentTab === 'basic-info'" />

      <!-- 微信绑定 -->
      <SettingWeChat v-if="currentTab === 'wechat-bind'" />

      <!-- 实名认证 -->
      <SettingRealName v-if="currentTab === 'real-name'" />

      <!-- 账户安全 -->
      <SettingSecurity v-if="currentTab === 'account-security'" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SettingsTabs from './SettingsTabs.vue'
import SettingBasicInfo from './SettingBasicInfo.vue'
import SettingWeChat from './SettingWeChat.vue'
import SettingRealName from './SettingRealName.vue'
import SettingSecurity from './SettingSecurity.vue'

// 当前激活的标签页
const currentTab = ref('basic-info')

// 处理标签切换
const handleTabChange = (tab: string) => {
  currentTab.value = tab
}
</script>

<style scoped>
.settings-content {
  min-height: 400px;
}
</style>
