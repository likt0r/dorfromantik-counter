<script setup lang="ts">
import WingspanGameHistory from '@/components/WingspanGameHistory.vue'
import WingspanScoreBoard from '@/components/WingspanScoreBoard.vue'
</script>

<template>
  <main class="container mx-auto px-[2px] py-[2px]">
    <WingspanScoreBoard />
  </main>

  <WingspanGameHistory />
</template>
