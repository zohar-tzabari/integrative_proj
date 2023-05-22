import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import objectReducer from "./objectSlice";

const Store = configureStore({
  reducer: {
    userEmail: userReducer,
    objectManager: objectReducer,
  },
});
export default Store;
