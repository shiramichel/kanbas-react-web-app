import React, { useEffect, useState } from "react";
import * as client from "./client";
import { Link, useParams } from "react-router-dom";
import { setQuizDetails, updateQuizDetail } from "./reducer";
import {
  updateQuizQuestions,
  raddQuestion,
  removeQuestions,
  questionsloadFromDB,
  questionsEmptyList,
  questionEmptyJustLidt,
  copyOverQuestionList,
} from "./questionsReducer";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
 
export default function DetailEditor({
  pointval,
  setPointval,
}: {
  pointval: number;
  setPointval: (point: number) => void;
}) {
  const { rquizDetails } = useSelector(
    (state: any) => state.quizDetailsReducer
  );
 
  const { rquizQuestionList } = useSelector(
    (state: any) => state.quizQuestionsReducer
  );
  const { rquizQuestionListHolder } = useSelector(
    (state: any) => state.quizQuestionsReducer
  );
 
  const dispatch = useDispatch();
  const [testDetails, setTestDetails] = useState<any[]>([]);
 
  const [details, setDetails] = useState<any[]>([]);
 
  const test = useParams();
  const cid = test.cid;
  const qid = test.quizId;
  //const quizID= "testquizid123";
 
  const navigate = useNavigate();
 
  const [quizName, setQuizName] = useState("");
  const [quizInstruction, setQuizInstruction] = useState("");
  const [quizType, setQuizType] = useState("");
  const [quizAssignGroup, setQuizAssignGroup] = useState("");
  const [quizShuffle, setQuizShuffle] = useState(false);
  const [quizTimeLimit, setQuizTimeLimit] = useState(false);
  const [quizTimeAmount, setQuizTimeAmount] = useState("");
  const [quizMultipleAttempts, setQuizMultipleAttempts] = useState(false);
  const [multipleAttemptsAmount, setmultipleAttemptsAmount] = useState(1);
 
  const [quizShowCorrect, setQuizShowCorrect] = useState(false);
  const [quizAccessCode, setQuizAccessCode] = useState("");
  const [quizPoints, setPoints] = useState("");
  const [quizOneAtTime, setQuizOneAtTime] = useState(false);
  const [quizWebCam, SetQuizWebCam] = useState(false);
  const [quizLockQuestions, setQuizLockQuestions] = useState(false);
 
  const [quizDue, setQuizDue] = useState("");
  const [quizFrom, setQuizFrom] = useState("");
  const [quizUntil, setQuizUntil] = useState("");
 
  const [published, SetPublished] = useState(false);
 
  const testval = "Project";
 
  const printvalues = () => {
    console.log("quiz details Name:", quizName);
  };
 
  const testprint1 = () => {
    console.log("redux quiz details:", rquizDetails);
  };
 
  const increasePoint = () => {
    setPointval(pointval + 1);
  };
 
  const saveDetails = () => {
    dispatch(
      updateQuizDetail({
        quizName: quizName,
        quizInstruction: quizInstruction,
        quizType: quizType,
      })
    );
    //console.log("new rdetails:",rquizDetails);
  };
 
  const updateQuizDetails = async () => {
    const updatedDetails = {
      ...testDetails,
      assignmentGroup: quizAssignGroup,
      dueDate: quizDue,
      availableDate: quizFrom,
      multipleAttempts: quizMultipleAttempts,
      desription: quizInstruction,
      title: quizName,
      quizType: quizType,
      shuffleAnswers: quizShuffle,
      timeLimit: quizTimeAmount,
      timeLimitExist: quizTimeLimit,
      untilDate: quizUntil,
      _id: qid,
 
      attemptsAllowed: multipleAttemptsAmount,
      showCorrectAnswers: quizShowCorrect,
      accessCode: quizAccessCode,
      points: quizPoints,
      oneQuestionAtATime: quizOneAtTime,
      webcamRequired: quizWebCam,
      lockQuestions: quizLockQuestions,
      published: published,
    };
    console.log("updated details:", updatedDetails);
 
    await client.updateQuizDetails(updatedDetails);
  };
 
  const cancelAction = async () => {
    navigate(`/Kanbas/Courses/${cid}/Quizzes`);
  };
 
  const saveQuestions = async () => {
 
    console.log("reducer saving questions delete action:",rquizQuestionListHolder);
    rquizQuestionListHolder.forEach((q: any) => {
      //console.log("TEST!!! q val:",q);
      client.deleteQuestion(q._id);
    });
    console.log("reducer adding action:",rquizQuestionList)
    //rquizQuestionList.forEach((q: any) => {
      //console.log("creating for each q:",q);
    //  client.createQuestion(q);
    //});
  };
  const saveAction = async () => {
    await updateQuizDetails();
    //await saveQuestions();
    navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/Detail`);
  };
 
  const publish = async () => {
    SetPublished(true);
  };
  const saveAndPublish = async () => {
    await publish();
    await updateQuizDetails();
    //await saveQuestions();
    navigate(`/Kanbas/Courses/${cid}/Quizzes`);
  };
 
  const setLocalDetails = async () => {
    //const details_list = await client.findQuizDetails();
    //const details = details_list.find((detail:any) => detail.quizID === "testquizid123")
    //setTestDetails(details);
    //console.log("quiz details from server:",details);
    //const
 
    setQuizName(rquizDetails.title);
    setQuizInstruction(rquizDetails.description);
    setQuizType(rquizDetails.type);
    setQuizAssignGroup(rquizDetails.assignmentGroup);
    setQuizShuffle(rquizDetails.shuffleAnswers);
    //setQuizTimeLimit(rquizDetails.timeLimit);
    setQuizTimeAmount(rquizDetails.timeLimit);
    setQuizMultipleAttempts(rquizDetails.multipleAttempts);
    setQuizDue(new Date(rquizDetails.dueDate).toLocaleDateString("en-CA"));
    setQuizFrom(
      new Date(rquizDetails.availableDate).toLocaleDateString("en-CA")
    );
    setQuizUntil(new Date(rquizDetails.untilDate).toLocaleDateString("en-CA"));
 
    setQuizShowCorrect(rquizDetails.showCorrectAnswers);
 
    setmultipleAttemptsAmount(rquizDetails.attemptsAllowed);
    setQuizShowCorrect(rquizDetails.showCorrectAnswers);
    setQuizAccessCode(rquizDetails.accessCode);
    setPoints(rquizDetails.points);
    setQuizOneAtTime(rquizDetails.oneQuestionAtATime);
    SetQuizWebCam(rquizDetails.quizWebCam);
    setQuizLockQuestions(rquizDetails.quizLockQuestions);
    SetPublished(rquizDetails.published);
  };
 
  useEffect(() => {
    //fetchQuizDetails();
    console.log("stored quiz details:", rquizDetails);
    setLocalDetails();
  }, []);
  return (
    <div>
      <h1>Detail Editor</h1>
      <input
        type="text"
        className="form-control"
        placeholder="Quiz name"
        onChange={(e) => setQuizName(e.target.value)}
        defaultValue={rquizDetails.title}
      />
 
      <label htmlFor="wd-quiz-detail-input">Quiz instructions:</label>
      <br />
      <textarea
        id="wd-quiz-detail-input"
        className="form-control"
        onChange={(e) => setQuizInstruction(e.target.value)}
        defaultValue={rquizDetails.description}
      ></textarea>
      <br />
 
      <label htmlFor="wd-quiz-detail-quiz-type">Quiz Type </label>
      <select
        className="form-control"
        id="wd-quiz-detail-quiz-type"
        onChange={(e) => setQuizType(e.target.value)}
        defaultValue={rquizDetails.type}
      >
        <option value="Graded Quiz">Graded Quiz</option>
        <option value="Practice Quiz">Practice Quiz</option>
        <option value="Graded Quiz">Graded Quiz</option>
        <option value="Ungraded Quiz">Ungraded Quiz</option>
      </select>
      <br />
 
      <label htmlFor="wd-quiz-detail-assignment-group">Assignment Group</label>
      <select
        className="form-control"
        id="wd-quiz-detail-assignment-group"
        onChange={(e) => setQuizAssignGroup(e.target.value)}
        defaultValue={rquizDetails.assignmentGroup}
      >
        <option value="ASSIGNMENTS">ASSIGNMENTS</option>
        <option value="Exams">Exams</option>
        <option value="Quizzes">Quizzes</option>
        <option value="Project">Project</option>
      </select>
      <br />
      <h3>Options</h3>
      <input
        type="checkbox"
        className="form-check-input"
        onChange={(e) => setQuizShuffle(e.target.checked)}
        defaultChecked={rquizDetails.shuffleAnswers}
      />
      <label htmlFor="" className="form-check-label ">
        Shuffle Answers
      </label>
      <br />
 
      <input
        type="checkbox"
        className="form-check-input"
        onChange={(e) => setQuizTimeLimit(e.target.checked)}
        defaultChecked={rquizDetails.timeLimit}
      />
      <label htmlFor="">Time Limit</label>
 
      <br />
      <div className="row align-items-center">
        <div className="col-auto">
          <input
            type="number"
            className="form-control"
            onChange={(e) => setQuizTimeAmount(e.target.value)}
            defaultValue={quizTimeAmount}
          />
        </div>
        <div className="col-auto">
          <label htmlFor="" className="col-form-label">
            Minutes
          </label>
        </div>
      </div>
      <br />
 
      <input
        type="checkbox"
        className="form-check-input"
        onChange={(e) => setQuizMultipleAttempts(e.target.checked)}
        defaultChecked={rquizDetails.multipleAttempts}
      />
      <label htmlFor="">Allow Multiple Attempts</label>
 
      {quizMultipleAttempts && (
        <div className="row align-items-center mt-2">
          <div className="col-auto">
            <label htmlFor="" className="col-form-label">
              Number of Attempts
            </label>
          </div>
          <div className="col-auto">
            <input
              type="number"
              className="form-control"
              onChange={(e) =>
                setmultipleAttemptsAmount(parseInt(e.target.value))
              }
              value={multipleAttemptsAmount}
              min="1"
            />
          </div>
        </div>
      )}
 
      <br />
 
      <input
        type="checkbox"
        className="form-check-input"
        onChange={(e) => setQuizShowCorrect(e.target.checked)}
        defaultChecked={rquizDetails.showCorrectAnswers}
      />
      <label htmlFor="">Show Correct Answers</label>
 
      <br />
      <label htmlFor="">access Code</label>
      <input
        type="text"
        className="form-constrol"
        onChange={(e) => setQuizAccessCode(e.target.value)}
        defaultValue={rquizDetails.accessCode}
      />
      <br />
 
      <br />
      <label htmlFor="">Points</label>
      <input
        type="text"
        className="form-constrol"
        onChange={(e) => setPoints(e.target.value)}
        defaultValue={rquizDetails.points}
      />
      <br />
 
 
      <input
        type="checkbox"
        className="form-check-input"
        onChange={(e) => setQuizOneAtTime(e.target.checked)}
        defaultChecked={rquizDetails.oneQuestionAtATime}
      />
      <label htmlFor="">One Question at a Time</label>
      <br />
 
      <input
        type="checkbox"
        className="form-check-input"
        onChange={(e) => SetQuizWebCam(e.target.checked)}
        defaultChecked={rquizDetails.quizWebCam}
      />
      <label htmlFor="">Webcam Required</label>
      <br />
 
      <input
        type="checkbox"
        className="form-check-input"
        onChange={(e) => setQuizLockQuestions(e.target.checked)}
        defaultChecked={rquizDetails.quizLockQuestions}
      />
      <label htmlFor="">Lock Questions After Answering</label>
 
      <div>
        <label htmlFor="">Assign to</label>
        <input type="text" className="form-control" />
        <br />
        <label htmlFor="">Due</label>
        <input
          type="date"
          className="form-control"
          onChange={(e) => setQuizDue(e.target.value)}
          defaultValue={quizDue}
        />
 
        <label htmlFor="">Available from</label>
        <input
          type="date"
          className="form-control"
          onChange={(e) => setQuizFrom(e.target.value)}
          defaultValue={quizFrom}
        />
        <label htmlFor="">until</label>
        <input
          type="date"
          className="form-control"
          onChange={(e) => setQuizUntil(e.target.value)}
          defaultValue={quizUntil}
        />
      </div>
 
      {/*
            <button onClick={increasePoint}>
                test print
            </button>
            */}
 
      <button className="btn btn-danger m-2" onClick={cancelAction}>
        Cancel
      </button>
      <button className="btn btn-warning m-2" onClick={saveAction}>
        Save
      </button>
      <button className="btn btn-success m-2" onClick={saveAndPublish}>
        Save and Publish
      </button>
    </div>
  );
}