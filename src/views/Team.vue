<template>
  <div class="team">
    <Navbar/>
    <Member/>
    
    <Footer></Footer>
    </div>
  
</template>

<script>

import Navbar from '@/components/Navbar.vue'
import Member from '@/components/Member.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'Team',
  data() {
    return {
     

    }
  },
  components: {
    Navbar,
    Member,
    Footer
  
  },
}
</script>
