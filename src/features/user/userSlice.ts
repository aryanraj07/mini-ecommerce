import axiosInstance from "@/auth/axiosInstance";
import { User } from "@/types/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
interface UserState {
  user: User | null;
}
const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state, action) => {
      state.user = null;
    },
  },
});
export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
