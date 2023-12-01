import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import ButtonAppBar from './components/ButtonAppBar.jsx';
import Calculator from './pages/Calculator.jsx';
import ProtectedRoutes from './components/ProtectedRoutes.jsx';
import LoggedCalculator from './pages/LoggedCalculator.jsx';
import { useEffect, useState } from 'react';
import Calendar from './pages/Calendar.jsx';
import Authentication from './pages/Authentication.jsx';
import HourList from './pages/WorkinghoursList.jsx';




function App() {
  
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/api/login", {
        credentials: 'include',
        headers: {
            'X-Requested-With': 'XMLHttpRequest'
        },
    })
    .then(response => response.json())
    .then(data =>  {
      console.log(data)
      if(data){
        setUser(data);
      }
    })
    .catch((err) => console.log(err))
  },[]);


  return (
      <>
        <BrowserRouter>
          <ButtonAppBar user={user} setUser={setUser}/>
          <Routes>
            {user ? (
              <Route path="/" element={<LoggedCalculator />} />
              ) : (
              <Route path="/" element={<Calculator />} />
            )}
            {user ? (
              <Route path="/login" element={<Navigate to="/" />} />
            ) : (
              <Route path="/login" element={<Authentication setUser={setUser} />} />
            )}
            <Route element={<ProtectedRoutes user={user} />}>
              <Route path="/laskin" element={<LoggedCalculator />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/hours" element={<HourList />} />
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      </>
  );  
}


export default App;