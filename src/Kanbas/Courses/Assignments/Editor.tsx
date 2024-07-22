import { FaRegCalendarAlt } from "react-icons/fa";
import { useParams, Link } from "react-router-dom";
import * as db from "../../Database"; 

export default function AssignmentEditor() {
  const { cid, aid } = useParams(); 
  const assignment = db.assignments.find(a => a._id === aid);

  // Handle the case where no assignment is found
  if (!assignment) return <p>No assignment found for this ID.</p>;

  return (
    <div id="wd-edit-assignment">
      <div className="mb-3">
        <label htmlFor="input1" className="form-label">Assignment Name</label>
        <div className="form-control rectangle">
          {assignment.title}
        </div>
      </div>

      <div className="list-group">
        <div className="list-group-item">
          The assignment is <span className="wd-fg-color-red">available online</span> <br /><br />
          {assignment.description}
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
                  {assignment.points}
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
    <span>{assignment.dueDate}</span>
    <FaRegCalendarAlt />
  </div>
</div>

                    {/* Available from and Until side by side */}
                    <div className="row mb-3">
                      <div className="col">
                        <label htmlFor="inputAssignAvailable" className="form-label"><b>Available from</b></label>
                        <div className="form-control rectangle d-flex justify-content-between align-items-center">
    <span>{assignment.availableDate}</span>
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
        <Link to={`/Kanbas/Courses/${cid}/Assignments`} className="btn btn-danger" role="button">
          Save
        </Link>
      </div>
    </div>
  );
}
