<template>
  <div class="countdown-section">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <div class="countdown-wrapper">
        <span class="countdown-label">支付剩余时间：</span>
        <span class="countdown-timer" :class="{ 'text-danger': isUrgent }">
          {{ formattedTime }}
        </span>
      </div>
      <div class="payment-amount">
        <span class="amount-label">支付金额：</span>
        <span class="amount-value">¥{{ paymentAmount.toFixed(2) }}</span>
      </div>
    </div>

    <button class="btn btn-payment w-100 py-3" :disabled="isExpired" @click="handlePayment">
      {{ isExpired ? '订单已过期' : '立即支付' }}
    </button>

    <div v-if="isExpired" class="expired-notice mt-3 text-center">
      <p class="text-danger mb-1">订单已过期</p>
      <p class="text-muted small">您可以重新下单或联系客服</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  initialSeconds: number
  paymentAmount: number
}>()

const emit = defineEmits(['payment', 'expired'])

// 倒计时状态
const remainingSeconds = ref(props.initialSeconds)
const isExpired = ref(false)
let timer: number | null = null

// 计算属性
const formattedTime = computed(() => {
  const minutes = Math.floor(remainingSeconds.value / 60)
  const seconds = remainingSeconds.value % 60
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
})

const isUrgent = computed(() => {
  return remainingSeconds.value <= 30
})

// 开始倒计时
const startCountdown = () => {
  timer = window.setInterval(() => {
    if (remainingSeconds.value > 0) {
      remainingSeconds.value--
    } else {
      handleExpired()
    }
  }, 1000)
}

// 处理过期
const handleExpired = () => {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
  isExpired.value = true
  emit('expired')
}

// 处理支付
const handlePayment = () => {
  if (!isExpired.value) {
    emit('payment')
  }
}

// 生命周期钩子
onMounted(() => {
  startCountdown()
})

onUnmounted(() => {
  if (timer) {
    clearInterval(timer)
  }
})
</script>

<style scoped>
.countdown-section {
  margin-top: 2rem;
}

.countdown-wrapper {
  font-size: 1rem;
}

.countdown-label {
  color: #666;
}

.countdown-timer {
  font-weight: 600;
  font-size: 1.1rem;
}

.countdown-timer.text-danger {
  animation: pulse 1s infinite;
}

@keyframes pulse {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
  100% {
    opacity: 1;
  }
}

.payment-amount {
  text-align: right;
}

.amount-label {
  color: #666;
}

.amount-value {
  font-weight: 600;
  font-size: 1.2rem;
  color: #e63946;
}

.btn-payment {
  background-color: #e63946;
  border-color: #e63946;
  color: white;
  font-size: 1.1rem;
  font-weight: 500;
  border-radius: 6px;
  transition: all 0.3s;
}

.btn-payment:hover:not(:disabled) {
  background-color: #d62b39;
  border-color: #d62b39;
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(230, 57, 70, 0.3);
}

.btn-payment:disabled {
  background-color: #ccc;
  border-color: #ccc;
  cursor: not-allowed;
}

.expired-notice {
  font-size: 0.9rem;
}

/* 响应式调整 */
@media (max-width: 576px) {
  .countdown-section {
    margin-top: 1.5rem;
  }

  .countdown-wrapper,
  .payment-amount {
    font-size: 0.9rem;
  }

  .countdown-timer,
  .amount-value {
    font-size: 1rem;
  }

  .btn-payment {
    font-size: 1rem;
    padding: 0.5rem 0;
  }
}
</style>
