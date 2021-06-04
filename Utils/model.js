export const users = {
  uid: '',
  fname: '',
  lname: '',
  email: '',
  username: '',
  phonenumber: '',
  role: '',
  displaypicture: '',
  gender: '',
  dateofbirth: '',
  govetnmentid: {name: '', number: '', images: []},
}

export const transaction = {
  id: '',
  userid: '',
  type: '',
  paymentmethod: '',
  comment: '',
  timestamp: '',
  amount: '',
  status: '',
}

export const notification = {
  id: '',
  receiverid: '',
  senderid: '',
  senderusername: '',
  senderdisplaypicture: '',
  message: '',
  routeto: '',
  read: false,
  createdat: '',
  linkedto: {
    name: 'booking',
    id: '',
  },
}
