<template>
    <v-btn variant="text" @click="dialog = true" :color="props.formType==='edit'?'primary':''">{{ props.formType==='add'?'create post':'edit post' }}</v-btn>
          <v-dialog v-model="dialog" max-width="800">
            <v-card :title="formType==='add'?'add post' : 'editPost'">
              <v-card-text>
                <v-form ref="form">
                  <v-text-field v-model="postData.title" label="title" :rules="[v => !!v || $t('formValidation.required'),]"/>
                  <v-text-field v-model="postData.body" label="body" :rules="[v => !!v || $t('formValidation.required'),]"/>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn @click="dialog = false" color="warning">close</v-btn>
                <v-spacer></v-spacer>
                <v-btn v-if="props.formType==='add'" :loading="loading" @click="addPost" color="primary">add</v-btn>
                <v-btn v-else="props.formType==='add'" :loading="loading" @click="updatetPost" color="primary">edit</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import useAxios from '../composable/fetch';

const { post, put, loading} = useAxios()
const form = ref(null)
const dialog = ref(false)
const props = defineProps(['formType','data'])
const emit = defineEmits(['getData'])
const postData = ref({
  title:null,
  body:null,
  name: null,
})
const addPost = async() => {
  const { valid } = await form.value.validate()
  if( valid ){
    postData.value.name = localStorage.getItem('userName').split("@")[0]
    await post('/posts',postData.value)
    dialog.value = false
    emit('getData')
    form.value.reset()
  }
}
const updatetPost = async() => {
  const { valid } =await form.value.validate()
  if(valid) {
   await put(`/posts/${props.data.id}`,postData.value)
    dialog.value = false
    emit('getData')
  }
    
  }

  onMounted(
    () => {
        if(props.formType === 'edit'){
            postData.value = {... props.data} 
        }
    }
  )
</script>