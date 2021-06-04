import {START_LOADING, END_LOADING} from '../mutations'
import {showNotification} from '../../Utils/helperFunctions'
import {
  ADD_NOTIFICATION,
  ADD_NOTIFICATION_SUCCESS,
  ADD_NOTIFICATION_FAIL,
  SET_NOTIFICATION_FAIL,
  SET_NOTIFICATION,
  SET_NOTIFICATION_SUCCESS,
  SET_SELECTED_NOTIFICATION,
  SET_SELECTED_NOTIFICATION_SUCCESS,
} from './mutations'

export default {
  async create({commit}, {notification}) {
    commit(START_LOADING, null, {root: true})
    commit(ADD_NOTIFICATION)
    try {
      const notificationRef = this.$fire.firestore.collection(`notification`)
      await notificationRef.add(notification)
      showNotification('success', 'Transaction Successful', 'Yeah we did it')
      commit(ADD_NOTIFICATION_SUCCESS)
      commit(END_LOADING, null, {root: true})
    } catch (e) {
      console.log(e)
      showNotification('error', 'Error', 'Something Went wrong')
      commit(ADD_NOTIFICATION_FAIL)
    }
  },
  async getAll({commit}, {where, value}) {
    commit(START_LOADING, null, {root: true})
    commit(SET_NOTIFICATION)
    try {
      let notificationRef = this.$fire.firestore.collection('notification')
      if (where && value) {
        notificationRef = notificationRef
          .where(where, '==', value)
          .orderBy('createdat', 'desc')
      }
      await notificationRef.onSnapshot((snapshot) => {
        const data = []
        snapshot.forEach((doc) => {
          data.push({...doc.data(), id: doc.id})
        })
        console.log(data)
        commit(SET_NOTIFICATION_SUCCESS, {data})
        commit(END_LOADING, null, {root: true})
      })
    } catch (e) {
      showNotification('error', 'Error', 'Something Went wrong')
      commit(SET_NOTIFICATION_FAIL)
    }
  },
  async fetchselectedNotification({commit, getters}, payload) {
    commit(START_LOADING, null, {root: true})
    commit(SET_SELECTED_NOTIFICATION)
    console.log('payload', payload)
    const notification = getters.getAllNotificationList.find(
      (notification) => notification.id === payload.notificationid
    )
    if (notification) {
      commit(SET_SELECTED_NOTIFICATION_SUCCESS, {notification})
      commit(END_LOADING, null, {root: true})
    } else {
      const selectedNotificationRef = this.$fire.database.ref(
        `notification/${payload.notificationid}`
      )
      await selectedNotificationRef.on('value', (snapshot) => {
        const data = snapshot.val()
        commit(SET_SELECTED_NOTIFICATION_SUCCESS, {
          notification: {...data, id: payload.notificationid},
        })
        commit(END_LOADING, null, {root: true})
      })
      // commit(SET_SELECTED_NOTIFICATION_SUCCESS, {notification})
      // commit(END_LOADING, null, {root: true})
    }

    // try {
    //   if (this.notification) const notificationRef = this.$fire.database.ref('notification')
    //   await notificationRef.on('value', (snapshot) => {
    //     const data = convertFirebaseDataToArray(snapshot.val())
    //     commit(SET_NOTIFICATION_SUCCESS, {data})
    //     commit(END_LOADING, null, {root: true})
    //   })
    // }
    // catch (e) {
    //   showNotification('error', 'Error', 'Something Went wrong')
    //   commit(SET_NOTIFICATION_FAIL)
    // }
  },
}
