<template>
  <BackgroundImage>
    <WebHeader />
    <div class="relative z-20 w-3/4 mx-auto px-6 py-24">
      <!-- Page Title -->
      <h1 class="text-4xl font-bold text-white text-center mb-20">
        About the Project
      </h1>

      <!-- Contact Cards Grid -->
      <div class="w-full flex justify-center">
        <!-- Card 1 -->
        <div
          class="backdrop-blur-lg bg-white/15 rounded-2xl p-8 text-center shadow-lg w-full flex space-x-6 max-w-[900px]"
        >
          <div class="basis-1/2">
            <img
              src="/logo.png"
              class="w-full h-auto rounded-full bg-gray-300"
              alt="Author 1"
            />
          </div>
          <div class="basis-1/2">
            <p class="text-white/70 font-medium text-justify">
              <span class="text-green-600 font-bold">WALK THROUGH ALBAY</span>
              is an interactive website that takes users on a digital journey
              through the rich history, culture, and heritage of Albay Province.
              It features an engaging GIS-based map that highlights the
              province’s historical structures, landmarks, and cultural sites,
              allowing visitors to explore each location with detailed
              descriptions, images, and stories from the past. The website aims
              to preserve and promote Albay’s historical identity, offering an
              educational and immersive experience for students, researchers,
              tourists, and locals alike. Through this virtual walkthrough,
              users can discover how Albay’s vibrant culture and enduring legacy
              continue to shape its communities today.
            </p>
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
