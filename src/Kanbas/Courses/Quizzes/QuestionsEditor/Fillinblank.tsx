import { PiTrashLight } from "react-icons/pi";
import "./styles.css";
import { useState } from "react";

export default function Fillinblank(
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

  const removeAnswer = (id: any) => {
    const newAnswers = answers.filter((a: any) => a._id !== id);
    if (newAnswers.length === 0) {
      setShowModal(true);
      return;
    }
    setQuestion({ ...question, options: newAnswers });
  };

  return (
    <div id="fill-in-editor">
      {answers.map((answer: any) => (
        <div className="form-group d-flex pb-3" key={answer._id}>
          {/* possible answers */}
          <div className="me-3">
            <label
              htmlFor={`fib-answer-${answer._id}`}
              className="ms-3 col-form-label text-end label-nowrap"
            >
              Possible Answer:
            </label>
          </div>
          <div className="flex-fill">
            <input
              id={`fib-answer-${answer._id}`}
              className="form-control"
              type="text"
              defaultValue={answer.value}
              onChange={(e) => handleChange(e, answer._id)}
            />
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
