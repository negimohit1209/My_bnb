<template>
  <div class="min-h-screen">
    <div class="py-6">
      <div
        v-if="!isLoading && getSelectedProperty"
        class="mx-auto max-w-5xl lg:grid lg:grid-cols-12 gap-2 py-8"
      >
        <div class="col-span-12 text-3xl my-4">Request to book</div>
        <div class="col-span-6 my-1">
          <div class="my-8">
            <div class="text-lg font-bold flex flex-wrap justify-between">
              Dates
              <v-btn text color="primary" @click="editClicked('dates')">
                {{ editing == 'dates' ? 'Close' : 'Edit' }}
              </v-btn>
            </div>
            <div v-if="editing != 'dates'" class="text-lg">
              {{ bookingModel.dates[0] }} - {{ bookingModel.dates[1] }}
            </div>
            <div v-else class="text-lg">
              <v-menu
                v-model="menu.dates"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template #activator="{on, attrs}">
                  <div class="grid grid-cols-2 gap-2" v-bind="attrs" v-on="on">
                    <v-text-field
                      v-model="bookingModel.dates[0]"
                      label="Checkin"
                      prepend-inner-icon="mdi-calendar"
                      readonly
                      outlined
                      dense
                    ></v-text-field>
                    <v-text-field
                      v-model="bookingModel.dates[1]"
                      label="Checkout"
                      prepend-inner-icon="mdi-calendar"
                      readonly
                      outlined
                      dense
                    ></v-text-field>
                  </div>
                </template>
                <v-date-picker
                  v-model="bookingModel.dates"
                  range
                  color="primary"
                ></v-date-picker>
              </v-menu>
              <v-btn depressed color="primary" small @click="update">
                Update
              </v-btn>
            </div>
          </div>
          <v-divider></v-divider>
          <div class="my-8">
            <div class="text-lg font-bold flex flex-wrap justify-between">
              Guests
              <v-btn text color="primary" @click="editClicked('guests')">
                {{ editing == 'guests' ? 'Close' : 'Edit' }}
              </v-btn>
            </div>
            <div v-if="editing != 'guests'" class="text-lg">
              {{ bookingModel.guests.adults }}
              {{ bookingModel.guests.adults > 1 ? 'Adults' : 'Adults' }}
              ,
              {{ bookingModel.guests.children }}
              {{ bookingModel.guests.children > 1 ? 'Children' : 'Child' }}
            </div>
            <div v-else class="text-lg">
              <div class="grid grid-cols-2 gap-2">
                <v-text-field
                  v-model="bookingModel.guests.adults"
                  label="Adults"
                  placeholder="eg. 2"
                  type="number"
                  required
                  outlined
                  dense
                ></v-text-field>
                <v-text-field
                  v-model="bookingModel.guests.children"
                  label="Children"
                  placeholder="eg. 2"
                  type="number"
                  required
                  outlined
                  dense
                ></v-text-field>
              </div>
              <v-btn depressed color="primary" small @click="update">
                Update
              </v-btn>
            </div>
          </div>
          <v-divider></v-divider>
          <div class="my-8">
            <div class="text-lg font-bold flex flex-wrap justify-between">
              Pay Using
            </div>
            <div>
              <div class="grid grid-cols-1">
                <v-select
                  v-model="bookingModel.paymentmethod"
                  class="my-2"
                  :items="paymentMethods"
                  label="Payment Method"
                  hint="Currently we have only one payment method i.e cazz coins"
                  persistent-hint
                  dense
                  outlined
                ></v-select>
              </div>
            </div>
            <div
              v-if="bookingModel.paymentmethod"
              class="flex flex-wrap justify-between"
            >
              <div class="text-lg">Cazz coin balance:</div>
              <div
                class="text-lg font-bold"
                :class="isBalanceSufficient ? 'success--text' : 'error--text'"
              >
                {{ getBalance }}
              </div>
            </div>
            <div v-if="bookingModel.paymentmethod && !isBalanceSufficient">
              <div class="error--text">Not Sufficient Cazz Coin balance</div>
              <v-dialog
                v-model="dialog"
                transition="dialog-bottom-transition"
                max-width="400"
              >
                <template #activator="{on, attrs}">
                  <v-btn color="primary" v-bind="attrs" small v-on="on"
                    >ADD COINS</v-btn
                  >
                </template>
                <template #default="">
                  <v-card>
                    <v-toolbar color="primary text-2xl" dark
                      >Add cazz coins</v-toolbar
                    >
                    <v-card-text>
                      <div class="p-1">
                        Hi Users! cazz coins is just a dummy way to have
                        transactions integrated. Just enter the amount of cazz
                        coins and it will be shown in your wallet.
                      </div>
                      <div class="p-1">
                        <v-text-field
                          v-model="model.amount"
                          label="Amount"
                          placeholder="1000"
                          type="number"
                          required
                          outlined
                          dense
                        ></v-text-field>

                        <div class="flex flex-wrap justify-around">
                          <v-btn
                            rounded
                            color="primary"
                            dark
                            small
                            outlined
                            @click="incrementAmount(100)"
                          >
                            +100
                          </v-btn>
                          <v-btn
                            rounded
                            color="primary"
                            dark
                            small
                            outlined
                            @click="incrementAmount(200)"
                          >
                            +200
                          </v-btn>
                          <v-btn
                            rounded
                            color="primary"
                            dark
                            small
                            outlined
                            @click="incrementAmount(500)"
                          >
                            +500
                          </v-btn>
                        </div>
                        <div class="pt-6">
                          <v-textarea
                            v-model="model.comment"
                            label="Comment"
                            placeholder="Add a comment"
                            outlined
                            dense
                            auto-grow
                            rows="5"
                            row-height="18"
                          ></v-textarea>
                        </div>
                      </div>
                    </v-card-text>
                    <v-card-actions class="justify-end">
                      <v-btn color="primary" small @click="addAmount"
                        >Pay</v-btn
                      >
                      <v-btn text small @click="close()">Close</v-btn>
                    </v-card-actions>
                  </v-card>
                </template>
              </v-dialog>
            </div>
          </div>
          <v-divider></v-divider>
          <div class="my-8">
            <div class="text-lg font-bold flex flex-wrap justify-between">
              Messsage for owner
            </div>
            <div class="text-lg">
              <div class="grid grid-cols-1 gap-2">
                <v-textarea
                  v-model="bookingModel.comment"
                  label="Message"
                  placeholder="Add a message for owner"
                  outlined
                  dense
                  auto-grow
                  rows="5"
                  row-height="18"
                ></v-textarea>
              </div>
            </div>
          </div>
          <v-btn
            color="primary"
            :disabled="!this.bookingModel.paymentmethod || !isBalanceSufficient"
            @click="submit"
            >Request to book</v-btn
          >
        </div>
        <div class="col-span-6">
          <div class="overflow-hidden shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
              <div v-if="showRentDetails" class="w-full">
                <div class="grid lg:grid-cols-12 gap-4">
                  <div class="col-span-4">
                    <v-img
                      :src="getSelectedProperty.images[0]"
                      class="grey darken-4 w-full h-full object-cover rounded-lg overflow-hidden"
                    ></v-img>
                  </div>
                  <div class="col-span-8 flex flex-wrap content-between">
                    <div class="w-full">
                      <div class="text-sm font-light">
                        {{ getSelectedProperty.propertytype.primary }} in
                        {{ getSelectedProperty.address.city }}
                      </div>
                      <div class="">
                        {{ getSelectedProperty.name }}
                      </div>
                      <div class="text-sm font-light">
                        <span
                          >{{
                            getSelectedProperty.propertytype.room
                          }}
                          bath</span
                        >
                        <span aria-hidden="true"> · </span>
                        <span
                          >{{ getSelectedProperty.propertytype.bed }} beds</span
                        >
                        <span aria-hidden="true"> · </span>
                        <span
                          >{{
                            getSelectedProperty.propertytype.bathroom
                          }}
                          bathrooms</span
                        >
                      </div>
                    </div>
                    <div class="w-full">
                      <v-icon color="primary" small> mdi-star </v-icon>
                      <span class="text-sm">3.5/5</span>
                      <span class="text-sm">(5 reviews)</span>
                    </div>
                  </div>
                </div>
                <div class="text-xl font-bold my-4">Price details</div>
                <div
                  v-for="(rent, index) in bookingModel.rentDetails"
                  :key="index"
                  class="flex flex-wrap justify-between my-4"
                >
                  <div>
                    <span>{{ rent.name }}</span>
                    <span class="text-sm">{{
                      rent.chargable == 'daily'
                        ? `(${rent.amount} x ${bookingModel.days})`
                        : ''
                    }}</span>
                  </div>
                  <span
                    >{{
                      rent.chargable == 'daily'
                        ? `${rent.amount * bookingModel.days}`
                        : `${rent.amount}`
                    }}
                    coins</span
                  >
                </div>
                <div class="flex flex-wrap justify-between font-bold text-lg">
                  <div>
                    <span>{{ bookingModel.totalAmount.name }}</span>
                  </div>
                  <span>{{ bookingModel.totalAmount.amount }} coins</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
import {firebaseTimestamp} from '../../../Utils/firebase'
import {getDaysBetweenDates} from '../../../Utils/helperFunctions'

export default {
  components: {},
  // eslint-disable-next-line require-await
  async asyncData({params}) {
    const propertyid = params.propertyid // When calling /abc the slug will be "abc"
    return {propertyid}
  },
  data: () => ({
    dialog: false,
    showRentDetails: false,
    bookingModel: {
      status: 'pending',
      dates: [],
      days: 4,
      guests: {
        adults: '',
        children: '',
      },
      paymentmethod: '',
      rentDetails: [
        {name: 'Taxes and Fees', discount: 0, amount: 500, chargable: 'once'},
        {name: 'Cleaning Fee', discount: 0, amount: 200, chargable: 'daily'},
      ],
      comment: '',
    },
    editing: null,
    menu: {
      dates: false,
      guests: false,
    },
    paymentMethods: ['Cazz Coin'],
    model: {
      amount: null,
      comment: '',
    },
    defaultModel: {amount: null, comment: ''},
  }),
  async fetch() {
    console.log('fetch called')
    await this.fetchSelectedProperty({
      propertyid: this.$route.params.propertyid,
    })
    const {checkin, checkout, adults, children} = this.$route.query
    this.bookingModel.dates = [checkin, checkout]
    this.bookingModel.guests = {adults, children}
    this.checkAvailability()
    await this.fetchAllTransaction({currentUserId: this.currentUser.uid})
  },
  computed: {
    ...mapGetters({
      getSelectedProperty: 'property/getSelectedProperty',
      isLoading: 'property/isLoading',
      getBalance: 'transaction/getBalance',
      currentUser: 'currentLoggedInUser',
    }),
    isBalanceSufficient() {
      return this.getBalance >= this.bookingModel.totalAmount.amount
    },
    totalAmount() {
      return this.bookingModel.totalAmount.amount
    },
  },
  watch: {
    '$route.query': '$fetch',
    dialog(val) {
      //   console.log(`val ${val} - ${this.close()}`)
      val || this.close()
    },
  },

  methods: {
    ...mapActions({
      fetchSelectedProperty: 'property/fetchselectedProperty',
      fetchAllTransaction: 'transaction/fetchAllTransaction',
      createTransaction: 'transaction/create',
      createBooking: 'booking/create',
    }),
    checkAvailability() {
      this.bookingModel.days = getDaysBetweenDates(this.bookingModel.dates)
      const baseamount = {
        name: 'Base Amount',
        discount: 10,
        amount: this.getSelectedProperty.rent.amount,
        chargable: 'daily',
      }
      this.bookingModel.rentDetails = [
        baseamount,
        ...this.bookingModel.rentDetails,
      ]
      const totalAmount = {
        name: 'Total',
        discount: 0,
        chargable: 'once',
        amount: 0,
      }
      this.bookingModel.rentDetails.forEach(
        (rent) =>
          (totalAmount.amount +=
            rent.chargable === 'daily'
              ? rent.amount * this.bookingModel.days
              : rent.amount)
      )
      this.bookingModel.totalAmount = {...totalAmount}
      this.showRentDetails = true
    },
    editClicked(selectedEdit) {
      if (this.editing) this.editing = null
      else {
        this.editing = selectedEdit
      }
    },
    incrementAmount(value) {
      if (!this.model.amount) this.model.amount = 0
      this.model.amount += value
    },
    async addAmount() {
      this.model.amount = parseInt(this.model.amount)
      const transaction = {
        ...this.model,
        type: 'credit',
        paymentMethod: '',
        status: 'success',
      }
      transaction.userid = this.currentUser.uid
      transaction.createdat = firebaseTimestamp()
      await this.createTransaction({transaction: {...transaction}})
      this.close()
    },
    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.model = Object.assign({}, this.defaultModel)
      })
    },
    update() {
      const {dates, guests} = this.bookingModel
      const query = `checkin=${dates[0]}&checkout=${dates[1]}&adults=${guests.adults}&children=${guests.children}`
      this.$router.push(
        `/property/${this.$route.params.propertyid}/book?` + query
      )
    },
    async submit() {
      const booking = {...this.bookingModel}
      booking.guestid = this.currentUser.uid
      booking.propertyid = this.getSelectedProperty.id
      booking.ownerid = this.getSelectedProperty.ownerid
      const transaction = {
        amount: this.totalAmount,
        comment: '',
        type: 'debit',
        paymentMethod: 'Cazz Coin',
        status: 'success',
      }
      transaction.userid = this.currentUser.uid
      transaction.createdat = firebaseTimestamp()
      const notification = {
        read: false,
        receiverid: this.getSelectedProperty.ownerid,
        routeto: '/property',
        sender: {
          id: this.currentUser.uid,
          displaypicture: this.currentUser.displaypicture || null,
          username: this.currentUser.username || null,
        },
        createdat: firebaseTimestamp(),
        message: `Request to book property`,
      }
      await this.createBooking({booking, transaction, notification})
    },
  },
}
</script>
