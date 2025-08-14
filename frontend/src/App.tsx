import { createContext, useEffect, useState } from 'react'

import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NavBar from './Components/NavBar'
import Home from './Components/Pages/Home/Home'
import Login from './Components/Pages/Login'
import SignUp from './Components/Pages/SignUp'
import { NewArticlePage } from './Components/Pages/NewArticlePage'
import { ReadMorePage } from './Components/Pages/ReadMorePage'
import { Download } from '@mui/icons-material'
import TagChart from './Components/Dashboard/TagChart'


export const UserContext = createContext<any>(null);
function App() {


  const [user, setUser] = useState<any>({ isAuth: false, user: null });

  const setUserData = (userData: any, isAuth?: boolean) => {
    let loggedUser;
    if (!isAuth) {
      loggedUser = {
        isAuth: false,
        user: null,
      };
      localStorage.removeItem("token");
    } else {
      loggedUser = {
        isAuth: true,
        user: userData,
      };
      if (userData?.token) {
        localStorage.setItem("token", userData.token);
      }
    }

    setUser(loggedUser);
    localStorage.setItem("log in info saved", JSON.stringify(loggedUser));
  };

  useEffect(() => {
    const savedUser = localStorage.getItem("log in info saved");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <>
      <UserContext.Provider value={user}>
        <BrowserRouter>
          <NavBar setUserData={setUserData} />
          <Routes>
            <Route path="/" element={<Home setUserData={setUserData} />} />
            <Route path='/login' element={<Login setUserData={setUserData} />} />
            <Route path='/signup' element={<SignUp setUserData={setUserData} />} />
            <Route path='/newArticle' element={<NewArticlePage />} />
            <Route path="/article/:slug" element={<ReadMorePage setUserData={setUserData} />} />
            <Route path="/profile/:username" element={<Home setUserData={setUserData} />} />
            <Route path="/dashboard" element={<TagChart/>} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
      
    </>
  )
}

export default App



