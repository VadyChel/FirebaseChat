<template>
  <div>
    <div :class="{'message-content': true, 'message-content-sent': isMessageSent}">
      <img :src="value.avatarUrl" alt="" class="message-avatar">
      <div
        :class="{
          'message-text-block': true,
          'message-text-block-received': !isMessageSent,
          'message-text-block-sent': isMessageSent
        }"
        @click="openCloseDropdown"
        ref="messageBlock"
      >
        <div v-if="!editingMode">
          <span class="message-text">{{ value.text }}</span>
          <span class="message-time">{{ getCreatedAt(value.createdAt.toDate()) }}</span>

          <div class="message-dropdown" v-if="settingsIsOpened">
            <span class="message-dropdown-setting" v-for="setting of messageSettings" @click="setting.func">{{ setting.title }}</span>
          </div>
        </div>

        <div v-if="editingMode">
          <input type="text" v-model='newText'>
          <button class="edit-message-button" type="button" @click="editingMode = false">Cancel</button>
          <button class="edit-message-button" type="button" @click="editMessage">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAuth } from 'firebase/auth'
import { deleteDoc, doc, getFirestore, updateDoc } from 'firebase/firestore'

export default {
  name: "Login",
  props: ["value"],
  data () {
    return {
      editingMode: false,
      newText: this.value.text,
      settingsIsOpened: false,
      messageSettings: [
        { title: 'Edit', func: () => this.editingMode = true },
        { title: 'Delete', func: this.deleteMessage }
      ]
    }
  },
  computed: {
    isMessageSent () {
      return this.value.authorId === this.auth.currentUser.uid
    },
    auth () {
      return getAuth()
    }
  },
  methods: {
    openCloseDropdown () {
      if (this.value.authorId !== this.auth.currentUser.uid) {
        return
      }

      this.settingsIsOpened = !this.settingsIsOpened
    },
    async editMessage () {
      const db = getFirestore()
      await updateDoc(doc(db, 'messages', this.value.id), { text: this.newText })
      this.editingMode = false
      this.newText = this.value.text
    },
    async deleteMessage () {
      const db = getFirestore()
      await deleteDoc(doc(db, 'messages', this.value.id))
    },
    getCreatedAt (createdAt) {
      const date = new Date(createdAt)
      const dateHours = date.getHours()
      const dateMinutes = date.getMinutes()
      return (dateHours < 10 ? '0'+dateHours : dateHours) + ':' + (dateMinutes < 10 ? '0'+dateMinutes : dateMinutes)
    }
  }
};
</script>

<style scoped>
.edit-message-button {
  border: none;
  margin-left: 0;
}

.message-dropdown {
  background-color: var(--dark-blue-color);
  position: absolute;
  top: 50px;
  z-index: 100;
  display: flex;
  width: 100px;
  flex-direction: column;
}

.message-dropdown-setting {
  display: flex;
  justify-content: start;
  padding: 10px;
  cursor: pointer;
}

.message-dropdown-setting:hover{
  background-color: #2a3053;
}

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

.message-text-block {
  min-height: 48px;
  padding: 0 20px;
  border-radius: 25px;
  display: flex;
  align-items: center;
  position: relative;
  max-width: 200px;
  word-break: break-word;
}

.message-text-block-received {
  margin-left: 2%;
  background-color: #fff;
  color: #1e1e1e;
}

.message-text-block-sent {
  margin-right: 2%;
  background-color: #367cb9;
  color: #fff;
}

.message-text {
  margin-right: 16px;
}

.message-time {
  font-weight: bold;
  font-size: 0.75em;
  color: #c9c9c9;
}
</style>
