import { createSlice } from '@reduxjs/toolkit';
// import { AppThunk } from 'store';

// import { Credentials, login } from 'api/auth';

let seoPumpkinUser = sessionStorage.getItem('seoPumpkinUser');
if (!seoPumpkinUser) seoPumpkinUser = '{}';

const initialState = JSON.parse(seoPumpkinUser);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action) {
      sessionStorage.setItem('seoPumpkinUser', JSON.stringify(action.payload));
      return action.payload;
    },
  },
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;

// export const fetchUser = (credentials: Credentials): AppThunk => async (
//   dispatch
// ) => {
//   try {
//     const userDetails = await login(credentials);
//     dispatch(setUser(userDetails));
//   } catch {
//     dispatch(setUser({}));
//   }
// };
