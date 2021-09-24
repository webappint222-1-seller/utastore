<template>
    <div class="home">
      <Navbar />
      <v-container class="flex justify-center">
        <v-card class="pa-4 text-white" dark>
          <login @login-user="validateUsernamePassword" />
        </v-card>
      </v-container>
    </div>
  </template>
  
  <script>
  import Navbar from "@/components/Navbar.vue";
  import Login from "@/components/Login.vue";
  
  export default {
    name: "Home",
    data() {
      return {
        url: " http://localhost:5000/infoAccounts",
        infoAccounts: [],
      };
    },
    components: {
      Navbar,
      Login,
      // Member
    },
    methods: {
      async fetchUsernamePassword() {
        try {
          const res = await fetch(this.url);
          const data = await res.json();
          return data;
        } catch (error) {
          console.log(error);
        }
      },
      validateUsernamePassword(UsernamePassword) {
        console.log(UsernamePassword.username);
  
        this.infoAccounts = this.infoAccounts.filter(
          (info) =>
            info.username == UsernamePassword.username &&
            info.password == UsernamePassword.password
        );
        if (this.infoAccounts.length !== 0) {
          if (
            this.infoAccounts[0].username == UsernamePassword.username &&
            this.infoAccounts[0].password == UsernamePassword.password
          ) {
            alert("Login Success");
            this.login = true;
          }
        } else {
          alert("Login fail");
          location.reload();
        }
        console.log(this.infoAccounts);
      },
    },
    async created() {
      this.infoAccounts = await this.fetchUsernamePassword();
    },
  };
  </script>