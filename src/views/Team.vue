<template>
  <div class="team">
    <Navbar />
    <Member />
  </div>
</template>

<script>

import Navbar from '@/components/Navbar.vue'
import Member from '@/components/Member.vue'

export default {
  name: 'Team',
  data() {
    return {
     

    }
  },
  components: {
    Navbar,
    Member

  },
}
</script>
