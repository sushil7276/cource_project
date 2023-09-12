import { createReducer } from '@reduxjs/toolkit';

export const adminReducer = createReducer(
  {},
  {
    // Get All Users
    getAllUsersRequest: state => {
      state.loading = true;
    },

    getAllUsersSuccess: (state, action) => {
      state.loading = false;
      state.users = action.payload;
    },

    getAllUsersFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Delete User
    deleteUserRequest: state => {
      state.loading = true;
    },

    deleteUserSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },

    deleteUserFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Update User Role
    UpdateUserRoleRequest: state => {
      state.loading = true;
    },

    UpdateUserRoleSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },

    UpdateUserRoleFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Create Course
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

    // delete Course
    deleteCourseRequest: state => {
      state.loading = true;
    },

    deleteCourseSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },

    deleteCourseFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Add Lecture
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

    // delete Lecture
    deleteLectureRequest: state => {
      state.loading = true;
    },

    deleteLectureSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },

    deleteLectureFail: (state, action) => {
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
