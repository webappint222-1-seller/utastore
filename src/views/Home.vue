<template>
<nav>
  <v-toolbar dark>
    <v-toolbar-title>
      <span>cd</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>

    <v-btn flat href="https://google.com" target="_blank">
      <span class="mr-2">Google</span>
    </v-btn>
    
    <v-btn>    
      <v-icon left>login</v-icon>      
      <span class="mr-2">Log In</span>
    </v-btn>
  </v-toolbar>
</nav>


</template>

<script>
  
  // import Member from '../components/Member'

  export default {
    name: 'Home',

    components: {
      
      // Member
    },
  }
</script>
