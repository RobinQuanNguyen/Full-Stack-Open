import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: '',
  duration: 5,  // Duration in seconds
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      state.message = action.payload.message
      state.duration = action.payload.duration || 5
    },
    clearNotification(state) {
      state.message = ''
      state.duration = 5
    },
  },
})

export const { setNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer

// Simplified notification action creator
export const setNotificationTime = (message, duration) => {
  return (dispatch) => {
    dispatch(setNotification({ message, duration }))  // Set the notification message and duration
    setTimeout(() => {
      dispatch(clearNotification())  // Clear the notification after the specified duration
    }, duration * 1000)  // Convert seconds to milliseconds
  }
}
