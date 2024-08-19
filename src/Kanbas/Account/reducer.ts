import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  currentUser: null,
<<<<<<< HEAD
};
=======
  
  // Mon
  userRole: null,
  userLoginId:null
};

>>>>>>> 99ca15e (Initial commit)
const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
<<<<<<< HEAD
=======

      // Mon
      state.userRole = action.payload?.role || null;
      state.userLoginId = action.payload?.loginId || null;

>>>>>>> 99ca15e (Initial commit)
    },
  },
});
export const { setCurrentUser } = accountSlice.actions;
export default accountSlice.reducer;

