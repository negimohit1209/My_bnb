<template>
  <div
    class="sm:h-64 grid grid-cols-1 sm:grid-cols-4 gap-1 mb-4 border-2 rounded-lg overflow-hidden p-1"
  >
    <div class="col-span-1">
      <v-img
        :src="property.images[0]"
        class="grey darken-4 w-full h-full object-cover rounded-lg overflow-hidden"
      ></v-img>
    </div>
    <div class="hidden sm:block sm:col-span-2 flex flex-wrap content-between">
      <div>
        <div class="flex justify-between">
          <v-chip class="ma-2" color="secondary" label small>
            <v-icon left small> mdi-label </v-icon>
            {{ property.propertytype.primary.toUpperCase() }}
          </v-chip>
          <span class="m-2 text-sm"> 4.5/5 </span>
        </div>
        <div class="w-full p-1">
          <div class="text-lg">{{ property.name }}</div>
          <div class="text-sm">
            {{ property.address.city }}, {{ property.address.state }}
          </div>
        </div>
      </div>
      <!-- // TODO: Test the forloop -->
      <div class="mt-auto">
        <v-chip
          v-for="index in 3"
          :key="index"
          class="ma-1"
          color="primary accent-4"
          outlined
          x-small
        >
          <v-icon left x-small> mdi-wrench </v-icon>
          {{ property.aminity.primary[index] }}
        </v-chip>
        <v-tooltip bottom>
          <template #activator="{on, attrs}">
            <span
              color="primary"
              class="primary--text text-xs cursor-pointer"
              v-bind="attrs"
              v-on="on"
              >+{{ property.aminity.primary.length - 3 }} more</span
            >
          </template>
          <div>
            <div
              v-for="index in property.aminity.primary.length - 3"
              :key="index"
            >
              {{ property.aminity.primary[index + 3] }}
            </div>
          </div>
        </v-tooltip>
      </div>
    </div>
    <div
      class="col-span-1 border-l border-dashed p-1 flex flex-wrap content-between"
    >
      <div class="text-center w-full">
        <v-chip class="ma-2" color="green" outlined small>
          Free cancelation 1 day prior</v-chip
        >
      </div>
      <div class="w-full">
        <div class="text-right">
          <v-chip class="" color="red" text-color="white" small label>
            10% off
          </v-chip>
        </div>
        <div class="text-right">
          <s class="text-xs font-light">&#x20B9;{{ property.rent.amount }}</s
          ><span class="text-xl font-bold">&#x20B9;{{ discountedAmount }}</span>
        </div>
        <div class="text-right">
          <span class="text-xs font-light"
            >+ &#x20B9;{{ taxAmount }} TAXES AND FEES</span
          >
        </div>
        <div class="text-right">
          <span class="text-xs font-light">per night</span>
        </div>
      </div>
      <div class="flex flex-wrap justify-between">
        <NuxtLink :to="`/property/${property.id}`">
          <v-btn depressed color="primary" small outlined>
            View
          </v-btn></NuxtLink
        >

        <v-btn depressed color="primary" small> Book Now </v-btn>
        <!-- <v-btn icon color="pink" small>
          <v-icon>mdi-heart</v-icon>
        </v-btn> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PropertyCard',
  props: {
    property: {
      type: Object,
      default: null,
    },
  },
  computed: {
    discountedAmount() {
      return Math.max(
        Math.floor(this.property.rent.amount * 0.9),
        this.property.rent.minAmount
      )
    },
    taxAmount() {
      return 500
    },
  },
}
</script>

<style></style>
