<!-- CourseCatalog.vue - 课程目录组件 -->
<template>
  <div class="bg-white rounded p-3">
    <h4 class="mt-5 mb-3">课程目录</h4>
    <div class="catalog-wrapper">
      <ChapterItem
        v-for="(chapter, index) in chapters"
        :key="index"
        :chapter="chapter"
        @lesson-click="handleLessonClick"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import ChapterItem from './ChapterItem.vue'
import type { Chapter, Lesson } from '../types/course'

interface Props {
  chapters?: Chapter[]
}

withDefaults(defineProps<Props>(), {
  chapters: () => [
    {
      id: 'resources',
      title: '课程相关资料',
      lessonCount: 2,
      lessons: [
        {
          id: 'group',
          title: '加入交流群',
          duration: '',
          isFree: true
        },
        {
          id: 'files',
          title: '课程相关文件',
          duration: '',
          isFree: true
        }
      ]
    },
    {
      id: 'chapter1',
      title: '第一章：基本操作(免费试看)',
      lessonCount: 3,
      isExpanded: true,
      lessons: [
        {
          id: 'lesson1-1',
          title: '第一节：WorldMachine基础操作',
          duration: '0.2小时',
          isFree: true
        },
        {
          id: 'lesson1-2',
          title: '第二节：WorldMachine项目设置',
          duration: '0.2小时',
          isFree: true
        }
      ]
    },
    {
      id: 'chapter2',
      title: '第二章：基础构造',
      lessonCount: 4,
      lessons: [
        {
          id: 'lesson2-1',
          title: '第一节：基础地形制作',
          duration: '0.1小时',
          isFree: false
        },
        {
          id: 'lesson2-2',
          title: '第二节：地形细节处理',
          duration: '0.1小时',
          isFree: false
        }
      ]
    },
    {
      id: 'chapter3',
      title: '第三章：组合节点',
      lessonCount: 5,
      lessons: [
        {
          id: 'lesson3-1',
          title: '第一节：节点组合基础',
          duration: '0.1小时',
          isFree: false
        },
        {
          id: 'lesson3-2',
          title: '第二节：高级节点应用',
          duration: '0.99小时',
          isFree: false
        },
        {
          id: 'lesson3-3',
          title: '第三节：复杂组合技巧',
          duration: '0.1小时',
          isFree: false
        },
        {
          id: 'lesson3-4',
          title: '第四节：实战案例演示',
          duration: '0.1小时',
          isFree: false
        },
        {
          id: 'lesson3-5',
          title: '第五节：总结与拓展',
          duration: '0.1小时',
          isFree: false
        }
      ]
    }
  ]
})

const handleLessonClick = (lesson: Lesson) => {
  console.log('课程点击：', lesson)
  // TODO: 处理课程点击事件
}
</script>

<style scoped>
.catalog-wrapper {
  /* 移除背景色，让每个章节卡片独立显示 */
}
</style> 