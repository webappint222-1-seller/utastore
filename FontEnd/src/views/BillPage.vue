<template>
  <div class="bill">
    <Navbar />
    <v-container class="flex">
      <v-layout column>
        <v-flex xs12 sm12 md12 lg12 class="justify-center">
          <v-card flat class="pa-4 mt-10 overflow-y-scroll" color="black" width="auto" height="600">
            <span class="text-lg white--text">SUMMARY</span>

            <div v-for="cInfo in cartInfo" :key="cInfo.id">
              <v-card dark flat class="w-80 h-auto my-5" color="#C0C0C0">
                <v-layout>
                  <v-card-text class="text-sm white--text">
                    <ul class>
                      <li>
                        <span class>Order Number: {{ cInfo.id }}</span>
                      </li>
                      <li>
                        <span class>Order Name: {{ cInfo.name }} By. {{ cInfo.band }}</span>
                      </li>
                      <li>
                        <span class>Order Price: {{ cInfo.price }} yen</span>
                      </li>
                    </ul>
                  </v-card-text>

                  <!-- <v-card-actions>
                    <v-btn @click="deleteCart(cInfo.id)" color="red darken-4">
                      <v-icon>delete</v-icon>
                    </v-btn>
                  </v-card-actions>-->
                </v-layout>
              </v-card>
            </div>

            <v-card-text class="text-sm truncate white--text">
              <ul>
                <li class= "mb-4 ml-20">
                  <v-btn
                    v-on:click="countPiece(), countPrice()"
                    :disabled="click"
                    class="mr-12"
                    color="#FFB6C1"
                  >
                    <v-icon>checklist</v-icon>
                  </v-btn>
                </li>

                <li class="mb-4 ml-10">
                  <span>Total Quantity: {{ totalQuantity }} Piece</span>
                </li>
                <li class="ml-10">
                  <span>Total Price: {{ totalPrice }} yen</span>
                </li>

                <!-- <li>
                  <v-btn :disabled="clickPrice" class= "mr-12">
                  <v-icon>attach_money</v-icon>
                  <h1 v-on:click="countPrice()">{{ totalPrice }}</h1>
                </v-btn>
                  <span>Total Price: {{ totalPrice }} yen</span>
                </li>-->
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
  </div>
</template>

<script>

import Navbar from '@/components/Navbar.vue'

export default {
  name: 'Bill',
  data() {
    return {
      cartInfo: [],
      totalQuantity: 0,
      totalPrice: 0,
      url: 'http://localhost:5001/productInfo',
      carturl: 'http://localhost:5002/cartInfo',
      click: false,
    }
  },
  components: {
    Navbar

  },
  methods: {
    async getCartForm() {
      try {
        const res = await fetch(this.carturl)
        const getcartdata = await res.json()
        return getcartdata

      }
      catch (error) { console.log(`get summary failed: ${error}`) }
    },

    countPiece() {
      console.log(`in loop`)

      for (let i = 0; i < this.cartInfo.length; i++) {
        this.totalQuantity += 1
        this.click = true;
      }

    },

    countPrice() {
      console.log(`in price`)
      for (let i = 0; i < this.cartInfo.length; i++) {
        this.totalPrice += this.cartInfo[i].price
        this.click = true;
      }
    },

  },

  async created() {
    this.cartInfo = await this.getCartForm()

  }

}
</script>