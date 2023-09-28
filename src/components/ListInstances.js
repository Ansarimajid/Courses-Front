import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ListInstances() {
  const [instances, setInstances] = useState([]);

  useEffect(() => {
    // Fetch the list of course instances
    const hostname = window.location.hostname;
    const url = `http://${hostname}:8000/api/instances/`;
    axios.get(url)
      .then((response) => {
        setInstances(response.data);
      })
      .catch((error) => {
        console.error('Error fetching course instances:', error);
      });
  }, []);

  const handleDeleteInstance = async (instanceId) => {
    try {
      // Send a DELETE request to delete the course instance
      const hostname = window.location.hostname;
      const url = `http://${hostname}:8000/api/instances/${instanceId}`;
      await axios.delete(url);
      
      // Update the list of instances after deletion
      setInstances((prevInstances) => prevInstances.filter((instance) => instance.id !== instanceId));
      
      alert('Course instance deleted successfully!');
    } catch (error) {
      console.error('Error deleting course instance:', error);
      alert('Failed to delete the course instance. Please try again.');
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
      <h2>List of Course Instances</h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Year</th>
            <th style={thStyle}>Semester</th>
            <th style={thStyle}>Course</th>
            <th style={thStyle}>Action</th>
          </tr>
        </thead>
        <tbody>
          {instances.map((instance) => (
            <tr key={instance.id}>
              <td style={tdStyle}>{instance.year}</td>
              <td style={tdStyle}>{instance.semester}</td>
              <td style={tdStyle}>
                <CourseInfo courseId={instance.course} />
              </td>
              <td style={tdStyle}>
                <button
                  style={deleteButtonStyle}
                  onClick={() => handleDeleteInstance(instance.id)}
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

function CourseInfo({ courseId }) {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const hostname = window.location.hostname;
    const url = `http://${hostname}:8000/api/courses/${courseId}`;
    
    axios.get(url)
      .then((response) => {
        setCourse(response.data);
        setLoading(false); // Set loading to false when data is loaded successfully
      })
      .catch((error) => {
        setError(error); // Set the error state if there's an issue with the request
        setLoading(false); // Set loading to false even in case of an error
      });
  }, [courseId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <strong>Course Title:</strong> {course ? course.title : 'N/A'}
      <br />
      <strong>Course Code:</strong> {course ? course.course_code : 'N/A'}
      <br />
      <strong>Description:</strong> {course ? course.description : 'N/A'}
    </div>
  );
}

export default ListInstances;
