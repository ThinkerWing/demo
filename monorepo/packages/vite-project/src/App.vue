<script setup lang="ts">
import {getUser} from "@think/api";
import Button from "@think/components";

getUser().then((res: any) => {
  console.log(res);
});
</script>

<template>
  <Button></Button>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
