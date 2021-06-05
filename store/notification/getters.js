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
  getNotReadNotificationCount: (state) => {
    let count = 0
    state.list.forEach((notification) => {
      if (!notification.read) count++
    })
    return count
  },
  getSelectedNotification: (state) => {
    try {
      return state.selectedNotification
    } catch {
      return null
    }
  },
}
