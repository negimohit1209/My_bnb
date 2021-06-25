export default {
  isLoading: (state) => {
    try {
      return state.loading
    } catch {
      return false
    }
  },
  getAllPropertyList: (state) => {
    try {
      return state.list
    } catch {
      return []
    }
  },
  getFilteredPropertyList: (state) => {
    const {filter, list} = state
    try {
      if (filter == null) return list
      const propertyList = [...list]
      let filterList = [...list]
      if (filter.priceFilter && filter.priceFilter.length > 0) {
        filterList = [...getPriceFilteredList(propertyList, filter.priceFilter)]
      }
      if (filter.typeFilter && filter.typeFilter.length > 0) {
        filterList = [...getTypeFilteredList(propertyList, filter.typeFilter)]
      }
      return filterList
    } catch {
      return []
    }
  },
  getSelectedProperty: (state) => {
    try {
      return state.selectedProperty
    } catch {
      return null
    }
  },
}

function getPriceFilteredList(property, filter) {
  const filteredProp = []
  property.forEach((prop) => {
    for (let i = 0; i < filter.length; i++) {
      if (
        prop.rent.amount < filter[i].max &&
        prop.rent.amount > filter[i].min
      ) {
        filteredProp.push(prop)
        break
      }
    }
  })
  return filteredProp
}

function getTypeFilteredList(property, filter) {
  const filteredProp = []
  property.forEach((prop) => {
    for (let i = 0; i < filter.length; i++) {
      if (prop.propertytype.primary === filter[i]) {
        filteredProp.push(prop)
        break
      }
    }
  })
  return filteredProp
}
