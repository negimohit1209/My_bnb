<template>
  <v-app>
    <!-- <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer> -->
    <!-- <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar> -->
    <v-app-bar color="primary" dark class="md:px-24" fixed>
      <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->

      <v-toolbar-title class="cursor-pointer" @click="routeTo('/')"
        >My Bnb</v-toolbar-title
      >

      <v-spacer></v-spacer>
      <div>
        <v-switch
          v-model="switch1"
          color="secondary"
          flat
          hide-details
        ></v-switch>
      </div>
      <v-menu offset-y :nudge-width="200">
        <template #activator="{on, attrs}">
          <v-btn icon v-bind="attrs" small v-on="on">
            <v-avatar color="primary" size="35"
              ><img
                alt="Avatar"
                :src="
                  currentLoggedInUser && currentLoggedInUser.displaypicture
                    ? currentLoggedInUser.displaypicture
                    : 'https://cdn.vuetifyjs.com/images/john.jpg'
                "
            /></v-avatar>
          </v-btn>
        </template>

        <v-card class="mx-auto" max-width="300" tile>
          <v-list dense>
            <!-- <v-subheader>REPORTS</v-subheader> -->
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title
                  >Hi,
                  {{
                    currentLoggedInUser ? currentLoggedInUser.username : ''
                  }}</v-list-item-title
                >
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item-group color="primary">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title
                    @click="routeTo(`/${currentLoggedInUser.uid}/booking`)"
                    v-text="`My Bookings`"
                  ></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title
                    @click="
                      routeTo(`/${currentLoggedInUser.uid}/booking-requests`)
                    "
                    v-text="`Booking requests`"
                  ></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title
                    @click="routeTo(`/${currentLoggedInUser.uid}/notification`)"
                    v-text="`Notifications`"
                  ></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title
                    @click="
                      routeTo(`/${currentLoggedInUser.uid}/account-settings`)
                    "
                    v-text="`Account`"
                  ></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title
                    @click="logout"
                    v-text="`Logout`"
                  ></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-menu>
    </v-app-bar>
    <v-main class="mt-16">
      <v-progress-linear
        v-if="isLoading"
        indeterminate
        color="secondary"
      ></v-progress-linear>
      <notifications group="main" />
      <nuxt />
    </v-main>
    <!-- <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light> mdi-repeat </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer> -->
    <v-footer fixed app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      switch1: true,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
    }
  },
  computed: {
    ...mapGetters(['isLoading', 'currentLoggedInUser']),
  },
  watch: {
    switch1(newValue, _) {
      this.$vuetify.theme.dark = newValue
    },
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
