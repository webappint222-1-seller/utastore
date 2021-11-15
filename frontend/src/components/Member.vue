<template>
  <div class="member">
    <v-container class= "flex">
      <v-flex xs12 sm12 md12 lg12 justify-center>
    <v-card dark class= "w-40 my-10 justify-center">
    <span class="justify-center flex text-xl text-white">Members</span>
    </v-card>
    </v-flex>
    </v-container>
    <v-layout flex-row wrap justify-center>
      <!-- <v-row justify="center"> -->
      <v-flex xs8 sm8 md8 lg8>
        <v-expansion-panels accordion dark>
          <v-expansion-panel v-for="member in members" :key="member.id">
            <v-expansion-panel-header class="text-xl">{{ member.name }}</v-expansion-panel-header>
            <v-expansion-panel-content class="text-xl">
              <ul>
                <li class= "mb-2">: {{ member.id }}</li>
                <li>: {{ member.position }}</li>
              </ul>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-flex>
      <!-- </v-row>    -->
    </v-layout>
    
  </div>
</template>
  
  <script>




export default {
  name: 'Team',
  data() {
    return {
      members: [
        { name: "Kamolwish Woramethaleot", id: "62130500003", position: "Front-End, Database" },
        { name: "Korawit Rittisit", id: "62130500006", position: "DevOps, Network, Database" },
        { name: "Thanadol Chuesai", id: "62130500030", position: "Back-End" }
      ]

    }
  },
  components: {



  },
}
</script>
  