import { toast } from "vue-sonner";

export default function useEditorCompletion(
  text: Ref<string>,
  content: Ref<string>,
  extension: Ref<string>
) {
  const isPending = ref(false);

  const useEditorData = async () => {
    isPending.value = true;

    const promise = new Promise(async (resolve, reject) => {
      try {
        const data = await $fetch("/api/editor", {
          method: "POST",
          body: JSON.stringify({
            text: content.value,
            extension: extension.value,
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
      loading: "Xpiler AI is thinking",
      success: () => "AI has done the auto-completion!",
      error: () => "Smth went wrong",
    });

    return promise;
  };

  const onAutoCompletion = async () => {
    if (window) {
      text.value = window.getSelection()?.toString() || "";
    }
    const response = await useEditorData();
    console.log(response);
    const index = content.value!.indexOf(text.value);
    const newText =
      content.value!.slice(0, index + text.value.length) +
      ` ${response as string}` +
      content.value!.slice(index + text.value.length);
    content.value = newText;
  };

  return {
    isPending,
    onAutoCompletion,
  };
}
