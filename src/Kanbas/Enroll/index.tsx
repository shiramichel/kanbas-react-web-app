
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../Account/reducer";
import * as client from "../Courses/client";

export default function Enroll({courses} : {courses: any[]}) 
  {
  // get current user 
  const { currentUser } = useSelector((state: any) => state.accountReducer); 
  courses = courses.filter((c : any) => (currentUser.courses.indexOf(c._id) === -1)); 

  const dispatch = useDispatch(); 
  const navigate = useNavigate(); 

  const enrollUser = async (course : any) => {
    const newUser = {...currentUser, courses: [...currentUser.courses, course._id]};
    console.log(newUser, course, course._id); 
    await client.updateUser(newUser); 
    dispatch(setCurrentUser(newUser)); 
    navigate("/Kanbas/Dashboard");
  }

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Enroll in a Course</h1> <hr />

      <h2 id="wd-dashboard-published"> Available Courses ({courses.length})</h2> <hr /> 
      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {courses.map((course : any) => (
            <div className="wd-dashboard-course col" style={{ width: "300px" }}>
              <Link to={`/Kanbas/Courses/${course._id}/Home`} className="text-decoration-none" >
                <div className="card rounded-3 overflow-hidden">
                <img src={course._img} alt="" height="{160}" />
                  <div className="card-body">
                    <span className="wd-dashboard-course-link"
                      style={{ textDecoration: "none", color: "navy", fontWeight: "bold" }} >
                      {course.name}
                    </span>
                    <p className="wd-dashboard-course-title card-text" style={{ maxHeight: 53, overflow: "hidden" }}>
                      {course.description}
                    </p>
                    <button className="btn btn-primary" onClick={() => enrollUser(course)}>Add</button>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
