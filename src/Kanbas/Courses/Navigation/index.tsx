import { courses } from "../../Database";
import "./index.css";
import { useParams, useLocation} from "react-router";
import { Link } from "react-router-dom";


export default function CoursesNavigation() {
const { cid } = useParams();
  //const course = courses.find((course) => course._id === cid);
  const { pathname } = useLocation();

  const links = [
     { label: "Home", path: `/Kanbas/Courses/${cid}/Home` },
     { label: "Modules", path: `/Kanbas/Courses/${cid}/Modules` },
     { label: "Piazza", path: `/Kanbas/Courses/${cid}/Piazza` },
     { label: "Zoom", path: `/Kanbas/Courses/${cid}/Zoom` },
     { label: "Assignments", path: `/Kanbas/Courses/${cid}/Assignments` },
     { label: "Quizzes", path: `/Kanbas/Courses/${cid}/Quizzes` },
     { label: "Grades", path: `/Kanbas/Courses/${cid}/Grades` },
  ];

  return (
   <div id="wd-courses-navigation" className="list-group fs-5 rounded-0">
      {links.map((link) => (
         <Link
            key={link.path}
            to={link.path}
            id={`wd-course-${link.label.toLowerCase()}-link`}
            className={`list-group-item border border-0 ${pathname.includes(link.path) ? "active text-danger" : "text-danger"}`}
         >
            {link.label}
         </Link>
      ))}
   </div>
);
}