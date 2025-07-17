<template>
  <div class="settings-form-container">
    <div class="row g-4">
      <div class="col-12">
        <h6 class="mb-3">账户安全设置</h6>
      </div>

      <div class="col-md-6">
        <div class="d-flex align-items-center justify-content-between p-3 border rounded">
          <div>
            <div class="fw-medium">登录密码</div>
            <small class="text-muted">用于登录验证的密码</small>
          </div>
          <button class="btn btn-outline-primary btn-sm" @click="changePassword">修改</button>
        </div>
      </div>

      <div class="col-md-6">
        <div class="d-flex align-items-center justify-content-between p-3 border rounded">
          <div>
            <div class="fw-medium">手机验证</div>
            <small class="text-success">已绑定：185****1362</small>
          </div>
          <button class="btn btn-outline-primary btn-sm" @click="changePhone">修改</button>
        </div>
      </div>

      <div class="col-md-6">
        <div class="d-flex align-items-center justify-content-between p-3 border rounded">
          <div>
            <div class="fw-medium">邮箱验证</div>
            <small class="text-muted">未绑定</small>
          </div>
          <button class="btn btn-outline-primary btn-sm" @click="bindEmail">绑定</button>
        </div>
      </div>

      <div class="col-md-6">
        <div class="d-flex align-items-center justify-content-between p-3 border rounded">
          <div>
            <div class="fw-medium">二步验证</div>
            <small class="text-muted">未启用</small>
          </div>
          <button class="btn btn-outline-primary btn-sm" @click="enableTwoFactor">启用</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 修改密码
const changePassword = () => {
  console.log('修改密码')
  // 这里可以添加修改密码的逻辑
}

// 修改手机号
const changePhone = () => {
  console.log('修改手机号')
  // 这里可以添加修改手机号的逻辑
}

// 绑定邮箱
const bindEmail = () => {
  console.log('绑定邮箱')
  // 这里可以添加绑定邮箱的逻辑
}

// 启用二步验证
const enableTwoFactor = () => {
  console.log('启用二步验证')
  // 这里可以添加启用二步验证的逻辑
}
</script>

<style scoped>
.settings-form-container {
  padding: 2rem;
  background: white;
  border-radius: 0 0 0.375rem 0.375rem;
}
</style>
