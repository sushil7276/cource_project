import { server } from '../store';
import axios from 'axios';

// Create Course
export const createCourse = formData => async dispatch => {
  try {
    dispatch({ type: 'createCourseRequest' });

    const { data } = await axios.post(`${server}/createcourse`, formData, {
      headers: {
        'Content-type': 'multipart/form-data',
      },

      withCredentials: true,
    });

    dispatch({ type: 'createCourseSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'createCourseFail',
      payload: error.response.data.message,
    });
  }
};

// delete Course
export const deleteCourse = id => async dispatch => {
  try {
    dispatch({ type: 'deleteCourseRequest' });

    const { data } = await axios.delete(`${server}/course/${id}`, {
      withCredentials: true,
    });

    dispatch({ type: 'deleteCourseSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'deleteCourseFail',
      payload: error.response.data.message,
    });
  }
};

// Create Lecture
export const addLecture = (id, formData) => async dispatch => {
  try {
    dispatch({ type: 'addLectureRequest' });

    const { data } = await axios.post(`${server}/course/${id}`, formData, {
      headers: {
        'Content-type': 'multipart/form-data',
      },

      withCredentials: true,
    });

    dispatch({ type: 'addLectureSuccess', payload: data.message });
  } catch (error) {
    dispatch({ type: 'addLectureFail', payload: error.response.data.message });
  }
};

// delete Lecture
export const deleteLecture = (courseId, lectureId) => async dispatch => {
  try {
    dispatch({ type: 'deleteLectureRequest' });

    const { data } = await axios.delete(
      `${server}/lecture?courseId=${courseId}&lectureId=${lectureId}`,
      {
        withCredentials: true,
      }
    );

    dispatch({ type: 'deleteLectureSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'deleteLectureFail',
      payload: error.response.data.message,
    });
  }
};

// Get All Users
export const getAllUsers = () => async dispatch => {
  try {
    dispatch({ type: 'getAllUsersRequest' });

    const { data } = await axios.get(`${server}/admin/users`, {
      withCredentials: true,
    });

    dispatch({ type: 'getAllUsersSuccess', payload: data.users });
  } catch (error) {
    dispatch({
      type: 'getAllUsersFail',
      payload: error.response.data.message,
    });
  }
};

// Delete User
export const deleteUser = id => async dispatch => {
  try {
    dispatch({ type: 'deleteUserRequest' });

    const { data } = await axios.get(`${server}/admin/user/${id}`, {
      withCredentials: true,
    });

    dispatch({ type: 'deleteUserSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'deleteUserFail',
      payload: error.response.data.message,
    });
  }
};

// Update User Role
export const updateUserRole = id => async dispatch => {
  try {
    dispatch({ type: 'UpdateUserRoleRequest' });

    const { data } = await axios.get(`${server}/admin/user/${id}`, {
      withCredentials: true,
    });

    dispatch({ type: 'UpdateUserRoleSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'UpdateUserRoleFail',
      payload: error.response.data.message,
    });
  }
};
