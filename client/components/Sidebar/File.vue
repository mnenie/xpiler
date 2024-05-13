<script setup>

const props = defineProps({
  name: String
})

</script>

<template>

<div>
    {{ props.name }}
</div>

</template>