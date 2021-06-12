<template>
  <div class="md:grid md:grid-cols-3 h-screen">
    <div
      class="md:col-span-3 h-full flex bg-register-image bg-no-repeat bg-clip-border bg-cover secondary bg-blend-hard-light"
    >
      <!-- style="background-image: url('/landing-background-image.jpeg')" -->

      <div class="max-w-5xl p-2 m-auto">
        <v-card elevation="6" color="cardColor" class="p-8 rounded-xl">
          <div class="md:grid md:grid-cols-3 md:gap-2">
            <div class="flex content-center hidden md:block m-auto">
              <img src="~assets/register.svg" />
            </div>
            <div class="md:col-span-2">
              <div class="p-2 text-2xl text-center mb-2">Register</div>
              <div class="p-2">Let's get you set up</div>
              <v-form v-model="valid">
                <div class="flex flex-wrap">
                  <div class="w-full sm:w-1/2 px-2">
                    <v-text-field
                      v-model="model.fname"
                      label="First Name"
                      required
                      outlined
                      dense
                    ></v-text-field>
                  </div>
                  <div class="w-full sm:w-1/2 px-2">
                    <v-text-field
                      v-model="model.lname"
                      label="Last Name"
                      required
                      outlined
                      dense
                    ></v-text-field>
                  </div>
                  <div class="w-full sm:w-1/2 px-2">
                    <v-text-field
                      v-model="model.username"
                      label="User Name"
                      required
                      outlined
                      dense
                    ></v-text-field>
                  </div>
                  <div class="w-full sm:w-1/2 px-2">
                    <v-text-field
                      v-model="model.email"
                      label="Email"
                      required
                      outlined
                      dense
                    ></v-text-field>
                  </div>
                  <div class="w-full sm:w-1/2 px-2">
                    <v-text-field
                      v-model="model.password1"
                      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="showPassword ? 'text' : 'password'"
                      name="input-10-2"
                      label="Password"
                      hint="At least 8 characters"
                      outlined
                      dense
                      :rules="[passwordRules.required]"
                      @click:append="showPassword = !showPassword"
                    ></v-text-field>
                  </div>
                  <div class="w-full sm:w-1/2 px-2">
                    <v-text-field
                      v-model="model.password2"
                      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="showPassword ? 'text' : 'password'"
                      name="input-10-2"
                      label="Password"
                      hint="At least 8 characters"
                      outlined
                      dense
                      :rules="[passwordRules.required]"
                      @click:append="showPassword = !showPassword"
                    ></v-text-field>
                  </div>
                  <!-- <v-radio-group v-model="row" row>
              <v-radio label="Owner" value="radio-1"></v-radio>
              <v-radio label="Option 2" value="radio-2"></v-radio>
            </v-radio-group> -->
                </div>
                <div class="px-2">
                  <v-btn depressed color="primary" block @click="createUser"
                    >Create Account</v-btn
                  >
                  <v-btn v-if="isLoggedIn" class="mr-4" @click="logout">
                    logout
                  </v-btn>
                </div>

                <div class="p-2 text-sm">
                  Already have an account?
                  <router-link to="/login">Login</router-link>
                </div>

                <v-container>
                  <!-- <v-btn depressed color="primary">Create Account</v-btn> -->
                  <!-- <v-btn class="mr-4" @click="createUser"> Create User </v-btn>
            <v-btn class="mr-4" @click="signInUser"> Sign In </v-btn>
            <v-btn v-if="isLoggedIn" class="mr-4" @click="logout">
              logout
            </v-btn> -->
                </v-container>
              </v-form>
            </div>
          </div>
        </v-card>
      </div>
    </div>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  layout: 'landingLayout',
  data: () => ({
    valid: false,
    // firstname: '',
    // lastname: '',
    // nameRules: [
    //   (v) => !!v || 'Name is required',
    //   (v) => v.length <= 10 || 'Name must be less than 10 characters',
    // ],
    model: {
      email: '',
      password1: '',
      password2: '',
      username: '',
      fname: '',
      lname: '',
    },
    email: '',
    emailRules: [
      (v) => !!v || 'E-mail is required',
      (v) => /.+@.+/.test(v) || 'E-mail must be valid',
    ],
    showPassword: false,
    password: '',
    passwordRules: {
      required: (value) => !!value || 'Required.',
      min: (v) => v.length >= 8 || 'Min 8 characters',
      emailMatch: () => `The email and password you entered don't match`,
      // TODO: Add password match function
      //   passwordMatch(v) {
      //     console.log(window)
      //     return v === this.model.password1 || 'Password not matching'
      //   },
    },
  }),
  computed: {
    ...mapGetters(['isLoggedIn']),
  },
  methods: {
    submit() {},
    // eslint-disable-next-line require-await
    async createUser() {
      console.log(this.model)
      const {email, password1, fname, lname, username} = this.model
      try {
        const user = await this.$fire.auth.createUserWithEmailAndPassword(
          email,
          password1
        )
        const userRef = this.$fire.firestore
          .collection('users')
          .doc(user.user.uid)
        await userRef.set({
          email,
          fname,
          lname,
          username,
          uid: user.user.uid,
        })
      } catch (e) {
        alert(e)
      }
    },
    async signInUser() {
      try {
        await this.$fire.auth.signInWithEmailAndPassword(
          this.email,
          this.password
        )
      } catch (e) {
        alert(e)
      }
    },
    async logout() {
      try {
        await this.$fire.auth.signOut()
      } catch (e) {
        alert(e)
      }
    },
  },
}
</script>
