import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import objectReducer from "./objectSlice";
import guestsReducer from "./guestsSlice";
import catagoryReudcer from "./catagorySlice"
import miniAppReducer from "./miniAppSlice";

const Store = configureStore({
  reducer: {
    userEmail: userReducer,
    objectManager: objectReducer,
    all_gusets:guestsReducer,
    all_catagroies:catagoryReudcer,
    miniAppName:miniAppReducer
  },
});
export default Store;
