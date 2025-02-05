<script setup lang="ts">
import { ref, watch } from 'vue'
import axios from 'axios'

const searchquery = ref ('')
const users = ref<{id : number, username : string}[]>([])


const emit = defineEmits(['toggle', 'togglei'])

const  expanded = defineModel()

const fetchUsers = async() => {
  if(!searchquery.value.trim()){
    users.value = []
    return;
  }
  try{
    const link = 'http://localhost:3000/api/content/search?q=s'
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
  <ul>
    <li v-for="user in users" :key="user.id">
      <div>{{ user.username }}</div>
    </li>
  </ul>
  </div>
    </div>

</template>

<style scoped>


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
  padding: 0.2rem 1rem;
}

/* Expanding the search bar */
.searchbar.expanded {
  width: 100%;
  height: 3rem;
  margin: 0;
  border-radius: 3rem;
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