<script setup lang="ts">
import { VueMonacoEditor, useMonaco } from "@guolao/vue-monaco-editor";
import type * as monaco from "monaco-editor";
import type { Tab } from "~/types/editor.inteface";
import { cn } from "~/lib/utils";

const files = ref<Tab[]>([{ path: "untiled.ts" }, { path: "new.js" }]);
const modelMap = new Map<string, monaco.editor.ITextModel>();
const viewStateMap = new Map<string, monaco.editor.IEditorViewState>();

const { monacoRef } = useMonaco();
const { editorRef, onload, content, activeFile, switchTab } = useEditor(
  monacoRef,
  files,
  modelMap,
  viewStateMap
);

onMounted(() => {
  onload();
});

watch(
  () => activeFile.value?.path,
  () => {
    onload();
  }
);

onUnmounted(() => {
  editorRef.value?.dispose();
  for (const model of modelMap.values()) {
    model.dispose();
  }
});
</script>

<template>
  <div class="w-full flex flex-col h-full">
    <ul class="flex w-full bg-zinc-100 border-b border-zinc-300">
      <li
        v-for="file in files"
        :key="file.path"
        @click="switchTab(file)"
        :class="
          cn('list-none, text-gray-900 text-sm py-1 px-3 border-r border-zinc-300', [
            activeFile?.path === file.path ? 'bg-white' : 'bg-zinc-100',
          ])
        "
      >
        {{ file.path }}
      </li>
    </ul>
    <vue-monaco-editor
      v-model:value="content"
      :default-language="'typescript'"
      :options="defaultOptions"
    />
  </div>
</template>
