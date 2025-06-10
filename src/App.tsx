import { createContext, useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NavBar from './Components/NavBar'
import Home from './Components/Pages/Home/Home'
import Login from './Components/Pages/Login'
import SignUp from './Components/Pages/SignUp'

export const UserContext = createContext<any>(null);
function App() {

  const [user, setUser] = useState<any>(null);

  const setUserData = (userData: any) => {
    const loggedUser = {
      isAuth: true,
      user: userData
    }
    console.log(loggedUser, "loggedUser")
    setUser(loggedUser)

     localStorage.setItem("log in info saved", JSON.stringify(loggedUser))
  }

  return (
    <>
      <UserContext.Provider value={user}>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/login' element={<Login setUserData={setUserData} />} />
            <Route path='/signup' element={<SignUp setUserData={setUserData} />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  )
}

export default App



