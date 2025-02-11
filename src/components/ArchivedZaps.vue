<script setup lang="ts">
import ZapLayoutDefault from './ZapLayoutDefault.vue'
import ChatComponent from './ChatComponent.vue'
import {ref} from 'vue'

const chat = ref(1)
</script>

<template>
 <div style="width:25vw">
    <div class="header">
      <h1 class="head" style="margin: 0; padding:0">Zapped</h1>
      <img src="../assets/image copy 8.png"  style="padding-top:0.65rem; height : 1.98rem" />
    </div>
    <hr style="margin:0.5rem 0.4rem; background-color: #ff4d12; border:none; height:0.09rem" />
    <div class="searchbar">
      <img src="../assets/image copy 5.png" style=" height:0.8rem; margin:0.2rem 0.4rem" />
    </div>
    <div></div>
  </div>
  <component class="chatbox" :is = "{
    0:ZapLayoutDefault,
    1:ChatComponent
   }[chat]" />
</template>

<style scoped>
.searchbar{
  margin:1rem 2rem;
  width:18rem;
  height:1.25rem;

background: #D9D9D9;
border-radius:  6rem;

}
.header{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0.5rem 1rem
}

.head{
font-family: 'Inter';
font-style: normal;
font-weight: 750;
font-size: 2.1rem;
line-height: 2.5rem;

color: #FF4D12;


}
</style>
