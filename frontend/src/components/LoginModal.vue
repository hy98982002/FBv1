<!-- 登录模态框组件 - 基于原始设计，支持多种登录方式 -->
<template>
  <div class="modal-overlay" @click="handleOverlayClick">
    <div class="login-container-wrapper" @click.stop>
      <!-- 主登录容器 -->
      <div class="login-container">
        <!-- 关闭按钮 -->
        <span class="close-btn" @click="closeModal">
          <i>×</i>
        </span>

        <!-- 密码登录表单 -->
        <div v-show="loginType === 'password'" id="password-login">
          <h4 class="text-center mt-4">密码登录</h4>
          <form class="mt-5" @submit.prevent="handlePasswordLogin">
            <div class="mb-3">
              <div class="input-group">
                <input
                  type="text"
                  class="form-control"
                  v-model="passwordForm.phoneNumber"
                  placeholder="请输入手机号"
                  required
                />
              </div>
            </div>
            <div class="mb-3 mt-4">
              <input
                type="password"
                class="form-control"
                v-model="passwordForm.password"
                placeholder="请输入登录密码"
                required
              />
            </div>
            <button type="submit" class="btn btn-dark w-100 mt-4">登录</button>

            <!-- 其他登录方式 -->
            <div class="other-login-methods">其他登陆方式</div>
            <div class="login-icons">
              <div class="login-icon" @click.stop="switchToWechatLogin">
                <i class="fab fa-weixin wechat-icon"></i>
              </div>
              <div class="login-icon" @click.stop="switchToCodeLogin">
                <i class="fas fa-mobile-alt phone-icon"></i>
              </div>
            </div>

            <!-- 用户协议复选框 -->
            <div class="form-check mt-4 text-center">
              <input
                class="form-check-input"
                type="checkbox"
                v-model="passwordForm.agreement"
                id="agreement"
                required
              />
              <label class="form-check-label" for="agreement">
                我已阅读并同意 <a href="#" class="text-link">《用户协议与服务条款》</a>
              </label>
            </div>
          </form>
        </div>

        <!-- 手机验证码登录表单 -->
        <div v-show="loginType === 'code'" id="code-login">
          <h4 class="text-center mt-4">手机验证码登录</h4>
          <form class="mt-5" @submit.prevent="handleCodeLogin">
            <div class="mb-3">
              <div class="input-group">
                <input
                  type="text"
                  class="form-control"
                  v-model="codeForm.phoneNumber"
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
                  v-model="codeForm.verificationCode"
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
            <button type="submit" class="btn btn-dark w-100 mt-4">登录</button>

            <!-- 其他登录方式 -->
            <div class="other-login-methods">其他登陆方式</div>
            <div class="login-icons">
              <div class="login-icon" @click.stop="switchToWechatLogin">
                <i class="fab fa-weixin wechat-icon"></i>
              </div>
              <div class="login-icon" @click.stop="switchToPasswordLogin">
                <i class="fas fa-key key-icon"></i>
              </div>
            </div>

            <!-- 用户协议复选框 -->
            <div class="form-check mt-4 text-center">
              <input
                class="form-check-input"
                type="checkbox"
                v-model="codeForm.agreement"
                id="agreementCode"
                required
              />
              <label class="form-check-label" for="agreementCode">
                我已阅读并同意 <a href="#" class="text-link">《用户协议与服务条款》</a>
              </label>
            </div>
          </form>
        </div>

        <!-- 微信登录表单 -->
        <div v-show="loginType === 'wechat'" id="wechat-login">
          <h4 class="text-center mt-4">微信登录</h4>
          <div class="qr-code-container">
            <i class="fab fa-weixin fa-5x wechat-icon"></i>
          </div>
          <p class="text-center">请使用微信扫描二维码登录</p>

          <!-- 其他登录方式 -->
          <div class="other-login-methods">其他登陆方式</div>
          <div class="login-icons">
            <div class="login-icon" @click.stop="switchToPasswordLogin">
              <i class="fas fa-key key-icon"></i>
            </div>
            <div class="login-icon" @click.stop="switchToCodeLogin">
              <i class="fas fa-mobile-alt phone-icon"></i>
            </div>
          </div>

          <!-- 用户协议复选框 -->
          <div class="form-check mt-4 text-center">
            <input
              class="form-check-input"
              type="checkbox"
              v-model="wechatForm.agreement"
              id="agreementWechat"
              required
            />
            <label class="form-check-label" for="agreementWechat">
              我已阅读并同意 <a href="#" class="text-link">《用户协议与服务条款》</a>
            </label>
          </div>
        </div>
      </div>

      <!-- 底部黄色区域 -->
      <div class="yellow-footer">
        <div class="text-center mt-4" style="font-size: 17px">
          <p>
            我还没有账户
            <a href="#" class="text-primary" @click="goToRegister">去注册</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUIStore } from '../store/uiStore'

// Props和Emits
const emit = defineEmits(['close', 'openRegister'])
const router = useRouter()
const uiStore = useUIStore()

// 当前登录类型
const loginType = ref('code') // 'password', 'code', 'wechat' - 默认使用验证码登录

// 倒计时状态
const countdown = ref(0)
let countdownTimer: number | null = null

// 表单数据
const passwordForm = ref({
  phoneNumber: '',
  password: '',
  agreement: false
})

const codeForm = ref({
  phoneNumber: '',
  verificationCode: '',
  agreement: false
})

const wechatForm = ref({
  agreement: false
})

// 组件挂载
onMounted(() => {
  // 组件挂载时的初始化逻辑
})

// 清理定时器
onUnmounted(() => {
  if (countdownTimer) {
    clearInterval(countdownTimer)
  }
})

// 切换登录方式
const switchToPasswordLogin = () => {
  loginType.value = 'password'
}

const switchToCodeLogin = () => {
  loginType.value = 'code'
}

const switchToWechatLogin = () => {
  loginType.value = 'wechat'
}

// 发送验证码
const sendVerificationCode = () => {
  const phoneNumber = codeForm.value.phoneNumber

  if (!phoneNumber) {
    alert('请先输入手机号')
    return
  }

  // 手机号格式验证
  const phoneRegex = /^1[3-9]\d{9}$/
  if (!phoneRegex.test(phoneNumber)) {
    alert('请输入正确的手机号格式')
    return
  }

  // 开始倒计时
  startCountdown()

  // TODO: 调用后端API发送验证码
  console.log(`向 ${phoneNumber} 发送验证码`)
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

// 处理密码登录
const handlePasswordLogin = () => {
  console.log('密码登录表单提交:', passwordForm.value)

  // TODO: 调用后端API进行登录验证

  // 登录成功后关闭模态框
  closeModal()
}

// 处理验证码登录
const handleCodeLogin = () => {
  console.log('验证码登录表单提交:', codeForm.value)

  // TODO: 调用后端API进行登录验证

  // 登录成功后关闭模态框
  closeModal()
}

// 点击遮罩层处理
const handleOverlayClick = (event: MouseEvent) => {
  closeModal()
}

// 关闭模态框
const closeModal = () => {
  emit('close')
}

// 切换到注册
const goToRegister = () => {
  closeModal()
  // 使用 emit 事件通知父组件打开注册模态框
  emit('openRegister')
}
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

/* 登录容器 */
.login-container-wrapper {
  max-width: 430px;
  width: 100%;
  background-color: #fbfbf6;
  border-radius: 15px;
  overflow: hidden;
  position: relative;
  z-index: 9999;
  animation: modalFadeIn 0.3s ease-out;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
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

/* 登录表单容器 */
.login-container {
  padding: 20px 30px;
  flex: 1;
  overflow-y: auto;
}

/* 底部黄色区域 */
.yellow-footer {
  background-color: #fff9e6;
  padding: 15px 0;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
}

/* 关闭按钮 */
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

/* 其他登录方式 */
.other-login-methods {
  text-align: center;
  margin-top: 30px;
  position: relative;
  color: #999;
  font-size: 14px;
}

.other-login-methods::before,
.other-login-methods::after {
  content: '';
  position: absolute;
  top: 50%;
  width: 30%;
  height: 1px;
  background-color: #e0e0e0;
}

.other-login-methods::before {
  left: 0;
}

.other-login-methods::after {
  right: 0;
}

/* 登录图标 */
.login-icons {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.login-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 15px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.login-icon:hover {
  background-color: #e0e0e0;
  transform: scale(1.1);
}

/* 图标颜色 */
.wechat-icon {
  color: #07c160;
}

.phone-icon {
  color: #007bff;
}

.key-icon {
  color: #ffc107;
}

/* 微信登录样式 */
.qr-code-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150px;
  margin: 30px 0;
}

/* 链接样式 */
.text-link {
  color: #007bff;
  text-decoration: none;
}

.text-link:hover {
  text-decoration: underline;
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
</style>
