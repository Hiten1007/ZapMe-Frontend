<script setup lang ="ts">
import { ref, onMounted } from 'vue'
import type { User } from '@/interfaces';
import ZapLayoutDefault from './ZapLayoutDefault.vue'
import api from '@/api';


defineEmits(['showProfile', 'getimage'])
defineProps<{ profileUserID: number }>();

const user = ref<User | null>(null);

const getUser = async () => {
    try {
        const response = await api.get<User>('api/users/profile', { withCredentials: true });
        user.value = response.data;
    } catch (error) {
        console.error("Error fetching user:", error);
    }
};

const logOut = async () => {
    try{
        await api.post("api/users/logOut", {withCredentials: true });
        window.location.href = "/";
    }
    catch(error){
        console.error(error)
    }
}

onMounted(getUser)

</script>
<template>
    <div class="settings">
        <h1 class="header">Settings</h1>
        <hr class="line" />
        <div>
            <div @click="$emit('showProfile')">
                <div class="profile">
                    <img :src = "user?.userInfo.imageUrl" class="profilepic" />
                    <div class="profileinfo">
                        <div class="profilename">{{user?.userInfo.name}}</div>
                        <div class="profileabout">{{user?.userInfo.about}}</div>
                        <hr class="bottomline" />
                    </div>
                </div>   
                
            </div>
            <div class="logoutdiv" @click="logOut">
                <img src="../assets/image copy 24.png" class="logoutimg" />
                <h3 class="logouttext">Log Out</h3>
            </div>
        </div>
    </div>

    <ZapLayoutDefault />
</template>

<style scoped>

.logouttext{


font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 1.2rem;
line-height: 1.4rem;
-webkit-text-stroke: .05rem #FF0000;
color: #FF0000;


}

.logoutdiv{
    display:flex;
    gap : 1.5rem;
    padding : 0rem 1rem;
}

.logoutimg{
    height:2.5rem;
}

.profileabout{


font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 0.75rem;
line-height: 0.9rem;
height:0.9rem;
overflow-y:hidden;
/* identical to box height */

color: rgba(0, 0, 0, 0.5);


}

.profileinfo{
    display:flex;
    flex-direction:column;
    gap:0.4rem;
    margin-top:0.35rem
}

.profilename{


font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 0.93rem;
line-height: 1.1rem;

color: #000000;
}


.bottomline{
    border:none;
    background-color:#FF4D12;
height: 0.04rem;
    margin-top:0.7rem;
    width:19vw;
}

.profile{
    display:flex;
    padding: 0.45rem 0 0.8rem 0.9rem;
    gap:1.2rem;
}

.profilepic{
  width:3rem;
  height:3rem;
  border-radius: 25rem;
}

.line{
    border:none;
    background-color:#FF4D12;
height: 0.09rem;
margin:0.5rem 0.5rem
}

.settings{
    width:34vw;
}

.header{
padding:0.5rem 1rem;
font-family: 'Inter';
font-style: normal;
font-weight: 750;
font-size: 2.1rem;
line-height: 2.5rem;

color: #FF4D12;

}
</style>