import type * as monaco from "monaco-editor";
import * as vue_demi from "vue-demi";
import * as monaco_editor from "monaco-editor";
import type { IFile } from "~/types/folder.interface";
import { useColorMode } from "@vueuse/core";
import themeDark from "~/utils/theme-dark";
import themeLight from "~/utils/theme-light";
import useRefactoring from "./useRefactoring";

type Nullable<T> = T | null;
const mode = useColorMode();

const langMap = new Map<string, string>([
  ["js", "javascript"],
  ["ts", "typescript"],
  ["cpp", "cpp"],
  ["css", "css"],
  ["html", "html"],
  ["json", "json"],
  ["py", "python"],
]);

export default function useEditor(
  monacoRef: vue_demi.ShallowRef<Nullable<typeof monaco_editor>>,
  files: IFile[],
  modelMap: Map<string, monaco.editor.ITextModel>,
  text: Ref<string>
) {
  const editorRef = shallowRef<monaco.editor.IStandaloneCodeEditor>();
  const content = ref("");
  const activeFile = shallowRef<IFile>();
  const monacoInstance = shallowRef<Nullable<typeof monaco_editor>>(null);
  const language = shallowRef("");

  const { symbols, extension } = storeToRefs(useEditorStore());
  const { onAutoCompletion } = useAutoCompletion(text, content, extension);
  const { onRefactoring } = useRefactoring(text, content);
  const { token } = storeToRefs(useAuthStore());
  const folderStore = useFolderStore();
  const { onCollaboration } = useCollaboration();

  const onLoad = (editor: monaco.editor.IStandaloneCodeEditor) => {
    editorRef.value = editor;
    monacoInstance.value = monacoRef.value;
    if (!monacoInstance.value) return;

    monacoInstance.value.editor!.defineTheme("theme-dark", themeDark);
    monacoInstance.value.editor!.defineTheme("theme-light", themeLight);
    monacoInstance.value.editor!.setTheme(
      mode.value === "light" ? "theme-light" : "theme-dark"
    );

    files = [...files].map((file) => {
      const uri = monacoInstance.value!.Uri.parse(
        `${file.name}.${file.extension}`
      );
      content.value = file.content;
      language.value = langMap.get(file.extension) || "javascript";
      const model = monacoInstance.value!.editor.createModel(
        content.value,
        language.value,
        uri
      );

      extension.value = language.value;
      activeFile.value = file;

      modelMap.set(file._id, model);
      model.onDidChangeContent(() => {
        modelMap.set(
          file._id,
          editorRef.value!.getModel() as monaco.editor.ITextModel
        );
      });
      return {
        ...file,
      };
    });

    aiMenuConfig(monacoInstance.value);

    if (files.length === 1) {
      navigateTo(COMPILER_ABOUT_ROUTE);
    }

    onCollaboration(editorRef);
  };

  const switchTab = (to: IFile) => {
    activeFile.value = to;
    const activeModel = modelMap.get(to._id);

    if (activeModel) {
      editorRef.value?.setModel(activeModel);
      content.value = activeFile.value.content;
      // onCollaboration(editorRef);
    }
  };

  const aiMenuConfig = (monaco: typeof monaco_editor) => {
    const aiActionCompletion: monaco.editor.IActionDescriptor = {
      id: "ai_helper",
      label: `✨ Xpiler AI Auto-Completion`,
      run: () => onAutoCompletion(),
      keybindings: [monaco.KeyMod.Alt | monaco.KeyCode.KeyQ],
    };
    const aiActionRefactoring: monaco.editor.IActionDescriptor = {
      id: "ai_helper_refactoring",
      label: `✨ Xpiler AI Refactoring`,
      run: () => onRefactoring(),
      keybindings: [monaco.KeyMod.Alt | monaco.KeyCode.KeyR],
    };
    monaco.editor.addEditorAction(aiActionCompletion);
    monaco.editor.addEditorAction(aiActionRefactoring);
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
    () => activeFile.value,
    () => {
      extension.value = language.value;
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
    language,
    onLoad,
    switchTab,
    activeFile,
    content,
    aiMenuConfig,
    monacoInstance,
  };
}
