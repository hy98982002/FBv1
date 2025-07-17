<!-- CourseTabs.vue - 课程标签页容器组件 -->
<template>
  <div class="container mt-0">
    <div>
      <ul class="nav nav-tabs" id="courseTab" role="tablist">
        <li class="nav-item" role="presentation">
          <button 
            class="nav-link"
            :class="{ active: activeTab === 'intro' }"
            @click="setActiveTab('intro')"
            type="button"
            role="tab"
          >
            简介
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button 
            class="nav-link"
            :class="{ active: activeTab === 'catalog' }"
            @click="setActiveTab('catalog')"
            type="button"
            role="tab"
          >
            目录
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button 
            class="nav-link"
            :class="{ active: activeTab === 'comment' }"
            @click="setActiveTab('comment')"
            type="button"
            role="tab"
          >
            评价
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button 
            class="nav-link"
            :class="{ active: activeTab === 'materials' }"
            @click="setActiveTab('materials')"
            type="button"
            role="tab"
          >
            相关课程
          </button>
        </li>
      </ul>
    </div>

    <div class="tab-content mt-0">
      <!-- 课程介绍 -->
      <div 
        class="tab-pane fade"
        :class="{ 'show active': activeTab === 'intro' }"
        role="tabpanel"
      >
        <CourseIntro />
      </div>

      <!-- 课程目录 -->
      <div 
        class="tab-pane fade"
        :class="{ 'show active': activeTab === 'catalog' }"
        role="tabpanel"
      >
        <CourseCatalog />
      </div>

      <!-- 课程评价 -->
      <div 
        class="tab-pane fade"
        :class="{ 'show active': activeTab === 'comment' }"
        role="tabpanel"
      >
        <CourseReviews />
      </div>

      <!-- 相关课程 -->
      <div 
        class="tab-pane fade"
        :class="{ 'show active': activeTab === 'materials' }"
        role="tabpanel"
      >
        <CourseRelated />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CourseIntro from './CourseIntro.vue'
import CourseCatalog from './CourseCatalog.vue'
import CourseReviews from './CourseReviews.vue'
import CourseRelated from './CourseRelated.vue'

interface Props {
  defaultTab?: string
}

const props = withDefaults(defineProps<Props>(), {
  defaultTab: 'catalog'
})

const activeTab = ref(props.defaultTab)

const setActiveTab = (tab: string) => {
  activeTab.value = tab
  console.log('切换到标签页：', tab)
}
</script>

<style scoped>
/* Tab 容器样式 */
.nav-tabs {
  border: 1.5px solid var(--uai-tech-blue, #1E7F98);
  border-radius: 10px;
  overflow: hidden;
  background-color: #ffffff;
  display: inline-flex;
  margin-bottom: 20px;
  padding: 0 !important;
  font-size: 0; /* 消除按钮间隙 */
}

/* Tab 项样式 */
.nav-tabs .nav-item {
  margin: 0 !important;
  padding: 0 !important;
  font-size: 18px;
}

/* Tab 链接样式 */
.nav-tabs .nav-item .nav-link {
  border: none !important;
  border-radius: 0;
  color: var(--uai-tech-blue, #1E7F98) !important;
  padding: 8px 20px;
  transition: all 0.3s ease;
  white-space: nowrap;
  min-width: 0;
  background-color: transparent !important;
  margin: 0 !important;
  display: block;
}

/* Tab 悬停效果 */
.nav-tabs .nav-item .nav-link:hover {
  background-color: var(--uai-hover-blue, rgba(35, 192, 247, 0.3)) !important;
  color: #000000 !important;
}

/* Tab 激活状态 */
.nav-tabs .nav-item .nav-link.active {
  background-color: rgba(35, 192, 247, 0.3) !important;
  color: #000000 !important;
}

/* 移除 Tab 焦点效果 */
.nav-tabs .nav-item .nav-link:focus {
  outline: none !important;
  box-shadow: none !important;
}
</style> 