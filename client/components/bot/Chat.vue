<script setup lang="ts">
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const messages = ref<ChatCompletionRequestMessage[]>([]);
const model = ref("");

const { useConversationBot, isPending } = useGptBot(model);

const handleSubmit = async () => {
  const userMessage: { role: "user"; text: string } = {
    role: "user",
    text: model.value,
  };
  messages.value.push(userMessage);
  const response = await useConversationBot();
  messages.value.push(response);
  model.value = "";
};
</script>

<template>
  <Sheet>
    <SheetTrigger>
      <slot />
    </SheetTrigger>
    <SheetContent class="h-full flex flex-col justify-between">
      <UiSheetHeader>
        <UiSheetTitle> Xpiler Ai Bot </UiSheetTitle>
      </UiSheetHeader>
      <BotContent :messages="messages" :is-pending="isPending" />
      <BotMessage @on-submit="handleSubmit" v-model="model" />
    </SheetContent>
  </Sheet>
</template>
