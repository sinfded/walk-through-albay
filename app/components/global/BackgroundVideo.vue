<template>
  <div class="relative w-full h-screen overflow-hidden">
    <!-- Background Video -->
    <video
      autoplay
      loop
      muted
      playsinline
      class="absolute top-0 left-0 w-full h-full object-cover"
    >
      <source src="/video/background.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>

    <!-- Optional overlay to darken the video -->
    <div class="absolute inset-0 bg-black/40 z-5"></div>

    <!-- Content on top -->
    <div
      class="relative z-10 flex flex-col items-center justify-center h-full text-white p-6"
    >
      <slot />
    </div>
  </div>
</template>
