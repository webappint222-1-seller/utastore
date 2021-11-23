<template>
  <div class="bill">
    <Navbar />
    <v-container class="flex">
      <v-layout column>
        <v-flex xs12 sm12 md12 lg12 class="justify-center">
          <v-card flat class="pa-4 mt-10 overflow-y-scroll" dark color width="auto" height="600">
            <span class="text-lg white--text">SUMMARY</span>

            <div v-for="cInfo in cartInfo" :key="cInfo.id">
              <v-card flat class="w-80 h-auto mt-2" color="#C0C0C0">
                <v-layout>
                  <v-card-text class="text-sm black--text">
                    <ul class>
                      <li>
                        <span>Order Name: {{ cInfo.product_name }} By. {{ cInfo.band }}</span>
                      </li>
                      <li>
                        <span>Order Price: {{ cInfo.price }} yen</span>
                      </li>
                      <li>
                        <span>Total Order Price: {{ cInfo.total_price_product_id }} yen</span>
                      </li>
                      <li>
                        <span>Quantity: {{ cInfo.order_quantity }}</span>
                      </li>
                    </ul>
                  </v-card-text>
                </v-layout>

                <ul>
                  <li>
                    <template>
                      <vue-numeric-input
                        @change="editQuantityInCart(cInfo)"
                        v-model="cInfo.order_quantity"
                        :min="1"
                        :max="10"
                        :inputtable="false"
                        inline
                        align="center"
                        controls
                        class="ml-14 mb-2 bg-white text-black rounded-lg"
                      ></vue-numeric-input>
                    </template>
                  </li>
                  <li>
                    <v-btn @click="deleteCart(cInfo.order_id)" color="red darken-4" class="ml-24 mb-2">
                      <v-icon>delete</v-icon>
                    </v-btn>
                  </li>
                </ul>
              </v-card>
            </div>

            <v-card-text class="text-sm truncate white--text">
              <ul justify-center>
                <li class="mb-4 ml-20">
                  <v-btn v-on:click="confirmCart()" class="mr-12" color="#FFB6C1">
                    <v-icon>checklist</v-icon>
                  </v-btn>
                </li>

                <li class="mb-2 ml-6 text-xl">
                  <span>Total Quantity: {{ totalQuantity }} Piece</span>
                </li>
                <li class="ml-6 text-xl">
                  <span>Total Price: {{ totalPrice }} yen</span>
                </li>
              </ul>
            </v-card-text>
          </v-card>
        </v-flex>

        <v-flex xs12 sm12 md12 lg12 class="justify-center">
          <v-btn no-gutter dark @click="$router.push('/')" class="mt-10">
            <v-icon left>reply</v-icon>
            <span>BACK TO HOME</span>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-container>
    <Footer />
  </div>
</template>

<script>

import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import VueNumericInput from 'vue-numeric-input'
// import VueNumberInput from '@chenfengyuan/vue-number-input';

export default {
  name: 'Bill',
  data() {
    return {
      cartInfo: [],
      totalQuantity: 0,
      totalPrice: 0,
      // url: 'http://localhost:5001/productInfo',
      url: 'https://www.utastore.team:3006',
      carturl: 'http://localhost:5002/cartInfo',
      click: false,
      value: 1
      // q: ''

    }
  },
  components: {
    Navbar,
    Footer,
    VueNumericInput,
    // VueNumberInput

  },
  methods: {
    // async getCartForm() {
    //   try {
    //     const res = await fetch(this.carturl)
    //     const getcartdata = await res.json()
    //     return getcartdata

    //   }
    //   catch (error) { console.log(`get summary failed: ${error}`) }
    // },

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

    async deleteCart(deleteCartId) {
      try {
        await fetch(`${this.url}/checkoutdelete/${deleteCartId}`, {
          method: 'DELETE',
          
        })
        this.cartInfo = await this.getCartForm()
        this.cartInfo = this.cartInfo.filter(cInfo => cInfo.id !== deleteCartId)
        
      }
      catch (error) {
        console.log(`delete cart failed: ${error}`)
      }
    },

    async deleteAfterCart() {
      for (let i = 0; i < this.cartInfo.length; i++) {

        try {
          await fetch(`${this.carturl}/${this.cartInfo[i].id}`, {
            method: 'DELETE'
          })

        }
        catch (error) {
          console.log(`delete cart after failed: ${error}`)
        }
      }
    },


    async editQuantityInCart(newCartQuantity) {
      try {
        const res = await fetch(`${this.carturl}/${newCartQuantity.id}`, {
          method: 'PUT',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify({
            id: newCartQuantity.id,
            name: newCartQuantity.name,
            band: newCartQuantity.band,
            price: newCartQuantity.price,
            des: newCartQuantity.des,
            quantity: newCartQuantity.quantity,
            totalprice: newCartQuantity.price * newCartQuantity.quantity
          })
        })
        const data = await res.json()
        this.cartInfo = this.cartInfo.map(cInfo => cInfo.id === newCartQuantity.id ?
          {
            ...cInfo,

            name: data.name,
            band: data.band,
            price: data.price,
            des: data.des,
            quantity: data.quantity,
            totalprice: data.totalprice
          } : cInfo
        )
      }
      catch (error) { console.log(`add quantity to cart failed: ${error}`), console.log(`${this.cartInfo[0].name}`) }

    },

    show() {
      console.log(`show!!!`)
    },

    countPiece() {
      console.log(`in loop`)
      for (let i = 0; i < this.cartInfo.length; i++) {
        // let q = this.q
        this.totalQuantity += this.cartInfo[i].quantity
        this.click = true;
      }

    },

    countPrice() {
      console.log(`in price ${this.cartInfo[0].totalprice}`)
      for (let i = 0; i < this.cartInfo.length; i++) {
        this.totalPrice += this.cartInfo[i].totalprice
        this.click = true;
      }
    },

    confirmCart() {
      this.countPiece()
      this.countPrice()
      //  console.log(`email: ${infoRegister.email}`)
      this.$swal.fire({
        title: 'Are you sure?',
        html: `Total Quantity: ${this.totalQuantity} <br> Total Price: ${this.totalPrice}`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirm'
      }).then((result) => {
        if (result.isConfirmed) {
          this.$swal.fire(
            'success!',
            'Your purchase has been success.',
            'success'
          )
          this.deleteAfterCart()


        }

      })

    },

  },

  async created() {
    this.cartInfo = await this.getCartForm()

  }

}
</script>