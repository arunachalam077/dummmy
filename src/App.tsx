import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Login from './Services/authService';
import Dashboard from './pages/Dashboard';
import Contacts from './pages/Contacts';
import Automation from './pages/Automation';
 import LiveChat from './pages/Livechat';
 import Settings from './pages/Settings';
import Sidebar from './components/Sidebar';
import Profile from './pages/Profile';
import Help from './pages/Help'
import PrivacyPolicy from './pages/Policy';
import Frontpage from './pages/Embed'
function AppContent() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/' || location.pathname === '/login';

  return (
    <div className="flex">
      {!isLoginPage && <Sidebar />}
      <main className={`flex-1 ${isLoginPage ? 'w-full' : ''}`}>
        
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Front" element={<Frontpage/>}/>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/contacts" element={<Contacts />} />
           <Route path="/live-chat" element={<LiveChat />} /> 
<Route path="/settings/policy" element={<PrivacyPolicy/>}/>
          <Route path="/automation" element={<Automation />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/help" element ={<Help/>}/>
         <Route path="/settings" element={<Settings />} /> 
        </Routes>
     
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;