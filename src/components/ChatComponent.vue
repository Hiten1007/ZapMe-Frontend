<script setup lang ="ts">
import type { AUser, Message } from '@/interfaces'
import { onMounted, ref, watch, onUnmounted, nextTick, inject } from 'vue'
import { key } from '@/injectkeys'
import api from '@/api'

const message = ref('')
const { users } = defineProps(['users'])
const emit = defineEmits(['getZaps'])
const chatId = ref(0)
const messages = ref<Message[]>([])
let socket: WebSocket | null = null; 
const chatContainer = ref<HTMLElement | null>(null)
const profilePage = inject<(user: AUser) => void>(key)


const showProf = () => {
  if (profilePage) {
    profilePage(users)
}
}

// Fetch messages for a chat
const getMessages = async () => {
  if (!chatId.value) return;
  try {
   
    const response = await api.get(
      `/api/content/zapmessages/${chatId.value}`,
      { withCredentials: true }
    );
    messages.value = response.data;
  } catch (error) {
    console.error('Error fetching messages:', error);
  }
};

// Initialize WebSocket (only once)
const setupWebSocket = () => {
  if (socket) return; // Avoid multiple WebSocket instances

  const SOCKET_URL = import.meta.env.VITE_WEBSOCKET_URL || "ws://localhost:3000";
  socket = new WebSocket(SOCKET_URL);

  socket.onopen = () => {
    registerUser();
  };

  socket.onmessage = async (event) => {
    const data = JSON.parse(event.data);
    switch (data.type) {
      case 'register':
        chatId.value = data.id;
        await nextTick();
        getMessages();
        break;

      case 'onemessage':
        if(data.senderId === users.id || data.senderId === 'sender'){
          messages.value.push(data.message);
        }
        
        emit('getZaps')
        break;

      case 'error':
        console.error('WebSocket Error:', data.message);
        break;

      default:
        console.warn('Unknown event type:', data.type);
    }
  };

  socket.onclose = () => {
    socket = null;
  };
};

// Register user in WebSocket when switching chats
const registerUser = () => {
  if (!socket || socket.readyState !== WebSocket.OPEN) return;
  socket.send(JSON.stringify({ type: 'register', userId: `${users.id}` }));
};

// Send a chat message
const sendChatMessage = (content: string) => {
  if (!content.trim() || !socket) return;
  socket.send(JSON.stringify({ type: 'onemessage', userId: `${users.id}`, content }));
  message.value = '';
  
  nextTick(() => {
    scrollToBottom();
  });
};

const scrollToBottom = () => {
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
  }
};

onMounted(() => {
  scrollToBottom();
});

watch(messages, () => {
  nextTick(() => {
    scrollToBottom();
  });
}, {deep : true});

const zaptime = (time:string) => {
    return time.replace(/:\d+ /, ' ');
}


// Watch for user changes and update chat **without closing WebSocket**
watch(
  () => users,
  async (newUser, oldUser) => {
    if (!newUser || newUser.id === oldUser?.id) return;

    message.value = '';
    chatId.value = 0; // Reset chatId
    messages.value = []; // Clear previous messages

    await nextTick(); // Ensure Vue updates state before fetching messages

    registerUser(); // Send new registration message to WebSocket
  },
  { deep: true, immediate: true }
);

// Cleanup WebSocket on component unmount
onUnmounted(() => {
  if (socket) {
    socket.close();
  }
});

onMounted(setupWebSocket);
</script>

<template>
    <div class="content">
        <!---header-->
        <div class="profilebar" @click="showProf">
            <div class="profile">
                <img :src="users?.imageUrl" class="profilepic" />
                <div class="userinfo">
                    <div class="username">{{ users?.username }}</div>
                    <div class="name">{{ users?.name }}</div>
                </div>
            </div>
            <img class="profileinteract" src="../assets/image copy 18.png" />
        </div >
        <!---chatarea-->
        <div class="chatarea">
          <div ref="chatContainer" class="chat-container">
    <div v-for="chat in messages" :key="chat.id" :class="chat.userId === users.id ? 'messageu' : 'messagei'">
      <!-- <span class="sender">{{ chat.userId }}</span> -->
      <p class="themsg">{{ chat.content }}</p>
      <span class="timestamp">{{ zaptime(new Date(chat.createdAt).toLocaleTimeString())}}</span>
    </div>
  </div>
        </div>
        <!--chatinput-->
        <div class="chatinputbox">
          
            <div class="inputbar">
                <img src="../assets/image copy 20.png" alt="" height="16rem">
                <input type="text" class="input" v-model = "message" />
                <img src="../assets/image copy 21.png" alt="" height="16rem" @click="sendChatMessage(message)">
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

.chat-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  overflow-y: auto; /* Allows scrolling */
  max-height: 82vh; /* Adjust height as needed */
  scroll-behavior: smooth;
}

.messageu, .messagei {
  max-width: 30vw; /* Prevents messages from taking full width */
  padding: 0.5rem 1rem 1rem 1rem;
  border-radius: 0.4rem;
  word-wrap: break-word;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  color:white;
  position: relative;
}

.messageu {
  align-self: flex-start; /* Aligns user messages to the left */
  background-color: #949494;
  margin-left: 0.8rem; /* Space from the left */

}

.messagei {
  align-self: flex-end; /* Aligns received messages to the right */
  background-color: #ff4d12;
  margin-right: 0.8rem; /* Space from the right */
}

.chat-container::-webkit-scrollbar {
  width: 0.5rem;
}

.chat-container::-webkit-scrollbar-thumb {
  background: #bbb;
  border-radius: 0.4rem;
}

.timestamp{
  /* 12:07 am */
margin-top: 0.15rem;
position: absolute;
right:0.5rem;
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 0.5rem;
line-height: 0.7rem;
/* identical to box height */

color: #FFFFFF;
}

.themsg{


font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 1rem;
line-height: 1.2rem;

color: #FFFFFF;


}
</style>