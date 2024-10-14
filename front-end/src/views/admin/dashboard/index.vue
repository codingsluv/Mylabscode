<script setup>
import SidebarMenu from '../../../components/SidebarMenu.vue';

</script>

<template>
    <div class="container mt-5 mb-5">
        <h1 class="text-center">Welcome to the Quiz App</h1>
        <div class="row justify-content-center">
            <div class="col-sm-12 col-md-8 col-lg-6">
                <SidebarMenu />
            </div>
        </div>
        <div class="col-md-9">
            <div class="card border-0 rounded shadow-sm">
                <div class="card-header">
                    Dashboard
                </div>
                <div class="card-body">
                    Selamat Datang, <strong></strong>
                </div>
            </div>
        </div>
    </div>
</template>