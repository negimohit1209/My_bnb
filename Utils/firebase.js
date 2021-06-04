import firebase from 'firebase'

export const firebaseTimestamp = () =>
  firebase.firestore.FieldValue.serverTimestamp()
