import type * as monaco from "monaco-editor";
// import * as actions from "monaco-editor/esm/vs/platform/actions/common/actions";
import * as vue_demi from "vue-demi";
import * as monaco_editor from "monaco-editor";
import type { IFile } from "~/types/folder.interface";
import { useColorMode } from "@vueuse/core";
import themeDark from "~/utils/theme-dark";
import themeLight from "~/utils/theme-light";

type Nullable<T> = T | null;
const mode = useColorMode();

export default function useEditor(
  monacoRef: vue_demi.ShallowRef<Nullable<typeof monaco_editor>>,
  files: IFile[],
  modelMap: Map<string, monaco.editor.ITextModel>,
  text: Ref<string>
) {
  const editorRef = shallowRef<monaco.editor.IEditor>();
  const content = shallowRef("");
  const activeFile = shallowRef<IFile>();
  const monacoInstance = shallowRef<Nullable<typeof monaco_editor>>(null);

  const { onAutoCompletion } = useAutoCompletion(text, content);
  const { symbols } = storeToRefs(useEditorStore());

  const onLoad = (editor: monaco.editor.IEditor) => {
    monacoInstance.value = monacoRef.value;
    if (!monacoInstance.value) return;

    monacoInstance.value.editor!.defineTheme("theme-dark", themeDark);
    monacoInstance.value.editor!.defineTheme("theme-light", themeLight);
    monacoInstance.value.editor!.setTheme(
      mode.value === "light" ? "theme-light" : "theme-dark"
    );

    files = [...files].map((file) => {
      content.value = file.content;
      const uri = monacoInstance.value!.Uri.parse(
        `${file.name}.${file.extension}`
      );
      const model = monacoInstance.value!.editor.createModel(
        content.value,
        file.extension === "ts" ? "typescript" : "javascript",
        uri
      );
      modelMap.set(file.id, model);
      model.onDidChangeContent(() => {
        modelMap.set(
          file.id,
          editorRef.value!.getModel() as monaco.editor.ITextModel
        );
      });
      return {
        ...file,
      };
    });

    editorRef.value = editor;

    aiMenuConfig(monacoInstance.value);

    if (files.length === 1) {
      navigateTo(HOME_ROUTE);
    }
  };

  // TODO: display file content when switching tabs
  const switchTab = (to: IFile) => {
    activeFile.value = to;
    const activeModel = modelMap.get(to.id);

    if (activeModel) {
      editorRef.value?.setModel(activeModel);
      content.value = activeFile.value.content;
    }
  };

  const aiMenuConfig = (monaco: typeof monaco_editor) => {
    const aiAction: monaco.editor.IActionDescriptor = {
      id: "ai_helper",
      label: `✨ Xpiler AI Auto-Completion`,
      run: () => onAutoCompletion(),
      keybindings: [monaco.KeyMod.Alt | monaco.KeyCode.KeyQ],
    };
    monaco.editor.addEditorAction(aiAction);
  };

  watch(
    () => mode.value,
    () => {
      monacoRef.value?.editor!.defineTheme("theme-dark", themeDark);
      monacoRef.value?.editor!.defineTheme("theme-light", themeLight);
      monacoRef.value?.editor!.setTheme(
        mode.value === "light" ? "theme-light" : "theme-dark"
      );
    }
  );

  watch(
    () => content.value,
    () => {
      symbols.value = content.value;
    }
  );
  return {
    editorRef,
    onLoad,
    switchTab,
    activeFile,
    content,
    aiMenuConfig,
    monacoInstance,
  };
}
