import { createSlice } from "@reduxjs/toolkit";

export const UserInfoSlice = createSlice({
  name: "UserInfoSlice",
  initialState: {
    address: "",
    userId: "",
    userBio: "",
    userPFPAddress: "",
  },
  reducers: {
    setAddress: (state, action) => {
      state.address = action.payload;
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    setUserBio: (state, action) => {
      state.userBio = action.payload;
    },
    setUserPFPAddress: (state, action) => {
      state.userPFPAddress = action.payload;
    },
  },
});

export const { setAddress, setUserId, setUserBio, setUserPFPAddress } = UserInfoSlice.actions;

export const selectAddress = (state) => state.userInfo.address;
export const selectUserId = (state) => state.userInfo.userId;
export const selectUserBio = (state) => state.userInfo.userBio;
export const selectUserPFPAddress = (state) => state.userInfo.userPFPAddress;

export default UserInfoSlice.reducer;
