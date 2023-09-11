import { createReducer } from '@reduxjs/toolkit';

export const userReducer = createReducer(
  {},
  {
    // Login
    loginRequest: state => {
      state.loading = true;
    },

    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.message = action.payload.message;
    },

    loginFail: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    },

    // Load User (Get User Profile)
    loadUserRequest: state => {
      state.loading = true;
    },

    loadUserSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },

    loadUserFail: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    },

    // Logout
    logoutRequest: state => {
      state.loading = true;
    },

    logoutSuccess: (state, action) => {
      state.login = false;
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.message = action.payload;
    },

    logoutFail: (state, action) => {
      state.login = true;
      state.loading = false;
      state.isAuthenticated = true;
      state.error = action.payload;
    },

    // Register
    registerRequest: state => {
      state.loading = true;
    },

    registerSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.message = action.payload.message;
    },

    registerFail: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
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

export const profileReducer = createReducer(
  {},
  {
    // Update Profile
    updateProfileRequest: state => {
      state.loading = true;
    },

    updateProfileSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },

    updateProfileFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Update Profile Picture
    updateProfilePictureRequest: state => {
      state.loading = true;
    },

    updateProfilePictureSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },

    updateProfilePictureFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Change Password
    changePasswordRequest: state => {
      state.loading = true;
    },

    changePasswordSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },

    changePasswordFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // forget Password
    forgetPasswordRequest: state => {
      state.loading = true;
    },

    forgetPasswordSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },

    forgetPasswordFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // reset Password
    resetPasswordRequest: state => {
      state.loading = true;
    },

    resetPasswordSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },

    resetPasswordFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Remove From Playlist
    removeFromPlaylistRequest: state => {
      state.loading = true;
    },

    removeFromPlaylistSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },

    removeFromPlaylistFail: (state, action) => {
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
