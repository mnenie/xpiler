import type * as monaco from "monaco-editor";
import * as vue_demi from "vue-demi";
import * as monaco_editor from "monaco-editor";
import type { Tab } from "~/types/editor.inteface";
import type { IFile } from "~/types/folder.interface";
import { useEditorStore } from "#imports";

type Nullable<T> = T | null;

export default function useEditor(
  monacoRef: vue_demi.ShallowRef<Nullable<typeof monaco_editor>>
) {
  const editorStore = useEditorStore();
  const editorRef = shallowRef<monaco.editor.IEditor>();
  const content = ref("");
  const activeFile = ref<IFile>();

  const onLoad = (editor: monaco.editor.IEditor) => {
    const monaco = monacoRef.value;
    if (!monaco) return;

    monaco.editor!.defineTheme("theme", theme);
    monaco.editor!.setTheme("theme");

    editorStore.activeTabs = [...editorStore.activeTabs].map((file) => {
      content.value = file.content;
      const uri = monaco.Uri.parse(`${file.name}.${file.extension}`);
      const model = monaco.editor.createModel(
        content.value,
        file.extension == 'ts' ? "typescript" : "javascript",
        uri
      );
      editorStore.modelMap.set(file.id, model);
      model.onDidChangeContent(() => {
        editorStore.modelMap.set(
          file.id,
          editorRef.value!.getModel() as monaco.editor.ITextModel
        );
      });
      return file;
    });
    editorRef.value = editor
    editorRef.value?.setModel(null);
  };

  // TODO: display file content when switching tabs
  const switchTab = (to: IFile) => {
    activeFile.value = to;
    const activeModel = editorStore.modelMap.get(to.id);
    console.log(activeModel)
    if (activeModel) {
      editorRef.value?.setModel(activeModel);
      content.value = activeModel.getValue();
    } else {
      content.value = `Can't find file with id ${to.id}` // debug
    }
  };


  return {
    editorRef,
    onLoad,
    switchTab,
    activeFile,
    content
  };
}
