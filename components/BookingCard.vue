<template>
  <v-card class="mx-auto p-2">
    <div class="grid grid-cols-1 sm:grid-cols-4 gap-2">
      <v-img
        class="white--text align-end object-cover rounded-md grid-cols-1"
        :src="booking.property.images[0]"
      >
        <!-- height="200px" -->
        <!-- <v-card-title>Top 10 Australian beaches</v-card-title> -->
      </v-img>
      <div class="col-span-1 sm:col-span-3">
        <!-- <div class="text-2xl">{{ booking.property.name }}</div> -->
        <div class="w-full sm:px-4 flex flex-wrap content-between h-full">
          <div class="w-full">
            <div class="text-xl flex flex-wrap justify-between">
              <span>{{ booking.property.name }}</span>
              <span
                ><v-chip small :color="getColor(booking.status)">{{
                  booking.status.toUpperCase()
                }}</v-chip></span
              >
            </div>
            <div class="w-full">
              <div class="text-sm font-light">
                {{ booking.property.propertytype.primary }} in
                {{ booking.property.address.city }}
              </div>
              <div class="text-sm font-light">
                <span>{{ booking.property.propertytype.room }} bath</span>
                <span aria-hidden="true"> · </span>
                <span>{{ booking.property.propertytype.bed }} beds</span>
                <span aria-hidden="true"> · </span>
                <span
                  >{{ booking.property.propertytype.bathroom }} bathrooms</span
                >
              </div>
            </div>
            <div class="w-full">
              <v-icon color="primary" small> mdi-star </v-icon>
              <span class="text-sm">3.5/5</span>
              <span class="text-sm">(5 reviews)</span>
            </div>
          </div>

          <div class="w-full">
            <span>
              <v-avatar
                v-if="booking.owner.displaypicture"
                color="primary"
                size="30"
                ><img :src="booking.owner.displaypicture" alt="John"
              /></v-avatar>
              <v-avatar v-else color="primary" dark size="30"
                ><span class="white--text">{{
                  booking.owner.username[0].toUpperCase()
                }}</span></v-avatar
              >
            </span>

            <span class="font-bold ml-1 primary--text h-full items-baseline">{{
              booking.owner.username
            }}</span>
          </div>
        </div>
      </div>
      <div class="sm:col-span-4"><v-divider></v-divider></div>
      <div class="sm:col-span-2 sm:border-r pr-2">
        <div>Guest Details</div>
        <div class="flex flex-wrap justify-between text-sm">
          <div>Name</div>
          <div class="font-bold">
            {{
              booking.guest.fname && booking.guest.lname
                ? `${booking.guest.fname} ${booking.guest.lname}`
                : booking.guest.username
            }}
          </div>
        </div>
        <div class="flex flex-wrap justify-between text-sm">
          <div>Email</div>
          <div class="font-bold">{{ booking.guest.email }}</div>
        </div>
      </div>
      <div class="sm:hidden"><v-divider></v-divider></div>
      <div class="sm:col-span-2">
        <div>Booking Details</div>
        <div class="flex flex-wrap justify-between text-sm">
          <div>Booking id</div>
          <div class="font-bold">
            {{ booking.id }}
          </div>
        </div>
        <div class="flex flex-wrap justify-between text-sm">
          <div>Checkin/Checkout</div>
          <div class="font-bold">
            {{ formatDate(booking.dates[0]) }}
            -
            {{ formatDate(booking.dates[0]) }}
          </div>
        </div>
        <div class="flex flex-wrap justify-between text-sm">
          <div>Guests</div>
          <div class="font-bold">
            {{ getGuestsString(booking.guests) }}
          </div>
        </div>
        <div class="flex flex-wrap justify-between text-sm">
          <div>Payment Method</div>
          <div class="font-bold">
            {{ booking.paymentmethod }}
          </div>
        </div>
      </div>
      <div class="sm:col-span-4"><v-divider></v-divider></div>
      <div class="sm:col-span-2">
        <div>Price details</div>
        <div
          v-for="(rent, index) in booking.rentDetails"
          :key="index"
          class="flex flex-wrap justify-between text-sm"
        >
          <div>
            <span>{{ rent.name }}</span>
            <span>{{
              rent.chargable == 'daily'
                ? `(${rent.amount} x ${booking.days})`
                : ''
            }}</span>
          </div>
          <span class="font-bold"
            >{{
              rent.chargable == 'daily'
                ? `${rent.amount * booking.days}`
                : `${rent.amount}`
            }}
            coins</span
          >
        </div>
        <div class="flex flex-wrap justify-between font-bold text-lg">
          <div>
            <span>{{ booking.totalAmount.name }}</span>
          </div>
          <span>{{ booking.totalAmount.amount }} coins</span>
        </div>
      </div>
    </div>
    <div
      v-if="
        booking.status == 'pending' &&
        currentUser &&
        currentUser.uid === booking.ownerid
      "
      class="mt-4"
    >
      <v-btn color="primary" small @click="actionClicked('confirmed')">
        Confirm Booking
      </v-btn>
      <v-btn color="error" small @click="actionClicked('failed')">
        Decline
      </v-btn>
    </div>
  </v-card>
</template>

<script>
import {mapGetters} from 'vuex'
import {getFormattedDate} from '../Utils/helperFunctions'

export default {
  name: 'AccountSettingCard',
  props: {
    booking: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    ...mapGetters({
      currentUser: 'currentLoggedInUser',
    }),
  },
  methods: {
    formatDate(date) {
      return getFormattedDate(date)
    },
    actionClicked(type) {
      this.$emit('actionClicked', {type})
    },
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
    getGuestsString(guests) {
      let str = ''
      if (guests.adults) {
        if (guests.adults <= 1) str += `${guests.adults} Adult and`
        else str += `${guests.adults} Adults and `
      }
      if (guests.children) {
        if (guests.children <= 1) str += `${guests.children} Child`
        else str += `${guests.adults} Children`
      }

      return str
    },
  },
}
</script>

<style></style>
