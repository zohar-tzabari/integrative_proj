import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  objectManager: {}
};

const objecctSlice = createSlice({
  name: "objectManager",
  initialState,
  reducers: {
    setManagerObject: (state, action) => {
      console.log(state, action);
      state.objectManager = action.payload;
    },
  },
});

export const { setManagerObject } = objecctSlice.actions;
export default objecctSlice.reducer;
