<!-- SidebarPricingCard.vue - 全新设计的侧边栏价格卡片组件 -->
<template>
  <div class="sidebar-container">
    <!-- 价格卡片 -->
    <div class="price-card">
      <!-- 特惠标题 -->
      <div class="promo-header">
        <div class="promo-icon">⏰</div>
        <span class="promo-text">五一限时七折特惠</span>
      </div>
      
      <!-- 活动时间 -->
      <div class="activity-time">
        活动结束时间：2025年05月16日
      </div>
      
      <!-- 价格区域 -->
      <div class="price-section">
        <div class="current-price">¥896.00</div>
        <div class="original-price">¥1280.00</div>
      </div>
      
      <!-- VIP价格 -->
      <div class="vip-section">
        <span class="vip-label">超级会员价</span>
        <span class="vip-price">¥806.40</span>
        <span class="vip-link" @click="handleJoinVip">立即加入>>></span>
      </div>
      
      <!-- 购物车按钮 -->
      <div class="cart-button" @click="handleAddToCart">
        🛒 加入购物车
      </div>
      
      <!-- 优惠券按钮 -->
      <div class="coupon-button" @click="handleGetCoupon">
        🎫 领取专属优惠券
      </div>
      
      <!-- 服务标签 -->
      <div class="service-section">
        <div class="service-label">承诺服务</div>
        <div class="service-tags">
          <div class="service-tag-wrapper" v-for="tag in serviceTags" :key="tag.name">
            <span class="service-tag" :title="tag.desc">
              {{ tag.name }}
            </span>
            <div class="service-popup">
              <div class="popup-header">
                <h6>{{ tag.title }}</h6>
              </div>
              <div class="popup-content">
                <p>{{ tag.desc }}</p>
              </div>
              <!-- 小箭头 -->
              <div class="popup-arrow"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 讲师卡片 -->
    <div class="teacher-card">
      <div class="teacher-avatar">
        <img src="/img/tou03.png" alt="老师头像" />
      </div>
      <div class="teacher-name">小雨宿 · 资深讲师</div>
      <div class="teacher-field">交互设计 & Unity</div>
      <div class="teacher-courses-btn" @click="handleViewTeacherCourses">
        查看该老师全部课程
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 服务标签数据
const serviceTags = ref([
  { 
    name: '练', 
    title: '24小时作业批阅', 
    desc: '24小时内完成作业批阅，即时反馈并巩固您的学习效果' 
  },
  { 
    name: '试', 
    title: '免费课程试听', 
    desc: '精选课程内容免费体验，提前感受优质教学' 
  },
  { 
    name: '问', 
    title: '在线答疑解惑', 
    desc: '资深讲师实时在线答疑，快速解决学习难题' 
  },
  { 
    name: '疑', 
    title: '疑难问题解决', 
    desc: '专业技术团队一对一指导，助你突破技术瓶颈' 
  },
  { 
    name: '活', 
    title: '丰富课程活动', 
    desc: '定期技术沙龙、项目实战，提升实践能力' 
  },
  { 
    name: '就', 
    title: '就业服务保障', 
    desc: '一站式就业服务，助你快速实现职业提升' 
  }
])

// 事件处理函数
const handleJoinVip = () => {
  console.log('立即加入VIP')
}

const handleAddToCart = () => {
  console.log('加入购物车')
}

const handleGetCoupon = () => {
  console.log('领取专属优惠券')
}

const handleViewTeacherCourses = () => {
  console.log('查看该老师全部课程')
}
</script>

<style scoped>
/* 容器在正常布局流中，但固定不滚动 */
.sidebar-container {
  position: sticky;
  top: 20px;
  width: 100%;
  max-width: 320px;
  z-index: 100;
}

/* 价格卡片 - 使用黄金比例 1.618 */
.price-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 20px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  /* 黄金比例：宽度320px，高度约320/1.618=198px，但内容需要更多空间，所以适当调整 */
  min-height: 420px;
}

/* 特惠标题 */
.promo-header {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.promo-icon {
  color: #1E7F98;
  margin-right: 8px;
  font-size: 16px;
}

.promo-text {
  color: #666;
  font-size: 14px;
}

/* 活动时间 */
.activity-time {
  color: #333;
  font-size: 14px;
  margin-bottom: 16px;
}

/* 价格区域 */
.price-section {
  display: flex;
  align-items: baseline;
  gap: 12px;
  margin-bottom: 12px;
}

.current-price {
  color: #f39c12;
  font-size: 28px;
  font-weight: 600;
}

.original-price {
  color: #999;
  font-size: 16px;
  text-decoration: line-through;
}

/* VIP区域 */
.vip-section {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
  font-size: 14px;
}

.vip-label {
  color: #666;
}

.vip-price {
  color: #f39c12;
  font-weight: 600;
}

.vip-link {
  color: #1E7F98;
  cursor: pointer;
  text-decoration: none;
}

.vip-link:hover {
  color: #35a4be;
}

/* 按钮样式 */
.cart-button {
  background: #1E7F98;
  color: white;
  padding: 12px 0;
  text-align: center;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 12px;
  transition: all 0.3s ease;
}

.cart-button:hover {
  background: #35a4be;
  transform: translateY(-2px);
}

.coupon-button {
  background: transparent;
  color: #1E7F98;
  padding: 10px 0;
  text-align: center;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  margin-bottom: 20px;
  transition: all 0.3s ease;
  border: 2px dashed #1E7F98;
}

.coupon-button:hover {
  background: rgba(30, 127, 152, 0.05);
  border-color: #35a4be;
  color: #35a4be;
}

/* 服务区域 */
.service-section {
  text-align: center;
}

.service-label {
  color: #666;
  font-size: 13px;
  margin-bottom: 12px;
}

.service-tags {
  display: flex;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;
}

/* 服务标签包装器 */
.service-tag-wrapper {
  position: relative;
  display: inline-block;
}

.service-tag {
  background: rgba(30, 127, 152, 0.1);
  color: #1E7F98;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-block;
}

.service-tag:hover {
  background: rgba(30, 127, 152, 0.2);
  transform: translateY(-2px);
}

/* 服务弹出卡片 */
.service-popup {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 12px 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  z-index: 1000;
  width: 200px;
  margin-bottom: 8px;
  pointer-events: none;
}

/* 悬停时显示弹出卡片 */
.service-tag-wrapper:hover .service-popup {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
  transform: translateX(-50%) translateY(-5px);
}

/* 弹出卡片箭头 */
.popup-arrow {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: 8px solid white;
}

.popup-arrow::before {
  content: '';
  position: absolute;
  top: -9px;
  left: -8px;
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: 8px solid #e9ecef;
}

/* 弹出卡片标题 */
.popup-header h6 {
  color: #1E7F98;
  font-weight: 600;
  font-size: 14px;
  margin: 0 0 8px 0;
  padding-bottom: 6px;
  border-bottom: 1px solid rgba(30, 127, 152, 0.1);
}

/* 弹出卡片内容 */
.popup-content p {
  color: #666;
  font-size: 12px;
  line-height: 1.5;
  margin: 0;
}

/* 讲师卡片 - 使用白银比例 1.414 */
.teacher-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  text-align: center;
  /* 白银比例：宽度320px，高度约320/1.414=226px */
  min-height: 226px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
}

/* 头像 */
.teacher-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto;
}

.teacher-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 讲师信息 */
.teacher-name {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.teacher-field {
  font-size: 14px;
  color: #666;
  margin: 0;
}

/* 讲师课程按钮 */
.teacher-courses-btn {
  background: rgba(30, 127, 152, 0.1);
  color: #1E7F98;
  padding: 8px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.teacher-courses-btn:hover {
  background: rgba(30, 127, 152, 0.2);
  transform: translateY(-2px);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .sidebar-container {
    position: static;
    top: auto;
    max-width: 100%;
    margin: 20px 0;
  }
  
  .price-card,
  .teacher-card {
    margin-left: auto;
    margin-right: auto;
  }
}

/* 强制移除所有可能的边框 */
.sidebar-container,
.sidebar-container *,
.price-card,
.price-card *,
.teacher-card,
.teacher-card * {
  box-sizing: border-box;
}

/* 确保没有意外的边框 */
* {
  border: 0 !important;
  outline: 0 !important;
}

/* 但保留虚线边框的优惠券按钮 */
.coupon-button {
  border: 2px dashed #1E7F98 !important;
}

.coupon-button:hover {
  border: 2px dashed #35a4be !important;
}
</style> 