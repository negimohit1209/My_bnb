<template>
  <div class="min-h-screen">
    <div class="py-6">
      <div
        v-if="!isLoading && getSelectedProperty"
        class="mx-auto max-w-6xl lg:grid lg:grid-cols-12"
      >
        <div class="col-span-12 text-3xl my-1">
          {{ getSelectedProperty.name }}
        </div>
        <div class="col-span-12 my-1">
          <v-icon color="primary" small> mdi-star </v-icon>
          <span class="text-sm">3.5/5</span>
          <span class="text-sm">(5 reviews)</span>
          <span aria-hidden="true" class="text-sm"> · </span>
          <span class="text-sm"
            >{{ getSelectedProperty.address.landmark }},
            {{ getSelectedProperty.address.city }},
            {{ getSelectedProperty.address.state }}</span
          >
        </div>
        <div class="col-span-12 rounded-xl overflow-hidden my-2">
          <v-carousel cycle hide-delimiter-background show-arrows-on-hover>
            <v-carousel-item
              v-for="(item, i) in getSelectedProperty.images"
              :key="i"
              :src="item"
            >
            </v-carousel-item>
          </v-carousel>
        </div>
        <div class="col-span-7 mt-8">
          <div class="flex flex-wrap justify-between mb-8">
            <div>
              <div class="text-xl py-1">
                {{ getSelectedProperty.propertytype.secondary }} hosted by
                <span class="font-bold">{{
                  getSelectedProperty.owner.username
                }}</span>
              </div>
              <div>
                <span
                  >{{ getSelectedProperty.propertytype.guests }} guests</span
                >
                <span aria-hidden="true"> · </span>
                <span>{{ getSelectedProperty.propertytype.room }} bath</span>
                <span aria-hidden="true"> · </span>
                <span>{{ getSelectedProperty.propertytype.bed }} beds</span>
                <span aria-hidden="true"> · </span>
                <span
                  >{{
                    getSelectedProperty.propertytype.bathroom
                  }}
                  bathrooms</span
                >
              </div>
            </div>
            <div>
              <v-avatar
                v-if="getSelectedProperty.owner.displaypicture"
                color="primary"
                ><img
                  :src="getSelectedProperty.owner.displaypicture"
                  :alt="getUsername(getSelectedProperty.owner.username)"
              /></v-avatar>
              <v-avatar v-else color="primary">{{
                getUsername(getSelectedProperty.owner.username)
              }}</v-avatar>
            </div>
          </div>
          <v-divider></v-divider>
          <div class="flex flex-wrap justify-between my-8">
            {{ getSelectedProperty.description }}
          </div>
          <v-divider></v-divider>
          <div class="my-8">
            <div class="text-xl mb-4">Aminities</div>
            <div>
              <span
                v-for="(primaryAminity, index) in getSelectedProperty.aminity
                  .primary"
                :key="index"
                class=""
              >
                <v-chip outlined color="primary" class="mb-2 mr-2">{{
                  primaryAminity
                }}</v-chip>
              </span>
            </div>
          </div>
          <v-divider></v-divider>
        </div>
        <div class="col-span-1 mt-8 h-64"></div>
        <div class="col-span-4 mt-8">
          <div class="overflow-hidden shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
              <div class="mb-4">
                {{ getSelectedProperty.rent.amount }} coins / night
              </div>
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
              <v-btn color="primary" block large @click="checkAvailability">{{
                showRentDetails ? 'Reserve' : 'Check Availability'
              }}</v-btn>
              <div v-if="showRentDetails" class="w-full mt-8">
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
              <!-- <v-menu
                v-model="menu.guests"
                transition="slide-y-transition"
                :close-on-content-click="false"
                offset-y
                origin="center center"
              >
                <template #activator="{on, attrs}">
                  <div class="grid grid-cols-2 gap-2" v-bind="attrs" v-on="on">
                    <v-select
                      class="col-span-2"
                      label="Guests"
                      value="234213"
                      dense
                      outlined
                      readonly
                    ></v-select>
                  </div>
                </template>
                <v-list class="w-full">
                  <div class="p-4">
                    <div class="flex justify-between">
                      <div>
                        <div class="text-md font-bold">Adult</div>
                        <span class="text-sm font-light">Adult</span>
                      </div>
                      <div>increment</div>
                    </div>
                  </div>
                </v-list>
              </v-menu> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
import {getDaysBetweenDates} from '../../../Utils/helperFunctions'
export default {
  components: {},
  // eslint-disable-next-line require-await
  async asyncData({params}) {
    const propertyid = params.propertyid // When calling /abc the slug will be "abc"
    return {propertyid}
  },
  data: () => ({
    showRentDetails: false,
    bookingModel: {
      dates: [],
      days: 0,
      guests: {
        adults: '',
        children: '',
      },
      rentDetails: [
        {name: 'Taxes and Fees', discount: 0, amount: 500, chargable: 'once'},
        {name: 'Cleaning Fee', discount: 0, amount: 200, chargable: 'daily'},
      ],
    },
    menu: {
      dates: false,
      guests: false,
    },
  }),
  computed: {
    ...mapGetters({
      getSelectedProperty: 'property/getSelectedProperty',
      isLoading: 'property/isLoading',
    }),
  },
  async mounted() {
    // console.log(this.$route.params.propertyid)
    await this.fetchSelectedProperty({
      propertyid: this.$route.params.propertyid,
    })
    console.log(this.getSelectedProperty)
  },
  methods: {
    ...mapActions({fetchSelectedProperty: 'property/fetchselectedProperty'}),
    checkAvailability() {
      this.bookingModel.days = getDaysBetweenDates(this.bookingModel.dates)
      if (this.showRentDetails) {
        const {dates, guests} = this.bookingModel
        const queryString = `checkin=${dates[0]}&checkout=${dates[1]}&adults=${guests.adults}&children=${guests.children}`
        this.$router.push(`${this.getSelectedProperty.id}/book?` + queryString)
      } else {
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
      }
    },
    getUsername(name) {
      return name.toUpperCase().substring(0, 2)
    },
  },
}
</script>
