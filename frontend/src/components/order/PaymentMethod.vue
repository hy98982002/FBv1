<template>
  <div class="payment-method mb-4">
    <h5 class="mb-3">支付方式</h5>

    <div class="payment-options">
      <div
        v-for="method in paymentMethods"
        :key="method.id"
        class="payment-option"
        :class="{ active: method.id === selectedMethod }"
        @click="selectPayment(method.id)"
      >
        <!-- 支付宝 -->
        <template v-if="method.id === 'alipay'">
          <div class="payment-icon">
            <img :src="method.icon" alt="支付宝" class="img-fluid" />
          </div>
          <div class="payment-name">{{ method.name }}</div>
        </template>

        <!-- 微信支付 -->
        <template v-else-if="method.id === 'wechat'">
          <div class="payment-icon wechat-icon">
            <i class="fab fa-weixin fa-2x"></i>
          </div>
          <div class="payment-name">{{ method.name }}</div>
        </template>

        <!-- 其他支付方式 -->
        <template v-else>
          <div class="payment-icon">
            <img :src="method.icon" :alt="method.name" class="img-fluid" />
          </div>
          <div class="payment-name">{{ method.name }}</div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import type { PaymentMethod } from '../../types/order'

defineProps<{
  paymentMethods: PaymentMethod[]
  selectedMethod: string
}>()

const emit = defineEmits(['select-payment'])

const selectPayment = (methodId: string) => {
  emit('select-payment', methodId)
}
</script>

<style scoped>
.payment-method {
  border-bottom: 1px solid #eee;
  padding-bottom: 1.5rem;
}

.payment-options {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.payment-option {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 80px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  padding: 0.5rem;
}

.payment-option:hover {
  border-color: #166d84;
  box-shadow: 0 0 0 1px #166d84;
}

.payment-option.active {
  border-color: #166d84;
  box-shadow: 0 0 0 2px #166d84;
  background-color: rgba(22, 109, 132, 0.05);
}

.payment-icon {
  margin-bottom: 0.5rem;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.payment-icon img {
  max-height: 32px;
  max-width: 80px;
}

.wechat-icon {
  color: #07c160;
}

.payment-name {
  font-size: 0.9rem;
}

/* 响应式调整 */
@media (max-width: 576px) {
  .payment-options {
    justify-content: space-between;
  }

  .payment-option {
    width: calc(50% - 0.5rem);
  }
}
</style>
