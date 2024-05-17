<script setup lang="ts">
import { cn } from "~/lib/utils";
import { ChevronDown, Link, Link2Off, Moon, Sun, Braces } from "lucide-vue-next";
import { toast } from "vue-sonner";
import { useColorMode } from "@vueuse/core";
import Switch from "~/components/ui/switch/Switch.vue";

const isShare = ref<boolean>(false);
const { store } = useColorMode();
const modelTheme = ref(false);
const color = computed(() => {
  return modelTheme.value == false ? "rgb(228 228 231)" : "rgb(39 39 42)";
});

const toggleShare = () => {
  isShare.value = !isShare.value;
  if (isShare.value) {
    toast.success("Link has been copied", {
      description: "Share the link with your team for collaborative work!",
    });
  } else {
    toast.error("Session is suspended", {
      description: "You work with code alone rn!",
    });
  }
};

const toggleTheme = () => {
  modelTheme.value != modelTheme.value;
  modelTheme.value === false ? (store.value = "dark") : (store.value = "light");
};
</script>

<template>
  <div
    :class="
      cn([
        $attrs.class,
        'h-10 w-full flex items-center justify-between bg-zinc-200 border-b border-b-zinc-300 px-4 dark:bg-[#222224] dark:border-b-[#3f3f45] dark:text-zinc-100',
      ])
    "
  >
    <div class="flex items-center space-x-2 dark:text-zinc-200 text-zinc-900">
      <Braces :size="18" />
      <span class="lg:text-lg md:text-[16px] font-medium">Xpiler</span>
    </div>
    <div class="gap-3 flex items-center">
      <UiButton
        @click="toggleShare"
        size="sm"
        variant="secondary"
        class="flex h-7 items-center gap-2"
      >
        <component
          :is="isShare ? Link2Off : Link"
          :color="modelTheme === false ? 'rgb(228 228 231)' : 'rgb(107 114 128)'"
          :size="14"
        />
        <span class="text-sm">{{ isShare ? "Unshare" : "Share" }}</span>
      </UiButton>
      <Switch
        v-model:checked="modelTheme"
        class="mr-0.5"
        @update:checked="toggleTheme"
      >
        <Moon v-if="store === 'dark'" :size="14" :color="color" />
        <Sun v-else :size="14" :color="color" />
      </Switch>
      <div class="gap-0.5 flex items-center">
        <UiAvatar class="h-6 w-6">
          <UiAvatarImage
            class="object-cover"
            src="https://www.shadcn-vue.com/avatars/02.png"
          />
          <UiAvatarFallback> al </UiAvatarFallback>
        </UiAvatar>
        <UiDropdownMenu>
          <UiDropdownMenuTrigger as-child>
            <ChevronDown
              class="cursor-pointer"
              color="rgb(107 114 128)"
              :size="15"
            />
          </UiDropdownMenuTrigger>
          <UiDropdownMenuContent>
            <UiDropdownMenuLabel class="text-[13px]"
              >user@gmail.com</UiDropdownMenuLabel
            >
            <UiDropdownMenuSeparator />
            <UiDropdownMenuItem class="text-[13px]"
              >Sign Out</UiDropdownMenuItem
            >
          </UiDropdownMenuContent>
        </UiDropdownMenu>
      </div>
    </div>
  </div>
</template>
