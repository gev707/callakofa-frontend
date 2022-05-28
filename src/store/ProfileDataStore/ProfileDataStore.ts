import { createSlice } from 'node_modules/@reduxjs/toolkit/dist'

interface IProfileDataStore {
  activeTab: 'overview' | 'edit' | 'pin' | 'default'
  activeProfileTab: 'personal' | 'security' | 'social'
  errorMessage: string
  accountInfo: Record<string, string>
}

const initialState: IProfileDataStore = {
  activeTab: 'overview',
  activeProfileTab: 'personal',
  errorMessage: '',
  accountInfo: {},
}

const ProfileDataStore = createSlice({
  name: 'ProfileDataStore',
  initialState,
  reducers: {
    changeTab(state, action) {
      state.activeTab = action.payload
    },
    changeProfileTab(state, action) {
      state.activeProfileTab = action.payload
    },
    setErrorMessage(state, action) {
      state.errorMessage = action.payload
    },
    setAccountInfo(state, action) {
      state.accountInfo = action.payload
    },
    resetProfileDataStore() {
      return initialState
    },
  },
})

export const {
  changeTab,
  changeProfileTab,
  setErrorMessage,
  setAccountInfo,
  resetProfileDataStore,
} = ProfileDataStore.actions

export default ProfileDataStore.reducer
