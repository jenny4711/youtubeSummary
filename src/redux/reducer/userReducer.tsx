import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserState } from '../../utils/interface';
const initialState:UserState={
  data:null,
  loading:false,
  error:"",
  lang:"",
  summary:"",
  credit:0,
  user:null,
};

const userSlice = createSlice({
  name:'user',
  initialState,
  reducers:{
    allRequest:(state)=>{
      state.loading=true;
      state.data=null,
      state.error=""
      
    },
    successGetSummary:(state,action:PayloadAction<any>)=>{
      state.loading=false;
      state.summary=action.payload
    },
    successGetData:(state,action)=>{
      state.loading=false;
      state.data=action.payload
    },
    successShowCredit:(state,action)=>{
      state.loading=false;
      state.credit=action.payload
    },
    successShowLang:(state,action)=>{
      state.loading=false;
      state.lang=action.payload
    }
  }
})

export const userActions = userSlice.actions;

export default userSlice.reducer;