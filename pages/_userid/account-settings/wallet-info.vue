<template>
  <div class="min-h-screen">
    <div class="py-6">
      <div
        v-if="!isLoading && currentUser"
        class="mx-auto max-w-7xl grid grid-cols-12 gap-x-4 px-8"
      >
        <div class="sm:col-start-3 sm:col-span-8 col-span-12 mt-16">
          <!-- <v-breadcrumbs :items="items"> 
            <template #divider>
              <v-icon>mdi-chevron-right</v-icon>
            </template>
          </v-breadcrumbs> -->
          <div class="text-3xl">Wallet Info</div>
        </div>
        <div class="sm:col-start-3 sm:col-span-8 col-span-12">
          <div>
            <div class="my-8">
              <div>
                <div class="text-lg font-bold flex flex-wrap justify-between">
                  TOTAL BALANCE
                  <!-- <v-text-field
                    v-model="foo"
                    type="number"
                    label="Number"
                  ></v-text-field> -->
                  <v-dialog
                    v-model="dialog"
                    transition="dialog-bottom-transition"
                    max-width="400"
                  >
                    <template #activator="{on, attrs}">
                      <v-btn color="primary" v-bind="attrs" v-on="on"
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
                            transactions integrated. Just enter the amount of
                            cazz coins and it will be shown in your wallet.
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
                <div class="text-lg">{{ getBalance }}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="sm:col-start-3 sm:col-span-8 col-span-12">
          <v-data-table
            :headers="headers"
            :items="getAllTransactions"
            sort-by="calories"
            class="elevation-1"
          >
            <template #top>
              <v-toolbar flat>
                <v-toolbar-title>Transaction</v-toolbar-title>
              </v-toolbar>
            </template>
            <template #[`item.actions`]="{item}">
              <v-icon class="mr-2" @click="editItem(item)">
                mdi-chevron-right
              </v-icon>
            </template>
            <template #no-data> No Transactions </template>
            <template #[`item.createdat`]="{item}">
              {{
                item.createdat
                  ? getDateFromFirebaseTimestamp(item.createdat)
                  : ''
              }}
            </template>
          </v-data-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
import {firebaseTimestamp} from '../../../Utils/firebase'
import {getDistanceBetween} from '../../../Utils/helperFunctions'

export default {
  components: {},
  data: () => ({
    model: {
      amount: null,
      comment: '',
    },
    defaultModel: {amount: null, comment: ''},
    dialog: false,
    headers: [
      {
        text: 'Teransaction ID',
        align: 'start',
        sortable: false,
        value: 'id',
      },
      {text: 'Status', value: 'status', sortable: false},
      {text: 'Amount', value: 'amount', sortable: false},
      {text: 'Time', value: 'createdat', sortable: false},
      {text: 'Comments', value: 'comment', sortable: false},
      {text: 'Actions', value: 'actions', sortable: false},
    ],
  }),
  computed: {
    ...mapGetters({
      currentUser: 'currentLoggedInUser',
      getAllTransactions: 'transaction/getAllTransactionList',
      isLoading: 'isLoading',
      transactionLoading: 'transaction/isLoading',
      getBalance: 'transaction/getBalance',
    }),
  },
  watch: {
    dialog(val) {
      console.log(`val ${val} - ${this.close()}`)
      val || this.close()
    },
  },
  async mounted() {
    await this.fetchAllTransaction({currentUserId: this.$route.params.userid})
  },
  created() {},
  methods: {
    ...mapActions({
      fetchAllTransaction: 'transaction/fetchAllTransaction',
      createTransaction: 'transaction/create',
      updateUser: 'updateUser',
    }),
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
    getDateFromFirebaseTimestamp(firetimestamp) {
      return getDistanceBetween(firetimestamp.toDate())
    },
  },
}
</script>
