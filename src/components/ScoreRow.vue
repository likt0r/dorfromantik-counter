<script setup lang="ts">
import Icon from './ui/Icon.vue'

defineProps<{
  label?: string
  icon?: string
  subLabel?: string
}>()
</script>

<template>
  <div class="grid grid-cols-5 gap-[2px] items-stretch h-16">
    <!-- Label / Icon Column -->
    <div class="col-span-1 flex flex-col items-center justify-center text-white bg-slate-600">
      <Icon v-if="icon" :name="icon" class="w-8 h-8 sm:w-10 sm:h-10 text-white" />
      <span v-if="label" class="text-xs font-bold mt-1 text-center leading-tight">{{ label }}</span>
    </div>

    <!-- Player 1 Slot (2 Columns wrapper removed, slot provides content) -->
    <!-- We need to render the slot content directly into the grid, but slots are fragments. 
         Wait, the current usage passes multiple elements into the slot (e.g. 2 ScoreInputs).
         But we need to control the wrappers here for styling (bg colors).
         
         The previous implementation wrapped the slot in a div with `grid-cols-2`.
         To achieve a flat 5-column grid where we can style P1 (cols 2-3) and P2 (cols 4-5) backgrounds,
         we have two options:
         1. Use `col-span-2` wrapper divs (like before, but outer grid is 5 cols? No, that's nested grid).
            If outer is 5 cols, and we use a wrapper `col-span-2` with `grid-cols-2`, it visually looks like 5 columns if gaps match.
            The user wants "5 equal columns".
            
            Let's keep the `grid-cols-5` on the parent.
            Then P1 wrapper is `col-span-2 grid grid-cols-2 gap-[2px]`.
            And P2 wrapper is `col-span-2 grid grid-cols-2 gap-[2px]`.
            
            This is essentially what we had with `grid-cols-[auto_1fr_1fr]` where auto was small and 1fr were big.
            But now we want 1 label column = 1 input column width.
            So `grid-cols-5`.
            And the P1 wrapper spans 2 of those 5 columns.
    -->

    <div class="col-span-2 grid grid-cols-2 gap-[2px] bg-rose-200">
      <div
        v-if="subLabel"
        class="col-span-2 text-[10px] text-center text-rose-800 uppercase font-bold tracking-wider opacity-60 bg-rose-200 p-1"
      >
        {{ subLabel }}
      </div>
      <slot name="p1"></slot>
    </div>

    <div class="col-span-2 grid grid-cols-2 gap-[2px] bg-blue-200">
      <div
        v-if="subLabel"
        class="col-span-2 text-[10px] text-center text-blue-800 uppercase font-bold tracking-wider opacity-60 bg-blue-200 p-1"
      >
        {{ subLabel }}
      </div>
      <slot name="p2"></slot>
    </div>
  </div>
</template>
