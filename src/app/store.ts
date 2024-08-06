import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { authReducer } from './authSlice';
import { setupListeners } from '@reduxjs/toolkit/query';

/**
 * Combines reducers into a single root reducer.
 *
 * @returns The combined reducer.
 */
const rootReducer = combineReducers({
      auth: authReducer,
});

/**
 * Configures the Redux store with the given reducers and middleware.
 *
 * @param {Partial<RootState>} preloadedState - Optional preloaded state for the store.
 * @returns {Store} The configured Redux store.
 */
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
