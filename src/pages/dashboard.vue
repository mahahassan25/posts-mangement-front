<template>
    <v-toolbar class="text-white" image="" color="primary">
          <v-toolbar-title text="posts Dashbord"></v-toolbar-title>
          <PostForm form-type="add" @getData="getposts"/>
          <v-btn icon="mdi-logout" color="white" @click="logout"></v-btn>
        </v-toolbar>
    <v-container class="d-flex flex-column justify-center align-center mt-10">
        <div v-if="postsList" class="d-flex flex-wrap justify-center align-center ga-10">
          <v-card v-for="post in postsList" :key="post.id"  width="400">
            <v-card-text>
                <p>{{ post.title }}</p>
                 <p>{{ post.body }}</p>
            </v-card-text>
            <v-card-subtitle>by {{ post.author.name }}</v-card-subtitle>
            <v-divider/>
            <v-card-actions v-if="(post.author.id == userId) || (role === 'admin')">
                <PostForm form-type="edit" @getData="getposts" :data="post"/>
                <v-spacer/>
                <v-btn color="error" @click="deletePost(post.id)" :loading="loading">Delete</v-btn>
            </v-card-actions>
          </v-card>
        </div>
    </v-container>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import useAxios from '../composable/fetch';
import PostForm from '../components/postForm.vue';
const { get,del,post, response, loading} = useAxios()
const router = useRouter()
const postsList = ref(null)
const role = ref(null)

const userId = ref(null)


const getposts = async() => {
  await get('/posts')
  postsList.value = response.value
}

const deletePost = async(id) => {
  await del(`/posts/${id}`)
  getposts()
}
const logout = async() => {
   if(role.value === 'admin'){
     await post('/admin/logout')
   }else{
     await post('/user/logout')
   }
   router.push('/dashboard')
}
  onMounted(
    () => {
     getposts()
     userId.value= localStorage.getItem('userId')
     role.value = localStorage.getItem('role')
     console.log(role.value)
     localStorage.removeItem('role')
     localStorage.removeItem('authToken')
     localStorage.removeItem('userName')
     localStorage.removeItem('userId')
    }
  )
</script>
