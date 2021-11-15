<template>
  <div class="account">
    <Navbar />
    <v-container class="flex justify-center w-auto h-auto">
      <v-flex xs10 sm10 md8 lg9 class="pa-2 justify-center">
        <!-- <v-btn dark v-show="!addedit" v-on:click="toggleDone()" class="mt-10">
          <span>add / edit</span>
        </v-btn>-->

        <!-- <div v-show="addedit" class="justify-center"> -->
        <!-- <v-btn dark v-on:click="toggleDone()" class="mt-10 ml-28">
            <span>cancel</span>
        </v-btn>-->

        <!-- </div> -->

        <!-- ----------------------------------------------------------------------------------------------------------- -->
        <!-- Dummy -->
        <v-container class="flex mb-40">
          <v-layout row warp>
            <v-row class="justify-center">
              <v-card dark flat height="520" width="auto" class="overflow-y-scroll pa-4 mt-10">
                <span class="text-lg white--text ml-8">ACCOUNT</span>

                <v-layout warp>
                  <v-row class="justify-center">
                    <div v-for="a in infoAccounts" :key="a.id">
                      <v-card flat height="auto" width="180" class="my-10 mx-4" color="#C0C0C0">
                        <v-card-text class="justify-center text-sm black--text">
                          <ul>
                            <li class="font-bold">Email:</li>
                            <li>{{ a.emailaddress }}</li>
                            <li class="pt-2 font-bold">Password:</li>
                            <li>{{ a.password }}</li>
                            <li class="pt-2 font-bold">Name:</li>
                            <li>{{ a.name }}</li>
                            <li class="pt-2 font-bold">Phone:</li>
                            <li>{{ a.phonenumber }}</li>
                            <li class="pt-2 font-bold">Date of Birth:</li>
                            <li>{{ a.DOB }}</li>
                            <li class="pt-2 font-bold">Address:</li>
                            <li>{{ a.address }}</li>
                          </ul>
                        </v-card-text>

                        <v-card-actions class="justify-center">
                          <v-btn @click="showAccount(a)" color="yellow darken-4" small>
                            <v-icon small>edit</v-icon>
                          </v-btn>
                          <v-btn @click="deleteAccount(a.user_id)" class color="red darken-4" small>
                            <v-icon small>delete</v-icon>
                          </v-btn>
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
                        <validation-provider v-slot="{ errors }" name="Email" rules="required">
                          <v-text-field
                            v-model="editEmailForm"
                            :error-messages="errors"
                            label="Email"
                            required
                            single-line
                            color="black"
                          ></v-text-field>
                        </validation-provider>

                        <validation-provider v-slot="{ errors }" name="Password" rules="required">
                          <v-text-field
                            v-model="editPasswordForm"
                            :error-messages="errors"
                            label="Password"
                            required
                            single-line
                            color="black"
                          ></v-text-field>
                        </validation-provider>

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

    <!-- <v-container class="flex mb-40">
      <v-layout row wrap>
        <v-flex xs12 sm6 md6 lg3 wrap v-for="uta in productInfo" :key="uta.id" justify-center>
          <v-card dark flat class="pa-2 w-44 h-auto my-10">
            <v-responsive>
              <img :src="uta.file" class="w-40 h-40" />
            </v-responsive>
            <v-card-text class="justify-center text-xs break-words white--text">
              <ul>
                <li>{{ uta.name }}</li>
                <li class="pt-2">{{ uta.band }}</li>
                <li class="pt-2">{{ uta.price }} yen</li>
                <li class="pt-2">{{ uta.des }}</li>
              </ul>
            </v-card-text>

            <v-card-actions class="justify-center">
              

              <v-btn
                @click.prevent="productInCart(uta)"
                
                color="#FFB6C1"
                small
              >
               
                <v-icon small>shopping_cart</v-icon>
              </v-btn>
            </v-card-actions>

            <v-card-actions class="justify-center">
              <v-btn @click="showProduct(uta)" color="yellow darken-4" small>
                <v-icon small>edit</v-icon>
              </v-btn>
              <v-btn @click="deleteProduct(uta.id)" color="red darken-4" small>
                <v-icon small>delete</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>

      <v-layout column wrap mt-8>
        <v-flex xs12 sm12 md12 lg12 wrap class="justify-center hidden-xs-only">
          <v-card flat class="pa-4 overflow-y-scroll" color="black" width="300" height="520">
            <span class="text-lg white--text">CART</span>

            <div v-for="cInfo in cartInfo" :key="cInfo.id">
              <v-card dark flat class="w-auto h-auto my-5" color="#C0C0C0">
                <v-layout wrap>
                  <v-card-text class="justify-start text-sm w-40 truncate white--text">
                    <span>{{ cInfo.name }}</span>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn @click="deleteCart(cInfo.id)" color="red darken-4">
                      <v-icon>delete</v-icon>
                    </v-btn>
                  </v-card-actions>
                </v-layout>
              </v-card>
            </div>

            <v-layout class="justify-center mt-4">
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    @click="$router.push('/billpage')"
                    v-bind="attrs"
                    v-on="on"
                    color="#FFB6C1"
                    dark
                  >
                    <v-icon>shopping_basket</v-icon>
                  </v-btn>
                </template>
                <span>Check Out</span>
              </v-tooltip>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>-->
    <Footer></Footer>
  </div>
</template>

<script>



import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import { required, max, max_value, numeric } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'
// import VueNumericInput from 'vue-numeric-input'

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
  //   props: [''],
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

      fileForm: null,
      addCart: '',
      cartInfo: [],
      productInfo: [],
      infoAccounts: [],
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
      // url: 'https://www.utastore.team:3006',
      url: 'http://localhost:3006',
      userList: [],

    }

  },

  components: {
    Navbar,
    Footer,
    ValidationProvider,
    ValidationObserver,
    // VueNumericInput,

  },

  computed: {

  },

  methods: {


    // disabled() {
    //   this.productInfo.name === this.cartInfo.name
    //   this.disabledbtn = true;
    // },

    // toggleDone() {
    //   this.addedit = !this.addedit
    // },

    clear() {
      this.$refs.observer.reset()
      this.editEmailForm = ''
      this.editPasswordForm = ''
      this.editNameForm = ''
      this.editPhoneForm = ''
      this.editDateForm = ''
      this.editAddressForm = ''

    },

    // uploadImage(p) {
    //   const varFile = p.target.files[0]
    //   //console.log(this.fileForm)
    //   if (varFile.type.includes('image')) {
    //     const readImage = new FileReader()
    //     readImage.onload = (e) => {
    //       this.i = e.target.result
    //     }
    //     this.fileForm = varFile
    //     readImage.readAsDataURL(varFile)
    //   }
    // },

    submitAccountForm() {
      this.$refs.observer.validate()

      // console.log(`productName: ${this.nameForm}`)
      // console.log(`bandName: ${this.bandForm}`)
      // console.log(`productPrice: ${typeof this.priceForm}`)
      // console.log(`productDes: ${this.desForm}`)
      // console.log(`image: ${this.fileForm}`)

      if (this.editEmailFormForm !== '' &&
        this.editPasswordForm !== '' &&
        this.editNameForm !== '' &&
        this.editPhoneForm !== '' &&
        this.editDateForm !== '' &&
        this.editAddressForm !== '') {
        // this.productInfo.push({
        //   name: this.nameForm,
        //   band: this.bandForm,
        //   price: this.priceForm,
        //   des: this.desForm

        // })
        // EDIT-2
        if (this.inEditMode) {
          this.editAccount({
            id: this.editId,
            email: this.editEmailForm,
            password: this.editPasswordForm,
            name: this.editNameForm,
            phone: this.editPhoneForm,
            date: this.editDateForm,
            address: this.editAddressForm,
          })
        }
        else {
          this.addNewAccountForm({
            email: this.editEmailForm,
            password: this.editPasswordForm,
            name: this.editNameForm,
            phone: this.editPhoneForm,
            date: this.editDateForm,
            address: this.editAddressForm,
          })
        }

      }
      this.editEmailForm = '',
        this.editPasswordForm = '',
        this.editNameForm = '',
        this.editPhoneForm = '',
        this.editDateForm = '',
        this.editAddressForm = ''

      requestAnimationFrame(() => {
        this.$refs.observer.reset();
      });
    },

    // POST

    async addNewAccountForm(newAccountForm) {
      try {
        const res = await fetch(this.accounturl, {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify({
            email: newAccountForm.email,
            password: newAccountForm.password,
            name: newAccountForm.name,
            phone: newAccountForm.phone,
            date: newAccountForm.date,
            address: newAccountForm.address,
          })
        })
        const data = await res.json()
        this.productInfo = [...this.productInfo, data]
      }
      catch (error) { console.log(`save failed: ${error}`) }
    },

    // productInCart(accountInfo) {
    //   this.editId = accountInfo.id
    //   this.nameForm = accountInfo.name
    //   this.bandForm = accountInfo.band
    //   this.priceForm = accountInfo.price
    //   this.desForm = accountInfo.des


    //   this.addNewProductToCart({
    //     id: this.editid,
    //     name: this.nameForm,
    //     band: this.bandForm,
    //     price: this.priceForm,
    //     des: this.desForm,
    //     totalPrice: this.priceForm,
    //     quantity: this.defaultQuantity

    //   })
    // },

    // async addNewProductToCart(newProductToCart) {
    //   for (let i = 0; i < this.cartInfo.length; i++) {
    //     if (this.cartInfo[i].name == newProductToCart.name) {
    //       return this.editQuantity(this.cartInfo[i])
    //     }
    //   }
    //   try {
    //     const res = await fetch(this.carturl, {
    //       method: 'POST',
    //       headers: {
    //         'content-type': 'application/json'
    //       },
    //       body: JSON.stringify({
    //         id: newProductToCart.id,
    //         name: newProductToCart.name,
    //         band: newProductToCart.band,
    //         price: newProductToCart.price,
    //         des: newProductToCart.des,
    //         totalPrice: newProductToCart.totalPrice,
    //         quantity: newProductToCart.quantity

    //       })
    //     })
    //     const data = await res.json()
    //     console.log(`${data.id}`)
    //     // this.disabledbtn = true;
    //     // this.editQuantity(newProductToCart)
    //     // res.fetchclose()

    //     this.cartInfo = [...this.cartInfo, data]
    //   }
    //   catch (error) { console.log(`add to cart failed: ${error}`), console.log(`${this.cartInfo[0].name}`) }

    //   //***
    // },
    // async editQuantity(newQuantity) {
    //   newQuantity.quantity++
    //   try {
    //     const res = await fetch(`${this.carturl}/${newQuantity.id}`, {
    //       method: 'PUT',
    //       headers: {
    //         'content-type': 'application/json'
    //       },
    //       body: JSON.stringify({
    //         id: newQuantity.id,
    //         name: newQuantity.name,
    //         band: newQuantity.band,
    //         price: newQuantity.price,
    //         des: newQuantity.des,
    //         quantity: newQuantity.quantity
    //       })
    //     })
    //     const data = await res.json()
    //     this.cartInfo = this.cartInfo.map(cInfo => cInfo.id === newQuantity.id ?
    //       {
    //         ...cInfo,

    //         name: data.name,
    //         band: data.band,
    //         price: data.price,
    //         des: data.des,
    //         quantity: data.quantity
    //       } : cInfo
    //     )
    //   }
    //   catch (error) { console.log(`add quantity to cart failed: ${error}`), console.log(`${this.cartInfo[0].name}`) }

    // },



    // GET

    async getAccount() {
      try {
        const res = await fetch(this.url + "/customers")
        const getaccountdata = await res.json()
        return getaccountdata

      }
      catch (error) { console.log(`get account failed: ${error}`) }
    },

    // DELETE

    async deleteAccount(deleteAccountId) {
      try {
        await fetch(`${this.url}/customers/${deleteAccountId}`, {
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
      this.editId = accountInfo.id
      this.editEmailForm = accountInfo.email
      this.editPasswordForm = accountInfo.password
      this.editNameForm = accountInfo.name
      this.editPhoneForm = accountInfo.phone
      this.editDateForm = accountInfo.date
      this.editAddressForm = accountInfo.address
    },

    async editAccount(newAccountInfo) {
      try {
        const res = await fetch(`${this.accounturl}/${newAccountInfo.id}`, {
          method: 'PUT',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify({
            email: newAccountInfo.email,
            password: newAccountInfo.password,
            name: newAccountInfo.name,
            phone: newAccountInfo.phone,
            date: newAccountInfo.date,
            address: newAccountInfo.address
          })
        })
        const data = await res.json()
        this.infoAccounts = this.infoAccounts.map(a => a.id === newAccountInfo.id ?
          {
            ...a,
            email: data.email,
            password: data.password,
            name: data.name,
            phone: data.phone,
            date: data.date,
            address: data.address
          } : a
        )
        this.inEditMode = false
        this.editId = ''
        this.editEmailForm = ''
        this.editPasswordForm = ''
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
    // this.productInfo = await this.getProductForm()
    // this.cartInfo = await this.getCartForm()
    this.infoAccounts = await this.getAccount()

  }

}
// const d = new Date(this.a.DOB);
//     let text = d.toString();
//      console.log(`text: ${text}`)
</script>
