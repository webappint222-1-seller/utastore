<template>
  <div class="account">
    <Navbar @logout="logOutLocal" :role="userRole" />
    <v-container class="flex justify-center w-auto h-auto">
      <v-flex xs10 sm10 md8 lg9 class="pa-2 justify-center">
        <!-- ----------------------------------------------------------------------------------------------------------- -->

        <v-container class="flex mb-40">
          <v-layout row warp>
            <v-row class="justify-center">
              <v-card dark flat height="520" width="auto" class="overflow-y-scroll pa-4 mt-10">
                <span class="text-lg white--text ml-8">ACCOUNT</span>

                <v-layout warp>
                  <v-row class="justify-center">
                    <div v-for="a in userDataFromRole" :key="a.user_id">
                      <v-card flat height="auto" width="180" class="my-10 mx-4" color="#C0C0C0">
                        <v-card-text class="justify-center text-sm black--text">
                          <ul>
                            <li class="pt-2 font-bold">Name:</li>
                            <li>{{ a.name }}</li>
                            <li class="pt-2 font-bold">Phone:</li>
                            <li>0{{ a.phonenumber }}</li>
                            <li class="pt-2 font-bold">Date of Birth:</li>
                            <li>{{ a.DOB }}</li>
                            <li class="pt-2 font-bold">Address:</li>
                            <li>{{ a.address }}</li>
                          </ul>
                        </v-card-text>

                        <v-card-actions class="justify-center">
                          <div v-if="userRole == 2 || userRole == 1" class= "mr-2" >
                            <v-btn @click="showAccount(a)" color="yellow darken-4" small>
                              <v-icon small>edit</v-icon>
                            </v-btn>
                          </div>
                            
                          <div v-if="userRole == 1" class= "ml-2" >
                            <v-btn
                              @click="deleteAccount(a.user_id)"
                              class
                              color="red darken-4"
                              small
                            >
                              <v-icon small>delete</v-icon>
                            </v-btn>
                          </div>
                        </v-card-actions>
                      </v-card>
                    </div>
                  </v-row>
                </v-layout>
              </v-card>
            </v-row>

            <v-flex xs12 sm12 md12 lg12 class="pa-2 justify-center">
              <v-card color="black" class="mt-10 text-black">
                <v-card color="#C0C0C0" class="w-auto h-auto ma-4">
                  <v-card-text>
                    <validation-observer ref="observer" v-slot="{ invalid }">
                      <form>
                        <validation-provider v-slot="{ errors }" name="Name" rules="required">
                          <v-text-field
                            v-model="editNameForm"
                            :error-messages="errors"
                            label="Name"
                            required
                            single-line
                            color="black"
                          ></v-text-field>
                        </validation-provider>

                        <validation-provider
                          v-slot="{ errors }"
                          name="Phone"
                          rules="required|numeric"
                        >
                          <v-text-field
                            v-model="editPhoneForm"
                            :error-messages="errors"
                            label="Phone"
                            required
                            single-line
                            color="black"
                          ></v-text-field>
                        </validation-provider>

                        <validation-provider v-slot="{ errors }" name="Date" rules="required">
                          <v-text-field
                            v-model="editDateForm"
                            :error-messages="errors"
                            label="Date"
                            required
                            single-line
                            type="date"
                            color="black"
                          ></v-text-field>
                        </validation-provider>

                        <validation-provider
                          v-slot="{ errors }"
                          name="Address"
                          rules="required|max:200"
                        >
                          <v-text-field
                            v-model="editAddressForm"
                            :error-messages="errors"
                            label="Address"
                            required
                            single-line
                            color="black"
                          ></v-text-field>
                        </validation-provider>

                        <v-btn
                          class="mr-4"
                          @click.prevent="submitAccountForm"
                          type="submit"
                          :disabled="invalid"
                        >Submit</v-btn>
                        <v-btn @click="clear">Clear</v-btn>
                      </form>
                    </validation-observer>
                  </v-card-text>
                </v-card>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-container>
    <!---------------------------------------------------------------------------------------------------------------->
    <Footer></Footer>
  </div>
</template>

<script>



import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import { required, max, max_value, numeric } from 'vee-validate/dist/rules'
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

export default {
  name: 'acPage',
  // mounted() {

  //   this.userRole = this.role
  // },
  props: { role: null },
  data() {
    return {
      addedit: false,
      cancel: false,
      editEmailForm: '',
      editPasswordForm: '',
      editNameForm: '',
      editPhoneForm: '',
      editDateForm: '',
      editAddressForm: '',
      defaultQuantity: 1,


      addCart: '',
      cartInfo: [],
      productInfo: [],

      userData: null,
      userRole: null,
      userDataFromRole: null,
      inEditMode: false,
      addCartMode: false,
      editId: '',
      addCartId: '',
      disabledbtn: false,
      cart: '',

      i: 'https://files.catbox.moe/vq3v5e.png',
      // url: 'http://localhost:5001/productInfo',
      // carturl: 'http://localhost:5002/cartInfo',
      // accounturl: 'http://localhost:5000/infoAccounts',
      // url: 'http://localhost:3006',
      url: 'https://www.utastore.team:3006',

    }

  },

  components: {
    Navbar,
    Footer,
    ValidationProvider,
    ValidationObserver,
  },

  methods: {
    logOutLocal() {
      this.userData = null
    },

    clear() {
      this.$refs.observer.reset()
      // this.editEmailForm = ''
      // this.editPasswordForm = ''
      this.editNameForm = ''
      this.editPhoneForm = ''
      this.editDateForm = ''
      this.editAddressForm = ''

    },


    submitAccountForm() {
      this.$refs.observer.validate()

      // console.log(`productName: ${this.nameForm}`)
      // console.log(`bandName: ${this.bandForm}`)
      // console.log(`productPrice: ${typeof this.priceForm}`)
      // console.log(`productDes: ${this.desForm}`)
      // console.log(`image: ${this.fileForm}`)

      if (
        // this.editEmailFormForm !== '' &&
        //   this.editPasswordForm !== '' &&
        this.editNameForm !== '' &&
        this.editPhoneForm !== '' &&
        this.editDateForm !== '' &&
        this.editAddressForm !== '') {

        // EDIT-2
        if (this.inEditMode) {
          this.editAccount({
            // id: this.editId,            
            // name: this.editNameForm,
            // phone: this.editPhoneForm,
            // date: this.editDateForm,
            // address: this.editAddressForm,
          })
        }
        // else {
        //   this.addNewAccountForm({          
        //     name: this.editNameForm,
        //     phone: this.editPhoneForm,
        //     date: this.editDateForm,
        //     address: this.editAddressForm,
        //   })
        // }

      }
      this.editNameForm = '',
        this.editPhoneForm = '',
        this.editDateForm = '',
        this.editAddressForm = ''

      requestAnimationFrame(() => {
        this.$refs.observer.reset();
      });
    },   

    // GET    
    async getUser() {
      if (document.cookie == null) { return }
      try {
        const res = await fetch(this.url + "/getuser", {
          credentials: 'include'
        })
        const getuserdata = await res.json()
        // console.log(`usedata: ${typeof getuserdata} ${getuserdata.data.role}`)

        return getuserdata
      }
      catch (error) {
        console.log(`get user failed: ${error}`)

      }


      // console.log(`user: ${this.productInfo[0]}`)
    },

    async getRole() {
      if (document.cookie == null) { return }
      else if (this.userRole == 1) {
      try {
        const res = await fetch(this.url + "/getalluser", {
          
        })
        const getuserdata = await res.json()
        // console.log(`usedata: ${typeof getuserdata} ${getuserdata.data.role}`)

        return getuserdata
      }
      catch (error) {
        console.log(`get user failed: ${error}`)

      }
      } else if (this.userRole == 2) {
       try {
        const res = await fetch(this.url + "/getuser", {
          credentials: 'include'
        })
        const getuserdata = await res.json()
        // console.log(`usedata: ${typeof getuserdata} ${getuserdata.data.role}`)

        return getuserdata
      }
      catch (error) {
        console.log(`get user failed: ${error}`)

      }
      
      }


      // console.log(`user: ${this.productInfo[0]}`)
    },

    // DELETE

    async deleteAccount(deleteAccountId) {
      try {
        await fetch(`${this.url}/deleteuserinfo/${deleteAccountId}`, {
          method: 'DELETE'
        })
        // this.infoAccounts = this.infoAccounts.filter(a => a.id !== deleteAccountId)
        this.reloadAccount()
      }
      catch (error) {
        console.log(`delete account failed: ${error}`)
      }
    },

    async reloadAccount() {
      this.infoAccounts = await this.getAccount()
    },

    // EDIT

    showAccount(accountInfo) {
      this.inEditMode = true
      this.editId = accountInfo.user_id
      this.editNameForm = accountInfo.name
      this.editPhoneForm = accountInfo.phonenumber
      this.editDateForm = accountInfo.DOB
      this.editAddressForm = accountInfo.address
    },

    async editAccount() {
      const formData = new FormData()
      formData.append('name', this.editNameForm)
      formData.append('phonenumber', this.editPhoneForm)
      formData.append('DOB', this.editDateForm)
      formData.append('address', this.editAddressForm)
      try {
        await fetch(`${this.url}/updateuserinfo/${this.editId}`, {
          method: 'PUT',
          body: formData
        })
        const Toast = this.$swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', this.$swal.stopTimer)
            toast.addEventListener('mouseleave', this.$swal.resumeTimer)
          }
        })

        Toast.fire({
          icon: 'success',
          title: 'Edit account successfully'
        })

        this.$refs.observer.reset()
        this.userData = await this.getUser();
        this.$router.go(0);
        // const data = await res.json()
        // this.infoAccounts = this.infoAccounts.map(a => a.id === newAccountInfo.id ?
        //   {
        //     ...a,
        //     email: data.email,
        //     password: data.password,
        //     name: data.name,
        //     phone: data.phone,
        //     date: data.date,
        //     address: data.address
        //   } : a
        // )
        this.inEditMode = false
        this.editId = ''
        this.editNameForm = ''
        this.editPhoneForm = ''
        this.editDateForm = ''
        this.editAddressForm = ''
      }
      catch (error) {
        console.log(`edit failed: ${error}`)
      }
    },
  },

  // GET-2
  async created() {
    this.userData = await this.getUser();
    this.userRole = this.userData.data.role;
    this.userDataFromRole = await this.getRole();

  }

}
</script>
