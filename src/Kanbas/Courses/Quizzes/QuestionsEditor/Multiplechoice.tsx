import { PiTrashLight } from "react-icons/pi";
import { FaCheckCircle, FaRegCircle } from "react-icons/fa";
import "./styles.css";
import { useState } from "react";

export default function Multiplechoice(
  { question, setQuestion }:
    { question: any; setQuestion: any; }
) {
  const [showModal, setShowModal] = useState(false);
  const answers = question.options;

  const addAnswer = () => {
    const tempId = new Date().getTime();
    const newAnswer = { _id: tempId, value: "Option", correct: false };
    setQuestion({ ...question, options: [...answers, newAnswer] });
  };

  const handleChange = (e: any, id: any) => {
    const newAnswers = answers.map((a: any) => (a._id === id ? { ...a, value: e.target.value } : a));
    setQuestion({ ...question, options: newAnswers });
  };

  const handleChangeCorrect = (id: any) => {
    const newAnswers = answers.map((a: any) => ({ ...a, correct: a._id === id }));
    setQuestion({ ...question, options: newAnswers });
  };

  const removeAnswer = (id: any) => {
    let newAnswers = answers.filter((a: any) => a._id !== id);
    if (newAnswers.length === 1) {
      setShowModal(true);
      return;
    }
    // if deleting correct answer, set another to be correct
    const answerToDelete = answers.find((a: any) => a._id === id)
    if (answerToDelete.correct === true) {
      const newCorrect = newAnswers[0];
      newAnswers = newAnswers.map((a: any) => (a._id === newCorrect._id ? { ...a, correct: true } : a));
    }
    setQuestion({ ...question, options: newAnswers });
  };

  return (
    <div id="mc-editor">
      {answers.map((answer: any) => (
        <div className="d-flex flex-row pb-3 align-items-center" key={answer._id}>
          {/* icon to choose correct answer*/}
          <div>
            <label>
              <input
                type="radio"
                className="col-form-check-input radio-hide"
                name="correctAnswer"
                value={answer._id}
                checked={answer.correct}
                onChange={() => handleChangeCorrect(answer._id)}
              />
              {answer.correct
                ? <FaCheckCircle className="fs-4 text-success" />
                : <FaRegCircle className="fs-4 text-danger" />}
            </label>
          </div>

          {/* label - changes betwen possible answer and correct answer based on radio button */}
          <div className="me-2">
            <label
              htmlFor={`mc-answer-${answer._id}`}
              className={`col-form-label text-end label-width ${answer.correct ? "text-success" : "text-danger"}`}
            >
              {answer.correct ? "Correct" : "Incorrect"}
            </label>
          </div>

          {/* possible answers */}
          <div className="flex-fill">
            <textarea
              id={`mc-answer-${answer._id}`}
              className={`form-control ${answer.correct ? "border-success" : "border-danger"}`}
              value={answer.value}
              onChange={(e) => handleChange(e, answer._id)}
              rows={1} />
          </div>

          {/* remove answer */}
          <div>
            <button className="btn btn-link text-black" type="button" onClick={() => removeAnswer(answer._id)}>
              <PiTrashLight className="fs-4" />
            </button>
          </div>
        </div>
      ))}

      {/* add another answer */}
      <div className="text-end">
        <button className="btn btn-link text-danger text-decoration-none" type="button" onClick={() => addAnswer()}>
          + Add Another Answer
        </button>
      </div>

      {/* modal for delete warning */}
      <div className={`modal fade ${showModal ? 'show d-block' : ''}`} role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Error</h5>
              <button type="button" className="btn-close" onClick={() => setShowModal(false)} aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <p>Unable to delete question - must have at least 2 options.</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-danger" onClick={() => setShowModal(false)}>OK</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
