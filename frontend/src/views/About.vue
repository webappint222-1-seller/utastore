<template>
  <div class="about">
    <Navbar/>    
    <AboutUs />
    <Footer></Footer>

  </div>
</template>

<script>

  import Navbar from '@/components/Navbar.vue'
  import Footer from '@/components/Footer.vue'
  import AboutUs from '@/components/AboutUs.vue'

  export default {
    name: 'About',
    data() {
      return {
        
      }
    },
    components: {
        Navbar,
        Footer,
        AboutUs
      
    },
  }
  </script>