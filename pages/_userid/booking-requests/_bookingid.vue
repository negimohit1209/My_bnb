<template>
  <div class="min-h-screen max-w-4xl m-auto">
    <div class="py-6">
      <div
        v-if="!isLoading"
        class="mx-auto max-w-5xl grid grid-cols-12 gap-4 px-8"
      >
        <div class="col-span-12 my-16">
          <div class="sm:col-start-3 sm:col-span-8 col-span-12 mb-16">
            <div class="text-3xl">Booking Request</div>
          </div>
          <div
            v-if="selectedBooking"
            class="sm:col-start-3 sm:col-span-8 col-span-12"
          >
            <booking-card :booking="selectedBooking"></booking-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
// import BookingCard from '../../../components/BookingCard.vue'
export default {
  //   components: {BookingCard},
  data: () => ({}),
  async fetch() {
    await this.fetchselectedBooking({bookingid: this.$route.params.bookingid})
  },
  computed: {
    ...mapGetters({
      currentUser: 'currentLoggedInUser',
      isLoading: 'isLoading',
      selectedBooking: 'booking/getSelectedBooking',
    }),
  },

  mounted() {},
  methods: {
    ...mapActions({
      fetchselectedBooking: 'booking/fetchselectedBooking',
      //   getBookingByOwner: 'booking/getAll',
    }),
  },
}
</script>
