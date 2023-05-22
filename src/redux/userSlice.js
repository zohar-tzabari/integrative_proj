import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userEmail: "still not connected",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserEmail: (state, action) => {
      console.log(state, action);
      state.userEmail = action.payload.email;
    },
  },
});

export const { setUserEmail } = userSlice.actions;
export default userSlice.reducer;