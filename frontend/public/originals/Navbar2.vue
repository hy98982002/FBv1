<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-white fixed-top" id="mainNav" :class="{ 'scrolled': isScrolled, 'hide': isHidden, 'show': !isHidden }">
      <div class="container-fluid ps-0" style="margin-left: 0;">`
        <a class="navbar-brand" href="javascript:void(0);">
          <img alt="UAI Logo" class="logo-img" src="/img/logo.png"/>
        </a>
  
        <!-- 小屏幕时显示在右侧的登录注册按钮 -->
        <div class="d-flex d-lg-none ms-auto">
          <a href="javascript:void(0);" class="btn btn-outline-dark btn-sm me-2" @click="openLoginModal">登录</a>
          <a href="javascript:void(0);" class="btn btn-dark btn-sm" @click="openRegisterModal">注册</a>
        </div>
  
        <!-- 折叠菜单按钮 -->
        <button class="navbar-toggler ms-2" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
  
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto">
            <li class="nav-item active">
              <a class="nav-link" href="javascript:void(0);">
                <span class="nav-underline">UAI学院</span>
                <span class="visually-hidden">(current)</span>
              </a>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="javascript:void(0);" id="navbarDropdown1"
                 role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <span class="nav-underline">AIGC创意师</span>
              </a>
              <div class="dropdown-menu">
                <a class="dropdown-item" href="javascript:void(0);">AI+logo设计师</a>
                <a class="dropdown-item" href="javascript:void(0);">AI+包装师</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="javascript:void(0);">Something else here</a>
              </div>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="javascript:void(0);" id="navbarDropdown2"
                 role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <span class="nav-underline">AI编程</span>
              </a>
              <div class="dropdown-menu">
                <a class="dropdown-item" href="javascript:void(0);">AI+logo设计师</a>
                <a class="dropdown-item" href="javascript:void(0);">AI+包装师</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="javascript:void(0);">Something else here</a>
              </div>
            </li>
          </ul>
          <!-- 右侧整体区域 -->
          <div class="d-flex align-items-center right-group">
            <form class="d-flex my-2 my-lg-0 me-2" @submit.prevent="search">
              <div class="position-relative" style="width: 450px; max-width:100%;">
                <input v-model="searchQuery" type="search" class="form-control search-input" placeholder="AI+logo设计师" aria-label="Search">
                <button type="submit" class="search-btn-inside">
                  <i class="fas fa-search"></i>
                </button>
              </div>
            </form>
            <!--购物车图标-->
            <a href="javascript:void(0);" class="text-dark me-3" @click="openCart">
              <i class="iconfont icon-gouwuche nav-cart-icon"></i>
            </a>
  
            <!-- 大屏幕显示的登录注册按钮 -->
            <div class="ms-2 d-none d-lg-flex align-items-center">
              <button class="btn btn-outline-dark btn-login-fix me-2" type="button" @click="openLoginModal">登录</button>
              <button class="btn btn-dark btn-register" type="button" @click="openRegisterModal">注册</button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </template>
  
  <script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router';

// 定义emits
const emit = defineEmits(['openLoginModal', 'openRegisterModal'])
  
const router = useRouter();
const searchQuery = ref('');
const isScrolled = ref(false);
const isHidden = ref(false);
let lastScrollY = 0;
  
// 搜索方法
const search = () => {
  console.log('搜索:', searchQuery.value);
  // 这里可以添加搜索逻辑
};
  
// 购物车方法
const openCart = () => {
  console.log('打开购物车');
  // 这里可以添加打开购物车的逻辑
};
  
// 打开登录模态框
const openLoginModal = () => {
  emit('openLoginModal')
};
  
// 打开注册模态框
const openRegisterModal = () => {
  emit('openRegisterModal')
};
  
// 处理滚动事件
const handleScroll = () => {
  const currentScrollY = window.scrollY;
  
  // 导航栏阴影效果
  isScrolled.value = currentScrollY > 0;
  
  // 导航栏隐藏/显示效果
  if (currentScrollY > 300 && currentScrollY > lastScrollY) {
    isHidden.value = true;
  } else {
    isHidden.value = false;
  }
  
  lastScrollY = currentScrollY;
};
  
// 生命周期钩子
onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  
  // 初始化Bootstrap下拉菜单
  const initDropdowns = () => {
    const dropdownElementList = document.querySelectorAll('.dropdown-toggle');
    if (window.bootstrap) {
      dropdownElementList.forEach(dropdownToggle => {
        new window.bootstrap.Dropdown(dropdownToggle);
      });
    }
  };
  
  // 确保Bootstrap已加载
  if (window.bootstrap) {
    initDropdowns();
  } else {
    // 如果Bootstrap尚未加载，等待一段时间后再尝试
    setTimeout(initDropdowns, 500);
  }
});
  
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
  </script>
  
  <style scoped>
  /* 搜索框样式 */
  .search-input {
    padding-right: 50px; /* 为内部按钮留出空间 */
    border-radius: 25px;
    border: 1px solid #ddd;
    font-size: 14px;
  }
  
  .search-input:focus {
    border-color: #f0690e;
    box-shadow: 0 0 0 0.2rem rgba(240, 105, 14, 0.25);
    outline: none;
  }
  
  /* 🎯 任务1-4: 放大镜按钮样式 */
  .search-btn-inside {
    /* 任务1: 去除矩形方框 */
    background: none;
    border: none;
    outline: none;
    
    /* 任务3: 定位到搜索框内部右侧 */
    position: absolute;
    right: 15px; /* 👈 任务4: 调节左右位置 - 修改这个数值 */
    top: 50%;
    transform: translateY(-50%); /* 👈 任务4: 调节上下位置 - 修改这个数值 */
    
    /* 按钮基本样式 */
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    border-radius: 50%;
    z-index: 10;
  }
  
  /* 任务2: 放大镜图标颜色 */
  .search-btn-inside i {
    font-size: 16px;
    color: #f0690e; /* 常态色值 */
    transition: color 0.3s ease;
  }
  
  /* 任务2: 悬停时颜色变化 */
  .search-btn-inside:hover i,
  .search-btn-inside:focus i {
    color: #f37000; /* 悬停色值 */
  }
  
  /* 悬停时的背景效果（可选） */
  .search-btn-inside:hover {
    background-color: rgba(240, 105, 14, 0.1);
  }
  
  /* 导航栏其他样式 */
  .navbar {
    transition: all 0.3s ease;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  
  .navbar.scrolled {
    box-shadow: 0 2px 10px rgba(0,0,0,0.15);
  }
  
  .navbar.hide {
    transform: translateY(-100%);
  }
  
  .navbar.show {
    transform: translateY(0);
  }
  
  /* 🎯 强力控制容器位置 */
  .container-fluid {
    margin-left: 0 !important; /* 👈 强制容器左边距为0 */
    padding-left: 20px !important; /* 👈 调节整体左侧间距 */
  }
  
  /* Logo 品牌区域样式 */
  .navbar-brand {
    margin-right: 0 !important; 
    margin-left: 0 !important; /* 👈 强制logo左边距为0 */
    padding: 0 !important; 
    position: relative !important;
  }
  
  .logo-img {
    height: 26px !important; /* 👈 调节logo大小 */
    width: auto !important;
    display: block !important;
    margin-top: -6px !important; /* 👈 调节logo垂直位置 */
    margin-left: 0 !important; 
    filter: brightness(1.11) !important; 
    position: relative !important;
    left: -10px !important; /* 👈 强力左移logo位置 - 修改这个数值 */
  }
  
  .nav-underline {
    position: relative;
    transition: all 0.3s ease;
  }
  
  .nav-item.active .nav-underline::after,
  .nav-item:hover .nav-underline::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: #f0690e;
  }
  
  .btn-login-fix {
    border-radius: 20px;
    padding: 8px 20px;
  }
  
  .btn-register {
    border-radius: 20px;
    padding: 8px 20px;
  }
  
  .nav-cart-icon {
    font-size: 20px;
    transition: color 0.3s ease;
  }
  
  .nav-cart-icon:hover {
    color: #f0690e !important;
  }

  /* 🎯 导航栏下拉菜单位置调节 */
  .navbar .dropdown-menu {
    margin-top: 8px !important;   /* 👈 调节上下位置：向下移动菜单，露出按钮 */
    margin-left: 0px !important;  /* 👈 调节左右位置：与按钮左边缘对齐 */
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(0, 0, 0, 0.1);
  }
  </style>