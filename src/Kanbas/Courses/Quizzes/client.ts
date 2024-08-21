import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;
const QUIZZES_API = `${REMOTE_SERVER}/api/quizzes`;
const QUESTIONS_API = `${REMOTE_SERVER}/api/questions`;

// Mon-Shan client - usages in index (List) and Details
// Fetch all quizzes for a course
export const findAllQuizzesByCourse = async (cid: string) => {
  try {
    const { data } = await axios.get(`${COURSES_API}/${cid}/quizzes`);
    return data;
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    throw error;
  }
};

// Fetch a single quiz by ID
export const findQuizById = async (cid: string, quizId: string) => {
  try {
    const { data } = await axios.get(`${COURSES_API}/${cid}/quizzes/${quizId}`);
    return data;
  } catch (error) {
    console.error("Error fetching quiz by ID:", error);
    throw error;
  }
};

// Create a new quiz
export const createQuiz = async (cid: string, quizData: any) => {
  try {
    const { data } = await axios.post(`${COURSES_API}/${cid}/quizzes`, quizData);
    return data;
  } catch (error) {
    console.error("Error creating quiz:", error);
    throw error;
  }
};

// Update a quiz
export const updateQuiz = async (cid: string, quizId: string, quizData: any) => {
  try {
    const { data } = await axios.put(`${COURSES_API}/${cid}/quizzes/${quizId}`, quizData);
    return data;
  } catch (error) {
    console.error("Error updating quiz:", error);
    throw error;
  }
};

// Delete a quiz
export const deleteQuiz = async (cid: string, quizId: string) => {
  try {
    const { data } = await axios.delete(`${COURSES_API}/${cid}/quizzes/${quizId}`);
    return data;
  } catch (error) {
    console.error("Error deleting quiz:", error);
    throw error;
  }
};

// Question-related API calls
// Create a new question
export const createQuestion = async (cid: string, quizId: string, questionData: any) => {
  try {
    const { data } = await axios.post(`${REMOTE_SERVER}/api/quizzes/${quizId}/questions`, questionData);
    return data;
  } catch (error) {
    console.error("Error creating question:", error);
    throw error;
  }
};

// Delete a question
export const deleteQuestion = async (questionId: string) => {
  try {
    const { data } = await axios.delete(`${REMOTE_SERVER}/api/questions/${questionId}`);
    return data;
  } catch (error) {
    console.error("Error deleting question:", error);
    throw error;
  }
};

// Fetch the last attempt for a specific quiz and user
export const fetchLastAttemptByQuizAndUser = async (userLoginId: any, quizId: any) => {
  try {
    const response = await axios.get(`${REMOTE_SERVER}/api/scores/${userLoginId}/quiz/${quizId}/lastAttempt`);
    return response.data;
  } catch (error) {
    console.error("Error fetching last attempt data:", error);
    throw error;
  }
};


// Nina - tied to questionEditor
// Fetch all questions for a quiz
export const findQuestionsByQuiz = async (quizId: string) => {
  try {
    const { data } = await await axios.get(`${QUIZZES_API}/${quizId}/questions`);
    return data;
  } catch (error) {
    console.error("Error fetching questions by quiz ID:", error);
    throw error;
  }
};

// Update a question
export const updateQuestion = async (question: any) => {
  try {
    const response = await axios.put(`${QUESTIONS_API}/${question._id}`, question);
    return response.data;
  } catch (error) {
    console.error("Error updating question:", error);
    throw error;
  }
};

// update questions for quiz
export const updateQuizQuestions = async (quizId: string, questionId: string) => {
  try {
    const response = await axios.put(`${QUIZZES_API}/${quizId}/questions`, questionId);
    return response.data;
  } catch (error) {
    console.error("Error updating questions for quiz:", error);
    throw error;
  }
};