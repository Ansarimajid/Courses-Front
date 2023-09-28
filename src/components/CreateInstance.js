import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CreateInstance() {
  const [courses, setCourses] = useState([]);
  const [newInstance, setNewInstance] = useState({
    year: '',
    semester: '',
    course: '', // Selected course ID
  });

  useEffect(() => {
    // Fetch the list of courses to populate the dropdown
    axios.get('http://localhost:8000/api/courses/')
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => {
        console.error('Error fetching courses:', error);
      });
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewInstance({
      ...newInstance,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Send a POST request to create a new instance
      await axios.post('http://localhost:8000/api/instances/', newInstance);

      // Clear the input fields after successful creation
      setNewInstance({
        year: '',
        semester: '',
        course: '',
      });

      alert('Course instance created successfully!');
    } catch (error) {
      console.error('Error creating course instance:', error);
      alert('Failed to create the course instance. Please try again.');
    }
  };

  // Internal CSS styles for the form elements
  const formStyles = {
    margin: '20px',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: '#f9f9f9',
  };

  const labelStyles = {
    fontWeight: 'bold',
  };

  const inputStyles = {
    width: '100%',
    padding: '8px',
    marginTop: '5px',
    marginBottom: '10px',
    border: '1px solid #ccc',
    borderRadius: '3px',
  };

  const selectStyles = {
    width: '100%',
    padding: '8px',
    marginTop: '5px',
    marginBottom: '10px',
    border: '1px solid #ccc',
    borderRadius: '3px',
  };

  const buttonStyles = {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '3px',
    cursor: 'pointer',
  };

  return (
    <div style={formStyles}>
      <h2>Create a New Course Instance</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label style={labelStyles}>Year:</label>
          <input
            type="text"
            name="year"
            value={newInstance.year}
            onChange={handleInputChange}
            style={inputStyles}
            required
          />
        </div>
        <div>
          <label style={labelStyles}>Semester:</label>
          <input
            type="text"
            name="semester"
            value={newInstance.semester}
            onChange={handleInputChange}
            style={inputStyles}
            required
          />
        </div>
        <div>
          <label style={labelStyles}>Course:</label>
          <select
            name="course"
            value={newInstance.course}
            onChange={handleInputChange}
            style={selectStyles}
            required
          >
            <option value="">Select a Course</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.title} ({course.course_code})
              </option>
            ))}
          </select>
        </div>
        <button type="submit" style={buttonStyles}>
          Create Course Instance
        </button>
      </form>
    </div>
  );
}

export default CreateInstance;
