//import { useLocation } from "react-router";
export default function TOC() {
  //const { pathname } = useLocation();
  return (
    <ul className="nav nav-pills">
      <li className="nav-item">
        <a id="wd-k" href="#/Kanbas" className="nav-link">
          Kanbas
        </a>
      </li>
      <li className="nav-item">
        <a id="wd-k" href="https://github.com/shiramichel/kanbas-react-web-app/tree/quizzes" className="nav-link">
          GitHub for React
        </a>
      </li>
      <li className="nav-item">
        <a id="wd-k" href="https://github.com/shiramichel/kanbas-node-server-app/tree/quizzes" className="nav-link">
          GitHub for Node
        </a>
      </li>
    </ul>
  );
}

