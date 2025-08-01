<template>
    <div class="backgroundImage">
       <v-toolbar color="transparent">
         <img src="../assets/images/logo.png" width="70"/>
         <v-toolbar-title text="Home"></v-toolbar-title>

      <template v-slot:append>
        <v-btn color="warning" class="me-3" variant="elevated" to="/admin/login">login as admin</v-btn>
        <v-btn color="warning" variant="elevated" to="/user/login">login as user</v-btn>
      </template>
    </v-toolbar>
    </div>
</template>
<script setup>
</script>
<style scoped>
.backgroundImage{
    background-image: url('../assets/images/background.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    width: 100%;
    height: 100vh;
}
</style>