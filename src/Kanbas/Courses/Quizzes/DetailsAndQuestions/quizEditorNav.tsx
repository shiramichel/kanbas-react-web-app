import { useParams } from "react-router";

export default function QuizEditorNav(){
    const test = useParams();
    const cid = test.cid;

    console.log("quizz cid:",cid);
    return(
        <div>
            <h1>Quizz editor</h1>
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href={`#/Kanbas/Courses/${cid}/QuizTestN/Details`}>Details</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" aria-current="page" href={`#/Kanbas/Courses/${cid}/QuizTestN/Questions`}>Questions</a>
                </li>
            </ul>
        </div>
    );
}