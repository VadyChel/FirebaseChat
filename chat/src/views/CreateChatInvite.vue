<template>
<div style="margin: 50% 0; display: flex; justify-content: center">
  <span class="invite-code">{{inviteCode}}</span>
  <button v-if="!inviteCreated" type="button" @click="createInvite" class="invite-button">Create</button>
  <button v-if="inviteCreated" type="button" @click="copyInviteUrlToClipboard" class="invite-button">{{ copyButtonText }}</button>
</div>
</template>

<script>
import { getAuth } from 'firebase/auth'
import { addDoc, collection, getFirestore } from 'firebase/firestore'

export default {
  name: "ChatInvite",
  data: () => ({
    inviteUrl: '',
    inviteCode: 'Press Create Button',
    inviteCreated: false,
    copyButtonText: 'Copy'
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

      this.inviteCreated = true
      this.inviteCode = code
      this.inviteUrl = `${location.origin}/invite/${code}`
    },
    copyInviteUrlToClipboard () {
      if (!navigator.clipboard) {
        console.log('no clipboard')
        return
      }

      navigator.clipboard.writeText(this.inviteUrl)
        .then(() => {
          this.copyButtonText = 'Copied'
        })
        .catch(() => console.log('error') )
    }
  }
}
</script>

<style scoped>
.invite-code {
  width: clamp(200px, 40vw, 400px);
  display: flex;
  padding: 10px;
  background-color: var(--dark-blue-color);
  font-size: 1em;
  border-bottom-left-radius: 10px;
  border-top-left-radius: 10px;
  color: var(--light-color);
}

.invite-button {
  padding: 10px;
  font-size: 1em;
  border-bottom-right-radius: 10px;
  border-top-right-radius: 10px;
  border: none;
  color: var(--dark-blue-color);
  background-color: var(--light-color);
}
</style>