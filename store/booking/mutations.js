// * Mutation Types
export const ADD_BOOKING = 'ADD_BOOKING'
export const ADD_BOOKING_SUCCESS = 'ADD_BOOKING_SUCCESS'
export const ADD_BOOKING_FAIL = 'ADD_BOOKING_FAIL'
export const SET_BOOKING = 'SET_BOOKING'
export const SET_BOOKING_SUCCESS = 'SET_BOOKING_SUCCESS'
export const SET_BOOKING_FAIL = 'SET_BOOKING_FAIL'
export const SET_SELECTED_BOOKING = 'SET_SELECTED_BOOKING'
export const SET_SELECTED_BOOKING_SUCCESS = 'SET_SELECTED_BOOKING_SUCCESS'
export const SET_SELECTED_BOOKING_FAIL = 'SET_SELECTED_BOOKING_FAIL'

export default {
  [SET_BOOKING]: (state) => {
    state.loading = true
  },
  [SET_BOOKING_SUCCESS]: (state, {data}) => {
    state.loading = false
    state.list = [...data]
  },
  [SET_BOOKING_FAIL]: (state, _) => {
    state.loading = false
  },
  [SET_SELECTED_BOOKING]: (state) => {
    state.loading = true
  },
  [SET_SELECTED_BOOKING_SUCCESS]: (state, {booking}) => {
    state.selectedBooking = {...booking}
    state.loading = false
  },
  [SET_SELECTED_BOOKING_FAIL]: (state, _) => {
    state.loading = false
  },
  [ADD_BOOKING]: (state) => {
    state.loading = true
  },
  [ADD_BOOKING_SUCCESS]: (state, _) => {
    state.loading = false
  },
  [ADD_BOOKING_FAIL]: (state, _) => {
    state.loading = false
    // state.property.list = payload
  },
}
