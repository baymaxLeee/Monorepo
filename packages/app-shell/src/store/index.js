import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer, // 添加 slice reducer
  },
});