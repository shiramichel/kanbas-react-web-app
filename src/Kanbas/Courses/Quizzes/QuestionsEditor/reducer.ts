// Nina - questions reducer

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  questions: [],
};

const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    setQuestions: (state, action) => {
      state.questions = action.payload;
    },
    updateQuestion: (state, { payload: question }) => {
      state.questions = state.questions.map((q: any) =>
        q._id === question._id ? question : q
      ) as any;
    },
    addQuestion: (state, { payload: question }) => {
      const newQuestion: any = {
        _id: question._id,
        quiz: question.quiz,
        course: question.course,
        title: "New Question",
        type: "MC",
        points: 1,
        options: [
          { _id: "NEW" + Math.random(), value: "Option 1", correct: true },
          { _id: "NEW" + Math.random(), value: "Option 2", correct: false },
        ],
      };
      state.questions = [...state.questions, newQuestion] as any;
    },
  }
});

export const { setQuestions, updateQuestion, addQuestion } = questionsSlice.actions;
export default questionsSlice.reducer;