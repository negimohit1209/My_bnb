export default {
  isLoggedIn: (state) => {
    try {
      return state.authUser.uid !== null
    } catch {
      return false
    }
  },
  isLoading: (state) => {
    try {
      return state.loading
    } catch {
      return false
    }
  },
  currentLoggedInUser: (state) => {
    try {
      return state.authUser
    } catch {
      return {}
    }
  },
}
