<script setup lang="ts">
import axios from 'axios'
import { ref } from 'vue'
import SearchBar from './SearchBar.vue'

const getZaps = async () => {
  try {
    const zaps = await axios.get('http://localhost:3000/api/content/zaps');
  }
  catch(error){
    console.error(error)
  }
  
}

window.onclick = function (event) { 
  const bar = document.querySelector('.searchbar')

  const input = document.querySelector('.search-input')

  if(event.target !== bar && event.target !== input){
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
     <SearchBar @toggle="toggleSearch" @togglei = "toggleicon" v-model="expanded" />
  </div>
</template>
<style scoped>
.container {
  width: 25vw;
  transition: all 0.3s ease-in-out;
}



.logo {
  padding-top: 0.4rem;
  height: 1.98rem;
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
