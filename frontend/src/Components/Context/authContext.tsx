import { createContext, useState, type ReactNode} from 'react';

export const UserContext = createContext<any>(null);

export const AuthContext = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);

  const setUserData = (userData: any) => {
    const loggedUser = {
      isAuth: true,
      user: userData,
    };
    console.log(loggedUser, "loggedUser");
    setUser(loggedUser);
    localStorage.setItem("log in info saved", JSON.stringify(loggedUser));
  };

  return (
    <UserContext.Provider value={{ user, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};
