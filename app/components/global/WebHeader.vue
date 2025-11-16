<template>
  <header class="fixed top-20 left-0 w-full z-50 backdrop-blur-sm bg-white/5">
    <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
      <!-- Logo -->
      <div class="flex items-center">
        <img src="/logo.png" alt="Logo" class="h-10 w-auto" />
        <span class="ml-4 font-bold text-xl italic uppercase text-white"
          >Walk Through Albay</span
        >
      </div>

      <!-- Navigation Links -->
      <nav class="space-x-8 flex items-center font-medium">
        <NuxtLink to="/" class="text-white hover:text-green-500 transition"
          >Home</NuxtLink
        >
        <NuxtLink
          to="/explore"
          class="text-white hover:text-green-500 transition"
          >Explore</NuxtLink
        >
        <NuxtLink to="/map" class="text-white hover:text-green-500 transition"
          >Map</NuxtLink
        >
        <NuxtLink to="/about" class="text-white hover:text-green-500 transition"
          >About</NuxtLink
        >
        <NuxtLink
          to="/contact"
          class="text-white hover:text-green-500 transition"
          >Contact</NuxtLink
        >
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
// No special script needed unless you want to make it reactive
</script>

<style scoped>
/* Optional: smooth backdrop blur support for older browsers */
</style>
