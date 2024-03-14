// authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import signIn from "../../auth/getCurrentUser";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    userData: { name: signIn()? signIn().username: "", email: "" },
  },
  reducers: {

    updateData: (state, action) => {
      state.userData = action.payload;
    },

  },
});

// Action creators are generated for each case reducer function
export const { updateData } = authSlice.actions;

export default authSlice.reducer;