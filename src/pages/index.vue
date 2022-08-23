<template>
  <Count />
</template>

<script setup lang="ts">
import Count from '@/components/Count.vue'
import { useInit } from '@/hooks/useInit'

useInit()
</script>
<style scoped></style>
