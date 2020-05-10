import { createSlice, PayloadAction } from '@reduxjs/toolkit';

let seoPumpkinUser = sessionStorage.getItem('seoPumpkinUser');
if (!seoPumpkinUser) seoPumpkinUser = '{}';

interface InitialState {
  seoPumpkinUser: object;
}

const initialState: InitialState = JSON.parse(seoPumpkinUser);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<any>): void {
      sessionStorage.setItem('seoPumpkinUser', JSON.stringify(action.payload));
      return action.payload;
    },
  },
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;
