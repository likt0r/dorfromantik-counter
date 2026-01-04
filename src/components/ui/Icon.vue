<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  name: string
}>()

const paths: Record<string, string> = {
  // Speech bubble (Tasks)
  task: 'M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z',

  // Flag
  flag: 'M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z',

  // Tree
  tree: 'M10 21h4v-3.08A9.03 9.03 0 0 0 22 10c0-4.97-4.03-9-9-9s-9 4.03-9 9c0 4.19 2.9 7.73 6.9 8.65V21h-1z',

  // Grain/Wheat
  grain:
    'M20.16 7.42c-.52-1.72-2.12-2.92-3.92-2.92h-1.63c.47-1.74-.06-3.7-1.52-4.9L12 11 10.91-.4c-1.46 1.2-1.99 3.16-1.52 4.9H7.76c-1.8 0-3.4 1.2-3.92 2.92C1.4 15.08 7.07 22.4 12 24.5c4.93-2.1 10.6-9.42 8.16-17.08z',

  // House
  house: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z',

  // Rail
  rail: 'M19 15v2H5v-2h14m2-4v2H3v-2h18m-2-4v2H5V7h14M12 3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2s2-.9 2-2V5c0-1.1-.9-2-2-2z',

  // Water (Drop)
  water: 'M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z',

  // Hexagon
  hex: 'M21 16.5l-9 5.2-9-5.2v-10.4l9-5.2 9 5.2z',

  // Six (Number 6 in a circle/bubble)
  six: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z',

  // Cup (Trophy)
  cup: 'M19 3h-2V1h-2v2H9V1H7v2H5c-1.1 0-2 .9-2 2v3c0 2.61 1.67 4.83 4 5.65V15h2v3H7v2h10v-2h-2v-3h2v-1.35c2.33-.82 4-3.04 4-5.65V5c0-1.1-.9-2-2-2zm0 5c0 1.1-.9 2-2 2H7c-1.1 0-2-.9-2-2V5h14v3z',

  // Star
  star: 'M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z',
}

const path = computed(() => paths[props.name] || '')
const color = computed(() => {
  return 'text-white' // All icons white per request (backgrounds are dark grey/colored)
})
</script>

<template>
  <svg viewBox="0 0 24 24" class="fill-current inline-block drop-shadow-sm" :class="color">
    <path :d="path" stroke="currentColor" stroke-width="0.5" />
    <text
      v-if="name === 'six'"
      x="12"
      y="16"
      text-anchor="middle"
      font-size="10"
      font-weight="bold"
      fill="currentColor"
    >
      6
    </text>
  </svg>
</template>
