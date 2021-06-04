<template>
  <div class="min-h-screen">
    <div class="py-6">
      <div
        v-if="!isLoading && currentUser"
        class="mx-auto max-w-6xl grid grid-cols-12 gap-4 px-8"
      >
        <div class="col-span-12 my-16">
          <div class="text-3xl">Account</div>
          <div class="col-span-12 my-1">
            <span>{{ currentUser.fname }} {{ currentUser.lname }}</span
            ><span aria-hidden="true"> · </span>
            <span>{{ currentUser.email }}</span>
            <span aria-hidden="true"> · </span>
          </div>
        </div>
        <div
          v-for="(setting, i) in settings"
          :key="i"
          class="lg:col-span-4 sm:col-span-6 col-span-12"
        >
          <account-setting-card :setting="setting"></account-setting-card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
export default {
  components: {},
  // eslint-disable-next-line require-await
  async asyncData({params}) {
    const propertyid = params.propertyid // When calling /abc the slug will be "abc"
    return {propertyid}
  },
  data: () => ({
    settings: [
      {
        name: 'Personal Info',
        description: 'Provide personal detail and how we can reach you',
        icon: '',
        to: '/account-settings/personal-info',
      },
      {
        name: 'cazz Coin Wallet',
        description: 'All bookings happen in cazz coin. Its out currency',
        icon: '',
        to: '/account-settings/wallet-info',
      },
      {
        name: 'Login & Security',
        description: 'Provide personal detail and how we can reach you',
        icon: '',
        to: '',
      },
      {
        name: 'Payments and Payouts',
        description: 'Provide personal detail and how we can reach you',
        icon: '',
        to: '',
      },
      {
        name: 'Notification',
        description: 'Provide personal detail and how we can reach you',
        icon: '',
        to: '',
      },
      {
        name: 'Referral credit & coupons',
        description: 'Provide personal detail and how we can reach you',
        icon: '',
        to: '',
      },
    ],
    dates: [],
    menu2: false,
  }),
  computed: {
    ...mapGetters({
      currentUser: 'currentLoggedInUser',
      //   getSelectedProperty: 'property/getSelectedProperty',
      isLoading: 'isLoading',
    }),
  },
  async mounted() {
    // console.log(this.$route.params.propertyid)
    // await this.fetchSelectedProperty({
    //   propertyid: this.$route.params.propertyid,
    // })
  },
  methods: {
    ...mapActions({fetchSelectedProperty: 'property/fetchselectedProperty'}),
  },
}
</script>
