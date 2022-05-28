import { createSlice } from 'node_modules/@reduxjs/toolkit/dist'

interface IGlobalConfigDataStore {
  defaults: {
    currency: string
    language: string
  }
  isSuperAdmin: boolean | undefined
  showLoader: boolean
  isFormFilled: boolean
}

const initialState: IGlobalConfigDataStore = {
  defaults: {
    currency: '',
    language: '',
  },
  isSuperAdmin: undefined,
  showLoader: true,
  isFormFilled: false,
}

const GlobalConfigDataStore = createSlice({
  name: 'GlobalConfigDataStore',
  initialState,
  reducers: {
    setDefaults(state, action) {
      state.defaults = action.payload
    },
    setIsSuperAdmin(state, action) {
      state.isSuperAdmin = action.payload
    },
    setShowLoader(state, action) {
      state.showLoader = action.payload
    },
    resetGlobalConfigDataStore() {
      return initialState
    },
    setIsFormFilled(state, action) {
      state.isFormFilled = action.payload
    },
  },
})

export const {
  setDefaults,
  setIsSuperAdmin,
  resetGlobalConfigDataStore,
  setShowLoader,
  setIsFormFilled,
} = GlobalConfigDataStore.actions

export default GlobalConfigDataStore.reducer
