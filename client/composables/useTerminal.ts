export default function useTerminal(
  language: Ref<string>,
  editorInstance: Ref<string>
) {
  const { $apiCode } = useNuxtApp();
  const isPending = ref<boolean>(false);
  const executeCode = async () => {
    try {
      isPending.value = true;
      const response = await $apiCode.post("/execute", {
        language: language.value,
        version: LANGUAGE_VERSIONS[language.value],
        files: [
          {
            content: editorInstance.value,
          },
        ],
      });
      return response.data;
    } catch (err) {
      console.log(err);
    } finally {
      isPending.value = false;
    }
  };

  return {
    executeCode,
    isPending,
  };
}
