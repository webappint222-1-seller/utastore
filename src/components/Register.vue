<template>
    <div class="login_form border-2 border-lightpink p-10 pt-5 shadow-sm mx-auto flex rounded" style="width: 500px;">
        <div class="sec flex-1">
            <form @submit.prevent="register">
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
            <span class="flex shadow-md mb-5 text-xs">
            <span class="bg-lightpink w-28 font-bold text-center text-black p-3 px-5 rounded-l">Firstname</span>
                <input class="field text-sm text-black p-2 px-3 rounded-r w-full bg-white" 
                type="text" 
                placeholder=""
                id="firstname"
                v-model="enteredFirstname"
                required/>
            </span>
            <span class="flex shadow-md mb-5 text-xs">
            <span class="bg-lightpink w-28 font-bold text-center text-black p-3 px-5 rounded-l">Lastname</span>
                <input class="field text-sm text-black p-2 px-3 rounded-r w-full bg-white" 
                type="text" 
                placeholder=""
                id="Lastname"
                v-model="enteredLastname"
                required/>
            </span>
            <span class="flex shadow-md mb-5 text-xs">
            <span class="bg-lightpink w-28 font-bold text-center text-black p-3 px-5 rounded-l">Telephone</span>
                <input class="field text-sm text-black p-2 px-3 rounded-r w-full bg-white" 
                type="text" 
                placeholder=""
                id="Telephone"
                v-model="enteredTelephone"
                required/>
            </span>
            <button class="border-2 border-lightpink  w-full hover:bg-lightpink hover:text-gray-100 mt-3 text-white block text-center p-3 px-4 text-sm rounded cursor-pointer font-bold " type='submit'>Register</button>
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
      enteredFirstname: '',
      enteredLastname: '',
      enteredTelephone: '',
    }
  },
  methods: {
    register() {
      
      const userRegister = {
        username: this.enteredUsername,
        password: this.enteredPassword,
        firstname: this.enteredFirstname,
        lastname: this.enteredLastname,
        tel: this.enteredTelephone,
      }
      this.enteredUsername = ''
      this.enteredPassword = ''
      this.enteredFirstname = ''
      this.enteredLastname = ''
      this.enteredTelephone = ''
      this.$emit('register-user', userRegister)
    },
    
  }
}
</script>