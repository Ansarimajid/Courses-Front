import React, { useState } from 'react';
import axios from 'axios';

function CreateCourse() {
  const [newCourse, setNewCourse] = useState({
    title: '',
    course_code: '',
    description: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewCourse({
      ...newCourse,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Send a POST request to create a new course
      await axios.post('http://localhost:8000/api/courses/', newCourse);

      // Clear the input fields after successful creation
      setNewCourse({
        title: '',
        course_code: '',
        description: '',
      });

      alert('Course created successfully!');
    } catch (error) {
      console.error('Error creating course:', error);
      alert('Failed to create the course. Please try again.');
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
      <h2>Create a New Course</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label style={labelStyles}>Title:</label>
          <input
            type="text"
            name="title"
            value={newCourse.title}
            onChange={handleInputChange}
            style={inputStyles}
            required
          />
        </div>
        <div>
          <label style={labelStyles}>Course Code:</label>
          <input
            type="text"
            name="course_code"
            value={newCourse.course_code}
            onChange={handleInputChange}
            style={inputStyles}
            required
          />
        </div>
        <div>
          <label style={labelStyles}>Description:</label>
          <textarea
            name="description"
            value={newCourse.description}
            onChange={handleInputChange}
            style={inputStyles}
            required
          />
        </div>
        <button type="submit" style={buttonStyles}>
          Create Course
        </button>
      </form>
    </div>
  );
}

export default CreateCourse;
