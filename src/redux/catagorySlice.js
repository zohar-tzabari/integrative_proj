import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  all_catagroies: [],
};

const catagorySlice = createSlice({
  name: "catagroies_list",
  initialState,
  reducers: {
    addCatagory: (state, action) => {
      state.all_catagroies = [...state.all_catagroies, action.payload];
    },
  },
});

export const { addCatagory } = catagorySlice.actions;
export default catagorySlice.reducer;