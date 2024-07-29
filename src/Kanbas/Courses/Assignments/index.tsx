import { useParams } from "react-router";
//import * as db from "../../Database";
import AControlButtons from './AControlButtons';
import AssignmentControlButtons from './AssignmentControlButtons';
import AssignmentControls from './AssignmentControls';
import { PiNotePencilDuotone } from "react-icons/pi";
import { BsGripVertical } from 'react-icons/bs';
import { GoTriangleDown } from "react-icons/go";
//import { Link } from "react-router-dom";
import { useSelector } from "react-redux";


export default function Assignments() {
  const { cid } = useParams();  
  const { assignments } = useSelector((state: any) => (state.assignmentsReducer));
  const filteredAssignments = assignments.filter((assignment: any) => assignment.course === cid);

  return (
    <div id="wd-assignments">
      <AssignmentControls /><br /><br /><br /><br />
      <ul id="wd-assignments" className="list-group rounded-0">
        <li className="wd-module list-group-item p-0 mb-5 fs-5">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" />
            <GoTriangleDown className="me-2 fs-3" />
            <b> ASSIGNMENTS </b>
            <AssignmentControlButtons />
          </div>
          <ul className="wd-assignments list-group rounded-0">
            {filteredAssignments.map((assignment: any) => (
              <li key={assignment._id} className="wd-assignment list-group-item p-3 ps-1 border-left-green">
                <div className="row align-items-center">
                  <div className="col-auto">
                    <BsGripVertical className="me-2 fs-3" />
                  </div>
                  <div className="col-auto">
                    <span className="wd-fg-color-green">
                      <PiNotePencilDuotone className="me-2 fs-3" />
                    </span>
                  </div>
                  <div className="col">
                    <a
                      className="wd-assignment-link text-decoration-none text-dark"
                      href={`#/Kanbas/Courses/${cid}/Assignments/${assignment._id}`}
                    >
                      <b> {assignment.title} </b> <br />
                      </a>
                      <h6>
                        <span className="wd-fg-color-red"> {assignment.modules || "Multiple Modules"} </span> | 
                        <b> Not available until</b> {assignment.availableDate} | 
                        Due {assignment.dueDate} | {assignment.points} pts
                      </h6>
                  </div>
                  <div className="col-auto">
                    <AControlButtons assignId={assignment._id}/>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </div>
  );
}