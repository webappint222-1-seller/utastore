<template>
    <div class="navbar">
      <nav>
        <v-toolbar dark>
          <v-app-bar-nav-icon @click="switchLeftNavi = !switchLeftNavi"></v-app-bar-nav-icon>
          <v-toolbar-title class="headline">
            <span class="text-lightpink"> CD-STORE</span>
          </v-toolbar-title>
          <v-spacer></v-spacer>
  
          <!-- <v-btn flat href="https://google.com" target="_blank">
        <span class="mr-2">Google</span>
      </v-btn>
          -->
          <v-btn>
            <v-icon left>login</v-icon>
            <span class="mr-2">Log In</span>
          </v-btn>
        </v-toolbar>
  
        <v-navigation-drawer app dark v-model="switchLeftNavi">
          <v-card dark class="mx-auto" max-width="auto" tile>
            <v-list dense>
              <v-list-item-group v-model="selectedHome" color="white">
                <v-list-item @click="$router.push('/')">
                  <v-list-item-icon>
                    <v-icon>home</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title >Home</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
  
              <v-list-item-group v-model="selectedAbout" color="white" >
                <v-list-item @click="$router.push('/about')">
                  <v-list-item-icon>
                    <v-icon>dashboard</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title >About</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
  
              <v-list-item-group v-model="selectedTeam" color="white">
                <v-list-item @click="$router.push('/team')">
                  <v-list-item-icon>
                    <v-icon>person</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title >Team</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card>
        </v-navigation-drawer>
      </nav>
    </div>
  </template>
  
  <script>
  // import HelloWorld from '@/components/HelloWorld.vue'
  
  export default {
    name: 'Home',
    data() {
      return {
        switchLeftNavi: false,
        selectedHome: false,
        selectedAbout: false,
        selectedTeam: false
      }
    },
    components: {
  
      // Member
  
    },
  }
  </script>
  