// * Mutation Types
export const ADD_PROPERTY = 'ADD_PROPERTY'
export const ADD_PROPERTY_SUCCESS = 'ADD_PROPERTY_SUCCESS'
export const ADD_PROPERTY_FAIL = 'ADD_PROPERTY_FAIL'
export const SET_PROPERTY = 'SET_PROPERTY'
export const SET_PROPERTY_SUCCESS = 'SET_PROPERTY_SUCCESS'
export const SET_PROPERTY_FAIL = 'SET_PROPERTY_FAIL'
export const SET_SELECTED_PROPERTY = 'SET_SELECTED_PROPERTY'
export const SET_SELECTED_PROPERTY_SUCCESS = 'SET_SELECTED_PROPERTY_SUCCESS'
export const SET_SELECTED_PROPERTY_FAIL = 'SET_SELECTED_PROPERTY_FAIL'
export const SET_PROPERTY_FILTER = 'SET_PROPERTY_FILTER'

export default {
  [SET_PROPERTY]: (state) => {
    state.loading = true
  },
  [SET_PROPERTY_SUCCESS]: (state, {data}) => {
    state.loading = false
    state.list = [...data]
  },
  [SET_PROPERTY_FAIL]: (state, _) => {
    state.loading = false
  },
  [SET_SELECTED_PROPERTY]: (state) => {
    state.loading = true
  },
  [SET_SELECTED_PROPERTY_SUCCESS]: (state, {property}) => {
    state.selectedProperty = {...property}
    state.loading = false
  },
  [SET_SELECTED_PROPERTY_FAIL]: (state, _) => {
    state.loading = false
  },
  [ADD_PROPERTY]: (state) => {
    state.loading = true
  },
  [ADD_PROPERTY_SUCCESS]: (state, _) => {
    state.loading = false
  },
  [ADD_PROPERTY_FAIL]: (state, _) => {
    state.loading = false
    // state.property.list = payload
  },
  [SET_PROPERTY_FILTER]: (state, data) => {
    state.filter = {...state.filter, ...data}
  },
}
