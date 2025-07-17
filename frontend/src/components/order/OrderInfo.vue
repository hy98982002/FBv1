<template>
  <div class="order-info mb-4">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h5 class="m-0">订单信息</h5>
      <button class="btn btn-sm btn-link p-0 toggle-details" @click="toggleDetails">
        {{ orderInfo.isDetailsVisible ? '收起' : '展开' }}
        <i
          class="fas"
          :class="orderInfo.isDetailsVisible ? 'fa-chevron-up' : 'fa-chevron-down'"
        ></i>
      </button>
    </div>

    <div class="order-id mb-3">
      <span class="text-muted">订单号：</span>
      <span class="fw-bold">{{ orderInfo.orderId }}</span>
    </div>

    <div v-if="orderInfo.isDetailsVisible" class="order-details">
      <div class="product-info d-flex mb-3">
        <div class="product-image me-3">
          <img
            :src="orderInfo.productImage"
            :alt="orderInfo.productName"
            class="img-fluid rounded"
          />
        </div>
        <div class="product-details">
          <h6 class="mb-2">{{ orderInfo.productName }}</h6>
          <div class="price">
            <span class="text-danger fw-bold">¥{{ orderInfo.price.toFixed(2) }}</span>
          </div>
        </div>
      </div>

      <div class="divider my-3"></div>

      <div class="payment-info d-flex justify-content-between">
        <span class="text-muted">支付金额</span>
        <span class="text-danger fw-bold">¥{{ orderInfo.paymentAmount.toFixed(2) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import type { OrderInfo } from '../../types/order'

const props = defineProps<{
  orderInfo: OrderInfo
}>()

const emit = defineEmits(['toggle-details'])

const toggleDetails = () => {
  emit('toggle-details', !props.orderInfo.isDetailsVisible)
}
</script>

<style scoped>
.order-info {
  border-bottom: 1px solid #eee;
  padding-bottom: 1.5rem;
}

.toggle-details {
  color: #166d84;
  text-decoration: none;
  font-size: 0.9rem;
}

.toggle-details:hover {
  color: #0e5a6f;
}

.order-id {
  font-size: 0.9rem;
}

.product-image {
  width: 100px;
  height: 60px;
  overflow: hidden;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-details h6 {
  font-size: 0.95rem;
  line-height: 1.3;
}

.divider {
  height: 1px;
  background-color: #eee;
}

.payment-info {
  font-size: 0.95rem;
}
</style>
