import { toast } from "vue-sonner";

export default function useRefactoring(
  text: Ref<string>,
  content: Ref<string>
) {
  const isPending = ref(false);

  const useData = async () => {
    isPending.value = true;

    const promise = new Promise(async (resolve, reject) => {
      try {
        const data = await $fetch("/api/refactoring", {
          method: "POST",
          body: JSON.stringify({
            text: text.value,
          }),
        });
        resolve(data);
      } catch (e) {
        reject(e);
      } finally {
        isPending.value = false;
      }
    });

    toast.promise(promise, {
      loading: "Refactoring is loading...",
      success: () => "AI has done the refactoring!",
      error: () => "Smth went wrong",
    });

    return promise;
  };

  const onRefactoring = async () => {
    if (window) {
      text.value = window.getSelection()?.toString() || "";
    }
    const response = await useData();

    const cleanedResponse = (response as string).replace(/```/g, "").trim();
    const index = content.value!.indexOf(text.value);
    const newText = cleanedResponse;
    content.value = newText;
  };

  return {
    isPending,
    onRefactoring,
  };
}
