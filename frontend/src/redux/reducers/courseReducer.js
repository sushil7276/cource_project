import { createReducer } from '@reduxjs/toolkit';

export const courseReducer = createReducer(
  { courses: [] },
  {
    allCoursesRequest: state => {
      state.loading = true;
    },

    allCoursesSuccess: (state, action) => {},
  }
);
