<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-white fixed-top" id="authNav">
    <div class="container-fluid custom-container">
      <!-- 品牌Logo -->
      <a class="navbar-brand" href="/">
        <img src="../assets/icons/logo.png" alt="UAI Logo" class="logo-img" />
      </a>

      <!-- 移动端折叠按钮 -->
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarAuthContent"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- 导航内容 -->
      <div class="collapse navbar-collapse" id="navbarAuthContent">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <a class="nav-link" href="/">
              <span class="nav-underline">首页</span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/cart">
              <span class="nav-underline">购物车</span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/my-courses">
              <span class="nav-underline">我的课程</span>
            </a>
          </li>
        </ul>

        <!-- 右侧用户区域 -->
        <div class="d-flex align-items-center">
          <!-- 搜索框 -->
          <form class="d-flex my-2 my-lg-0 me-2 search-form-wrapper" @submit.prevent="search">
            <div class="position-relative" style="width: 300px; max-width: 100%">
              <input
                v-model="searchQuery"
                type="search"
                class="form-control search-input"
                placeholder="搜索课程..."
                aria-label="Search"
              />
              <button type="submit" class="search-btn-inside">
                <i class="fas fa-search"></i>
              </button>
            </div>
          </form>

          <!-- 用户头像和下拉菜单 -->
          <div class="dropdown user-dropdown">
            <a
              class="nav-link dropdown-toggle d-flex align-items-center"
              href="#"
              id="userDropdown"
              role="button"
              data-bs-toggle="dropdown"
            >
              <img
                src="../assets/images/avatars/tou01.png"
                alt="User Avatar"
                class="rounded-circle avatar-img me-2"
              />
              <span>用户名</span>
            </a>
            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
              <li><a class="dropdown-item" href="/personal-center">个人中心</a></li>
              <li><a class="dropdown-item" href="/my-courses">我的课程</a></li>
              <li><a class="dropdown-item" href="/orders">我的订单</a></li>
              <li><hr class="dropdown-divider" /></li>
              <li><a class="dropdown-item" href="#" @click.prevent="logout">退出登录</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../store/authStore'

const router = useRouter()
const authStore = useAuthStore()
const searchQuery = ref('')

// 搜索方法
const search = () => {
  if (searchQuery.value.trim()) {
    console.log('搜索:', searchQuery.value)
    // 这里可以添加搜索逻辑
    // router.push({ path: '/search', query: { q: searchQuery.value } })
  }
}

// 退出登录
const logout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<style scoped>
.navbar {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.logo-img {
  height: 28px;
  width: auto;
}

.custom-container {
  max-width: calc(100% - 100px);
  margin-right: auto;
  margin-left: auto;
}

.avatar-img {
  width: 32px;
  height: 32px;
  object-fit: cover;
}

.search-input {
  padding-right: 50px;
  border-radius: 25px;
  border: 1px solid #1e7f98;
  font-size: 14px;
  height: 38px;
}

.search-btn-inside {
  background: none;
  border: none;
  outline: none;
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
}

.search-btn-inside i {
  color: #1e7f98;
}

.user-dropdown .dropdown-toggle::after {
  margin-left: 0.5em;
}

.nav-underline {
  position: relative;
  display: inline-block;
}

/* 响应式调整 */
@media (max-width: 992px) {
  .search-form-wrapper {
    width: 100%;
    margin-bottom: 10px;
  }

  .user-dropdown {
    margin-top: 10px;
  }
}
</style>
