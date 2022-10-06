import { createSlice } from "@reduxjs/toolkit";

export const UserInfoSlice = createSlice({
  name: "UserInfoSlice",
  initialState: {
    address: undefined,
    userId: undefined,
    userBio: undefined,
    userPFPAddress: undefined,
    headerClickSwitch: "",
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
    setHeaderClickSwitch: (state, action) => {
      state.headerClickSwitch = action.payload;
    },
  },
});

export const { setAddress, setUserId, setUserBio, setUserPFPAddress, setHeaderClickSwitch } =
  UserInfoSlice.actions;

export const selectAddress = (state) => state.userInfo.address;
export const selectUserId = (state) => state.userInfo.userId;
export const selectUserBio = (state) => state.userInfo.userBio;
export const selectUserPFPAddress = (state) => state.userInfo.userPFPAddress;
export const selectHeaderClickSwitch = (state) => state.userInfo.headerClickSwitch;

export default UserInfoSlice.reducer;
