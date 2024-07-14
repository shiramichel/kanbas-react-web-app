import { IoEllipsisVertical } from "react-icons/io5";
import { BsPlus } from 'react-icons/bs';

export default function AssignmentControlButtons() {
  return (
    <div className="float-end">
      <button id="wd-percent-total" className="btn btn-lg me-1" style={{ borderRadius: '50px', border: '1px solid black' }}>
        <h6> 40% of Total </h6>
      </button>
      <BsPlus className="me-1 fs-4" />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}
