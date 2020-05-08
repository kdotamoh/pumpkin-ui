import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Token {
  token: string;
}
interface InitialState {
  token: string;
}

const initialState: InitialState = {
  token: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<Token>): void {
      const { token } = action.payload;
      state.token = token;
    },
  },
});

export const { setToken } = authSlice.actions;

export default authSlice.reducer;
