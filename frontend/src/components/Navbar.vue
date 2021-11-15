<template>
  <div class="navbar">
    <nav>
      <v-toolbar dark xs2>
        <v-app-bar-nav-icon @click="switchLeftNavi = !switchLeftNavi"></v-app-bar-nav-icon>
        <v-toolbar-title class="headline">
          <span @click="$router.push('/')" class="text-lightpink hidden-xs-only">utaStore</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>

        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn depressed @click="$router.push('/billpage')" v-bind="attrs" v-on="on">
              <v-icon small>shopping_basket</v-icon>
            </v-btn>
          </template>
          <span>Check Out</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn depressed @click="$router.push('/accountpage')" v-bind="attrs" v-on="on">
              <v-icon small>manage_accounts</v-icon>
            </v-btn>
          </template>
          <span>Manage Account</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn depressed @click="$router.push('/registerpage')" v-bind="attrs" v-on="on">
              <v-icon small>account_circle</v-icon>
            </v-btn>
          </template>
          <span>Create Account</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn depressed @click="$router.push('/loginpage')" v-bind="attrs" v-on="on">
              <v-icon small>login</v-icon>
            </v-btn>
          </template>
          <span>Log In</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn depressed @click="$router.push('/'), logOut()" v-bind="attrs" v-on="on">
              <v-icon small>logout</v-icon>
            </v-btn>
          </template>
          <span>Log Out</span>
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
                  <v-list-item-title>About Us</v-list-item-title>
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
  emits: ['logout'],
  name: 'Navbar',
  data() {
    return {
      switchLeftNavi: false,
      selectedHome: false,
      selectedAbout: false,
      selectedTeam: false,
      url: 'https://www.utastore.team:3006',
    }
  },
  components: {

  },

  methods: {
    async logOut() {
      try {
        await fetch(this.url + "/clearuser", {
          method: 'POST',         
          credentials: 'include',         
        })
        this.$emit('logout')
      }
      catch (error) { console.log(`Log Out failed: ${error}`) }
    }


  }
}
</script>
  