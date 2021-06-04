export default {
  isLoading: (state) => {
    try {
      return state.loading
    } catch {
      return false
    }
  },
  getAllBookingList: (state) => {
    try {
      return state.list
    } catch {
      return []
    }
  },
  getSelectedBooking: (state) => {
    try {
      return state.selectedBooking
    } catch {
      return null
    }
  },
}
