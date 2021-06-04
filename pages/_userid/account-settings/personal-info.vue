<template>
  <div class="min-h-screen">
    <div class="py-6">
      <div
        v-if="!isLoading || currentUser"
        class="mx-auto max-w-6xl grid grid-cols-12 gap-x-4 px-8"
      >
        <div class="sm:col-start-3 sm:col-span-8 col-span-12 mt-16">
          <!-- <v-breadcrumbs :items="items"> 
            <template #divider>
              <v-icon>mdi-chevron-right</v-icon>
            </template>
          </v-breadcrumbs> -->
          <div class="text-3xl">Personal Info</div>
        </div>
        <div class="sm:col-start-3 sm:col-span-8 col-span-12">
          <div>
            <div class="my-8">
              <div>
                <div class="text-lg font-bold flex flex-wrap justify-between">
                  User Name
                  <v-btn text color="primary" @click="editClicked('username')">
                    {{ editing == 'username' ? 'Close' : 'Edit' }}
                  </v-btn>
                </div>
                <div v-if="!editing || editing != 'username'" class="text-lg">
                  {{ currentUser.username }}
                </div>
                <div v-else class="text-lg">
                  <!-- <div>
                    This is the name on your travel document, which could be a
                    licence or a passport.
                  </div> -->
                  <div class="grid sm:grid-cols-2 grid-cols-1 mt-4 gap-2">
                    <div class="col-span-1">
                      <v-text-field
                        v-model="model.username"
                        label="User Name"
                        required
                        outlined
                        dense
                      ></v-text-field>
                    </div>
                  </div>
                  <v-btn depressed color="primary" @click="submit">
                    Save
                  </v-btn>
                </div>
              </div>
            </div>
            <v-divider></v-divider>
          </div>
        </div>
        <div class="sm:col-start-3 sm:col-span-8 col-span-12">
          <div>
            <div class="my-8">
              <div>
                <div class="text-lg font-bold flex flex-wrap justify-between">
                  Legal Name
                  <v-btn text color="primary" @click="editClicked('legalName')">
                    {{ editing == 'legalName' ? 'Close' : 'Edit' }}
                  </v-btn>
                </div>
                <div v-if="!editing || editing != 'legalName'" class="text-lg">
                  {{ currentUser.fname }} {{ currentUser.lname }}
                </div>
                <div v-else class="text-lg">
                  <div>
                    This is the name on your travel document, which could be a
                    licence or a passport.
                  </div>
                  <div class="grid sm:grid-cols-2 grid-cols-1 mt-4 gap-2">
                    <div class="col-span-1">
                      <v-text-field
                        v-model="model.fname"
                        label="First Name"
                        placeholder="First Name"
                        required
                        outlined
                        dense
                      ></v-text-field>
                    </div>
                    <div class="col-span-1">
                      <v-text-field
                        v-model="model.lname"
                        label="Last Name"
                        placeholder="Last Name"
                        required
                        outlined
                        dense
                      ></v-text-field>
                    </div>
                  </div>
                  <v-btn depressed color="primary" @click="submit">
                    Save
                  </v-btn>
                </div>
              </div>
            </div>
            <v-divider></v-divider>
          </div>
        </div>
        <div class="sm:col-start-3 sm:col-span-8 col-span-12">
          <div>
            <div class="my-8">
              <div>
                <div class="text-lg font-bold flex flex-wrap justify-between">
                  Gender
                  <v-btn text color="primary" @click="editClicked('gender')">
                    {{ editing == 'gender' ? 'Close' : 'Edit' }}
                  </v-btn>
                </div>
                <div v-if="!editing || editing != 'gender'" class="text-lg">
                  {{ currentUser.gender }}
                </div>
                <div v-else class="text-lg">
                  <div class="grid sm:grid-cols-2 grid-cols-1 mt-4 gap-2">
                    <div class="col-span-1">
                      <v-select
                        v-model="model.gender"
                        :items="genders"
                        label="Gender"
                        dense
                        outlined
                      ></v-select>
                    </div>
                  </div>
                  <v-btn depressed color="primary" @click="submit">
                    Save
                  </v-btn>
                </div>
              </div>
            </div>
            <v-divider></v-divider>
          </div>
        </div>
        <div class="sm:col-start-3 sm:col-span-8 col-span-12">
          <div>
            <div class="my-8">
              <div>
                <div class="text-lg font-bold flex flex-wrap justify-between">
                  Email
                </div>
                <div class="text-lg">
                  {{ currentUser.email }}
                </div>
              </div>
            </div>
            <v-divider></v-divider>
          </div>
        </div>
        <div class="sm:col-start-3 sm:col-span-8 col-span-12">
          <div>
            <div class="my-8">
              <div>
                <div class="text-lg font-bold flex flex-wrap justify-between">
                  Date of Birth
                  <v-btn
                    text
                    color="primary"
                    @click="editClicked('dateofbirth')"
                  >
                    {{ editing == 'dateofbirth' ? 'Close' : 'Edit' }}
                  </v-btn>
                </div>
                <div
                  v-if="!editing || editing != 'dateofbirth'"
                  class="text-lg"
                >
                  {{ currentUser.dateofbirth }}
                </div>
                <div v-else class="text-lg">
                  <!-- <div>For notifications, reminders, and help logging in</div> -->
                  <div class="grid sm:grid-cols-2 grid-cols-1 mt-4 gap-2">
                    <div class="col-span-1">
                      <v-menu
                        v-model="datepicker"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template #activator="{on, attrs}">
                          <v-text-field
                            v-model="model.dateofbirth"
                            label="Date of Birth"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="model.dateofbirth"
                          @input="datepicker = false"
                        ></v-date-picker>
                      </v-menu>
                    </div>
                  </div>
                  <v-btn depressed color="primary" @click="submit">
                    Save
                  </v-btn>
                </div>
              </div>
            </div>
            <v-divider></v-divider>
          </div>
        </div>
        <div class="sm:col-start-3 sm:col-span-8 col-span-12">
          <div>
            <div class="my-8">
              <div>
                <div class="text-lg font-bold flex flex-wrap justify-between">
                  Phone Number
                  <v-btn
                    text
                    color="primary"
                    @click="editClicked('phonenumber')"
                  >
                    {{ editing == 'phonenumber' ? 'Close' : 'Edit' }}
                  </v-btn>
                </div>
                <div
                  v-if="!editing || editing != 'phonenumber'"
                  class="text-lg"
                >
                  {{ currentUser.phonenumber }}
                </div>
                <div v-else class="text-lg">
                  <div>For notifications, reminders, and help logging in</div>
                  <div class="grid sm:grid-cols-2 grid-cols-1 mt-4 gap-2">
                    <div class="col-span-1">
                      <v-text-field
                        v-model="model.phonenumber"
                        label="Phone Number"
                        required
                        outlined
                        dense
                      ></v-text-field>
                    </div>
                  </div>
                  <v-btn depressed color="primary" @click="submit">
                    Save
                  </v-btn>
                </div>
              </div>
            </div>
            <v-divider></v-divider>
          </div>
        </div>
        <div class="sm:col-start-3 sm:col-span-8 col-span-12">
          <div>
            <div class="my-8">
              <div>
                <div class="text-lg font-bold flex flex-wrap justify-between">
                  Address
                  <v-btn text color="primary" @click="editClicked('address')">
                    {{ editing == 'address' ? 'Close' : 'Edit' }}
                  </v-btn>
                </div>
                <div v-if="!editing || editing != 'address'" class="text-lg">
                  {{ addressString }}
                </div>
                <div v-else class="text-lg">
                  <div>Use a permanent address where you can receive mail.</div>
                  <div class="grid sm:grid-cols-2 grid-cols-1 mt-4 gap-2">
                    <div class="col-span-2">
                      <v-text-field
                        v-model="model.address.flat"
                        label="Flat, suite. (optional)"
                        placeholder="Flat, suit, building"
                        required
                        outlined
                        dense
                      ></v-text-field>
                    </div>
                    <div class="col-span-2">
                      <v-text-field
                        v-model="model.address.street"
                        label="Street Address"
                        placeholder="Street Name"
                        required
                        outlined
                        dense
                      ></v-text-field>
                    </div>
                    <div class="col-span-1">
                      <v-text-field
                        v-model="model.address.city"
                        label="City"
                        placeholder="City"
                        required
                        outlined
                        dense
                      ></v-text-field>
                    </div>
                    <div class="col-span-1">
                      <v-text-field
                        v-model="model.address.state"
                        label="State"
                        placeholder="State"
                        required
                        outlined
                        dense
                      ></v-text-field>
                    </div>
                    <div class="col-span-1">
                      <v-text-field
                        v-model="model.address.pin"
                        label="PIN Code"
                        placeholder="PIN Code"
                        required
                        outlined
                        dense
                      ></v-text-field>
                    </div>
                  </div>
                  <v-btn depressed color="primary" @click="submit">
                    Save
                  </v-btn>
                </div>
              </div>
            </div>
            <v-divider></v-divider>
          </div>
        </div>
        <!-- <div
          v-for="(setting, i) in settings"
          :key="i"
          class="lg:col-span-4 sm:col-span-6 col-span-12"
        >
          <account-setting-card :setting="setting"></account-setting-card>
        </div> -->
      </div>
    </div>
  </div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
export default {
  components: {},
  data: () => ({
    model: {
      username: '',
      fname: '',
      lname: '',
      email: '',
      dateofbirth: '',
      gender: '',
      phonenumber: '',
      address: {flat: '', street: '', city: '', state: '', pin: ''},
    },
    editing: null,
    genders: ['Male', 'Female'],
    datepicker: false,
  }),
  computed: {
    ...mapGetters({
      currentUser: 'currentLoggedInUser',
      //   getSelectedProperty: 'property/getSelectedProperty',
      isLoading: 'isLoading',
    }),
    addressString() {
      let addressString = ''
      if (this.currentUser && this.currentUser.address) {
        if (this.currentUser.address.flat)
          addressString += `${this.currentUser.address.flat}`
        if (this.currentUser.address.street)
          addressString += `${this.currentUser.address.street}`
        if (this.currentUser.address.city)
          addressString += `${this.currentUser.address.city}`
        if (this.currentUser.address.state)
          addressString += `${this.currentUser.address.state}`
        if (this.currentUser.address.pin)
          addressString += `(${this.currentUser.address.pin})`
      }
      return addressString
    },
  },
  mounted() {
    // console.log(this.currentUser)
    // this.model = this.currentUser
    // console.log(this.model)
  },
  created() {
    // console.log(this.currentUser)
  },
  methods: {
    ...mapActions({
      fetchSelectedProperty: 'property/fetchselectedProperty',
      updateUser: 'updateUser',
    }),
    editClicked(selectedEdit) {
      if (this.editing) this.editing = null
      else {
        this.editing = selectedEdit
        this.model = {...this.currentUser}
        this.model.address = {...this.currentUser.address}
      }
    },
    async submit() {
      await this.updateUser(this.model)
      this.editing = null
    },
  },
}
</script>
