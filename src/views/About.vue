<template>
  <div class="about">
    <Navbar/>
    <h1>This is an about page</h1>
    <Footer></Footer>

  </div>
</template>

<script>

  import Navbar from '@/components/Navbar.vue'
  import Footer from '@/components/Footer.vue'

  export default {
    name: 'About',
    data() {
      return {
        
      }
    },
    components: {
        Navbar,
        Footer
      
    },
  }
  </script>