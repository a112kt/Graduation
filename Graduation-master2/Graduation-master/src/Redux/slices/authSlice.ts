import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

type authState = {
    token:string | null;
}
const initialState:authState={
  token:null
}
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken:(state, action: PayloadAction<string>)=>{
      state.token = action.payload;
  },
    clearToken:(state)=>{
        state.token = null;
    }

}})

export default authSlice.reducer;
export const {setToken,clearToken}=authSlice.actions
