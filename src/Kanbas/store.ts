import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "./Courses/Modules/reducer";
import assignmentsReducer from "./Courses/Assignments/reducer";
import accountReducer from "./Account/reducer";
import questionsReducer from "./Courses/Quizzes/QuestionsEditor/reducer";
import quizzesReducer from "./Courses/Quizzes/reducer";
import quizDetailsReducer from "./Courses/Quizzes/DetailsAndQuestions/reducer";
import quizQuestionsReducer from "./Courses/Quizzes/DetailsAndQuestions/questionsReducer";

const store = configureStore({
  reducer: {
    modulesReducer,
    assignmentsReducer,
    accountReducer,
    questionsReducer,
    quizzesReducer,
    quizDetailsReducer,
    quizQuestionsReducer,
  },
});

// Mon
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;