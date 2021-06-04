export const property = {
  name: '',
  address: {
    flat: '',
    street: '',
    state: '',
    city: '',
    pin: '',
    landmark: '',
  },
  propertytype: {
    primary: '',
    secondary: '',
    place: '',
    guests: '',
    room: '',
    bed: '',
    bathroom: '',
  },
  aminity: {primary: [], safety: [], space: []},
  photos: [],
  Description: '',
  admin: {},
  phone: {
    number: '',
  },
  rules: [],
  checkintime: '',
  rent: {
    amount: '',
    maxAmount: '',
    minAmount: '',
    currency: '',
  },
}

export const booking = {
  propertyid: '',
  bookingDate: '',
  checkinDate: '',
  checkoutDate: '',
  paymentMode: '',
  amount: {
    base: '',
    tax: '',
    serviceCharge: '',
    discoutPct: '',
    discount: '',
    couponcode: '',
    couponDiscount: '',
  },
  guest: {
    adults: '',
    infants: '',
  },
}

export const images = {
  House: [
    'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1267&q=80',
    'https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80',
    'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80',
    'https://images.unsplash.com/photo-1576941089067-2de3c901e126?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1443&q=80',
  ],
  Flat: [
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    'https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    'https://images.unsplash.com/photo-1502672023488-70e25813eb80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1259&q=80',
    'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    'https://images.unsplash.com/photo-1499955085172-a104c9463ece?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  ],
}

export const primaryType = ['House', 'Flat']
export const secondaryType = {
  House: ['Bunglow', 'Cottage', 'Villa', 'Boat House'],
  Flat: ['Apartment', 'Loft', 'Rental Unit'],
}
export const place = ['Entire Place', 'Shared Room', 'Private Room']
export const primaryAminity = [
  'Essentials',
  'Cooking Basics',
  'Desk/workspace',
  'Iron',
  'Hairdryer',
  'Shampoo',
  'Hangers',
  'TV',
  'Heating',
  'Travel Cot',
  'wifi',
  'Breakfast, cofee, tea',
  'Air Conditioning',
  'Fireplace',
  'Private Entrance',
]
export const safetyAminity = [
  'Smoke detector',
  'Carbon monooxide detector',
  'First aid kit',
  'Fire Extinguisher',
  'Lock on bedroom door',
]
export const spaces = [
  'Laundry-dryer',
  'Hot tub',
  'Kitchen',
  'Pool',
  'Laundry-washing machine',
  'Lift',
  'Parking',
  'Gym',
]

export const fetchRandomProperty = () => {
  const property = {
    name: `Random Hotel-${Math.floor(Math.random() * 10000)}`,
    address: {
      flat: `Flat No. ${Math.floor(Math.random() * 1000)}`,
      street: `Street No. ${Math.floor(Math.random() * 100)}`,
      state: 'Rajasthan',
      city: 'Kota',
      pin: '323301',
      landmark: 'Near Bank of America',
    },
    propertytype: {
      primary: `${primaryType[Math.floor(Math.random() * primaryType.length)]}`,
      secondary: '', // * Setting secondary after the entire object is set as it's value depends on primary
      place: `${place[Math.floor(Math.random() * place.length)]}`,
      guests: Math.floor(Math.random() * 5) + 5,
      room: Math.floor(Math.random() * 3) + 2,
      bed: Math.floor(Math.random() * 5) + 5,
      bathroom: Math.floor(Math.random() * 3) + 1,
    },
    aminity: {
      primary: [
        'Essentials',
        'Cooking Basics',
        'Desk/workspace',
        'Iron',
        'Hairdryer',
        'Shampoo',
        'Hangers',
        'TV',
        'Heating',
        'Travel Cot',
        'wifi',
        'Breakfast, cofee, tea',
        'Air Conditioning',
        'Fireplace',
        'Private Entrance',
      ],
      safety: [
        'Smoke detector',
        'Carbon monooxide detector',
        'First aid kit',
        'Fire Extinguisher',
        'Lock on bedroom door',
      ],
      space: [
        'Laundry-dryer',
        'Hot tub',
        'Kitchen',
        'Pool',
        'Laundry-washing machine',
        'Lift',
        'Parking',
        'Gym',
      ],
    },
    images: [], // * Setting photos after the entire object is set as it's value depends on propertytype.primary
    description:
      'Enjoy convenience paired with comfort when you stay in this Sunny, Cozy and Centrally located Studio with outdoor sitting area right in the heart of Delhi. The Studio has been thoughtfully Designed in a quirky Modern style and it features modern amenities for business and pleasure. The studio is located in a peaceful and posh neighbourhood with attach private Patio, Kitchenette and ensuite washroom.Note - The studio is a part of house but it has private independent entrance with a private outdoor sitting area. Guest can also use an additional Common living and study room in the house plus the Common terrace between 9 am to 10 pm.',
    admin: {},
    phone: {
      number: `91${Math.floor(Math.random() * 100000000)}`,
    },
    rules: [],
    checkintime: '1000',
    rent: {
      amount: Math.floor(Math.random() * 1000) + 1000,
      maxAmount: Math.floor(Math.random() * 2000) + 2000,
      minAmount: Math.floor(Math.random() * 500) + 500,
      currency: 'INR',
    },
  }
  property.propertytype.secondary =
    secondaryType[property.propertytype.primary][
      Math.floor(Math.random() * primaryType.length)
    ]
  const myImages = [...images[property.propertytype.primary]]
  while (myImages.length) {
    const index = Math.floor(Math.random() * myImages.length)
    property.images.push(myImages[index])
    myImages.splice(index, 1)
  }
  return property
}
