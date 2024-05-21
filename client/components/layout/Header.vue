<script setup lang="ts">
import { cn } from "~/lib/utils";
import {
  ChevronDown,
  Link,
  CheckCheck,
  Moon,
  Sun,
  Braces,
} from "lucide-vue-next";
import { useColorMode } from "@vueuse/core";
import Switch from "~/components/ui/switch/Switch.vue";
import { Skeleton } from "@/components/ui/skeleton";

const { store, system } = useColorMode();
const { isShare, toggleShare } = useShare();

const modelTheme = ref(false);
const color = computed(() => {
  return modelTheme.value == false ? "rgb(228 228 231)" : "rgb(39 39 42)";
});

const toggleTheme = () => {
  modelTheme.value != modelTheme.value;
  modelTheme.value === false ? (store.value = "dark") : (store.value = "light");
};

const authStore = useAuthStore();
const { user, isLoading } = storeToRefs(authStore);

const onEvent = async () => {
  user.value ? authStore.logout() : await authStore.oAuth2Github();
};

onMounted(() => {
  store.value === "dark"
    ? (modelTheme.value = false)
    : (modelTheme.value = true);
});
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
      <span class="2xl:text-[17px] md:text-[15px] font-medium">Xpiler</span>
    </div>
    <div class="gap-3 flex items-center">
      <UiButton
        @click="toggleShare"
        size="sm"
        variant="secondary"
        class="flex h-7 items-center gap-2"
      >
        <component
          :is="Link"
          :class="isShare ? 'dark:text-green-300 text-green-500' : 'dark:text-zinc-200 text-zinc-500'"
          :size="14"
        />
        <span class="text-sm">{{ isShare ? "Link is copied" : "Share" }}</span>
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
        <UiAvatar v-if="!isLoading" class="h-6 w-6">
          <UiAvatarImage
            class="object-cover"
            :src="
              user
                ? user.photoURL!
                : 'https://www.shadcn-vue.com/avatars/02.png'
            "
          />
          <UiAvatarFallback>
            {{ user && user.email.split("").splice(0, 2).join("") }}
          </UiAvatarFallback>
        </UiAvatar>
        <Skeleton v-else class="h-6 w-6 rounded-full" />
        <UiDropdownMenu>
          <UiDropdownMenuTrigger as-child>
            <ChevronDown
              class="cursor-pointer"
              color="rgb(107 114 128)"
              :size="15"
            />
          </UiDropdownMenuTrigger>
          <UiDropdownMenuContent>
            <UiDropdownMenuLabel class="dropdown_text text-[13px]">{{
              user ? user.email : "unknown user"
            }}</UiDropdownMenuLabel>
            <UiDropdownMenuSeparator />
            <UiDropdownMenuItem @click="onEvent" class="dropdown_text text-[13px]">{{
              user ? "Sign Out" : "Log in"
            }}</UiDropdownMenuItem>
            <UiDropdownMenuItem
              @click="navigateTo(HOME_ROUTE)"
              class="text-[13px] dropdown_text"
            >
              Go To Welcome
            </UiDropdownMenuItem>
          </UiDropdownMenuContent>
        </UiDropdownMenu>
      </div>
    </div>
  </div>
</template>

<style scoped>
@media screen and (max-width: 520px){
  .dropdown_text{
    @apply text-sm
  }
}

</style>
