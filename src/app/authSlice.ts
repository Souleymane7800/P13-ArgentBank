import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

/**
 * Interface representing a user object in the application.
 */
interface User {
      _id: string;
      email: string;
      firstName: string;
      lastName: string;
      createdAt: string;
      updatedAt: string;
}

/**
 * Interface representing the auth state of the application.
 * Includes user information, token, error message, and loading state.
 */
interface AuthState {
      user: User | null;
      token: string | null;
      error: string | null;
      loading: boolean;
}

/**
 * Interface representing the payload for login action.
 */
export interface LoginPayload {
      email: string;
      password: string;
}

/**
 * Interface representing the response structure from the login API call.
 */
export interface LoginResponse {
      status: number;
      message: string;
      body: { token: string };
}

/**
 * Async thunk that handles user login logic.
 * Fetches user data from the API and dispatches actions based on the response.
 *
 * @param {LoginPayload} payload - Login credentials (email and password).
 * @param {ThunkAPI} thunkAPI - Redux Thunk API object.
 * @returns {Promise<LoginResponse>} - Promise resolving to the login response data.
 * @throws {string} - Rejects with an error message if login fails.
 */
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
            dispatch(setError('An unexpected error occurred'));
            return rejectWithValue(
                  'The password and your email do not match !'
            );
      }
});

/**
 * Redux Toolkit slice for managing authentication state.
 */
const authSlice = createSlice({
      name: 'auth',
      initialState: {
            user: null as User | null,
            token: null as string | null,
            error: null as string | null,
            loading: false,
      },
      reducers: {
            /**
             * Sets the user information in the state.
             *
             * @param {PayloadAction<User | null>} action - Action payload containing user data.
             */
            setUser: (state, action: PayloadAction<User | null>) => {
                  state.user = action.payload;
            },
            /**
             * Sets the error message in the state.
             *
             * @param {PayloadAction<string>} action - Action payload containing error message.
             */
            setError: (state, action: PayloadAction<string>) => {
                  state.error = action.payload;
            },
            /**
             * Sets the authentication token in the state.
             *
             * @param {PayloadAction<string | null>} action - Action payload containing token.
             */
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
                  .addCase(
                        loginUser.fulfilled,
                        (
                              state: AuthState,
                              action: PayloadAction<LoginResponse>
                        ) => {
                              state.loading = false;
                              state.token = action.payload.body.token;
                              state.error = null;
                        }
                  )
                  .addCase(loginUser.rejected, (state, action) => {
                        state.loading = false;
                        state.error =
                              action.payload || 'An unexpected error occurred';
                  });
      },
});

export const { reducer: authReducer, actions: authActions } = authSlice;
export const { setUser, setError, setToken } = authActions;
export type { User, AuthState };
