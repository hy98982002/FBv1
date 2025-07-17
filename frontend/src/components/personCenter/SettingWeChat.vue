<template>
  <div class="settings-form-container">
    <div class="text-center py-5">
      <i class="bi bi-wechat text-success" style="font-size: 4rem"></i>
      <h5 class="mt-3">微信绑定</h5>
      <p class="text-muted">绑定微信后，可以使用微信快速登录</p>
      <button class="btn btn-success" @click="bindWeChat">
        <i class="bi bi-wechat me-2"></i>
        绑定微信
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
// 处理微信绑定
const bindWeChat = () => {
  console.log('开始微信绑定流程')
  // 这里可以添加微信绑定的逻辑
}
</script>

<style scoped>
.settings-form-container {
  padding: 2rem;
  background: white;
  border-radius: 0 0 0.375rem 0.375rem;
}
</style>
