<template>
<nav>
  <v-toolbar dark>
    <v-app-bar-nav-icon @click="switchLeftNavi=!switchLeftNavi"></v-app-bar-nav-icon>
    <v-toolbar-title class="headline">
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
  <v-navigation-drawer app dark v-model="switchLeftNavi">
    <p class= "white--text">123</p>
</v-navigation-drawer>
</nav>


</template>

<script>
  
  // import Member from '../components/Member'
  
  export default {
    name: 'Home',
    data() {
      return{
        switchLeftNavi:false
      }
    },

    components: {
      
      // Member
    
    },
  }
</script>
