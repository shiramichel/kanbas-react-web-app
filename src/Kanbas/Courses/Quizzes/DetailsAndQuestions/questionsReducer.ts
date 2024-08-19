import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    
    rquizQuestionList:[

    ],
    rquizQuestionListHolder:[

    ],
};

const quizQuestionsSlice = createSlice({
    name:"rquizQuestionList",
    initialState,
    reducers:{
        //emptylist:(state,)
        questionsEmptyList:(state)=>{
            state.rquizQuestionList=[];
            state.rquizQuestionListHolder=[];
        },
        questionsloadFromDB:(state,{payload:question}) =>{
            const newQuestion = {
                quiz:question.quiz,
                tempID:question.tempID,
                questionName:question.questionName,
                points:question.points,
                type:question.type,

            }
            const existingIndex = state.rquizQuestionList.findIndex((q:any) => q.tempID === newQuestion.tempID);
            state.rquizQuestionList= [...state.rquizQuestionList,newQuestion] as any;
            state.rquizQuestionListHolder =  [...state.rquizQuestionListHolder,newQuestion] as any;
            
        },
        updateQuizQuestions:(state,action) =>{

        },
        raddQuestion:(state,{payload:question}) =>{
            console.log("reducer payload:",question);
            const newQuestion = {
                quizID:question.quizID,
                tempID:question.tempID,
                questionName:question.questionName,
                points:question.points,
                questionType:question.questionType,

            }
            /*
            state.rquizQuestionList= [...state.rquizQuestionList,newQuestion] as any;
            console.log("reducer updated list:",state.rquizQuestionList);
            */
            const existingIndex = state.rquizQuestionList.findIndex((q:any) => q.tempID === newQuestion.tempID);

            if (existingIndex !== -1) {
                state.rquizQuestionList = state.rquizQuestionList.map((q:any) =>
                    q.tempID === newQuestion.tempID ? newQuestion: q
                ) as any;
            } else {
                
            state.rquizQuestionList= [...state.rquizQuestionList,newQuestion] as any;
            console.log("reducer updated list:",state.rquizQuestionList);
            }
        },
        removeQuestions:(state,{payload:quizID}) => {
            state.rquizQuestionList = state.rquizQuestionList.filter((q:any) => q.quizID !== quizID);
        },
    },

});

export const {updateQuizQuestions,raddQuestion,removeQuestions,questionsloadFromDB,questionsEmptyList} = quizQuestionsSlice.actions;
export default quizQuestionsSlice.reducer;