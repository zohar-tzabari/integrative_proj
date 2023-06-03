import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  all_gusets: [],
};

const guestsSlice = createSlice({
  name: "guests_list",
  initialState,
  reducers: {
    addGuest: (state, action) => {
      state.all_gusets = [...state.all_gusets, action.payload];
    },
    set_all_Guests: (state, action) => {
      state.all_gusets = action.payload;
    },
  },
});

export const { addGuest,set_all_Guests } = guestsSlice.actions;
export default guestsSlice.reducer;