export default function useGptBot(text: Ref<string>) {
  const isPending = ref(false);

  const useConversationBot = async () => {
    try {
      isPending.value = true;
      const data = await $fetch("/api/bot", {
        method: "POST",
        body: JSON.stringify({
          text: text.value,
        }),
      });
      return data;
    } catch (e) {
      console.log(e);
    } finally {
      isPending.value = false;
    }
  };

  return {
    useConversationBot,
    isPending,
  };
}
