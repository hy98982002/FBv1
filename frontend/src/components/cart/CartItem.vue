<template>
  <div class="cart-item d-flex py-3 border-bottom">
    <!-- 选择框 -->
    <div style="width: 24px">
      <input
        type="checkbox"
        class="form-check-input"
        v-model="item.isSelected"
        @change="$emit('selection-changed')"
      />
    </div>

    <!-- 课程信息 -->
    <div class="d-flex flex-grow-1 ms-4">
      <!-- 课程图片 -->
      <div class="cart-item-image me-3">
        <img :src="item.image" :alt="item.name" class="img-fluid rounded" />
      </div>

      <!-- 课程详情 -->
      <div class="cart-item-details">
        <h6 class="cart-item-title mb-1">{{ item.name }}</h6>
        <div class="cart-item-info text-muted small">
          <span>{{ item.instructor }}</span>
          <span class="mx-2">|</span>
          <span>{{ item.duration }}</span>
          <span class="mx-2">|</span>
          <span>{{ item.category }}</span>
        </div>
        <div class="cart-item-rating mt-1">
          <i class="fas fa-star text-warning"></i>
          <span class="ms-1">{{ item.rating }}</span>
        </div>
        <div v-if="item.badge" class="badge bg-danger mt-2">{{ item.badge }}</div>
      </div>
    </div>

    <!-- 价格 -->
    <div style="width: 100px; text-align: right">
      <div class="cart-item-price">¥{{ item.price.toFixed(2) }}</div>
      <div
        v-if="item.originalPrice"
        class="cart-item-original-price text-muted text-decoration-line-through"
      >
        ¥{{ item.originalPrice.toFixed(2) }}
      </div>
    </div>

    <!-- 操作 -->
    <div class="action-column" style="width: 100px; text-align: center">
      <button class="btn btn-sm btn-outline-secondary mb-2" @click="$emit('favorite', item)">
        收藏
      </button>
      <button class="btn btn-sm btn-outline-danger" @click="$emit('remove', item)">删除</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import type { CartItem } from '../../types/cart'

defineProps<{
  item: CartItem
}>()

defineEmits(['selection-changed', 'favorite', 'remove'])
</script>

<style scoped>
.cart-item {
  transition: background-color 0.3s;
}

.cart-item:hover {
  background-color: #f8f9fa;
}

.cart-item-image {
  width: 120px;
  height: 70px;
  overflow: hidden;
}

.cart-item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cart-item-title {
  font-size: 0.95rem;
  font-weight: 500;
  line-height: 1.3;
  max-width: 400px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.cart-item-price {
  font-weight: 600;
  color: #e63946;
}

.cart-item-original-price {
  font-size: 0.8rem;
}

.action-column {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.btn-outline-secondary,
.btn-outline-danger {
  font-size: 0.8rem;
  padding: 0.2rem 0.5rem;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .cart-item {
    flex-wrap: wrap;
  }

  .cart-item-details {
    width: 100%;
    margin-top: 10px;
  }

  .action-column {
    flex-direction: row;
    width: 100% !important;
    justify-content: flex-end;
    margin-top: 10px;
  }

  .action-column .btn:first-child {
    margin-right: 10px;
    margin-bottom: 0 !important;
  }
}
</style>
