<script setup lang="ts">
import { ref, watch } from 'vue';
import type { User } from '@/interfaces';
import api from '@/api';

const emit = defineEmits(['hideEditForm', 'getUser']);
const props = defineProps<{ user: User | null }>();

// Local state for form inputs
const username = ref(props.user?.userInfo.username || '');
const name = ref(props.user?.userInfo.name || '');
const attributes = ref([...props.user?.userInfo.attributes || ['', '', '']]);

// Watch for changes in props.user and update local state
watch(() => props.user, (newUser) => {
    if (newUser) {
        username.value = newUser.userInfo.username;
        name.value = newUser.userInfo.name;
        attributes.value = [...newUser.userInfo.attributes];
    }
}, { deep: true });

const updateDetails = async () => {
    try{

        await api.put('/api/users/profile/user', { username : username.value, name : name.value, attributes : attributes.value}, {withCredentials: true})
        
        emit('hideEditForm')
        emit('getUser')
    }
    catch(error){
        console.error(error)
    }
};
</script>

<template>
    <form class="form" @submit.prevent="updateDetails">
        <h1 class="headtext">Edit Your Profile</h1>
        <img src="../assets/image copy 15.png" height="10rem" class="exit" @click="emit('hideEditForm')" />
        <div class="fields">
            <div class="field">
                <label for="username" class="label">Username</label>
                <input type="text" class="input" v-model="username">
            </div>
            <div class="field">
                <label for="name" class="label">Name</label>
                <input type="text" class="input" v-model="name">
            </div>
            <div class="field">
                <label for="attributes" class="label">Attributes</label>
                <h5 class="subtext">Tell us about your personality in three words</h5>
                <div class="attrbs">
                    <input type="text" class="input attr" v-model="attributes[0]">
                    <input type="text" class="input attr" v-model="attributes[1]">
                    <input type="text" class="input attr" v-model="attributes[2]">
                </div>
            </div>
        </div>
        <button type="submit" class="buttondiv">Update</button>
    </form>
</template>

<style scoped>

.exit{
    position: absolute;
    left:17.4rem;
    top: 0.8rem
}

.buttondiv{
    position: relative;
width: 9.2rem;
height: 2.8rem;

border: 0;
outline: 0;

background: #007BFC;
border-radius: 25rem;


font-family: 'Roboto';
font-style: normal;
font-weight: 500;
font-size: 1rem;
line-height: 1.2rem;

letter-spacing: 0.04rem;

color: #FFFFFF;
}
.subtext{


font-family: 'Kumbh Sans';
font-style: normal;
font-weight: 450;
font-size: 0.7rem;
width:15rem;
line-height: 0.8rem;
/* identical to box height */

color: #949494;


}

.field{
    display: flex;
    flex-direction: column;
    gap:0.5rem
}

.label{


font-family: 'Kumbh Sans';
font-style: normal;
font-weight: 400;
font-size: 1rem;
line-height: 1.2rem;
/* identical to box height */

color: #000000;



}

.input{
    outline:none;
    border:#FF4D12 solid 0.125rem;
    background-color: #d9d9d9;
    padding:0.3rem;
}

.fields{
    display:flex;
    flex-direction: column;
    gap:1.5rem
}

.attr{
    width:5vw
}

.attrbs{
    display:flex;
    gap : 0.8rem;
    justify-content: center;
    
}


.form{
    position: absolute;
    display:flex;

    width:19rem;
    align-items: center;
    flex-direction: column;
    padding:1.5rem 2.6rem 2rem 2.6rem;
    gap:2rem;
    border:#FF4D12 solid 0.2rem;
    border-radius:1rem;
    left: 41vw;
   
    top: 7vw;
    background-color: white;

    z-index:999;
}

.headtext{

/* M3/label/large */
font-family: 'Roboto';
font-style: normal;
font-weight: 500;
font-size: 1.2rem;
line-height: 1.4rem;
/* or 143% */
display: flex;
align-items: center;
text-align: center;
letter-spacing: 0.1px;
text-decoration-line: underline;

color: #000000;


}
</style>