<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import logoImg from '@/assets/icons/logo.png'

// 定义emits
const emit = defineEmits(['openLoginModal', 'openRegisterModal'])

const router = useRouter()
const searchQuery = ref('')
const isScrolled = ref(false)
const isHidden = ref(false)
let lastScrollY = 0

// 搜索方法
const search = () => {
  if (searchQuery.value.trim()) {
    console.log('搜索:', searchQuery.value)
    // 这里可以添加搜索逻辑
    // 例如跳转到搜索结果页面
    // router.push({ path: '/search', query: { q: searchQuery.value } })

    // 如果需要清空搜索框，可以取消注释下一行
    // searchQuery.value = ''
  }
}

// 购物车方法
const openCart = () => {
  console.log('打开购物车')
  // 这里可以添加打开购物车的逻辑
  // 例如跳转到购物车页面或打开购物车侧边栏
  // router.push({ path: '/cart' })
}

// 打开登录模态框
const openLoginModal = () => {
  emit('openLoginModal')
}

// 打开注册模态框
const openRegisterModal = () => {
  emit('openRegisterModal')
}

// 处理滚动事件
const handleScroll = () => {
  const currentScrollY = window.scrollY

  // 导航栏阴影效果
  isScrolled.value = currentScrollY > 0

  // 导航栏隐藏/显示效果
  if (currentScrollY > 300 && currentScrollY > lastScrollY) {
    isHidden.value = true
  } else {
    isHidden.value = false
  }

  lastScrollY = currentScrollY
}

// 生命周期钩子
onMounted(() => {
  window.addEventListener('scroll', handleScroll)

  // 初始化Bootstrap下拉菜单
  const initDropdowns = () => {
    const dropdownElementList = document.querySelectorAll('.dropdown-toggle')
    if (window.bootstrap) {
      dropdownElementList.forEach(dropdownToggle => {
        // 移除click事件，改为hover触发
        const dropdown = new window.bootstrap.Dropdown(dropdownToggle, {
          // 禁用点击切换
          toggle: false
        })

        // 为dropdown父元素添加鼠标事件
        const dropdownLi = dropdownToggle.parentElement
        if (dropdownLi) {
          dropdownLi.addEventListener('mouseenter', () => {
            dropdown.show()
          })
          dropdownLi.addEventListener('mouseleave', () => {
            dropdown.hide()
          })
        }
      })
    }
  }

  // 确保Bootstrap已加载
  if (window.bootstrap) {
    initDropdowns()
  } else {
    // 如果Bootstrap尚未加载，等待一段时间后再尝试
    setTimeout(initDropdowns, 500)
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <nav
    class="navbar navbar-expand-lg navbar-light bg-white fixed-top"
    id="mainNav"
    :class="{ scrolled: isScrolled, hide: isHidden, show: !isHidden }"
  >
    <!-- 添加可调节的左右内边距容器 -->
    <div class="container-fluid custom-container">
      <a class="navbar-brand" href="javascript:void(0);">
        <img alt="UAI Logo" class="logo-img" :src="logoImg" />
      </a>

      <!-- 小屏幕时显示在右侧的登录注册按钮 -->
      <div class="d-flex d-lg-none ms-auto">
        <a
          href="javascript:void(0);"
          class="btn btn-outline-dark btn-sm me-2"
          @click="openLoginModal"
          >登录</a
        >
        <a href="javascript:void(0);" class="btn btn-dark btn-sm" @click="openRegisterModal"
          >注册</a
        >
      </div>

      <!-- 折叠菜单按钮 -->
      <button
        class="navbar-toggler ms-2"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto">
          <li class="nav-item active">
            <a class="nav-link" href="javascript:void(0);">
              <span class="nav-underline">首页</span>
              <span class="visually-hidden">(current)</span>
            </a>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="javascript:void(0);"
              id="navbarDropdown1"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span class="nav-underline">职业变现探索</span>
            </a>
            <div class="dropdown-menu">
              <a class="dropdown-item" href="javascript:void(0);">AI+logo设计师</a>
              <a class="dropdown-item" href="javascript:void(0);">AI+包装师</a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="javascript:void(0);">Something else here</a>
            </div>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="javascript:void(0);"
              id="navbarDropdown2"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span class="nav-underline">学习路径</span>
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
          <form class="d-flex my-2 my-lg-0 me-2 search-form-wrapper" @submit.prevent="search">
            <div class="position-relative" style="width: 450px; max-width: 100%">
              <input
                v-model="searchQuery"
                type="search"
                class="form-control search-input"
                placeholder="AI+logo设计师"
                aria-label="Search"
              />
              <button type="submit" class="search-btn-inside">
                <i class="fas fa-search"></i>
              </button>
            </div>
          </form>

          <!-- 购物车图标 -->
          <a href="javascript:void(0);" class="text-dark me-3 cart-link" @click="openCart">
            <i class="iconfont icon-gouwuche nav-cart-icon"></i>
            <span class="cart-underline"></span>
          </a>

          <!-- 大屏幕显示的登录注册按钮 -->
          <div class="ms-2 d-none d-lg-flex align-items-center">
            <button
              class="btn btn-outline-dark btn-login-fix me-2"
              type="button"
              @click="openLoginModal"
            >
              登录
            </button>
            <button class="btn btn-dark btn-register" type="button" @click="openRegisterModal">
              注册
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
/* 搜索框样式 */
.search-input {
  padding-right: 50px; /* 为内部按钮留出空间 */
  border-radius: 25px;
  border: 1px solid #1e7f98; /* 将默认边框颜色改为1e7f98 */
  font-size: 14px;
  height: 42px; /* 增加搜索框高度，原来大约是38px */
  line-height: 42px; /* 匹配高度 */
  padding-top: 0;
  padding-bottom: 0;
}

.search-input:focus {
  border-color: #1e7f98;
  box-shadow: 0 0 0 0.2rem rgba(194, 219, 254, 0.5); /* 将光晕效果颜色改为c2dbfe */
  outline: none;
}

/* 购物车图标样式 */
.nav-cart-icon {
  font-size: 22px;
  color: #000;
  margin-right: -2px;
}

/* �� 任务1-4: 放大镜按钮样式 */
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
  transition: all 0.3s ease;
}

/* 任务2: 悬停时颜色变化 */
.search-btn-inside:hover i,
.search-btn-inside:focus i {
  color: #f37000; /* 悬停色值 */
  font-size: 18px; /* 悬停时放大图标 */
  font-weight: bold; /* 悬停时加粗 */
  -webkit-text-stroke: 0.5px #f37000; /* 添加描边效果 */
  text-stroke: 0.5px #f37000; /* 添加描边效果 */
}

/* 悬停时的背景效果（可选） */
.search-btn-inside:hover {
  background-color: transparent; /* 移除悬停时的背景 */
}

/* 导航栏其他样式 */
.navbar {
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* 自定义容器 - 可调节左右边距 */
.custom-container {
  width: 100%;
  padding-right: var(--bs-gutter-x, 1.5rem);
  padding-left: var(--bs-gutter-x, 1.5rem);
  margin-right: auto;
  margin-left: auto;
  /* 🎛️ 调节左右边距 - 修改这两个值 */
  max-width: calc(100% - 100px) !important; /* 左右各留40px的边距 */
}

.navbar.scrolled {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
}

.navbar.hide {
  transform: translateY(-100%);
}

.navbar.show {
  transform: translateY(0);
}

/* 移除原有的强制容器位置样式 */
/* 🎯 强力控制容器位置 */
/* .container-fluid {
  margin-left: 0 !important;
  padding-left: 20px !important;
} */

/* Logo 品牌区域样式 */
.navbar-brand {
  margin-right: 0 !important;
  margin-left: 0 !important; /* 👈 强制logo左边距为0 */
  padding: 0 !important;
  position: relative !important;
  display: flex !important;
  align-items: center !important;
}

.logo-img {
  height: 28px; /* 调整logo高度 */
  width: auto;
  transition: transform 0.3s ease;
  margin-top: -10px; /* 向下微调位置 */
  margin-left: 1px; /* 向右微调位置 */
}

.navbar-brand:hover .logo-img {
  transform: scale(1.05);
}

/* 导航链接样式 */
.navbar-nav .nav-link {
  padding: 0.5rem 1rem;
  position: relative;
  transition: all 0.3s ease;
}

/* 移除下划线动画效果 */
.nav-underline {
  position: relative;
  display: inline-block;
}

/* 删除下划线效果 */
.nav-underline::after {
  display: none; /* 禁用下划线 */
}

/* 移除hover时的下划线效果 */
.nav-link:hover .nav-underline::after,
.nav-item.active .nav-underline::after {
  width: 0; /* 禁用下划线宽度动画 */
}

/* 去掉dropdown-toggle的淡蓝色外边框 */
.dropdown-toggle:focus {
  box-shadow: none !important;
  outline: none !important;
  border-color: transparent !important;
}

.nav-link:focus {
  box-shadow: none !important;
  outline: none !important;
  border-color: transparent !important;
}

/* 下拉菜单三角形方向变化 */
.dropdown-toggle::after {
  transition: transform 0.3s ease;
  display: inline-block;
}

/* hover时三角形向上 */
.nav-item:hover .dropdown-toggle::after {
  transform: rotate(180deg);
}

/* 移除hover效果 */
.nav-cart-icon:hover {
  transform: none;
  color: #000;
}

/* 底部带横线的购物车图标 */
.cart-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.cart-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
}

.cart-line {
  display: block;
  width: 24px;
  height: 2px;
  background-color: #333;
  margin-top: 2px;
  border-radius: 1px;
  transition: all 0.3s ease;
}

.cart-link:hover .cart-line {
  background-color: #f0690e;
  width: 28px;
}

/* 搜索框位置调整 - 可手动修改 */
.search-form-wrapper {
  /* 向左移动搜索框的CSS，可以手动调整这个值 */
  /* margin-left: -100px; 负值向左移动，正值向右移动 */
  transform: translateX(-50px);
}

/* 登录按钮样式 */
.btn-login-fix {
  width: 70px; /* 这里控制登录按钮的宽度，可以调整 */
  transition: all 0.3s ease;
}

.btn-login-fix:hover,
.btn-login-fix:active {
  background-color: #000 !important;
  color: #fff !important;
  border-color: #000 !important;
}

/* 注册按钮样式 */
.btn-register {
  width: 95px; /* 这里控制注册按钮的宽度，可以调整 */
  background-color: #000 !important; /* 纯黑背景 */
  border-color: #000 !important;
  color: #fff !important;
  transition: all 0.3s ease;
}

.btn-register:hover {
  background-color: #333333 !important; /* 略微变灰的颜色，可以调整 */
  border-color: #333333 !important;
}

/* 移动端优化 */
@media (max-width: 992px) {
  .right-group {
    width: 100%;
    justify-content: space-between;
    margin-top: 1rem;
  }
}

/* 购物车图标和下划线样式 */
.cart-link {
  position: relative;
  display: inline-block;
}

.cart-underline {
  position: absolute;
  bottom: 5px; /* 这里控制横线和图标的距离 */
  left: 0;
  width: 100%;
  height: 1.5px; /* 这里控制横线的粗细 */
  background-color: #000; /* 这里控制横线的颜色 */
  transform: translateX(1px);
}

.crown-icon {
  /* 渐变色设置 - 您可以调整颜色和透明度 */
  background: linear-gradient(
    135deg,
    rgba(240, 105, 14, 1) 0%,
    /* 起始颜色 f0690e 带透明度0.8 */ rgba(248, 160, 92, 0.6) 100%
  ); /* 结束颜色 f8a05c 带透明度0.6 */
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
  /* 可选：调整图标大小 */
  font-size: 18px;
}
</style>
