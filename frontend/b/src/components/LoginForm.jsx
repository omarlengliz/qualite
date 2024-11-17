import React, { useState } from 'react';
import axios from 'axios';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
    const setLoggedInUser = (user)=>{
        localStorage.setItem('isLoggedIn', true)

        localStorage.setItem('user', JSON.stringify(user))
        alert(user.username)
        window.location.href = '/'
    }
  const handleLogin = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/users/login', { username, password })
      .then(response => setLoggedInUser(response.data.user))
      .catch(error => alert('Invalid credentials'));
  };

  return (
    <form onSubmit={handleLogin} className="mt-4">
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
      <button className="bg-blue-500 text-white py-2 px-4 rounded">Login</button>
    </form>
  );
}

export default LoginForm;
