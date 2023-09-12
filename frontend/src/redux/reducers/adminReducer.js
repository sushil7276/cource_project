import { createReducer } from '@reduxjs/toolkit';

export const adminReducer = createReducer(
  {},
  {
    createCourseRequest: state => {
      state.loading = true;
    },

    createCourseSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },

    createCourseFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    addLectureRequest: state => {
      state.loading = true;
    },

    addLectureSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },

    addLectureFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  }
);
