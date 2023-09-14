import React, { useContext } from 'react'
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import './App.css';
import { AuthContext } from 'auth';
import { Children } from 'types/interfaces';
import Home from 'screens/home/dashboard';
import Login from 'screens/partials/auth';
import Statistics from 'screens/home/statistics';
import Credentials from 'screens/home/credentials';
import ChangePhoto from 'screens/home/changephoto';


const App: React.FC = () => {
  const { currentUser } = useContext(AuthContext);

  const ProtectedRoute: React.FC<Children> = ({ children }) => {
    if (currentUser === null) {
      return <Navigate to="/login" />;
    }

    return children
  };
  return (
    <BrowserRouter>
      <Routes>
       <Route  path="/">
          <Route path="login" element={<Login/>} />
          <Route index element = {<Login/>}/>
        </Route>
        <Route path = "admin">
          <Route  path="dashboard" index element={ <ProtectedRoute><Home/></ProtectedRoute>}/>
          <Route  path="statistics" index element={ <ProtectedRoute><Statistics/></ProtectedRoute>}/>
          <Route  path="credentials" index element={ <ProtectedRoute><Credentials/></ProtectedRoute>}/>
          <Route  path="changephoto" index element={ <ProtectedRoute><ChangePhoto/></ProtectedRoute>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
