<template>
  <div class="md:grid md:grid-cols-3 h-screen">
    <div
      class="md:col-span-3 h-full flex bg-register-image bg-no-repeat bg-clip-border bg-cover secondary bg-blend-hard-light"
    >
      <div class="max-w-xl p-2 m-auto">
        <v-card elevation="6" color="cardColor" class="p-8 rounded-xl"
          ><div class="p-2 text-2xl text-center mb-2">Login</div>
          <div class="p-2">Login to you account</div>
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

            <div class="p-2 text-sm">
              Don't have an account yet?
              <router-link to="/register">Register</router-link>
            </div>
          </v-form></v-card
        >
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
