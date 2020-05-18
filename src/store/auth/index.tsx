import { createSlice, PayloadAction } from '@reduxjs/toolkit';

let seoPumpkinUser = sessionStorage.getItem('seoPumpkinUser');
if (!seoPumpkinUser) seoPumpkinUser = '{}';

interface UserDetails {
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  phoneNumber: string;
  resetPassword: string;
  status: string;
}

type Authorities = string[];
type Roles = string[];

type UserToken = string;

interface SliceState {
  // user: {
  userDetails: UserDetails;
  userToken: UserToken;
  roles: Roles;
  authorities: Authorities;
  // };
}

const initialState: SliceState = JSON.parse(seoPumpkinUser);

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
