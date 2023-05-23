import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  miniAppName: "",
};

const miniAppSlice = createSlice({
  name: "miniApp",
  initialState,
  reducers: {
    setMiniAppName: (state, action) => {
      state.miniAppName = action.payload;
    },
  },
});

export const { setMiniAppName } = miniAppSlice.actions;
export default miniAppSlice.reducer;