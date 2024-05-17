<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import {
  ContextMenuItem,
  type ContextMenuItemEmits,
  type ContextMenuItemProps,
  useForwardPropsEmits,
} from 'radix-vue'
import { cn } from '@/lib/utils'

const props = defineProps<ContextMenuItemProps & { class?: HTMLAttributes['class'], inset?: boolean }>()
const emits = defineEmits<ContextMenuItemEmits>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <ContextMenuItem
    v-bind="forwarded"
    :class="cn(
      'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-gray-100 focus:text-gray-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-gray-800 dark:focus:text-gray-50',
      inset && 'pl-8',
      props.class,
    )"
  >
    <slot />
  </ContextMenuItem>
</template>
