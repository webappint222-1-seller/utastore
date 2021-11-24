<template>
  <div class="home">
    <!-- sent role to Navbar -->
    <Navbar @logout="logOutLocal" :role="userRole" />
    <!-- <LoginPage @login-data="getEmail" hidden/> -->
    <GoTop :size="60" :radius="4" weight="bold" :bottom="200" :right="60" :boundary="800" fg-color="#FFB6C1" bg-color="#343434" ></GoTop>
    <v-container class="flex">
      <v-flex xs12 sm12 md12 lg12 class="justify-center">
        <!-- <div v-show="this.userList.role == 1"> -->
        <!-- <div v-for="user in userList" :key="user.name"> -->
        <!-- USER:{{ this.userList.name }}
        <br />
        -->      
        <div v-if="userRole == 1">
          <v-btn dark v-show="!addedit" v-on:click="toggleDone()" class="mt-10">
            <span>add / edit</span>
          </v-btn>

          <div v-show="addedit" class="justify-center">
            <v-btn dark v-on:click="toggleDone()" class="mt-10 ml-28">
              <span>cancel</span>
            </v-btn>
            <v-card dark class="w-80 h-auto mt-10">
              <v-card-text>
                <validation-observer ref="observer" v-slot="{ invalid }">
                  <form>
                    <validation-provider v-slot="{ errors }" name="Product Name" rules="required">
                      <v-text-field
                        v-model.trim="nameForm"
                        :error-messages="errors"
                        label="Product Name"
                        required
                        single-line
                      ></v-text-field>
                    </validation-provider>

                    <validation-provider v-slot="{ errors }" name="Band Name" rules="required">
                      <v-text-field
                        v-model.trim="bandForm"
                        :error-messages="errors"
                        label="Band Name"
                        required
                        single-line
                      ></v-text-field>
                    </validation-provider>

                    <validation-provider v-slot="{ errors }" name="Price" rules="required|numeric">
                      <v-text-field
                        v-model.number="priceForm"
                        :error-messages="errors"
                        label="Price"
                        required
                        single-line
                        type="number"
                      ></v-text-field>
                    </validation-provider>

                    <validation-provider
                      v-slot="{ errors }"
                      name="Product Description"
                      rules="required|max:200"
                    >
                      <v-textarea
                        v-model="desForm"
                        :error-messages="errors"
                        :counter="200"
                        label="Producr Description"
                        required
                        single-line
                      ></v-textarea>
                    </validation-provider>

                    <validation-provider v-slot="{ errors }" name="Product Image" rules="required">
                      <div class="grid grid-cols-4 ml-4">
                        <v-icon>mdi-camera</v-icon>
                        <input
                          :error-messages="errors"
                          type="file"
                          id="fileForm"
                          accept="image/png, image/jpeg"
                          ref="image"
                          name="image"
                          @change="uploadImage($event)"
                          class="mt-4 h-8 w-40 rounded border-black border-2"
                        />
                      </div>

                      <img :src="i" id="imgid" class="h-auto w-auto object-cover rounded my-4" />
                    </validation-provider>

                    <v-btn
                      class="mr-4"
                      @click="submitProductForm"
                      type="submit"
                      :disabled="invalid"
                    >Submit</v-btn>
                    <v-btn @click="clear">Clear</v-btn>
                  </form>
                </validation-observer>
              </v-card-text>
            </v-card>
          </div>
        </div>      
      </v-flex>
    </v-container>
    <!-- ----------------------------------------------------------------------------------------------------------- -->
    <!-- Dummy -->
    <!-- <v-container class="flex mb-40">
      <v-layout row wrap>
        <v-flex xs12 sm6 md6 lg3 wrap v-for="p in products" :key="p.title" class="justify-center">
          <v-card dark flat class="pa-2 w-44 h-auto my-10">
            <v-responsive>
              <img :src="p.pic" class="w-40 h-40" />
            </v-responsive>
            <v-card-text class="justify-center text-xs break-words white--text">
              <ul>
                <li>{{ p.title }}</li>
                <li class="pt-2">{{ p.band }}</li>
                <li class="pt-2">{{ p.price }}</li>
                <li class="pt-2">{{ p.des }}</li>
              </ul>
            </v-card-text>

            <v-card-actions>
              <v-btn @click="dummyProductInCart(p)" color="#FFB6C1">
                <v-icon>shopping_cart</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>-->

    <!---------------------------------------------------------------------------------------------------------------->

    <v-container class="flex mb-40">
      <v-layout row wrap>
        <v-flex xs12 sm6 md6 lg4 wrap v-for="uta in productInfo" :key="uta.id" justify-center>
          <v-card dark flat class="pa-2 w-52 h-auto my-10">
            <v-responsive class>
              <img :src="`${url}/upload/${uta.image}`" class="w-52 h-auto" />
            </v-responsive>

            <v-card-text class="justify-center text-xs break-words white--text">
              <ul>
                <li class="font-bold text-base">{{ uta.product_name }}</li>
                <li class="pt-2">{{ uta.band_name }}</li>
                <li class="pt-2 font-bold">{{ uta.price }} yen</li>
                <li class="pt-2">{{ uta.product_des }}</li>
              </ul>
            </v-card-text>

            

            <div v-if="userRole == 2">
              <v-card-actions class="justify-center">
                <v-btn @click.prevent="productInCart(uta),delay(),reloadCart()" color="#FFB6C1" small>
                  <v-icon small>shopping_cart</v-icon>
                </v-btn>
              </v-card-actions>
            </div>
          
            <div v-else-if="userRole == 1">
              <v-card-actions class="justify-center">
                <v-btn @click="showProduct(uta)" color="yellow darken-4" small>
                  <v-icon small>edit</v-icon>
                </v-btn>
                <v-btn @click="deleteProduct(uta.product_id)" color="red darken-4" small>
                  <v-icon small>delete</v-icon>
                </v-btn>
              </v-card-actions>
            </div>

            <div v-else>
              <v-card-actions class="justify-center">              
                <v-btn disabled color="#FFB6C1" small>
                  <v-icon small>shopping_cart</v-icon>
                </v-btn>
              </v-card-actions>
            </div>
           
          </v-card>
        </v-flex>
      </v-layout>

      <div v-if="userRole == 2">
      <v-layout column wrap mt-8>
        <v-flex cols xs12 sm12 md12 lg12 wrap class="justify-center hidden-xs-only">
          <v-responsive>
          <v-card flat class="ml-10 pa-4 overflow-y-scroll lg:w-80 w-60" color="black"  height="520">
            <span class="text-lg font-bold white--text">CART</span>

            <div v-for="cInfo in cartInfo" :key="cInfo.id">
              <v-card dark flat class="w-auto h-auto my-4 py-4" color="#C0C0C0">
                <v-layout wrap>
                  <v-row class="justify-center">
                    <v-card-text class="text-sm w-40  black--text">
                      <span class= "font-medium">{{ cInfo.product_name }}</span>
                    </v-card-text>
                    <v-card-text class="text-sm w-40 black--text">
                      <span class>Quantity: {{ cInfo.order_quantity }}</span>
                      
                    </v-card-text>

                    <v-card-actions class="">
                      <v-btn @click="deleteCart(cInfo.order_id)" color="red darken-4">
                        <v-icon>delete</v-icon>
                      </v-btn>
                    </v-card-actions>
                  </v-row>
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
          </v-responsive>
        </v-flex>
      </v-layout>
      </div>
    </v-container>
    <Footer></Footer>
  </div>
</template>

<!-- <style>
  @import '@/assets/styles/main.css';
</style> -->

<script>

import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
// import LoginPage from '@/views/LoginPage.vue'
import { required, max, max_value, numeric } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'
import GoTop from '@inotom/vue-go-top';
// import VueNumericInput from 'vue-numeric-input'
// import axios from 'axios';
// import mounted from 'vue';

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
  name: 'Home',
  props: [''],
  //Read First and data by param
  mounted() {
    if (this.$route.params.data == null) { return }
    this.userData = this.$route.params.data
    this.userRole = this.$route.params.data.role    
  },
  data() {
    return {
      products: [
        { title: "Sakaseya Sakase [Regular Edition]", band: "EGOIST", price: "1204yen", des: "Much anticipated new release featured as main theme to hit anime's theatrical release.", pic: "VVCL-1443.jpg", id: 1 },
        { title: "Greatest Hits 2011-2017 Alter Ego [Regular Edition]", band: "EGOIST", price: "2778yen", des: "First greatest hits album of EGOIST featuring 15 titles (13 from anime series) in remastered edition.", pic: "VVCL-1155.jpg", id: 2 },
        { title: "Kabaneri of the Iron Fortress [Regular Edition]", band: "EGOIST", price: "1204yen", des: "EGOIST brings the seventh single. The title song is an intro theme for the TV anime series Kabaneri of the Iron Fortress.", pic: "SRCL-9070.jpg", id: 3 },
        { title: "RELOADED [Regular Edition]", band: "EGOIST", price: "1300yen", des: "New single release from Egoist is used as main theme for Project Itoh anime.", pic: "SRCL-8927.jpg", id: 4 },
      ],
      addedit: false,
      cancel: false,
      nameForm: '',
      bandForm: '',
      priceForm: '',
      desForm: '',
      quanForm: '',
      defaultQuantity: 1,
      defaultEmail: 'kamolwish2000@gmail.com',

      fileForm: null,
      addCart: '',
      cartInfo: [],
      productInfo: [],
      userData: null,
      userRole: null,
      inEditMode: false,
      addCartMode: false,
      editId: '',
      addCartId: '',
      disabledbtn: false,
      cart: '',
      showEditProduct: null,

      i: 'https://files.catbox.moe/vq3v5e.png',
      // url: 'http://localhost:5001/productInfo',
      carturl: 'http://localhost:5002/cartInfo',
      url: 'https://www.utastore.team:3006',
      // url: 'https://utastore:3006',
    }

  },

  components: {
    Navbar,
    Footer,
    GoTop,
    // LoginPage,
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

    // getEmail(infoEmail) {
    //   infoEmail.emailaddress = this.defaEmail
    // },
    sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
    },
    async delay(){
      await this.sleep(500);
    },
    logOutLocal() {
      this.userData = null
    },
    
    toggleDone() {
      this.addedit = !this.addedit
    },

    clear() {
      this.$refs.observer.reset()
      this.nameForm = ''
      this.bandForm = ''
      this.priceForm = ''
      this.desForm = ''
      var editImage = document.getElementById("imgid")
      editImage.src = ''
    },

    uploadImage(event) {
      const imgFile = event.target.files[0]
      console.log(event.target)
      if (imgFile.type.includes('image')) {
        const readImage = new FileReader()
        readImage.onload = (e) => {
          this.i = e.target.result
        }
        this.fileForm = imgFile
        readImage.readAsDataURL(imgFile)
      }
    },

    submitProductForm() {
      this.$refs.observer.validate()
      this.$refs.observer.reset()
      // this.nameErrors = this.nameForm === ''
      // this.bandErrors = this.bandForm === ''
      // this.priceErrors = this.priceForm === ''
      // this.desErrors = this.desForm === ''
      // this.fileErrors = this.fileForm === null


      console.log(`productName: ${typeof this.nameForm} ${this.nameForm}`)
      console.log(`bandName: ${typeof this.bandForm} ${this.bandForm}`)
      console.log(`productPrice: ${typeof this.priceForm} ${this.priceForm}`)
      console.log(`productDes: ${typeof this.desForm} ${this.desForm}`)
      console.log(`image: ${this.fileForm}`)

      if (this.nameForm !== '' &&
        this.bandForm !== '' &&
        this.priceForm !== '' &&
        this.desForm !== ''
      ) {
        // this.productInfo.push({
        //   name: this.nameForm,
        //   band: this.bandForm,
        //   price: this.priceForm,
        //   des: this.desForm

        // })
        // EDIT-2
        if (this.inEditMode) {
          this.editProduct({
            // id: this.editId,
            // name: this.nameForm,
            // band: this.bandForm,
            // price: this.priceForm,
            // des: this.desForm
          })
        }
        else {
          this.addNewProductForm({
            product_name: this.nameForm,
            band_name: this.bandForm,
            price: this.priceForm,
            product_des: this.desForm,
            image: this.fileForm
            // file: this.fileForm
          })
        }

      }
      this.nameForm = '',
        this.bandForm = '',
        this.priceForm = '',
        this.desForm = '',
        this.fileForm = null
      var editImage = document.getElementById("imgid")
      editImage.src = ''

      requestAnimationFrame(() => {
        this.$refs.observer.reset();
      });
    },

    // POST
    async addNewProductForm() {
      // const inputData = JSON.stringify({
      //   product_name: this.nameForm,
      //   band_name: this.bandForm,
      //   price: this.priceForm,
      //   product_des: this.desForm,
      //   // image: this.fileForm,
      // })

      const formData = new FormData()
      formData.append('image', this.fileForm)
      formData.append('product_name', this.nameForm)
      formData.append('band_name', this.bandForm)
      formData.append('price', this.priceForm)
      formData.append('product_des', this.desForm)


      try {
        const res = await fetch(this.url + "/formdataupload", {
          method: 'POST',
          credentials: 'include',
          // headers: {
          //   'content-type': 'application/json'
          // },
          // body: JSON.stringify({
          //   product_name: this.nameForm,
          //   band_name: this.bandForm,
          //   price: this.priceForm,
          //   product_des: this.desForm,
          // })

          body: formData

        })
        const data = await res.json()
        this.productInfo = [...this.productInfo, data]

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
          title: 'Add new product successfully'
        })        
        this.reloadProduct()
      }
      catch (error) { console.log(`save failed: ${error}`) }
    },

    productInCart(utaInfo) {     
      this.priceForm = utaInfo.price
      this.product_id = utaInfo.product_id
      this.nameForm = utaInfo.product_name

    // console.log(`cartPrice: ${typeof this.priceForm} ${this.priceForm}`)
    // console.log(`cartQuantity: ${typeof utaInfo.quantity} ${utaInfo.quantity}`)
      this.addNewProductToCart({        
        order_price: this.priceForm,
        order_quantity: this.defaultQuantity,
        product_id: this.product_id,
        product_name: this.nameForm,
        // userEmail: this.defaultEmail
      })
    },

    async addNewProductToCart() {

      const formData = new FormData()      
      formData.append('order_price', this.priceForm)
      formData.append('order_quantity', this.defaultQuantity)
      formData.append('product_id', this.product_id)
      formData.append('product_name', this.nameForm)    
       console.log(`----`)
      console.log(`priceincart: ${this.priceForm}`)
      console.log(`quantityincart: ${this.defaultQuantity}`)
      console.log(`productId: ${this.product_id}`)
      

      for (let i = 0; i < this.cartInfo.length; i++) {
        if (this.cartInfo[i].product_name == this.nameForm) {
          console.log(`productName2: ${this.nameForm}`)
          return this.editQuantity(this.cartInfo[i])
        }
      }
      try {
          await fetch(this.url + "/checkout", {
          method: 'POST',
          credentials: 'include',
          // headers: {
          //   'content-type': 'application/json'
          // },
          // body: JSON.stringify({
          //   id: newProductToCart.id,
          //   name: newProductToCart.name,
          //   band: newProductToCart.band,
          //   price: newProductToCart.price,
          //   des: newProductToCart.des,
          //   totalprice: newProductToCart.totalprice,
          //   quantity: newProductToCart.quantity,
            // userEmail: newProductToCart.defaultEmail
            

          // })
          body: formData
        })  
        console.log(`productName: ${this.nameForm}`)
        this.cartInfo = await this.getCartForm()
        // const data = await res.json()
        // console.log(`dataid:${data.id}`)
        // this.disabledbtn = true;
        // this.editQuantity(newProductToCart)
        // res.fetchclose()

        // this.cartInfo = [...this.cartInfo, data]

        const Toast = this.$swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', this.$swal.stopTimer)
            toast.addEventListener('mouseleave', this.$swal.resumeTimer)
          }
        })

        Toast.fire({
          icon: 'success',
          title: 'Add to cart successfully'
        })
      }
      catch (error) { console.log(`add to cart failed: ${error}`) }


    },
    async editQuantity(product) {
      product.order_quantity ++
      product.total_price_product_id = product.order_price * product.order_quantity
      const formData = new FormData()      
      formData.append('order_quantity', product.order_quantity)
      formData.append('total_price_product_id', product.total_price_product_id)
      formData.append('order_id', product.order_id)

      console.log(`orderId: ${product.order_id}`)

      try {
          await fetch(`${this.url}/checkoutedit/${product.order_id}`, {
          method: 'PUT',
        
          
          // headers: {
          //   'content-type': 'application/json'
          // },
          // body: JSON.stringify({
          //   id: newQuantity.id,
          //   name: newQuantity.name,
          //   band: newQuantity.band,
          //   price: newQuantity.price,
          //   des: newQuantity.des,
          //   quantity: newQuantity.quantity,
          //   totalprice: newQuantity.price * newQuantity.quantity
          // })
          body: formData
        })
      }
      catch (error) { console.log(`add quantity to cart failed: ${error}`), console.log(`${this.cartInfo[0].name}`) }

    },



    // GET
    async getProductForm() {
      try {
        const res = await fetch(this.url + "/products")
        const getdata = await res.json()
        return getdata
      }
      catch (error) { console.log(`get product failed: ${error}`) }
    },

    async getCartForm() {
      try {
        const res = await fetch(this.url + "/getcheckoutbyid", {
          credentials: 'include'
        })
        const getcartdata = await res.json()
        
        // console.log(`cartdata: ${typeof getcartdata} ${getcartdata.quantity}`)
        return getcartdata
        

      }
      catch (error) { console.log(`get cart failed: ${error}`) }
    },

    //only check have cookie?
    async getUser() {
      if (document.cookie == null) { return }
      try {
        const res = await fetch(this.url + "/getuser", {
          credentials: 'include'
        })
        const getuserdata = await res.json()
        console.log(`usedata: ${typeof getuserdata} ${getuserdata.data.name}`)

        return getuserdata
      }
      catch (error) {
        console.log(`get user failed: ${error}`)

      }


      // console.log(`user: ${this.productInfo[0]}`)

    },
  
    // DELETE
    async deleteProduct(deleteId) {
      try {
        await fetch(`${this.url}/products/${deleteId}`, {
          method: 'DELETE',
          // credentials: 'include'
        })
        // this.productInfo = this.productInfo.filter(uta => uta.id !== deleteId)
        this.reloadProduct()
      }
      catch (error) {
        console.log(`delete failed: ${error}`)
      }
    },

    async deleteCart(deleteCartId) {
      try {
        await fetch(`${this.url}/checkoutdelete/${deleteCartId}`, {
          method: 'DELETE',
          
        })
        
        // this.cartInfo = this.cartInfo.filter(cInfo => cInfo.id !== deleteCartId)
        this.cartInfo = await this.getCartForm()
      }
      catch (error) {
        console.log(`delete cart failed: ${error}`)
      }
    },

    async reloadProduct() {
      this.productInfo = await this.getProductForm()
    },
    
    async reloadCart() {
      this.cartInfo = await this.getCartForm()
    },

    // EDIT
    showProduct(utaInfo) {
      this.inEditMode = true
      this.editId = utaInfo.product_id
      this.nameForm = utaInfo.product_name
      this.bandForm = utaInfo.band_name
      this.priceForm = utaInfo.price
      this.desForm = utaInfo.product_des
      this.imgFile = utaInfo.image
      this.showEditProduct = utaInfo
      var editImage = document.getElementById("imgid")
      editImage.src = this.url + "/upload/" + utaInfo.image

      // console.log(`info: ${utaInfo}`)
      // console.log(`id: ${utaInfo.product_id}`)
      // console.log(`name: ${utaInfo.product_name}`)
      // console.log(`band: ${utaInfo.band_name}`)
      // console.log(`price: ${utaInfo.price}`)
      // console.log(`des: ${utaInfo.product_des}`)
      // console.log(`file: ${utaInfo.image}`)
      // console.log(`showedit: ${this.showEditProduct.product_id}`)

    },

    async editProduct() {

      // const editedData =
      //   JSON.stringify({
      //     product_name: this.nameForm,
      //       band_name: this.bandForm,
      //       price: this.priceForm,
      //       product_des: this.desForm,
      //   })

      //   const formData = new FormData()
      //   formData.append('newproduct', editedData)

      const formData = new FormData()
      formData.append('image', this.fileForm)
      formData.append('product_name', this.nameForm)
      formData.append('band_name', this.bandForm)
      formData.append('price', this.priceForm)
      formData.append('product_des', this.desForm)

      console.log(`productName: ${typeof this.nameForm} ${this.nameForm}`)
      console.log(`bandName: ${typeof this.bandForm} ${this.bandForm}`)
      console.log(`productPrice: ${typeof this.priceForm} ${this.priceForm}`)
      console.log(`productDes: ${typeof this.desForm} ${this.desForm}`)
      console.log(`image: ${this.fileForm}`)


      try {
        console.log(`id2: ${this.editId}`)
        await fetch(`${this.url}/productupdate/${this.editId}`, {
          method: 'PUT',
          // credentials: 'include',
          // headers: {
          //   'content-type': 'application/json'
          // },
          // body: JSON.stringify({
          //   product_name: this.nameForm,
          //   band_name: this.bandForm,
          //   price: this.priceForm,
          //   product_des: this.desForm,
          // })

          body: formData
        })

        // const data = await res.json()
        // this.productInfo = this.productInfo.map(uta => uta.id === this.editId ?
        //   {
        //     ...uta,
        //     product_name: data.product_name,
        //     band_name: data.band_name,
        //     price: data.price,
        //     product_des: data.product_des,
        //     image: data.image
        //   } : uta
        // )      

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
          title: 'Edit product successfully'
        })

        this.$refs.observer.reset()
        this.reloadProduct()

        this.inEditMode = false
        this.editId = ''
        this.nameForm = ''
        this.bandform = ''
        this.priceForm = ''
        this.desForm = ''
        this.fileForm = null
        var editImage = document.getElementById("imgid")
        editImage.src = ''



      }
      catch (error) {
        console.log(`edit failed: ${error}`)
      }
    },
  },

  // GET-2
  async created() {
    this.productInfo = await this.getProductForm()       
    this.userData = await this.getUser();
    this.userRole = this.userData.data.role
    this.cartInfo = await this.getCartForm(); 

    //  console.log(`type: ${this.userData.data}`)
  }

}
</script>
