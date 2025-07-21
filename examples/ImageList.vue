<script setup lang="ts">
import type { TOssImageOptions } from '../lib'
const props = defineProps<{
  listData: TOssImageOptions[]
}>()
</script>

<template>
  <ul class="list">
    <li class="list-item" v-for="(item, index) in listData" :key="index">
      <h3>{{ JSON.stringify(item) }}</h3>
      <img v-img="item" />
    </li>
  </ul>
</template>
