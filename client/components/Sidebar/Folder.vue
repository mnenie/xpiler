<script setup lang="ts">
import { useColorMode } from '@vueuse/core';

const folderStore = useFolder();

const props = defineProps(["item"]);
const hover = ref(false);
const renaming = ref(false);
let newName = props.item.name;

const identStyle = reactive({
  paddingLeft: `${props.item.layer * 14 + 14}px`,
});

const mode = useColorMode();
</script>

<template>
  <div>
    <div
      @mouseenter="hover = true"
      @mouseleave="hover = false"
      :style="identStyle"
      class="flex flex-row hover:bg-slate-300 dark:hover:bg-zinc-700/40 my-1 py-1"
    >
      <div
        class="flex flex-row space-x-2 items-center cursor-pointer basis-4/5"
      >
        <iconsFolderIcon :class="mode === 'dark' ? 'text-zinc-100' : ''" />
        <!-- debug outputs -->
        <p v-if="!renaming" class="text-[13px] md:text-[13px] 2xl:text-[14px] dark:text-zinc-300">
          {{ props.item.name }}
        </p>
        <form
          v-else
          @submit.prevent="
            folderStore.renameFolder(newName, props.item.id, folderStore.dir);
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
        <iconsFilePlusIcon
          @click.stop="
            folderStore.createFile(
              props.item.id,
              props.item,
              props.item.layer + 1
            )
          "
        />
        <iconsFolderPlusIcon
          @click.stop="
            folderStore.createFolder(
              props.item.id,
              props.item,
              props.item.layer + 1
            )
          "
        />
        <iconsTrashbin
          @click.stop="folderStore.deleteFolder(props.item.id, folderStore.dir)"
        />
        <iconsPen @click.stop="renaming = true" />
      </div>
    </div>
    <div>
      <SidebarFolder
        v-if="props.item.folders.length > 0"
        v-for="folder in item.folders"
        :key="folder"
        :item="folder"
      />
      <SidebarFile
        v-for="file in item.files"
        :key="file.id"
        :item="file"
        :layer="props.item.layer + 1"
      />
    </div>
  </div>
</template>
