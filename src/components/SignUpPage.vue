<script setup lang="ts">
import { ref } from 'vue'
import {useRouter} from 'vue-router'
import api from '@/api'

const router = useRouter()
const emit = defineEmits(['login'])

// Define form data as reactive variables
const email = ref('')
const username = ref('')
const fullName = ref('')
const password = ref('')
const errors = ref('')

// Submit function to handle form data
const submitForm = async () => {
  try {
    const formData = {
      email: email.value,
      username: username.value,
      name: fullName.value,
      password: password.value,
    }
    await api.post('api/users/registerUser', formData, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials:true
    }, )
    router.push('/chats')
  } catch (error) {
   errors.value='Something went wrong. Please try again later.'
   console.error(error)
  }
}
</script>

<template>
  <div>
    <div class="signupBox">
      <form @submit.prevent="submitForm">
        <div class="signupcontent">
          <div>
            <input type="email" v-model="email" placeholder="E-mail" class="input" required />
          </div>
          <div>
            <input type="text" v-model="username" placeholder="Username" class="input" required />
          </div>
          <div>
            <input type="text" v-model="fullName" placeholder="Full Name" class="input" required />
          </div>
          <div>
            <input type="password" v-model="password" placeholder="Password" class="input" required />
          </div>
          <div class="buttonBox"><button class="authbutton" type="submit">Sign Up</button></div>
        </div>
        <div class="authchange">
          Already have an account?
          <button class="authchangeB" @click="emit('login')">Log In</button>
        </div>
      </form>
    </div>
    <div v-if="errors">
        <p class="error">{{ errors }}</p>
      </div>
  </div>
</template>

<style scoped>
.error{


font-family: 'Roboto';
font-style: normal;
font-weight: 400;
font-size: 1rem;
line-height: 1.2rem;
/* or 200% */
display: flex;
align-items: center;
text-align: center;
letter-spacing: 0.1px;

color: #FF0000;
margin-bottom:1rem

}

.signupcontent {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.signupBox {
  background-color: #ff4d12;
  padding: 1.5rem 3rem;
  width: 19rem;
  margin: 1.5rem 0rem;
}

.authchangeB {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 1rem;
  line-height: 1.3rem;
  letter-spacing: 0.02rem;

  color: #d9d9d9;
  -webkit-text-stroke: 0.03rem #007bfc;
  background: none;
  border: none;

  text-decoration: underline;
  -webkit-text-decoration-color: #007bfc; /* safari still uses vendor prefix */
  text-decoration-color: #007bfc;
}
.authchange {
  text-align: center;
  font-size: 0.8rem;
  line-height: 1rem;
  margin-top: 2.5rem;
  color: white;

  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;

  /* or 167% */

  letter-spacing: 0.1px;
}

.input {
  width: 13rem;
  height: 2.2rem;
  padding-left: 1rem;

  border: none;
  outline: 0;

  font-family: 'Roboto';
  font-style: normal;
  font-weight: 600;
  font-size: 0.8rem;
  line-height: 1rem;
  letter-spacing: 0.05rem;

  color: rgba(0, 0, 0, 0.65);

  background-color: #d9d9d9;
}

.authbutton {
  width: 6rem;

  height: 2.5rem;
  width: 8rem;

  color: white;
  background: #007bfc;
  border-radius: 3rem;
  outline: none;
  border: none;
  margin-top: 0.5rem;

  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  font-size: 0.9rem;
  line-height: 1.2rem;

  letter-spacing: 0.1px;
}

.buttonBox {
  display: flex;
  justify-content: center;
}
</style>
