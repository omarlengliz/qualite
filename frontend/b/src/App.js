import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './Screens/LoginPage';
import Home from './Screens/Home';
import AddArticle from './Screens/AddArticle';


function App() {

  return (
    <Router>
      <div className="container mx-auto p-4">
        
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddArticle/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;