<script setup lang="ts">



const emit = defineEmits(['toggle', 'togglei'])

const  expanded = defineModel()


</script>

<template>
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
        ref = "searchbar"
        autofocus
      />
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