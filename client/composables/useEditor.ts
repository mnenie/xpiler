import type * as monaco from "monaco-editor";
import * as vue_demi from "vue-demi";
import * as monaco_editor from "monaco-editor";
import type { Tab } from "~/types/editor.inteface";

type Nullable<T> = T | null;

export default function useEditor(
  monacoRef: vue_demi.ShallowRef<Nullable<typeof monaco_editor>>,
  files: Ref<Tab[]>,
  modelMap: Map<string, monaco.editor.ITextModel>,
) {
  const editorRef = shallowRef<monaco.editor.IEditor>();
  const content = ref("");
  const activeFile = ref<Tab>();

  const onLoad = (editor: monaco.editor.IEditor) => {
    const monaco = monacoRef.value;
    if (!monaco) return;

    monaco.editor!.defineTheme("theme", theme);
    monaco.editor!.setTheme("theme");

    files.value = [...files.value].map((file) => {
      content.value = `console.log('this is ${file.path}')`;
      const uri = monaco.Uri.parse(file.path);
      const model = monaco.editor.createModel(
        content.value,
        file.path.endsWith(".ts") ? "typescript" : "javascript",
        uri
      );
      modelMap.set(file.path, model);
      model.onDidChangeContent(() => {
        modelMap.set(
          file.path,
          editorRef.value!.getModel() as monaco.editor.ITextModel
        );
      });
      return {
        path: file.path,
      } as Tab;
    });
    editorRef.value = editor
    switchTab(files.value.at(0)!);
  };

  const switchTab = (to: Tab) => {
    activeFile.value = to;
    const activeModel = modelMap.get(to.path);
    if (activeModel) {
      editorRef.value?.setModel(activeModel);
      content.value = activeModel.getValue();
    }
  };

  return {
    editorRef,
    onLoad,
    switchTab,
    activeFile,
    content,
    modelMap,
  };
}
