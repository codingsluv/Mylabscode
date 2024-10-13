<script setup>

</script>

<template>
  <div class="p-5 mb-4 bg-light rounded-3 shadow-sm">
        <div class="container-fluid py-5">
            <h1 class="display-5 fw-bold">Welcome to Home</h1>
            <p class="col-md-12 fs-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. At facilis odio est quas pariatur esse? Aliquam, alias assumenda minus ab soluta sunt facere eius voluptatibus ipsum corrupti, maxime corporis omnis!</p>
            <hr/>
            <router-link :to="{ name: 'register' }" class="btn btn-primary btn-lg me-3">Create an Account</router-link>
            <router-link :to="{ name: 'login' }" class="btn btn-secondary btn-lg">Login</router-link>
        </div>
    </div>
</template>

<style scoped>

</style>
