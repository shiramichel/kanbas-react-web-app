import { useParams } from "react-router";
import { Link } from "react-router-dom";

export default function QuizEditorNav(){
    
    const test = useParams();
    console.log("quiz edit test:",test);
    const cid = test.cid;
    const quizId = test.quizId;
    console.log("cid:",cid);
    console.log("quizId",quizId);
    //console.log("quizz cid:",cid);
    return(
        <div>
            <h1>Quizz editor</h1>
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to={`/Kanbas/Courses/${cid}/Quizzes/${quizId}/Edit/Details`}>Details</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" aria-current="page" to={`/Kanbas/Courses/${cid}/Quizzes/${quizId}/Edit/Questions`}>Questions</Link>
                </li>
            </ul>
        </div>
    );
}