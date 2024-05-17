<script setup lang="ts">
import { useColorMode } from '@vueuse/core';
import type { IFile, IFolder } from '~/types/folder.interface';
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
const edtorStore = useEditorStore();

const props = defineProps<{
  item: IFolder
}>();

const hover = ref(false);
const renaming = ref(false);
const folded = ref(props.item.isFolded);

let newName = props.item.name;

const identStyle = reactive({
  paddingLeft: `${props.item.layer * 14 + 14}px`,
});

const clearFolder = (folder : IFolder) => {
  if (folder.folders.length !== 0) {
    folder.folders.forEach(f => clearFolder(f))
  }
  folder.files.forEach(f => edtorStore.removeFile(f.id))
}

const mode = useColorMode();
</script>

<template>
  <ContextMenu>
    <ContextMenuTrigger>
      <div @click.stop="folderStore.toggleFold(props.item.id, folderStore.dir); folded = !folded">
        <div @mouseenter="hover = true" @mouseleave="hover = false" :style="identStyle"
          class="flex flex-row hover:bg-slate-300 dark:hover:bg-zinc-700/40 my-1 py-1">
          <div class="flex flex-row space-x-2 items-center cursor-pointer basis-4/5">
            <iconsFolderIcon v-if="folded" :class="mode === 'dark' ? 'text-zinc-100' : ''" />
            <iconsFolderOpenIcon v-else :class="mode === 'dark' ? 'text-zinc-100' : ''" />
            <!-- debug outputs -->
            <p v-if="!renaming" class="text-[13px] md:text-[13px] 2xl:text-[14px] dark:text-zinc-300">
              {{ props.item.name }}
            </p>
            <form v-else @submit.prevent="
              folderStore.renameFolder(newName, props.item.id, folderStore.dir);
              renaming = false;
            ">
              <input class="bg-slate-200 outline-none w-4/5" type="text" v-model="newName" />
              <input type="submit" hidden />
            </form>
          </div>
        </div>
        <div v-if="!folded">
          <SidebarFolder v-if="props.item.folders.length > 0" v-for="folder in item.folders" :key="folder.id"
            :item="folder" />
          <SidebarFile v-for="file in item.files" :key="file.id" :item="file" :layer="props.item.layer + 1" />
        </div>
      </div>
    </ContextMenuTrigger>
    <ContextMenuContent class="w-72 bg-zinc-100 border-zinc-300 dark:bg-zinc-800 dark:border-[#3f3f45]">
      <ContextMenuItem @click.stop="folderStore.createFolder( props.item.id, props.item, props.item.layer + 1)">
        <p>Создать папку</p>
        <iconsFolderPlusIcon />
      </ContextMenuItem>
      <ContextMenuItem @click.stop="folderStore.createFile(props.item.id,props.item, props.item.layer + 1)">
        <p>Создать файл</p>
        <iconsFilePlusIcon />
      </ContextMenuItem>
      <ContextMenuSeparator />
      <ContextMenuItem>
        <p>Скопировать путь</p>
        <IconsLink :type="'absolute'" />
      </ContextMenuItem>
      <ContextMenuItem>
        <p>Скопировать относительный путь</p>
        <IconsLink :type="'relative'" />
      </ContextMenuItem>
      <ContextMenuSeparator />
      <ContextMenuItem @click.stop="renaming = true">
        <p>Переименовать</p>
        <iconsPen />
      </ContextMenuItem>
      <ContextMenuItem @click.stop="clearFolder(props.item); folderStore.deleteFolder(props.item.id, folderStore.dir);">
        <p>Удалить</p>
        <iconsTrashbin />
      </ContextMenuItem>
    </ContextMenuContent>
  </ContextMenu>

</template>

<style scoped>
p {
  margin-right: auto;
}
</style>
