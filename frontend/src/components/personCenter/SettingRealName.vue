<template>
  <div class="settings-form-container">
    <div class="text-center py-5">
      <i class="bi bi-person-check text-primary" style="font-size: 4rem"></i>
      <h5 class="mt-3">实名认证</h5>
      <p class="text-muted">完成实名认证后，可享受更多平台权益</p>
      <button class="btn btn-primary btn-save" @click="startVerification">开始认证</button>
    </div>
  </div>
</template>

<script setup lang="ts">
// 处理实名认证
const startVerification = () => {
  console.log('开始实名认证流程')
  // 这里可以添加实名认证的逻辑
}
</script>

<style scoped>
.settings-form-container {
  padding: 2rem;
  background: white;
  border-radius: 0 0 0.375rem 0.375rem;
}

.btn-save {
  background-color: #007bff;
  border: none;
  border-radius: 0.5rem;
  padding: 0.75rem 2rem;
  font-weight: 500;
}

.btn-save:hover {
  background-color: #0056b3;
}
</style>
