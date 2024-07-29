import { createSlice } from "@reduxjs/toolkit";
import { assignments } from "../../Database";

const initialState = {
  assignments: assignments,
};
const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    addAssignment: (state, { payload: assign }) => {
        const newAssign: any = {
            ...assign,
            _id: new Date().getTime().toString(),
        };
        state.assignments = [...state.assignments, newAssign] as any;
    },
    deleteAssignment: (state, { payload: assignId }) => {
    state.assignments = state.assignments.filter(
        (a: any) => a._id !== assignId);
    },
    updateAssignment: (state, { payload: assignment }) => {
        state.assignments = state.assignments.map((a: any) =>
          a._id === assignment._id ? assignment : a
        ) as any;
    }
    }
});
export const { addAssignment, deleteAssignment, updateAssignment } = assignmentsSlice.actions;
export default assignmentsSlice.reducer;