import { asyncThunkCreator, buildCreateSlice } from '@reduxjs/toolkit';

/**
 * Creates a Redux slice with an async thunk creator.
 *
 * @returns A function to create a Redux slice.
 */
export const createAppSlice = buildCreateSlice({
      creators: { asyncThunk: asyncThunkCreator },
});
