import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ListCourses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Function to fetch the list of courses from the API
    const fetchCourses = async () => {
      try {
        const hostname = window.location.hostname;
        const url = `http://${hostname}:8000/api/courses`;
        const response = await axios.get(url);
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  const handleDeleteCourse = async (courseId) => {
    try {
      // Send a DELETE request to delete the course
      const hostname = window.location.hostname;
      const url = `http://${hostname}:8000/api/courses/${courseId}`;
      await axios.delete(url);
      
      // Update the list of courses after deletion
      setCourses((prevCourses) => prevCourses.filter((course) => course.id !== courseId));
      
      alert('Course deleted successfully!');
    } catch (error) {
      console.error('Error deleting course:', error);
      alert('Failed to delete the course. Please try again.');
    }
  };

  // Internal CSS for table styles
  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  };

  const thStyle = {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '10px',
    textAlign: 'left',
  };

  const tdStyle = {
    border: '1px solid #ddd',
    padding: '10px',
  };

  const deleteButtonStyle = {
    backgroundColor: 'red',
    color: '#fff',
    padding: '5px 10px',
    border: 'none',
    cursor: 'pointer',
  };

  return (
    <div>
      <h2>List of Courses</h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Title</th>
            <th style={thStyle}>Course Code</th>
            <th style={thStyle}>Description</th>
            <th style={thStyle}>Action</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id}>
              <td style={tdStyle}>{course.title}</td>
              <td style={tdStyle}>{course.course_code}</td>
              <td style={tdStyle}>{course.description}</td>
              <td style={tdStyle}>
                <button
                  style={deleteButtonStyle}
                  onClick={() => handleDeleteCourse(course.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListCourses;
