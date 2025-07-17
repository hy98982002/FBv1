<!-- CourseReviews.vue - 课程评价组件 -->
<template>
  <div class="bg-white rounded p-3">
    <h4 class="mt-5 mb-3">学员评价</h4>
    <div class="review-list bg-white rounded p-3">
      <!-- 评价输入区域 -->
      <div class="mb-4">
        <textarea
          class="form-control"
          rows="6"
          placeholder="写下您对课程的评价..."
          v-model="newReviewContent"
          style="border: 1px solid rgba(30, 127, 152, 0.3); border-radius: 8px; resize: none"
        ></textarea>
      </div>

      <!-- 星级评分 -->
      <div class="d-flex align-items-center justify-content-between">
        <div class="stars">
          <i
            v-for="star in 5"
            :key="star"
            :class="star <= newReviewRating ? 'fas' : 'far'"
            class="fa-star"
            style="color: #ffb800; font-size: 20px; cursor: pointer; margin-right: 8px"
            @click="setRating(star)"
            @mouseover="hoverRating = star"
            @mouseleave="hoverRating = 0"
          ></i>
        </div>
        <button
          class="btn"
          style="
            width: 153px;
            border: 1px solid #1e7f98;
            color: #1e7f98;
            padding: 8px 32px;
            border-radius: 20px;
            background: transparent;
          "
          @click="submitReview"
        >
          <i class="far fa-paper-plane me-2"></i>发布评价
        </button>
      </div>

      <hr class="my-4" style="border-color: rgba(30, 127, 152, 0.1)" />

      <!-- 评价列表 -->
      <div v-for="review in reviews" :key="review.id" class="mb-4">
        <div class="d-flex align-items-center mb-2">
          <img
            :src="review.userAvatar"
            alt="用户头像"
            style="width: 40px; height: 40px; border-radius: 50%; margin-right: 12px"
          />
          <div>
            <h6 class="mb-0">{{ review.userName }}</h6>
            <div class="stars">
              <i
                v-for="star in 5"
                :key="star"
                :class="star <= review.rating ? 'fas' : 'far'"
                class="fa-star"
                style="color: #ffb800; font-size: 14px"
              ></i>
            </div>
          </div>
          <small class="text-muted ms-auto">{{ review.date }}</small>
        </div>
        <p class="mb-0" style="color: #333">{{ review.content }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Review } from '../types'

// 导入用户头像图片
import tou01Image from '@/assets/images/course-details/tou01.png'
import tou03Image from '@/assets/images/course-details/tou03.png'

const newReviewContent = ref('')
const newReviewRating = ref(0)
const hoverRating = ref(0)

const reviews = ref<Review[]>([
  {
    id: '1',
    userName: 'zolo',
    userAvatar: tou01Image,
    rating: 4,
    content: '神仙老师，讲的超级棒！若是能把材质创建那部分的原理讲的再细致一些就完美了。',
    date: '2020-03-13'
  }
])

const setRating = (rating: number) => {
  newReviewRating.value = rating
}

const submitReview = () => {
  if (newReviewContent.value.trim() && newReviewRating.value > 0) {
    const newReview: Review = {
      id: Date.now().toString(),
      userName: '当前用户', // TODO: 从用户状态获取
      userAvatar: tou03Image, // 使用导入的图片
      rating: newReviewRating.value,
      content: newReviewContent.value.trim(),
      date: new Date().toISOString().split('T')[0]
    }

    reviews.value.unshift(newReview)
    newReviewContent.value = ''
    newReviewRating.value = 0

    console.log('发布评价：', newReview)
    // TODO: 调用API提交评价
  }
}
</script>

<style scoped>
.review-list {
  border: 1px solid rgba(30, 127, 152, 0.1);
}

.stars i {
  transition: all 0.2s ease;
}

.stars i:hover {
  transform: scale(1.1);
}
</style>
