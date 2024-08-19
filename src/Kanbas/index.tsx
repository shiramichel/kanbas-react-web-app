import Dashboard from "./Dashboard";
import KanbasNavigation from "./Navigation";
import { Routes, Route, Navigate } from "react-router";
import Courses from "./Courses";
import"./styles.css";
import * as client from "./Courses/client";
import { useEffect, useState } from "react";
import store from "./store";
import { Provider } from "react-redux";
import Account from "./Account";
import ProtectedRoute from "./ProtectedRoute";
//import Session from "./Account/Session";
import Enroll from "./Enroll";

// Mon
import { useSelector } from "react-redux";
import { RootState } from "./store";

export default function Kanbas() {

  const [courses, setCourses] = useState<any[]>([]);
  const fetchCourses = async () => {
    const courses = await client.fetchAllCourses();
    setCourses(courses);
  };
  useEffect(() => {
    fetchCourses();
  }, []);


  const generateUniqueCourseNumber = () => `Course-${Math.random().toString(36).substr(2, 9)}`;
  
  const [course, setCourse] = useState<any>({
    _id: "1234", name: "New Course", number: generateUniqueCourseNumber(),
    startDate: "2023-09-10", endDate: "2023-12-15", description: "New Description",
    _img: "images/reactjs.jpg"
  });
  const addNewCourse = async () => {
    const newCourse = await client.createCourse(course); 
    setCourses([ ...courses, newCourse ]); 
    return newCourse; 
  };

  const deleteCourse = async (courseId: string) => {
    await client.deleteCourse(courseId);
    setCourses(courses.filter(
      (c) => c._id !== courseId));
  };

  const updateCourse = async () => {
    await client.updateCourse(course);
    setCourses(
      courses.map((c) => {
        if (c._id === course._id) {
          return course;
        } else {
          return c;
        }
      })
    );
  };

    // Mon
    const userRole = useSelector((state: RootState) => state.accountReducer.userRole);
    const userLoginId = useSelector((state: RootState) => state.accountReducer.userLoginId);
  

    return (
      <Provider store={store}>
      <div id="wd-kanbas">
            <KanbasNavigation />
            <div className="wd-main-content-offset p-3">
            
          <Routes>
          <Route path="/" element={<Navigate to="Dashboard" />} />
          <Route path="/Account/*" element={<Account />} />
            <Route path="Dashboard" element={<ProtectedRoute><Dashboard
                courses={courses}
                course={course}
                setCourse={setCourse}
                addNewCourse={addNewCourse}
                deleteCourse={deleteCourse}
                updateCourse={updateCourse} />
</ProtectedRoute>} />
          <Route path="Enroll" element={<Enroll courses={courses} />} />
            <Route path="Courses/:cid/*" element={<ProtectedRoute><Courses courses={courses} userRole={userRole} userLoginId={userLoginId} /></ProtectedRoute> } />
            <Route path="Calendar" element={<h1>Calendar</h1>} />
            <Route path="Inbox" element={<h1>Inbox</h1>} />

            </Routes>
        </div>
      </div>
      </Provider>

  );}