<template>
  <v-app>
    <v-app-bar
      absolute
      color="transparent"
      elevate-on-scroll
      scroll-target="#scrolling-techniques-7"
      class="md:px-8"
    >
      <v-toolbar-title class="cursor-pointer" @click="routeTo('/')">
        <img class="h-12 w-12" src="~/assets/mybnblogo.png" alt="John" />
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <v-menu v-if="isLoggedIn" offset-y :nudge-width="100">
        <template #activator="{on, attrs}">
          <v-btn
            v-if="isLoggedIn"
            color="primary"
            text
            style="text-transform: none"
            v-bind="attrs"
            v-on="on"
          >
            Hi {{ currentLoggedInUser.username }},
            <v-avatar size="30" class="ml-2">
              <img
                :src="
                  currentLoggedInUser && currentLoggedInUser.displaypicture
                    ? currentLoggedInUser.displaypicture
                    : 'https://cdn.vuetifyjs.com/images/john.jpg'
                "
                alt="John"
              /> </v-avatar
          ></v-btn>
        </template>

        <v-card class="mx-auto" tile>
          <v-list dense>
            <!-- <v-subheader>REPORTS</v-subheader> -->
            <!-- <v-list-item>
              <v-list-item-content>
                <v-list-item-title
                  >Hi,
                  {{
                    currentLoggedInUser ? currentLoggedInUser.username : ''
                  }}</v-list-item-title
                >
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider> -->
            <v-list-item-group color="primary">
              <v-list-item
                @click="routeTo(`/${currentLoggedInUser.uid}/booking`)"
              >
                <v-list-item-content>
                  <v-list-item-title v-text="`My Bookings`"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item
                @click="routeTo(`/${currentLoggedInUser.uid}/booking-requests`)"
              >
                <v-list-item-content>
                  <v-list-item-title
                    v-text="`Booking requests`"
                  ></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item
                @click="routeTo(`/${currentLoggedInUser.uid}/notification`)"
              >
                <v-list-item-content>
                  <v-list-item-title
                    v-text="`Notifications`"
                  ></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item
                @click="routeTo(`/${currentLoggedInUser.uid}/account-settings`)"
              >
                <v-list-item-content>
                  <v-list-item-title v-text="`Account`"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content @click="logout">
                  <v-list-item-title v-text="`Logout`"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-menu>
      <v-btn v-else outlined color="primary" rounded @click="routeTo('/login')"
        >Login</v-btn
      >
    </v-app-bar>
    <v-main>
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  computed: {
    ...mapGetters(['currentLoggedInUser', 'isLoggedIn']),
  },
  watch: {
    // switch1(newValue, _) {
    //   this.$vuetify.theme.dark = newValue
    // },
  },
  mounted() {},
  methods: {
    async logout() {
      await this.$fire.auth.signOut()
      this.$router.push('/login')
    },
    routeTo(route) {
      this.$router.push(route)
    },
  },
}
</script>
