import React from 'react';

import Signup from './components/Signup';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppContent from './components/AppContent';
import SignIn from './components/SignIn';

const App = () => {
  return (
    <div>
      <Router>
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<AppContent />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<Signup />} />
          

        </Routes>
      </Router>
    </div>
  );
};

export default App;
