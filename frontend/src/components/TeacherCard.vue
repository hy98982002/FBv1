<!-- TeacherCard.vue - 讲师信息卡片组件 -->
<template>
  <div class="teacher-card">
    <div class="teacher-card-content">
      <div class="teacher-avatar">
        <img src="/img/tou03.png" alt="老师头像" />
      </div>
      <div class="teacher-info">
        <h5 class="teacher-name">小雨宿 · 资深讲师</h5>
        <p class="teacher-field">交互设计 & Unity</p>
      </div>
      <div class="teacher-action">
        <div class="view-courses-btn" @click="handleViewCourses">
          查看该老师全部课程
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const handleViewCourses = () => {
  console.log('查看该老师全部课程')
  // TODO: 跳转到老师课程列表页面
}
</script>

<style scoped>
.teacher-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  margin-top: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.teacher-card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.teacher-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  background: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
}

.teacher-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.teacher-info {
  text-align: center;
}

.teacher-name {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0 0 4px 0;
  line-height: 1.4;
}

.teacher-field {
  font-size: 14px;
  color: #666;
  margin: 0 0 12px 0;
  line-height: 1.4;
}

.teacher-action {
  width: 100%;
}

.view-courses-btn {
  background: rgba(30, 127, 152, 0.1);
  color: #1E7F98;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  width: 100%;
  box-sizing: border-box;
  
  /* 确保没有任何边框 */
  border: none;
  outline: none;
  box-shadow: none;
}

.view-courses-btn:hover {
  background: rgba(30, 127, 152, 0.2);
  color: #1E7F98;
  transform: translateY(-1px);
  
  /* 悬停时也确保没有边框 */
  border: none;
  outline: none;
  box-shadow: 0 2px 8px rgba(30, 127, 152, 0.15);
}

.view-courses-btn:focus {
  /* 聚焦时也确保没有边框 */
  border: none;
  outline: none;
  box-shadow: 0 0 0 2px rgba(30, 127, 152, 0.2);
}

.view-courses-btn:active {
  transform: translateY(0);
  background: rgba(30, 127, 152, 0.25);
}

/* 强制移除所有可能的边框来源 */
.teacher-card,
.teacher-card *,
.teacher-card-content,
.teacher-card-content *,
.view-courses-btn {
  border: none !important;
  border-width: 0 !important;
  border-color: transparent !important;
  outline: none !important;
}
</style> 