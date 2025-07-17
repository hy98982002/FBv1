<!-- CourseIntro.vue - 课程介绍组件 -->
<template>
  <div class="bg-white rounded p-3">
    <h4 class="mb-3">课程介绍</h4>
    <p>{{ courseDescription }}</p>

    <p>在课程中，您将学习：</p>
    <ul>
      <li v-for="(item, index) in learningPoints" :key="index">{{ item }}</li>
    </ul>

    <p>{{ additionalDescription }}</p>

    <div class="alert alert-info mt-3">
      <i class="fas fa-info-circle me-2"></i>
      <strong>适合人群：</strong> {{ suitableFor }}
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  courseDescription?: string
  learningPoints?: string[]
  additionalDescription?: string
  suitableFor?: string
}

withDefaults(defineProps<Props>(), {
  courseDescription: '这门课程是专为Unity初学者设计的入门教程，致力于帮助学生从零基础开始，掌握Unity游戏引擎的基本操作和数字孪生系统的开发技巧。',
  learningPoints: () => [
    'Unity界面基础操作与项目配置',
    '3D模型导入与场景构建技巧',
    '基础C#脚本编程知识',
    '智慧城市系统的核心组件开发',
    '数字孪生技术在现代城市规划中的应用'
  ],
  additionalDescription: '无论您是想进入游戏开发行业，还是对数字孪生技术感兴趣，这门课程都将为您打下坚实的基础。',
  suitableFor: '大学生、转行人士、游戏开发爱好者、智慧城市研究人员'
})
</script>

<style scoped>
.alert-info {
  background-color: #d1ecf1;
  border-color: #b8daff;
  color: #0c5460;
}
</style> 