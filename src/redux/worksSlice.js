import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const worksSlice = createSlice({
  name: 'works',
  initialState,
  reducers: {
    add: (state, action) => {
      return [...state, action.payload];
    },
  },
})

export const { add } = worksSlice.actions;

export default worksSlice.reducer;
