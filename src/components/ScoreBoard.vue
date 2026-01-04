<script setup lang="ts">
import { useGameStore } from '@/stores/game'
import { computed } from 'vue'
import ScoreRow from './ScoreRow.vue'
import ScoreInput from './ScoreInput.vue'
import Icon from './ui/Icon.vue'

const store = useGameStore()
const game = store.currentGame

const p1Score = computed(() => {
  if (!game.value) return { subtotalTop: 0, subtotalModules: 0, total: 0 }
  return store.calculateScore(game.value.players[0])
})

const p2Score = computed(() => {
  if (!game.value) return { subtotalTop: 0, subtotalModules: 0, total: 0 }
  return store.calculateScore(game.value.players[1])
})

// Ensure we always have a game
if (!store.state.currentId) {
  store.createGame()
}
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

    <!-- Main Game Section -->
    <div class="flex flex-col gap-[2px] bg-white">
      <!-- Row 2: Icons/Aufträge (Moved here) -->
      <div class="grid grid-cols-5 gap-[2px] bg-white h-16">
        <div class="col-span-1 bg-slate-600 flex items-center justify-center p-1">
          <span class="text-white font-bold text-[10px] uppercase">Aufträge</span>
        </div>

        <!-- Player 1 Icons -->
        <div class="col-span-2 grid grid-cols-2 gap-[2px]">
          <div class="flex justify-center items-center bg-rose-400 h-full">
            <Icon name="task" class="w-6 h-6" />
          </div>
          <div class="flex justify-center items-center bg-rose-400 h-full">
            <Icon name="flag" class="w-6 h-6" />
          </div>
        </div>

        <!-- Player 2 Icons -->
        <div class="col-span-2 grid grid-cols-2 gap-[2px]">
          <div class="flex justify-center items-center bg-blue-400 h-full">
            <Icon name="task" class="w-6 h-6" />
          </div>
          <div class="flex justify-center items-center bg-blue-400 h-full">
            <Icon name="flag" class="w-6 h-6" />
          </div>
        </div>
      </div>

      <!-- Trees -->
      <ScoreRow icon="tree">
        <template #p1>
          <ScoreInput v-model="game.players[0].treeTask" color="red" placeholder="" />
          <ScoreInput v-model="game.players[0].treeFlag" color="red" placeholder="" />
        </template>
        <template #p2>
          <ScoreInput v-model="game.players[1].treeTask" color="blue" placeholder="" />
          <ScoreInput v-model="game.players[1].treeFlag" color="blue" placeholder="" />
        </template>
      </ScoreRow>

      <!-- Grain -->
      <ScoreRow icon="grain">
        <template #p1>
          <ScoreInput v-model="game.players[0].grainTask" color="red" placeholder="" />
          <ScoreInput v-model="game.players[0].grainFlag" color="red" placeholder="" />
        </template>
        <template #p2>
          <ScoreInput v-model="game.players[1].grainTask" color="blue" placeholder="" />
          <ScoreInput v-model="game.players[1].grainFlag" color="blue" placeholder="" />
        </template>
      </ScoreRow>

      <!-- Houses -->
      <ScoreRow icon="house">
        <template #p1>
          <ScoreInput v-model="game.players[0].houseTask" color="red" placeholder="" />
          <ScoreInput v-model="game.players[0].houseFlag" color="red" placeholder="" />
        </template>
        <template #p2>
          <ScoreInput v-model="game.players[1].houseTask" color="blue" placeholder="" />
          <ScoreInput v-model="game.players[1].houseFlag" color="blue" placeholder="" />
        </template>
      </ScoreRow>

      <!-- Rails -->
      <ScoreRow icon="rail">
        <template #p1>
          <ScoreInput v-model="game.players[0].railTask" color="red" placeholder="" />
          <div class="relative h-full">
            <div
              class="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40 text-[10px] font-bold uppercase tracking-wider text-rose-900 z-10"
            >
              Längste
            </div>
            <ScoreInput v-model="game.players[0].railLongest" color="red" placeholder="" />
          </div>
        </template>
        <template #p2>
          <ScoreInput v-model="game.players[1].railTask" color="blue" placeholder="" />
          <div class="relative h-full">
            <div
              class="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40 text-[10px] font-bold uppercase tracking-wider text-blue-900 z-10"
            >
              Längste
            </div>
            <ScoreInput v-model="game.players[1].railLongest" color="blue" placeholder="" />
          </div>
        </template>
      </ScoreRow>

      <!-- Water -->
      <ScoreRow icon="water">
        <template #p1>
          <ScoreInput v-model="game.players[0].waterTask" color="red" placeholder="" />
          <div class="relative h-full">
            <div
              class="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40 text-[10px] font-bold uppercase tracking-wider text-rose-900 z-10"
            >
              Längste
            </div>
            <ScoreInput v-model="game.players[0].waterLongest" color="red" placeholder="" />
          </div>
        </template>
        <template #p2>
          <ScoreInput v-model="game.players[1].waterTask" color="blue" placeholder="" />
          <div class="relative h-full">
            <div
              class="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40 text-[10px] font-bold uppercase tracking-wider text-blue-900 z-10"
            >
              Längste
            </div>
            <ScoreInput v-model="game.players[1].waterLongest" color="blue" placeholder="" />
          </div>
        </template>
      </ScoreRow>

      <!-- Hexagons -->
      <ScoreRow icon="hex">
        <template #p1>
          <ScoreInput v-model="game.players[0].hexagons" color="red" placeholder="" />
          <div class="bg-slate-600"></div>
        </template>
        <template #p2>
          <ScoreInput v-model="game.players[1].hexagons" color="blue" placeholder="" />
          <div class="bg-slate-600"></div>
        </template>
      </ScoreRow>

      <!-- Circus / 6 -->
      <ScoreRow icon="six">
        <template #p1>
          <ScoreInput v-model="game.players[0].circus" color="red" placeholder="" />
          <div class="bg-slate-600"></div>
        </template>
        <template #p2>
          <ScoreInput v-model="game.players[1].circus" color="blue" placeholder="" />
          <div class="bg-slate-600"></div>
        </template>
      </ScoreRow>

      <!-- Subtotal 1 -->
      <div class="grid grid-cols-5 gap-[2px] items-stretch bg-white h-16">
        <div
          class="col-span-1 bg-slate-600 flex items-center justify-center text-[10px] text-center uppercase tracking-tighter leading-tight p-1 text-white font-bold"
        >
          Zwischen-<br />summe
        </div>

        <!-- Player 1 Subtotal 1 -->
        <div class="col-span-2 grid grid-cols-2 gap-[2px]">
          <div
            class="text-center bg-rose-200 text-rose-900 text-xl font-bold flex items-center justify-center h-full"
          >
            {{ p1Score.subtotalTopCol1 }}
          </div>
          <div
            class="text-center bg-rose-200 text-rose-900 text-xl font-bold flex items-center justify-center h-full"
          >
            {{ p1Score.subtotalTopCol2 }}
          </div>
        </div>

        <!-- Player 2 Subtotal 1 -->
        <div class="col-span-2 grid grid-cols-2 gap-[2px]">
          <div
            class="text-center bg-blue-200 text-blue-900 text-xl font-bold flex items-center justify-center h-full"
          >
            {{ p2Score.subtotalTopCol1 }}
          </div>
          <div
            class="text-center bg-blue-200 text-blue-900 text-xl font-bold flex items-center justify-center h-full"
          >
            {{ p2Score.subtotalTopCol2 }}
          </div>
        </div>
      </div>

      <!-- Modules Header & Row Combined -->
      <div class="grid grid-cols-5 gap-[2px] items-stretch mt-1 h-16">
        <!-- Module Label -->
        <div class="col-span-1 bg-slate-600 flex items-center justify-center p-2">
          <span class="text-white font-bold text-xs">Module</span>
        </div>

        <!-- Player 1 Module Icons (display only) -->
        <div class="col-span-2 grid grid-cols-2 gap-[2px] bg-white">
          <div class="relative bg-rose-400 flex items-center justify-center h-full">
            <Icon name="cup" class="w-8 h-8 text-white" />
          </div>
          <div class="relative bg-rose-400 flex items-center justify-center h-full">
            <Icon name="star" class="w-8 h-8 text-white" />
          </div>
        </div>

        <!-- Player 2 Module Icons (display only) -->
        <div class="col-span-2 grid grid-cols-2 gap-[2px] bg-white">
          <div class="relative bg-blue-400 flex items-center justify-center h-full">
            <Icon name="cup" class="w-8 h-8 text-white" />
          </div>
          <div class="relative bg-blue-400 flex items-center justify-center h-full">
            <Icon name="star" class="w-8 h-8 text-white" />
          </div>
        </div>
      </div>

      <!-- Subtotal 2 -->
      <div class="grid grid-cols-5 gap-[2px] items-stretch bg-white h-16">
        <div
          class="col-span-1 bg-slate-600 flex items-center justify-center text-[10px] text-center uppercase tracking-tighter leading-tight p-1 text-white font-bold"
        >
          Zwischen-<br />summe
        </div>

        <!-- Player 1 Subtotal 2 -->
        <div class="col-span-2 grid grid-cols-2 gap-[2px]">
          <div
            class="text-center bg-rose-200 text-rose-900 text-xl font-bold flex items-center justify-center h-full"
          >
            <ScoreInput v-model="game.players[0].moduleCup" color="red" placeholder="" />
          </div>
          <div
            class="text-center bg-rose-200 text-rose-900 text-xl font-bold flex items-center justify-center h-full"
          >
            <ScoreInput v-model="game.players[0].moduleStar" color="red" placeholder="" />
          </div>
        </div>

        <!-- Player 2 Subtotal 2 -->
        <div class="col-span-2 grid grid-cols-2 gap-[2px]">
          <div
            class="text-center bg-blue-200 text-blue-900 text-xl font-bold flex items-center justify-center h-full"
          >
            <ScoreInput v-model="game.players[1].moduleCup" color="blue" placeholder="" />
          </div>
          <div
            class="text-center bg-blue-200 text-blue-900 text-xl font-bold flex items-center justify-center h-full"
          >
            <ScoreInput v-model="game.players[1].moduleStar" color="blue" placeholder="" />
          </div>
        </div>
      </div>

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
