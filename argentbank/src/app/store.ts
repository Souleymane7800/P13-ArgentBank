import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { authReducer } from './authSlice';
import { setupListeners } from '@reduxjs/toolkit/query';

const rootReducer = combineReducers({
      auth: authReducer,
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
      const store = configureStore({
            reducer: rootReducer,
            middleware: (getDefaultMiddleware) => {
                  return getDefaultMiddleware();
            },
            preloadedState,
      });
      setupListeners(store.dispatch);
      return store;
};

export const store = setupStore();

export type AppStore = typeof store;
export type AppDispatch = AppStore['dispatch'];
export type RootState = ReturnType<typeof rootReducer>;
// export const store = configureStore({
//       reducer: {
//             auth: authReducer,
//       },
//       middleware: (getDefaultMiddleware) =>
//             getDefaultMiddleware({
//                   serializableCheck: {
//                         ignoredActions: ['auth/login/fulfilled'],
//                         ignoredPaths: ['auth.user'],
//                   },
//             }),
//       devTools: process.env.NODE_ENV !== 'production',
// });
