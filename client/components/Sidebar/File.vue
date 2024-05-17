<script setup lang="ts">
import type { IFile } from "~/types/folder.interface";
import { cn } from "~/lib/utils";
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';

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
  <ContextMenu>
    <ContextMenuTrigger>
      <div @click.stop="editorStore.toggleFile(item)" @mouseenter="hover = true" @mouseleave="hover = false"
        :style="identStyle"
        :class="cn('flex flex-row my-1 py-1', { 'bg-zinc-200 w-full dark:bg-zinc-700/40': isActiveRoute(item.id) })"
        class="hover:bg-slate-300 dark:hover:bg-zinc-700/40">
        <div class="flex flex-row basis-4/5 space-x-2 items-center cursor-pointer px-1">
          <iconsFileIcon :extension="props.item.extension" />
          <!-- debug outputs -->
          <p v-if="!renaming" class="text-[13px] md:text-[13px] 2xl:text-[14px] font-medium dark:text-zinc-300">
            {{ props.item.name }}.{{ props.item.extension }}
          </p>
          <form v-else @submit.prevent="
            folderStore.renameFile(newName, props.item.id, folderStore.dir);
          renaming = false;
          ">
            <input class="bg-slate-200 outline-none w-4/5" type="text" v-model="newName" />
            <input type="submit" hidden />
          </form>
        </div>
      </div>
    </ContextMenuTrigger>
    <ContextMenuContent class="w-72 bg-zinc-100 border-zinc-300 dark:bg-zinc-800 dark:border-[#3f3f45]">
      <ContextMenuItem>Открыть</ContextMenuItem>
      <ContextMenuSeparator />
      <ContextMenuItem>
        <p>Скопировать путь</p><IconsLink :type="'absolute'" />
      </ContextMenuItem>
      <ContextMenuItem>
        <p>Скопировать относительный путь</p><IconsLink :type="'relative'" />
      </ContextMenuItem>
      <ContextMenuSeparator />
      <ContextMenuItem @click.stop="renaming = true">
        <p>Переименовать</p><iconsPen />
      </ContextMenuItem>
      <ContextMenuItem @click.stop="
        folderStore.deleteFile(props.item.id, folderStore.dir);
        editorStore.removeFile(props.item.id);">
        <p>Удалить</p><iconsTrashbin />
      </ContextMenuItem>
    </ContextMenuContent>
  </ContextMenu>
</template>

<style scoped>
p {
  margin-right: auto;
}
</style>
