// * Mutation Types
export const ADD_TRANSACTION = 'ADD_TRANSACTION'
export const ADD_TRANSACTION_SUCCESS = 'ADD_TRANSACTION_SUCCESS'
export const ADD_TRANSACTION_FAIL = 'ADD_TRANSACTION_FAIL'
export const SET_TRANSACTION = 'SET_TRANSACTION'
export const SET_TRANSACTION_SUCCESS = 'SET_TRANSACTION_SUCCESS'
export const SET_TRANSACTION_FAIL = 'SET_TRANSACTION_FAIL'
export const SET_SELECTED_TRANSACTION = 'SET_SELECTED_TRANSACTION'
export const SET_SELECTED_TRANSACTION_SUCCESS =
  'SET_SELECTED_TRANSACTION_SUCCESS'
export const SET_SELECTED_TRANSACTION_FAIL = 'SET_SELECTED_TRANSACTION_FAIL'

export default {
  [SET_TRANSACTION]: (state) => {
    state.loading = true
  },
  [SET_TRANSACTION_SUCCESS]: (state, {data}) => {
    state.list = [...data]
    state.loading = false
  },
  [SET_TRANSACTION_FAIL]: (state, _) => {
    state.loading = false
  },
  [SET_SELECTED_TRANSACTION]: (state) => {
    state.loading = true
  },
  [SET_SELECTED_TRANSACTION_SUCCESS]: (state, {transaction}) => {
    state.selectedProperty = {...transaction}
    state.loading = false
  },
  [SET_SELECTED_TRANSACTION_FAIL]: (state, _) => {
    state.loading = false
  },
  [ADD_TRANSACTION]: (state) => {
    state.loading = true
  },
  [ADD_TRANSACTION_SUCCESS]: (state, _) => {
    state.loading = false
  },
  [ADD_TRANSACTION_FAIL]: (state, _) => {
    state.loading = false
    // state.transaction.list = payload
  },
}
