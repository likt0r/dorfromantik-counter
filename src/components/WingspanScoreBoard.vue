<script setup lang="ts">
import { useWingspanStore, type WingspanPlayerScore } from '@/stores/wingspan'
import { computed } from 'vue'
import ScoreRow from './ScoreRow.vue'
import ScoreInput from './ScoreInput.vue'

const store = useWingspanStore()
const game = store.currentGame

const emptyScore = {
  birds: 0,
  bonusCards: 0,
  roundGoals: 0,
  eggs: 0,
  foodOnCards: 0,
  tuckedCards: 0,
  nectar: 0,
  total: 0,
}

const p1Score = computed(() => {
  if (!game.value) return emptyScore
  return store.calculateWingspanScore(game.value.players[0])
})

const p2Score = computed(() => {
  if (!game.value) return emptyScore
  return store.calculateWingspanScore(game.value.players[1])
})

// Ensure we always have a game
if (!store.state.currentId) {
  store.createWingspanGame()
}

const rows: { key: keyof WingspanPlayerScore; label: string }[] = [
  { key: 'birds', label: 'Vögel' },
  { key: 'bonusCards', label: 'Bonuskarten' },
  { key: 'roundGoals', label: 'Rundenziele' },
  { key: 'eggs', label: 'Eier' },
  { key: 'foodOnCards', label: 'Futter auf Karten' },
  { key: 'tuckedCards', label: 'Unterlegte Karten' },
  { key: 'nectar', label: 'Nektar' },
]
</script>

<template>
  <div v-if="game" class="max-w-md mx-auto bg-white pb-8">
    <!-- Header -->
    <div class="flex flex-col gap-[2px] border-b-0 sticky top-0 z-40 bg-white shadow-md">
      <!-- Row 1: Names -->
      <div class="grid grid-cols-5 gap-[2px] bg-white h-16">
        <div class="col-span-1 bg-slate-600 flex items-center justify-center p-2">
          <span class="text-white font-bold text-xs rotate-0">Name</span>
        </div>
        <div class="col-span-2 bg-rose-400 p-2 h-full flex items-center">
          <input
            type="text"
            placeholder="Spieler 1"
            class="w-full bg-transparent text-center border-b-2 border-rose-200 focus:outline-none focus:border-white font-bold text-white placeholder:text-rose-200"
          />
        </div>
        <div class="col-span-2 bg-blue-400 p-2 h-full flex items-center">
          <input
            type="text"
            placeholder="Spieler 2"
            class="w-full bg-transparent text-center border-b-2 border-blue-200 focus:outline-none focus:border-white font-bold text-white placeholder:text-blue-200"
          />
        </div>
      </div>
    </div>

    <!-- Category Section -->
    <div class="flex flex-col gap-[2px] bg-white">
      <ScoreRow v-for="row in rows" :key="row.key" :label="row.label">
        <template #p1>
          <ScoreInput
            v-model="game.players[0][row.key]"
            color="red"
            placeholder=""
            class="col-span-2"
          />
        </template>
        <template #p2>
          <ScoreInput
            v-model="game.players[1][row.key]"
            color="blue"
            placeholder=""
            class="col-span-2"
          />
        </template>
      </ScoreRow>

      <!-- Total -->
      <div class="grid grid-cols-5 gap-[2px] items-center bg-white mt-2 h-16">
        <div
          class="col-span-1 bg-slate-600 h-full flex items-center justify-center text-xs text-center uppercase tracking-wide text-white font-bold"
        >
          Ergebnis
        </div>
        <div
          class="col-span-2 text-center bg-rose-400 text-white text-3xl font-bold h-full flex items-center justify-center"
        >
          {{ p1Score.total }}
        </div>
        <div
          class="col-span-2 text-center bg-blue-400 text-white text-3xl font-bold h-full flex items-center justify-center"
        >
          {{ p2Score.total }}
        </div>
      </div>
    </div>
  </div>
  <div v-else class="text-center p-8 text-slate-500">Lade Spiel...</div>
</template>
