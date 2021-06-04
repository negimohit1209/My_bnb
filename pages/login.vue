<template>
  <div class="w-full h-screen flex">
    <div class="w-2/3 bg-red-500">Login Page</div>
    <div class="w-1/3 h-full flex">
      <div class="w-3/4 m-auto">
        <div>Login</div>
        <div>Login to you account</div>
        <v-form v-model="valid">
          <div class="flex flex-wrap">
            <div class="w-full px-2">
              <v-text-field
                v-model="model.email"
                label="Email"
                required
                outlined
                dense
              ></v-text-field>
            </div>
            <div class="w-full px-2">
              <v-text-field
                v-model="model.password"
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
          </div>
          <div class="px-2">
            <v-btn depressed color="primary" block @click="signInUser"
              >Sign In</v-btn
            >
            <v-btn v-if="isLoggedIn" class="mr-4" @click="logout">
              logout
            </v-btn>
          </div>

          <div>
            Don't have an account yet?
            <router-link to="/register">Register</router-link>
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
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  layout: 'authLayout',
  data: () => ({
    valid: false,
    model: {
      email: '',
      password: '',
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
    async signInUser() {
      const {email, password} = this.model
      try {
        await this.$fire.auth.signInWithEmailAndPassword(email, password)
        this.$router.push('/property')
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
