import React, { useContext } from 'react'
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import './App.css';
import { AuthContext } from 'auth';
import { Children } from 'types/interfaces';
import Home from 'screens/home/home';
import Login from 'screens/partials/auth';


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
         <Route  path="home" index element={ <ProtectedRoute><Home/></ProtectedRoute>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
