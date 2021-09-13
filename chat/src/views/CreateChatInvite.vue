<template>
<div>
  <span>{{inviteUrl}}</span>
  <button type="button" @click="createInvite">Create</button>
</div>
</template>

<script>
import { getAuth } from 'firebase/auth'
import { addDoc, collection, getFirestore } from 'firebase/firestore'

export default {
  name: "ChatInvite",
  data: () => ({
    inviteUrl: ''
  }),
  methods: {
    generateInviteCode (length) {
      let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

      let generatedCode = '';
      for (let i = 0; i < length; i++) {
        generatedCode += chars.charAt(Math.floor(Math.random() * chars.length));
      }

      return generatedCode;
    },
    async createInvite () {
      const code = this.generateInviteCode(16)
      await addDoc(collection(getFirestore(), 'invites'), {
        authorId: getAuth().currentUser.uid,
        forChat: this.$route.params.chatId,
        code
      })

      this.inviteUrl = `${location.origin}/invite/${code}`
    }
  }
}
</script>

<style scoped>

</style>