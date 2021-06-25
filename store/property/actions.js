import {START_LOADING, END_LOADING} from '../mutations'
import {showNotification} from '../../Utils/helperFunctions'
import {
  ADD_PROPERTY_SUCCESS,
  ADD_PROPERTY_FAIL,
  SET_PROPERTY_FAIL,
  SET_PROPERTY,
  SET_PROPERTY_SUCCESS,
  SET_SELECTED_PROPERTY,
  SET_SELECTED_PROPERTY_SUCCESS,
  SET_PROPERTY_FILTER,
} from './mutations'

export default {
  async create({commit}, {property}) {
    commit(START_LOADING, null, {root: true})
    try {
      const propertyRef = this.$fire.firestore.collection(`property`)
      await propertyRef.add(property)
      showNotification(
        'success',
        'Property Created',
        'Successfully Created Property'
      )
      commit(ADD_PROPERTY_SUCCESS)
      commit(END_LOADING, null, {root: true})
    } catch (e) {
      console.log(e)
      showNotification('error', 'Error', 'Something Went wrong')
      commit(ADD_PROPERTY_FAIL)
    }
  },
  async getAll({commit}) {
    commit(START_LOADING, null, {root: true})
    commit(SET_PROPERTY)
    try {
      const propertyRef = this.$fire.firestore.collection('property')
      await propertyRef.onSnapshot((snapshot) => {
        const data = []
        snapshot.forEach((doc) => {
          data.push({...doc.data(), id: doc.id})
        })
        commit(SET_PROPERTY_SUCCESS, {data})
        commit(END_LOADING, null, {root: true})
      })
    } catch (e) {
      showNotification('error', 'Error', 'Something Went wrong')
      commit(SET_PROPERTY_FAIL)
    }
  },
  async fetchselectedProperty({commit, getters}, payload) {
    commit(START_LOADING, null, {root: true})
    commit(SET_SELECTED_PROPERTY)
    console.log('payload', payload)
    let property = getters.getAllPropertyList.find(
      (property) => property.id === payload.propertyid
    )
    if (!property) {
      const selectedPropertyRef = this.$fire.firestore
        .collection(`property`)
        .doc(payload.propertyid)
      const propertyDoc = await selectedPropertyRef.get()
      property = propertyDoc.data()
    }

    // await selectedPropertyRef.onSnapshot((snapshot) => {
    //   const data = snapshot.data()
    // commit(SET_SELECTED_PROPERTY_SUCCESS, {
    //   property: {...data, id: payload.propertyid},
    // })
    // commit(END_LOADING, null, {root: true})
    // })
    if (property.ownerid) {
      const ownerUserRef = this.$fire.firestore
        .collection(`users`)
        .doc(property.ownerid)
      const ownerUserDoc = await ownerUserRef.get()
      property.owner = ownerUserDoc.data()
    }
    commit(SET_SELECTED_PROPERTY_SUCCESS, {
      property: {...property, id: payload.propertyid},
    })
    commit(END_LOADING, null, {root: true})
  },

  setPropertyFilter({commit}, payload) {
    commit(SET_PROPERTY_FILTER, payload)
  },
}
