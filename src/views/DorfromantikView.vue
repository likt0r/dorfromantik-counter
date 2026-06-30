<script setup lang="ts">
import GameHistory from '@/components/GameHistory.vue'
import ScoreBoard from '@/components/ScoreBoard.vue'
</script>

<template>
  <main class="container mx-auto px-[2px] py-[2px]">
    <ScoreBoard />
  </main>

  <GameHistory />
</template>
