<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  name: string
}>()

const paths: Record<string, string> = {
  // Speech bubble (Tasks)
  task: 'M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z',

  // Flag
  flag: 'M19 3A1 1 0 0 1 21 3V22H19V16L3 10L19 4V3Z',

  // Tree
  tree: 'M 12 3 C 8 3 5.5 5.5 5.5 9 C 5.5 9.5 5.6 10 5.7 10.5 C 3 11 2 13 2 15 C 2 18 4.5 20 7.5 20 H 10 V 23 H 14 V 20 H 16.5 C 19.5 20 22 18 22 15 C 22 13 21 11 18.3 10.5 C 18.4 10 18.5 9.5 18.5 9 C 18.5 5.5 16 3 12 3 Z',

  // Grain/Field
  grain: 'M4 21H20L21 7L12 4L3 8Z',

  // House
  house: 'M4 21H20V11H23L17 5V2H15V3L12 0L1 11H4V21Z',

  // Rail
  rail: 'M3 4H7V2H9V4H15V2H17V4H21V7H17V10.5H21V13.5H17V17H21V20H17V22H15V20H9V20H9V22H7V22H7V20H3V20H3V17H7V13.5H3V13.5H3V10.5H7V7H3Z M9 7V10.5H15V7H9Z M9 13.5V17H15V13.5H9Z',

  // Water (Drop)
  water: 'M12 2C12 2 4 9 4 14.5C4 18.9 7.6 22.5 12 22.5C16.4 22.5 20 18.9 20 14.5C20 9 12 2 12 2Z',

  // Hexagon
  hex: 'M14.48 1.70 L19.68 4.70 A1.5 1.5 0 0 1 18.18 7.30 L12.98 4.30 A1.5 1.5 0 0 1 14.48 1.70 Z M22.16 9.00 L22.16 15.00 A1.5 1.5 0 0 1 19.16 15.00 L19.16 9.00 A1.5 1.5 0 0 1 22.16 9.00 Z M19.68 19.30 L14.48 22.30 A1.5 1.5 0 0 1 12.98 19.70 L18.18 16.70 A1.5 1.5 0 0 1 19.68 19.30 Z M9.52 22.30 L4.32 19.30 A1.5 1.5 0 0 1 5.82 16.70 L11.02 19.70 A1.5 1.5 0 0 1 9.52 22.30 Z M1.84 15.00 L1.84 9.00 A1.5 1.5 0 0 1 4.84 9.00 L4.84 15.00 A1.5 1.5 0 0 1 1.84 15.00 Z M4.32 4.70 L9.52 1.70 A1.5 1.5 0 0 1 11.02 4.30 L5.82 7.30 A1.5 1.5 0 0 1 4.32 4.70 Z',

  // Six (Number 6 in a circle/bubble)
  six: 'M5 4h11l3-3v3c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2h-11l-3 3v-3c-1.1 0-2-.9-2-2v-12c0-1.1.9-2 2-2z',

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
    <path
      :d="path"
      :stroke="
        ['hex', 'tree', 'grain', 'house', 'rail', 'water', 'six'].includes(name)
          ? 'white'
          : 'currentColor'
      "
      :stroke-width="
        ['hex', 'tree', 'grain', 'house', 'rail', 'water', 'six'].includes(name) ? '2' : '0.5'
      "
      :fill="
        name === 'hex'
          ? '#4B5563'
          : name === 'tree'
            ? '#95B75D'
            : name === 'grain'
              ? '#F2C94C'
              : name === 'house'
                ? '#A94442'
                : name === 'rail'
                  ? '#8D6E63'
                  : name === 'water'
                    ? '#8CC6D1'
                    : name === 'six'
                      ? '#E5E7EB'
                      : 'currentColor'
      "
    />
    <text
      v-if="name === 'six'"
      x="12"
      y="16"
      text-anchor="middle"
      font-size="10"
      font-weight="bold"
      :fill="name === 'six' ? '#374151' : 'currentColor'"
    >
      6
    </text>
  </svg>
</template>
