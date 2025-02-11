<script setup lang ="ts">
import {ref, watch} from 'vue'

const message = ref('')
const user = defineProps(['users'])

watch(user, ()=>{
    message.value = '';
})

</script>

<template>
    <div class="content">
        <!---header-->
        <div class="profilebar">
            <div class="profile">
                <img :src="user.users?.imageUrl" class="profilepic" />
                <div class="userinfo">
                    <div class="username">{{ user.users?.username }}</div>
                    <div class="name">{{ user.users?.name }}</div>
                </div>
            </div>
            <img class="profileinteract" src="../assets/image copy 18.png" />
        </div >
        <!---chatarea-->
        <div class="chatarea">
        </div>
        <!--chatinput-->
        <div class="chatinputbox">
            <button class="media">+</button>
            <div class="inputbar">
                <img src="../assets/image copy 20.png" alt="" height="16rem">
                <input type="text" class="input" v-model = "message" />
                <img src="../assets/image copy 21.png" alt="" height="16rem">
            </div>
        </div>
    </div>
</template>

<style scoped>
.media{
    background:none;
    border:none;

font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 2.3rem;
line-height: 2.5rem;

color: #0C8CE9;


}

.input{
    outline: 0;
    border: 0;
    width:40rem
}

.inputbar{
    display: flex;
    justify-content: space-between;
    background-color: white;
    padding: 0.4rem 1rem 0.4rem 1rem;
    margin-top:0.2rem;
    width:45rem;
    border-radius: 25rem;
}

.chatinputbox{
  
    display: flex;
    align-items: center;
    background-color: #d9d9d9;
    height:9vh;
    padding: 0rem 4rem 0 4.5rem;
    gap : 2.2rem
}


.chatarea{
    background-image: url("../assets/image copy 19.png");
    background-size:cover;
    background-position: center;
    background-repeat: no-repeat;
    height:84vh
}

.name{
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 0.8rem;
line-height: 1rem;

color: #FFFFFF;
}

.username{

font-family: 'Inter';
font-style: normal;
font-weight: 800;
font-size: 1.3rem;
line-height: 1.5rem;

color: #FFFFFF;


}

.userinfo{
    display: flex;
    flex-direction: column;
    gap : 0.125rem
}

.profileinteract{
    height:1.35rem;
    margin:0.6rem
}

.profilebar{
    width : 100%;
background: #FF4D12;
display: flex;
justify-content: space-between;
padding:0.6rem 1rem
}



.profile{
    display: flex;
    gap:1.25rem;
    height:7vh
}

.profilepic{
    width:2.85rem;
  height:2.85rem;
  border-radius: 25rem;
}

.content{
    display: flex;
    flex-direction:column;
    width:100%;
    height:100vh;
}
</style>