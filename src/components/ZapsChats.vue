<script setup lang="ts">
import axios from 'axios'
import { ref } from 'vue'
import SearchBar from './SearchBar.vue'
import ZapLayoutDefault from './ZapLayoutDefault.vue'
import ChatComponent from './ChatComponent.vue'
import { type User } from '@/interfaces'

const chat = ref(0)

const getZaps = async () => {
  try {
    const zaps = await axios.get('http://localhost:3000/api/content/zaps');
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

const users = ref<User|null>(null)

const displayConvo = (user : User) => {
users.value = user
chat.value = 1
}


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
  </div>
  <component class="chatbox" :is = "{
    0:ZapLayoutDefault,
    1:ChatComponent
   }[chat]"
   :users = users  />
</template>
<style scoped>
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
