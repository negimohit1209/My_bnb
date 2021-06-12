<template>
  <!-- <div v-if="isLoggedIn">
    Hi
    <v-btn @click="logout">Logout</v-btn>
  </div>
  <div v-else>
    Hi
    <NuxtLink to="/login">login</NuxtLink>
  </div> -->
  <div class="accentlight">
    <section id="image" class="h-screen">
      <div class="md:grid md:grid-cols-2 h-full">
        <div class="w-3/4 h-full m-auto p-2 flex flex-wrap content-center">
          <div class="max-4xl">
            <div class="text-7xl font-bold">Explore, Travel, love.</div>
            <div class="mt-8 text-lg">
              <div>Be inspired by the places and book your stay online.</div>
              <div>Have a hassle free stay at very affordable prices.</div>
            </div>
            <div class="mt-8 text-lg">
              <v-btn
                v-if="isLoggedIn"
                color="primary"
                large
                rounded
                style="text-transform: none"
                @click="routeTo('/property')"
                >See Properties</v-btn
              >
              <v-btn
                v-if="!isLoggedIn"
                color="primary"
                large
                rounded
                style="text-transform: none"
                @click="routeTo('/register')"
                >Get Started</v-btn
              >
            </div>
          </div>
        </div>
        <div class="flex content-center hidden md:block m-auto">
          <img src="~assets/travellers.svg" />
        </div>
      </div>
    </section>
    <v-divider></v-divider>
    <section id="features" class="">
      <div class="max-w-5xl mx-auto">
        <div class="text-4xl font-bold my-8 px-4">Features</div>
        <div class="hidden sm:block sm:grid sm:grid-cols-4 sm:gap-4">
          <div
            v-for="(feature, index) in features"
            :key="index"
            class="sm:grid sm:grid-cols-3 sm:col-span-3 sm-gap max-h-40"
            :class="index % 2 != 0 ? 'sm:col-start-2' : ''"
          >
            <div
              v-if="index % 2 == 0"
              class="flex content-center hidden sm:block m-auto"
            >
              <img
                class="max-h-40 max-w-40"
                :src="require(`@/assets/svg/features/${feature.image}`)"
              />
            </div>
            <div class="sm:col-span-2">
              <div class="font-bold">{{ feature.title }}</div>
              <div class="text-sm">{{ feature.description }}</div>
            </div>
            <div
              v-if="index % 2 != 0"
              class="flex content-center hidden sm:block m-auto"
            >
              <img
                class="h-40 w-40"
                :src="require(`@/assets/svg/features/${feature.image}`)"
              />
            </div>
          </div>
        </div>
        <div class="block sm:hidden">
          <div v-for="(feature, index) in features" :key="index" class="p-4">
            <v-card class="p-3 rounded-xl">
              <div class="grid grid-cols-3 gap-2">
                <div class="flex content-center m-auto justify-center">
                  <img
                    class="max-h-20 max-w-20"
                    :src="require(`@/assets/svg/features/${feature.image}`)"
                  />
                </div>
                <div class="col-span-2">
                  <div class="font-bold text-sm">{{ feature.title }}</div>
                  <div class="text-xs">{{ feature.description }}</div>
                </div>
              </div>
            </v-card>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// import Logo from '~/components/Logo.vue'
// import VuetifyLogo from '~/components/VuetifyLogo.vue'
import {mapGetters} from 'vuex'

export default {
  components: {},
  layout(_) {
    return 'landingLayout'
  },
  data() {
    return {
      features: [
        {
          image: 'property.svg',
          title: 'Property',
          description:
            'Planning a trip, Exploring a city or a business trip we have got you covered. Select a property that suits your budget and check for availability. Special discounts on booking for more than 14 days.',
        },
        {
          image: 'wallet.svg',
          title: 'Cazz coins',
          description:
            'To make transactions easy and since this is a dummy application we will be using "CAZZ COINS" for the transactions. Add cass coins to your wallet and book your stay.',
        },
        {
          image: 'notification.svg',
          title: 'Notification',
          description:
            'You will get inApp notifications about your booking details as well as about any important information regarding your stay. We will also be integrating email notification so stay tuned.',
        },
        {
          image: 'security.svg',
          title: 'Privacy',
          description:
            'In this world full of date theft and missuse, we assure you that neither we will be selling your data nor show you unwanted ads. This application is a dummy app but still we understand you privacy.',
        },
        {
          image: 'pwa.svg',
          title: 'Progressive Web App',
          description:
            'We are PWA please add us to your home screen. This feature is still under development but please hang in there.',
        },
        // {image: '', title: 'Property', description: 'Select a property'},
      ],
    }
  },
  computed: {
    ...mapGetters(['isLoggedIn']),
  },
  methods: {
    async logout() {
      try {
        await this.$fire.auth.signOut()
      } catch (e) {
        alert(e)
      }
    },
    routeTo(route) {
      this.$router.push(route)
    },
    imagesPath(image) {
      // return require(`/assets/${image}`)
    },
  },
}
</script>

<style scoped></style>
