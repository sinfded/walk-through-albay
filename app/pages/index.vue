<template>
  <BackgroundVideo>
    <WebHeader />
    <div class="relative z-10">
      <!-- Centered Title -->
      <div
        class="absolute inset-0 flex flex-col items-center justify-center z-20 text-center"
      >
        <transition d name="fade" appear>
          <h1 class="text-6xl font-bold text-white uppercase">Walk</h1>
        </transition>
        <transition name="fade" appear>
          <div class="flex items-center justify-center">
            <h1 class="text-6xl font-bold text-white uppercase">Thr</h1>
            <img src="/logo.png" alt="Logo" class="h-12 w-auto" />
            <h1 class="text-6xl font-bold text-white uppercase">ugh</h1>
          </div>
        </transition>
        <transition name="fade" appear>
          <h1 class="text-9xl albay-font text-green-700 font-extrabold">
            Albay
          </h1>
        </transition>
      </div>
    </div>
  </BackgroundVideo>
</template>

<script lang="ts" setup></script>

<style scoped>
/* Fade-in animation */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1.5s ease;
  transition-delay: 1000ms;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

.albay-font {
  font-family: "Bonheur Royale", cursive;
  font-weight: 400;
  font-style: normal;
}
</style>
