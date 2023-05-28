import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import objectReducer from "./objectSlice";
import miniAppReducer from "./miniAppSlice";

const Store = configureStore({
  reducer: {
    user: userReducer,
    objectManager: objectReducer,
    miniApp:miniAppReducer,
  },
});
export default Store;
