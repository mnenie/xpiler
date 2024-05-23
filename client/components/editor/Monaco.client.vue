<script setup lang="ts">
import { VueMonacoEditor, useMonaco } from "@guolao/vue-monaco-editor";
import * as monaco from "monaco-editor";

const modelMap = new Map<string, monaco.editor.ITextModel>();
const editorStore = useEditorStore();
const { activeTabs } = storeToRefs(editorStore);
const output = ref("");
const errorTerminal = ref("");
const analysis = ref("");
const text = ref("");

const { monacoRef } = useMonaco();

const { editorRef, onLoad, content, activeFile, switchTab, language } = useEditor(
  monacoRef,
  editorStore.activeTabs,
  modelMap,
  text
);

const { executeCode, isPending } = useTerminal();
const { useData, isPendingAnalysis } = useAnalysis();

const compileCode = async () => {
  const { run: data } = await executeCode(language, content);
  output.value = data.output;
  errorTerminal.value = data.stderr;
  if(errorTerminal.value){
    analysis.value = await useData(errorTerminal, content);
  }
};

onUnmounted(() => {
  editorRef.value?.dispose();
  for (const model of modelMap.values()) {
    model.dispose();
  }
});
</script>

<template>
  <div class="w-full flex flex-col h-full overflow-hidden relative">
    <EditorTabs
      :active-file="activeFile"
      :active-tabs="activeTabs"
      @compile-code="compileCode"
      @switch-tab="switchTab"
    />
    <vue-monaco-editor
      v-model:value="content"
      :language="language"
      :options="defaultOptions"
      @mount="onLoad"
    />
    <EditorTerminal
      :output="output"
      :is-pending="isPending"
      :analysis="analysis"
      :loading-analysis="isPendingAnalysis"
    />
  </div>
</template>
