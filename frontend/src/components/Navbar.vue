<template>
  <div class="navbar">
    <nav>
      <v-toolbar dark xs2>
        <v-app-bar-nav-icon @click="switchLeftNavi = !switchLeftNavi"></v-app-bar-nav-icon>
        <v-toolbar-title class="headline">
          <span @click="$router.push('/')" class="text-lightpink hidden-xs-only">utaStore</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>

        <div v-if="this.userRole == 2">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn depressed @click="$router.push('/billpage')" v-bind="attrs" v-on="on">
                <v-icon small>shopping_basket</v-icon>
              </v-btn>
            </template>
            <span>Check Out</span>
          </v-tooltip>
        </div>
        <div v-if="this.userData != null">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn depressed @click="$router.push('/accountpage')" v-bind="attrs" v-on="on">
                <v-icon small>manage_accounts</v-icon>
              </v-btn>
            </template>
            <span>Manage Account</span>
          </v-tooltip>
        </div>

        <div v-if="this.userData == null">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn depressed @click="$router.push('/registerpage')" v-bind="attrs" v-on="on">
                <v-icon small>account_circle</v-icon>
              </v-btn>
            </template>
            <span>Create Account</span>
          </v-tooltip>
        </div>

        <div v-if="this.userData == null">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn depressed @click="$router.push('/loginpage')" v-bind="attrs" v-on="on">
                <v-icon small>login</v-icon>
              </v-btn>
            </template>
            <span>Log In</span>
          </v-tooltip>
        </div>
      
        <div v-if="this.userData != null">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn depressed @click="$router.push('/'), logOut()" v-bind="attrs" v-on="on">
                <v-icon small>logout</v-icon>
              </v-btn>
            </template>
            <span>Log Out</span>
          </v-tooltip>
        </div>        
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
  // recieve role form Home
  props: { role: null },
  data() {
    return {
      switchLeftNavi: false,
      selectedHome: false,
      selectedAbout: false,
      selectedTeam: false,
      userData: null,
      userRole: '',
      url: 'https://www.utastore.team:3006',
      // url: 'http://localhost:3006',
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
        this.$router.go(0);
      }
      catch (error) { console.log(`Log Out failed: ${error}`) }
    },

    async getUser() {
      if (document.cookie == null) { return }
      try {
        const res = await fetch(this.url + "/getuser", {
          credentials: 'include'
        })
        const getuserdata = await res.json()
        console.log(`usedata: ${typeof getuserdata} ${getuserdata.data.name}`)

        return getuserdata
      }
      catch (error) {
        console.log(`get user failed: ${error}`)

      }


      // console.log(`user: ${this.productInfo[0]}`)

    },
  },

  async created() {

    this.userData = await this.getUser();
    this.userRole = this.userData.data.role


    //  console.log(`type: ${this.userData.data}`)
  }
}
</script>
  