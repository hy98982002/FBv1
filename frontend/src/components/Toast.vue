<template>
  <Teleport to="body">
    <Transition name="toast">
      <div v-if="visible" class="toast-container" :class="typeClass">
        <div class="toast-content">
          <i :class="iconClass" aria-hidden="true"></i>
          <span class="toast-message">{{ message }}</span>
          <button v-if="closable" class="toast-close" @click="close" aria-label="关闭通知">
            ×
          </button>
        </div>
        <div v-if="showProgress" class="toast-progress">
          <div class="toast-progress-bar" :style="{ width: progressWidth + '%' }"></div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

// Props
const props = defineProps({
  message: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'info',
    validator: (value: string) => ['success', 'error', 'warning', 'info'].includes(value)
  },
  duration: {
    type: Number,
    default: 5000 // 5秒
  },
  closable: {
    type: Boolean,
    default: true
  },
  showProgress: {
    type: Boolean,
    default: true
  }
})

// Emits
const emit = defineEmits(['close'])

// 状态
const visible = ref(false)
const progressWidth = ref(100)
let timer: number | null = null
let progressTimer: number | null = null

// 计算属性
const typeClass = computed(() => `toast-${props.type}`)

const iconClass = computed(() => {
  const iconMap = {
    success: 'fas fa-check-circle',
    error: 'fas fa-exclamation-circle',
    warning: 'fas fa-exclamation-triangle',
    info: 'fas fa-info-circle'
  }
  return iconMap[props.type as keyof typeof iconMap]
})

// 方法
const show = () => {
  visible.value = true

  if (props.duration > 0) {
    // 自动关闭定时器
    timer = window.setTimeout(() => {
      close()
    }, props.duration)

    // 进度条动画
    if (props.showProgress) {
      const interval = 50 // 更新间隔
      const step = (interval / props.duration) * 100

      progressTimer = window.setInterval(() => {
        progressWidth.value -= step
        if (progressWidth.value <= 0) {
          progressWidth.value = 0
          if (progressTimer) {
            clearInterval(progressTimer)
            progressTimer = null
          }
        }
      }, interval)
    }
  }
}

const close = () => {
  visible.value = false
  clearTimers()
  emit('close')
}

const clearTimers = () => {
  if (timer) {
    clearTimeout(timer)
    timer = null
  }
  if (progressTimer) {
    clearInterval(progressTimer)
    progressTimer = null
  }
}

// 生命周期
onMounted(() => {
  show()
})

onUnmounted(() => {
  clearTimers()
})

// 暴露方法
defineExpose({
  close
})
</script>

<style scoped>
.toast-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  min-width: 300px;
  max-width: 500px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  border-left: 4px solid;
}

.toast-content {
  display: flex;
  align-items: center;
  padding: 16px 20px;
  gap: 12px;
}

.toast-message {
  flex: 1;
  font-size: 14px;
  line-height: 1.4;
  color: #333;
}

.toast-close {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #999;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;
}

.toast-close:hover {
  background-color: #f5f5f5;
  color: #666;
}

.toast-progress {
  height: 3px;
  background-color: rgba(0, 0, 0, 0.1);
}

.toast-progress-bar {
  height: 100%;
  transition: width 50ms linear;
}

/* 类型样式 */
.toast-success {
  border-left-color: #52c41a;
}

.toast-success .fas {
  color: #52c41a;
}

.toast-success .toast-progress-bar {
  background-color: #52c41a;
}

.toast-error {
  border-left-color: #ff4d4f;
}

.toast-error .fas {
  color: #ff4d4f;
}

.toast-error .toast-progress-bar {
  background-color: #ff4d4f;
}

.toast-warning {
  border-left-color: #faad14;
}

.toast-warning .fas {
  color: #faad14;
}

.toast-warning .toast-progress-bar {
  background-color: #faad14;
}

.toast-info {
  border-left-color: #1890ff;
}

.toast-info .fas {
  color: #1890ff;
}

.toast-info .toast-progress-bar {
  background-color: #1890ff;
}

/* 动画 */
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.toast-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
