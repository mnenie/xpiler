<script setup lang="ts">
import { cn } from "~/lib/utils";
import { ChevronDown, Link, Link2Off } from "lucide-vue-next";
import { toast } from "vue-sonner";

const isShare = ref<boolean>(false);

const toggleShare = () => {
  isShare.value = !isShare.value;
  if (isShare.value) {
    toast.success("Link has been copied", {
      description: "Share the link with your team for collaborative work!",
    });
  } else {
    toast.error("Session is suspended", {
      description: "Share the link with your team for collaborative work!",
    });
  }
};
</script>

<template>
  <div
    :class="
      cn([
        $attrs.class,
        'h-10 w-full flex items-center justify-between bg-zinc-200 border-b border-b-zinc-300 px-4',
      ])
    "
  >
    <div>
      <span class="text-base font-medium">Compiler</span>
    </div>
    <div class="gap-3 flex items-center">
      <UiButton
        @click="toggleShare"
        size="sm"
        variant="outline"
        class="flex h-7 items-center border-dashed gap-2"
      >
        <component :is="isShare ? Link2Off : Link" color="rgb(107 114 128)" :size="15" />
        <span class="text-sm">{{isShare ? 'Unshare' : 'Share'}}</span>
      </UiButton>
      <div class="gap-1 flex items-center">
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
              :size="16"
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
