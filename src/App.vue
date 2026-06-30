<script setup lang="ts">
// Navigation tabs + routed pages (Dorfromantik / Flügelschlag)
</script>

<template>
  <div class="min-h-screen bg-white font-sans pt-12 pb-16">
    <!-- Navigation -->
    <nav class="fixed top-0 left-0 right-0 z-[60] bg-slate-600 text-white shadow-md h-12">
      <div class="max-w-md mx-auto grid grid-cols-2 h-full">
        <router-link
          to="/"
          class="flex items-center justify-center text-sm font-bold uppercase tracking-wide transition-colors"
          exact-active-class="bg-slate-800 text-white"
        >
          Dorfromantik Duell
        </router-link>
        <router-link
          to="/fluegelschlag"
          class="flex items-center justify-center text-sm font-bold uppercase tracking-wide transition-colors"
          active-class="bg-slate-800 text-white"
        >
          Flügelschlag Duell
        </router-link>
      </div>
    </nav>

    <router-view />
  </div>
</template>
