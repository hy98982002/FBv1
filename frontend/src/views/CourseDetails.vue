<!-- CourseDetails.vue - 课程详情主页面组件 -->
<template>
  <div class="course-details-page">
    <!-- 根据登录状态切换导航栏 -->
    <AuthNavbar v-if="authStore.isAuthenticated" />
    <Navbar v-else />

    <!-- 面包屑导航 -->
    <BreadcrumbNav :items="breadcrumbItems" />

    <!-- 课程详情主体 -->
    <section class="container">
      <!-- 课程封面和信息 -->
      <CourseHeroCard :courseInfo="courseInfo" />

      <!-- 选项卡和侧栏 -->
      <div class="row g-4">
        <div class="col-lg-8">
          <CourseTabs :defaultTab="activeTab" />
        </div>

        <div class="col-lg-4">
          <SidebarPricingCard />
        </div>
      </div>
    </section>

    <!-- 页脚 -->
    <footer class="mt-5 py-4 text-center text-white">
      <div class="container">
        <p class="mb-0">&copy; 2024 UAI教育平台. 保留所有权利.</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Navbar from '../components/Navbar.vue'
import AuthNavbar from '../components/AuthNavbar.vue'
import BreadcrumbNav from '../components/BreadcrumbNav.vue'
import CourseHeroCard from '../components/CourseHeroCard.vue'
import CourseTabs from '../components/CourseTabs.vue'
import SidebarPricingCard from '../components/SidebarPricingCard.vue'
import { useAuthStore } from '../store/authStore'
import type { BreadcrumbItem, CourseInfo } from '../types'

// 导入课程封面图片
import py04Image from '@/assets/images/course-details/py04.jpg'

// 使用 auth store
const authStore = useAuthStore()

// 面包屑数据
const breadcrumbItems = ref<BreadcrumbItem[]>([
  { title: '首页', href: '/', path: '/' },
  { title: 'Unity', href: '/category/unity', path: '/category/unity' },
  { title: '零基础photoshopAI创意设计第一季' }
])

// 当前激活的标签页
const activeTab = ref('catalog')

// 课程信息
const courseInfo = ref<CourseInfo>({
  title: '零基础photoshopAI创意设计第一季',
  coverImage: py04Image,
  difficulty: '适合初学者',
  updatedLessons: 25,
  isFree: true,
  price: 299
})

// 页面挂载后的初始化
onMounted(() => {
  console.log('课程详情页面已加载')
  // TODO: 根据路由参数加载课程数据
  // TODO: 检查用户登录状态
  // TODO: 记录页面访问日志
})
</script>

<style scoped>
/* 页面基础样式 */
.course-details-page {
  font-family: 'Alibaba PuHuiTi', '思源黑体', sans-serif;
  background-color: #f2f7f7;
  color: #111111;
  min-height: 100vh;
}

/* 页脚样式 */
footer {
  background-color: #1e7f98 !important;
  color: #fff !important;
}

/* 移动端适配 */
@media (max-width: 991.98px) {
  .col-lg-4 {
    margin-top: 2rem;
  }
}

/* 全局样式变量 */
:root {
  --uai-tech-blue: #1e7f98;
  --uai-light-blue: #bdecfd;
  --uai-hover-blue: rgba(35, 192, 247, 0.3);
  --uai-bg-gray: #f2f7f7;
  --uai-border-gray: rgba(222, 222, 222, 0.9);
}

/* 精确移除课程详情页侧边栏的蓝色边框 */
.course-details-page .col-lg-4 {
  border: none !important;
  outline: none !important;
}

.course-details-page .course-sidebar {
  border: none !important;
  outline: none !important;
}

/* 只针对侧边栏内的卡片移除边框，保留优惠券按钮 */
.course-details-page .course-sidebar .card:not(.coupon-btn) {
  border: none !important;
  outline: none !important;
}
</style>

<style>
/* 全局样式 */
body {
  font-family: 'Alibaba PuHuiTi', '思源黑体', sans-serif;
  background-color: #f2f7f7;
  color: #111111;
}

/* 确保Bootstrap图标正常显示 */
.fa,
.fas,
.far {
  font-family: 'Font Awesome 5 Free';
}

/* 确保阿里图标正常显示 */
.iconfont {
  font-family: 'iconfont' !important;
}
</style>
