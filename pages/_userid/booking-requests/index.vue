<template>
  <div class="min-h-screen">
    <div class="py-6">
      <div
        v-if="!isLoading"
        class="mx-auto max-w-5xl grid grid-cols-12 gap-4 px-8"
      >
        <div class="col-span-12 my-16">
          <div class="sm:col-start-3 sm:col-span-8 col-span-12 mb-16">
            <div class="text-3xl">Booking Requests</div>
          </div>
          <div class="sm:col-start-3 sm:col-span-8 col-span-12">
            <v-data-table
              :headers="headers"
              :items="getAllBookings"
              sort-by="calories"
              class="elevation-1"
            >
              <template #top>
                <v-toolbar flat>
                  <v-toolbar-title>Bookings</v-toolbar-title>
                </v-toolbar>
              </template>
              <template #[`item.actions`]="{item}">
                <v-icon class="mr-2" @click="routeTo(item)">
                  mdi-chevron-right
                </v-icon>
              </template>
              <template #[`item.status`]="{item}">
                <v-chip
                  :color="getColor(item.status)"
                  small
                  class="text-sm font-bold"
                >
                  {{ item.status.toUpperCase() }}
                </v-chip>
              </template>
              <template #[`item.dates`]="{item}">
                {{ formatDate(item.dates[0]) }} -
                {{ formatDate(item.dates[0]) }}
              </template>
              <template #no-data> No Bookings yet </template>
            </v-data-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
import {getFormattedDate} from '../../../Utils/helperFunctions'
export default {
  components: {},
  data: () => ({
    headers: [
      {
        text: 'Booking ID',
        align: 'start',
        sortable: false,
        value: 'id',
      },
      {text: 'Status', value: 'status', sortable: false},
      {text: 'Checking - Checkout', value: 'dates', sortable: false},
      {text: 'Days', value: 'days', sortable: false},
      {text: 'Amount', value: 'totalAmount.amount', sortable: false},
      {text: 'Actions', value: 'actions', sortable: false},
    ],
  }),
  async fetch() {
    console.log('fetch called')
    await this.getBookingByOwner({
      where: 'ownerid',
      value: this.$route.params.userid,
    })
  },
  computed: {
    ...mapGetters({
      currentUser: 'currentLoggedInUser',
      isLoading: 'isLoading',
      getAllBookings: 'booking/getAllBookingList',
    }),
  },

  mounted() {
    console.log('mounted called')
    // await this.getBookingByGuest({
    //   where: 'guestid',
    //   equalto: this.$route.params.userid,
    // })
  },
  methods: {
    ...mapActions({
      fetchSelectedProperty: 'property/fetchselectedProperty',
      getBookingByOwner: 'booking/getAll',
    }),
    getColor(val) {
      switch (val) {
        case 'pending':
          return 'warning'
        case 'confirmed':
          return 'success'
        case 'failed':
          return 'error'
      }
    },
    formatDate(date) {
      return getFormattedDate(date)
    },
    routeTo(item) {
      this.$router.push(`${this.$route.path}/${item.id}`)
    },
  },
}
</script>
