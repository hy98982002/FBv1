import { defineStore } from 'pinia'
import type { Course, StageKey } from '../types'

// 导入图片资源
import tiyanPythonCover from '@/assets/images/tiyan-python-cover.jpg'
import tiyanXuhuanCover from '@/assets/images/tiyan-xuhuan-cover.jpg'
import tiyanPhotoshopCover from '@/assets/images/tiyan-photoshop-cover.jpg'
import rumenPythonCover from '@/assets/images/rumen-python-cover.jpg'
import rumenXuhuanCover from '@/assets/images/rumen-xuhuan-cover.jpg.jpg'
import rumenPhotoshopCover from '@/assets/images/rumen-photoshop-cover.jpg.jpg'
import jingjinPythonCover from '@/assets/images/jingjin-python-cover.jpg'
import jingjinXuhuanCover from '@/assets/images/jingjin-xuhuan-cover.jpg.jpg'
import jingjinPhotoshopCover from '@/assets/images/jingjin-photoshop-cover.jpg.jpg'
import shizhanPythonCover from '@/assets/images/shizhan-python-cover.jpg'
import shizhanXuhuanCover from '@/assets/images/shizhan-xuhuan-cover.jpg.jpg'
import shizhanPhotoshopCover from '@/assets/images/shizhan-photoshop-cover.jpg.jpg'
import huiyuanLogoCover from '@/assets/images/huiyuan-logo-cover.png'
import huiyuanLogo2Cover from '@/assets/images/huiyuan-logo2-cover.png'
import xiangmuluodiPsCover from '@/assets/images/xiangmuluodi-ps-cover.png'
import xiangmuluodiPs2Cover from '@/assets/images/xiangmuluodi-ps2-cover.png'

export const useCourseStore = defineStore('course', {
  state: () => ({
    courses: [
      {
        id: 1,
        title: 'Photoshop体验课',
        description: '零基础入门Photoshop编程',
        price: 0,
        stage: 'free',
        cover: tiyanPythonCover,
        tags: ['photoshop', 'AIGC'],
        rating: 4.5,
        enrolled: 1200,
        duration: '2小时',
        level: '入门',
        instructor: '张老师'
      },
      {
        id: 2,
        title: '虚幻引擎体验课',
        description: '虚幻引擎游戏开发入门',
        price: 0,
        stage: 'free',
        cover: tiyanXuhuanCover,
        tags: ['UE', '游戏开发', '入门'],
        rating: 4.3,
        enrolled: 800,
        duration: '2小时',
        level: '入门',
        instructor: '李老师'
      },
      {
        id: 3,
        title: 'Photoshop体验课',
        description: 'PS图像处理基础入门',
        price: 0,
        stage: 'free',
        cover: tiyanPhotoshopCover,
        tags: ['Photoshop', '图像处理', '入门'],
        rating: 4.7,
        enrolled: 1500,
        duration: '2小时',
        level: '入门',
        instructor: '王老师'
      },
      {
        id: 4,
        title: 'Python入门课程',
        description: 'Python编程基础知识',
        price: 199,
        stage: 'basic',
        cover: tiyanPythonCover,
        tags: ['Python', '基础', '入门'],
        rating: 4.6,
        enrolled: 2000,
        duration: '20小时',
        level: '初级',
        instructor: '张老师'
      },
      {
        id: 5,
        title: 'illustrator基础课程',
        description: 'illustrator核心概念',
        price: 299,
        stage: 'basic',
        cover: rumenPythonCover,
        tags: ['illustrator', 'logo设计', 'AIGC'],
        rating: 4.8,
        enrolled: 1800,
        duration: '30小时',
        level: '初级',
        instructor: '张老师'
      },
      {
        id: 6,
        title: '虚幻引擎入门课程',
        description: '虚幻引擎基础开发',
        price: 299,
        stage: 'basic',
        cover: rumenXuhuanCover,
        tags: ['UE', '基础', '入门'],
        rating: 4.4,
        enrolled: 1200,
        duration: '25小时',
        level: '初级',
        instructor: '李老师'
      },
      {
        id: 7,
        title: 'Photoshop入门课程',
        description: 'PS图像处理基础技巧',
        price: 199,
        stage: 'basic',
        cover: rumenPhotoshopCover,
        tags: ['Photoshop', 'AIGC', '入门'],
        rating: 4.5,
        enrolled: 1600,
        duration: '15小时',
        level: '初级',
        instructor: '王老师'
      },
      {
        id: 8,
        title: 'Python进阶课程',
        description: 'Python高级编程技巧',
        price: 599,
        stage: 'advanced',
        cover: jingjinPythonCover,
        tags: ['Python', '高级', '进阶'],
        rating: 4.9,
        enrolled: 800,
        duration: '40小时',
        level: '中级',
        instructor: '张老师'
      },
      {
        id: 9,
        title: 'logo分析',
        description: 'Python数据处理与分析',
        price: 699,
        stage: 'advanced',
        cover: jingjinPythonCover,
        tags: ['illustrator', 'logo设计', 'AIGC'],
        rating: 4.7,
        enrolled: 600,
        duration: '35小时',
        level: '中级',
        instructor: '张老师'
      },
      {
        id: 10,
        title: '虚幻引擎进阶课程',
        description: '虚幻引擎高级开发技巧',
        price: 699,
        stage: 'advanced',
        cover: jingjinXuhuanCover,
        tags: ['UE', '游戏开发', 'AIGC'],
        rating: 4.6,
        enrolled: 500,
        duration: '45小时',
        level: '中级',
        instructor: '李老师'
      },
      {
        id: 11,
        title: 'Photoshop场景环境课程',
        description: 'PS高级图像处理技巧',
        price: 499,
        stage: 'advanced',
        cover: jingjinPhotoshopCover,
        tags: ['Photoshop', 'AIGC', '场景设计'],
        rating: 4.8,
        enrolled: 700,
        duration: '30小时',
        level: '中级',
        instructor: '王老师'
      },
      {
        id: 12,
        title: 'Python Web开发',
        description: 'Python Web应用开发',
        price: 799,
        stage: 'advanced',
        cover: jingjinPythonCover,
        tags: ['Python', 'Web', 'Django'],
        rating: 4.5,
        enrolled: 400,
        duration: '50小时',
        level: '中级',
        instructor: '张老师'
      },
      {
        id: 13,
        title: 'Python实战项目',
        description: 'Python项目实战开发',
        price: 999,
        stage: 'project',
        cover: shizhanPythonCover,
        tags: ['Python', '实战', '项目'],
        rating: 4.9,
        enrolled: 300,
        duration: '60小时',
        level: '高级',
        instructor: '张老师'
      },
      {
        id: 14,
        title: '虚幻引擎实战项目',
        description: '虚幻引擎游戏项目开发',
        price: 1199,
        stage: 'project',
        cover: shizhanXuhuanCover,
        tags: ['UE', '实战', '项目'],
        rating: 4.8,
        enrolled: 200,
        duration: '70小时',
        level: '高级',
        instructor: '李老师'
      },
      {
        id: 15,
        title: 'Photoshop实战项目',
        description: 'PS综合项目实战',
        price: 899,
        stage: 'project',
        cover: shizhanPhotoshopCover,
        tags: ['Photoshop', '实战', '项目'],
        rating: 4.7,
        enrolled: 400,
        duration: '40小时',
        level: '高级',
        instructor: '王老师'
      },
      {
        id: 16,
        title: 'Python企业项目',
        description: 'Python企业级应用开发',
        price: 1299,
        stage: 'project',
        cover: shizhanPythonCover,
        tags: ['Python', '企业', '项目'],
        rating: 4.9,
        enrolled: 150,
        duration: '80小时',
        level: '高级',
        instructor: '张老师'
      },
      {
        id: 17,
        title: 'Logo设计基础',
        description: '企业品牌Logo设计入门',
        price: 299,
        stage: 'basic',
        cover: huiyuanLogoCover,
        tags: ['Logo', '设计', '入门'],
        rating: 4.5,
        enrolled: 800,
        duration: '15小时',
        level: '初级',
        instructor: '王老师'
      },
      {
        id: 18,
        title: 'Logo设计进阶',
        description: '高级品牌Logo设计技巧',
        price: 599,
        stage: 'advanced',
        cover: huiyuanLogo2Cover,
        tags: ['Logo', '设计', '进阶'],
        rating: 4.7,
        enrolled: 400,
        duration: '25小时',
        level: '中级',
        instructor: '王老师'
      },
      {
        id: 19,
        title: 'PS项目实战-电商设计',
        description: '电商平台视觉设计项目',
        price: 899,
        stage: 'project',
        cover: xiangmuluodiPsCover,
        tags: ['Photoshop', '电商', '设计'],
        rating: 4.8,
        enrolled: 300,
        duration: '40小时',
        level: '高级',
        instructor: '王老师'
      },
      {
        id: 20,
        title: 'PS项目实战-品牌设计',
        description: '企业品牌视觉设计项目',
        price: 999,
        stage: 'landing',
        cover: xiangmuluodiPs2Cover,
        tags: ['Photoshop', '品牌', '设计'],
        isFree: false,
        rating: 4.9,
        enrolled: 200,
        duration: '45小时',
        level: '高级',
        instructor: '王老师'
      }
    ] as Course[],
    currentStage: 'free' as StageKey,
    selectedTags: [] as string[],
    showVipOnly: false,
    searchKeyword: ''
  }),
  getters: {
    getCoursesByStage: state => (stage: string) => state.courses.filter(c => c.stage === stage),
    filteredCourses: state => {
      let result = state.courses
      if (state.showVipOnly) {
        result = result.filter(c => c.isVip)
      } else if (state.currentStage) {
        result = result.filter(c => c.stage === state.currentStage)
      }
      if (state.selectedTags.length) {
        result = result.filter(c => c.tags && c.tags.some(t => state.selectedTags.includes(t)))
      }
      if (state.searchKeyword) {
        const k = state.searchKeyword.toLowerCase()
        result = result.filter(c => c.title.toLowerCase().includes(k))
      }
      return result
    },
    popularTags: state => {
      const map: Record<string, number> = {}
      state.courses.forEach(c => {
        ;(c.tags || []).forEach(t => {
          map[t] = (map[t] || 0) + 1
        })
      })
      return Object.keys(map).sort((a, b) => map[b] - map[a])
    }
  },
  actions: {
    setCurrentStageOnly(stage: StageKey) {
      // @ts-ignore
      this.currentStage = stage
    },
    toggleTag(tag: string) {
      // @ts-ignore
      // 单选模式：如果点击的是已选中的标签，则取消选择；否则选择新标签
      if (this.selectedTags.includes(tag)) {
        this.selectedTags = []
      } else {
        this.selectedTags = [tag]
      }
    },
    setShowVipOnly(vip: boolean) {
      // @ts-ignore
      this.showVipOnly = vip
    }
  }
})
