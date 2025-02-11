<script setup lang="ts">
import { ref, watch } from 'vue'
import axios from 'axios'

const searchquery = ref ('')
const users = ref<{id : number, username : string, imageUrl : string, name : string}[]>([])


const emit = defineEmits(['toggle', 'togglei', 'displayConvo'])

const  expanded = defineModel()

const fetchUsers = async() => {
  if(!searchquery.value.trim()){
    users.value = []
    return;
  }
  try{
    const link = `http://localhost:3000/api/content/search?q=${searchquery.value}`
    const response = await axios.get(link, {
      withCredentials :true
    })
    users.value =response.data
  }
  catch(error){
    console.error(error)
    users.value = [];
  }
}

watch(searchquery, fetchUsers)

</script>

<template>
    <div>
      <div
        class="searchbar"
        :class="{ expanded: expanded }"
        @click="emit('toggle')"
      >
        <img src="../assets/image copy 5.png" class="search-icon" @click.stop="emit('togglei')" />
        <input
          v-show="expanded"
          type="text"
          placeholder="Search..."
          class="search-input"
          v-model="searchquery"
          autofocus
        />
      </div>
      <div v-if="users.length > 0">
  <ul v-if="expanded">
    <div v-for="user in users" :key="user.id">
      <div class="searchprofile" @click = "$emit('displayConvo', user)">
        <img :src = "user.imageUrl" class="searchimg" />
        <div class="profileinfo">
          <hr class="profileline" />
          <div class="maininfo">
            <div class="profileusername">{{ user.username }}</div>
            <div class="profilename">{{ user.name }}</div>
          </div>
        </div>
      </div>
    </div>
    <hr class="bottomline" />
  </ul>
  </div>
    </div>

</template>

<style scoped>

.profilename{


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

.bottomline{
  margin:0rem 0.4rem; background-color: #ff4d12; border:none; height:1px;
 

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

.searchprofile{
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


.searchbar {
  margin: 1rem 2rem;
  width: 18rem;
  height: 1.25rem;
  background: #D9D9D9;
  border-radius: 6rem;
  display: flex;
  align-items: center;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  padding: 0.2rem 0.5rem;
}

/* Expanding the search bar */
.searchbar.expanded {
  width: 21rem;
  height: 3rem;
  margin: 0rem 0.25rem 0 0.25rem;
  border-radius: 3rem;
  margin-bottom:1rem
}

/* Search Icon */
.search-icon {
  height: 1rem;
  margin-right: 0.5rem;
}

/* Search Input */
.search-input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 1rem;
  background: transparent;

}

.searchbar{
  margin:1rem 2rem;
  width:18rem;
  height:1.25rem;

background: #D9D9D9;
border-radius:  6rem;

}
</style>