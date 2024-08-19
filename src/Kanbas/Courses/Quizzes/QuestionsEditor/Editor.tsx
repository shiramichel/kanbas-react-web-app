import './styles.css'
import { useState, useEffect } from "react";
import { useDispatch, } from "react-redux";
import WYSIWYG from "./WYSIWYG";
import Multiplechoice from "./Multiplechoice";
import Truefalse from "./Truefalse";
import Fillinblank from "./Fillinblank";
import * as client from "../client";
import { updateQuestion } from "../reducer";

export default function Editor(
  { question, handleCancel }:
    { question: any; handleCancel: () => void; }
) {
  const dispatch = useDispatch();

  const [selectedType, setSelectedType] = useState(question?.type || "MC");
  const [currentQuestion, setCurrentQuestion] = useState(question);

  const saveQuestion = async (question: any) => {
    await client.updateQuestion(question);
    dispatch(updateQuestion(question));
    handleCancel(); // to close editor after save
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setCurrentQuestion((prev: any) => ({
      ...prev, [name]: value,
    }));
  };

  const handleChangeType = (e: any) => {
    const newType = e.target.value;
    setSelectedType(e.target.value);

    // if changing to TF, change options to true/false
    if (newType === "TF") {
      setCurrentQuestion((prev: any) => ({
        ...prev, options: [{ _id: 1, value: "True", correct: true }, { _id: 2, value: "False", correct: false }],
      }));
    }

    // if changing to fill-in, change options to be all correct
    if (newType === "Fill-in") {
      setCurrentQuestion((prev: any) => ({
        ...prev, options: [{ _id: 1, value: "Option", correct: true }],
      }));
    }

    // if changing to MC, change options to be 1 correct and 1 incorrect
    if (newType === "MC") {
      setCurrentQuestion((prev: any) => ({
        ...prev, options: [{ _id: 1, value: "Option 1", correct: true }, { _id: 2, value: "Option 2", correct: false }],
      }));
    }
  };

  const renderQuestionType = (type: string, currentQuestion: any, setQuestion: any) => {
    switch (type) {
      case "MC":
        return <Multiplechoice question={currentQuestion} setQuestion={setQuestion} />;
      case "TF":
        return <Truefalse question={currentQuestion} setQuestion={setQuestion} />;
      case "Fill-in":
        return <Fillinblank question={currentQuestion} setQuestion={setQuestion} />;
      default:
        return <Multiplechoice question={currentQuestion} setQuestion={setQuestion} />;
    }
  };

  useEffect(() => {
    setCurrentQuestion(question);
  }, [question]);

  return (
    <div id="quiz-editor">
      <div>
        <form>
          {/* header - question title, type, points */}
          <div className="d-flex align-items-center">
            <input
              id="question-title"
              className="form-control me-2"
              name="title"
              defaultValue={question.title}
              type="text"
              onChange={handleChange}
            />
            <select
              id="question-type"
              className="form-select me-5"
              name="type"
              value={selectedType}
              onChange={handleChangeType}
            >
              <option value="MC">Multiple Choice</option>
              <option value="TF">True/False</option>
              <option value="Fill-in">Fill in the Blank</option>
            </select>
            <label htmlFor="question-points" className="col-form-label ms-5 float-end">Points:</label>
            <input
              id="question-points"
              className="form-control float-end w-25"
              name="points"
              type="number"
              defaultValue={question.points}
              onChange={handleChange}
            />
          </div>
        </form>
        <hr />

        {/* text box for question */}
        <WYSIWYG question={currentQuestion} setQuestion={setCurrentQuestion}/>
        <hr />

        {/* show correct component based on question type */}
        <div className="mb-3">
          <h4 className="mb-2">Answers:</h4>
          {renderQuestionType(selectedType, currentQuestion, setCurrentQuestion)}
        </div>

        {/* save and cancel buttons */}
        <div className="mb-3">
          <button className="btn btn-secondary me-2" type="button" onClick={handleCancel}>Cancel</button>
          <button className="btn btn-danger" type="button" onClick={() => saveQuestion(currentQuestion)}>Update Question</button>
        </div>
        <hr />
      </div>
    </div >
  );
}