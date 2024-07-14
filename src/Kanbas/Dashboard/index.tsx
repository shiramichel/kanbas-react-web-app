export default function Dashboard() {
    return (
      <div id="wd-dashboard">
        <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
        <h2 id="wd-dashboard-published">Published Courses (7)</h2> <hr />
        <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          <div className="wd-dashboard-course col" style={{ width: "300px" }}>
            <div className="card">
              <a className="wd-dashboard-course-link text-decoration-none text-dark"
                href="#/Kanbas/Courses/1234/Home">
                  <img src="https://www.popwebdesign.net/popart_blog/wp-content/uploads/2018/03/reactjs.jpg" width="100%"/>
                  <div className="card-body">
              <h5 className="wd-dashboard-course-title card-title">
                CS1234 React JS
              </h5>
              <p className="card-text">
                Full Stack software developer
              </p>
              <button className="btn btn-primary"> Go </button>
              </div>
              </a>
            </div>
          </div>

            <div className="wd-dashboard-course col" style={{ width: "300px" }}>
            <div className="card">
              <a className="wd-dashboard-course-link text-decoration-none text-dark"
                href="#/Kanbas/Courses/1234/Home">
                  <img id="wd-course1" src="images/course1.jpg" width="100%"/>
                  <div className="card-body">
              <h5 className="wd-dashboard-course-title card-title">
              CS2345 Introduction to Modern Web Development
              </h5>
              <p className="card-text">
              Covers the basics of web development, including HTML, CSS, JavaScript, and an introduction to React.js.
              </p>
              <button className="btn btn-primary"> Go </button>
              </div>
              </a>
            </div>
            </div>

            <div className="wd-dashboard-course col" style={{ width: "300px" }}>
            <div className="card">
              <a className="wd-dashboard-course-link text-decoration-none text-dark"
                href="#/Kanbas/Courses/1234/Home">
                  <img id="wd-course2" src="images/course2.jpg" width="100%"/>
                  <div className="card-body">
              <h5 className="wd-dashboard-course-title card-title">
              CS3456 Advanced React.js
              </h5>
              <p className="card-text">
              Focuses on advanced concepts in React.js, including hooks, context API, and performance optimization.              
              </p>
              <button className="btn btn-primary"> Go </button>
              </div>
              </a>
            </div>
            </div>

            <div className="wd-dashboard-course col" style={{ width: "300px" }}>
            <div className="card">
              <a className="wd-dashboard-course-link text-decoration-none text-dark"
                href="#/Kanbas/Courses/1234/Home">
                  <img id="wd-course3" src="images/course3.jpg" width="100%"/>
                  <div className="card-body">
              <h5 className="wd-dashboard-course-title card-title">
              CS4567 Full Stack Web Development with React and Node.js
              </h5>
              <p className="card-text">
              Combines front-end development with React.js and back-end development with Node.js, covering REST APIs, authentication, and database integration.
              </p>
              <button className="btn btn-primary"> Go </button>
              </div>
              </a>
            </div>
            </div>

            <div className="wd-dashboard-course col" style={{ width: "300px" }}>
            <div className="card">
              <a className="wd-dashboard-course-link text-decoration-none text-dark"
                href="#/Kanbas/Courses/1234/Home">
                  <img id="wd-course4" src="images/course4.jpg" width="100%"/>
                  <div className="card-body">
              <h5 className="wd-dashboard-course-title card-title">
              CS5678 React Native Development
              </h5>
              <p className="card-text">
              Explores mobile app development using React Native, a framework based on React.js for building native mobile applications.
              </p>
              <button className="btn btn-primary"> Go </button>
              </div>
              </a>
            </div>
            </div>

            <div className="wd-dashboard-course col" style={{ width: "300px" }}>
            <div className="card">
              <a className="wd-dashboard-course-link text-decoration-none text-dark"
                href="#/Kanbas/Courses/1234/Home">
                  <img id="wd-course5" src="images/course5.jpg" width="100%"/>
                  <div className="card-body">
              <h5 className="wd-dashboard-course-title card-title">
              CS6789 State Management in React.js
              </h5>
              <p className="card-text">
              Delves into state management solutions for React.js, such as Redux, MobX, and the Context API.
              </p>
              <button className="btn btn-primary"> Go </button>
              </div>
              </a>
            </div>
            </div>

            <div className="wd-dashboard-course col" style={{ width: "300px" }}>
            <div className="card">
              <a className="wd-dashboard-course-link text-decoration-none text-dark"
                href="#/Kanbas/Courses/1234/Home">
                  <img id="wd-course6" src="images/course6.jpg" width="100%"/>
                  <div className="card-body">
              <h5 className="wd-dashboard-course-title card-title">
              CS7890 Testing and Debugging in React.js
              </h5>
              <p className="card-text">
              Teaches techniques for testing and debugging React.js applications using tools like Jest, React Testing Library, and Chrome DevTools.
              </p>
              <button className="btn btn-primary"> Go </button>
              </div>
              </a>
            </div>
            </div>
            </div>
  </div></div>


  );}
  
  