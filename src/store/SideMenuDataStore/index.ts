import { createSlice } from '@reduxjs/toolkit'

interface ISideMenuDataStore {
  activePage: boolean
}
const initialState: ISideMenuDataStore = {
  activePage: false,
}

const SideMenuDataStore = createSlice({
  name: 'sideMenuDataStore',
  initialState,
  reducers: {
    changePage(state, action) {
      state.activePage = action.payload
    },
  },
})
export const { changePage } = SideMenuDataStore.actions
export default SideMenuDataStore.reducer
