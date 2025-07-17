<template>
  <ul class="nav settings-nav-tabs" role="tablist">
    <li class="nav-item">
      <a
        class="nav-link"
        :class="{ active: currentTab === 'basic-info' }"
        @click="$emit('tab-change', 'basic-info')"
      >
        基本资料
      </a>
    </li>
    <li class="nav-item">
      <a
        class="nav-link"
        :class="{ active: currentTab === 'wechat-bind' }"
        @click="$emit('tab-change', 'wechat-bind')"
      >
        微信绑定
      </a>
    </li>
    <li class="nav-item">
      <a
        class="nav-link"
        :class="{ active: currentTab === 'real-name' }"
        @click="$emit('tab-change', 'real-name')"
      >
        实名认证
      </a>
    </li>
    <li class="nav-item">
      <a
        class="nav-link"
        :class="{ active: currentTab === 'account-security' }"
        @click="$emit('tab-change', 'account-security')"
      >
        账户安全
      </a>
    </li>
  </ul>
</template>

<script setup lang="ts">
// 接收当前激活的标签页
defineProps({
  currentTab: {
    type: String,
    default: 'basic-info'
  }
})

// 定义事件
defineEmits(['tab-change'])
</script>

<style scoped>
.settings-nav-tabs {
  border-bottom: 1px solid #dee2e6;
  padding: 0 1rem;
  background: white;
  border-radius: 0.375rem 0.375rem 0 0;
}

.settings-nav-tabs .nav-link {
  border: none;
  color: #6c757d;
  font-weight: 500;
  padding: 1rem 0.5rem;
  margin-right: 2rem;
  border-bottom: 2px solid transparent;
  margin-bottom: 0;
  cursor: pointer;
  transition: all 0.2s ease;
}

.settings-nav-tabs .nav-link:hover {
  color: #495057;
}

.settings-nav-tabs .nav-link.active {
  color: #007bff;
  border-bottom-color: #007bff;
  background: none;
}
</style>
