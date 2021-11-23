<template>
  <div class="home">
    <Navbar />
    <v-container class="flex justify-center pt-10">
      <v-card class="pa-4 text-white" dark>
        <login @login-user="login" />
      </v-card>
    </v-container>
  </div>
</template>
  
  <script>
import Navbar from "@/components/Navbar.vue";
import Login from "@/components/Login.vue";


export default {
  emits: ['login-data'],
  name: "LoginPage",
  data() {
    return {
      // url: " http://localhost:5000/infoAccounts",
      url: 'https://www.utastore.team:3006',
      currentUser: null,
    };
  },
  components: {
    Navbar,
    Login,
    // Member
  },
  methods: {
    async fetchEmailPassword() {
      try {
        const res = await fetch(this.url);
        const data = await res.json();
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    // validateEmailPassword(EmailPassword) {
    //   console.log(EmailPassword.email);

    //   this.infoAccounts = this.infoAccounts.filter(
    //     (info) =>
    //       info.email == EmailPassword.email &&
    //       info.password == EmailPassword.password
    //   );
    //   if (this.infoAccounts.length !== 0) {
    //     if (
    //       this.infoAccounts[0].email == EmailPassword.email &&
    //       this.infoAccounts[0].password == EmailPassword.password
    //     ) {
    //       alert("Login Success");
    //       this.login = true;
    //       this.$router.push('/');
    //     }
    //   } else {
    //     alert("Login fail");
    //     location.reload();
    //   }
    //   console.log(this.infoAccounts);
    // },




    // confirmLogin(EmailPassword) {
    //   console.log(`email: ${typeof EmailPassword.email} ${EmailPassword.email}`)
    //   console.log(`pass: ${typeof EmailPassword.password} ${EmailPassword.password}`)
    //   console.log(`userList: ${Array.isArray(this.userList)} ${this.userList[0].emailaddress}`)

    //   // this.$swal.fire({
    //   // title: 'Are you sure?',
    //   // text: "You won't be able to revert this!",
    //   // icon: 'warning',
    //   // showCancelButton: true,
    //   // confirmButtonColor: '#3085d6',
    //   // cancelButtonColor: '#d33',
    //   // confirmButtonText: 'Confirm'
    //   // }).then((result) => {
    //   // if (result.isConfirmed) {
    //   this.userList = this.userList.filter(
    //     (info) =>
    //       info.emailaddress == EmailPassword.email &&
    //       info.password == EmailPassword.password
    //   );
    //   console.log(`email2: ${typeof EmailPassword.email} ${EmailPassword.email}`)
    //   console.log(`pass2: ${typeof EmailPassword.password} ${EmailPassword.password}`)

    //   if (this.userList.length !== 0) {
    //     console.log(`email2: ${EmailPassword.emailaddress}`)
    //     console.log(`userList: ${Array.isArray(this.userList)} ${this.userList}`)
    //     if (
    //       this.userList[0].emailaddress == EmailPassword.email &&
    //       this.userList[0].password == EmailPassword.password
    //     ) {

    //       // this.$swal.fire({
    //       // title: 'Login success!',
    //       // text: 'Your has been login.',
    //       // icon: 'success'
    //       // })

    //       const Toast = this.$swal.mixin({
    //         toast: true,
    //         position: 'top-end',
    //         showConfirmButton: false,
    //         timer: 2000,
    //         timerProgressBar: true,
    //         didOpen: (toast) => {
    //           toast.addEventListener('mouseenter', this.$swal.stopTimer)
    //           toast.addEventListener('mouseleave', this.$swal.resumeTimer)
    //         }
    //       })

    //       Toast.fire({
    //         icon: 'success',
    //         title: 'Login is successfully'
    //       })

    //       // const dataLogin = {
    //       //     dataEmail: this.userList.emailaddress  
    //       // }

    //       // this.$encodeURIComponent('login-data', dataLogin)
    //       this.$router.push('/');


    //     }
    //   } else {
    //     this.$swal.fire({
    //       // title: '<span class= "text-white"> Login failed! </span>',            
    //       // text: '<span class= "text-white"> Your email or password wrong please try again. </span>',              
    //       title: 'Login failed!',
    //       text: 'Your email or password wrong please try again.',
    //       icon: 'error',
    //       footer: '<a href="/registerpage" class= "font-bold text-lightpink"> Need to register? </a>',
    //       // background: 'black'            
    //     })
    //   }



    // },

     async getUser() {
      try {
        // console.log(`user: ${typeof this.currentUser}`)
        const res = await fetch(this.url + "/getuser", {

          
          credentials: 'include'
        })
        const getuserdata = await res.json()
        return getuserdata
      }
      catch (error) {
        console.log(`get user failed: ${error}`)

      }
      // console.log(`user: ${this.productInfo[0]}`)

      // for (let i = 0; i < this.userList.length; i++) {
      //   console.log(`user: ${this.userList[i]}`)
      // }
    },



    async login(emailPasword) {

      const formData = new FormData()
      formData.append('emailaddress', emailPasword.email)
      formData.append('password', emailPasword.password)

      try {
        await fetch(this.url + "/login", {
          method: 'POST',
          // headers: {
          //   'content-type': 'application/json'
          // },
          // body: JSON.stringify({
          //   product_name: this.nameForm,
          //   band_name: this.bandForm,         
          // })

          credentials: 'include',
          body: formData

        })      

        
        const res = await this.getUser()        

        const Toast = this.$swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', this.$swal.stopTimer)
            toast.addEventListener('mouseleave', this.$swal.resumeTimer)
          }
        })

        Toast.fire({
          icon: 'success',
          title: 'Login is successfully'
        })
        //to Home by param
        this.$router.push({path:'/', params: {data:res}});
        this.$router.params        

      }
      catch (error) { console.log(`login: ${error}`) }
      console.log(`email2: ${emailPasword.email}`)
      console.log(`password2: ${emailPasword.password}`)

    },


  },
  async created() {
    this.infoAccounts = await this.fetchEmailPassword();
    this.currentUse = await this.getUser();
  },
};
</script>