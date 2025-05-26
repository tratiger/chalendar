import { configureStore } from '@reduxjs/toolkit';
// import your slices here

export const store = configureStore({
  reducer: {
    // chat: chatReducer,
    // calendar: calendarReducer,
  },
});

// 型推論用
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

