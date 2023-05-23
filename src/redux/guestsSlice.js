import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  all_gusets: [],
  id:0,
};

const guestsSlice = createSlice({
  name: "guests_list",
  initialState,
  reducers: {
    addGuest: (state, action) => {
      state.all_gusets = [...state.all_gusets, action.payload];
      console.log(state.all_gusets);
      console.log(action.payload);
    },
  },
});

export const { addGuest } = guestsSlice.actions;
export default guestsSlice.reducer;