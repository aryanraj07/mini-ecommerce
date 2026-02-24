import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/features/user/userSlice";
import wishlistReducer from "@/features/wishlist/wishlistSlice";
import filterReducer from "@/features/filters/filterSlice";
export const store = configureStore({
  reducer: {
    filter: filterReducer,
    user: userReducer,
    wishlist: wishlistReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
