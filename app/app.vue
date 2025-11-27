<template>
  <div class="app-font">
    <Toaster position="bottom-center" />
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
import "vue-sonner/style.css";
useHead({
  link: [{ rel: "icon", type: "image/png", href: "/logo.png" }],
  title: "Walk Through Albay",
});
</script>

<style scoped>
.app-font {
  font-family: "Montserrat", sans-serif;
  font-optical-sizing: auto;
  font-style: normal;
}
</style>
