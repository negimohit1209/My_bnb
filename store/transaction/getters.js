export default {
  isLoading: (state) => {
    try {
      return state.loading
    } catch {
      return false
    }
  },
  getAllTransactionList: (state) => {
    try {
      return state.list
    } catch {
      return []
    }
  },
  getBalance: (state) => {
    try {
      let balance = 0
      state.list.forEach((trans) => {
        if (trans.type === 'credit') balance += trans.amount
        else balance -= trans.amount
      })
      return balance
    } catch {
      return []
    }
  },
  getSelectedTransaction: (state) => {
    try {
      return state.selectedTransaction
    } catch {
      return null
    }
  },
}
