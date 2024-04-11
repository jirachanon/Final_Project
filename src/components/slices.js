import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    user: {},
    bp: {}
}

const slice = createSlice({
    name: "slice",
    initialState,
    reducers: {
      setUser: (state, action) => {
        state.user = action.payload;
      },
      setBp: (state, action) => {
        state.bp = action.payload;
      },
    },
  });
  
  export const { setUser, setBp } = slice.actions;
  export default slice.reducer;