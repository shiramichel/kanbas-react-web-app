import React, { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import * as client from "./client";
import {updateQuizQuestions,raddQuestion,removeQuestions,questionsloadFromDB,questionsEmptyList,questionEmptyJustLidt,copyOverQuestionList} from "./questionsReducer";
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
    const {rquizQuestionListHolder} = useSelector((state:any) => state.quizQuestionsReducer);
    const dispatch = useDispatch();

    const questionTypeMap: { [key: string]: string } = {
        TF :"True or False",
        MC: "Multiple choise question",
        'Fill-in': "Fill in Multiple Blanks"
    };

    const [question,setQuestion] = useState();
    const [questionList,setQuestionList] = useState<any[]>([])
    const [questionListHold,setQuestionListHold] = useState<any[]>([])
    const [editing,setEditing] = useState("");
    const [count,setCount] = useState(1);

    const [questionName,setQuestionName] = useState("");
    const [questionType,setQuestionType] = useState("");

    const test = useParams();
    //console.log("test value in question adder:",test);
    const qid = test.quizId;
    const cid = test.cid;
    //const qid = "testquizid123";

    
    const updateQuestions= async () => {
        await setQuestionList(prevList =>
            prevList.map(q =>
                q.tempID === editing
                ? { ...q, name: questionName, type: questionType }
                : q
            
            )
        );
        //dispatch(questionEmptyJustLidt());
        //console.log("local question list before loading in to reduce:",questionList);
        //questionList.map((q:any)=>{
        //    console.log("question going to store",q);
        //    dispatch(copyOverQuestionList(q))
       // })
            
    };

/*
const updateQuestions = async () => {
    // Wrap setState in a Promise to await it
    await new Promise(resolve => {
      setQuestionList(prevList => {
        const updatedList = prevList.map(q =>
          q.tempID === editing
            ? { ...q, name: questionName, type: questionType }
            : q
        );
        resolve(updatedList); // Resolve the Promise with the updated list
        return updatedList; // Update state with the new list
      });
    });

    // Clear the list in the Redux store
    dispatch(questionEmptyJustLidt());

    // After state has updated, dispatch the new list to Redux
    questionList.forEach(q => {
      dispatch(copyOverQuestionList(q));
    });
  };
*/

    /*
    const fetchAllQuestions = async () => {

    }
    */
    const cancelAction = async () => {
        //dispatch(removeQuestions(qid));
        //const temp = rquizQuestionList.filter((q:any) => q.quizID === qid);
        //setQuestionList(temp);
        await dispatch(questionEmptyJustLidt());
        rquizQuestionListHolder.map((q:any)=>{
            //console.log("question going to store",q);
            dispatch(copyOverQuestionList(q))
        })


        //const details_list = await client.findQuizDetails();
    };

    const fetchQuestions = async () => {
        /*
        const question_list = await client.findallQuestions();
        const questionsForQuiz = await question_list.filter((q:any)=>q.quizID ===qid);

        await setQuestionList(questionsForQuiz);
        await setQuestionListHold(questionsForQuiz);
        */
        const question_list = await client.findallQuestions();
        const questionsForQuiz = await question_list.filter((q:any)=>q.quiz ===qid);
        let prevPointval= 0;
        dispatch(questionsEmptyList());

        questionsForQuiz.forEach((q:any) => {
            prevPointval += q.points;
        })
        setPointval(prevPointval);
    };

    const saveAction = async () => {
        //console.log("quiz question list holder:",rquizQuestionListHolder);
        
        rquizQuestionListHolder.forEach((q:any) =>{
            //console.log("TEST!!! q val:",q);
            client.deleteQuestion(q._id);
        });
        
        rquizQuestionList.forEach((q:any) => {
            //console.log("creating for each q:",q);
            client.createQuestion(q);
        });
/*
        questionList.map((q) =>{
            client.createQuestion(q);
        });
*/
        //fetchQuestions();
        //setQuestionList(rquizQuestionList);
    };


    const addQuestion = async () => {
        const question1 = {
            name:"New Question",
            quiz:qid,
            type:"MC",
            points:1,
            tempID:new Date().getTime().toString(),
            //tempID:`temp${count}`,
        };
        setQuestionList([...questionList,question1]);

        dispatch(copyOverQuestionList(question1));
        //setCount(count+1);
        //console.log("question editor question list:",questionList);
    };
    //setEditing("temp1");


    useEffect(() => {

        dispatch(questionEmptyJustLidt());
        //console.log("local question list before loading in to reduce:",questionList);
        questionList.map((q:any)=>{
            //console.log("question going to store",q);
            dispatch(copyOverQuestionList(q))
        })
        //console.log("question redux after change list redux:", rquizQuestionList);
        //console.log("question list after change:",questionList)
        //console.log("Updated rquizQuestionList:", rquizQuestionList);
        //startLoad();
        //setEditing("temp1");
    }, [questionList]);


    useEffect(() => {
        //console.log("question redux after change list redux:", rquizQuestionList);
        //console.log("question list after change:",questionList);
        let prevPointval= 0;
        rquizQuestionList.forEach((q:any) => {
            prevPointval += q.points;
            
        });
        setPointval(prevPointval);
        //console.log("Updated rquizQuestionList:", rquizQuestionList);
        //startLoad();
        //setEditing("temp1");
    }, [rquizQuestionList]);

    useEffect(() => {
        //console.log("questions list7:",rquizQuestionList)
        setQuestionList(rquizQuestionList);

        //console.log("questions list8 holder:",rquizQuestionListHolder)
        //console.log("change name:",questionName)
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
                {rquizQuestionList.map((q:any) => (
                    <li className="wd-module list-group-item p-0 fs-5 border-gray">
                        
                        <div className="d-flex justify-content-center">
                        {editing === q.tempID ?(
                            
                            <div>
                                <input type="text" className="form-control"
                                onChange={(e) => setQuestionName(e.target.value)} defaultValue={q.name}
                                
                                />
                                <select name="" id="" value={questionType} onChange={(e)=>setQuestionType(e.target.value)}>
                                    <option value="TF">True or False</option>
                                    <option value="MC">Multiple choise question</option>
                                    <option value="Fill-in">Fill in multiple blanks </option>
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
                                    {q.name}
                                </div>
                                <div>
                                    {questionTypeMap[q.type]}
                                </div>
                                <button className="btn btn-warning m-1" onClick={()=>{
                                    setQuestionName(q.name);
                                    setQuestionType(q.type);
                                    setEditing(q.tempID)
                                    }
                                    }>
                                    Edit
                                </button>

                                <button className="btn btn-primary m-1">
                                    Advanced
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