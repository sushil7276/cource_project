import { configureStore } from '@reduxjs/toolkit';

const server = 'http://localhost:4000/api/v1/';

const store = configureStore({
  reducer: {},
});

export default store;
