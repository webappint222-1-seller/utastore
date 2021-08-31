<template>
  <div class="home">
    <Navbar />
    <v-container class="flex">
      <v-flex xs12 sm12 md12 lg12 class="justify-center">
        <v-btn dark v-show="!addedit" v-on:click="toggleDone()">
          <span>add</span>
        </v-btn>

        <v-btn dark v-on:click="toggleDone()">
          <div v-show="addedit"></div>
          <span>cancel</span>
        </v-btn>
        <v-card dark class="w-80 h-auto mt-20">
          <v-card-text>
            <validation-observer ref="observer" v-slot="{ invalid }">
              <form>
                <validation-provider v-slot="{ errors }" name="Product Name" rules="required">
                  <v-text-field
                    v-model="nameForm"
                    :error-messages="errors"
                    label="Product Name"
                    required
                    single-line
                  ></v-text-field>
                </validation-provider>

                <validation-provider v-slot="{ errors }" name="Band Name" rules="required">
                  <v-text-field
                    v-model="bandForm"
                    :error-messages="errors"
                    label="Band Name"
                    required
                    single-line
                  ></v-text-field>
                </validation-provider>

                <validation-provider v-slot="{ errors }" name="Price" rules="required|numeric">
                  <v-text-field
                    v-model="priceForm"
                    :error-messages="errors"
                    label="Price"
                    required
                    single-line
                  ></v-text-field>
                </validation-provider>

                <validation-provider
                  v-slot="{ errors }"
                  name="Product Description"
                  rules="required|max:1000"
                >
                  <v-textarea
                    v-model="desForm"
                    :error-messages="errors"
                    :counter="1000"
                    label="Producr Description"
                    required
                    single-line
                  ></v-textarea>
                </validation-provider>

                <v-btn
                  class="mr-4"
                  @click.prevent="submitProductForm"
                  type="submit"
                  :disabled="invalid"
                >Submit</v-btn>
                <v-btn @click="clear">Clear</v-btn>
              </form>
            </validation-observer>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-container>
    <!-- Example -->
    <v-container class="flex">
      <v-layout row wrap>
        <v-flex xs12 sm12 md4 lg4 wrap v-for="i in products" :key="i.title" class="justify-center">
          <v-card dark flat class="pa-2 w-64 h-auto my-10">
            <v-responsive>
              <img :src="i.pic" class="w-60 h-60" />
            </v-responsive>
            <v-card-text class="justify-center text-sm break-words white--text">
              <ul>
                <li>{{ i.title }}</li>
                <li class="pt-2">{{ i.band }}</li>
                <li class="pt-2">{{ i.price }}</li>
                <li class="pt-2">{{ i.des }}</li>
              </ul>
            </v-card-text>
            <v-card-actions>
              <v-btn color="#FFB6C1">
                <v-icon>shopping_cart</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <!-- ---------------------------------------------------------------------------------------------------------- -->
    <v-container class="flex">
      <v-layout row wrap>
        <v-flex
          xs12
          sm12
          md4
          lg4
          wrap
          v-for="uta in productInfo"
          :key="uta.id"
          class="justify-center"
        >
          <v-card dark flat class="pa-2 w-64 h-auto my-10">
            <v-responsive>
              <!-- <img :src="e.pic" class="w-60 h-60" /> -->
            </v-responsive>
            <v-card-text class="justify-center text-sm break-words white--text">
              <ul>
                <li>{{ uta.name }}</li>
                <li class="pt-2">{{ uta.band }}</li>
                <li class="pt-2">{{ uta.price }}yen</li>
                <li class="pt-2">{{ uta.des }}</li>
              </ul>
            </v-card-text>
            <v-card-actions>
              <v-btn color="#FFB6C1">
                <v-icon>shopping_cart</v-icon>
              </v-btn>
              <v-btn color="yellow darken-4">
                <v-icon>edit</v-icon>
              </v-btn>
              <v-btn @click="deleteProduct(uta.id)" color="red darken-4">
                <v-icon>delete</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <Footer></Footer>
  </div>
</template>

<script>

import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import { required, max, numeric } from 'vee-validate/dist/rules'
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

extend('numeric', {
  ...numeric,
  message: '{_field_} must be number',
})

export default {
  name: 'Home',
  data() {
    return {
      products: [
        { title: "Sakaseya Sakase [Regular Edition]", band: "EGOIST", price: "1204yen", des: "Much anticipated new release featured as main theme to hit anime's theatrical release.", pic: "VVCL-1443.jpg" },
        { title: "Greatest Hits 2011-2017 Alter Ego [Regular Edition]", band: "EGOIST", price: "2778yen", des: "First greatest hits album of EGOIST featuring 15 titles (13 from anime series) in remastered edition.", pic: "VVCL-1155.jpg" },
        { title: "Kabaneri of the Iron Fortress [Regular Edition]", band: "EGOIST", price: "1204yen", des: "EGOIST brings the seventh single. The title song is an intro theme for the TV anime series Kabaneri of the Iron Fortress.", pic: "SRCL-9070.jpg" },
        { title: "RELOADED [Regular Edition]", band: "EGOIST", price: "1300yen", des: "New single release from Egoist is used as main theme for Project Itoh anime.", pic: "SRCL-8927.jpg" },
      ],
      addedit: false,
      cancel: false,
      nameForm: '',
      bandForm: '',
      priceForm: '',
      desForm: '',
      productInfo: [],
      url: 'http://localhost:5001/productInfo'

    }

  },

  components: {
    Navbar,
    Footer,
    ValidationProvider,
    ValidationObserver,
    // Member

  },

  computed: {

  },

  methods: {

    toggleDone() {
      this.addedit = !this.addedit
    },

    clear() {
      this.$refs.observer.reset()
      this.name = ''
      this.band = ''
      this.price = ''
      this.des = ''

    },

    submitProductForm() {
      this.$refs.observer.validate()
      this.nameErrors = this.nameForm === ''
      this.bandErrors = this.bandForm === ''
      this.priceErrors = this.priceForm === ''
      this.desErrors = this.desForm === ''

      console.log(`productName: ${this.nameForm}`)
      console.log(`bandName: ${this.bandForm}`)
      console.log(`productPrice: ${this.priceForm}`)
      console.log(`productDes: ${this.desForm}`)

      if (this.Formname !== '' &&
        this.bandForm !== '' &&
        this.priceForm !== '' &&
        this.desForm !== '') {
        // this.productInfo.push({
        //   name: this.nameForm,
        //   band: this.bandForm,
        //   price: this.priceForm,
        //   des: this.desForm

        // })
        this.addNewProductForm({
          name: this.nameForm,
          band: this.bandForm,
          price: this.priceForm,
          des: this.desForm
        })
      }
      this.nameForm = '',
        this.bandForm = '',
        this.priceForm = '',
        this.desForm = ''

      requestAnimationFrame(() => {
        this.$refs.observer.reset();
      });
    },

    // POST
    async addNewProductForm(newProductForm) {
      try {
        const res = await fetch(this.url, {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify({
            name: newProductForm.name,
            band: newProductForm.band,
            price: newProductForm.price,
            des: newProductForm.des
          })
        })
        const data = await res.json()
        this.productInfo = [...this.productInfo, data]
      }
      catch (error) { console.log(`save failed: ${error}`) }
    },

    // GET
    async getProductForm() {
      try {
        const res = await fetch(this.url)
        const getdata = await res.json()
        return getdata
      }
      catch (error) { console.log(`get failed: ${error}`) }
    },

    // DELETE
    async deleteProduct(deleteId) {
      try {
        await fetch(`${this.url}/${deleteId}`, {
          method: 'DELETE'
        })
        this.productInfo = this.productInfo.filter(uta => uta.id !== deleteId)
        this.reload()
      }
      catch (error) {
        console.log(`delete failed: ${error}`)
      }
    },

    async reload() {
      this.productInfo = await this.getProductForm()
    },



  },

  // GET
  async created() {
    this.productInfo = await this.getProductForm()

  }

}
</script>
