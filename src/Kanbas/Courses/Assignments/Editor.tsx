import { FaRegCalendarAlt } from "react-icons/fa";
import { useParams, Link } from "react-router-dom";
//import * as db from "../../Database"; 
import { useSelector } from "react-redux";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addAssignment, updateAssignment } from "./reducer";

export default function AssignmentEditor() {
  const { cid, aid } = useParams(); 
  const dispatch = useDispatch()
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);

  const initializeAssignment = () => {
    if (aid === "new") {
        return {
            _id: "new", 
            title: "New Assignment", 
            course: cid,
            description: "Assignment Description",
            points: 100,
            dueDate: "2000-01-01",
            availableDate: "2000-01-01",
            availableToDate: "2000-01-01"
        };
    } else {
        return assignments.find((a: any) => a.course === cid && a._id === aid) || {
            _id: "",
            title: "",
            course: "",
            description: "",
            points: 0,
            dueDate: "",
            availableDate: "",
            availableToDate: ""
        };
    }
};

const [assign, setAssign] = useState(initializeAssignment);

const onSave = (assign: any) => {
    if (aid === "new") {
        dispatch(addAssignment(assign));
    } else {
        dispatch(updateAssignment(assign)); 
    }
}

  // Handle the case where no assignment is found
  //if (!assignment) return <p>No assignment found for this ID.</p>;

  return (
    <div id="wd-edit-assignment">
      <div className="mb-3">
        <label htmlFor="input1" className="form-label">Assignment Name</label>
        <div className="form-control rectangle">
        <input id="wd-name" className="form-control" value={assign.title}
        onChange={(e) => setAssign({...assign, title: e.target.value})} />
        </div>
      </div>

      <div className="list-group">
        <div className="list-group-item">
        <textarea id="wd-description" className="form-control" rows={10} cols={40} 
            value={assign.description}
            onChange={(e) => setAssign({...assign, description: e.target.value})}/>
        </div>
      </div>

      <br />

      <form>
        <table className="table">
            {/* Points */}
            <tr>
              <td className="text-end align-top">
                <label htmlFor="inputPoints" className="form-label">Points</label>
              </td>
              <td>
                <div className="form-control rectangle">
                <input id="wd-points" className="form-control" value={assign.points} type="number"
            onChange={(e) => setAssign({...assign, points: parseInt(e.target.value)})}/>
                </div>
              </td>
            </tr>

            {/* Assignment Group */}
            <tr>
              <td className="text-end align-top">
                <label htmlFor="inputAssignmentGroup" className="form-label">Assignment Group</label>
              </td>
              <td>
                <select className="form-select" id="inputAssignmentGroup">
                  <option selected>ASSIGNMENTS</option>
                </select>
              </td>
            </tr>

            {/* Display Grade as */}
            <tr>
              <td className="text-end align-top">
                <label htmlFor="inputDisplayGrade" className="form-label">Display Grade as</label>
              </td>
              <td>
                <select className="form-select" id="inputDisplayGrade">
                  <option selected>Percentage</option>
                </select>
              </td>
            </tr>

            {/* Submission Type */}
            <tr>
              <td className="text-end align-top">
                <label htmlFor="inputSubmissionType" className="form-label">Submission Type</label>
              </td>
              <td>
                <div className="list-group">
                  <div className="list-group-item">
                    <select className="form-select" id="inputSubmissionType">
                      <option selected>Online</option>
                    </select>
                    <br />
                    <label htmlFor="inputAssignTo" className="form-label"><b>Online Entry Options</b></label>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="textEntry" />
                      <label className="form-check-label" htmlFor="textEntry">Text Entry</label>
                      <br /><br />
                      <input className="form-check-input" type="checkbox" id="websiteURL" />
                      <label className="form-check-label" htmlFor="websiteURL">Website URL</label>
                      <br /><br />
                      <input className="form-check-input" type="checkbox" id="mediaRecordings" />
                      <label className="form-check-label" htmlFor="mediaRecordings">Media Recordings</label>
                      <br /><br />
                      <input className="form-check-input" type="checkbox" id="studentAnnotations" />
                      <label className="form-check-label" htmlFor="studentAnnotations">Student Annotations</label>
                      <br /><br />
                      <input className="form-check-input" type="checkbox" id="fileUploads" />
                      <label className="form-check-label" htmlFor="fileUploads">File Uploads</label>
                      <br /><br />
                    </div>
                  </div>
                </div>
              </td>
            </tr>

            {/* Assign */}
            <tr>
              <td className="text-end align-top">
                <label htmlFor="inputAssign" className="form-label">Assign</label>
              </td>
              <td>
                <div className="list-group">
                  <div className="list-group-item">
                    {/* Assign to and Date stacked */}
                    <div className="mb-3">
                      <label htmlFor="inputAssignTo" className="form-label"><b>Assign to</b></label>
                      <input
                        type="text"
                        className="form-control"
                        id="inputAssignTo"
                        placeholder="Everyone"
                      />
                    </div>
                    <div className="mb-3">
  <label htmlFor="inputAssignDate" className="form-label"><b>Due</b></label>
  <div className="form-control rectangle d-flex justify-content-between align-items-center">
    <span><input type="date" id="wd-available-from" className="form-control" value={assign.availableDate} 
                        onChange={(e) => setAssign({...assign, availableDate: e.target.value})}/></span>
    <FaRegCalendarAlt />
  </div>
</div>

                    {/* Available from and Until side by side */}
                    <div className="row mb-3">
                      <div className="col">
                        <label htmlFor="inputAssignAvailable" className="form-label"><b>Available from</b></label>
                        <div className="form-control rectangle d-flex justify-content-between align-items-center">
    <span><input type="date" id="wd-available-until" className="form-control" value={assign.availableToDate}
                        onChange={(e) => setAssign({...assign, availableToDate: e.target.value})} /></span>
    <FaRegCalendarAlt />
  </div>
                      </div>
                      <div className="col">
                        <label htmlFor="inputAssignUntil" className="form-label"><b>Until</b></label>
                        <div className="form-control rectangle d-flex justify-content-between align-items-center">
    <span></span>
    <FaRegCalendarAlt />
  </div>
                  
                      </div>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
        </table>
      </form>

      {/* Buttons */}
      <div className="d-flex justify-content-end mt-4">
        <Link to={`/Kanbas/Courses/${cid}/Assignments`} className="btn btn-secondary me-2" role="button">
          Cancel
        </Link>
        <Link to={`/Kanbas/Courses/${cid}/Assignments`}>
                <button id="wd-save" type="button" className="btn btn-danger"
                onClick={() => onSave(assign)}>Save</button></Link>
      </div>
    </div>
  );
}