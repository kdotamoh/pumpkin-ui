import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitialState {
  token: object;
}

const initialState: InitialState = {
  token: {},
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<any>): void {
      const { user } = action.payload;
      state.token = user;
    },
  },
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;
