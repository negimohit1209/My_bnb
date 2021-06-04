import {START_LOADING, END_LOADING} from '../mutations'
import {showNotification} from '../../Utils/helperFunctions'
import {
  ADD_TRANSACTION,
  ADD_TRANSACTION_SUCCESS,
  ADD_TRANSACTION_FAIL,
  SET_TRANSACTION_FAIL,
  SET_TRANSACTION,
  SET_TRANSACTION_SUCCESS,
  SET_SELECTED_TRANSACTION,
  SET_SELECTED_TRANSACTION_SUCCESS,
} from './mutations'

export default {
  async create({commit}, {transaction}) {
    commit(START_LOADING, null, {root: true})
    commit(ADD_TRANSACTION)
    try {
      const transactionRef = this.$fire.firestore.collection(`transaction`)
      await transactionRef.add(transaction)
      showNotification('success', 'Transaction Successful', 'Yeah we did it')
      commit(ADD_TRANSACTION_SUCCESS)
      commit(END_LOADING, null, {root: true})
    } catch (e) {
      console.log(e)
      showNotification('error', 'Error', 'Something Went wrong')
      commit(ADD_TRANSACTION_FAIL)
    }
  },
  async fetchAllTransaction({commit, rootState}, {currentUserId}) {
    commit(START_LOADING, null, {root: true})
    commit(SET_TRANSACTION)
    try {
      const transactionRef = this.$fire.firestore
        .collection('transaction')
        .where('userid', '==', currentUserId)
        .orderBy('createdat', 'desc')
      await transactionRef.onSnapshot((snapshot) => {
        const data = []
        snapshot.forEach((doc) => {
          data.push({...doc.data(), id: doc.id})
        })
        commit(SET_TRANSACTION_SUCCESS, {data})
        commit(END_LOADING, null, {root: true})
      })
    } catch (e) {
      showNotification('error', 'Error', 'Something Went wrong')
      commit(SET_TRANSACTION_FAIL)
    }
  },
  async fetchselectedTransaction({commit, getters}, payload) {
    commit(START_LOADING, null, {root: true})
    commit(SET_SELECTED_TRANSACTION)
    const transaction = getters.getAllTransactionList.find(
      (transaction) => transaction.id === payload.transactionid
    )
    if (transaction) {
      commit(SET_SELECTED_TRANSACTION_SUCCESS, {transaction})
      commit(END_LOADING, null, {root: true})
    } else {
      const selectedTransactionRef = this.$fire.database.ref(
        `transaction/${payload.transactionid}`
      )
      await selectedTransactionRef.on('value', (snapshot) => {
        const data = snapshot.val()
        commit(SET_SELECTED_TRANSACTION_SUCCESS, {
          transaction: {...data, id: payload.transactionid},
        })
        commit(END_LOADING, null, {root: true})
      })
      // commit(SET_SELECTED_TRANSACTION_SUCCESS, {transaction})
      // commit(END_LOADING, null, {root: true})
    }

    // try {
    //   if (this.transaction) const transactionRef = this.$fire.database.ref('transaction')
    //   await transactionRef.on('value', (snapshot) => {
    //     const data = convertFirebaseDataToArray(snapshot.val())
    //     commit(SET_TRANSACTION_SUCCESS, {data})
    //     commit(END_LOADING, null, {root: true})
    //   })
    // }
    // catch (e) {
    //   showNotification('error', 'Error', 'Something Went wrong')
    //   commit(SET_TRANSACTION_FAIL)
    // }
  },
}
