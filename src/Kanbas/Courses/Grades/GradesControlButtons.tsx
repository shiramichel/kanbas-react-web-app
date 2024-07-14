import { LiaFileImportSolid } from "react-icons/lia";
import { LiaFileExportSolid } from "react-icons/lia";
import { IoMdSettings } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";

export default function GradesControlButtons(){
    return(
        <div className="float-end">
            <div id="wd-modules-controls" className="text-nowrap d-flex">
      <button id="wd-import-btn" className="btn btn-lg btn-secondary me-1 float-end">
      <LiaFileExportSolid className="me-1 fs-4"/>
        Import
      </button>

      <button id="wd-export-btn" className="btn btn-lg btn-secondary me-1 float-end">
      <LiaFileImportSolid className="me-1 fs-4"/>
      Export
      <span>
          <IoIosArrowDown />
        </span>
      </button>

      <button id="wd-settings-btn" className="btn btn-lg btn-secondary me-1 float-end">
      <IoMdSettings className="me-1 fs-4"/>
      </button>
    </div>
                </div>
    );
}