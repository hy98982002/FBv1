import { createPinia } from 'pinia'

// 导出所有stores
export { useCourseStore } from './courseStore'
export { useUIStore } from './uiStore'
export { useAuthStore } from './authStore'

// 创建pinia实例
const pinia = createPinia()

export default pinia
