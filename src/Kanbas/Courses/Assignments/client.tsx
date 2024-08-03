import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;
const ASSIGNMENTS_API = `${REMOTE_SERVER}/api/assignments`;

export const findAssignmentsForCourse = async (courseId: string) => {
  const response = await axios.get(`${COURSES_API}/${courseId}/assignments`);
  return response.data;
};

export const createAssignment = async (courseId: any, assign: any) => {
  const response = await axios.post( `${COURSES_API}/${courseId}/assignments`, assign );
  return response.data;
};

export const deleteAssignment = async (assignId: string) => {
  const response = await axios.delete(`${ASSIGNMENTS_API}/${assignId}`);
  return response.data;
};

export const updateAssignment = async (assign: any) => {
  const response = await axios.put(`${ASSIGNMENTS_API}/${assign._id}`, assign);
  return response.data;
};