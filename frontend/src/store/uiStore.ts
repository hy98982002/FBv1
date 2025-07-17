import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUIStore = defineStore('ui', () => {
  // 导航状态
  const isNavbarCollapsed = ref(true)
  const currentNavItem = ref('home')

  // 弹窗状态
  const isLoginModalOpen = ref(false)
  const isRegisterModalOpen = ref(false)
  const isCartModalOpen = ref(false)
  const isProfileModalOpen = ref(false)

  // 加载状态
  const isLoading = ref(false)
  const loadingMessage = ref('')

  // 搜索状态
  const isSearchFocused = ref(false)
  const searchHistory = ref<string[]>([])

  // 轮播图状态
  const carouselActiveIndex = ref(0)

  // 主题模式
  const isDarkMode = ref(false)

  // 响应式断点状态
  const isMobile = ref(false)
  const isTablet = ref(false)
  const isDesktop = ref(true)

  // 通知消息
  const notifications = ref<
    Array<{
      id: string
      type: 'success' | 'error' | 'warning' | 'info'
      title: string
      message: string
      autoClose?: boolean
      duration?: number
    }>
  >([])

  // Actions

  // 导航相关
  const toggleNavbar = () => {
    isNavbarCollapsed.value = !isNavbarCollapsed.value
  }

  const setCurrentNavItem = (item: string) => {
    currentNavItem.value = item
  }

  const collapseNavbar = () => {
    isNavbarCollapsed.value = true
  }

  // 弹窗相关
  const openLoginModal = () => {
    isLoginModalOpen.value = true
    isRegisterModalOpen.value = false // 确保其他模态框关闭
  }

  const closeLoginModal = () => {
    isLoginModalOpen.value = false
  }

  const openRegisterModal = () => {
    isRegisterModalOpen.value = true
    isLoginModalOpen.value = false // 确保其他模态框关闭
  }

  const closeRegisterModal = () => {
    isRegisterModalOpen.value = false
  }

  const openCartModal = () => {
    isCartModalOpen.value = true
  }

  const closeCartModal = () => {
    isCartModalOpen.value = false
  }

  const openProfileModal = () => {
    isProfileModalOpen.value = true
  }

  const closeProfileModal = () => {
    isProfileModalOpen.value = false
  }

  const closeAllModals = () => {
    isLoginModalOpen.value = false
    isRegisterModalOpen.value = false
    isCartModalOpen.value = false
    isProfileModalOpen.value = false
  }

  // 加载状态相关
  const startLoading = (message = '加载中...') => {
    isLoading.value = true
    loadingMessage.value = message
  }

  const stopLoading = () => {
    isLoading.value = false
    loadingMessage.value = ''
  }

  // 搜索相关
  const setSearchFocus = (focused: boolean) => {
    isSearchFocused.value = focused
  }

  const addToSearchHistory = (keyword: string) => {
    if (keyword && !searchHistory.value.includes(keyword)) {
      searchHistory.value.unshift(keyword)
      // 最多保存10条历史记录
      if (searchHistory.value.length > 10) {
        searchHistory.value.pop()
      }
    }
  }

  const clearSearchHistory = () => {
    searchHistory.value = []
  }

  // 轮播图相关
  const setCarouselActiveIndex = (index: number) => {
    carouselActiveIndex.value = index
  }

  const nextCarouselSlide = (totalSlides: number) => {
    carouselActiveIndex.value = (carouselActiveIndex.value + 1) % totalSlides
  }

  const prevCarouselSlide = (totalSlides: number) => {
    carouselActiveIndex.value =
      carouselActiveIndex.value === 0 ? totalSlides - 1 : carouselActiveIndex.value - 1
  }

  // 主题相关
  const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value
    // 这里可以添加保存到localStorage的逻辑
    if (typeof window !== 'undefined') {
      localStorage.setItem('darkMode', isDarkMode.value.toString())
    }
  }

  const setDarkMode = (dark: boolean) => {
    isDarkMode.value = dark
    if (typeof window !== 'undefined') {
      localStorage.setItem('darkMode', dark.toString())
    }
  }

  // 响应式断点相关
  const updateBreakpoint = (width: number) => {
    isMobile.value = width < 768
    isTablet.value = width >= 768 && width < 992
    isDesktop.value = width >= 992
  }

  // 通知相关
  const addNotification = (
    type: 'success' | 'error' | 'warning' | 'info',
    title: string,
    message: string,
    autoClose = true,
    duration = 3000
  ) => {
    const id = Date.now().toString()
    const notification = {
      id,
      type,
      title,
      message,
      autoClose,
      duration
    }

    notifications.value.push(notification)

    if (autoClose) {
      setTimeout(() => {
        removeNotification(id)
      }, duration)
    }

    return id
  }

  const removeNotification = (id: string) => {
    const index = notifications.value.findIndex(n => n.id === id)
    if (index > -1) {
      notifications.value.splice(index, 1)
    }
  }

  const clearAllNotifications = () => {
    notifications.value = []
  }

  // 便捷通知方法
  const showSuccess = (title: string, message: string) => {
    return addNotification('success', title, message)
  }

  const showError = (title: string, message: string) => {
    return addNotification('error', title, message, true, 5000)
  }

  const showWarning = (title: string, message: string) => {
    return addNotification('warning', title, message)
  }

  const showInfo = (title: string, message: string) => {
    return addNotification('info', title, message)
  }

  // 初始化
  const initializeUI = () => {
    // 从localStorage恢复暗黑模式设置
    if (typeof window !== 'undefined') {
      const savedDarkMode = localStorage.getItem('darkMode')
      if (savedDarkMode !== null) {
        isDarkMode.value = savedDarkMode === 'true'
      }

      // 初始化响应式断点
      updateBreakpoint(window.innerWidth)

      // 监听窗口大小变化
      window.addEventListener('resize', () => {
        updateBreakpoint(window.innerWidth)
      })
    }
  }

  return {
    // 状态
    isNavbarCollapsed,
    currentNavItem,
    isLoginModalOpen,
    isRegisterModalOpen,
    isCartModalOpen,
    isProfileModalOpen,
    isLoading,
    loadingMessage,
    isSearchFocused,
    searchHistory,
    carouselActiveIndex,
    isDarkMode,
    isMobile,
    isTablet,
    isDesktop,
    notifications,

    // Actions
    toggleNavbar,
    setCurrentNavItem,
    collapseNavbar,
    openLoginModal,
    closeLoginModal,
    openRegisterModal,
    closeRegisterModal,
    openCartModal,
    closeCartModal,
    openProfileModal,
    closeProfileModal,
    closeAllModals,
    startLoading,
    stopLoading,
    setSearchFocus,
    addToSearchHistory,
    clearSearchHistory,
    setCarouselActiveIndex,
    nextCarouselSlide,
    prevCarouselSlide,
    toggleDarkMode,
    setDarkMode,
    updateBreakpoint,
    addNotification,
    removeNotification,
    clearAllNotifications,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    initializeUI
  }
})
