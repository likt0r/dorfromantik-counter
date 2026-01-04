<script setup lang="ts">
defineProps<{
  modelValue: number | null
  color?: string
  placeholder?: string
  readonly?: boolean
  transparent?: boolean
}>()

defineEmits<{
  (e: 'update:modelValue', value: number | null): void
}>()

function onFocus(e: FocusEvent) {
  ;(e.target as HTMLInputElement).select()
}
</script>

<template>
  <input
    type="number"
    :value="modelValue"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).valueAsNumber || null)"
    @focus="onFocus"
    class="w-full h-full text-center p-2 text-lg font-semibold placeholder:text-slate-400/50 focus:outline-none focus:ring-inset focus:ring-2 focus:ring-white/50 transition-colors z-10 relative"
    :class="[
      transparent
        ? 'bg-transparent'
        : color === 'red'
          ? 'bg-rose-300 text-rose-900'
          : color === 'blue'
            ? 'bg-blue-300 text-blue-900'
            : 'bg-slate-100 text-slate-900',
      readonly ? 'opacity-70' : '',
    ]"
    :placeholder="placeholder"
    :readonly="readonly"
  />
</template>

<style scoped>
/* Hide spinner for number input */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type='number'] {
  -moz-appearance: textfield;
}
</style>
