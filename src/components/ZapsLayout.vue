<script setup lang="ts">
import { ref, provide } from 'vue'
import ZapsChats from './ZapsChats.vue';
import ZappersChats from './ZappersChats.vue';
import ArchivedZaps from './ArchivedZaps.vue';
import ZapProfile from './ZapProfile.vue';
import axios from 'axios'
import type { AUser } from '@/interfaces';
import { key } from '@/injectkeys';


const display = ref(0)

const url = ref({imageUrl : ''})

const getimage = async() => {
  try{
    const response = await axios.get('http://localhost:3000/api/content/img', {withCredentials : true})
    url.value = response.data
    console.log(url.value)
  }
  catch(error){
    console.error(error)
  }
}

getimage()

const showZaps  = () : void => {
  display.value = 0;
}

const showZapplets  = () : void => {
  display.value = 1;
}

const showZapped  = () : void => {
  display.value = 2;
}

const showProfile = () : void => {
  display.value = 3;
  console.log("click")
  profileUser.value = null
}

const profileUser = ref<AUser|null>(null)

const showotherProfile = (user:AUser) : void => {
  display.value = 3;
  profileUser.value = user
  console.log(user)
}

provide(key, showotherProfile)


</script>

<template>
  <div class="page">
    <div class="navbar">
      <div class="chatbuttons">
        <button class="chatbutton" @click="showZaps"><img src="../assets/image copy 2.png" height="24rem"  /></button>
        <button class="chatbutton" @click="showZapplets"><img src="../assets/image copy 3.png" height="24rem"  /></button>
        <button class="chatbutton" @click="showZapped"><img src="../assets/image copy 4.png" height="24rem"  /></button>
      </div>
      <div class="usersbuttons">
        <button class="chatbutton"><img src="../assets/image copy 6.png" height = "24rem" /></button>
        <button class="chatbutton"><img :src = "url.imageUrl" class = "profilepic" @click = "showProfile" /></button>
      </div>
    </div>


    <component :is = "{
      0: ZapsChats,
      1:ZappersChats,
      2:ArchivedZaps, 
      3:ZapProfile
    }[display]" 
    :profileUserID="profileUser ? profileUser.id : 0"
   />
    
   
  </div>
</template>

<style scoped>
.page{
  display: flex;
}
.navbar{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height:100vh;
  width:5.5em;
  background-color :#FF6633;
  padding-top:1.75rem;
  padding-bottom: 1.75rem;
 
}

.chatbuttons, .usersbuttons{
  display: flex;
  flex-direction: column;
  gap:1rem
}

.profilepic{
  width:2.5rem;
  height:2.5rem;
  border-radius: 25rem;
}

.chatbutton{
  background-color:transparent;
  outline: none;
  border:none
}

</style>