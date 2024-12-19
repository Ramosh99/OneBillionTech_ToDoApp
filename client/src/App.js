import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/get-users');
        const result = await response.json();
        if (result.status === 'Success') {
          setUsers(result.data.users);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="App">
      <h1>Users List</h1>
      <div>
        {users.map(user => (
          <div key={user._id}>
            <h3>Name: {user.name}</h3>
            <p>Email: {user.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;