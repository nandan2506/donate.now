

import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import themeReducer from '../features/auth/themeSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer
  }
});
