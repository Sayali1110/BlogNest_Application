import { createContext, useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NavBar from './Components/NavBar'
import Home from './Components/Pages/Home/Home'
import Login from './Components/Pages/Login'
import SignUp from './Components/Pages/SignUp'

export const  UserContext = createContext("");
function App() {
  const[user, setUser] = useState<any>(null);

  const setUserData = (userData:any) =>{
    const loggedUser={
      isAuth:true,
      user:userData
    }
console.log(loggedUser,"loggedUser")
setUser(loggedUser)
  }

  return (
    <>
      {/* <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}

        <UserContext.Provider value={user}>
           <BrowserRouter>
          <NavBar/>
          <Routes>
            <Route path="/" element={<Home/>} />
             <Route path='/login' element={<Login />}/>
             <Route path='/signup' element={<SignUp setUserData={setUserData}/>}/>
          </Routes>
        </BrowserRouter>
       </UserContext.Provider>
    </>
  )
}

export default App



