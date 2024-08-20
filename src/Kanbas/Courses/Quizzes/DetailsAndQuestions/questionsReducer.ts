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
        questionEmptyJustLidt:(state)=>{
            state.rquizQuestionList=[];
        },
        copyOverQuestionList:(state,{payload:question})=>{
            const newQuestion = {
                _id:question._id,
                quiz:question.quiz,
                tempID:question.tempID,
                name:question.name,
                points:question.points,
                type:question.type,

            }
            state.rquizQuestionList= [...state.rquizQuestionList,newQuestion] as any;
        },
        questionsloadFromDB:(state,{payload:question}) =>{
            const newQuestion = {
                _id:question._id,
                quiz:question.quiz,
                tempID:question.tempID,
                name:question.name,
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
                quiz:question.quiz,
                tempID:question.tempID,
                name:question.name,
                points:question.points,
                type:question.type,

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
            //console.log("reducer updated list:",state.rquizQuestionList);
            }
        },
        removeQuestions:(state,{payload:quizID}) => {
            state.rquizQuestionList = state.rquizQuestionList.filter((q:any) => q.quizID !== quizID);
        },
    },

});

export const {updateQuizQuestions,raddQuestion,removeQuestions,questionsloadFromDB,questionsEmptyList,questionEmptyJustLidt,copyOverQuestionList} = quizQuestionsSlice.actions;
export default quizQuestionsSlice.reducer;