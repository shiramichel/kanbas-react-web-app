import CoursesNavigation from "./Navigation";
import {Route, Routes, useParams, useLocation } from "react-router";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import Editor from "./Assignments/Editor";
import { FaAlignJustify } from 'react-icons/fa';
import Grades from "./Grades";
//import { courses } from "../Database";
import PeopleTable from "./People/Table";

// QUIZ SCREEN IMPORTS
import Quizzes from "./Quizzes";
import QuizDetails from "./Quizzes/Details";
import Quizzes2 from "./Quizzes/DetailsAndQuestions/index";
// import QuizEditor from "./Quizzes/DetailsAndQuestions"; 
import QuizPreview from "./Quizzes/QuizPreview";
import StartQuiz from "./Quizzes/startQuiz";
import QuizResults from "./Quizzes/QuizResults";


export default function Courses({ courses, userRole, userLoginId }: { courses: any[]; userRole: any; userLoginId: any }) {
  const { cid } = useParams();
  const course = courses.find((course) => course._id === cid);
  const { pathname } = useLocation();

  return (
    <div id="wd-courses">
      <h2 className="text-danger">
      <FaAlignJustify className="me-4 fs-4 mb-1" />
      {course && course.name} &gt; {pathname.split("/")[4]}
      </h2>
      <hr />
      <div className="d-flex">
        <div className="d-none d-md-block flex-shrink-0 me-2">
          <CoursesNavigation />
        </div>
        <div className="flex-grow-1">
          <Routes>
            <Route path="Home" element={<Home />} />
            <Route path="Modules" element={<Modules />} />
            <Route path="Assignments" element={<Assignments />} />
            <Route path="Assignments/:aid" element={<Editor />} />
            <Route path="Grades" element={<Grades />} />

            {/* QUIZ PATHS */}
            <Route path="Quizzes" element={<Quizzes userRole={userRole}/>} />
            <Route path="Quizzes/:quizId/Detail" element={<QuizDetails userRole={userRole}/>} />
            {/*<Route path={`/Kanbas/Courses/:cid/Quizzes/:quizId/Edit/*`} element={<Quizzes2 />}/>*/}
            <Route path={`Quizzes/:quizId/Edit//*`} element={<Quizzes2 />}/>
            {/* <Route path="/Quizzes/:quizId/Edit" element={<QuizEditor />} /> */}
            <Route path="Quizzes/:quizId/Preview" element={<QuizPreview userRole={userRole} />} />
            <Route path="Quizzes/:quizId/StartQuiz" element={<StartQuiz userRole={userRole} userLoginId={userLoginId}/>} />
            <Route path="Quizzes/:quizId/Results" element={<QuizResults userRole={userRole} userLoginId={userLoginId}/>} /> 
            
            <Route path="People" element={<PeopleTable />} />
            <Route path="People/:uid" element={<PeopleTable />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};