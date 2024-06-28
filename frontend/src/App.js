import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [view, setView] = useState('home');
  const [student, setStudent] = useState({
    name: '',
    age: '',
    dob: '',
    branch: '',
    email: '',
    phone: ''
  });
  const [searchName, setSearchName] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [message, setMessage] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const { name, age, dob, branch, email, phone } = student;
    if (name && age && dob && branch && email && phone) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [student]);

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleAddStudent = async () => {
    if (isFormValid) {
      try {
        await axios.post('http://localhost:5000/api/students', student);
        setMessage('Submitted successfully');
      } catch (error) {
        setMessage('Error submitting data');
      }
    }
  };

  const handleSearchStudent = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/students/${searchName}`);
      setSearchResult(response.data);
    } catch (error) {
      setSearchResult('Details not found');
    }
  };

  return (
    <div className="App">
      <h1>Student Management</h1>
      <div className="button-container">
        <button onClick={() => setView('add')}>Add a Student</button>
        <button onClick={() => setView('search')}>Search Student</button>
      </div>

      {view === 'add' && (
        <div className="form-container">
          <h2>Add Student</h2>
          <input type="text" name="name" placeholder="Name" onChange={handleChange} />
          <input type="number" name="age" placeholder="Age" onChange={handleChange} />
          <input type="date" name="dob" placeholder="DOB" onChange={handleChange} />
          <input type="text" name="branch" placeholder="Branch" onChange={handleChange} />
          <input type="email" name="email" placeholder="Email" onChange={handleChange} />
          <input type="text" name="phone" placeholder="Phone" onChange={handleChange} />
          <button onClick={handleAddStudent} disabled={!isFormValid}>Submit</button>
          {message && <p className="message">{message}</p>}
        </div>
      )}

      {view === 'search' && (
        <div className="form-container">
          <h2>Search Student</h2>
          <input type="text" value={searchName} onChange={(e) => setSearchName(e.target.value)} placeholder="Name" />
          <button onClick={handleSearchStudent}>Search</button>
          {searchResult && (
            typeof searchResult === 'string' ? <p className="message">{searchResult}</p> : (
              <div className="search-result">
                <p><strong>Name:</strong> <span>{searchResult.name}</span></p>
                <p><strong>Age:</strong> <span>{searchResult.age}</span></p>
                <p><strong>DOB:</strong> <span>{searchResult.dob}</span></p>
                <p><strong>Branch:</strong> <span>{searchResult.branch}</span></p>
                <p><strong>Email:</strong> <span>{searchResult.email}</span></p>
                <p><strong>Phone:</strong> <span>{searchResult.phone}</span></p>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}

export default App;

