import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userReducer';
import historyReducer from './historyReducer';



export const store=configureStore({
  reducer:{
  user:userReducer,
  history:historyReducer,
  }
})
// RootState 타입을 export하여 다른 곳에서 사용할 수 있게 합니다.
export type RootState = ReturnType<typeof store.getState>;

// AppDispatch 타입도 export하여 필요한 곳에서 사용할 수 있게 합니다.
export type AppDispatch = typeof store.dispatch;
