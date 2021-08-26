<template>

  <div class="home">
    <Navbar/>
    <v-container class="flex justify-center">
      <v-card class="pa-4 white">
      <p>123</p>
      </v-card>
    </v-container>
  </div>
  
</template>

<script>

import Navbar from '@/components/Navbar.vue'

export default {
  name: 'Home',
  data() {
    return {
      
    }
  },
  components: {
      Navbar
    // Member

  },
}
</script>
