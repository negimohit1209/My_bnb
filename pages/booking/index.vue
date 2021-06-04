<template>
  <div class="min-h-screen">
    <div class="py-6">
      <div
        v-if="!isLoading"
        class="mx-auto max-w-5xl grid grid-cols-12 gap-4 px-8"
      >
        <div class="col-span-12 my-16">
          <div class="text-3xl">Booking History</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
export default {
  components: {},
  data: () => ({}),
  async fetch() {
    // console.log('fetch called')
    // await this.getBookingByGuest({
    //   where: 'guestid',
    //   equalto: this.currentUser.id,
    // })
  },
  computed: {
    ...mapGetters({
      currentUser: 'currentLoggedInUser',
      isLoading: 'isLoading',
    }),
  },

  async mounted() {
    console.log('mounted called')
    await this.getBookingByGuest({
      where: 'guestid',
      equalto: this.currentUser.id,
    })
  },
  methods: {
    ...mapActions({
      fetchSelectedProperty: 'property/fetchselectedProperty',
      getBookingByGuest: 'booking/getAll',
    }),
  },
}
</script>
