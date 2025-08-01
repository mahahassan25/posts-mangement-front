<template>
  <v-container align="center" class="login-container my-10">
    <v-card max-width="1000" class=" rounded-lg login-card w-75 w-md-100 py-15">
      <div class="text-center">
        <img src="../../../assets/images/logo.png" alt="" width="90">
        <p class="font-weight-bold text-h5 text-white">Login in to Your Account</p>
        <p class="text-caption text-white">
          Access your feed, messages, and more in one place.</p>
      </div>
      <v-row class="mt-md-5 justify-center align-center">
        <v-col cols="12" md="6" class="mt-1">
          <v-form ref="form">
            <v-text-field
              v-model="user.email"
              :rules="[
                v => !!v || 'this field is required',
                value => {
                  return emailPattern.test(value)|| 'invalid email'
                }]"
              label="email"
              variant="outlined"
              class="w-md-75 custom-text-field"
            />
            <v-text-field
              v-model="user.password"
              label="password"
              variant="outlined"
              class="w-md-75"
              :append-inner-icon="ishiden? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
              :type="ishiden?'password':'text'"
              :rules="[v => !!v || $t('formValidation.required'),]"
              @click:append-inner="ishiden=!ishiden"
            />

            <v-btn class="w-md-75" color="primary" :loading="loading" @click="userLogin" >log in</v-btn>
          </v-form>
        </v-col>
        <v-col class="d-none d-md-block" md="6">
          <img src="../../../assets/images/login-image.png" alt="" width="100%">
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>
<script setup>
import { ref } from 'vue';
import useAxios from '../../../composable/fetch';
import { useRouter } from 'vue-router';
const emailPattern = ref(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
const { post , loading, response } = useAxios()
const router = useRouter()
const ishiden = ref(true)
  const user = ref({
    email: null,
    password: null
  })
  const form = ref(null)
    const userLogin = async() => {
    const {valid} = await form.value.validate()
    if( valid ) {
      await post('/user/login',user.value)
      console.log(response)
      localStorage.setItem('authToken', response.value.token)
      localStorage.setItem('userName',response.value.user.email)
      localStorage.setItem('userId',response.value.user.id)
      localStorage.setItem('role','user')
      router.push('/')
    }
  }
</script>
<style scoped>
  .login-card {
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    background: linear-gradient(135deg,#16538E,#F19C3C);
  }
  input:-internal-autofill-selected{
    color: transparent !important;
    background-color: transparent !important;
  }

</style>
