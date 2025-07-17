import { createApp } from 'vue'
import Toast from '../components/Toast.vue'

interface ToastOptions {
  message: string
  type?: 'success' | 'error' | 'warning' | 'info'
  duration?: number
  closable?: boolean
  showProgress?: boolean
}

interface ToastShowOptions {
  type?: 'success' | 'error' | 'warning' | 'info'
  duration?: number
  closable?: boolean
  showProgress?: boolean
}

interface ToastInstance {
  app: any
  mountNode: HTMLElement
}

class ToastService {
  private toasts: ToastInstance[] = []

  /**
   * 显示Toast通知
   * @param options - 配置选项
   */
  show(options: ToastOptions) {
    const {
      message,
      type = 'info',
      duration = 5000,
      closable = true,
      showProgress = true
    } = options

    // 创建Toast组件实例
    const toastApp = createApp(Toast, {
      message,
      type,
      duration,
      closable,
      showProgress,
      onClose: () => {
        this.remove(toastApp)
      }
    })

    // 挂载到DOM
    const mountNode = document.createElement('div')
    document.body.appendChild(mountNode)
    toastApp.mount(mountNode)

    // 保存引用
    this.toasts.push({
      app: toastApp,
      mountNode
    })

    return toastApp
  }

  /**
   * 移除Toast
   * @param toastApp - Toast应用实例
   */
  remove(toastApp: any) {
    const index = this.toasts.findIndex(toast => toast.app === toastApp)
    if (index > -1) {
      const { app, mountNode } = this.toasts[index]

      // 卸载组件
      app.unmount()

      // 移除DOM节点
      if (mountNode && mountNode.parentNode) {
        mountNode.parentNode.removeChild(mountNode)
      }

      // 从数组中移除
      this.toasts.splice(index, 1)
    }
  }

  /**
   * 成功提示
   * @param message - 消息内容
   * @param options - 其他配置
   */
  success(message: string, options: ToastShowOptions = {}) {
    return this.show({
      message,
      type: 'success',
      ...options
    })
  }

  /**
   * 错误提示
   * @param message - 消息内容
   * @param options - 其他配置
   */
  error(message: string, options: ToastShowOptions = {}) {
    return this.show({
      message,
      type: 'error',
      duration: 0, // 错误信息默认不自动关闭
      ...options
    })
  }

  /**
   * 警告提示
   * @param message - 消息内容
   * @param options - 其他配置
   */
  warning(message: string, options: ToastShowOptions = {}) {
    return this.show({
      message,
      type: 'warning',
      ...options
    })
  }

  /**
   * 信息提示
   * @param message - 消息内容
   * @param options - 其他配置
   */
  info(message: string, options: ToastShowOptions = {}) {
    return this.show({
      message,
      type: 'info',
      ...options
    })
  }

  /**
   * 清除所有Toast
   */
  clear() {
    this.toasts.forEach(({ app, mountNode }) => {
      app.unmount()
      if (mountNode && mountNode.parentNode) {
        mountNode.parentNode.removeChild(mountNode)
      }
    })
    this.toasts = []
  }
}

// 创建全局实例
const toast = new ToastService()

export default toast
