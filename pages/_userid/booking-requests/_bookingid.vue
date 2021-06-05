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
            <booking-card
              :booking="selectedBooking"
              @actionClicked="actionClicked"
            ></booking-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
// import BookingCard from '../../../components/BookingCard.vue'
import {firebaseTimestamp} from '../../../Utils/firebase'

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
      createBooking: 'booking/create',
    }),

    async actionClicked({type}) {
      const booking = {id: this.selectedBooking.id, data: {status: type}}
      let transaction = {
        amount: this.selectedBooking.totalAmount.amount,
        bookingid: this.selectedBooking.id,
        createdat: firebaseTimestamp(),
        paymentMethod: 'Cazz Coin',
        status: 'success',
        type: 'credit',
      }
      let notification = {
        createdat: firebaseTimestamp(),
        read: false,
        receiverid: this.selectedBooking.guestid,
        routeto: `${this.selectedBooking.guestid}/booking/${this.selectedBooking.id}`,
        sender: {
          id: this.selectedBooking.ownerid,
          displaypicture: this.selectedBooking.owner.displaypicture || null,
          username: this.selectedBooking.owner.username || null,
        },
        type: {name: 'booking', id: this.selectedBooking.id},
      }
      if (type === 'confirmed') {
        transaction = {
          ...transaction,
          comment: `Payment for booking: ${this.selectedBooking.id}`,
          userid: this.selectedBooking.ownerid,
        }
        notification = {
          ...notification,
          message: `Your Booking is Confirmed`,
        }
      }
      if (type === 'faliled') {
        transaction = {
          ...transaction,
          comment: `Refund for booking: ${this.selectedBooking.id}`,
          userid: this.selectedBooking.guestid,
        }
        notification = {
          ...notification,
          message: `Your Booking request has been declined`,
        }
      }
      const method = {
        name: 'update',
      }
      await this.createBooking({booking, transaction, notification, method})
      this.$fetch()
    },
  },
}
</script>
