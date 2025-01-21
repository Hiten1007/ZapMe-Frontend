<script setup lang="ts"></script>

<template>
  <div class="loginBox">
    <div class="logincontent">
      <div><input type="text" placeholder="Username or email" class="input" /></div>
      <div><input type="password" placeholder="Password" class="input" /></div>
      <div class="buttonBox"><button class="authbutton">Log In</button></div>
    </div>
    <div class="authchange">
      Don't have an account?
      <button class="authchangeB">Sign Up</button>
    </div>
  </div>
</template>

<style scoped>
.logincontent {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.loginBox {
  background-color: #ff4d12;
  padding: 3rem;
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
