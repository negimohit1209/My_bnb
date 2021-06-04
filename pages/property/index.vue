<template>
  <div class="min-h-screen">
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
          <div class="sticky top-6 space-y-4">
            <div class="bg-red-500 h-64"></div>
          </div>
        </aside>
        <main class="col-span-12 lg:col-span-9">
          <div
            v-for="property in getAllPropertyList"
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
export default {
  components: {},
  data: () => ({}),
  computed: {
    ...mapGetters({getAllPropertyList: 'property/getAllPropertyList'}),
  },
  mounted() {
    this.getAllProperty()
  },
  methods: {...mapActions({getAllProperty: 'property/getAll'})},
}
</script>
