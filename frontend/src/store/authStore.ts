import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  // 状态
  const isAuthenticated = ref(false)
  const token = ref('')
  const user = ref<{
    id: number
    username: string
    avatar: string
    email: string
  } | null>(null)

  // Actions
  const login = (userData: { token: string; user: any }) => {
    isAuthenticated.value = true
    token.value = userData.token
    user.value = userData.user
  }

  const logout = () => {
    isAuthenticated.value = false
    token.value = ''
    user.value = null
  }

  const updateUser = (userData: any) => {
    if (user.value) {
      user.value = { ...user.value, ...userData }
    }
  }

  return {
    // 状态
    isAuthenticated,
    token,
    user,

    // Actions
    login,
    logout,
    updateUser
  }
})
