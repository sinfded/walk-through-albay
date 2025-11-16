<template>
  <BackgroundImage>
    <WebHeader />
    <div class="relative z-20 max-w-6xl mx-auto px-6 py-24">
      <!-- Page Title -->
      <h1 class="text-4xl font-bold text-white text-center mb-20">
        Contact the Authors
      </h1>

      <!-- Contact Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
        <!-- Card 1 -->
        <div
          class="backdrop-blur-lg bg-white/15 rounded-2xl py-8 px-6 text-center shadow-lg"
        >
          <img
            src="/images/contact/rachel_austria.jpg"
            class="w-36 h-36 rounded-full mx-auto mt-4 mb-10"
            alt="Author 1"
          />
          <h2 class="text-xl font-semibold text-white">Rachel C. Austria</h2>
          <p class="text-white/70 font-semibold">Author 1</p>

          <div class="mt-4 space-y-1 text-sm font-medium">
            <p class="text-white/90">Email: asyelcambiaustria@gmail.com</p>
            <p class="text-white/90">Phone: +63 949 931 8259</p>
          </div>
        </div>

        <div
          class="backdrop-blur-lg bg-white/15 rounded-2xl py-8 px-6 text-center shadow-lg"
        >
          <img
            src="/images/contact/emmalyn_garais.jpg"
            class="w-36 h-36 rounded-full mx-auto mt-4 mb-10"
            alt="Author 2"
          />
          <h2 class="text-xl font-semibold text-white">Emmalyn F. Garais</h2>
          <p class="text-white/70 font-semibold">Author 2</p>

          <div class="mt-4 space-y-1 text-sm font-medium">
            <p class="text-white/90">Email: garaisemma@gmail.com</p>
            <p class="text-white/90">Phone: +63 955 857 3201</p>
          </div>
        </div>

        <div
          class="backdrop-blur-lg bg-white/15 rounded-2xl py-8 px-6 text-center shadow-lg"
        >
          <img
            src="/images/contact/hannah_joy_ranada.jpg"
            class="w-36 h-36 rounded-full mx-auto mt-4 mb-10"
            alt="Author 3"
          />
          <h2 class="text-xl font-semibold text-white">Hannah Joy B. Rañada</h2>
          <p class="text-white/70 font-semibold">Author 3</p>

          <div class="mt-4 space-y-1 text-sm font-medium">
            <p class="text-white/90">Email: hannahjoybumanlag12@gmail.com</p>
            <p class="text-white/90">Phone: +63 910 086 4495</p>
          </div>
        </div>
      </div>
    </div>
  </BackgroundImage>
</template>

<script lang="ts" setup></script>

<style scoped>
/* Fade-in animation */
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
