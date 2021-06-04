export default {
  isLoading: (state) => {
    try {
      return state.loading
    } catch {
      return false
    }
  },
  getAllNotificationList: (state) => {
    try {
      return state.list
    } catch {
      return []
    }
  },
  getSelectedNotification: (state) => {
    try {
      return state.selectedNotification
    } catch {
      return null
    }
  },
}
