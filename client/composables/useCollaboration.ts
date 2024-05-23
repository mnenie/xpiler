import type { ShallowRef } from "vue";
import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";
import { MonacoBinding } from "y-monaco";
import type * as monaco from "monaco-editor";

export default function useCollaboration() {
  let doc: Y.Doc | null = null;
  let provider: WebrtcProvider | null = null;
  let binding: MonacoBinding | null = null;

//   const { isShare } = storeToRefs(useEditorStore());

  const route = useRoute();
  const onCollaboration = (
    editorRef: ShallowRef<monaco.editor.IStandaloneCodeEditor | undefined>
  ) => {
    const type = doc!.getText("monaco");
    const awareness = provider!.awareness;

    binding = new MonacoBinding(
      type,
      editorRef.value!.getModel()!,
      new Set([editorRef.value!]),
      awareness
    );
  };

  onMounted(() => {
    doc = new Y.Doc();
    provider = new WebrtcProvider(route.params.id as string, doc);
  });

  onUnmounted(() => {
    if (provider) {
      provider.destroy();
    }
    if (binding) {
      binding.destroy();
    }
    if (doc) {
      doc.destroy();
    }
  })

  return {
    provider,
    binding,
    doc,
    onCollaboration,
  };
}
