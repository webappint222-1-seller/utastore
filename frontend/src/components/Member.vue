<template>
  <div class="member">
    <v-container class="flex">
      <v-flex xs12 sm12 md12 lg12 justify-center>
        <v-card dark class="w-28 my-10 justify-center">
          <span class="justify-center flex text-xl font-medium text-lightpink">Members</span>
        </v-card>
      </v-flex>
    </v-container>
    <v-layout flex-row wrap justify-center>
      <!-- <v-row justify="center"> -->
      <v-flex xs8 sm8 md8 lg4>
        <v-expansion-panels accordion dark>
          <v-expansion-panel v-for="member in members" :key="member.id">
            <v-expansion-panel-header class="text-xl">{{ member.name }}</v-expansion-panel-header>
            <v-expansion-panel-content class="text-xl">
              <div class="mb-2 ml-8">
                <v-responsive>
                  <img :src="member.pic" class="w-auto h-40" />
                </v-responsive>
              </div>
              <ul>
                <li class="mb-2">Student ID: {{ member.sid }}</li>
                <li>Work Position: {{ member.position }}</li>
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
        { name: "Kamolwish Woramethaleot", sid: "62130500003", position: "Front-End, Database", pic: "1.jpg", id: 1 },
        { name: "Korawit Rittisit", sid: "62130500006", position: "DevOps, Network", pic: "2.jpg", id: 2 },
        { name: "Thanadol Chuesai", sid: "62130500030", position: "Back-End", pic: "3.jpg", id: 3 }
      ]

    }
  },
  components: {



  },
}
</script>
  