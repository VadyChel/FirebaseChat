<template>
  <div>
    <div :class="{'message-content': true, 'message-content-sent': isMessageSent}">
      <img :src="value.avatarUrl" alt="" class="message-avatar">
      <span :class="{'message-text': true, 'message-text-received': !isMessageSent, 'message-text-sent': isMessageSent}">{{ value.text }}</span>
    </div>
  </div>
</template>

<script>
import { getAuth } from 'firebase/auth'

export default {
  name: "Login",
  props: ["value"],
  computed: {
    isMessageSent () {
      return this.value.authorId === getAuth().currentUser.uid
    }
  }
};
</script>

<style scoped>
.message-content-sent {
  flex-direction: row-reverse;
}

.message-content {
  display: flex;
  margin-bottom: 4%;
  align-items: center;
}

.message-avatar {
  width: 48px;
  height: auto;
  border-radius: 50%;
}

.message-text {
  height: 48px;
  padding: 0 20px;
  border-radius: 25px;
  display: flex;
  align-items: center;
}

.message-text-received {
  margin-left: 2%;
  background-color: #fff;
  color: #1e1e1e;
}

.message-text-sent {
  margin-right: 2%;
  background-color: #367cb9;
  color: #fff;
}
</style>
