<template>
    <div class="login_form border-2 border-lightpink p-10 pt-5 shadow-sm mx-auto flex rounded" style="width: 500px;">
        <div class="sec flex-1">
            <form @submit.prevent="login">
            <span class="flex shadow-md mb-5 text-xs">
                <span class="bg-lightpink w-28 font-bold text-center text-black p-3 px-5 rounded-l">Email</span>
                <input class="field text-sm text-black p-2 px-3 rounded-r w-full bg-white" 
                type="text" 
                placeholder="someonespecial@example.com"
                id="username"
                v-model="enteredUsername"
                required/>
            </span>
            <span class="flex shadow-md mb-5 text-xs">
                <span class="bg-lightpink w-28 font-bold text-center text-black p-3 px-5 rounded-l">Password</span>
                <input class="field text-sm text-black p-2 px-3 rounded-r w-full bg-white" 
                type="password" 
                placeholder=""
                id="password"
                v-model="enteredPassword" 
                required/>
            </span>
            <button class="border-2 border-lightpink  w-full hover:bg-lightpink hover:text-gray-100 mt-3 text-white block text-center p-3 px-4 text-sm rounded cursor-pointer font-bold " type='submit'>Login</button>
        </form>
        </div>
    </div>
</template>

<script>
export default {
  emits: ['login-user'],
  data() {
    return {
      enteredUsername: '',
      enteredPassword: '',
    }
  },
  methods: {
    login() {
      
      const userLogin = {
        username: this.enteredUsername,
        password: this.enteredPassword
      }
      this.enteredUsername = ''
      this.enteredPassword = ''
      this.$emit('login-user', userLogin)
      
    },
    
  }
}
</script>