<template>
  <div class="settings-form-container">
    <form @submit.prevent="handleSubmit">
      <div class="row g-4">
        <!-- 左列 -->
        <div class="col-md-6">
          <div>
            <label class="settings-form-label d-flex align-items-center">
              昵称
              <i class="bi bi-info-circle info-icon" title="昵称将作为您在平台上的显示名称"></i>
            </label>
            <input
              type="text"
              class="form-control settings-form-control"
              v-model="userInfo.nickname"
            />
          </div>
          <div>
            <label class="settings-form-label mt-4">邮箱</label>
            <input
              type="email"
              class="form-control settings-form-control"
              v-model="userInfo.email"
              placeholder="请输入邮箱"
            />
          </div>
          <div>
            <label class="settings-form-label mt-4">手机</label>
            <input type="tel" class="form-control settings-form-control" v-model="userInfo.phone" />
          </div>
        </div>

        <!-- 右列 -->
        <div class="col-md-6">
          <div>
            <label class="settings-form-label">真名</label>
            <input
              type="text"
              class="form-control settings-form-control"
              v-model="userInfo.realName"
              placeholder="请输入真实姓名"
            />
          </div>
          <div>
            <label class="settings-form-label mt-4">网址</label>
            <input
              type="url"
              class="form-control settings-form-control"
              v-model="userInfo.website"
              placeholder="请输入个人网址"
            />
          </div>
          <div class="mt-4">
            <div class="alert alert-custom d-flex align-items-center">
              <i class="bi bi-info-circle me-2"></i>
              <span>要修改手机和邮箱，请点击这里</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 保存按钮 -->
      <div class="mt-4">
        <button type="submit" class="btn btn-primary btn-save">保存</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '../../store/authStore'

const authStore = useAuthStore()

// 用户信息数据
const userInfo = ref({
  nickname: authStore.user?.username || 'ACG185122913G2XQ',
  email: authStore.user?.email || '',
  phone: '18512291362',
  realName: '',
  website: ''
})

// 处理表单提交
const handleSubmit = () => {
  console.log('保存用户信息:', userInfo.value)
  // 这里可以添加API调用
  authStore.updateUser({ username: userInfo.value.nickname, email: userInfo.value.email })
}
</script>

<style scoped>
.settings-form-container {
  padding: 2rem;
  background: white;
  border-radius: 0 0 0.375rem 0.375rem;
}

.settings-form-label {
  font-weight: 500;
  color: #333;
  margin-bottom: 0.5rem;
}

.settings-form-control {
  border: 1px solid #dee2e6;
  border-radius: 0.375rem;
  padding: 0.75rem;
  font-size: 0.95rem;
}

.info-icon {
  color: #6c757d;
  margin-left: 0.5rem;
  cursor: pointer;
}

.alert-custom {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 0.5rem;
  padding: 1rem;
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
