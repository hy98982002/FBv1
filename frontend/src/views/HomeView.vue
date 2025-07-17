<template>
  <div class="home-page">
    <!-- 轮播图区域 -->
    <div class="hero-section" style="margin-top: 60px">
      <!-- 添加负margin-top抵消导航栏高度 -->
      <HeroCarousel />
    </div>

    <!-- 课程专区 -->
    <!-- 整体移动，让‘精品课程’距离轮播图只有6px -->
    <div style="padding-top: 6px">
      <CampSection :show-popular-tags="true" :initial-display-count="8" />
    </div>

    <!-- 师资力量区域 -->
    <section id="teachers" class="teachers-section py-5">
      <div class="container">
        <div class="row mb-5">
          <div class="col-12 text-center">
            <h2 class="section-title" data-aos="fade-up">
              <span class="title-highlight">师资力量</span>
              <span class="title-subtitle">业界专家亲自授课</span>
            </h2>
            <p class="section-description" data-aos="fade-up" data-aos-delay="200">
              来自一线企业的技术专家，拥有丰富的实战经验和教学经验
            </p>
          </div>
        </div>

        <div class="row">
          <div v-for="teacher in featuredTeachers" :key="teacher.id" class="col-lg-3 col-md-6 mb-4">
            <div class="teacher-card" data-aos="fade-up" :data-aos-delay="teacher.id * 100">
              <div class="teacher-avatar">
                <img :src="teacher.avatar" :alt="teacher.name" class="img-fluid" />
                <div class="teacher-overlay">
                  <div class="teacher-social">
                    <a v-if="teacher.github" :href="teacher.github" class="social-link">
                      <i class="fab fa-github"></i>
                    </a>
                    <a v-if="teacher.linkedin" :href="teacher.linkedin" class="social-link">
                      <i class="fab fa-linkedin"></i>
                    </a>
                    <a v-if="teacher.blog" :href="teacher.blog" class="social-link">
                      <i class="fas fa-globe"></i>
                    </a>
                  </div>
                </div>
              </div>
              <div class="teacher-info">
                <h4 class="teacher-name">{{ teacher.name }}</h4>
                <p class="teacher-title">{{ teacher.title }}</p>
                <p class="teacher-company">{{ teacher.company }}</p>
                <div class="teacher-expertise">
                  <span v-for="skill in teacher.skills.slice(0, 3)" :key="skill" class="skill-tag">
                    {{ skill }}
                  </span>
                </div>
                <div class="teacher-stats">
                  <span class="stat">
                    <i class="fas fa-users"></i>
                    {{ teacher.studentCount }}+ 学员
                  </span>
                  <span class="stat">
                    <StarRating :rating="teacher.rating" size="small" class="me-1" />
                    {{ teacher.rating }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row mt-5">
          <div class="col-12 text-center">
            <a href="#teachers" class="btn btn-outline-tech-blue btn-lg">
              查看全部师资
              <i class="fas fa-arrow-right ms-2"></i>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- 学习路径推荐 -->
    <section class="learning-paths py-5">
      <div class="container">
        <div class="row mb-5">
          <div class="col-12 text-center">
            <h2 class="section-title" data-aos="fade-up">
              <span class="title-highlight">学习路径</span>
              <span class="title-subtitle">系统化的职业发展方案</span>
            </h2>
            <p class="section-description" data-aos="fade-up" data-aos-delay="200">
              根据不同职业目标设计的完整学习路径，让你的技术成长更有方向
            </p>
          </div>
        </div>

        <div class="row">
          <div v-for="path in learningPaths" :key="path.id" class="col-lg-4 col-md-6 mb-4">
            <div class="path-card" data-aos="fade-up" :data-aos-delay="path.id * 100">
              <div class="path-icon">
                <i :class="path.icon"></i>
              </div>
              <div class="path-content">
                <h4 class="path-title">{{ path.title }}</h4>
                <p class="path-description">{{ path.description }}</p>
                <div class="path-features">
                  <ul>
                    <li v-for="feature in path.features" :key="feature">{{ feature }}</li>
                  </ul>
                </div>
                <div class="path-meta">
                  <span class="path-duration">
                    <i class="fas fa-clock"></i>
                    {{ path.duration }}
                  </span>
                  <span class="path-level">
                    <i class="fas fa-signal"></i>
                    {{ path.level }}
                  </span>
                </div>
                <button class="btn btn-tech-blue w-100 mt-3">开始学习</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 统计数据展示 -->
    <section class="stats-section py-5">
      <div class="container">
        <div class="row text-center">
          <div class="col-lg-3 col-md-6 mb-4">
            <div class="stat-item" data-aos="fade-up">
              <div class="stat-icon">
                <i class="fas fa-users"></i>
              </div>
              <div class="stat-number">50,000+</div>
              <div class="stat-label">注册学员</div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 mb-4">
            <div class="stat-item" data-aos="fade-up" data-aos-delay="100">
              <div class="stat-icon">
                <i class="fas fa-book-open"></i>
              </div>
              <div class="stat-number">200+</div>
              <div class="stat-label">精品课程</div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 mb-4">
            <div class="stat-item" data-aos="fade-up" data-aos-delay="200">
              <div class="stat-icon">
                <i class="fas fa-chalkboard-teacher"></i>
              </div>
              <div class="stat-number">50+</div>
              <div class="stat-label">专业讲师</div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 mb-4">
            <div class="stat-item" data-aos="fade-up" data-aos-delay="300">
              <div class="stat-icon">
                <i class="fas fa-trophy"></i>
              </div>
              <div class="stat-number">95%</div>
              <div class="stat-label">就业成功率</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 页脚 -->
    <footer class="footer py-5">
      <div class="container">
        <div class="row">
          <div class="col-lg-4 col-md-6 mb-4">
            <div class="footer-section">
              <h5 class="footer-title">
                <img :src="logoImg" alt="UAI Logo" height="30" class="me-2" />
                UAI教育
              </h5>
              <p class="footer-text">
                专注于高质量的在线技术教育，为每一位学员提供最前沿的技术知识和实战技能。
              </p>
              <div class="social-links">
                <a href="#" class="social-link"><i class="fab fa-weixin"></i></a>
                <a href="#" class="social-link"><i class="fab fa-weibo"></i></a>
                <a href="#" class="social-link"><i class="fab fa-qq"></i></a>
                <a href="#" class="social-link"><i class="fab fa-github"></i></a>
              </div>
            </div>
          </div>
          <div class="col-lg-2 col-md-6 mb-4">
            <div class="footer-section">
              <h6 class="footer-title">课程分类</h6>
              <ul class="footer-links">
                <li><a href="#courses">前端开发</a></li>
                <li><a href="#courses">后端开发</a></li>
                <li><a href="#courses">人工智能</a></li>
                <li><a href="#courses">数据科学</a></li>
                <li><a href="#courses">云计算</a></li>
              </ul>
            </div>
          </div>
          <div class="col-lg-2 col-md-6 mb-4">
            <div class="footer-section">
              <h6 class="footer-title">学习支持</h6>
              <ul class="footer-links">
                <li><a href="#">学习指南</a></li>
                <li><a href="#">技术文档</a></li>
                <li><a href="#">社区论坛</a></li>
                <li><a href="#">在线答疑</a></li>
                <li><a href="#">学习工具</a></li>
              </ul>
            </div>
          </div>
          <div class="col-lg-2 col-md-6 mb-4">
            <div class="footer-section">
              <h6 class="footer-title">关于我们</h6>
              <ul class="footer-links">
                <li><a href="/about">公司介绍</a></li>
                <li><a href="#">师资团队</a></li>
                <li><a href="#">联系我们</a></li>
                <li><a href="#">招聘信息</a></li>
                <li><a href="#">合作伙伴</a></li>
              </ul>
            </div>
          </div>
          <div class="col-lg-2 col-md-6 mb-4">
            <div class="footer-section">
              <h6 class="footer-title">联系方式</h6>
              <div class="contact-info">
                <p><i class="fas fa-phone"></i> 400-123-4567</p>
                <p><i class="fas fa-envelope"></i> contact@uai.edu</p>
                <p><i class="fas fa-map-marker-alt"></i> 北京市朝阳区科技园</p>
              </div>
            </div>
          </div>
        </div>
        <hr class="footer-divider" />
        <div class="row">
          <div class="col-md-6">
            <p class="footer-copyright">© 2024 UAI教育平台. All rights reserved.</p>
          </div>
          <div class="col-md-6 text-end">
            <div class="footer-links-inline">
              <a href="#">隐私政策</a>
              <a href="#">服务条款</a>
              <a href="#">备案号：京ICP备12345678号</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import HeroCarousel from '../components/HeroCarousel.vue'
import CampSection from '../components/CampSection.vue'
import StarRating from '../components/StarRating.vue'
import { useUIStore } from '../store/uiStore'

// 导入图片资源
import logoImg from '@/assets/icons/logo.png'
import tou01 from '@/assets/images/tou01.png'
import tou02 from '@/assets/images/tou02.png'
import tou03 from '@/assets/images/tou03.png'
import tou04 from '@/assets/images/tou04.png'

const uiStore = useUIStore()

// 师资数据
const featuredTeachers = ref([
  {
    id: 1,
    name: '张教授',
    title: '人工智能专家',
    company: '清华大学',
    avatar: tou01,
    skills: ['机器学习', '深度学习', 'Python', 'TensorFlow'],
    studentCount: 5000,
    rating: 4.9,
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    blog: 'https://blog.example.com'
  },
  {
    id: 2,
    name: '李工程师',
    title: '全栈开发专家',
    company: '阿里巴巴',
    avatar: tou02,
    skills: ['Vue.js', 'Node.js', 'Python', 'Docker'],
    studentCount: 4200,
    rating: 4.8,
    github: 'https://github.com',
    linkedin: 'https://linkedin.com'
  },
  {
    id: 3,
    name: '王架构师',
    title: '云原生技术专家',
    company: '腾讯',
    avatar: tou03,
    skills: ['Kubernetes', 'DevOps', 'Go', 'AWS'],
    studentCount: 3800,
    rating: 4.9,
    github: 'https://github.com'
  },
  {
    id: 4,
    name: '陈博士',
    title: '数据科学专家',
    company: '百度',
    avatar: tou04,
    skills: ['数据分析', 'Python', 'R', 'SQL'],
    studentCount: 3200,
    rating: 4.7,
    linkedin: 'https://linkedin.com',
    blog: 'https://blog.example.com'
  }
])

// 学习路径数据
const learningPaths = ref([
  {
    id: 1,
    title: '前端工程师',
    description: '从零基础到高级前端工程师的完整学习路径',
    icon: 'fas fa-laptop-code',
    features: ['HTML/CSS/JavaScript基础', 'Vue/React框架精通', '工程化工具使用', '性能优化实战'],
    duration: '6-8个月',
    level: '入门-高级'
  },
  {
    id: 2,
    title: 'Python全栈',
    description: '掌握Python Web开发和数据科学的综合技能',
    icon: 'fab fa-python',
    features: ['Python语言精通', 'Django/Flask框架', '数据库设计与优化', '数据分析与可视化'],
    duration: '8-10个月',
    level: '入门-高级'
  },
  {
    id: 3,
    title: 'AI工程师',
    description: '人工智能领域的系统化学习和实战培训',
    icon: 'fas fa-robot',
    features: ['机器学习算法', '深度学习框架', '计算机视觉', '自然语言处理'],
    duration: '10-12个月',
    level: '中级-高级'
  }
])

onMounted(() => {
  // 设置当前导航项
  uiStore.setCurrentNavItem('home')

  // 初始化AOS动画库（如果需要的话）
  console.log('首页已加载')
})
</script>

<style scoped>
.home-page {
  position: relative;
}

/* 通用样式 */
.section-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  position: relative;
}

.title-highlight {
  background: linear-gradient(135deg, #1e7f98, #2a9bb8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: block;
}

.title-subtitle {
  font-size: 1.2rem;
  color: #666;
  font-weight: 400;
  display: block;
  margin-top: 0.5rem;
}

.section-description {
  font-size: 1.1rem;
  color: #666;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

/* 师资力量区域 */
.teachers-section {
  background: linear-gradient(135deg, rgba(245, 248, 255, 0.9) 0%, rgba(255, 255, 255, 0.95) 100%);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.teacher-card {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  height: 100%;
}

.teacher-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
}

.teacher-avatar {
  position: relative;
  width: 120px;
  height: 120px;
  margin: 0 auto 1.5rem;
  border-radius: 50%;
  overflow: hidden;
}

.teacher-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.teacher-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(30, 127, 152, 0.9);
  opacity: 0;
  transition: opacity 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.teacher-card:hover .teacher-overlay {
  opacity: 1;
}

.teacher-social {
  display: flex;
  gap: 1rem;
}

.social-link {
  color: white;
  font-size: 1.2rem;
  transition: transform 0.3s ease;
}

.social-link:hover {
  transform: scale(1.2);
  color: white;
}

.teacher-name {
  font-size: 1.3rem;
  font-weight: 600;
  color: #1e7f98;
  margin-bottom: 0.5rem;
}

.teacher-title {
  color: #666;
  margin-bottom: 0.25rem;
}

.teacher-company {
  color: #999;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.teacher-expertise {
  margin-bottom: 1rem;
}

.skill-tag {
  display: inline-block;
  background: rgba(30, 127, 152, 0.1);
  color: #1e7f98;
  padding: 4px 12px;
  border-radius: 15px;
  font-size: 0.8rem;
  margin: 2px;
}

.teacher-stats {
  display: flex;
  justify-content: space-around;
  border-top: 1px solid rgba(30, 127, 152, 0.1);
  padding-top: 1rem;
}

.stat {
  color: #1e7f98;
  font-size: 0.9rem;
  font-weight: 500;
}

/* 学习路径区域 */
.learning-paths {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(245, 248, 255, 0.95) 100%);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.path-card {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  height: 100%;
}

.path-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
}

.path-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #1e7f98, #2a9bb8);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
}

.path-icon i {
  font-size: 2rem;
  color: white;
}

.path-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1e7f98;
  margin-bottom: 1rem;
}

.path-description {
  color: #666;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.path-features ul {
  list-style: none;
  padding: 0;
  text-align: left;
}

.path-features li {
  padding: 0.5rem 0;
  color: #666;
  border-bottom: 1px solid rgba(30, 127, 152, 0.1);
}

.path-features li:before {
  content: '✓';
  color: #1e7f98;
  font-weight: bold;
  margin-right: 0.5rem;
}

.path-meta {
  display: flex;
  justify-content: space-between;
  margin: 1.5rem 0;
  font-size: 0.9rem;
  color: #666;
}

/* 统计数据区域 */
.stats-section {
  background: linear-gradient(135deg, #1e7f98, #2a9bb8);
  color: white;
}

.stat-item {
  text-align: center;
}

.stat-icon {
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  transition: transform 0.3s ease;
}

.stat-item:hover .stat-icon {
  transform: scale(1.1);
}

.stat-icon i {
  font-size: 2rem;
  color: white;
}

.stat-number {
  font-size: 3rem;
  font-weight: 700;
  color: white;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.9);
}

/* 页脚样式 */
.footer {
  background: #1a1a1a;
  color: #ccc;
}

.footer-title {
  color: white;
  font-weight: 600;
  margin-bottom: 1rem;
}

.footer-text {
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.footer-links {
  list-style: none;
  padding: 0;
}

.footer-links li {
  margin-bottom: 0.5rem;
}

.footer-links a {
  color: #ccc;
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-links a:hover {
  color: #1e7f98;
}

.social-links {
  display: flex;
  gap: 1rem;
}

.social-links .social-link {
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ccc;
  transition: all 0.3s ease;
}

.social-links .social-link:hover {
  background: #1e7f98;
  color: white;
  transform: translateY(-2px);
}

.contact-info p {
  margin-bottom: 0.5rem;
  color: #ccc;
}

.contact-info i {
  color: #1e7f98;
  margin-right: 0.5rem;
  width: 16px;
}

.footer-divider {
  border-color: rgba(255, 255, 255, 0.1);
  margin: 2rem 0;
}

.footer-copyright {
  color: #999;
  margin: 0;
}

.footer-links-inline {
  display: flex;
  gap: 1.5rem;
  justify-content: flex-end;
}

.footer-links-inline a {
  color: #999;
  text-decoration: none;
  font-size: 0.9rem;
}

.footer-links-inline a:hover {
  color: #1e7f98;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .section-title {
    font-size: 2.2rem;
  }

  .teacher-card,
  .path-card {
    margin-bottom: 2rem;
  }

  .path-meta {
    flex-direction: column;
    gap: 0.5rem;
  }

  .footer-links-inline {
    flex-direction: column;
    gap: 0.5rem;
    text-align: left;
  }
}

@media (max-width: 576px) {
  .section-title {
    font-size: 1.8rem;
  }

  .title-subtitle {
    font-size: 1rem;
  }

  .stat-number {
    font-size: 2.5rem;
  }
}

/* 按钮样式 */
.btn-tech-blue {
  background: linear-gradient(135deg, #1e7f98, #2a9bb8);
  border: none;
  border-radius: 50px;
  padding: 15px 40px;
  font-weight: 600;
  font-size: 1.1rem;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  box-shadow: 0 8px 25px rgba(30, 127, 152, 0.3);
  color: white;
}

.btn-tech-blue:hover {
  background: linear-gradient(135deg, #166d84, #228ba1);
  transform: translateY(-3px);
  box-shadow: 0 12px 35px rgba(30, 127, 152, 0.4);
  color: white;
}

.btn-outline-tech-blue {
  border: 2px solid #1e7f98;
  color: #1e7f98;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 50px;
  padding: 13px 38px;
  font-weight: 600;
  font-size: 1.1rem;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.btn-outline-tech-blue:hover {
  background: #1e7f98;
  border-color: #1e7f98;
  color: white;
  transform: translateY(-3px);
}
</style>
