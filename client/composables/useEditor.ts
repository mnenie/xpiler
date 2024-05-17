import type * as monaco from "monaco-editor";
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
  modelMap: Map<string, monaco.editor.ITextModel>
) {
  const editorRef = shallowRef<monaco.editor.IEditor>();
  const content = shallowRef("");
  const activeFile = shallowRef<IFile>();

  const onLoad = (editor: monaco.editor.IEditor) => {
    const monaco = monacoRef.value;
    if (!monaco) return;

    monaco.editor!.defineTheme("theme-dark", themeDark);
    monaco.editor!.defineTheme("theme-light", themeLight);
    monaco.editor!.setTheme(mode.value === "light" ? "theme-light" : "theme-dark");

    files = [...files].map((file) => {
      content.value = file.content;
      const uri = monaco.Uri.parse(`${file.name}.${file.extension}`);
      const model = monaco.editor.createModel(
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
    if (files.length === 1) {
      navigateTo(COMPILER_ROUTE + '/' + 'about_compiler')
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

  watch(() => mode.value, () => {
    monacoRef.value?.editor!.defineTheme("theme-dark", themeDark);
    monacoRef.value?.editor!.defineTheme("theme-light", themeLight);
    monacoRef.value?.editor!.setTheme(mode.value === "light" ? "theme-light" : "theme-dark");
  });

  return {
    editorRef,
    onLoad,
    switchTab,
    activeFile,
    content,
  };
}
