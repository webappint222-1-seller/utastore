<template>
  <div class="team">
    <Navbar />
    <!-- <Member /> -->
    <p class="justify-center flex text-xl text-white font-mono mt-20">Members</p>
    <v-layout flex-row wrap justify-center>
      <!-- <v-row justify="center"> -->
      <v-flex xs6 sm8 md8>
        <v-expansion-panels accordion dark>
          <v-expansion-panel v-for="member in members" :key="member.id">
            <v-expansion-panel-header class>{{ member.name }}</v-expansion-panel-header>
            <v-expansion-panel-content>
              : {{ member.id }}
              <br />
              : {{ member.position }}
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-flex>
      <!-- </v-row>    -->
    </v-layout>
  </div>
</template>

<script>

import Navbar from '@/components/Navbar.vue'
// import Member from '@/components/Member.vue'

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
    Navbar,
    // Member

  },
}
</script>
