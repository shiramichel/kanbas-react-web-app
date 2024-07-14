import GradesControlButtons from "./GradesControlButtons";
import { CiSearch } from "react-icons/ci";
import { CiFilter } from "react-icons/ci";

export default function Grades() {
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



      <div id="wd-assignment-controls" className="d-flex justify-content-start ">
      <button id="wd-filter-btn" className="btn btn-lg btn-secondary me-1 float-end">
      <CiFilter className="me-1 fs-4"/>
      Apply Filters
      </button>
      </div>

      <br></br>

      <table className="table table-bordered">
  <thead>
  <tr className="table-light text-center">
  <th className="text-start">Student Name</th>
  <th>A1 SETUP <br /> Out of 100</th>
  <th>A2 HTML <br /> Out of 100</th>
  <th>A3 CSS <br /> Out of 100</th>
  <th>A4 BOOTSTRAP <br /> Out of 100</th>
</tr>
  </thead>
  <tbody>
  <tr className="table">
  <td className="text-start"><span className="wd-fg-color-red"> Name 1 </span></td>
  <td className="text-center">100%</td>
  <td className="text-center">96.67%</td>
  <td className="text-center">92.18%</td>
  <td className="text-center">66.22%</td>
</tr>
    <tr className="table-light">
    <td className="text-start"> <span className="wd-fg-color-red"> Name 2 </span></td>
    <td className="text-center">100%</td>
    <td className="text-center">100%</td>
    <td className="text-center">100%</td>
    <td className="text-center">100%</td>
    </tr>
    <tr className="table">
    <td className="text-start"><span className="wd-fg-color-red"> Name 3 </span></td>
    <td className="text-center">100%</td>
    <td className="text-center">100%</td>
    <td className="text-center">100%</td>
    <td className="text-center">100%</td>
    </tr>
    <tr className="table-light">
    <td className="text-start"><span className="wd-fg-color-red"> Name 4 </span></td>
    <td className="text-center">100%</td>
    <td className="text-center">100%</td>
    <td className="text-center"><input type="text" className="form-control"
                 id="input1" value="88.03%" style={{ maxWidth: '80px' }} /></td>
      <td className="text-center">98.99%</td>
    </tr>
    <tr className="table">
    <td className="text-start"><span className="wd-fg-color-red"> Name 5 </span></td>
    <td className="text-center">100%</td>
    <td className="text-center">96.67%</td>
    <td className="text-center">98.37%</td>
    <td className="text-center">100%</td>
    </tr>
    <tr className="table-light">
      <td className="text-start"><span className="wd-fg-color-red"> Name 6 </span></td>
      <td className="text-center">100%</td>
      <td className="text-center">96.67%</td>
      <td className="text-center">100%</td>
      <td className="text-center">100%</td>
    </tr>
  </tbody>
</table>


</div>

  );
}

