import QuizEditorNav from "./quizEditorNav";
import DetailEditor from "./detailEditor";
import QuestionEditor from "../QuestionsEditor";
import { Navigate, Route, Routes, useLocation,useParams} from "react-router-dom"
import { useEffect, useState } from "react";
import * as client from "./client";
import { useSelector, useDispatch } from "react-redux";
import {raddQuestion,removeQuestions,questionsloadFromDB,questionsEmptyList} from "./questionsReducer";
import {setQuizDetails,updateQuizDetail} from "./reducer"
export default function QuizEditor(){
    const test = useParams();
    //console.log("Quiz main editor! test val",test);
    const qid = test.quizId;
    //const qid = "testquizid123";
    
    const [pointval, setPointval] =useState(0);
    const [questionList,setQuestionList] = useState<any[]>([])
    const [questionListHold,setQuestionListHold] = useState<any[]>([])


    const {rquizDetails} = useSelector((state:any) => state.quizDetailsReducer);
    const {rquizQuestionList} = useSelector((state:any) => state.quizQuestionsReducer);
    const {rquizQuestionListHolder} = useSelector((state:any) => state.quizQuestionsReducer);
    const dispatch = useDispatch();

    const fetchQuestions = async () => {
        const question_list = await client.findallQuestions();
        const questionsForQuiz = await question_list.filter((q:any)=>q.quiz ===qid);
        //let pointcounter=0;
        //console.log("Searching CID val:",qid);
        //await console.log("question list in fetch:",question_list)
        //await console.log("question filtered list in fetch:",questionsForQuiz)
        let prevPointval= 0;
        dispatch(questionsEmptyList());
        questionsForQuiz.forEach((q:any) => {
            //console.log("q val:",q);
            dispatch(questionsloadFromDB(q));
            //prevPointval= pointval;
            
            //setPointval( prevPointval + q.points);
            prevPointval += q.points;
            //console.log("previous point val:",prevPointval);
            //console.log(" point val:",pointval);
            //console.log("q.p val:",q.points)
        })
        setPointval(prevPointval);
        //setPointval(pointcounter);
        //setPointval(q.points + pointval);
        //await setQuestionList(questionsForQuiz);
        //await setQuestionListHold(questionsForQuiz);
    };

    const fetchDetails = async () =>{
        const details_list = await client.findQuizDetails();
        console.log("detail list:",details_list);
        const details = details_list.find((detail:any) => detail._id === qid);

        dispatch(setQuizDetails(details));
    };

    //const pointval = 0;]
    
    useEffect(() => {
        //console.log("quiz editor questions:", rquizQuestionList);
        //console.log("Updated rquizQuestionList:", rquizQuestionList);
        //startLoad();
        //setEditing("temp1");
    }, [rquizQuestionList]);
    
    useEffect(() => {
        //setPointval(0);
        fetchQuestions();
        //const temp =pointval/2;
        //setPointval(temp);
        fetchDetails();
      }, []);
    return(
        <div>
            <h2>Points {pointval}</h2>
            <div>
                <QuizEditorNav />
            </div>
            <div>
                <Routes>
                    <Route path="Details" element={<DetailEditor pointval={pointval} setPointval={setPointval}/>} />
                    <Route path="Questions" element={<QuestionEditor pointval={pointval}
                     setPointval={setPointval}
                     //questionList={questionList}
                     //setQuestionList={setQuestionList}
                     //questionListHold={questionListHold}
                     //setQuestionListHold={setQuestionListHold}
                     />
                     
                     } />
                </Routes>
            </div>

        </div>
    );
}