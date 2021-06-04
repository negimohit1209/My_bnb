<template>
  <div class="w-full sm:p-16">
    <div class="text-2xl px-4">Let’s get started listing your space!</div>
    <div>
      <div class="md:grid md:grid-cols-3 md:gap-6">
        <div class="md:col-span-1">
          <div class="px-4 py-5 sm:px-0">
            <h3 class="text-lg font-medium leading-6">Address</h3>
            <p class="mt-1 text-sm">
              Address of the property will help Guests to locate your property.
            </p>
          </div>
        </div>
        <div class="mt-5 md:mt-0 md:col-span-2">
          <div class="shadow sm:rounded-md sm:overflow-hidden">
            <div class="px-4 py-5 space-y-6 sm:p-6">
              <div class="mt-1 rounded-md flex flex-wrap">
                <div class="w-full md:w-1/2 px-1">
                  <v-text-field
                    v-model="model.address.flat"
                    label="Address line 1"
                    placeholder="Flat/ Building"
                    required
                    outlined
                    dense
                  ></v-text-field>
                </div>
                <div class="w-full md:w-1/2 px-1">
                  <v-text-field
                    v-model="model.address.street"
                    label="Address line 2"
                    placeholder="Street"
                    required
                    outlined
                    dense
                  ></v-text-field>
                </div>

                <div class="w-full md:w-1/2 px-1">
                  <v-text-field
                    v-model="model.address.city"
                    label="City"
                    placeholder="eg. Kota"
                    required
                    outlined
                    dense
                  ></v-text-field>
                </div>
                <div class="w-full md:w-1/2 px-1">
                  <v-text-field
                    v-model="model.address.state"
                    label="State"
                    placeholder="eg. Rajasthan"
                    required
                    outlined
                    dense
                  ></v-text-field>
                </div>
                <div class="w-full md:w-1/2 px-1">
                  <v-text-field
                    v-model="model.address.pin"
                    label="PIN"
                    placeholder="eg. 323307"
                    required
                    outlined
                    dense
                  ></v-text-field>
                </div>
                <div class="w-full md:w-1/2 px-1">
                  <v-text-field
                    v-model="model.address.landmark"
                    label="Landmark"
                    placeholder="eg. near Bank of India"
                    required
                    outlined
                    dense
                  ></v-text-field>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-4">
      <div class="md:grid md:grid-cols-3 md:gap-6">
        <div class="md:col-span-1">
          <div class="px-4 py-5 sm:px-0">
            <h3 class="text-lg font-medium leading-6">Property Information</h3>
            <p class="mt-1 text-sm">
              Property Information will help guests know more about property
            </p>
          </div>
        </div>
        <div class="mt-5 md:mt-0 md:col-span-2">
          <div class="shadow sm:rounded-md sm:overflow-hidden">
            <div class="px-4 py-5 space-y-6 sm:p-6">
              <div class="mt-1 rounded-md flex flex-wrap">
                <div class="w-full md:w-1/2 px-1">
                  <v-select
                    v-model="model.propertytype.primary"
                    :items="primaryType"
                    label="Property Type"
                    dense
                    outlined
                  ></v-select>
                </div>
                <div class="w-full md:w-1/2 px-1">
                  <v-select
                    v-model="model.propertytype.secondary"
                    :items="secondaryType[model.propertytype.primary]"
                    label="Property SubType"
                    dense
                    :disabled="model.propertytype.primary == ''"
                    outlined
                  ></v-select>
                </div>
                <div class="w-full md:w-1/2 px-1">
                  <v-select
                    v-model="model.propertytype.place"
                    :items="place"
                    label="Place for Guests"
                    dense
                    :disabled="model.propertytype.primary == ''"
                    outlined
                  ></v-select>
                </div>
                <div class="w-full md:w-1/2 px-1"></div>
                <div class="w-1/2 md:w-1/4 px-1">
                  <v-text-field
                    v-model="model.propertytype.guests"
                    label="Maximum Guests"
                    placeholder="eg. 5"
                    required
                    outlined
                    dense
                  ></v-text-field>
                </div>
                <div class="w-1/2 md:w-1/4 px-1">
                  <v-text-field
                    v-model="model.propertytype.room"
                    label="Rooms"
                    placeholder="eg. 5"
                    required
                    outlined
                    dense
                  ></v-text-field>
                </div>
                <div class="w-1/2 md:w-1/4 px-1">
                  <v-text-field
                    v-model="model.propertytype.bed"
                    label="Beds"
                    placeholder="eg. 5"
                    required
                    outlined
                    dense
                  ></v-text-field>
                </div>
                <div class="w-1/2 md:w-1/4 px-1">
                  <v-text-field
                    v-model="model.propertytype.bathroom"
                    label="Bathroom"
                    placeholder="eg. 5"
                    required
                    outlined
                    dense
                  ></v-text-field>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-4">
      <div class="md:grid md:grid-cols-3 md:gap-6">
        <div class="md:col-span-1">
          <div class="px-4 py-5 sm:px-0">
            <h3 class="text-lg font-medium leading-6">Aminities</h3>
            <p class="mt-1 text-sm">
              Please mention the Aminities provided with the Property.
            </p>
          </div>
        </div>
        <div class="mt-5 md:mt-0 md:col-span-2">
          <div class="shadow sm:rounded-md sm:overflow-hidden">
            <div class="px-4 py-5 space-y-6 sm:p-6">
              <div class="mt-1 rounded-md flex flex-wrap">
                <div class="w-full px-1">
                  <!-- <v-select label="Chips" multiple outlined solo></v-select> -->
                  <v-select
                    v-model="model.aminity.primary"
                    :items="primaryAminity"
                    chips
                    :menu-props="{maxHeight: '400'}"
                    label="Aminities"
                    multiple
                    hint="These are just the amenities guests usually expect, but you can add even more after you publish."
                    persistent-hint
                  ></v-select>
                </div>

                <div class="w-full px-1">
                  <v-select
                    v-model="model.aminity.safety"
                    :items="safetyAminity"
                    chips
                    :menu-props="{maxHeight: '400'}"
                    label="Safety Aminities"
                    multiple
                    hint="These are safety amenities guests wants."
                    persistent-hint
                  ></v-select>
                </div>
                <div class="w-full px-1">
                  <v-select
                    v-model="model.aminity.space"
                    :items="spaces"
                    chips
                    :menu-props="{maxHeight: '400'}"
                    label="Spaces for guests"
                    multiple
                    hint="Include common areas, but don’t add spaces that aren’t on your property"
                    persistent-hint
                  ></v-select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-4">
      <div class="md:grid md:grid-cols-3 md:gap-6">
        <div class="md:col-span-1">
          <div class="px-4 py-5 sm:px-0">
            <h3 class="text-lg font-medium leading-6">Property Detail</h3>
            <p class="mt-1 text-sm">
              We will be adding property name, description, images. Please add
              rent details and checkin time as well
            </p>
          </div>
        </div>
        <div class="mt-5 md:mt-0 md:col-span-2">
          <div class="shadow sm:rounded-md sm:overflow-hidden">
            <div class="px-4 py-5 space-y-6 sm:p-6">
              <div class="mt-1 rounded-md flex flex-wrap">
                <div class="w-full px-1">
                  <v-text-field
                    v-model="model.name"
                    label="Title"
                    placeholder="eg. Raj Villas"
                    required
                    outlined
                    dense
                  ></v-text-field>
                </div>
                <div class="w-full px-1">
                  <v-textarea
                    v-model="model.description"
                    label="Description"
                    placeholder="Add description for your place"
                    outlined
                    dense
                    auto-grow
                    rows="5"
                    row-height="20"
                  ></v-textarea>
                </div>
                <div class="w-1/2 md:w-1/4 px-1">
                  <v-text-field
                    v-model="model.rent.currency"
                    label="Currency"
                    placeholder="eg. INR"
                    required
                    outlined
                    dense
                  ></v-text-field>
                </div>
                <div class="w-1/2 md:w-1/4 px-1">
                  <v-text-field
                    v-model="model.rent.amount"
                    label="Amount"
                    placeholder="eg. 1500"
                    required
                    outlined
                    dense
                  ></v-text-field>
                </div>
                <div class="w-1/2 md:w-1/4 px-1">
                  <v-text-field
                    v-model="model.rent.minAmount"
                    label="Minimum Amount"
                    placeholder="eg. 500"
                    required
                    outlined
                    dense
                  ></v-text-field>
                </div>
                <div class="w-1/2 md:w-1/4 px-1">
                  <v-text-field
                    v-model="model.rent.maxAmount"
                    label="Maximum Amount"
                    placeholder="eg. 5000"
                    required
                    outlined
                    dense
                  ></v-text-field>
                </div>
                <div class="w-full md:w-1/3 px-1">
                  <v-text-field
                    v-model="model.phone.number"
                    label="Phone Number"
                    placeholder="eg. 5000"
                    required
                    outlined
                    dense
                  ></v-text-field>
                </div>
                <div class="w-full md:w-2/3 px-1">
                  <v-checkbox
                    v-model="model.phone.canCustomerCall"
                    label="Guests able to see Phone Number"
                    dense
                  ></v-checkbox>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-4 flex justify-center">
      <v-btn
        color="secondary"
        elevation="4"
        medium
        class="mx-4"
        @click="createRandomProperty"
        >Add Random Values</v-btn
      >
      <v-btn
        color="primary"
        elevation="4"
        medium
        class="mx-4"
        :loading="isLoading"
        @click="submit"
        >Save</v-btn
      >
    </div>
  </div>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
import {
  primaryType,
  secondaryType,
  place,
  primaryAminity,
  safetyAminity,
  spaces,
  fetchRandomProperty,
} from '../../Utils/data'
import {showNotification} from '../../Utils/helperFunctions'
export default {
  data: () => ({
    model: {
      name: '',
      description: '',
      phone: {
        number: '', // TODO: country code
        canCustomerCall: false, // TODO: canCustomer call feature
      },
      rent: {
        amount: '',
        maxAmount: '',
        minAmount: '',
        currency: '', // TODO currency selector
      },
      checkintime: '1000', // TODO time selector
      address: {
        flat: '',
        street: '',
        state: '',
        city: '',
        pin: '',
        landmark: '',
      },
      propertytype: {
        primary: '',
        secondary: '',
        place: '',
        guests: '',
        room: '',
        bed: '',
        bathroom: '',
      },
      aminity: {
        primary: '',
        safety: '',
        space: '',
      },
      ownerid: '',
    },
    primaryType,
    secondaryType,
    place,
    primaryAminity,
    safetyAminity,
    spaces,
  }),
  computed: {
    ...mapGetters({
      isLoading: 'property/isLoading',
      currentLoggedInUser: 'currentLoggedInUser',
    }),
  },
  mounted() {
    // console.log(this.$store)
  },
  methods: {
    ...mapActions({createProperty: 'property/create'}),
    createRandomProperty() {
      const property = fetchRandomProperty()
      this.model = {...property}
      showNotification(
        'info',
        'Information',
        'Added Random values. Click SAVE to create property.'
      )
      console.log(this.model)
    },
    submit() {
      this.model.ownerid = this.currentLoggedInUser.uid
      this.createProperty({property: this.model})
    },
  },
}
</script>
