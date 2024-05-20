export default function useAnalysis() {
  const isPendingAnalysis = ref(false);

  const useData = async (output: Ref<string>, content: Ref<string>) => {
    isPendingAnalysis.value = true;
    try {
      const data = await $fetch("/api/analysis", {
        method: "POST",
        body: JSON.stringify({
          error: output.value,
          content: content.value,
        }),
      });
      return data;
    } catch (e) {
      console.log(e);
    } finally {
      isPendingAnalysis.value = false;
    }
  };

  return {
    isPendingAnalysis,
    useData
  };
}
