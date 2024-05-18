<template>
  <ClientOnly>
    <div class="relative flex min-h-screen flex-col dark:bg-[#1a1a1a]">
      <WelcomeTop />
      <slot class="flex-1" />
      <WelcomeBottom />
    </div>
  </ClientOnly>
</template>
