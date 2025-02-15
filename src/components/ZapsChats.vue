<script setup lang="ts">
import axios from 'axios'
import { ref, onMounted } from 'vue'
import SearchBar from './SearchBar.vue'
import ZapLayoutDefault from './ZapLayoutDefault.vue'
import ChatComponent from './ChatComponent.vue'
import { type AUser, type Chat } from '@/interfaces'

defineEmits(['displayConvo'])

const chat = ref(0)

const zaps = ref<Chat[]>([])

const getZaps = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/content/zaps', {withCredentials : true});
    zaps.value = response.data;
 
    console.log(zaps.value)

  }
  catch(error){
    console.error(error)
  }
  
}




window.onclick = function (event) { 
  event.stopPropagation()
  const bar = document.querySelector('.searchbar')

  const input = document.querySelector('.search-input')

  const profile = document.querySelector('.searchprofile')

  if(event.target !== bar && event.target !== input && event.target !== profile){
    expanded.value = false;
  }
}

const expanded = ref(false);

const toggleSearch = () => {
  expanded.value = true;
};

const toggleicon = () => {
  expanded.value = !expanded.value;
};

const users = ref<AUser|null>(null)

const displayConvo = (user : AUser) => {
users.value = user
chat.value = 1
}

onMounted(getZaps)


</script>

<template>
  <div class="container">
    <!-- Header Section (Hidden when Search Expands) -->
    <div v-if="!expanded" class="header">
      <h1 class="head">Zaps</h1>
      <img src="../assets/image copy 8.png" class="logo" />
    </div>

    <hr class="divider" />

    <!-- Search Bar -->
     <SearchBar @toggle="toggleSearch" @togglei = "toggleicon" v-model="expanded" @display-convo="displayConvo" />
     <div>
      <div v-for="zap in zaps" :key="zap.id" class="zaps">
      <div class="userprofile" @click = "displayConvo(zap.otherUser)">
        <img :src = "zap.otherUser.imageUrl" class="searchimg" />
        <div class="profileinfo">
          <hr class="profileline" />
          <div class="maininfo">
            <div class="profileusername">{{ zap.otherUser.username }}</div>
            <div class="profilemsg">{{ zap.messages[0]?.content }}</div>
          </div>
        </div>
      </div>
    </div>
     </div>
  </div>
  <component class="chatbox" :is = "{
    0:ZapLayoutDefault,
    1:ChatComponent
   }[chat]"
   :users = users @getZaps = "getZaps" />
</template>
<style scoped>

.zaps{
  width:80vh;
  overflow: scroll;
}

.profilemsg{


font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 0.85rem;
line-height: 1rem;

color: rgba(0, 0, 0, 0.5);

}

.profileusername{

font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 1rem;
line-height: 1.2rem;
/* identical to box height */

color: #000000;


}

.profileline{
  background-color: #ff4d12; border:none; height:0.05rem;
}



.maininfo{
  padding: 0.5rem 0 0 0;
  display:flex;
  flex-direction: column;
  gap:0.15rem;
 
}

.profileinfo{
  margin-left:1.5rem;
  
  width:22rem                    
}

.userprofile{
  display: flex;
  padding: 0rem 0rem 0rem 1rem;
  margin-bottom: 0.5rem;
}

.searchimg{
  width:2.5rem;
  height:2.5rem;
  border-radius: 25rem;
  margin-top: 0.5rem;
}


.container {
  width: 25vw;
  transition: all 0.3s ease-in-out;
}



.logo {
  padding-top:0.65rem; height : 1.98rem
}

.divider {
  margin: 0.5rem 0.4rem;
  background-color: #ff4d12;
  border: none;
  height: 0.09rem;
}



.header{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem
}

.head{
font-family: 'Inter';
font-style: normal;
font-weight: 750;
font-size: 2.1rem;
line-height: 2.5rem;

color: #FF4D12;
margin:0;
padding:0s


}
</style>
