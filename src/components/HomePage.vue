<script setup lang="ts">
import { ref } from 'vue'
import SignUpPage from './SignUpPage.vue'
import LoginPage from './LoginPage.vue'


const currentStep = ref(1)


const signUp = (): void => {
  currentStep.value = 2
}

const login = (): void => {
  currentStep.value = 1
}
</script>

<template>
  <div class="main">
    <div class="mainbimg"></div>
    <div>
      <div class="maincredentials">
        <div class="mainheading">
          <h1 class="maintext">Zap Me</h1>
          <img src="../assets/image copy.png" width="40rem" height="40rem" />
        </div>
        <h2 class="subtext">Connect. Chat. Zap your world.</h2>
        <div class="credentialmaterial">
          <component
            :is="
              {
                1: LoginPage,
                2: SignUpPage,
              }[currentStep]
            "
            @login="login"
            @signUp="signUp"
          />
        </div>
        <h5 class="copyright">© Hiten Gupta 2025</h5>
      </div>
    </div>
  </div>
</template>

<style scoped>
.copyright {
  text-align: center;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 1rem;
  line-height: 1.2rem;

  color: rgba(0, 0, 0, 0.65);
}
.credentialmaterial {
  display: flex;
  justify-content: center;
}

.mainheading {
  display: flex;
  justify-content: center;
  gap: 1.75rem;
}

.maintext {
  text-align: center;

  font-family: 'Inter';
  font-style: normal;
  font-weight: 800;
  font-size: 2.5rem;
  line-height: 2.8rem;

  color: #ff4d12;
}

.subtext {
  text-align: center;
  font-family: 'Jersey 10';
  font-style: normal;
  font-weight: 400;
  font-size: 2rem;
  line-height: 2.2rem;
  margin-top: 1rem;

  color: #000000;
}
.maincredentials {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 3.5rem 6rem;
  padding-bottom: 0;
}
.mainbimg {
  background-image: url('../assets/image.png');
  background-position: left;
  background-repeat: no-repeat;
  background-size: cover;
  width: 60vw;
  height: 100vh;
}
.main {
  display: flex;
  gap: 0;
}
</style>
