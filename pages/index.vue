<template>
  <!-- <div v-if="isLoggedIn">
    Hi
    <v-btn @click="logout">Logout</v-btn>
  </div>
  <div v-else>
    Hi
    <NuxtLink to="/login">login</NuxtLink>
  </div> -->
  <div>
    <section
      id="image"
      class="h-screen bg-no-repeat bg-clip-border bg-cover"
      style="background-image: url('/landing-background-image.jpeg')"
    >
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
  },
}
</script>

<style scoped>
/* .image {
  background-image: url('~assets/landing-background-image.jpeg');
} */
</style>
