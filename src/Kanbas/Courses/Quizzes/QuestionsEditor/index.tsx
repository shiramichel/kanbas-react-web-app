import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { setQuestions, addQuestion } from "./reducer";

import * as client from "../client";
import Editor from "./Editor";
import { FaCheckCircle, FaRegCircle } from "react-icons/fa";

export default function QuestionEditor(
  { pointval, setPointval }: { pointval: number; setPointval: (point: number) => void; }
) {
  const { cid, quizId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { questions } = useSelector((state: any) => state.questionsReducer);

  const [quiz, setQuiz] = useState<any>();
  const [questionsList, setQuestionsList] = useState<any[]>([]);
  const [editingIds, setEditingIds] = useState<any[]>([]);

  const handleEdit = (id: any) => {
    setEditingIds((prevIds: any) => [...prevIds, id]);
  };

  const handleCancel = (id: any) => {
    setEditingIds((prevIds: any) => prevIds.filter((questionId: any) => questionId !== id));
  };

  const fetchQuestions = async () => {
    const questions = await client.findQuestionsByQuiz(quizId as string);
    dispatch(setQuestions(questions));

    let prevPointval = 0;
    questions.forEach((q: any) => {
      prevPointval += q.points;
    })
    setPointval(prevPointval);
  };

  const addNewQuestion = () => {
    const tempId = "NEW" + new Date().getTime().toString();
    const newQuestion = {
      _id: tempId,
      quiz: quizId,
      course: cid,
      title: "New Question",
      question: "<p>New Question</p>",
      type: "MC",
      points: 1,
      options: [
        { _id: 1, value: "Option 1", correct: true },
        { _id: 2, value: "Option 2", correct: false }
      ]
    };
    setEditingIds((prevIds: any) => [...prevIds, tempId]);
    dispatch(setQuestions([...(questions || []), newQuestion]));
  };

  const saveAction = async () => {
    questions.map((q: any) => {
      if (q._id.includes("NEW")) {
        client.createQuestion(cid as string, quizId as string, q);
      } else {
        client.updateQuestion(q);
      }
    });
    const questionData = await client.findQuestionsByQuiz(quizId as string);
    client.updateQuizQuestions(quizId as string, questionData);
    navigate(`/Kanbas/Courses/${cid}/Quizzes/${quizId}/Detail`);
  };

  const cancelAction = () => {
    navigate(`/Kanbas/Courses/${cid}/Quizzes`);
  };

  const getTypeString = (type: string) => {
    switch (type) {
      case "MC":
        return "Multiple Choice";
      case "TF":
        return "True or False";
      case "Fill-in":
        return "Fill in the Blank";
      default:
        return "Unknown";
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  useEffect(() => {
    let prevPointval = 0;
    questions.forEach((q: any) => {
      prevPointval += Number(q.points);
    });
    setPointval(prevPointval);
  }, [questions]);

  return (
    <div>
      <div className="d-flex justify-content-center">
        <button className="btn btn-primary m-2" onClick={addNewQuestion}>
          + New Question
        </button>
      </div>
      <ul className="list-group rounded-0">
        {questions && questions.map((question: any) => (
          <div key={question.id}>
            {/* show editor if editing */}
            {editingIds.includes(question._id) ? (
              <Editor
                question={question}
                handleCancel={() => handleCancel(question._id)}
                pointval={pointval}
                setPointval={setPointval}
              />
            ) : (
              // show question details if not
              <li className="list-group-item mb-3 border-dark">
                <div className="d-flex flex-column">
                  <div>
                    <span className="fs-5">{question.title}</span>
                    <span className="float-end">Points: {question.points}</span>
                  </div>
                  <span>Type:{getTypeString(question.type)}</span>
                  <hr />
                  <div className="form-control"
                    dangerouslySetInnerHTML={{ __html: (question.question) }}>
                  </div>
                  <hr />
                  {/* answers */}
                  <div>
                    <span className="fs-5">Answers:</span>
                    {question.options?.map((option: any) => (
                      <ul key={option._id} className="list-group pt-2">
                        <div className="d-flex align-items-center">
                          {option.correct
                            ? <FaCheckCircle className="fs-4 text-success" />
                            : <FaRegCircle className="fs-4 text-danger" />}
                          <li className={`ms-3 mb-2 w-100 list-group-item ${option.correct ? "text-success" : ""} `}>
                            {option.value}
                          </li>
                        </div>
                      </ul>
                    ))}
                  </div>
                  <div className="d-flex justify-content-end pt-3 pb-3">
                    <button className="btn btn-secondary"
                      onClick={() => handleEdit(question._id)}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </li>
            )}
          </div>
        ))}
      </ul>

      <button
        className="btn btn-success m-2"
        onClick={saveAction}
      >
        Save
      </button>
      <button
        className="btn btn-danger m-2"
        onClick={cancelAction}
      >
        Cancel
      </button>
      {/*<button>Publish</button>*/}
    </div>
  );
}