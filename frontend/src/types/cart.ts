// cart.ts - 购物车相关类型定义

export interface CartItem {
  id: string
  name: string
  image: string
  instructor: string
  price: number
  originalPrice?: number
  rating: number
  duration: string
  category: string
  badge?: string
  isSelected: boolean
}

export interface CartSummary {
  subtotal: number
  discount: number
  total: number
  coupon?: string
}

export interface RecommendCourse {
  id: string
  title: string
  image: string
  level: string
  studentCount: number
  isFree: boolean
  price?: number
  duration: string
  features: string[]
}
