<!-- LessonRow.vue - 课程行组件 -->
<template>
  <div class="lesson-item">
    <div class="d-flex align-items-center">
      <i :class="getIconClass()" class="me-2"></i>
      <span>{{ lesson.title }}</span>
    </div>
    <div class="d-flex align-items-center">
      <span 
        v-if="lesson.duration" 
        class="text-muted small me-3"
      >
        {{ lesson.duration }}
      </span>
      <button 
        class="btn btn-sm"
        :class="getButtonClass()"
        @click="handleClick"
      >
        {{ getButtonText() }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Lesson } from '../types/course'

interface Props {
  lesson: Lesson
}

const props = defineProps<Props>()
const emit = defineEmits<{
  click: []
}>()

const getIconClass = () => {
  if (props.lesson.title.includes('交流群')) {
    return 'fas fa-users text-info'
  } else if (props.lesson.title.includes('文件') || props.lesson.title.includes('下载')) {
    return 'fas fa-file-download text-info'
  } else {
    return 'fas fa-play-circle text-info'
  }
}

const getButtonClass = () => {
  if (props.lesson.isFree) {
    return 'btn-outline-info'
  } else {
    return 'btn-outline-secondary'
  }
}

const getButtonText = () => {
  if (props.lesson.title.includes('交流群')) {
    return '立即加入'
  } else if (props.lesson.title.includes('文件') || props.lesson.title.includes('下载')) {
    return '下载'
  } else if (props.lesson.isFree) {
    return '免费试看'
  } else {
    return '立即学习'
  }
}

const handleClick = () => {
  console.log('课程行点击：', props.lesson)
  emit('click')
}
</script>

<style scoped>
.lesson-item {
  padding: 12px 20px;
  border-top: 1px solid #f0f0f0;
  transition: background-color 0.3s ease;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.lesson-item:first-child {
  border-top: none;
}

.lesson-item:hover {
  background-color: #f8f9fa;
}

/* 播放图标样式 */
.fa-play-circle,
.fa-users,
.fa-file-download {
  color: #1E7F98;
  font-size: 14px;
}

/* 按钮样式 */
.btn-outline-info {
  border-color: #1E7F98;
  color: #1E7F98;
  font-size: 12px;
  padding: 4px 12px;
  border-radius: 4px;
  font-weight: 500;
}

.btn-outline-info:hover {
  background-color: #1E7F98;
  color: #fff;
  border-color: #1E7F98;
}

.btn-outline-secondary {
  border-color: #6c757d;
  color: #6c757d;
  font-size: 12px;
  padding: 4px 12px;
  border-radius: 4px;
  font-weight: 500;
}

.btn-outline-secondary:hover {
  background-color: #6c757d;
  color: #fff;
  border-color: #6c757d;
}

/* 时长文字样式 */
.text-muted.small {
  color: #999 !important;
  font-size: 12px;
}
</style> 