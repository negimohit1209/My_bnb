<template>
  <div class="min-h-screen max-w-6xl m-auto">
    <!--
    When the mobile menu is open, add `overflow-hidden` to the `body` element to prevent double scrollbars

    Open: "fixed inset-0 z-40 overflow-y-auto", Closed: ""
  -->

    <div class="py-6">
      <div
        class="mx-auto max-w-7xl sm:px-6 lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8"
      >
        <!-- <div class="hidden lg:block lg:col-span-3 xl:col-span-2">
          <nav aria-label="Sidebar" class="sticky top-6 divide-y divide-white">
            sdfsdgsd
          </nav>
        </div> -->
        <aside class="hidden lg:block lg:col-span-3">
          <div class="sticky top-20 space-y-4">
            <div class="border rounded-md p-2">
              <div>FILTER</div>
              <!-- <div>Price Range</div> -->
              <div class="my-4">
                <v-select
                  v-model="priceFilterValue"
                  :items="priceFilter"
                  item-text="name"
                  label="Select Price range"
                  multiple
                  chips
                  hint="Select the price range"
                  persistent-hint
                ></v-select>
              </div>
              <div class="my-4">
                <v-select
                  v-model="typeFilterValue"
                  :items="primaryType"
                  label="Select Property Type"
                  multiple
                  chips
                  hint="Select the property type"
                  persistent-hint
                ></v-select>
              </div>
            </div>
          </div>
        </aside>
        <main class="col-span-12 lg:col-span-9">
          <div
            v-for="property in getFilteredPropertyList"
            :key="property.id"
            class=""
          >
            <PropertyCard :property="property"></PropertyCard>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
import {priceFilter, primaryType} from '../../Utils/data'
export default {
  components: {},
  data: () => ({
    checkbox: true,
    priceFilter,
    typeFilterValue: null,
    primaryType,
    priceFilterValue: null,
  }),
  computed: {
    ...mapGetters({
      getFilteredPropertyList: 'property/getFilteredPropertyList',
    }),
  },
  watch: {
    priceFilterValue: {
      deep: true,
      handler(newValue, _) {
        const newPriceFilter = []
        newValue.forEach((val) => {
          const filter = this.priceFilter.find((pf) => pf.name === val)
          if (filter) newPriceFilter.push(filter)
        })
        this.setPropertyFilter({priceFilter: [...newPriceFilter]})
      },
    },
    typeFilterValue: {
      deep: true,
      handler(newValue, _) {
        console.log(newValue)
        this.setPropertyFilter({typeFilter: [...newValue]})
      },
    },
  },
  mounted() {
    this.getAllProperty()
  },
  methods: {
    ...mapActions({
      getAllProperty: 'property/getAll',
      setPropertyFilter: 'property/setPropertyFilter',
    }),
  },
}
</script>
