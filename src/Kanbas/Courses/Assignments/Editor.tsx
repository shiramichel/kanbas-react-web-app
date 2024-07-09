export default function AssignmentEditor() {
    return (
      <div id="wd-assignments-editor">
        <label htmlFor="wd-name">Assignment Name</label>
        <input id="wd-name" value="A1 - ENV + HTML" /><br /><br />
        <textarea id="wd-description">
          The assignment is available online Submit a link to the landing page of your Web application running on Netlify. The landing page should include the following: Your full name and section Links to each of the lab assignments Link to the Kanbas application Links to all relevant source code repositories The Kanbas application should include a link to navigate back to the landing page.
        </textarea>
        <br />
        <table>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-points">Points</label>
            </td>
            <td>
              <input id="wd-points" value={100} />
            </td>
          </tr>
        </table>
        <br/>
        <table>
          <tr>
            <td align="right" valign="top">
            <label htmlFor="wd-group"> Assignment Group: </label><br/>
            </td>
            <td>
                <select id="wd-group">
                <option value="ASSIGNMENTS">ASSIGNMENT</option>
                </select>
            </td>
          </tr>
        </table>
        <br/>
        <table>
          <tr>
            <td align="right" valign="top">
            <label htmlFor="wd-display-grade-as"> Display Grade as: </label><br/>
            </td>
            <td>
                <select id="wd-display-grade-as">
                <option value="PERCENTAGE">Percentage</option>
                </select>
            </td>
          </tr>
        </table>
        <br/>
        <table>
          <tr>
            <td align="right" valign="top">
            <label htmlFor="wd-submission-type"> Submission Type: </label><br/>
            </td>
            <td>
                <select id="wd-submission-type">
                <option value="Online">Online</option>
                </select>
            </td>
          </tr>
        </table>
        <br/>
        <table>
          <tr>
            <td align="right" valign="top">
            <label> </label><br/>
            </td>
            <td align="left" valign="middle">
                <label> Online Entry Options </label><br/>
                <input type="checkbox" name="wd-text-entry" id="wd-text-entry"/>
                <label htmlFor="wd-text-entry">Text Entry</label><br/>

                <input type="checkbox" name="wd-website-url" id="wd-website-url"/>
                <label htmlFor="wd-website-url">Website URL</label><br/>

                <input type="checkbox" name="wd-media-recordings" id="wd-media-recordings"/>
                <label htmlFor="wd-media-recordings">Media Recordings</label><br/>

                <input type="checkbox" name="wd-student-annotation" id="wd-student-annotation"/>
                <label htmlFor="wd-student-annotation">Student Annotation</label><br/>

                <input type="checkbox" name="wd-file-upload" id="wd-file-upload"/>
                <label htmlFor="wd-file-upload">File Upload</label><br/>
                </td>
          </tr>
          <br/>
        </table>
        <td align="right" valign="top">
            <label htmlFor="wd-assign-to">Assign to</label> <br/>
        </td>
            <input id="wd-assign-tos" value={"Everyone"} /> <br/>

        <td>
        <br/>
        <label htmlFor="wd-due-date"> Due </label> <br/>
        <input type="date"
        id="wd-due-date"
        value="2024-05-13"/><br/>
        </td>
        <br/>
        <td>
        <label htmlFor="wd-available-from"> Available from </label> <br/>
        <input type="date"
        id="wd-available-from"
        value="2024-05-06"/><br/>
        </td>
        <td>
        <label htmlFor="wd-available-until"> Available until </label> <br/>
        <input type="date"
        id="wd-available-until"
        value="2024-05-20"/><br/>
        </td>
        <br/>
        <td align="right" valign="bottom">
        <button id="wd-cancel" type="button">
        Cancel
        </button>
        <button id="wd-save" type="button">
        Save
        </button>
        </td>

      </div>
  );}
  