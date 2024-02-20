import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HistoryState } from '../../utils/interface';

const initialState:HistoryState={
  summary:"",
  loading:false,
  error:"",
  data:null,
}
const historySlice = createSlice({
  name:'history',
  initialState,
  reducers:{
    allRequest:(state)=>{
      state.loading=true;
      state.data=null,
      state.error=""
      
    },
    successGetData:(state,action:PayloadAction)=>{
      state.loading=false;
      state.data=action.payload;
    },
    getErrorMSG:(state,action:PayloadAction)=>{
      state.loading=false;
      state.data=action.payload
    }
  }
})

export const historyActions = historySlice.actions
export default historySlice.reducer;