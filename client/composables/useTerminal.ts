export default function useTerminal() {
  const { $apiCode } = useNuxtApp();
  const isPending = ref<boolean>(false);

  const executeCode = async (
    language: Ref<string>,
    editorInstance: Ref<string>
  ) => {
    isPending.value = true;
    try {
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
