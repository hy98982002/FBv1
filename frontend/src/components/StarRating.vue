<template>
  <div class="star-rating-custom" :class="{ 'star-rating-small': size === 'small' }">
    <span v-for="star in 5" :key="star" class="star-item" :class="getStarType(star)">
      {{ getStarDisplay(star) }}
    </span>
  </div>
</template>

<script setup lang="ts">
interface Props {
  rating: number
  size?: 'normal' | 'small'
}

const props = withDefaults(defineProps<Props>(), {
  rating: 0,
  size: 'normal'
})

// 计算星星类型
const getStarType = (starNumber: number): string => {
  const rating = props.rating
  if (starNumber <= Math.floor(rating)) {
    return 'star-full'
  } else if (starNumber - 0.5 <= rating) {
    return 'star-half'
  }
  return 'star-empty'
}

// 获取星星显示字符
const getStarDisplay = (starNumber: number): string => {
  const rating = props.rating
  if (starNumber <= Math.floor(rating)) {
    return '★' // 实心星
  } else if (starNumber - 0.5 <= rating) {
    return '☆' // 半星用空心星表示
  }
  return '☆' // 空心星
}
</script>

<style scoped>
.star-rating-custom {
  display: inline-flex;
  align-items: center;
  gap: 1px;
  line-height: 1;
}

.star-item {
  font-size: 16px;
  line-height: 1;
  display: inline-block;
  color: #ddd;
  text-rendering: geometricPrecision;
  -webkit-font-smoothing: none;
  -moz-osx-font-smoothing: auto;
}

.star-rating-small .star-item {
  font-size: 14px;
}

/* 星星颜色状态 */
.star-full {
  color: #ffc107 !important;
}

.star-half {
  color: #ffc107 !important;
}

.star-empty {
  color: #ddd !important;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .star-item {
    font-size: 14px;
  }

  .star-rating-small .star-item {
    font-size: 12px;
  }
}
</style>
