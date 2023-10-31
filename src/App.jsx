import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ButtonAppBar from './components/ButtonAppBar.jsx';
import Calculator from './pages/Calculator.jsx';
import ProtectedRoutes from './components/ProtectedRoutes.jsx';
import LoggedCalculator from './pages/LoggedCalculator.jsx';
import { useEffect, useState } from 'react';

function App() {
  
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/api/user")
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
      <ButtonAppBar user={user} setUser={setUser}/>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={ <Calculator /> }/>
            <Route element={<ProtectedRoutes user={user}/>}>
              <Route path="/laskin" element={<LoggedCalculator />} />
            </Route>
          </Routes>
        </BrowserRouter>
    </>
  );  
}


export default App;