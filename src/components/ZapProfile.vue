<script setup lang = "ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { type User } from '../interfaces'
import UpdateUserInfo from './UpdateUserInfo.vue';
import api from '@/api';

const {profileUserID} = defineProps(['profileUserID'])
const emit = defineEmits(['showProfile', 'getimage'])

const errors = ref('');
const aboutContent = ref("")
const user = ref<User | null>(null);
const showAbout = ref(true)
const editUserInfo = ref(false)
const fileInput = ref<HTMLInputElement | null>(null);

const showEditForm = () => {
    editUserInfo.value = true
}

const hideEditForm = () => {
    editUserInfo.value = false
}

const editAbout = () => {
    showAbout.value = false
}

const cancelEditAbout = () => {
    showAbout.value = true
}

const updateAbout = async () => {
    try{

        await api.put('/api/users/profile/about', { about : aboutContent.value}, {withCredentials: true})
        if(user.value){
            user.value.userInfo.about = aboutContent.value
        }
       
        showAbout.value = true
    }
    catch(error){
        console.error(error)
    }
}


const getUser = async () => {
    try {
        const response = await api.get<User>('/api/users/profile', { withCredentials: true });
        user.value = response.data;
        aboutContent.value = user.value.userInfo.about
    } catch (error) {
        console.error("Error fetching user:", error);
    }
};

const getOtherUser = async () => {
    try {
        const response = await api.get<User>(`/api/users/profile/${profileUserID}`, { withCredentials: true });
        user.value = response.data;
        aboutContent.value = user.value.userInfo.about
    } catch (error) {
        console.error("Error fetching user:", error);
    }
};



const updatePhoto = () => {
  fileInput.value?.click();
};

// Called when a new file is selected
const handleFileChange = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (!target.files || target.files.length === 0) return;
  
  const file = target.files[0];
  
  // Create a FormData object to send the file to your backend
  const formData = new FormData();
  formData.append('photo', file);

  try {
    const response = await api.put('/api/users/profile/profilephoto', formData, { withCredentials: true });
    // Update the user's profile photo with the new URL returned by the backend
    if (user.value) {
      user.value.userInfo.imageUrl = response.data.updatedUser.imageUrl;
      emit('getimage')
    }
  } catch (error) {
     console.error( error);
        errors.value ='Error updating photo'
  }
};

onMounted(() => {
    if(profileUserID !== 0){
        getOtherUser()
    }
    else{
        getUser();
    }

});

onUnmounted(() => {user.value=null})

watch(() => profileUserID, () => {
    if(profileUserID === 0) {
        getUser();
    }
})

const closeErrBox = () => {
    errors.value = ''
}

</script>

<template>
  <div class="profilebox">
    <h1 class="profileheader">Profile</h1>
    <hr class="line" />
    <div class="mainarea">
      <div class="profileinfobox">
        <div class="profileinfo">
          <div class="chatbutton">
            <!-- The image uses your CSS dimensions -->
            <img :src="user?.userInfo.imageUrl" class="profilepic" @click="updatePhoto" />
          </div>
          <!-- Hidden file input triggered when the image is clicked -->
          <input 
            ref="fileInput" 
            type="file" 
            accept="image/jpeg, image/png" 
            style="display: none" 
            @change="handleFileChange"
            v-if="profileUserID === 0" 
          />
                    <div class="infobox">
                       
                        <div>
                            <div class="usernamebox">
                                <h1 class="username">{{user?.userInfo.username}}</h1>
                                <img src="../assets/image copy 10.png" class="usernameedit" @click="showEditForm" v-if="profileUserID === 0" />
                            </div>
                            <div class="personbox">
                                <h2 class="realname">{{user?.userInfo.name}}</h2>
                                <div class="attributes" v-if="user?.userInfo.attributes?.length">
                                   <p class="attribute">{{user?.userInfo.attributes[0]}}</p>
                                   <div class="dot"></div>
                                   <p class="attribute">{{user?.userInfo.attributes[1]}}</p>
                                   <div class="dot"></div>
                                   <p class="attribute">{{user?.userInfo.attributes[2]}}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
              
            </div>
            <div class="aboutsection">
                <div class="aboutheader">
                    <h2 class="abouttext">About Me</h2>
                    <img src="../assets/image copy 14.png" class="abouteditimg" @click="editAbout" v-if="showAbout && profileUserID === 0"  />
                    <div class="abouteditbuttons" v-else-if="!showAbout">
                        <img  src="../assets/image copy 15.png" @click="cancelEditAbout" height = "21rem" />
                        <img src="../assets/image copy 16.png" @click="updateAbout" height = "21rem" />
                    </div>
                    
                </div>
                <p class="textbox aboutcontent" v-if="showAbout" >{{ user?.userInfo.about }}</p>
                <textarea class="textbox" placeholder="Tell Us About Yourself..." v-model="aboutContent" v-else></textarea>
            </div>
        </div>
        <UpdateUserInfo @hideEditForm = "hideEditForm" @getUser = "getUser" v-if="editUserInfo" :user="user" />
        <div v-if="errors" class="errorbox">
            <img  src="../assets/image copy 15.png" @click="closeErrBox" height = "10rem" class="cross" />
            <span class="error">{{ errors }}</span>
            <p class="errortext">Make sure your internet connection connection is on.</p>
        </div>
    </div>
</template>

<style scoped>
.errortext{
    font-family: 'Inter';
  font-style: normal;
  font-weight: 550;
  font-size: 0.8rem;
  line-height: 1rem;
  margin-left:0.5rem;
  color: #949494;
  margin-top: 0.5rem;
}

.cross{
    position: relative;
    left:20rem
}

.error{
    font-family:'Inter';
    font-style: normal;
  font-weight: 750;
  font-size: 1rem;
  line-height: 1.2rem;
    color:red
}

.errorbox{
    background-color: white;
    border: 0.1rem solid #ff4d12;
    position:fixed;
    top:40vh;
    left:40vw;
    border-radius:1rem;
    padding: 0.5rem;
}

.aboutcontent{

font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 1.2rem;
line-height: 1.4rem;
letter-spacing: 0.05rem;

color: #000000;

}



.abouteditbuttons{
    display: flex;
    gap:0.8rem
}

.abouteditimg{
    width:1.7rem;
    height:1.7rem
}

.aboutheader{
    display:flex;
    justify-content:space-between;
    padding:0 1rem 0 1.25rem;
    width:38vw
}

.abouttext{


font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 1.4rem;
line-height: 1.6rem;
text-decoration-line: underline;

color: #000000;


}

.textbox{
    
    
    resize: none;
    height:8rem;
    width:33rem;
    border-radius: 1rem;
    margin-top:1rem;
    border:none; 
    outline: none;
background: #D9D9D9;
padding: 1.2rem;
font-size: 0.9rem
}


.aboutsection{
    margin:2rem 0rem 0rem 15rem
}

.linkimg{
    width:1.65rem;
    height: 1.65em
}
.linktext{


font-family: 'Kumbh Sans';
font-style: normal;
font-weight: 400;
font-size: 1.2rem;
line-height: 1.4rem;

color: #000000;

}

.linkbox{
    background:#D9D9D9;
    margin:1rem 3rem 0rem 0rem ;
    padding:2rem;
    display:flex;
    flex-direction : column;
    gap : 2rem;
    border-radius: 2rem
}

.link{
    display:flex;
    gap: 1rem;
}

.linkstext{
    font-family: 'Kumbh Sans';
font-style: normal;
font-weight: 550;
font-size: 1.3rem;
line-height: 1.45rem;
padding-left:1rem;
color: #000000;
}

.linksbox{
    margin: 3.4rem 0 0 6.7rem;
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


.buttonbox{
    margin-left:11rem
}

.attribute{


font-family: 'Inter';
font-style: normal;
font-weight: 550;
font-size: 1.1rem;
line-height: 1.4rem;

color: #949494;


}

.dot{
    /* Ellipse 10 */

width: 0.3rem;
height: 0.3rem;
border-radius:10rem;
margin-top:0.4rem;
background: #949494;

}
.attributes{
    display:flex;
    gap:1rem
}

.personbox{
    margin-top:0.6rem
}


.realname{

font-family: 'Jersey 10';
font-style: normal;
font-weight: 400;
font-size: 2.1rem;
line-height: 2.3rem;

color: rgba(0, 0, 0, 0.5);


}

.usernameedit{
    width:1.4rem;
    height:1.4rem;
    margin-top:0.4rem
}

.usernamebox{
    display:flex;
    gap:1rem
}

.username{

font-family: 'Inter';
font-style: normal;
font-weight: 750;
font-size: 1.9rem;
line-height: 2rem;

color: #000000;


}

.userinfobox{
    margin-top:2.2rem
}

.infobox{
    width:25rem
}

.friends{
    display:flex;
    gap:0.8rem;
    margin-left:16rem 
}

.friendsimg{
    width:1.6rem;
    height:1.6rem
}

.friendstext{

font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 1.4rem;
line-height: 2rem;

color: #000000;


}

.profileinfobox{
    padding:4rem 0 0 10rem
}

.profileinfo{
    display:flex;
    gap:2rem
}
.mainarea{
    display: grid;
    grid-template: 1fr / 1fr;
    gap:1rem
}
.profileheader{

font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 1.4rem;
line-height: 2rem;
padding:0.4rem 0.1rem 0.1rem 0.9rem;

color: #000000;


}
.line{
background: #FF6633;

border:none; 
height:0.0925rem
}
.profilebox{
    width:135vw
}

.profilepic{
    border-radius: 25rem;
    width:11rem;
    height:11rem;
    cursor:pointer;
    object-fit: cover;
}

</style>