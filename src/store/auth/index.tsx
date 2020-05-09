import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitialState {
  user: object;
}

const initialState: InitialState = {
  user: {},
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<any>): void {
      const { user } = action.payload;
      state.user = user;
    },
  },
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;
