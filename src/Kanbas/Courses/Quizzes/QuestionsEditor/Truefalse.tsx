import { FaCheckCircle, FaRegCircle } from "react-icons/fa";
import "./styles.css";

export default function Truefalse(
  { question, setQuestion }:
    { question: any; setQuestion: any; }
) {
  const answers = question.options;

  const handleChange = (id: any) => {
    const newAnswers = answers.map((a: any) => ({ ...a, correct: a._id === id }));
    setQuestion({ ...question, options: newAnswers });
  };

  return (
    <div id="tf-editor">
      {answers.map((answer: any) => (
        <div className="form-group row" key={answer._id}>
          <div className="col">
            {/* icon */}
            <label>
              <input
                id={`tf-answer-${answer._id}`}
                type="radio"
                className="col-form-check-input radio-hide"
                name="selectedAnswer"
                defaultChecked={answer.correct}
                onChange={() => handleChange(answer._id)}
              />
              {answer.correct
                ? <FaCheckCircle className="fs-4 text-success" />
                : <FaRegCircle className="fs-4 text-danger" />}

            </label>
            {/* text label */}
            <label
              htmlFor={`tf-answer-${answer._id}`}
              className={`col-sm-10 col-form-label ps-3 ${answer.correct ? "text-success" : "text-danger"}`}>
              {answer.value}
            </label>
          </div>
        </div>
      ))}
    </div>
  );
}