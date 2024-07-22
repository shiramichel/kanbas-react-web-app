import GradesControlButtons from "./GradesControlButtons";
import { CiSearch } from "react-icons/ci";
import { CiFilter } from "react-icons/ci";
import * as db from "../../Database";
import { useParams } from "react-router-dom";

export default function Grades() {
  const users = db.users;
  const grades = db.grades;
  const enrollments = db.enrollments;  
  const assignments = db.assignments;
  
  const { cid } = useParams(); 
  const filteredAssignments = assignments.filter((assignment) => assignment.course === cid);

  const enrolledStudentIds = enrollments
    .filter(enrollment => enrollment.course === cid)
    .map(enrollment => enrollment.user);

  const filteredUsers = users.filter(user => enrolledStudentIds.includes(user._id));

  return (
    <div id="wd-grades">
      <GradesControlButtons /><br /><br /><br /><br />

      <div id="wd-assignment-controls" className="d-flex p-3">
        <div className="flex-grow-1 me-3">
          <div className="mb-3">
            <label htmlFor="wd-search-students" className="form-label"><b>Student Names</b></label>
            <div className="input-group">
              <span className="input-group-text">
                <CiSearch />
              </span>
              <input
                type="text"
                id="wd-search-students"
                className="form-control"
                placeholder="Search Students"
              />
            </div>
          </div>
        </div>

        <div className="flex-grow-1">
          <div className="mb-3">
            <label htmlFor="wd-search-assignments" className="form-label"><b>Assignment Names</b></label>
            <div className="input-group">
              <span className="input-group-text">
                <CiSearch />
              </span>
              <input
                type="text"
                id="wd-search-assignments"
                className="form-control"
                placeholder="Search Assignments"
              />
            </div>
          </div>
        </div>
      </div>

      <div id="wd-assignment-controls" className="d-flex justify-content-start">
        <button id="wd-filter-btn" className="btn btn-lg btn-secondary me-1 float-end">
          <CiFilter className="me-1 fs-4"/>
          Apply Filters
        </button>
      </div>

      <br />

      <table className="table table-bordered">
        <thead>
          <tr className="table-light text-center">
            <th className="text-start">Student Name</th>
            {filteredAssignments.map((assignment) => (
              <th key={assignment._id} className="text-center">
                {assignment.title} <br /> Out of 100
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user._id} className="table">
              <td className="text-start">
                <span className="wd-fg-color-red">{`${user.firstName} ${user.lastName}`}</span>
              </td>
              {filteredAssignments.map((assignment) => (
                <td key={assignment._id} className="text-center">
                  {
                    grades.find(
                      grade => grade.student === user._id && grade.assignment === assignment._id
                    )?.grade || '-'
                  }
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
