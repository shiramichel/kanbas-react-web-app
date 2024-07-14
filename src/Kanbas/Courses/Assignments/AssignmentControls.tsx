import React from 'react';
import { FaPlus } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";

export default function AssignmentControls() {
  return (
    <div id="wd-assignment-controls" className="d-flex justify-content-end align-items-center p-3">
      <div className="input-group">
        <span className="input-group-text">
          <CiSearch />
        </span>
        <input
          type="text"
          id="wd-search-assignment"
          className="form-control"
          placeholder="Search..."
        />
      </div>

      <div className="d-flex ms-3">
  <button id="wd-group-btn" className="btn btn-lg btn-secondary me-1 d-flex align-items-center">
    <FaPlus className="me-2" />
    <h4 className="m-0">Group</h4>
  </button>

  <button id="wd-add-assignment-btn" className="btn btn-lg btn-danger d-flex align-items-center">
    <FaPlus className="me-2" />
    <span className="d-none d-sm-block">Assignment</span> {/* Hide on small screens */}
  </button>
</div>
    </div>
  );
}
