<template>
  <div class="course-grid">
    <!-- 课程网格 -->
    <div class="row g-4" v-if="courses.length > 0">
      <CourseCard
        v-for="course in courses"
        :key="course.id"
        :course="course"
        :stage="stage"
        @card-click="handleCardClick"
        @add-to-cart="handleAddToCart"
        @watch-now="handleWatchNow"
      />
    </div>

    <!-- 空状态 -->
    <div v-else class="text-center py-5">
      <div class="empty-state">
        <i class="fas fa-graduation-cap text-muted mb-3" style="font-size: 3rem"></i>
        <h5 class="text-muted">暂无课程</h5>
        <p class="text-muted">该分类下暂时没有可用的课程</p>
      </div>
    </div>

    <!-- 加载更多按钮 -->
    <div v-if="showLoadMore" class="text-center mt-4">
      <button class="btn btn-outline-primary btn-lg" @click="handleLoadMore" :disabled="loading">
        <i v-if="loading" class="fas fa-spinner fa-spin me-2"></i>
        {{ loading ? '加载中...' : '查看更多课程' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import CourseCard from './CourseCard.vue'
import type { Course, StageKey } from '../types'

// Props定义
interface Props {
  courses: Course[]
  stage?: StageKey
  showLoadMore?: boolean
  loading?: boolean
}

const { courses, stage = undefined, showLoadMore = false, loading = false } = defineProps<Props>()

// Emits定义
const emit = defineEmits<{
  cardClick: [course: Course]
  addToCart: [course: Course]
  watchNow: [course: Course]
  loadMore: []
}>()

// 事件处理
const handleCardClick = (course: Course) => {
  emit('cardClick', course)
}

const handleAddToCart = (course: Course) => {
  emit('addToCart', course)
}

const handleWatchNow = (course: Course) => {
  emit('watchNow', course)
}

const handleLoadMore = () => {
  emit('loadMore')
}
</script>

<style scoped>
.course-grid {
  min-height: 400px;
}

.empty-state {
  padding: 2rem;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(2px); /* 降低磨玻璃强度保证文字清晰 */
  -webkit-backdrop-filter: blur(2px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.btn-outline-primary {
  border-radius: 25px;
  padding: 12px 30px;
  font-weight: 500;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
}

.btn-outline-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 123, 255, 0.3);
}

/* 响应式调整 */
@media (max-width: 768px) {
  .course-grid .row {
    margin: 0 -0.5rem;
  }

  .course-grid .row > * {
    padding: 0 0.5rem;
  }
}
</style>
