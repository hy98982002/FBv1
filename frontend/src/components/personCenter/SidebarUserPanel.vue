<template>
  <div class="col-auto sidebar bg-white shadow-sm">
    <div class="p-3">
      <!-- 用户信息区块 -->
      <div class="text-center mb-4">
        <div class="avatar-container mb-3">
          <img :src="userAvatar" alt="Avatar" class="rounded-circle" width="60" height="60" />
          <div class="avatar-status"></div>
        </div>
        <h6 class="fw-bold mb-1">{{ userName }}</h6>
        <small class="text-muted">您好，今天想学点什么呢？</small>
      </div>

      <!-- 统计信息 -->
      <div class="row text-center mb-4">
        <div class="col-4">
          <div class="stat-item">
            <div class="fw-bold text-primary">25</div>
            <small class="text-muted">我的报名</small>
          </div>
        </div>
        <div class="col-4">
          <div class="stat-item">
            <div class="fw-bold">0</div>
            <small class="text-muted">我的完成</small>
          </div>
        </div>
        <div class="col-4">
          <div class="stat-item">
            <div class="fw-bold">0</div>
            <small class="text-muted">CG作品集</small>
          </div>
        </div>
      </div>

      <!-- CTA按钮 -->
      <button class="btn btn-primary w-100 mb-4">
        <i class="bi bi-lightning-fill me-2"></i>
        您还不是课程会员，立即开课
      </button>

      <!-- 导航菜单 -->
      <nav class="nav flex-column">
        <a
          class="nav-link"
          :class="{ active: currentPage === 'personal-center' }"
          @click="$emit('page-change', 'personal-center')"
        >
          <i class="bi bi-person-circle me-2"></i>
          个人中心
        </a>
        <a
          class="nav-link"
          :class="{ active: currentPage === 'account-settings' }"
          @click="$emit('page-change', 'account-settings')"
        >
          <i class="bi bi-gear me-2"></i>
          账户设置
        </a>
        <a class="nav-link" href="#">
          <i class="bi bi-trophy me-2"></i>
          奖励记录
          <span class="badge bg-danger ms-auto">3</span>
        </a>
        <a class="nav-link" href="#">
          <i class="bi bi-book me-2"></i>
          学习统计
        </a>
        <a class="nav-link" href="#">
          <i class="bi bi-cart me-2"></i>
          订单中心
          <span class="badge bg-danger ms-auto">1</span>
        </a>
        <a class="nav-link" href="#">
          <i class="bi bi-plus-circle me-2"></i>
          申请开课
        </a>
        <a class="nav-link" href="#">
          <i class="bi bi-gift me-2"></i>
          推广有礼
        </a>
        <a class="nav-link text-muted" href="#" @click.prevent="handleLogout">
          <i class="bi bi-box-arrow-right me-2"></i>
          退出登录
        </a>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '../../store/authStore'

// 获取认证状态
const authStore = useAuthStore()

// 用户头像
const userAvatar = computed(() => {
  return authStore.user?.avatar || '/img/tou01.png'
})

// 用户名
const userName = computed(() => {
  return authStore.user?.username || 'ACG185****1362XQ'
})

// 处理退出登录
const handleLogout = () => {
  authStore.logout()
}

// 接收父组件传递的当前页面状态
defineProps({
  currentPage: {
    type: String,
    default: 'personal-center'
  }
})

// 定义事件
defineEmits(['page-change'])
</script>

<style scoped>
.sidebar {
  width: 260px;
  min-height: 100vh;
  border-right: 1px solid #e9ecef;
}

.avatar-container {
  position: relative;
  display: inline-block;
}

.avatar-status {
  position: absolute;
  bottom: 5px;
  right: 5px;
  width: 12px;
  height: 12px;
  background-color: #28a745;
  border: 2px solid white;
  border-radius: 50%;
}

.stat-item {
  padding: 0.5rem 0;
}

.nav-link {
  color: #6c757d;
  padding: 0.75rem 0;
  border: none;
  border-radius: 0.375rem;
  margin-bottom: 0.25rem;
  transition: all 0.2s ease;
  cursor: pointer;
}

.nav-link:hover {
  background-color: #f8f9fa;
  color: #495057;
}

.nav-link.active {
  background-color: #e3f2fd;
  color: #1976d2;
  font-weight: 500;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .sidebar {
    width: 100%;
    min-height: auto;
    border-right: none;
    border-bottom: 1px solid #e9ecef;
  }
}
</style>
