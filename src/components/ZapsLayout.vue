<script setup lang="ts">
import { ref, provide, onMounted } from 'vue'
import ZapsChats from './ZapsChats.vue';
import ZapProfile from './ZapProfile.vue';
import type { AUser } from '@/interfaces';
import { key } from '@/injectkeys';
import SettingsPage from './SettingsPage.vue';
import api from '@/api';


const display = ref(0)

const url = ref({imageUrl : ''})

const getimage = async() => {
  try{
    const response = await api.get('api/content/img', {withCredentials : true})
    url.value = response.data
  }
  catch(error){
    console.error(error)
  }
}

onMounted(getimage)


const showZaps  = () : void => {
  display.value = 0;
}

const displaySettings = () :void => {
  display.value = 1;
}


const showProfile = () : void => {
  display.value = 2;
  profileUser.value = null
}

const profileUser = ref<AUser|null>(null)

const showotherProfile = (user:AUser) : void => {
  display.value = 2;
  profileUser.value = user
}

provide(key, showotherProfile)


</script>

<template>
  <div class="page">
    <div class="navbar">
      <div class="chatbuttons">
        <button class="chatbutton" @click="showZaps"><img src="../assets/image copy 2.png" height="24rem"  /></button>
      
      </div>
      <div class="usersbuttons">
        <button class="chatbutton"><img src="../assets/image copy 6.png" height = "24rem" @click ="displaySettings" /></button>
        <button class="chatbutton"><img :src = "url.imageUrl" class = "profilepic" @click = "showProfile" /></button>
      </div>
    </div>


    <component :is = "{
      0: ZapsChats,
      1:SettingsPage,
      2:ZapProfile
    }[display]" 
    @showProfile = "showProfile"
    :profileUserID="profileUser ? profileUser.id : 0"
    @getimage="getimage"
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