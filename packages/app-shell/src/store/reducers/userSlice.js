import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: '',
};

const userSlice = createSlice({
  name: 'user', // Slice 名称
  initialState,    // 初始状态
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

// 导出 action creators
export const { setToken } = userSlice.actions;

// 导出 reducer
export default userSlice.reducer;