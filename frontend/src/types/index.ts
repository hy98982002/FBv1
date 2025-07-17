// 课程阶段枚举 - 统一管理所有可能的阶段
export const STAGES = {
  free: '体验',
  basic: '入门',
  advanced: '精进',
  project: '实战',
  landing: '项目落地'
} as const

export type StageKey = keyof typeof STAGES
export type StageValue = (typeof STAGES)[StageKey]

// 阶段样式映射
export const STAGE_STYLES = {
  free: { textClass: 'text-success', bgClass: 'bg-success-subtle', label: '免费' },
  basic: { textClass: 'text-primary', bgClass: 'bg-primary-subtle', label: '入门' },
  advanced: { textClass: 'text-info', bgClass: 'bg-info-subtle', label: '精进' },
  project: { textClass: 'text-warning', bgClass: 'bg-warning-subtle', label: '实战' },
  landing: { textClass: 'text-danger', bgClass: 'bg-danger-subtle', label: '项目落地' }
} as const

// 课程卡片模板类型
export type CourseCardTemplate =
  | 'tiyan'
  | 'rumen'
  | 'jingjin'
  | 'shizhan'
  | 'xiangmushizhan'
  | 'huiyuan'

// 课程卡片模板配置
export interface CourseCardConfig {
  level: string // 等级标签 (体验、入门、精进、实战等)
  priceRange: [number, number] // 价格范围 [最小值, 最大值]
  learnerRange: [number, number] // 学员数范围
  isFree: boolean // 是否免费
  isVip: boolean // 是否会员专享
  levelStyle: 'success' | 'primary' | 'info' | 'warning' | 'danger' // 等级标签样式
}

// 课程卡片模板映射
export const COURSE_CARD_TEMPLATES: Record<CourseCardTemplate, CourseCardConfig> = {
  tiyan: {
    level: '体验',
    priceRange: [0, 0],
    learnerRange: [180, 280],
    isFree: true,
    isVip: false,
    levelStyle: 'success'
  },
  rumen: {
    level: '入门',
    priceRange: [99, 299],
    learnerRange: [120, 220],
    isFree: false,
    isVip: false,
    levelStyle: 'primary'
  },
  jingjin: {
    level: '精进',
    priceRange: [199, 399],
    learnerRange: [100, 200],
    isFree: false,
    isVip: false,
    levelStyle: 'info'
  },
  shizhan: {
    level: '实战',
    priceRange: [99, 199],
    learnerRange: [200, 400],
    isFree: false,
    isVip: false,
    levelStyle: 'warning'
  },
  xiangmushizhan: {
    level: '项目实战',
    priceRange: [299, 599],
    learnerRange: [80, 150],
    isFree: false,
    isVip: false,
    levelStyle: 'danger'
  },
  huiyuan: {
    level: '会员专享',
    priceRange: [0, 0],
    learnerRange: [50, 120],
    isFree: true,
    isVip: true,
    levelStyle: 'warning'
  }
}

// 从图片路径提取模板类型的函数
export function getTemplateFromImagePath(imagePath: string): CourseCardTemplate {
  const filename = imagePath.split('/').pop() || ''

  if (filename.startsWith('tiyan-')) return 'tiyan'
  if (filename.startsWith('rumen-')) return 'rumen'
  if (filename.startsWith('jingjin-')) return 'jingjin'
  if (filename.startsWith('shizhan-')) return 'shizhan'
  if (filename.startsWith('xiangmushizhan-')) return 'xiangmushizhan'
  if (filename.startsWith('huiyuan-')) return 'huiyuan'

  // 默认返回体验模板
  return 'tiyan'
}

// 生成随机价格和学员数的工具函数
export function generateCourseData(template: CourseCardTemplate) {
  const config = COURSE_CARD_TEMPLATES[template]

  const price = config.isFree
    ? 0
    : Math.floor(Math.random() * (config.priceRange[1] - config.priceRange[0] + 1)) +
      config.priceRange[0]

  const learnerCount =
    Math.floor(Math.random() * (config.learnerRange[1] - config.learnerRange[0] + 1)) +
    config.learnerRange[0]

  return {
    level: config.level,
    price,
    learnerCount,
    isFree: config.isFree,
    isVip: config.isVip,
    levelStyle: config.levelStyle
  }
}

// 课程接口
export interface Course {
  id: number
  title: string
  cover: string
  stage: StageKey
  camp?: 'skill' | 'career' | 'enterprise' // 营区归属
  tags: string[] // 子标签数组，用于过滤
  price?: number
  originalPrice?: number
  learnerCount?: number
  rating?: number
  reviewCount?: number
  duration?: string // 课程时长
  level?: string // 难度级别
  badge?: string // 课程徽章
  description?: string
  instructor?: string
  isHot?: boolean
  isFree?: boolean
  isVip?: boolean // 是否会员专享
  enrolled?: number // 兼容旧字段，等同于 learnerCount
}

// 教师接口
export interface Teacher {
  id: number
  name: string
  avatar: string
  title: string
  specialty: string
  experience: string
  description?: string
}

// 营区数据接口
export interface CampData {
  title: string
  subtitle: string
  stageOrder: StageKey[] // 该营区显示的阶段顺序
  courses: Course[]
}

// 子标签接口
export interface SubTag {
  id: string
  name: string
  isActive?: boolean
}

// 专区按钮接口
export interface ZoneButton {
  id: string
  name: string
  target: string
  isActive?: boolean
}

// 轮播图接口
export interface CarouselItem {
  id: number
  image: string
  title: string
  subtitle: string
  link?: string
}

// API响应接口
export interface ApiResponse<T = any> {
  status: number
  data: T
  msg: string
}

// 分页接口
export interface PaginationData<T = any> {
  items: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

// 筛选条件接口
export interface CourseFilter {
  stage?: StageKey
  camp?: string
  tags?: string[]
  search?: string
  minPrice?: number
  maxPrice?: number
  isFree?: boolean
}

// 导航菜单项接口
export interface NavMenuItem {
  id: string
  label: string
  href?: string
  children?: NavMenuItem[]
}

// 课程详情页相关类型定义
export interface Lesson {
  id: string
  title: string
  duration: string
  isFree?: boolean
  isCompleted?: boolean
}

export interface Chapter {
  id: string
  title: string
  lessonCount: number
  lessons: Lesson[]
  isExpanded?: boolean
}

export interface CourseInfo {
  title: string
  coverImage: string
  difficulty: string
  updatedLessons: number
  isFree: boolean
  price?: number
}

export interface Review {
  id: string
  userName: string
  userAvatar: string
  rating: number
  content: string
  date: string
}

export interface BreadcrumbItem {
  title: string
  href?: string
  path?: string
}
