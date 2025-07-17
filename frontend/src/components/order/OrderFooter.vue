<template>
  <footer class="order-footer">
    <div class="container">
      <div class="row">
        <div class="col-md-8 mx-auto">
          <div class="footer-content text-center">
            <div class="security-badges mb-3">
              <span class="badge bg-light text-dark me-2">
                <i class="fas fa-shield-alt me-1"></i> 安全支付
              </span>
              <span class="badge bg-light text-dark me-2">
                <i class="fas fa-lock me-1"></i> 数据加密
              </span>
              <span class="badge bg-light text-dark">
                <i class="fas fa-headset me-1"></i> 7×24小时客服
              </span>
            </div>

            <div class="footer-links small text-muted">
              <a href="#" class="me-3">支付帮助</a>
              <a href="#" class="me-3">常见问题</a>
              <a href="#" class="me-3">联系客服</a>
              <a href="#">退款政策</a>
            </div>

            <div class="copyright mt-3 small text-muted">
              © {{ currentYear }} UAI教育平台 版权所有
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped>
.order-footer {
  background-color: #f8f9fa;
  padding: 2rem 0;
  margin-top: 3rem;
}

.security-badges .badge {
  padding: 0.5rem 0.8rem;
  font-weight: normal;
  font-size: 0.85rem;
}

.footer-links a {
  color: #666;
  text-decoration: none;
  transition: color 0.2s;
}

.footer-links a:hover {
  color: #166d84;
  text-decoration: underline;
}

.copyright {
  color: #888;
}
</style>
