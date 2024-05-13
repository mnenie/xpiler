<script setup lang="ts">
import { VueMonacoEditor, useMonaco } from "@guolao/vue-monaco-editor";
import type * as monaco from "monaco-editor";

const { monacoRef } = useMonaco();

const editorRef = ref<monaco.editor.IEditor>();
const content = ref(`const a: number = 10;
console.log(a);`);

onMounted(() => {
  const monaco = monacoRef.value;
  if (!monaco) return;
  const uri = monaco.Uri.parse("post.ts");
  monaco.editor.createModel(content.value, "typescript", uri);
});

onUnmounted(() => {
  editorRef.value?.dispose();
});

const defaultOptions: monaco.editor.IStandaloneEditorConstructionOptions = {
  theme: 'vs',
  wordWrap: 'on',
  automaticLayout: true,
  autoIndent: 'none',
  selectOnLineNumbers: true,
  roundedSelection: false,
  readOnly: false,
  cursorStyle: 'line',
  glyphMargin: true,
  useTabStops: false,
  fontSize: 16
};
</script>

<template>
  <div class="w-full h-full">
    <vue-monaco-editor
      v-model:value="content"
      :default-language="'typescript'"
      :options="defaultOptions"
    />
  </div>
</template>
