<template>
  <div>
    <router-link :to="`/chat/${value.id}`">{{ value.name }}</router-link>
  </div>
</template>

<script>
export default {
  name: "Chat",
  props: ["value"],
};
</script>

<style scoped></style>
