import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const QUIZDETAIL_API = `${REMOTE_SERVER}/api/quizDetails`;
const QUIZQUESTION_API2 = `${REMOTE_SERVER}/api/quizQuestions`;
const QUIZQUESTION_API = `${REMOTE_SERVER}/api/questions`;

export const findQuizDetails = async () =>{
    console.log("sendingout quiz detail request request:");
    const response =await axios.get(`${QUIZDETAIL_API}`);
    return response.data;
};

export const updateQuizDetails = async (detail:any) => {
    const response = await axios.put(`${QUIZDETAIL_API}/${detail._id}`,detail);
    return response.data;
};

export const findallQuestions = async () => {
    console.log(`API questions:${QUIZQUESTION_API}`);
    const response =await axios.get(`${QUIZQUESTION_API}`);
    return response.data;
}

export const deleteQuestion = async (questionID:string) => {
    console.log("sending Deleting to server!!!",questionID);
    const response = await axios.delete(`${QUIZQUESTION_API2}/${questionID}`)
    console.log("response back from server!!!");
    return response.data;
};

export const createQuestion = async(question:any) => {
    console.log("sending out:",question)
    const response = await axios.post(`${QUIZQUESTION_API2}`,question)
    return response.data;
};

/*
export const deleteQuestion2 = async (questionID:string) => {
    const response = await axios.delete(`${QUIZQUESTION_API}/${questionID}`);
    return response.data;
};

export const createQuestion2 = async(questions:any) => {
    const response= await axios.post(`${QUIZQUESTION_API}`,questions);
    return response.data;
};

*/