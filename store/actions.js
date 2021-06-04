import {showNotification} from '../Utils/helperFunctions'
import {
  RESET_STORE,
  SET_AUTH_USER,
  START_LOADING,
  END_LOADING,
  UPDATE_USER,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
} from './mutations'

export default {
  async nuxtServerInit({dispatch}, ctx) {
    // INFO -> Nuxt-fire Objects can be accessed in nuxtServerInit action via this.$fire___, ctx.$fire___ and ctx.app.$fire___'

    /** Get the VERIFIED authUser on the server */
    if (ctx.res && ctx.res.locals && ctx.res.locals.user) {
      const {allClaims: claims, ...authUser} = ctx.res.locals.user

      //   console.info(
      //     'Auth User verified on server-side. User: ',
      //     authUser,
      //     'Claims:',
      //     claims
      //   )

      await dispatch('onAuthStateChanged', {
        authUser,
        claims,
      })
    }
  },

  async onAuthStateChanged({commit}, {authUser}) {
    if (!authUser) {
      commit(RESET_STORE)
      return
    }
    if (authUser && authUser.getIdToken) {
      try {
        commit(START_LOADING)
        await authUser.getIdToken(true)
        const currentUserRef = this.$fire.firestore
          .collection('users')
          .doc(authUser.uid)
        await currentUserRef.onSnapshot((snapshot) => {
          const data = snapshot.data()
          const profileData = {...data}
          commit(SET_AUTH_USER, {authUser, profileData})
          commit(END_LOADING)
        })
        // currentUserRef.on('value', (snapshot) => {
        //   const data = snapshot.val()
        //   const profileData = {...data}
        //   commit(SET_AUTH_USER, {authUser, profileData})
        //   commit(END_LOADING)
        // })
      } catch (e) {
        commit(END_LOADING)
      }
    }
  },

  checkVuexStore(ctx) {
    if (this.$fire.auth === null) {
      //   throw 'Vuex Store example not working - this.$fire.auth cannot be accessed.'
    }

    alert(
      'Success. Nuxt-fire Objects can be accessed in store actions via this.$fire___'
    )
  },
  async updateUser({commit}, user) {
    commit(UPDATE_USER)
    try {
      const userRef = this.$fire.firestore.collection(`users`).doc(user.uid)
      await userRef.update({...user})
      showNotification('success', 'User Update', 'Successfully Update User')
      commit(UPDATE_USER_SUCCESS, {profileData: {...user}})
    } catch (e) {
      console.log(e)
      showNotification('error', 'Error', 'Something Went wrong')
      commit(UPDATE_USER_FAIL)
    }
  },
}
