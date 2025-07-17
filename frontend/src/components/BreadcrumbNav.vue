<!-- BreadcrumbNav.vue - 面包屑导航组件 -->
<template>
  <div class="container">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb bg-light py-2 mb-1">
        <li 
          v-for="(item, index) in breadcrumbItems" 
          :key="index"
          class="breadcrumb-item"
          :class="{ active: index === breadcrumbItems.length - 1 }"
          :aria-current="index === breadcrumbItems.length - 1 ? 'page' : undefined"
        >
          <a 
            v-if="index !== breadcrumbItems.length - 1"
            :href="item.href"
            @click.prevent="handleBreadcrumbClick(item)"
          >
            {{ item.title }}
          </a>
          <span v-else>{{ item.title }}</span>
        </li>
      </ol>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface BreadcrumbItem {
  title: string
  href?: string
  path?: string
}

interface Props {
  items?: BreadcrumbItem[]
}

const props = withDefaults(defineProps<Props>(), {
  items: () => [
    { title: '首页', href: '/', path: '/' },
    { title: 'Unity', href: '/category/unity', path: '/category/unity' },
    { title: '零基础photoshopAI创意设计第一季' }
  ]
})

const breadcrumbItems = computed(() => props.items)

const handleBreadcrumbClick = (item: BreadcrumbItem) => {
  console.log('面包屑点击：', item)
  // TODO: 实现路由跳转
  if (item.path) {
    // 使用 Vue Router 进行跳转
    // router.push(item.path)
  }
}
</script>

<style scoped>
/* 面包屑导航样式 */
.breadcrumb {
  margin-top: 0.5rem;
  margin-left: -1rem;
  font-size: 16px;
  color: #888 !important;
}

.breadcrumb a {
  color: #888 !important;
  text-decoration: none;
}

.breadcrumb a:hover {
  text-decoration: underline;
  text-underline-offset: 4px;
}
</style> 