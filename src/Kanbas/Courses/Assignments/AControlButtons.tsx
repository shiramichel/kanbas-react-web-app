import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";
import { FaTrash } from "react-icons/fa";
import { deleteAssignment } from "./reducer";
import DeleteDialog from "./DeleteDialog";
import { useDispatch } from "react-redux";

export default function AControlButtons(assignId : any) {
  const dispatch = useDispatch(); 

  const deleteButton = () => {
    dispatch(deleteAssignment(assignId.assignId));
  }

  return (
    <div className="float-end">
      <FaTrash className="text-danger me-2 mb-1" 
      data-bs-toggle="modal" data-bs-target="#wd-delete-assignment-dialog"/>
      <DeleteDialog dialogTitle="Delete Assignment?" deleteFunc={deleteButton} />
      <GreenCheckmark />
      <IoEllipsisVertical className="fs-4" />
    </div>
);}