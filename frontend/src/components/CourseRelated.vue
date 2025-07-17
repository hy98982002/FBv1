<!-- CourseRelated.vue - 相关课程组件 -->
<template>
  <div class="bg-white rounded p-4" style="border-radius: 18px; background: rgba(255,255,255,0.75); backdrop-filter: blur(12px);">
    <!-- 相关课程标题区 -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h5 class="mb-1" style="color: #166d84; font-weight: 600;">相关课程推荐</h5>
        <p class="text-muted mb-0" style="font-size: 14px;">根据你的兴趣，为你精选以下好课</p>
      </div>
    </div>

    <!-- 课程列表 -->
    <div class="course-list">
      <!-- 课程项1 -->
      <div class="course-item mb-4" style="border: 1px solid rgba(22,109,132,0.1); border-radius: 12px; padding: 20px; transition: all 0.3s ease; background: rgba(255,255,255,0.9);">
        <div class="row align-items-center">
          <div class="col-md-2">
            <img src="/img/k02.png" class="img-fluid rounded" alt="课程图片" style="border-radius: 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
          </div>
          <div class="col-md-7">
            <h6 class="mb-2" style="font-weight: 600; color: #333;">前端Web开发 网站建设 网页开发</h6>
            <div class="d-flex align-items-center text-muted small mb-2">
              <span class="me-3"><i class="far fa-clock me-1"></i>总共148小时</span>
              <span><i class="far fa-calendar-alt me-1"></i>更新日期 2022年12月</span>
            </div>
            <div class="d-flex align-items-center">
              <div class="text-warning me-3" style="font-size: 14px;">
                4.4 <i class="fas fa-star"></i>
              </div>
              <div class="text-muted small">
                <i class="fas fa-user-friends me-1"></i>560人已学习
              </div>
            </div>
          </div>
          <div class="col-md-3 text-end">
            <div class="mb-2">
              <span class="text-muted small me-2" style="text-decoration: line-through;">¥699</span>
              <span style="color: #f0690e; font-size: 20px; font-weight: 600;">¥399</span>
            </div>
            <div class="d-flex align-items-center justify-content-end">
              <i class="fas fa-shopping-cart me-3" style="font-size: 18px; color: #166d84; cursor: pointer;"></i>
              <button class="btn btn-sm" style="width: 32px; height: 32px; padding: 0; border-radius: 50%; border: 1.5px solid #f0690e; color: #f0690e; background: transparent;">
                <i class="far fa-heart" style="font-size: 16px;"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 课程项2 -->
      <div class="course-item mb-4" style="border: 1px solid rgba(22,109,132,0.1); border-radius: 12px; padding: 20px; transition: all 0.3s ease; background: rgba(255,255,255,0.9);">
        <div class="row align-items-center">
          <div class="col-md-2">
            <img src="/img/k03.png" class="img-fluid rounded" alt="课程图片" style="border-radius: 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
          </div>
          <div class="col-md-7">
            <div class="d-flex align-items-center mb-2">
              <h6 class="mb-0" style="font-weight: 600; color: #333;">数据结构与算法（JavaScript）</h6>
              <span class="badge ms-2" style="background: rgba(240,105,14,0.1); color: #f0690e; border-radius: 4px; padding: 4px 8px;">热门课程</span>
            </div>
            <div class="d-flex align-items-center text-muted small mb-2">
              <span class="me-3"><i class="far fa-clock me-1"></i>总共25.5小时</span>
              <span><i class="far fa-calendar-alt me-1"></i>更新日期 2025年1月</span>
            </div>
            <div class="d-flex align-items-center">
              <div class="text-warning me-3" style="font-size: 14px;">
                4.8 <i class="fas fa-star"></i>
              </div>
              <div class="text-muted small">
                <i class="fas fa-user-friends me-1"></i>6,489人已学习
              </div>
            </div>
          </div>
          <div class="col-md-3 text-end">
            <div class="mb-2">
              <span class="text-muted small me-2" style="text-decoration: line-through;">¥599</span>
              <span style="color: #f0690e; font-size: 20px; font-weight: 600;">¥299</span>
            </div>
            <div class="d-flex align-items-center justify-content-end">
              <i class="fas fa-shopping-cart me-3" style="font-size: 18px; color: #166d84; cursor: pointer;"></i>
              <button class="btn btn-sm" style="width: 32px; height: 32px; padding: 0; border-radius: 50%; border: 1.5px solid #f0690e; color: #f0690e; background: transparent;">
                <i class="far fa-heart" style="font-size: 16px;"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <button class="btn" style="color: #166d84; border-radius: 20px; padding: 8px 20px; border: 1px solid #166d84; background: transparent;">
      <i class="fas fa-sync-alt me-2"></i>
      换一换
    </button>
  </div>
</template>

<script setup lang="ts">
// 相关课程组件逻辑
const handleCourseClick = () => {
  console.log('相关课程点击')
  // TODO: 跳转到课程详情页
}
</script>

<style scoped>
.course-item {
  transition: all 0.3s ease;
  cursor: pointer;
}

.course-item:hover {
  background: rgba(22,109,132,0.05) !important;
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(0,0,0,0.12) !important;
}

.course-item:hover img {
  transform: scale(1.05);
  transition: transform 0.3s ease;
}

.btn:hover {
  background: rgba(22,109,132,0.1) !important;
  color: #166d84 !important;
}

.fa-shopping-cart:hover {
  color: #35a4be !important;
}

.btn-sm:hover {
  background: rgba(240,105,14,0.1) !important;
  border-color: #35a4be !important;
  color: #35a4be !important;
}
</style> 