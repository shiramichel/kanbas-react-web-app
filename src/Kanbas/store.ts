import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "./Courses/Modules/reducer";
import assignmentsReducer from "./Courses/Assignments/reducer";
import accountReducer from "./Account/reducer";
import questionsReducer from "./Courses/Quizzes/reducer";

import quizDetailsReducer from "./Courses/Quizzes/DetailsAndQuestions/reducer";
import quizQuestionsReducer from "./Courses/Quizzes/DetailsAndQuestions/questionsReducer";

const store = configureStore({
  reducer: {
    modulesReducer,
    assignmentsReducer,
    accountReducer,
    questionsReducer,

    quizDetailsReducer,
    quizQuestionsReducer,
  },
});
export default store;