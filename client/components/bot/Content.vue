<script setup lang="ts">
import { cn } from '@/lib/utils';
import { marked } from 'marked';

const props = defineProps<{
  messages: ChatCompletionRequestMessage[];
  isPending: boolean;
}>();

const container = ref<HTMLElement | null>(null);

const markedMessagesToHtml = computed(() => {
  scrollToBottom();
  return props.messages.map((message) => {
    return {
      ...message,
      text: marked.parse(message.text)
    };
  });
});

const scrollToBottom = async () => {
  await nextTick(() => {
    if (container.value) {
      container.value.scrollTop = container.value.scrollHeight;
    }
  });
};

watch(
  () => props.messages,
  async () => {
    await scrollToBottom();
  }
);
</script>

<template>
  <div class="h-full">
    <div ref="container" class="content relative flex h-[90%] flex-1 flex-col overflow-y-auto">
      <div class="flex h-full flex-col gap-8">
        <div
          v-for="(message, index) in markedMessagesToHtml"
          :key="index"
          :class="
            cn(
              'flex items-center gap-4',
              message.role === 'user' ? 'flex-row-reverse' : '',
              index === markedMessagesToHtml.length - 1 && message.role === 'assistant' && 'pb-10'
            )
          "
        >
          <BotAvatar>
            <UiAvatarFallback>
              {{ message && message.role === 'user' ? 'al' : 'ai' }}
            </UiAvatarFallback>
          </BotAvatar>
          <div
            class="text-[14px] content_message dark:text-zinc-200 md:text-[13px] 2xl:text-[14px]"
            v-html="message && message.text"
          />
        </div>
        <div v-if="props.isPending" class="flex items-center gap-2 pb-10">
          <BotAvatar>
            <UiAvatarFallback> ai </UiAvatarFallback>
          </BotAvatar>
          <div class="flex items-center gap-2 text-[14px] content_message dark:text-zinc-200 md:text-[13px] 2xl:text-[14px]">
            <span>is thinking</span>
            <div class="inline-flex h-1.5 w-1.5 animate-ping rounded-full bg-zinc-200" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@media screen and (max-width: 520px) {
  .content_message{
    @apply text-sm
  }
}
</style>