<script setup lang="ts">
import type { IFile } from "~/types/folder.interface";
import { cn } from "~/lib/utils";

const folderStore = useFolder();
const editorStore = useEditorStore();

const props = defineProps<{
  item: IFile;
  layer: number;
  dir?: string;
}>();

const identStyle = reactive({
  paddingLeft: `${props.layer * 12 + 12}px`,
});

const hover = ref(false);
const renaming = ref(false);
let newName = `${props.item.name}.${props.item.extension}`;

const route = useRoute();

const isActiveRoute = computed(() => {
  return (targetRouteId: string) => {
    return route.params.id === targetRouteId;
  };
});
</script>

<template>
  <div
    @click="editorStore.toggleFile(item)"
    @mouseenter="hover = true"
    @mouseleave="hover = false"
    :style="identStyle"
    :class="cn('flex flex-row my-1 py-1', { 'bg-zinc-200 w-full dark:bg-zinc-700/40': isActiveRoute(item.id) })"
  >
    <div
      class="flex flex-row basis-4/5 space-x-2 items-center cursor-pointer px-1"
    >
      <iconsFileIcon :extension="props.item.extension" />
      <!-- debug outputs -->
      <p
        v-if="!renaming"
        class="text-[13px] md:text-[13px] 2xl:text-[14px] font-medium dark:text-zinc-300"
      >
        {{ props.item.name }}.{{ props.item.extension }}
      </p>
      <form
        v-else
        @submit.prevent="
          folderStore.renameFile(newName, props.item.id, folderStore.dir);
          renaming = false;
        "
      >
        <input
          class="bg-slate-200 outline-none w-4/5"
          type="text"
          v-model="newName"
        />
        <input type="submit" hidden />
      </form>
    </div>
    <div v-if="hover" class="flex flex-row space-x-1 items-center">
      <iconsTrashbin
        @click.stop="
          folderStore.deleteFile(props.item.id, folderStore.dir);
          editorStore.removeFile(props.item.id);
        "
      />
      <iconsPen @click.stop="renaming = true" />
    </div>
  </div>
</template>
