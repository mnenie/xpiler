<script setup lang="ts">
import { VueMonacoEditor, useMonaco } from "@guolao/vue-monaco-editor";
import type * as monaco from "monaco-editor";
import type { Tab } from "~/types/editor.inteface";
import { cn } from "~/lib/utils";
import { Play } from "lucide-vue-next";

const files = ref<Tab[]>([{ path: "untiled.ts" }, { path: "new.js" }]);
const modelMap = new Map<string, monaco.editor.ITextModel>();
const output = ref("");

const { monacoRef } = useMonaco();
const { editorRef, onLoad, content, activeFile, switchTab } = useEditor(
  monacoRef,
  files,
  modelMap
);

const language = ref("typescript");

const { executeCode, isPending } = useTerminal();

const compileCode = async () => {
  const { run: data } = await executeCode(language, content);
  output.value = data.output;
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
    <ul class="flex w-full border-b bg-zinc-200/40 border-zinc-300">
      <li
        v-for="file in files"
        :key="file.path"
        @click="switchTab(file)"
        :class="
          cn(
            'list-none, text-gray-900 text-[13px] md:text-[13px] 2xl:text-[14px] flex items-center gap-2 h-8 px-3 border-r border-zinc-300 cursor-pointer',
            [activeFile?.path === file.path ? 'bg-white' : 'bg-zinc-100']
          )
        "
      >
        {{ file.path }}
        <Play @click="compileCode" :size="12" color="rgb(5 150 105)" />
      </li>
    </ul>
    <vue-monaco-editor
      v-model:value="content"
      :default-language="'typescript'"
      :options="defaultOptions"
      @mount="onLoad"
    />
    <EditorTerminal :output="output" :is-pending="isPending" />
  </div>
</template>