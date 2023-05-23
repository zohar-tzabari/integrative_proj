import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import objectReducer from "./objectSlice";
import miniAppReducer from "./miniAppSlice";

const Store = configureStore({
  reducer: {
    userEmail: userReducer,
    objectManager: objectReducer,
    miniAppName:miniAppReducer
  },
});
export default Store;
