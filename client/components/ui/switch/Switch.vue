<script setup lang="ts">
import { type HTMLAttributes, computed } from "vue";
import {
  SwitchRoot,
  type SwitchRootEmits,
  type SwitchRootProps,
  SwitchThumb,
  useForwardPropsEmits,
} from "radix-vue";
import { cn } from "@/lib/utils";

const props = defineProps<
  SwitchRootProps & { class?: HTMLAttributes["class"] }
>();

const emits = defineEmits<SwitchRootEmits>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
  <SwitchRoot
    v-bind="forwarded"
    :class="
      cn(
        'peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2  focus-visible:ring-zinc-950 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-200 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-zinc-100 data-[state=unchecked]:bg-zinc-200 dark:focus-visible:ring-gray-300 dark:focus-visible:ring-offset-zinc-800 dark:data-[state=checked]:bg-zinc-100 dark:data-[state=unchecked]:bg-zinc-700/40',
        props.class
      )
    "
  >
    <SwitchThumb
      :class="
        cn(
          'pointer-events-none h-5 w-5 flex items-center justify-center rounded-full text-zinc-200 bg-white shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0 dark:bg-[#222224]'
        )
      "
    >
      <slot />
    </SwitchThumb>
  </SwitchRoot>
</template>
