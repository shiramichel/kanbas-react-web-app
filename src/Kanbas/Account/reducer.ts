import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  currentUser: null,
  
  // Mon
  userRole: null,
  userLoginId:null
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;

      // Mon
      state.userRole = action.payload?.role || null;
      state.userLoginId = action.payload?.loginId || null;

    },
  },
});
export const { setCurrentUser } = accountSlice.actions;
export default accountSlice.reducer;

