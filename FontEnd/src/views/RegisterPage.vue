<template>
    <div class="home">
      <Navbar />
      <v-container class="flex justify-center">
        <v-card class="pa-4 text-white" dark>
          <register @register-user="addNewRegister" />
        </v-card>
      </v-container>
    </div>
  </template>
  
  <script>
  import Navbar from "@/components/Navbar.vue";
  import Register from "@/components/Register.vue";
  
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
      Register,
      // Member
    },
    methods: {
      async fetchinfoRegister() {
        try {
          const res = await fetch(this.url);
          const data = await res.json();
          return data;
        } catch (error) {
          console.log(error);
        }
      },
      // validateInfo(infoRegister) {
  
      //   this.infoAccounts = this.infoAccounts.filter(
      //     (info) =>
      //       info.username == infoRegister.username &&
      //       info.password == infoRegister.password
      //   );
      //   if (this.infoAccounts.length !== 0) {
      //     if (
      //       this.infoAccounts[0].username == infoRegister.username
      //     ) {
      //       alert("Register Fail: this user have used");
      //       location.reload();
      //     }
      //   } else {
      //     alert("Registe success");
          
      //   }
      //   console.log(this.infoAccounts);
      // },
      async addNewRegister(infoRegister) {
      this.infoAccounts = this.infoAccounts.filter(
          (info) =>
            info.username == infoRegister.username &&
            info.password == infoRegister.password
        );
        if (this.infoAccounts.length !== 0) {
          if (
            this.infoAccounts[0].username == infoRegister.username
          ) {
            alert("Register Fail: this user have used");
            location.reload();
          }
        } else {
          alert("Registe success");
        const res = await fetch(this.url, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify({
            username: infoRegister.username,
            password: infoRegister.password,
            firstname: infoRegister.firstname,
            lastname: infoRegister.lastname,
            tel: infoRegister.tel
          })
        })
        const data = await res.json()
        this.infoResults = [...this.infoResults, data]
        alert("Registe success");
      }}, 
    },
    async created() {
      this.infoAccounts = await this.fetchinfoRegister();
    },
  };
  </script>