<script setup>

import { useRouter } from 'vue-router';
import Api from '../services/api';
import { reactive, ref } from 'vue';
const router  = useRouter()

const user = reactive({
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
})

const validation = ref([])

const register = async () => {
    await Api.post('/api/register', {
        username: user.username,
        email: user.email,
        password: user.password,
        // password_confirmation: user.password_confirmation,
    }).then(() => {
        router.push({
            name: '/login'
        })
    }).catch((error) => {
        validation.value = error.response.data.errors
    })
}
</script>

<template>
    <div class="container">
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <h2 class="text-center text-dark mt-5">Register Form</h2>
        <div class="card my-5">
            <!-- <div v-if="validation.errors" class="mt-2 alert alert-danger">
                <ul class="mt-0 mb-0">
                    <li v-for="(error, index) in validation.errors" :key="index">
                        {{ `${error.path} : ${error.msg}` }}
                    </li>
                </ul>
            </div> -->
          <form class="card-body cardbody-color p-lg-5">

            <div class="text-center">
              <img src="https://cdn.pixabay.com/photo/2016/03/31/19/56/avatar-1295397__340.png" class="img-fluid profile-image-pic img-thumbnail rounded-circle my-3"
                width="200px" alt="profile">
            </div>

            <div class="mb-3">
              <input type="text" class="form-control" v-model="user.username" id="Username" aria-describedby="emailHelp"
                placeholder="User Name">
            </div>
            <div class="mb-3">
              <input type="email" class="form-control" v-model="user.email" id="Email" aria-describedby="emailHelp"
                placeholder="Email">
            </div>
            <div class="mb-3">
              <input type="password" class="form-control" v-model="user.password" id="password" placeholder="password">
            </div>
            <div class="text-center"><button type="submit" @click="register" class="px-5 mb-5 w-100">Create Account</button></div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style>

button{
    background-color: #343a40;
    color: white;
}

.profile-image-pic{
  height: 200px;
  width: 200px;
  object-fit: cover;
}



.cardbody-color{
  background-color: #ebf2fa;
}

a{
  text-decoration: none;
}</style>