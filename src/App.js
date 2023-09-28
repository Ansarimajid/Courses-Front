import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ListInstances from './components/ListInstances';
import CreateInstance from './components/CreateInstance';
import ListCourses from './components/ListCourses';
import CreateCourse from './components/CreateCourse';

function App() {
  // Internal CSS styles for the header buttons
  const headerStyles = {
    nav: {
      background: '#007bff',
      padding: '10px',
    },
    ul: {
      listStyleType: 'none',
      padding: 0,
      margin: 0,
      display: 'flex',
      justifyContent: 'center',
    },
    li: {
      margin: '0 10px',
    },
    link: {
      color: '#fff',
      textDecoration: 'none',
      fontWeight: 'bold',
    },
  };

  return (
    <Router>
      <div className="App">
        <nav style={headerStyles.nav}>
          <ul style={headerStyles.ul}>
            <li style={headerStyles.li}>
              <Link to="/instances" style={headerStyles.link}>
                List Instances
              </Link>
            </li>
            <li style={headerStyles.li}>
              <Link to="/instances/create" style={headerStyles.link}>
                Create Instance
              </Link>
            </li>
            <li style={headerStyles.li}>
              <Link to="/courses" style={headerStyles.link}>
                List Courses
              </Link>
            </li>
            <li style={headerStyles.li}>
              <Link to="/courses/create" style={headerStyles.link}>
                Create Course
              </Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/instances/create" element={<CreateInstance />} />
          <Route path="/instances" element={<ListInstances />} />
          <Route path="/courses/create" element={<CreateCourse />} />
          <Route path="/courses" element={<ListCourses />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
