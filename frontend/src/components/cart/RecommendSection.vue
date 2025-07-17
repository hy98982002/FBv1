<template>
  <div class="recommend-section container mt-5 mb-5">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h5 class="m-0">猜你喜欢</h5>
      <a href="#" class="text-primary refresh-link" @click.prevent="$emit('refresh')">
        <i class="fas fa-sync-alt me-1"></i>换一换
      </a>
    </div>

    <!-- 推荐课程卡片列表 -->
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
      <div v-for="course in courses" :key="course.id" class="col">
        <div class="card h-100 course-card">
          <!-- 课程图片 -->
          <div class="course-image-wrapper">
            <img :src="course.image" class="card-img-top" :alt="course.title" />
            <div class="course-level-badge">{{ course.level }}</div>
          </div>

          <!-- 课程内容 -->
          <div class="card-body">
            <h6 class="card-title mb-2">{{ course.title }}</h6>

            <!-- 课程特点标签 -->
            <div class="course-features mb-3">
              <span
                v-for="(feature, index) in course.features"
                :key="index"
                class="badge bg-light text-dark me-1 mb-1"
              >
                {{ feature }}
              </span>
            </div>

            <!-- 学习人数和时长 -->
            <div class="course-meta text-muted small mb-3">
              <span>{{ course.studentCount }}人学习</span>
              <span class="mx-2">|</span>
              <span>{{ course.duration }}</span>
            </div>

            <!-- 价格和操作按钮 -->
            <div class="d-flex justify-content-between align-items-center">
              <div class="course-price">
                <span v-if="course.isFree" class="free-tag">免费</span>
                <span v-else class="price">¥{{ course.price?.toFixed(2) }}</span>
              </div>

              <div class="course-actions">
                <button
                  class="btn btn-sm btn-outline-primary me-2"
                  @click="$emit('view-course', course)"
                >
                  查看
                </button>
                <button class="btn btn-sm btn-primary" @click="$emit('add-to-cart', course)">
                  加入购物车
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import type { RecommendCourse } from '../../types/cart'

defineProps<{
  courses: RecommendCourse[]
}>()

defineEmits(['add-to-cart', 'view-course', 'refresh'])
</script>

<style scoped>
.recommend-section {
  background-color: #f8f9fa;
  padding: 2rem;
  border-radius: 0.5rem;
}

.refresh-link {
  text-decoration: none;
  font-size: 0.9rem;
}

.refresh-link:hover {
  text-decoration: underline;
}

.course-card {
  transition: transform 0.3s, box-shadow 0.3s;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.course-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
}

.course-image-wrapper {
  position: relative;
  overflow: hidden;
}

.course-image-wrapper img {
  height: 160px;
  object-fit: cover;
  transition: transform 0.5s;
}

.course-card:hover .course-image-wrapper img {
  transform: scale(1.05);
}

.course-level-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 0.2rem 0.5rem;
  border-radius: 3px;
  font-size: 0.8rem;
}

.card-title {
  font-size: 1rem;
  height: 3rem;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.course-features {
  min-height: 2rem;
}

.course-features .badge {
  font-weight: normal;
  background-color: #f1f1f1 !important;
  color: #666 !important;
}

.free-tag {
  color: #52c41a;
  font-weight: 600;
}

.price {
  color: #e63946;
  font-weight: 600;
}

.btn-outline-primary,
.btn-primary {
  font-size: 0.8rem;
  padding: 0.25rem 0.5rem;
}

.btn-outline-primary {
  border-color: #166d84;
  color: #166d84;
}

.btn-outline-primary:hover {
  background-color: #166d84;
  color: white;
}

.btn-primary {
  background-color: #166d84;
  border-color: #166d84;
}

.btn-primary:hover {
  background-color: #0e5a6f;
  border-color: #0e5a6f;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .course-actions {
    display: flex;
    flex-direction: column;
  }

  .course-actions .btn:first-child {
    margin-right: 0 !important;
    margin-bottom: 0.5rem;
  }
}
</style>
