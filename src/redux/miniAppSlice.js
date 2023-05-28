import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  miniAppName: "",
  miniAppClientRole: "",
};

const miniAppSlice = createSlice({
  name: "miniApp",
  initialState,
  reducers: {
    setMiniAppName: (state, action) => {
      state.miniAppName = action.payload;
    },
    setMiniAppClientRole: (state, action) => {
      state.miniAppClientRole = action.payload;
    },
  },
});

export const { setMiniAppName,setMiniAppClientRole } = miniAppSlice.actions;
export default miniAppSlice.reducer;