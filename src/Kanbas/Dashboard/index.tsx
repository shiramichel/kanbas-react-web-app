import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../Account/reducer";
import * as client from "../Courses/client";
//import { deleteUser } from "../Courses/People/client";
//import { current } from "@reduxjs/toolkit";

export default function Dashboard({courses, course, setCourse, addNewCourse,
  deleteCourse, updateCourse }: {
  courses: any[]; course: any; setCourse: (course: any) => void;
  addNewCourse: () => any; deleteCourse: (course: any) => void;
  updateCourse: () => void; }) 
  {
  // get current user 
  const { currentUser } = useSelector((state: any) => state.accountReducer); 
  courses = courses.filter((c) => (currentUser.courses.indexOf(c._id) > -1));

  const dispatch = useDispatch(); 

  // function to add course and update user as well 
  const addUserCourse = async () => {
    const addedCourse = await addNewCourse(); 
    const newUser = {...currentUser, courses : [...currentUser.courses, addedCourse._id]}; 
    await client.updateUser(newUser); 
    dispatch(setCurrentUser(newUser)); 
  }

  // function to delete course and update user as well 
  const deleteUserCourse = async (cid : Number) => {
    await deleteCourse(cid); 
    const newUser = {...currentUser, courses: currentUser.courses.filter((c : Number) => c !== cid)}
    await client.updateUser(newUser); 
    dispatch(setCurrentUser(newUser)); 
  }

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />

      { currentUser.role === 'FACULTY' ? 
      <div>
      <h5>New Course</h5>  
          
          <div className="row">
            <div className="col">
              <input value={course.name} className="form-control mb-2" 
                      onChange={(e) => setCourse({ ...course, name: e.target.value }) } />
            </div>
            <div className="col">
              <input value={course.number} className="form-control mb-2" 
                      onChange={(e) => setCourse({ ...course, number: e.target.value }) } />
            </div>
            <div className="col">
                <button className="btn btn-primary float-end m-1"
                  id="wd-add-new-course-click"
                  onClick={addUserCourse} > Add </button>
                <button className="btn btn-warning float-end m-1"
                  id="wd-update-course-click"
                  onClick={updateCourse} > Update </button>
            </div>
          </div>
          
          <textarea value={course.description} className="form-control"
            onChange={(e) => setCourse({ ...course, description: e.target.value }) } /><hr />
      </div>
                  
      : <Link to="/Kanbas/Enroll"><button className="btn btn-primary m-1">Find Courses</button></Link>
      }<br />
      

      <h2 id="wd-dashboard-published"> {currentUser.role === 'FACULTY' ? "Published Courses" : "Enrolled Courses"} ({courses.length})</h2> <hr /> 
      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {courses.map((course) => (
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
                    <Link to={`/Kanbas/Courses/${course._id}/Home`} className="btn btn-primary">Go</Link>
                    { currentUser.role === "FACULTY" ? 
                    <span>
                    <button onClick={(event) => {
                        event.preventDefault();
                        // deleteCourse(course._id);
                        deleteUserCourse(course._id); 
                      }} className="btn btn-danger float-end"
                      id="wd-delete-course-click">
                      Delete
                    </button>
                    <button id="wd-edit-course-click"
                      onClick={(event) => {
                        event.preventDefault();
                        setCourse(course);
                      }}
                      className="btn btn-warning me-2 float-end mr-1" >
                      Edit
                    </button>
                    </span> : <span />
                    }
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

