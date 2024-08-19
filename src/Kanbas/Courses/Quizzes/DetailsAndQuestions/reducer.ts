import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    rquizDetails:{
        quizName:"",
    },
    //rquizQuestionList:[],
};

const quizDetailSlice = createSlice({
    name:"rquizDetail",
    initialState,
    reducers:{
        setQuizDetails:(state,action) =>{
            console.log("reducer payload:",action.payload)
            state.rquizDetails = action.payload;
        },
        updateQuizDetail:(state,action) =>{
            console.log("reducer:",action);
            const newDetails={
                ...state.rquizDetails, ...action.payload
            };
            state.rquizDetails=newDetails;
            console.log("reducer new quiz details:",state.rquizDetails);
        },
    },

});


export const {setQuizDetails,updateQuizDetail} = quizDetailSlice.actions;

export default quizDetailSlice.reducer;