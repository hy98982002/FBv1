<template>
  <div class="empty-cart text-center py-5">
    <div class="empty-cart-icon mb-3">
      <i class="fas fa-shopping-cart fa-4x text-muted"></i>
    </div>
    <h5 class="mb-3">购物车还是空的哦</h5>
    <p class="text-muted mb-4">快去选购你喜欢的课程吧</p>
    <button class="btn btn-primary px-4 py-2" @click="$emit('go-shopping')">去逛逛</button>
  </div>
</template>

<script setup lang="ts">
defineEmits(['go-shopping'])
</script>

<style scoped>
.empty-cart {
  padding: 3rem 0;
}

.empty-cart-icon {
  color: #ccc;
}

.btn-primary {
  background-color: #166d84;
  border-color: #166d84;
}

.btn-primary:hover {
  background-color: #0e5a6f;
  border-color: #0e5a6f;
}
</style>
