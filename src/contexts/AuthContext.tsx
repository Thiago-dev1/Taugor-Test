import { User } from "firebase/auth";
import { useContext, createContext, ReactNode } from "react";


interface  AuthContextData {
  user: User | null
}



const AuthContext = createContext({} as AuthContextData) 

interface AuthProviderProps {
    children: ReactNode,
    user: User | null
}


export function useAuthValue() {
  return useContext(AuthContext);
}

export function AuthProvider({ children, user }: AuthProviderProps) {
  return <AuthContext.Provider value={{ user}}>{children}</AuthContext.Provider>;
}

