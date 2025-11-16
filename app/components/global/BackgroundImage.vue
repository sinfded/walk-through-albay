<template>
  <div
    class="relative w-full h-screen bg-cover bg-center bg-no-repeat"
    style="background-image: url('/images/albay-bg.webp')"
  >
    <!-- Dark overlay for readability -->
    <div class="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

    <!-- Content on top -->
    <div
      class="relative z-10 flex flex-col items-center justify-center h-full text-white p-6"
    >
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
