<script setup lang="ts">

</script>

<template>
  <div>
    <div>hello world</div>
    <div class="list">
      <img v-img="'example.jpg'">
      <img v-img="{ path: 'example.jpg' }">
      <img v-img="{ path: 'example.jpg', width: 100 }">
      <img v-img="{ path: 'example.jpg', width: 100, height: 30 }">
      <img v-img="{ path: 'example.jpg', long: 100 }">
      <img v-img="{ path: 'example.jpg', short: 30 }">
      <img v-img="{ path: 'example.jpg', width: 100, quality: 10 }">
      <img v-img="{ path: 'example.jpg', width: 100, resizeMode: 'lfit' }">
      <img v-img="{ path: 'example.jpg', width: 100, ratio: 3 }">
      <img v-img="{ path: 'example.jpg', width: 100, height: 30, resizeMode: 'lfit' }">
      <img v-img="{ path: 'example.jpg', width: 100, height: 30, resizeMode: 'lfit', ratio: 3 }">
      <img v-img="{ path: 'example.jpg', width: 100, resizeMode: 'lfit', ratio: 4, quality: 10 }">
    </div>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
}
.list {
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    display: block;
    margin: 10px 0;
  }
}
</style>
