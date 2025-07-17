<template>
  <section class="hero-carousel edge-fix">
    <div id="heroCarousel" class="carousel slide carousel-fade" data-bs-ride="carousel">
      <!-- 轮播指示器 -->
      <div class="carousel-indicators">
        <button
          v-for="(_, index) in carouselData"
          :key="index"
          type="button"
          data-bs-target="#heroCarousel"
          :data-bs-slide-to="index"
          :class="{ active: index === 0 }"
          :aria-label="`轮播图 ${index + 1}`"
        ></button>
      </div>

      <!-- 轮播内容 -->
      <div class="carousel-inner">
        <div
          v-for="(slide, index) in carouselData"
          :key="index"
          class="carousel-item"
          :class="{ active: index === 0 }"
        >
          <div class="carousel-bg">
            <img :src="slide.image" alt="" class="carousel-img" />
          </div>

          <div class="container-fluid p-0">
            <div class="row align-items-center carousel-content-row">
              <div class="col-lg-6 mx-auto">
                <!-- 课程说明卡片背景 -->
                <div class="hero-content-card">
                  <div class="hero-content">
                    <h1 class="hero-title" data-aos="fade-up">
                      {{ slide.title }}
                    </h1>
                    <p class="hero-subtitle" data-aos="fade-up" data-aos-delay="200">
                      {{ slide.subtitle }}
                    </p>
                    <div class="hero-buttons" data-aos="fade-up" data-aos-delay="400">
                      <a href="javascript:void(0);" class="start-learn-btn">立即学习</a>
                      <a href="javascript:void(0);" class="learn-more-btn">了解更多</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 轮播控制按钮 -->
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#heroCarousel"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon"></span>
        <span class="visually-hidden">上一张</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#heroCarousel"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon"></span>
        <span class="visually-hidden">下一张</span>
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import heroImage from '@/assets/images/HeroCarousel-1.jpg'

// 轮播数据
const carouselData = ref([
  {
    id: 1,
    title: '掌握前沿AI技术',
    subtitle: '从机器学习到深度学习，全面掌握人工智能核心技术，开启智能时代职业新篇章',
    image: heroImage,
    primaryButton: {
      text: '立即学习',
      action: () => console.log('立即学习AI技术')
    },
    secondaryButton: {
      text: '了解更多',
      action: () => console.log('了解更多AI技术')
    }
  },
  {
    id: 2,
    title: '成为Python全栈工程师',
    subtitle: '系统学习Python Web开发，掌握Django、Flask框架，打造完整的全栈开发能力',
    image: heroImage,
    primaryButton: {
      text: '开始编程',
      action: () => console.log('开始Python编程')
    },
    secondaryButton: {
      text: '查看课程',
      action: () => console.log('查看Python课程')
    }
  },
  {
    id: 3,
    title: '现代前端开发精通',
    subtitle: 'Vue3、React18、TypeScript全面掌握，构建高性能现代化Web应用',
    image: heroImage,
    primaryButton: {
      text: '立即体验',
      action: () => console.log('立即体验前端开发')
    },
    secondaryButton: {
      text: '免费试听',
      action: () => console.log('免费试听前端课程')
    }
  },
  {
    id: 4,
    title: '企业级DevOps实践',
    subtitle: '掌握Docker、Kubernetes、CI/CD流水线，成为企业级运维专家',
    image: heroImage,
    primaryButton: {
      text: '深度学习',
      action: () => console.log('深度学习DevOps')
    },
    secondaryButton: {
      text: '获取资料',
      action: () => console.log('获取DevOps资料')
    }
  }
])

onMounted(() => {
  // 可以在这里添加轮播图初始化逻辑
  console.log('轮播图组件已加载')
})
</script>

<style scoped>
.hero-carousel {
  position: relative;
  /* 按原始比例1340x400设置高度，并添加导航栏间距 */
  height: 400px;
  max-width: 1340px;
  margin: 0 auto 0 auto;
  overflow: hidden;
  border-radius: 0; /* 将15px改为0，移除圆角 */
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);

  /* === 强力修复边缘虚化问题 === */

  /* 1. 强制硬件加速和像素对齐 */
  transform: translate3d(0, 0, 0);
  -webkit-transform: translate3d(0, 0, 0);
  will-change: transform;

  /* 2. 强制整数像素位置 */
  left: 0;
  top: 0;

  /* 3. 禁用亚像素渲染 */
  -webkit-font-smoothing: subpixel-antialiased;
  -moz-osx-font-smoothing: auto;

  /* 4. 强制边缘清晰 - 关键修复 */
  outline: 1px solid transparent;

  /* 5. 确保容器在像素边界上 */
  width: 100%;
  contain: layout style paint;

  /* 6. 强制边缘像素完美对齐 */
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;

  /* 7. 强制浏览器渲染优化 */
  isolation: isolate;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  perspective: 1000px;
  -webkit-perspective: 1000px;

  /* 8. 强制GPU层合成 */
  filter: blur(0);

  /* 9. 修复Safari边缘虚化 */
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;

  /* 10. 防止边缘反锯齿 */
  shape-rendering: crispEdges;

  /* 11. 强制边界框精确计算 */
  box-sizing: border-box;

  /* 12. 额外的边缘修复 */
  -webkit-mask-image: -webkit-radial-gradient(white, black);
}

.carousel {
  height: 100%;
  /* 确保轮播容器边缘清晰 */
  transform: translate3d(0, 0, 0);
  -webkit-transform: translate3d(0, 0, 0);
  will-change: transform;
  contain: layout style paint;
}

.carousel-item {
  height: 400px;
  position: relative;
  /* 防止边缘模糊 */
  transform: translate3d(0, 0, 0);
  -webkit-transform: translate3d(0, 0, 0);
  will-change: transform;
  contain: layout style paint;
}

.carousel-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;

  /* === 强力修复背景图片边缘虚化 === */

  /* 1. 硬件加速 */
  transform: translate3d(0, 0, 0);
  -webkit-transform: translate3d(0, 0, 0);
  will-change: transform;

  /* 2. 强制图片边缘清晰 */
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;

  /* 3. 布局优化 */
  contain: layout style paint;

  /* 4. 强制精确边界 */
  box-sizing: border-box;

  /* 5. 禁用边缘平滑 */
  -webkit-font-smoothing: subpixel-antialiased;

  /* 6. 强制像素边界对齐 */
  outline: 1px solid transparent;

  /* 7. 修复边缘模糊 */
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;

  /* 8. 强制GPU渲染 */
  filter: blur(0);

  /* 9. 边缘锐化 */
  shape-rendering: crispEdges;
}

.carousel-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;

  /* === 图片边缘锐化修复 === */

  /* 1. 强制像素精确渲染 */
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;

  /* 2. 硬件加速 */
  transform: translate3d(0, 0, 0);
  -webkit-transform: translate3d(0, 0, 0);
  will-change: transform;

  /* 3. 强制边缘对齐 */
  outline: 1px solid transparent;

  /* 4. 禁用边缘平滑 */
  -webkit-font-smoothing: subpixel-antialiased;

  /* 5. 强制像素边界 */
  box-sizing: border-box;

  /* 6. 修复边缘虚化 */
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;

  /* 7. 强制GPU层 */
  filter: blur(0);

  /* 8. 边缘锐化 */
  shape-rendering: crispEdges;

  /* 9. 防止子像素移动 */
  position: relative;
  top: 0;
  left: 0;
}

.carousel-content-row {
  height: 400px;
  margin: 0;
}

/* 课程说明卡片容器 - 轻度磨玻璃保证文字清晰 */
.hero-content-card {
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(4px); /* 降低磨玻璃强度 */
  -webkit-backdrop-filter: blur(4px);
  border-radius: 0; /* 移除圆角 */
  padding: 30px 25px;
  margin: 0 auto;
  max-width: 500px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1), 0 4px 20px rgba(0, 0, 0, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
  z-index: 10;
  transform: translateY(0);
  translate: -240px 0; /* 更现代写法，向左平移 30px */
  transition: all 0.3s ease;
}

.hero-content-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.15), 0 6px 25px rgba(0, 0, 0, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);
}

.hero-content {
  position: relative;
  z-index: 10;
  color: #2c3e50;
  text-shadow: none;
}

.hero-title {
  font-size: 2.2rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1rem;
  color: #1a202c;
  text-shadow: none;
}

.hero-subtitle {
  font-size: 1rem;
  line-height: 1.5;
  margin-bottom: 1.5rem;
  color: #4a5568;
  opacity: 1;
  text-shadow: none;
}

.hero-buttons {
  margin-top: 2rem;
}

/* 按钮共同样式 */
.learn-more-btn,
.start-learn-btn {
  border: 1px solid #1e7f98;
  border-radius: 25px;
  padding: 8px 24px;
  text-decoration: none;
  transition: all 0.3s ease;
  display: inline-block;
}

/* 立即学习按钮 - 使用更高的优先级 */
.start-learn-btn {
  margin-right: 1rem !important;
  background-color: #1e7f98 !important;
  color: #000 !important;
  border-color: #1e7f98 !important;
}

.start-learn-btn:hover,
.start-learn-btn:active {
  background-color: #1e7f98 !important;
  color: #fff !important;
  text-decoration: none;
}

/* 了解更多按钮 */
.learn-more-btn {
  color: #1e7f98;
  background-color: transparent;
}

.learn-more-btn:hover {
  text-decoration: none;
  color: #1e7f98;
}

.btn-tech-blue {
  background: linear-gradient(135deg, #1e7f98, #2a9bb8);
  border: none;
  border-radius: 0; /* 移除圆角 */
  padding: 10px 25px;
  font-weight: 600;
  font-size: 0.95rem;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  box-shadow: 0 6px 20px rgba(30, 127, 152, 0.3);
}

.btn-tech-blue:hover {
  background: linear-gradient(135deg, #166d84, #228ba1);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(30, 127, 152, 0.4);
}

.btn-outline-light {
  border: 2px solid #1e7f98;
  color: #1e7f98;
  background: transparent;
  border-radius: 25px;
  padding: 8px 23px;
  font-weight: 600;
  font-size: 0.95rem;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
}

.btn-outline-light:hover {
  background: #1e7f98;
  border-color: #1e7f98;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(30, 127, 152, 0.3);
}

.hero-features .badge {
  padding: 5px 10px;
  font-size: 0.8rem;
  font-weight: 500;
  border-radius: 15px;
  box-shadow: 0 2px 8px rgba(30, 127, 152, 0.15);
  background: rgba(30, 127, 152, 0.1) !important;
  color: #1e7f98 !important;
  border: 1px solid rgba(30, 127, 152, 0.2);
  transition: all 0.3s ease;
}

.hero-features .badge:hover {
  background: rgba(30, 127, 152, 0.15) !important;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(30, 127, 152, 0.2);
}

/* === 终极边缘虚化修复方案 === */

/* 1. 全局子元素边缘锐化 */
.hero-carousel *,
.hero-carousel *::before,
.hero-carousel *::after {
  /* 强制硬件加速 */
  transform: translate3d(0, 0, 0);
  -webkit-transform: translate3d(0, 0, 0);
  will-change: auto;

  /* 禁用子像素渲染 */
  -webkit-font-smoothing: subpixel-antialiased;
  -moz-osx-font-smoothing: auto;

  /* 强制边缘对齐 */
  box-sizing: border-box;

  /* 强制像素完美边缘 */
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;

  /* 防止边缘模糊 */
  outline: 1px solid transparent;
}

/* 2. 专门解决左边和底边虚化问题 */
.hero-carousel::before {
  content: '';
  position: absolute;
  top: -1px;
  left: -1px;
  right: -1px;
  bottom: -1px;
  border-radius: 16px;
  pointer-events: none;
  z-index: -1;
  background: transparent;
  border: 1px solid transparent;
  transform: translate3d(0, 0, 0);
}

/* 3. 强制容器边缘精确渲染 */
.hero-carousel::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 15px;
  pointer-events: none;
  z-index: 1000;
  background: transparent;
  outline: 1px solid transparent;
  transform: translate3d(0, 0, 0);
}

/* 轮播控制器样式 */
.carousel-control-prev,
.carousel-control-next {
  width: 5%;
  opacity: 0.8;
  transition: opacity 0.3s ease;
}

/* Offset controls slightly from edges to prevent border blur */
.carousel-control-prev {
  left: 1rem;
}

.carousel-control-next {
  right: 1rem;
}

.carousel-control-prev:hover,
.carousel-control-next:hover {
  opacity: 1;
}

.carousel-control-prev-icon,
.carousel-control-next-icon {
  width: 2.5rem;
  height: 2.5rem;
  background-size: 50%;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(3px); /* 降低磨玻璃强度 */
  -webkit-backdrop-filter: blur(3px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2), 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.carousel-control-prev-icon {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23000'%3e%3cpath d='m11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z'/%3e%3c/svg%3e") !important;
}

.carousel-control-next-icon {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23000'%3e%3cpath d='m4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z'/%3e%3c/svg%3e") !important;
}

.carousel-control-prev:hover .carousel-control-prev-icon,
.carousel-control-next:hover .carousel-control-next-icon {
  background-color: rgba(255, 255, 255, 0.3);
  border-color: rgba(255, 255, 255, 0.4);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15), 0 3px 12px rgba(0, 0, 0, 0.1);
}

/* 指示器样式 */
.carousel-indicators {
  bottom: 20px;
}

.carousel-indicators button {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.5);
  background: transparent;
  transition: all 0.3s ease;
}

.carousel-indicators button.active {
  background: white;
  border-color: white;
  transform: scale(1.2);
}

/* === Mac设备专用边缘修复 === */
@media (-webkit-min-device-pixel-ratio: 2) {
  .hero-carousel {
    /* Mac Retina显示器专用修复 */
    -webkit-transform: translate3d(0.5px, 0.5px, 0);
    transform: translate3d(0.5px, 0.5px, 0);

    /* 强制子像素渲染对齐 */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .carousel-img {
    /* 高DPI屏幕图片锐化 */
    image-rendering: -webkit-optimize-contrast;
    image-rendering: optimize-contrast;
    -ms-interpolation-mode: nearest-neighbor;
  }
}

/* === 针对Safari浏览器的特殊修复 === */
@supports (-webkit-appearance: none) {
  .hero-carousel {
    /* Safari专用边缘修复 */
    -webkit-mask-image: -webkit-radial-gradient(white, black);
    -webkit-transform-style: preserve-3d;
    transform-style: preserve-3d;
  }
}

/* === 终极边缘修复类 === */
.edge-fix {
  /* 强制整数像素位置 */
  position: relative;
  top: 0;
  left: 0;

  /* 强制像素完美边缘 */
  -webkit-transform: translateZ(0);
  transform: translateZ(0);

  /* 修复子像素偏移 */
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;

  /* 强制GPU渲染 */
  will-change: transform;

  /* 边缘锐化 */
  image-rendering: -webkit-optimize-contrast;
  image-rendering: pixelated;

  /* 防止边缘模糊 */
  filter: blur(0);

  /* 强制边界对齐 */
  outline: 1px solid transparent;
}

/* 响应式设计 */
@media (max-width: 1400px) {
  .hero-carousel {
    max-width: 95%;
    margin: 80px auto 0 auto;
  }
}

@media (max-width: 768px) {
  .hero-carousel {
    height: 350px;
    margin: 70px 15px 0 15px;
    border-radius: 12px;
  }

  .carousel-item {
    height: 350px;
  }

  .carousel-content-row {
    height: 350px;
  }

  .hero-content-card {
    padding: 25px 20px;
    margin: 0 10px;
    border-radius: 12px;
    max-width: 90%;
  }

  .hero-title {
    font-size: 1.8rem;
  }

  .hero-subtitle {
    font-size: 0.9rem;
  }

  .btn-tech-blue,
  .btn-outline-light {
    padding: 8px 20px;
    font-size: 0.85rem;
    margin-bottom: 8px;
  }

  .hero-features .badge {
    font-size: 0.75rem;
    padding: 4px 8px;
  }
}

@media (max-width: 576px) {
  .hero-carousel {
    height: 300px;
    margin: 65px 10px 0 10px;
  }

  .carousel-item {
    height: 300px;
  }

  .carousel-content-row {
    height: 300px;
  }

  .hero-content-card {
    padding: 20px 15px;
    border-radius: 10px;
  }

  .hero-title {
    font-size: 1.5rem;
  }

  .hero-subtitle {
    font-size: 0.85rem;
  }
}

/* 动画效果 - 确保动画也不会造成边缘虚化 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translate3d(0, 30px, 0);
    -webkit-transform: translate3d(0, 30px, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
    -webkit-transform: translate3d(0, 0, 0);
  }
}

.hero-content > * {
  animation: fadeInUp 0.8s ease-out forwards;
}

.hero-content > *:nth-child(2) {
  animation-delay: 0.2s;
}

.hero-content > *:nth-child(3) {
  animation-delay: 0.4s;
}

.hero-content > *:nth-child(4) {
  animation-delay: 0.6s;
}
</style>
