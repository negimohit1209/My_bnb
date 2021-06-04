<template>
  <div class="min-h-screen">
    <div class="py-6">
      <div
        v-if="!isLoading"
        class="mx-auto max-w-5xl grid grid-cols-12 gap-4 px-8"
      >
        <div class="col-span-12 my-16">
          <div class="sm:col-start-3 sm:col-span-8 col-span-12 mb-16">
            <div class="text-3xl">Notifications</div>
          </div>
          <div class="sm:col-start-3 sm:col-span-8 col-span-12">
            <v-data-table
              :headers="headers"
              :items="getAllNotification"
              sort-by="calories"
              class="elevation-1"
            >
              <template #top>
                <v-toolbar flat>
                  <v-toolbar-title>Notifications</v-toolbar-title>
                </v-toolbar>
              </template>
              <template #[`item.actions`]="{item}">
                <v-icon class="mr-2" @click="viewItem(item)">
                  mdi-chevron-right
                </v-icon>
              </template>
              <template #[`item.sender`]="{item}">
                <v-avatar
                  v-if="item.sender.displaypicture"
                  color="primary"
                  size="36"
                  ><img :src="item.sender.displaypicture" alt="John"
                /></v-avatar>
                <v-avatar v-else color="primary" dark size="36"
                  ><span class="white--text">{{
                    item.sender.username[0].toUpperCase()
                  }}</span></v-avatar
                >
                <span class="font-bold ml-2">{{ item.sender.username }}</span>
              </template>
              <template #[`item.createdat`]="{item}">
                {{ getDateFromFirebaseTimestamp(item.createdat) }}
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
import {getDistanceBetween} from '../../../Utils/helperFunctions'
export default {
  components: {},
  data: () => ({
    headers: [
      {
        text: 'Sender',
        sortable: false,
        value: 'sender',
      },
      {text: 'Type', value: 'type.name', sortable: false},
      {text: 'Created At', value: 'createdat', sortable: false},
      {text: 'Message', value: 'message', sortable: false},
      // {text: 'Amount', value: 'totalAmount.amount', sortable: false},
      {text: 'Actions', value: 'actions', sortable: false},
    ],
  }),
  async fetch() {
    console.log('fetch called')
    await this.getNotification({
      where: 'receiverid',
      value: this.$route.params.userid,
    })
  },
  computed: {
    ...mapGetters({
      currentUser: 'currentLoggedInUser',
      isLoading: 'isLoading',
      getAllNotification: 'notification/getAllNotificationList',
    }),
  },

  mounted() {
    console.log('mounted called')
  },
  methods: {
    ...mapActions({
      fetchSelectedProperty: 'property/fetchselectedProperty',
      getNotification: 'notification/getAll',
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
    getDateFromFirebaseTimestamp(firetimestamp) {
      return getDistanceBetween(firetimestamp.toDate())
    },
    viewItem(item) {
      this.$router.push(`${item.routeto}`)
    },
  },
}
</script>
