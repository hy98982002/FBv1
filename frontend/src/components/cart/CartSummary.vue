<template>
  <div class="cart-summary ms-4">
    <div class="card border-0 bg-white rounded-lg p-4">
      <h5 class="mb-4">订单汇总</h5>

      <!-- 价格明细 -->
      <div class="price-details">
        <div class="d-flex justify-content-between mb-2">
          <span>商品金额</span>
          <span>¥{{ summary.subtotal.toFixed(2) }}</span>
        </div>
        <div class="d-flex justify-content-between mb-2">
          <span>优惠金额</span>
          <span>-¥{{ summary.discount.toFixed(2) }}</span>
        </div>
        <div class="d-flex justify-content-between mb-3">
          <span>优惠券</span>
          <span v-if="summary.coupon">{{ summary.coupon }}</span>
          <a
            v-else
            href="#"
            class="text-primary coupon-link"
            @click.prevent="$emit('select-coupon')"
          >
            选择优惠券
          </a>
        </div>
      </div>

      <div class="divider my-3"></div>

      <!-- 总计 -->
      <div class="d-flex justify-content-between mb-4">
        <span class="total-label">应付金额</span>
        <span class="total-price">¥{{ summary.total.toFixed(2) }}</span>
      </div>

      <!-- 结算按钮 -->
      <button class="btn btn-primary w-100 py-2" @click="$emit('checkout')">立即结算</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import type { CartSummary } from '../../types/cart'

defineProps<{
  summary: CartSummary
}>()

defineEmits(['select-coupon', 'checkout'])
</script>

<style scoped>
.cart-summary {
  width: 300px;
  min-width: 300px;
}

.price-details {
  font-size: 0.9rem;
}

.divider {
  height: 1px;
  background-color: #e9ecef;
}

.total-label {
  font-weight: 500;
}

.total-price {
  font-weight: 600;
  font-size: 1.2rem;
  color: #e63946;
}

.coupon-link {
  text-decoration: none;
}

.coupon-link:hover {
  text-decoration: underline;
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
@media (max-width: 992px) {
  .cart-summary {
    width: 100%;
    min-width: auto;
    margin-top: 20px;
    margin-left: 0 !important;
  }
}
</style>
