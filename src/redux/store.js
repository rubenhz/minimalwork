import { configureStore } from '@reduxjs/toolkit';
import worksSlice from './worksSlice';

export const store = configureStore({
  reducer: {
    works: worksSlice,
  },
});
