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
  }
});

export const { setQuestions, updateQuestion } = questionsSlice.actions;
export default questionsSlice.reducer;