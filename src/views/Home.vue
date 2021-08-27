<template>
  <div class="home">
    <Navbar />
    <v-container class="flex">
      <v-layout row wrap>
        <v-flex xs12 sm12 md4 lg4 wrap v-for="i in items" :key="i.title" class="justify-center">
          <v-card dark flat class="pa-2 w-64 h-auto mt-20">
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
              <v-btn color="primary">
                <v-icon>shopping_cart</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>

import Navbar from '@/components/Navbar.vue'

export default {
  name: 'Home',
  data() {
    return {
      items: [
        { title: "Sakaseya Sakase [Regular Edition]", band: "EGOIST", pic: "VVCL-1443.jpg" },
        { title: "Greatest Hits 2011-2017 Alter Ego [Regular Edition]", band: "EGOIST", price: "2778yen", des: "First greatest hits album of EGOIST featuring 15 titles (13 from anime series) in remastered edition.", pic: "VVCL-1155.jpg" },
        { title: "Kabaneri of the Iron Fortress [Regular Edition]", band: "EGOIST", pic: "SRCL-9070.jpg" },
        { title: "RELOADED [Regular Edition]", band: "EGOIST", pic: "SRCL-8927.jpg" },
      ]

    }
  },
  components: {
    Navbar
    // Member

  },
}
</script>
