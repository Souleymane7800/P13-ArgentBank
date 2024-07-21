import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  updatedAt: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  error: string | null;
  loading: boolean;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  status: number;
  message: string;
  body: { token: string };
}

export const loginUser = createAsyncThunk<
  LoginResponse,
  LoginPayload,
  {
    rejectValue: string;
  }
>('auth/login', async (payload, { rejectWithValue, dispatch }) => {
  try {
    const response = await axios.post<LoginResponse>(
      'http://localhost:3001/api/v1/user/login',
      payload
    );
    sessionStorage.setItem('token', response.data.body.token);
    return response.data;
  } catch (error) {
    dispatch(setError("An unexpected error occurred"));
    return rejectWithValue('An unexpected error occurred');
  }
});

// const initialState: AuthState = {
//   user: null,
//   token: null,
//   error: null,
//   loading: false,
// };

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null as User | null,
    token: null as string | null,
    error: null as string | null,
    loading: false,
  },
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state: AuthState) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state: AuthState, action: PayloadAction<LoginResponse>) => {
        state.loading = false;
        state.token = action.payload.body.token;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'An unexpected error occurred';
      });
  },
});

export const { reducer: authReducer, actions: authActions } = authSlice;
export const { setUser, setError, setToken } = authActions;