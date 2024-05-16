<script setup lang="ts">
definePageMeta({
  layout: "welcome"
})
</script>

<template>
  <div class="welcome"></div>
  <div class="h-screen w-full overflow-hidden welcome relative">
    <WelcomeTop />
    <WelcomeAbout />
  </div>
</template>

<style scoped>
.welcome::after{
  content: '';
  position: fixed;
  background-image: url("https://img.freepik.com/free-vector/abstract-binary-code-or-digits-white-wallpaper-for-internet-hacking_1017-45494.jpg");
  width: 100%;
  height: 100vh;
  filter: blur(2.5px);
}
</style>
