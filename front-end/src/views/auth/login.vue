<script setup>

import { useRouter } from 'vue-router';
import Api from '../../services/api';
import Cookies from 'js-cookie';
import { reactive, ref } from 'vue';
const router = useRouter()

const user = reactive({
    email: '',
    password: ''
})

const validation = ref([])
const loginFailed = ref([])

const login = async () => {
    await Api.post('/api/login', {
        
        email: user.email,
        password: user.password,

    }).then((response) => {
        Cookies.set('token', response.data.data.token)
        Cookies.set('user', JSON.stringify(response.data.data.user))
        
        if (Cookies.get('token')) {
            router.push({ name: 'dashboard' })
        }
    }).catch((error) => {
       //assign validation value with error
       validation.value = error.response.data

        //assign loginFailed value with error
        loginFailed.value = error.response.data
})
}

</script>

<template>
    <div class="container">
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <h2 class="text-center text-dark mt-5">Login Form</h2>
        <div class="card my-5">
          <form @submit.prevent="login" class="card-body cardbody-color p-lg-5">
            <div class="text-center">
              <img src="https://cdn.pixabay.com/photo/2016/03/31/19/56/avatar-1295397__340.png" class="img-fluid profile-image-pic img-thumbnail rounded-circle my-3"
                width="200px" alt="profile">
            </div>

            
            <div v-if="loginFailed.message" class="mt-2 alert alert-danger">
                {{ loginFailed.message }}
            </div> 
           

            <div class="mb-3">
              <input type="text" class="form-control" v-model="user.email" id="Email" aria-describedby="emailHelp"
                placeholder="Email">
            </div>
            <div class="mb-3">
              <input type="password" class="form-control" v-model="user.password" id="password" placeholder="password">
            </div>
            <div class="text-center"><button type="submit" class="px-5 mb-5 w-100">Login</button></div>
            <div id="emailHelp" class="form-text text-center mb-5 text-dark">Not
              Registered? <a href="/login" class="text-dark fw-bold"> Create an
                Account</a>
            </div>
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
}
</style>