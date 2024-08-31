import {createContext, PropsWithChildren, useContext } from "react";
import { User } from "../types/user";

type AuthContext = {
    authToken?: string | null;
    currentUser?: User | null;
    handleLogin: () => Promise<void>;
    handleLogout: () => Promise<void>;
}

const AuthContext = createContext<AuthContext | undefined>(undefined)

type AuthProviderProps = PropsWithChildren

export default function AuthProvider({children}: AuthProviderProps){
  const [authToken, setAuthToken] = useState<string | null>();
  const [currentUser, setCurrentUser] = useState<User | null>();
  return <AuthContext.Provider>{children}</AuthContext.Provider>
}

export function useAuth(){
  const context = useContext(AuthContext);

  if(context === undefined){
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}