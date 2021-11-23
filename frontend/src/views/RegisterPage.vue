<template>
  <div class="home">
    <Navbar />
    <v-container class="flex justify-center pt-10">
      <v-card class="pa-4 text-white" dark>
        <register @register-user="confirmRegis" />
        <!-- <v-card>
        <button @click="confirm()">
          test
        </button>
        </v-card>-->
      </v-card>
    </v-container>
  </div>
</template>
  
  <script>
import Navbar from "@/components/Navbar.vue";
import Register from "@/components/Register.vue";

export default {
  name: "RegisterPage",
  data() {
    return {
      // url: " http://localhost:5000/infoAccounts",
      url: 'https://www.utastore.team:3006',      
      userList: [],
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

    confirmRegis(infoRegister) {
      // this.$refs.observer.validate()
      console.log(`email: ${infoRegister.emailaddress}`)
      this.$swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirm'
      }).then((result) => {
        if (result.isConfirmed) {
          // console.log(`account: ${Array.isArray(this.infoAccounts)} ${this.infoAccounts.length}`)
          console.log(`regis: ${Array.isArray(infoRegister)} ${infoRegister.emailaddress}`)
          console.log(`userList: ${Array.isArray(this.userList)} ${this.userList}`)
          // console.log(`infoAccounts: ${this.infoAccounts[0].emailaddress}`)
          // console.log(`value: ${this.infoAccounts = this.infoAccounts.filter((info) => info.emailaddress == infoRegister.emailaddress)}`)
          this.userList = this.userList.filter(
            (info) =>
              info.emailaddress == infoRegister.emailaddress
            // info.password == infoRegister.password
          );

          if (this.userList.length !== 0) {
            if (
              this.userList[0].emailaddress == infoRegister.emailaddress
            ) {
              this.$swal.fire(
                'Register failed!',
                'Your email has used please try again.',
                'error'
              )
              // location.reload();
            }
          } else {
            this.addNewRegister(infoRegister)
            this.$swal.fire(
              'Registered!',
              'Your has been registered.',
              'success'
            )
            this.$router.push('/loginpage');
          }
        }
      })
    },


    async addNewRegister(infoRegister) {

      // this.infoAccounts = this.infoAccounts.filter(
      //   (info) =>
      //     info.email == infoRegister.email
      //   // info.password == infoRegister.password
      // );
      // if (this.infoAccounts.length !== 0) {
      //   if (
      //     this.infoAccounts[0].email == infoRegister.email
      //   ) {
      //     // this.$alert("Register Fail: this user have used");
      //     location.reload();
      //   }
      // } else {
      // this.$alert("Registe success");

      console.log(`email: ${typeof infoRegister.emailaddress} ${infoRegister.emailaddress}`)
      console.log(`pass: ${typeof infoRegister.password} ${infoRegister.password}`)
      console.log(`name: ${typeof infoRegister.name} ${infoRegister.name}`)
      console.log(`phone: ${typeof infoRegister.phonenumber} ${infoRegister.phonenumber}`)
      console.log(`dob: ${typeof infoRegister.dob} ${infoRegister.dob}`)
      console.log(`address: ${typeof infoRegister.address} ${infoRegister.address}`)

      const formData = new FormData()
      formData.append('emailaddress', infoRegister.emailaddress)
      formData.append('password', infoRegister.password)
      formData.append('name', infoRegister.name)
      formData.append('phonenumber', infoRegister.phonenumber)
      formData.append('dob', infoRegister.dob)
      formData.append('address', infoRegister.address)

      const res = await fetch(this.url + "/formdatausersupload", {
        method: 'POST',
        // headers: {
        //   'Content-type': 'application/json'
        // },
        // body: JSON.stringify({
        //   emailaddress: this.emailaddress,
        //   password: this.password,
        //   name: this.name,
        //   phonenumber: this.phonenumber,
        //   DOB: this.DOB,
        //   address: this.address
        // })
        body: formData
      })
      const data = await res.json()
      this.infoResults = [...this.infoResults, data]
      // this.$alert("Registe success");
      console.log(`save`)
      // this.$refs.observer.validate()
    }
    ,
    async getAllUser() {
      try {
        const res = await fetch(this.url + "/getalluser", {
          credentials: 'include'
        })
        const getuserdata = await res.json()
        return getuserdata
      }
      catch (error) {
        console.log(`get user failed: ${error}`)

      }


      // console.log(`user: ${this.productInfo[0]}`)

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
    // this.$confirm("Are you sure?").then(() => {

  },

  async created() {
    this.infoAccounts = await this.fetchinfoRegister();
    this.userList = await this.getAllUser();
  },
};

</script>

