import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './authSlice';

export const store = configureStore({
      reducer: {
            auth: authReducer,
      },
      middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                  serializableCheck: {
                        ignoredActions: ['auth/login/fulfilled'],
                        ignoredPaths: ['auth.user'],
                  },
            }),
      devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
