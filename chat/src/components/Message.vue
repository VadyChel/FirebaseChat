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

        <div v-if="editingMode" class="editing-mode">
          <input type="text" class="editing-input" v-model='newText'/>

          <div class="editing-buttons">
            <button class="button cancel-editing-button" type="button" @click="editingMode = false">Cancel</button>
            <button class="button save-editing-button" type="button" @click="editMessage">Save</button>
          </div>
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
      return new Date(createdAt).toLocaleTimeString('en-GB', {
        timeZone: 'UTC',
        minute: 'numeric',
        hour: 'numeric'
      })
    }
  }
};
</script>

<style scoped>
.message-dropdown {
  background-color: var(--dark-blue-color);
  position: absolute;
  top: 50px;
  z-index: 100;
  display: flex;
  width: 100px;
  flex-direction: column;
  border-radius: var(--border-radius);
}

.message-dropdown-setting {
  display: flex;
  justify-content: flex-start;
  padding: 10px;
  cursor: pointer;
  border-radius: var(--border-radius);
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
  max-width: 250px;
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

.cancel-editing-button {
  margin-right: 6px;
  font-size: 1em;
}

.save-editing-button {
  font-size: 1em;
}

.editing-mode {
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 10px 0;
}

.editing-buttons {
  display: flex;
  margin-top: 10px;
}

.editing-input {
  margin-right: 10px;
  border-radius: var(--border-radius);
  border: none;
  background-color: var(--blue-color);
  padding: 5px 10px;
  color: #fff;
  transition: 0.2s;
}

.editing-input:focus {
  background-color: #23274a;
}

.editing-input:focus-visible{
  outline: none;
}
</style>
