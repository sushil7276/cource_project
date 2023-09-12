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
