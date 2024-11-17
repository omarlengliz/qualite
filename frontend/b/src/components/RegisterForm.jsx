import React, { useState } from 'react';
import axios from 'axios';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/users/register', { username, password })
      .then(() => alert('User registered!'))
      .catch(error => console.error(error));
  };

  return (
    <form onSubmit={handleRegister} className="mt-4">
      <input
        className="border p-2 w-full mb-4"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
      />
      <input
        className="border p-2 w-full mb-4"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button className="bg-green-500 text-white py-2 px-4 rounded">Register</button>
    </form>
  );
}

export default RegisterForm;
