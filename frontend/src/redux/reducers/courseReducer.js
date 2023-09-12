import { createReducer } from '@reduxjs/toolkit';

export const courseReducer = createReducer(
  { courses: [], lectures: [] },
  {
    // Get All Course
    allCoursesRequest: state => {
      state.loading = true;
    },

    allCoursesSuccess: (state, action) => {
      state.loading = false;
      state.courses = action.payload;
    },

    allCoursesFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Get All Lectures
    getCourseLecturesRequest: state => {
      state.loading = true;
    },
    getCourseLecturesSuccess: (state, action) => {
      state.loading = false;
      state.lectures = action.payload;
    },

    getCourseLecturesFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Add To Playlist
    addToPlaylistRequest: state => {
      state.loading = true;
    },
    addToPlaylistSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },

    addToPlaylistFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    clearError: state => {
      state.error = null;
    },

    clearMessage: state => {
      state.message = null;
    },
  }
);
