import React, { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import * as client from "./client";
import {raddQuestion,removeQuestions} from "./questionsReducer";
import { useSelector, useDispatch } from "react-redux";

export default function QuestionEditor({pointval,setPointval,}:
    {pointval:number;
    setPointval:(point:number)=>void;
    /*questionList:any[];
    setQuestionList:(question:any[])=>void;
    questionListHold:any[];
    setQuestionListHold:(question:any[])=>void*/
    }

){

    const {rquizQuestionList} = useSelector((state:any) => state.quizQuestionsReducer);
    const dispatch = useDispatch();

    const questionTypeMap: { [key: string]: string } = {
        TRUEORFALSE :"True or False",
        MULTIPLE: "Multiple choise question",
        FillIN: "Fill in Multiple Blanks"
    };

    const [question,setQuestion] = useState();
    const [questionList,setQuestionList] = useState<any[]>([])
    const [questionListHold,setQuestionListHold] = useState<any[]>([])
    const [editing,setEditing] = useState("");
    const [count,setCount] = useState(1);

    const [questionName,setQuestionName] = useState("");
    const [questionType,setQuestionType] = useState("");

    const test = useParams();
    //const qid = test.qid;
    const qid = "testquizid123";

    const updateQuestions= async () => {
        setQuestionList(prevList =>
            prevList.map(q =>
                q.tempID === editing ? { ...q, questionName, questionType } : q
            )
        );
    };

    const startLoad = async () => {
        setQuestionList(rquizQuestionList);
    };

    const saveQuestions = async () =>{
        questionList.map(  q =>
            dispatch(
                raddQuestion(q)
            )
        );
        console.log("question List after save,",rquizQuestionList);


    };

    /*
    const fetchAllQuestions = async () => {

    }
    */
    const cancelAction = async () => {
        dispatch(removeQuestions(qid));
        const temp = rquizQuestionList.filter((q:any) => q.quizID === qid);
        setQuestionList(temp);

        //const details_list = await client.findQuizDetails();
    };

    const fetchQuestions = async () => {
        const question_list = await client.findallQuestions();
        const questionsForQuiz = await question_list.filter((q:any)=>q.quizID ===qid);

        await setQuestionList(questionsForQuiz);
        await setQuestionListHold(questionsForQuiz);
    };

    const saveAction = async () => {
        questionListHold.map((q) =>{
            console.log("TEST!!!");
            client.deleteQuestion(q.tempID);
        });
/*
        questionList.map((q) =>{
            client.createQuestion(q);
        });
*/
        fetchQuestions();
    };


    const addQuestion = async () => {
        const question1 = {
            questionName:"New Question",
            quizID:qid,
            questionType:"MULTIPLE",
            points:20,
            tempID:new Date().getTime().toString(),
            //tempID:`temp${count}`,
        };
        setQuestionList([...questionList,question1]);
        setCount(count+1);
        //console.log("question editor question list:",questionList);
    };
    //setEditing("temp1");
    useEffect(() => {
        console.log("question editor question list:", questionList);
        //console.log("Updated rquizQuestionList:", rquizQuestionList);
        //startLoad();
        //setEditing("temp1");
    }, [questionList]);

    useEffect(() => {
        setQuestionList(rquizQuestionList);
        //fetchQuestions();
      }, []);
    return(
        <div>
            <h1>Questions Editor</h1>
            <div className="d-flex justify-content-center">
            <button className="btn btn-primary m-2" onClick={addQuestion}>
                + New Question
            </button>
            </div>

            <ul className="list-group rounded-0">
                {questionList.map((q) => (
                    <li className="wd-module list-group-item p-0 fs-5 border-gray">
                        
                        <div className="d-flex justify-content-center">
                        {editing === q.tempID ?(
                            
                            <div>
                                <input type="text" className="form-control"
                                onChange={(e) => setQuestionName(e.target.value)} defaultValue={q.questionName}
                                
                                />
                                <select name="" id="" value={questionType} onChange={(e)=>setQuestionType(e.target.value)}>
                                    <option value="TRUEORFALSE">True or False</option>
                                    <option value="MULTIPLE">Multiple choise question</option>
                                    <option value="FillIN">Fill in multiple blanks </option>
                                </select>
                                <button className="btn btn-success m-1" onClick={()=> {

                                    setEditing("");
                                    updateQuestions();
                                    
                                    }
                                    }>
                                    Done
                                </button>
                            </div>
                        ):
                        (
                            <div>
                                <div>
                                    {q.questionName}
                                </div>
                                <div>
                                    {questionTypeMap[q.questionType]}
                                </div>
                                <button className="btn btn-warning m-1" onClick={()=>{
                                    setQuestionName(q.questionName);
                                    setQuestionType(q.questionType);
                                    setEditing(q.tempID)
                                    }
                                    }>
                                    Edit
                                </button>
                            </div>
                        )
                        }
                        </div>
                    </li>
                ))}
            </ul>
            <hr />
            <button className="btn btn-success m-2" onClick={saveAction}>
                Save
            </button>
            <button className="btn btn-danger m-2" onClick={cancelAction}>
                Cancel
            </button>
            {/*<button>Publish</button>*/}
        </div>
    );
}

//{editing !== q.tempID && q.questionName}