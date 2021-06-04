import Vue from 'vue'
import {differenceInCalendarDays, parse, format, formatDistance} from 'date-fns'

export const showNotification = (
  type = 'info',
  title = 'Notification',
  text = ''
) => {
  Vue.notify({
    group: 'main',
    type,
    title,
    text,
  })
}

export const convertFirebaseDataToArray = (object) => {
  const arr = []
  for (const obj in object) {
    const myobject = {
      id: obj,
      ...object[obj],
    }
    arr.push(myobject)
  }
  return [...arr]
}

export const getDaysBetweenDates = (dates) => {
  return differenceInCalendarDays(
    parse(dates[1], 'yyyy-MM-dd', new Date()),
    parse(dates[0], 'yyyy-MM-dd', new Date())
  )
}

export const getFormattedDate = (date) => {
  return format(parse(date, 'yyyy-MM-dd', new Date()), 'MMM dd, yyyy')
}

export const getDistanceBetween = (date) => {
  return formatDistance(date, new Date(), {addSuffix: true})
}
