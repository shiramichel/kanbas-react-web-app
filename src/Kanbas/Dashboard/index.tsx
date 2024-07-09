export default function Dashboard() {
    return (
      <div id="wd-dashboard">
        <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
        <h2 id="wd-dashboard-published">Published Courses (7)</h2> <hr />
        <div id="wd-dashboard-courses">
          <div className="wd-dashboard-course">
            <img src="https://www.popwebdesign.net/popart_blog/wp-content/uploads/2018/03/reactjs.jpg" width={200} />
            <div>
              <a className="wd-dashboard-course-link"
                href="#/Kanbas/Courses/1234/Home">
                CS1234 React JS
              </a>
              <p className="wd-dashboard-course-title">
                Full Stack software developer
              </p>
              <a href="#/Kanbas/Courses/1234/Home"> Go </a>
            </div>

            <img id="wd-course1" src="images/course1.jpg" height="200px" />
            <div>
              <a className="wd-dashboard-course-link"
                href="#/Kanbas/Courses/1234/Home">
                CS2345 Introduction to Modern Web Development
              </a>
              <p className="wd-dashboard-course-title">
                Covers the basics of web development, including HTML, CSS, JavaScript, and an introduction to React.js.
              </p>
              <a href="#/Kanbas/Courses/1234/Home"> Go </a>
            </div>

            <img id="wd-course2" src="images/course2.jpg" height="200px" />
            <div>
              <a className="wd-dashboard-course-link"
                href="#/Kanbas/Courses/1234/Home">
                CS3456 Advanced React.js
              </a>
              <p className="wd-dashboard-course-title">
              Focuses on advanced concepts in React.js, including hooks, context API, and performance optimization.
              </p>
              <a href="#/Kanbas/Courses/1234/Home"> Go </a>
            </div>

            <img id="wd-course3" src="images/course3.jpg" height="200px" />
            <div>
              <a className="wd-dashboard-course-link"
                href="#/Kanbas/Courses/1234/Home">
                CS4567 Full Stack Web Development with React and Node.js
              </a>
              <p className="wd-dashboard-course-title">
              Combines front-end development with React.js and back-end development with Node.js, covering REST APIs, authentication, and database integration.
              </p>
              <a href="#/Kanbas/Courses/1234/Home"> Go </a>
            </div>

            <img id="wd-course4" src="images/course4.jpg" height="200px" />
            <div>
              <a className="wd-dashboard-course-link"
                href="#/Kanbas/Courses/1234/Home">
                CS5678 React Native Development
              </a>
              <p className="wd-dashboard-course-title">
              Explores mobile app development using React Native, a framework based on React.js for building native mobile applications.
              </p>
              <a href="#/Kanbas/Courses/1234/Home"> Go </a>
            </div>

            <img id="wd-course5" src="images/course5.jpg" height="200px" />
            <div>
              <a className="wd-dashboard-course-link"
                href="#/Kanbas/Courses/1234/Home">
                CS6789 State Management in React.js
              </a>
              <p className="wd-dashboard-course-title">
              Delves into state management solutions for React.js, such as Redux, MobX, and the Context API.
              </p>
              <a href="#/Kanbas/Courses/1234/Home"> Go </a>
            </div>

            <img id="wd-course6" src="images/course6.jpg" height="200px" />
            <div>
              <a className="wd-dashboard-course-link"
                href="#/Kanbas/Courses/1234/Home">
                CS7890 Testing and Debugging in React.js
              </a>
              <p className="wd-dashboard-course-title">
              Teaches techniques for testing and debugging React.js applications using tools like Jest, React Testing Library, and Chrome DevTools.
              </p>
              <a href="#/Kanbas/Courses/1234/Home"> Go </a>
            </div>

          </div>
        </div>
      </div>
  );}
  
  