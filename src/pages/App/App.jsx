import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import AuthPage from '../AuthPage/AuthPage';
import NavBar from '../../components/NavBar/NavBar';
import PatrolDashBoard from '../PatrolDashboard/PatrolDashboard'

export default function App() {
  const [user, setUser] = useState(getUser());

  return (
    <main className="App">
      { user ?
          <>
            <NavBar user={user} setUser={setUser} />
            <Routes>
              {/* Route components in here */}
              <Route path='/' element={<PatrolDashBoard/>}/>
            </Routes>
          </>
          :
          <AuthPage setUser={setUser} />
      }
    </main>
  );
}
