<template>
  <button @click="sub">-</button>
  <span mx-2>{{ count }}</span>
  <button @click="add">+</button>
</template>

<script setup lang="ts">
const count = ref(0)
function sub() {
  count.value--
}
function add() {
  count.value++
}
</script>
