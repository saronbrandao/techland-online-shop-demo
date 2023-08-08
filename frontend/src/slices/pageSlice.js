import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentPage: null,
};

const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    updatePage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
});

export const { updatePage } = pageSlice.actions;

export default pageSlice.reducer;
