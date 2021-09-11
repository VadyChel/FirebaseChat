<template>
  <div>
    <img :src="value.avatarUrl" alt="">
    <span style="color: white">{{ value.text }}</span>
  </div>
</template>

<script>
export default {
  name: "Login",
  props: ["value"],
};
</script>

<style scoped></style>
