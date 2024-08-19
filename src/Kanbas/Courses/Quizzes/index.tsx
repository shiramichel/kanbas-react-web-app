import { Link } from "react-router-dom";

// TODO quizzes main page
// - only made to handle showing 1 quiz hardcoded for now

export default function Quizzes() {

  return (
    <div id="wd-quizzes">
      <h1>Quiz Questions</h1>
      <Link to = {`/Kanbas/Courses/RS101/Quizzes/66c130ef1188d96d6651dfa4`}> Q101 </Link>
    </div>
  );
}