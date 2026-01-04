<script setup lang="ts">
import { useGameStore } from '@/stores/game'
import { computed } from 'vue'

const store = useGameStore()
const { createGame, deleteGame, loadGame } = store

const sortedGames = computed(() => {
  return [...store.state.games].sort((a, b) => b.date - a.date)
})

const formatDate = (ts: number) => {
  return new Intl.DateTimeFormat('de-DE', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(ts))
}

function handleNewGame() {
  if (confirm('Neues Spiel starten?')) {
    createGame()
  }
}

function handleReset() {
  if (confirm('Aktuelles Spiel zurücksetzen?')) {
    store.resetCurrentGame()
  }
}
</script>

<template>
  <div
    class="bg-slate-600 text-white p-2 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] fixed bottom-0 left-0 right-0 z-50"
  >
    <div class="max-w-md mx-auto flex items-center justify-between gap-4">
      <div class="flex items-center gap-2">
        <select
          class="bg-slate-700 text-white border border-slate-500 rounded px-2 py-1 text-sm max-w-[160px] sm:max-w-xs"
          :value="store.state.currentId || ''"
          @change="loadGame(($event.target as HTMLSelectElement).value)"
        >
          <option value="" disabled>Spiel wählen...</option>
          <option v-for="game in sortedGames" :key="game.id" :value="game.id">
            {{ formatDate(game.date) }}
          </option>
        </select>
      </div>

      <div class="flex gap-2">
        <button
          @click="handleReset"
          class="bg-white text-slate-800 hover:bg-slate-100 px-3 py-1 rounded text-sm transition-colors border border-slate-300"
          title="Reset Current Game"
        >
          Reset
        </button>
        <button
          @click="handleNewGame"
          class="bg-[#95B75D] hover:bg-[#7EA54A] text-white px-3 py-1 rounded text-sm font-bold shadow transition-colors"
        >
          Neu
        </button>
      </div>
    </div>
  </div>
</template>
