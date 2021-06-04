import initialState from './state'

// * Mutation Types
export const RESET_STORE = 'RESET_STORE'
export const SET_AUTH_USER = 'SET_AUTH_USER'
export const START_LOADING = 'START_LOADING'
export const END_LOADING = 'END_LOADING'
export const UPDATE_USER = 'UPDATE_USER'
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS'
export const UPDATE_USER_FAIL = 'UPDATE_USER_FAIL'

export default {
  [RESET_STORE]: (state) => {
    Object.assign(state, initialState())
  },

  [SET_AUTH_USER]: (state, {authUser, profileData}) => {
    state.authUser = {
      uid: authUser.uid,
      email: authUser.email,
      ...profileData,
    }
  },

  [START_LOADING]: (state, _) => {
    state.loading = true
  },
  [END_LOADING]: (state, _) => {
    state.loading = false
  },
  [UPDATE_USER]: (state) => {
    state.loading = true
  },
  [UPDATE_USER_SUCCESS]: (state, payload) => {
    state.loading = false
    state.authUser = {...state.authUser, ...payload.profileData}
  },
  [UPDATE_USER_FAIL]: (state, _) => {
    state.loading = false
  },
}
