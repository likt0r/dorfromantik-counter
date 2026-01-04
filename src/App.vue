<script setup lang="ts">
import GameHistory from './components/GameHistory.vue'
import ScoreBoard from './components/ScoreBoard.vue'
</script>

<template>
  <div class="min-h-screen bg-white font-sans pb-16">
    <main class="container mx-auto px-[2px] py-[2px]">
      <ScoreBoard />
    </main>

    <GameHistory />
  </div>
</template>
