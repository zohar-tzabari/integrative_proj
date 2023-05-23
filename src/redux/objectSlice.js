import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  objectManager: {
    superApp: "zohar",
    internalObjectId: "still not",
    type: "",
  },
};

const objecctSlice = createSlice({
  name: "objectManager",
  initialState,
  reducers: {
    setManagerObjectId: (state, action) => {
      console.log(state, action);
      state.objectManager.objectId = action.payload.registerObject.objectId;
      state.objectManager.type = action.payload.registerObject.type;
    },
  },
});

export const { setManagerObjectId } = objecctSlice.actions;
export default objecctSlice.reducer;
