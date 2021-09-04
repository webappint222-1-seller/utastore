<template>
<div class= "footer">
    <v-footer dark padless cols="auto" absolute bottom>
        
            <v-layout flex-row wrap justify-center no-gutter>
            <v-btn class="my-2" @click="$router.push('/')">
                <v-icon left>home</v-icon>
                <span class="mr-2">Home</span>
            </v-btn>
            <v-btn class="my-2" @click="$router.push('/about')">
                <v-icon left>dashboard</v-icon>
                <span class="mr-2">About</span>
            </v-btn>
            <v-btn class="my-2" @click="$router.push('/team')">
                <v-icon left>person</v-icon>
                <span class="mr-2">Team</span>
            </v-btn>
            <v-col dark class="py-4 text-center" cols="12">
                {{ new Date().getFullYear() }} —
                <strong>uta STORE</strong>
            </v-col>
        </v-layout>
    </v-footer>
</div>
</template>