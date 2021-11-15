<template>
  <div
    class="login_form border-2 border-lightpink p-2 pt-5 shadow-sm mx-auto flex rounded"
    style="width: 500px;"
  >
    <div class="sec flex-1">
      <validation-observer ref="observer" v-slot="{ invalid }">
        <form @submit.prevent="register">
          <validation-provider v-slot="{ errors }" name="Email" rules="required|email">
            <span class="flex shadow-md mt-5 mb-1 text-xs justify-start">
              <span
                class="bg-lightpink w-24 font-bold text-center text-black p-3 px-5 rounded-l"
              >Email</span>

              <input
              
                class="field text-sm text-black p-2 px-3 rounded-r w-full bg-white"
                type="text"
                placeholder="someonespecial@example.com"
                id="email"
                v-model="enteredEmail"
                required
                single-line
              />
            </span>
            <span class="text-red-500 bg-opacity-80 font-medium rounded-sm">{{ errors[0] }}</span>
          </validation-provider>

          <validation-provider v-slot="{ errors }" name="Password" rules="required">
            <span class="flex shadow-md mt-5 mb-1 text-xs">
              <span
                class="bg-lightpink w-24 font-bold text-center text-black p-3 px-3 rounded-l"
              >Password</span>
              <input
                class="field text-sm text-black p-2 px-3 rounded-r w-full bg-white"
                type="password"
                placeholder
                id="password"
                v-model="enteredPassword"
                required
              />
            </span>
            <span class="text-red-500 bg-opacity-80 font-medium rounded-sm">{{ errors[0] }}</span>
          </validation-provider>

          <validation-provider v-slot="{ errors }" name="Name" rules="required|alpha_spaces">
            <span class="flex shadow-md mt-5 mb-1 text-xs">
              <span
                class="bg-lightpink w-24 font-bold text-center text-black p-3 px-5 rounded-l"
              >Name</span>
              <input
                class="field text-sm text-black p-2 px-3 rounded-r w-full bg-white"
                type="text"
                placeholder="somchai "
                id="name"
                v-model="enteredName"
                required
              />
            </span>
            <span class="text-red-500 bg-opacity-80 font-medium rounded-sm">{{ errors[0] }}</span>
          </validation-provider>

          <validation-provider v-slot="{ errors }" name="Phone" rules="required|numeric">
            <span class="flex shadow-md mt-5 mb-1 text-xs">
              <span
                class="bg-lightpink w-24 font-bold text-center text-black p-3 px-5 rounded-l"
              >Phone</span>
              <input
                class="field text-sm text-black p-2 px-3 rounded-r w-full bg-white"
                type="text"
                placeholder="0xxxxxxxxx"
                id="phonnumber"
                v-model="enteredPhone"
                required
              />
            </span>
            <span class="text-red-500 bg-opacity-80 font-medium rounded-sm">{{ errors[0] }}</span>
          </validation-provider>

          <validation-provider v-slot="{ errors }" name="Date" rules="required">
            <span class="flex shadow-md mt-5 mb-1 text-xs">
              <span
                class="bg-lightpink w-24 font-bold text-center text-black p-3 px-5 rounded-l"
              >Date of Birth</span>
              <input
                class="field text-sm text-black p-2 px-3 rounded-r w-full bg-white"
                type="date"
                placeholder
                id="date"
                v-model="enteredDate"
                required
              />
            </span>
            <span class="text-red-500 bg-opacity-80 font-medium rounded-sm">{{ errors[0] }}</span>
          </validation-provider>

          <validation-provider v-slot="{ errors }" name="Address" rules="required">
            <span class="flex shadow-md mt-5 mb-1 text-xs">
              <span
                class="bg-lightpink w-24 font-bold text-center text-black p-3 px-5 rounded-l"
              >Address</span>
              <input
                class="field text-sm text-black p-2 px-3 rounded-r w-full bg-white"
                type="text"
                placeholder
                id="address"
                v-model="enteredAddress"
                required
              />
            </span>
            <span class="text-red-500 bg-opacity-80 font-medium rounded-sm">{{ errors[0] }}</span>
          </validation-provider>

          <button
            class="border-2 border-lightpink w-full hover:bg-lightpink hover:text-gray-100 mt-3 text-white block text-center p-3 px-4 text-sm rounded cursor-pointer font-bold"
            type="submit"
            :disabled="invalid"
          >Register</button>
        </form>
      </validation-observer>
    </div>
  </div>
</template>

<script>
import { required, max, max_value, numeric, email, alpha_spaces } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'

setInteractionMode('eager')

extend('required', {
  ...required,
  message: '{_field_} can not be empty',
})

extend('max', {
  ...max,
  message: '{_field_} may not be greater than {length} characters',
})

extend('max_value', {
  ...max_value,
  message: '{_field_} may not be greater than 10 piece',
})

extend('numeric', {
  ...numeric,
  message: '{_field_} must be number',
})

extend('email', {
  ...email,
  message: '{_field_} must be email address',
})

extend('alpha_spaces', {
  ...alpha_spaces,
  message: '{_field_} must be alphabet',
})

export default {
  emits: ['login-user'],
  data() {
    return {
      enteredEmail: '',
      enteredPassword: '',
      enteredName: '',
      enteredPhone: '',
      enteredDate: '',
      enteredAddress: '',
    }
  },

  components: {
    ValidationProvider,
    ValidationObserver,

  },

  methods: {
    register() {
      
      const userRegister = {
        emailaddress: this.enteredEmail,
        password: this.enteredPassword,
        name: this.enteredName,
        phonenumber: this.enteredPhone,
        dob: this.enteredDate,
        address: this.enteredAddress,
      }

      // console.log(`email: ${typeof this.emailaddress} ${this.emailaddress}`)
      // console.log(`pass: ${typeof this.password} ${this.password}`)
      // console.log(`name: ${typeof this.name} ${this.name}`)
      // console.log(`phone: ${typeof this.phonenumber} ${this.phonenumber}`)
      // console.log(`DOB: ${this.DOB} ${typeof this.DOB}`)
      //  console.log(`address: ${typeof this.address} ${this.address}`)

      this.$emit('register-user', userRegister)
      this.$refs.observer.reset()
      console.log(`userRegis: ${typeof userRegister.emailaddress} ${userRegister.emailaddress}`)
      
      this.enteredEmail = ''
      this.enteredPassword = ''
      this.enteredName = ''
      this.enteredPhone = ''
      this.enteredDate = ''
      this.enteredAddress = ''
      
      
     
    },

  }
}
</script>