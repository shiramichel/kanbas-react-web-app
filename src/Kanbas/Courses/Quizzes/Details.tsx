import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { setQuestions } from "./reducer";

import * as client from "./client";
import Editor from "./QuestionsEditor/Editor";

// TODO question details
// - only made to handle showing editor for now

export default function Details() {
  const { qid } = useParams();
  const dispatch = useDispatch();

  const { questions } = useSelector((state: any) => state.questionsReducer);
  const [editingIds, setEditingIds] = useState<any[]>([]);

  const handleEdit = (id: any) => {
    setEditingIds((prevIds: any) => [...prevIds, id]);
  };

  const handleCancel = (id: any) => {
    setEditingIds((prevIds: any) => prevIds.filter((questionId: any) => questionId !== id));
  };

  const fetchQuestions = async () => {
    const questions = await client.findQuestionsForQuiz(qid as string);
    dispatch(setQuestions(questions));
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <div>
      <h1>Quiz Details</h1>
      {questions.map((question: any) => (
        <div key={question.id}>
          {editingIds.includes(question._id) ? (
            <Editor question={question} handleCancel={() => handleCancel(question._id)} />
          ) : (
            <div>
              <h3>{question.title}</h3>
              <button onClick={() => handleEdit(question._id)}>
                Edit
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}