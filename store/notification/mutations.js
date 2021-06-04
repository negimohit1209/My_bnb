// * Mutation Types
export const ADD_NOTIFICATION = 'ADD_NOTIFICATION'
export const ADD_NOTIFICATION_SUCCESS = 'ADD_NOTIFICATION_SUCCESS'
export const ADD_NOTIFICATION_FAIL = 'ADD_NOTIFICATION_FAIL'
export const SET_NOTIFICATION = 'SET_NOTIFICATION'
export const SET_NOTIFICATION_SUCCESS = 'SET_NOTIFICATION_SUCCESS'
export const SET_NOTIFICATION_FAIL = 'SET_NOTIFICATION_FAIL'
export const SET_SELECTED_NOTIFICATION = 'SET_SELECTED_NOTIFICATION'
export const SET_SELECTED_NOTIFICATION_SUCCESS =
  'SET_SELECTED_NOTIFICATION_SUCCESS'
export const SET_SELECTED_NOTIFICATION_FAIL = 'SET_SELECTED_NOTIFICATION_FAIL'

export default {
  [SET_NOTIFICATION]: (state) => {
    state.loading = true
  },
  [SET_NOTIFICATION_SUCCESS]: (state, {data}) => {
    state.list = [...data]
    state.loading = false
  },
  [SET_NOTIFICATION_FAIL]: (state, _) => {
    state.loading = false
  },
  [SET_SELECTED_NOTIFICATION]: (state) => {
    state.loading = true
  },
  [SET_SELECTED_NOTIFICATION_SUCCESS]: (state, {notification}) => {
    state.selectedProperty = {...notification}
    state.loading = false
  },
  [SET_SELECTED_NOTIFICATION_FAIL]: (state, _) => {
    state.loading = false
  },
  [ADD_NOTIFICATION]: (state) => {
    state.loading = true
  },
  [ADD_NOTIFICATION_SUCCESS]: (state, _) => {
    state.loading = false
  },
  [ADD_NOTIFICATION_FAIL]: (state, _) => {
    state.loading = false
    // state.notification.list = payload
  },
}
