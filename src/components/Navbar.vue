<template>
  <div class="navbar">
    <nav>
      <v-toolbar dark>
        <v-app-bar-nav-icon @click="switchLeftNavi = !switchLeftNavi"></v-app-bar-nav-icon>
        <v-toolbar-title class="headline">
          <span class="text-lightpink">uta STORE</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>

        <v-btn @click="$router.push('/billpage')">
          <v-icon left>shopping_basket</v-icon>
        </v-btn>

        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn @click="$router.push('/registerpage')" v-bind="attrs" v-on="on">
              <v-icon left>account_circle</v-icon>
            </v-btn>
          </template>
          <span>create account</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn @click="$router.push('/loginpage')" v-bind="attrs" v-on="on">
              <v-icon left>login</v-icon>
            </v-btn>
          </template>
          <span>Log In</span>
        </v-tooltip>
      </v-toolbar>

      <v-navigation-drawer app dark v-model="switchLeftNavi">
        <v-card dark class="mx-auto" max-width="auto" tile>
          <v-list dense>
            <v-list-item-group v-model="selectedHome" color="white" class="py-4">
              <v-list-item @click="$router.push('/')">
                <v-list-item-icon>
                  <v-icon>home</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Home</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>

            <v-list-item-group v-model="selectedAbout" color="white" class="py-4">
              <v-list-item @click="$router.push('/about')">
                <v-list-item-icon>
                  <v-icon>dashboard</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>About</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>

            <v-list-item-group v-model="selectedTeam" color="white" class="py-4">
              <v-list-item @click="$router.push('/team')">
                <v-list-item-icon>
                  <v-icon>person</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Team</v-list-item-title>
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

export default {
  name: 'Navbar',
  data() {
    return {
      switchLeftNavi: false,
      selectedHome: false,
      selectedAbout: false,
      selectedTeam: false
    }
  },
  components: {

  },
}
</script>
  