export default {
  isLoading: (state) => {
    try {
      return state.loading
    } catch {
      return false
    }
  },
  getAllPropertyList: (state) => {
    try {
      return state.list
    } catch {
      return []
    }
  },
  getSelectedProperty: (state) => {
    try {
      return state.selectedProperty
    } catch {
      return null
    }
  },
}
