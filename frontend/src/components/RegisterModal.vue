<template>
  <!-- 模态框遮罩层 -->
  <div class="modal-overlay" @click="closeModal">
    <!-- 模态框容器 -->
    <div class="modal-container" @click.stop>
      <!-- 关闭按钮 -->
      <span class="close-btn" @click="closeModal">
        <i>×</i>
      </span>

      <!-- 快速注册表单 -->
      <div class="form-section">
        <h4 class="text-center mt-4">快速注册</h4>
        <form class="mt-4" @submit.prevent="handleRegister">
          <div class="mb-3">
            <div class="input-group">
              <input
                type="text"
                class="form-control"
                v-model="registerForm.phoneNumber"
                placeholder="请输入手机号"
                required
              />
            </div>
          </div>
          <div class="mb-3 mt-4">
            <div class="code-input-container">
              <input
                type="text"
                class="form-control"
                v-model="registerForm.verificationCode"
                placeholder="请输入验证码"
                required
              />
              <button
                class="verification-code-btn"
                type="button"
                @click="sendVerificationCode"
                :disabled="countdown > 0"
              >
                {{ countdown > 0 ? `${countdown}秒后重新获取` : '获取验证码' }}
              </button>
            </div>
          </div>
          <button type="submit" class="btn btn-dark w-100 mt-4" :disabled="!isRegisterFormValid">
            完成注册
          </button>

          <div class="form-check mt-4 text-center">
            <input
              class="form-check-input"
              type="checkbox"
              v-model="registerForm.agreement"
              id="agreement"
              required
            />
            <label class="form-check-label" for="agreement">
              我已阅读并同意 <a href="#" class="text-link">《用户协议与服务条款》</a>
            </label>
          </div>
        </form>
      </div>

      <!-- 底部黄色区域 -->
      <div class="yellow-footer">
        <div class="text-center mt-4" style="font-size: 17px">
          <p>
            我已有账户 <a href="#" class="text-primary" @click.prevent="switchToLogin">去登录</a>
          </p>
        </div>
      </div>
    </div>

    <!-- 提示消息 -->
    <div
      v-if="message"
      class="alert alert-info mt-3"
      style="position: fixed; top: 20px; right: 20px; z-index: 9999"
    >
      {{ message }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUIStore } from '../store/uiStore'

const router = useRouter()
const uiStore = useUIStore()

// 定义事件
const emit = defineEmits(['close', 'openLogin'])

// 倒计时状态
const countdown = ref(0)
let countdownTimer: number | null = null

// 提示消息
const message = ref('')

// 注册表单数据
const registerForm = ref({
  phoneNumber: '',
  verificationCode: '',
  agreement: false
})

// 表单验证计算属性
const isRegisterFormValid = computed(() => {
  return (
    registerForm.value.phoneNumber &&
    registerForm.value.verificationCode &&
    registerForm.value.agreement
  )
})

// 发送验证码
const sendVerificationCode = () => {
  const phoneNumber = registerForm.value.phoneNumber

  if (!phoneNumber) {
    showMessage('请先输入手机号')
    return
  }

  // 手机号格式验证
  const phoneRegex = /^1[3-9]\d{9}$/
  if (!phoneRegex.test(phoneNumber)) {
    showMessage('请输入正确的手机号码')
    return
  }

  // 开始倒计时
  startCountdown()

  // TODO: 调用后端API发送验证码
  console.log(`向 ${phoneNumber} 发送验证码`)
  showMessage('验证码已发送')
}

// 倒计时功能
const startCountdown = () => {
  countdown.value = 60
  countdownTimer = window.setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      if (countdownTimer) {
        clearInterval(countdownTimer)
        countdownTimer = null
      }
    }
  }, 1000)
}

// 显示提示消息
const showMessage = (msg: string) => {
  message.value = msg
  setTimeout(() => {
    message.value = ''
  }, 3000)
}

// 注册处理
const handleRegister = () => {
  console.log('注册表单提交:', registerForm.value)

  // TODO: 调用后端API进行注册
  showMessage('注册成功！请前往个人中心设置登录密码以提高账户安全性。')

  // 注册成功后关闭模态框
  setTimeout(() => {
    closeModal()
  }, 2000)
}

// 关闭模态框
const closeModal = () => {
  emit('close')
}

// 切换到登录
const switchToLogin = () => {
  closeModal()
  emit('openLogin')
}

// 组件销毁时清理计时器
onUnmounted(() => {
  if (countdownTimer) {
    clearInterval(countdownTimer)
  }
})
</script>

<style scoped>
/* 模态框遮罩层 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9998;
  padding: 20px;
}

/* 模态框容器 */
.modal-container {
  max-width: 430px;
  width: 100%;
  background-color: #fbfbf6;
  border-radius: 15px;
  position: relative;
  z-index: 9999;
  animation: modalFadeIn 0.3s ease-out;
  max-height: 90vh;
  overflow-y: auto;
}

@keyframes modalFadeIn {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(-50px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

/* 表单区域 */
.form-section {
  padding: 20px 30px;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 50%;
  width: 25px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  transition: background-color 0.3s ease;
  z-index: 10000;
}

.close-btn:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

/* 验证码按钮样式 */
.code-input-container {
  position: relative;
}

.verification-code-btn {
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  border: none;
  background-color: transparent;
  color: #007bff;
  padding: 0 15px;
  cursor: pointer;
  white-space: nowrap;
  font-size: 14px;
}

.verification-code-btn:disabled {
  color: #6c757d;
  cursor: not-allowed;
}

/* 表单控件样式 */
.form-control {
  height: 45px;
  border-radius: 4px;
}

.form-control:focus {
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  border-color: #80bdff;
}

/* 按钮样式 */
.btn-dark {
  height: 45px;
  border-radius: 4px;
  font-size: 16px;
}

/* 底部黄色区域 */
.yellow-footer {
  background-color: #fff9e6;
  padding: 15px 0;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  margin-top: 20px;
}

/* 链接样式 */
.text-link {
  color: #007bff;
  text-decoration: none;
}

.text-link:hover {
  text-decoration: underline;
}
</style>
