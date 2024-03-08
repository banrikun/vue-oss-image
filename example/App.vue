<script setup lang="ts">

</script>

<template>
  <div>
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
      <img v-img="{ loading: 'https://oss-console-img-demo-cn-hangzhou-3az.oss-cn-hangzhou.aliyuncs.com/example.gif', width: 100, height: 30, resizeMode: 'lfit', ratio: 3 }">
      <img v-img="{ loading: 'https://oss-console-img-demo-cn-hangzhou-3az.oss-cn-hangzhou.aliyuncs.com/example.gif', path: 'example111.jpg', width: 100, resizeMode: 'lfit', ratio: 4, quality: 10 }">
      <img v-img="{ loading: 'https://oss-console-img-demo-cn-hangzhou-3az.oss-cn-hangzhou.aliyuncs.com/example.gif', error: 'error.jpg', path: 'example111.jpg', width: 100, resizeMode: 'lfit', ratio: 4, quality: 10 }">
      <img v-img="{ loading: 'https://oss-console-img-demo-cn-hangzhou-3az.oss-cn-hangzhou.aliyuncs.com/example.gif', path: 'example.jpg', width: 100, resizeMode: 'lfit', ratio: 4, quality: 10 }">
      <img v-img="{ loading: 'https://oss-console-img-demo-cn-hangzhou-3az.oss-cn-hangzhou.aliyuncs.com/example.gif', path: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=', width: 100, resizeMode: 'lfit', ratio: 4, quality: 10 }">
    </div>

    <div v-lazy-container="{ selector: 'img' }" class="list">
      <img v-img="{ path: 'example.jpg', width: 100, attr: 'data-src' }">
      <img v-img="{ path: 'example.jpg', width: 110, attr: 'data-src' }">
      <img v-img="{ path: 'example.jpg', width: 120, attr: 'data-src' }">
      <img v-img="{ path: 'example.jpg', width: 130, attr: 'data-src' }">
      <img v-img="{ path: 'example.jpg', width: 140, attr: 'data-src' }">
      <img v-img="{ path: 'example.jpg', width: 150, attr: 'data-src' }">
      <img v-img="{ path: 'example.jpg', width: 160, attr: 'data-src' }">
      <img v-img="{ path: 'example.jpg', width: 170, attr: 'data-src' }">
      <img v-img="{ path: 'example.jpg', width: 180, attr: 'data-src' }">
      <img v-img="{ path: 'example.jpg', width: 190, attr: 'data-src' }">
      <img v-img="{ path: 'example.jpg', width: 200, attr: 'data-src' }">
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
