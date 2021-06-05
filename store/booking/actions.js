import {START_LOADING, END_LOADING} from '../mutations'
import {showNotification} from '../../Utils/helperFunctions'
import {
  ADD_BOOKING_SUCCESS,
  ADD_BOOKING_FAIL,
  SET_BOOKING_FAIL,
  SET_BOOKING,
  SET_BOOKING_SUCCESS,
  SET_SELECTED_BOOKING,
  SET_SELECTED_BOOKING_SUCCESS,
  SET_SELECTED_BOOKING_FAIL,
} from './mutations'

export default {
  async create({commit}, {booking, transaction, notification, method}) {
    commit(START_LOADING, null, {root: true})
    try {
      // if (!method) method = 'create'
      const bookingRef = this.$fire.firestore.collection(`booking`)
      const transactionRef = this.$fire.firestore.collection(`transaction`)
      const notificationRef = this.$fire.firestore.collection(`notification`)
      let book
      if (method.name === 'create') {
        book = await bookingRef.add(booking)
      } else if (method.name === 'update') {
        book = await bookingRef.doc(booking.id).update({...booking.data})
      }
      if (method.name === 'create') {
        transaction = {...transaction, bookingid: book.id}
        notification = {
          ...notification,
          type: {name: 'booking', id: book.id},
          routeto: `${notification.routeto}${book.id}`,
        }
      }
      await transactionRef.add(transaction)
      await notificationRef.add(notification)
      showNotification(
        'success',
        'Booking Created',
        'Successfully Created Booking'
      )
      commit(ADD_BOOKING_SUCCESS)
      commit(END_LOADING, null, {root: true})
    } catch (e) {
      console.log(e)
      showNotification('error', 'Error', 'Something Went wrong')
      commit(ADD_BOOKING_FAIL)
    }
  },
  async getAll({commit}, {where, value}) {
    commit(START_LOADING, null, {root: true})
    commit(SET_BOOKING)
    try {
      let bookingRef = this.$fire.firestore.collection('booking')
      if (where && value) {
        bookingRef = bookingRef.where(where, '==', value)
      }
      await bookingRef.onSnapshot((snapshot) => {
        const data = []
        snapshot.forEach((doc) => {
          data.push({...doc.data(), id: doc.id})
        })
        console.log(data)
        commit(SET_BOOKING_SUCCESS, {data})
        commit(END_LOADING, null, {root: true})
      })
    } catch (e) {
      showNotification('error', 'Error', 'Something Went wrong')
      commit(SET_BOOKING_FAIL)
    }
  },
  async fetchselectedBooking({commit, getters}, {bookingid}) {
    commit(START_LOADING, null, {root: true})
    commit(SET_SELECTED_BOOKING)
    try {
      let booking = getters.getAllBookingList.find(
        (booking) => booking.id === bookingid
      )
      if (!booking) {
        const selectedBookingRef = this.$fire.firestore
          .collection(`booking`)
          .doc(bookingid)
        const bookingDoc = await selectedBookingRef.get()
        booking = bookingDoc.data()
      }
      booking.id = bookingid
      if (booking.guestid) {
        const guestUserRef = this.$fire.firestore
          .collection(`users`)
          .doc(booking.guestid)
        const guestUserDoc = await guestUserRef.get()
        booking.guest = guestUserDoc.data()
      }
      if (booking.ownerid) {
        const ownerUserRef = this.$fire.firestore
          .collection(`users`)
          .doc(booking.ownerid)
        const ownerUserDoc = await ownerUserRef.get()
        booking.owner = ownerUserDoc.data()
      }
      if (booking.propertyid) {
        const propertyRef = this.$fire.firestore
          .collection(`property`)
          .doc(booking.propertyid)
        const propertyDoc = await propertyRef.get()
        booking.property = propertyDoc.data()
      }

      commit(SET_SELECTED_BOOKING_SUCCESS, {
        booking: {...booking},
      })
      commit(END_LOADING, null, {root: true})
    } catch (e) {
      console.log(e)
      commit(SET_SELECTED_BOOKING_FAIL)
      commit(END_LOADING, null, {root: true})
    }
  },
}
