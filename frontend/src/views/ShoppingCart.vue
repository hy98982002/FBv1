<template>
  <div class="shopping-cart-page">
    <!-- 复用登录后的导航栏 -->
    <AuthNavbar />

    <!-- 购物车主体 -->
    <div class="container mt-4">
      <div class="d-flex flex-column flex-lg-row">
        <!-- 左侧主要内容 -->
        <div class="main-content flex-grow-1">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h5 class="m-0 cart-title">购物车</h5>
            <a href="#" class="text-primary clear-cart-btn" @click.prevent="clearCart">
              清空购物车
            </a>
          </div>

          <!-- 购物车内容区域 -->
          <div class="card border-0 bg-white rounded-lg p-4">
            <!-- 空购物车提示 -->
            <EmptyCart v-if="cartItems.length === 0" @go-shopping="goShopping" />

            <!-- 有商品时显示表头和商品列表 -->
            <template v-else>
              <!-- 表头 -->
              <div class="d-flex border-bottom pb-3 table-header">
                <div style="width: 24px">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    v-model="selectAll"
                    @change="toggleSelectAll"
                  />
                </div>
                <div class="flex-grow-1 ms-4">课程</div>
                <div style="width: 100px; text-align: right">价格</div>
                <div class="action-column" style="width: 100px; text-align: center">操作</div>
              </div>

              <!-- 商品列表 -->
              <CartItem
                v-for="item in cartItems"
                :key="item.id"
                :item="item"
                @selection-changed="handleSelectionChanged"
                @favorite="handleFavorite"
                @remove="handleRemove"
              />
            </template>
          </div>
        </div>

        <!-- 右侧促销结算区 -->
        <CartSummary
          v-if="cartItems.length > 0"
          :summary="cartSummary"
          @select-coupon="handleSelectCoupon"
          @checkout="handleCheckout"
        />
      </div>
    </div>

    <!-- 推荐课程部分 -->
    <RecommendSection
      v-if="recommendCourses.length > 0"
      :courses="recommendCourses"
      @add-to-cart="addToCart"
      @view-course="viewCourse"
      @refresh="refreshRecommendations"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import AuthNavbar from '../components/AuthNavbar.vue'
import CartItem from '../components/cart/CartItem.vue'
import CartSummary from '../components/cart/CartSummary.vue'
import EmptyCart from '../components/cart/EmptyCart.vue'
import RecommendSection from '../components/cart/RecommendSection.vue'
import type {
  CartItem as CartItemType,
  CartSummary as CartSummaryType,
  RecommendCourse
} from '../types/cart'

const router = useRouter()

// 数据初始化
const cartItems = ref<CartItemType[]>(getInitialCartData())
const recommendCourses = ref<RecommendCourse[]>(getRecommendData())
const selectAll = ref(false)

// 计算属性
const cartSummary = computed<CartSummaryType>(() => {
  const selectedItems = cartItems.value.filter(item => item.isSelected)
  const subtotal = selectedItems.reduce((sum, item) => sum + item.price, 0)
  const discount = 0
  const total = subtotal - discount

  return { subtotal, discount, total, coupon: undefined }
})

// 事件处理函数
const toggleSelectAll = () => {
  cartItems.value.forEach(item => {
    item.isSelected = selectAll.value
  })
}

const handleSelectionChanged = () => {
  selectAll.value = cartItems.value.every(item => item.isSelected)
}

const handleFavorite = (item: CartItemType) => {
  console.log('收藏商品：', item.name)
}

const handleRemove = (item: CartItemType) => {
  const index = cartItems.value.findIndex(cart => cart.id === item.id)
  if (index > -1) {
    cartItems.value.splice(index, 1)
  }
}

const clearCart = () => {
  if (confirm('确定要清空购物车吗？')) {
    cartItems.value = []
    selectAll.value = false
  }
}

const handleSelectCoupon = () => {
  console.log('选择优惠券')
}

const handleCheckout = () => {
  const selectedItems = cartItems.value.filter(item => item.isSelected)
  if (selectedItems.length === 0) {
    alert('请选择要结算的商品')
    return
  }

  // 模拟生成订单ID
  const orderId = 'ORD' + Date.now().toString().slice(-8)

  // 跳转到订单页面
  router.push(`/order/${orderId}`)
}

const goShopping = () => {
  router.push('/')
}

const refreshRecommendations = () => {
  console.log('换一换推荐')
  // 在实际项目中，这里应该调用API获取新的推荐
  // 这里简单地打乱当前推荐列表
  recommendCourses.value = [...recommendCourses.value].sort(() => Math.random() - 0.5)
}

const viewCourse = (course: RecommendCourse) => {
  router.push(`/course/${course.id}`)
}

const addToCart = (course: RecommendCourse) => {
  // 检查是否已在购物车中
  if (cartItems.value.some(item => item.id === course.id)) {
    alert('该课程已在购物车中')
    return
  }

  // 添加到购物车
  cartItems.value.push({
    id: course.id,
    name: course.title,
    image: course.image,
    instructor: '讲师名称', // 实际项目中应从course对象获取
    price: course.price || 0,
    rating: 4.8, // 模拟数据
    duration: course.duration,
    category: course.level,
    isSelected: true
  })

  // 更新全选状态
  handleSelectionChanged()
}

// 模拟数据初始化函数
function getInitialCartData(): CartItemType[] {
  return [
    {
      id: '1',
      name: 'Houdini 20.5 CHOP模块基础与案例教学',
      image: '/img/ai04.jpg',
      instructor: '小宅',
      price: 202.64,
      originalPrice: 298.0,
      rating: 4.8,
      duration: '总共32.5小时',
      category: '实战',
      badge: '热门课程',
      isSelected: false
    },
    {
      id: '2',
      name: 'AI+Python实战：从零开始构建智能聊天机器人',
      image: '/img/ai03.jpg',
      instructor: '王教授',
      price: 199.0,
      originalPrice: 299.0,
      rating: 4.9,
      duration: '总共28小时',
      category: '精进',
      badge: '畅销课程',
      isSelected: false
    }
  ]
}

function getRecommendData(): RecommendCourse[] {
  return [
    {
      id: '101',
      title: 'AI+Python图像处理高级教程',
      image: '/img/ai01.jpg',
      level: '高级',
      studentCount: 1280,
      isFree: false,
      price: 299.0,
      duration: '36小时',
      features: ['Python基础', 'AI算法', '项目实战']
    },
    {
      id: '102',
      title: 'DeepSeek+SpringAI实战AI家庭医生应用',
      image: '/img/ai02.jpg',
      level: '中级',
      studentCount: 980,
      isFree: false,
      price: 199.0,
      duration: '24小时',
      features: ['AI应用', 'Spring框架', '实用工具']
    },
    {
      id: '103',
      title: 'AI绘画入门：Stable Diffusion实战指南',
      image: '/img/ai03.jpg',
      level: '入门',
      studentCount: 2450,
      isFree: true,
      duration: '12小时',
      features: ['AI绘画', '零基础', '创意设计']
    },
    {
      id: '104',
      title: 'Python数据分析与可视化实战',
      image: '/img/ai04.jpg',
      level: '中级',
      studentCount: 1650,
      isFree: false,
      price: 159.0,
      duration: '20小时',
      features: ['数据分析', 'Pandas', '可视化']
    }
  ]
}
</script>

<style scoped>
.shopping-cart-page {
  padding-top: 60px; /* 为固定导航栏留出空间 */
  min-height: 100vh;
  background-color: #f8f9fa;
}

.container {
  padding-top: 1rem;
  padding-bottom: 3rem;
}

.cart-title {
  font-size: 1.25rem;
  font-weight: 600;
}

.clear-cart-btn {
  font-size: 0.9rem;
  text-decoration: none;
}

.clear-cart-btn:hover {
  text-decoration: underline;
}

.table-header {
  color: #666;
  font-size: 0.9rem;
}

/* 响应式调整 */
@media (max-width: 992px) {
  .d-flex.flex-column.flex-lg-row {
    flex-direction: column !important;
  }

  .main-content {
    width: 100%;
  }
}
</style>
