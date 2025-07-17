<!-- ChapterItem.vue - 章节项组件 -->
<template>
  <div class="chapter-item mb-3">
    <div 
      class="chapter-header d-flex justify-content-between align-items-center"
      @click="toggleExpanded"
      role="button"
      :aria-expanded="isExpanded"
    >
      <div class="d-flex align-items-center">
        <i 
          class="fas fa-chevron-right chapter-arrow me-2"
          :class="{ 'rotated': isExpanded }"
        ></i>
        <h5 class="mb-0">{{ chapter.title }}</h5>
      </div>
      <span class="badge bg-light text-dark">{{ chapter.lessonCount }}{{ getCountUnit() }}</span>
    </div>
    
    <div 
      class="collapse chapter-lessons mt-2"
      :class="{ 'show': isExpanded }"
    >
      <LessonRow
        v-for="lesson in chapter.lessons"
        :key="lesson.id"
        :lesson="lesson"
        @click="handleLessonClick(lesson)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import LessonRow from './LessonRow.vue'
import type { Chapter, Lesson } from '../types/course'

interface Props {
  chapter: Chapter
}

const props = defineProps<Props>()
const emit = defineEmits<{
  lessonClick: [lesson: Lesson]
}>()

const isExpanded = ref(props.chapter.isExpanded || false)

const toggleExpanded = () => {
  isExpanded.value = !isExpanded.value
}

const getCountUnit = () => {
  return props.chapter.title.includes('资料') ? '项' : '课时'
}

const handleLessonClick = (lesson: Lesson) => {
  emit('lessonClick', lesson)
}
</script>

<style scoped>
/* 章节样式 - 独立卡片效果 */
.chapter-item {
  background: white;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  overflow: hidden;
  font-size: 14px;
  margin-bottom: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
  transition: box-shadow 0.3s ease;
}

.chapter-item:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
}

.chapter-item h5 {
  font-size: 16px;
  font-weight: 500;
}

.chapter-header {
  padding: 16px 20px;
  background-color: #f8f9fa;
  cursor: pointer;
  transition: all 0.3s ease;
  border-bottom: 1px solid #e9ecef;
}

.chapter-header:hover {
  background-color: #e9ecef;
}

/* 箭头动画 */
.chapter-arrow {
  transition: transform 0.3s ease;
  color: #6c757d;
  font-size: 12px;
}

.chapter-arrow.rotated {
  transform: rotate(90deg);
}

/* 课时样式 */
.chapter-lessons {
  background-color: #fff;
  padding: 0;
}

/* 徽章样式 */
.badge {
  background-color: #e9ecef !important;
  color: #6c757d !important;
  font-weight: 500;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
}
</style> 