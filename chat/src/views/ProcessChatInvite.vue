<template>
<div>

</div>
</template>

<script>
import { getAuth } from 'firebase/auth'
import { query, collection, where, getFirestore, getDocs, doc, updateDoc, getDoc, arrayUnion } from 'firebase/firestore';

export default {
  name: "ProcessChatInvite",
  async mounted () {
    console.log('page')
    const auth = getAuth()
    const db = getFirestore()
    const foundInvitesSnapshot = await getDocs(
      query(collection(db, 'invites'), where('code', '==', this.$route.params.code))
    )
    const foundInvite = foundInvitesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))[0]
    if (!foundInvite) {
      return this.$router.push({ path: '/' })
    }

    const chatRef = doc(db, "chats", foundInvite.forChat)
    const chat = (await getDoc(chatRef)).data()
    if (!chat) {
      return this.$router.push({ path: '/' })
    }

    if (chat.members.includes(auth.currentUser.uid)) {
      return this.$router.push({ path: `/chat/${foundInvite.forChat}` })
    }

    updateDoc(chatRef, { members: arrayUnion(auth.currentUser.uid) })
    this.$router.push({ path: `/chat/${foundInvite.forChat}` })
  }
}
</script>

<style scoped>

</style>