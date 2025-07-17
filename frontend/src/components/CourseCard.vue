<template>
  <div class="col-sm-6 col-md-3 mb-4">
    <a
      class="card-link-no-underline"
      href="#"
      @click.prevent="handleCardClick"
      @keydown.enter="handleCardClick"
      @keydown.space.prevent="handleCardClick"
      tabindex="0"
    >
      <div class="card h-100 card-glass">
        <div
          class="card-img-top"
          :style="{ backgroundImage: `url(${course.cover})` }"
          :aria-label="`课程封面 - ${course.title}`"
          role="img"
        ></div>

        <div class="card-body">
          <!-- 文字区域磨玻璃背景 - 不覆盖图片 -->
          <div class="glass-background-text low-blur"></div>
          <p class="card-text">{{ course.title }}</p>

          <!-- 评分显示 -->
          <div v-if="course.rating" class="d-flex align-items-center mt-2">
            <span class="rating-number-clear me-1">{{ course.rating.toFixed(1) }}</span>
            <StarRating :rating="course.rating" size="small" class="me-2" />
            <span v-if="displayReviewCount" class="review-count-clear"
              >({{ displayReviewCount }})</span
            >
          </div>
        </div>

        <!-- 卡片底部信息 -->
        <div class="card-footer">
          <!-- 底部区域磨玻璃背景 - 不覆盖图片 -->
          <div class="glass-background-text low-blur"></div>
          <span :class="levelStyleClass">{{ displayLevel }}</span>
          <span class="learner-count-clear ms-2">
            <i class="fas fa-user"></i> {{ displayLearnerCount }}
          </span>

          <!-- 价格显示 -->
          <span v-if="isFreeDisplay" class="text-success ms-2"> 免费 </span>
          <span v-else class="text-danger ms-2"> ¥{{ displayPrice }}.00 </span>
        </div>

        <!-- hover详情弹窗 -->
        <div class="course-pop" data-track="view_card">
          <h6 class="fw-bold mb-2">{{ course.title }}</h6>

          <span v-if="course.badge" class="badge bg-info mb-2">
            {{ course.badge }}
          </span>

          <p class="course-info-clear">
            总共 {{ course.duration || '45 小时' }} · {{ course.level || '入门级别' }}
          </p>

          <ul class="ps-3 small mb-3">
            <li>精心设计的实战课程内容</li>
            <li>从基础到进阶的系统学习</li>
            <li>实用技能快速提升</li>
            <li v-if="course.instructor">讲师：{{ course.instructor }}</li>
          </ul>

          <button
            class="btn btn-tech-blue w-100 mb-2"
            @click.stop="handleAddToCart"
            data-track="add_to_cart"
          >
            添加入购物车
          </button>

          <button class="btn btn-watch-now w-100" @click.stop="handleWatchNow">立即观看</button>
        </div>
      </div>
    </a>
  </div>
</template>

<script setup lang="ts">
import { computed, toRefs } from 'vue'
import type { Course, StageKey } from '../types'
import StarRating from './StarRating.vue'
import {
  // STAGE_STYLES,  // 暂时注释未使用的导入
  getTemplateFromImagePath,
  generateCourseData
  // type CourseCardTemplate  // 暂时注释未使用的类型
} from '../types'

// Props定义
interface Props {
  course: Course
  stage?: StageKey
}

const props = withDefaults(defineProps<Props>(), {
  stage: undefined
})

// 解构props以便在模板中使用
const { course } = toRefs(props)
// const { course, stage } = toRefs(props)  // stage暂时未使用

// Emits定义
const emit = defineEmits<{
  cardClick: [course: Course]
  addToCart: [course: Course]
  watchNow: [course: Course]
}>()

// 响应式数据（无需额外状态）

// 计算属性
// 暂时注释未使用的计算属性
// const actualStage = computed(() => stage?.value || course.value.stage)

// const stageStyle = computed(() => {
//   return STAGE_STYLES[actualStage.value] || STAGE_STYLES.free
// })

// 根据图片路径自动获取模板类型和生成数据
const cardTemplate = computed(() => getTemplateFromImagePath(course.value.cover))

const dynamicCardData = computed(() => {
  return generateCourseData(cardTemplate.value)
})

// 获取显示的价格（优先使用course中的价格，否则使用模板生成的）
const displayPrice = computed(() => {
  if (course.value.price !== undefined) return course.value.price
  return dynamicCardData.value.price
})

// 获取显示的学员数（优先使用course中的数据，否则使用模板生成的）
const displayLearnerCount = computed(() => {
  return course.value.learnerCount || dynamicCardData.value.learnerCount
})

// 获取显示的等级（优先使用course中的level，否则使用模板生成的）
const displayLevel = computed(() => {
  return course.value.level || dynamicCardData.value.level
})

// 判断是否免费（优先使用course中的isFree，否则使用模板判断）
const isFreeDisplay = computed(() => {
  if (course.value.isFree !== undefined) return course.value.isFree
  return dynamicCardData.value.isFree
})

// 暂时注释未使用的计算属性
// const isVipDisplay = computed(() => {
//   return course.value.isVip || dynamicCardData.value.isVip
// })

// 获取等级样式类
const levelStyleClass = computed(() => {
  const style = dynamicCardData.value.levelStyle
  return `text-${style}`
})

// 星级评分现在使用自定义StarRating组件，不再需要getStarClass函数

// Add displayReviewCount computed for rating fallback
const displayReviewCount = computed(() => {
  return course.value.reviewCount || course.value.learnerCount || course.value.enrolled || 0
})

// 事件处理函数
const handleCardClick = () => {
  emit('cardClick', course.value)
}

const handleAddToCart = () => {
  emit('addToCart', course.value)
}

const handleWatchNow = () => {
  emit('watchNow', course.value)
}
</script>

<style scoped>
/* 卡片链接去除下划线 & 保持文字颜色 */
.card-link-no-underline {
  text-decoration: none;
  color: inherit;
}

.card-link-no-underline:hover,
.card-link-no-underline:focus,
.card-link-no-underline:active {
  text-decoration: none;
  color: inherit;
}

/* 自定义星星评分组件已完全替代FontAwesome星星 */
/* 不再需要FontAwesome星星相关的保护样式 */

/* 评分数字清晰显示 */
.rating-number-clear {
  color: #ffc107 !important;
  font-size: 16px !important;
  font-weight: 600 !important;
  /* 确保文字清晰渲染 */
  -webkit-font-smoothing: antialiased !important;
  -moz-osx-font-smoothing: grayscale !important;
  text-rendering: optimizeLegibility !important;
  /* 禁用任何可能导致模糊的效果 */
  filter: none !important;
  backdrop-filter: none !important;
  transform: none !important;
  /* 确保字体边缘锐利 */
  font-feature-settings: normal !important;
  font-variant-ligatures: none !important;
}

/* 评价人数清晰显示 */
.review-count-clear {
  color: #666 !important;
  font-size: 14px !important;
  font-weight: 400 !important;
  /* 确保文字清晰渲染 */
  -webkit-font-smoothing: antialiased !important;
  -moz-osx-font-smoothing: grayscale !important;
  text-rendering: optimizeLegibility !important;
  /* 禁用任何可能导致模糊的效果 */
  filter: none !important;
  backdrop-filter: none !important;
  transform: none !important;
  /* 确保字体边缘锐利 */
  font-feature-settings: normal !important;
  font-variant-ligatures: none !important;
}

/* 学员数清晰显示 */
.learner-count-clear {
  color: #666 !important;
  font-size: 14px !important;
  font-weight: 400 !important;
  /* 确保文字清晰渲染 */
  -webkit-font-smoothing: antialiased !important;
  -moz-osx-font-smoothing: grayscale !important;
  text-rendering: optimizeLegibility !important;
  /* 禁用任何可能导致模糊的效果 */
  filter: none !important;
  backdrop-filter: none !important;
  transform: none !important;
  /* 确保字体边缘锐利 */
  font-feature-settings: normal !important;
  font-variant-ligatures: none !important;
}

/* 课程信息清晰显示 */
.course-info-clear {
  color: #666 !important;
  font-size: 15px !important;
  font-weight: 400 !important;
  margin-bottom: 16px !important;
  /* 确保文字清晰渲染 */
  -webkit-font-smoothing: antialiased !important;
  -moz-osx-font-smoothing: grayscale !important;
  text-rendering: optimizeLegibility !important;
  /* 禁用任何可能导致模糊的效果 */
  filter: none !important;
  backdrop-filter: none !important;
  transform: none !important;
  /* 确保字体边缘锐利 */
  font-feature-settings: normal !important;
  font-variant-ligatures: none !important;
}

/* 卡片容器 - 文字层清晰 */
.card-glass {
  position: relative;
  background: rgba(255, 255, 255, 0.85);
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  overflow: visible; /* 恢复可见，让弹出卡能显示 */
  padding: 0 !important; /* 移除所有内边距 */
  z-index: 10; /* 确保文字层在磨玻璃背景之上 */
}

/* 强制覆盖Bootstrap卡片样式 */
.card-glass.card {
  border: 1px solid rgba(255, 255, 255, 0.3) !important;
  border-radius: 18px !important;
}

.card-glass .card-img-top:first-child {
  border-radius: 18px 18px 0 0 !important;
  margin-top: 0 !important;
}

.card-glass:hover {
  transform: none;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.15);
  z-index: 10000 !important; /* 确保卡片hover时z-index足够高，但低于弹出卡 */
  position: relative !important; /* 确保z-index生效 */
}

.card-img-top {
  border-radius: 18px 18px 0 0 !important;
  transition: all 0.3s ease-in-out;
  height: 200px !important; /* 固定高度 */
  width: 100% !important;
  background-size: cover !important; /* 背景图片覆盖整个容器 */
  background-position: center !important; /* 背景图片居中 */
  background-repeat: no-repeat !important; /* 不重复 */
  display: block !important;
  margin: 0 !important;
  padding: 0 !important;
  border: none !important;
  overflow: hidden !important; /* 只对图片区域进行裁剪 */

  /* 彻底的图片清晰度优化 */
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
  filter: none !important;
  -webkit-filter: none !important;
  -moz-filter: none !important;
  -o-filter: none !important;
  -ms-filter: none !important;

  /* 强制图片锐利渲染 */
  image-rendering: -webkit-optimize-contrast !important;
  image-rendering: crisp-edges !important;
  image-rendering: pixelated !important;
  image-rendering: auto !important;

  /* 启用硬件加速保证清晰 */
  transform: translateZ(0) !important;
  -webkit-transform: translateZ(0) !important;
  will-change: auto !important;
  -webkit-backface-visibility: hidden !important;
  backface-visibility: hidden !important;

  /* 移除可能影响的混合模式和字体设置 */
  mix-blend-mode: normal !important;
  -webkit-mix-blend-mode: normal !important;
  -webkit-font-smoothing: initial !important;
  -moz-osx-font-smoothing: initial !important;
  text-rendering: auto !important;

  /* 强制移除任何模糊相关属性 */
  opacity: 1 !important;
  visibility: visible !important;
}

/* 文字区域专用磨玻璃背景 - 不影响图片 */
.glass-background-text {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  pointer-events: none;
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
}

/* 卡片主体样式 - 文字清晰 */
.card-body {
  position: relative;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.85);
  z-index: 15; /* 确保文字层在背景之上 */
}

.card-footer {
  position: relative;
  background: rgba(255, 255, 255, 0.85) !important;
  border-top: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 0 0 18px 18px !important;
  border-top: none;
  overflow: hidden;
  z-index: 15; /* 确保文字层在背景之上 */
}

/* 详情弹窗样式 - 轻度磨玻璃保证文字清晰 */
.course-pop {
  /* 🎛️ 快速调节命令：
   * 更快消失：改为 0.1s 或 0.08s
   * 更慢消失：改为 0.2s 或 0.25s
   * 立即消失：改为 0s
   */
  --fade-out-duration: 0s; /* 🎛️ 调节这个值来控制消失渐隐时间 */
  --fade-in-duration: 0.3s; /* 🎛️ 调节这个值来控制出现时间 */

  position: absolute;
  top: 12px;
  left: 100%;
  margin-left: 16px;
  margin-top: -15px;
  width: 340px;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(3px); /* 降低磨玻璃强度 */
  -webkit-backdrop-filter: blur(3px);
  border: 1px solid rgba(22, 109, 132, 0.1);
  border-radius: 18px;
  box-shadow: 0 8px 32px rgba(30, 127, 152, 0.06), 0 2px 8px rgba(30, 127, 152, 0.04),
    inset 0 0 0 1px rgba(255, 255, 255, 0.6);
  padding: 24px;
  opacity: 0;
  visibility: hidden;
  transform: translateX(12px) scale(0.96);
  /* 消失时的渐隐效果 */
  transition: opacity var(--fade-out-duration) ease-out, transform var(--fade-out-duration) ease-out,
    visibility var(--fade-out-duration);
  pointer-events: none;
  z-index: 10001 !important; /* 提高z-index确保不被遮盖 */
}

/* 小尖角优化 - 轻度磨玻璃 */
.course-pop::before {
  content: '';
  position: absolute;
  left: -9px;
  top: 120px;
  width: 18px;
  height: 18px;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(3px); /* 降低磨玻璃强度 */
  -webkit-backdrop-filter: blur(3px);
  border: 1px solid rgba(30, 127, 152, 0.08);
  border-right: none;
  border-bottom: none;
  transform: rotate(-45deg);
  box-shadow: inset 1px 1px 0 rgba(255, 255, 255, 0.6);
}

/* 内容样式优化 */
.course-pop h6 {
  font-size: 20px;
  font-weight: 500; /* 统一调整为500 */
  color: #1a1a1a;
  margin-bottom: 16px;
  letter-spacing: 0.5px;
}

.course-pop .badge {
  background: rgba(30, 127, 152, 0.08);
  color: #1e7f98;
  font-weight: 500;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 14px;
}

.course-pop .text-muted {
  color: #444 !important;
  font-size: 15px;
}

.course-pop ul {
  margin: 16px 0;
  padding-left: 20px;
}

.course-pop ul li {
  color: #333;
  margin-bottom: 12px;
  font-size: 15px;
  position: relative;
  list-style: none;
}

.course-pop ul li::before {
  content: '•';
  color: #1e7f98;
  font-weight: bold;
  position: absolute;
  left: -15px;
}

/* ≥lg 屏幕启用 hover 弹窗 */
@media (min-width: 992px) {
  /* 确保所有hover的卡片容器都有最高层级 */
  .col-sm-6.col-md-3:hover,
  .col-md-3:hover {
    z-index: 10000 !important;
    position: relative !important;
  }

  .card:hover .course-pop {
    opacity: 1;
    visibility: visible;
    transform: translateX(0) scale(1);
    pointer-events: auto;
    z-index: 10001 !important; /* 确保弹出卡在所有元素之上 */
    /* 弹出时有动画效果 */
    transition: opacity var(--fade-in-duration) cubic-bezier(0.4, 0, 0.2, 1),
      transform var(--fade-in-duration) cubic-bezier(0.4, 0, 0.2, 1), visibility 0s; /* 立即显示，无延迟 */
  }

  .card:hover .course-pop,
  .course-pop:hover {
    opacity: 1;
    visibility: visible;
    transform: translateX(0) scale(1);
    pointer-events: auto;
    z-index: 10001 !important; /* 确保弹出卡在所有元素之上 */
    /* 弹出时有动画效果 */
    transition: opacity var(--fade-in-duration) cubic-bezier(0.4, 0, 0.2, 1),
      transform var(--fade-in-duration) cubic-bezier(0.4, 0, 0.2, 1), visibility 0s; /* 立即显示，无延迟 */
  }

  /* 桥接功能 - 连接卡片和弹出卡的不可见区域 */
  .card:hover::after {
    content: '';
    position: absolute;
    top: 0;
    left: 100%;
    width: 24px;
    height: 100%;
    z-index: 10000 !important; /* 确保桥接区域不被遮盖 */
  }

  /* 右侧卡片特殊处理 */
  .col-md-3:nth-child(4n) .course-pop {
    left: auto;
    right: 100%;
    margin-left: 0;
    margin-right: 16px;
    transform: translateX(-12px) scale(0.96);
  }

  .col-md-3:nth-child(4n) .course-pop::before {
    left: auto;
    right: -9px;
    top: 120px;
    transform: rotate(135deg);
  }

  .col-md-3:nth-child(4n) .card:hover .course-pop {
    transform: translateX(0) scale(1);
  }

  /* 右侧卡片的桥接功能 */
  .col-md-3:nth-child(4n) .card:hover::before {
    content: '';
    position: absolute;
    top: 0;
    right: 100%;
    width: 24px;
    height: 100%;
    z-index: 10000 !important; /* 确保桥接区域不被遮盖 */
  }
}

/* 按钮样式 */
.course-pop .btn-tech-blue {
  background: #1e7f98;
  color: #ffffff;
  border: none;
  border-radius: 25px;
  padding: 10px 24px;
  font-size: 15px;
  font-weight: 500;
  transition: all 0.3s ease;
  text-transform: none;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 15px rgba(30, 127, 152, 0.2);
  width: 100%;
}

.course-pop .btn-tech-blue:hover {
  background: #166d84;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(30, 127, 152, 0.3);
  color: #ffffff;
}

.course-pop .btn-watch-now {
  border: 1px solid #1e7f98;
  color: #333;
  background: transparent;
  border-radius: 25px;
  padding: 10px 24px;
  font-size: 15px;
  font-weight: 500;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  width: 100%;
}

.course-pop .btn-watch-now:hover {
  background: #1e7f98 !important;
  color: #fff !important;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(30, 127, 152, 0.3);
}
</style>
