<template>
  <div class="order-item d-flex mb-3">
    <div class="order-item-image me-3">
      <img :src="item.image" :alt="item.name" class="img-fluid rounded" />
    </div>
    <div class="order-item-details flex-grow-1">
      <h6 class="order-item-title mb-1">{{ item.name }}</h6>
      <div class="order-item-info text-muted small">
        <span>{{ item.category }}</span>
        <span class="mx-2">|</span>
        <span>{{ item.instructor }}</span>
      </div>
    </div>
    <div class="order-item-price">
      <div class="text-danger fw-bold">¥{{ item.price.toFixed(2) }}</div>
      <div v-if="item.originalPrice" class="text-muted text-decoration-line-through small">
        ¥{{ item.originalPrice.toFixed(2) }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  item: {
    id: string
    name: string
    image: string
    category: string
    instructor: string
    price: number
    originalPrice?: number
  }
}>()
</script>

<style scoped>
.order-item {
  padding: 0.75rem;
  border-radius: 6px;
  background-color: #f9f9f9;
}

.order-item:hover {
  background-color: #f5f5f5;
}

.order-item-image {
  width: 80px;
  height: 50px;
  overflow: hidden;
}

.order-item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.order-item-title {
  font-size: 0.95rem;
  line-height: 1.3;
}

.order-item-price {
  text-align: right;
  min-width: 80px;
}
</style>
