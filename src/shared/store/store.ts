import { configureStore } from "@reduxjs/toolkit";
import purchaseReducer from "./purchaseSlice";

export const store = configureStore({
  reducer: {
    purchase: purchaseReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
