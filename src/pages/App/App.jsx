import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import AuthPage from '../AuthPage/AuthPage';
import NavBar from '../../components/NavBar/NavBar';
import PatrolDashBoard from '../PatrolDashboard/PatrolDashboard'
import IncidentDashboard from '../IncidentDashboard/IncidentDashboard';

export default function App() {
  const [user, setUser] = useState(getUser());

  return (
    <main className="App font-poppins">
      { user ?
          <>
            <NavBar user={user} setUser={setUser} />
            <Routes>
              {/* Route components in here */}
              <Route path='/' element={<PatrolDashBoard/>}/>
              <Route path='/incidents' element={<IncidentDashboard/>}/>
            </Routes>
          </>
          :
          <AuthPage setUser={setUser} />
      }
    </main>
  );
}
