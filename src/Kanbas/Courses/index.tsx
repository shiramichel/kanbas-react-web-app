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
import Quizzes from "./Quizzes";
import QuizDetails from "./Quizzes/Details";
import Quizzesn from "./Quizzes/DetailsAndQuestions";


export default function Courses({ courses }: { courses: any[]; }) {
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
            <Route path="Quizzes" element={<Quizzes />} />
            <Route path="Quizzes/:qid" element={<QuizDetails />} />
            <Route path="People" element={<PeopleTable />} />
            <Route path="People/:uid" element={<PeopleTable />} />
            <Route path="QuizTestN/*" element={<Quizzesn />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};