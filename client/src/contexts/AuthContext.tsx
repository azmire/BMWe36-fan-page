import { PropsWithChildren, createContext, useState } from "react";

// type User = {
//   _id: string;
//   email: string;
//   username: string;
//   password: string;
// };

declare type AuthContextType = {
  user: boolean;
  token: string;
  userId: string;

  //login: () => void;
  logout: () => void;
  checkForToken: () => void;
  setUserId: (userId: string) => void;
};

const defaultValue: AuthContextType = {
  user: false,
  token: "",
  userId: "",
  //login: () => {
  //throw new Error("There is no user");
  // },
  logout: () => {
    throw new Error("There is no user");
  },
  checkForToken: () => {},
  setUserId: () => {},
};

export const AuthContext = createContext<AuthContextType>(defaultValue);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState(false);
  const [userId, setId] = useState("");
  const [token, setToken] = useState("");
  console.log("token:", token);
  console.log("user :>> ", user);

  const setUserId = (userId: string) => {
    setId(userId);
    console.log("userId :>> ", userId);
  };

  const checkForToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser(true);
      console.log("token found, setting token");
      setToken(token);
    }
    return token;
  };

  const logout = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      console.log("token found, removing token from ls");
      localStorage.removeItem("token");
      setUser(false);
    } else {
      console.log("can not logout user if not logged in");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        logout,
        checkForToken,
        setUserId,
        userId,
        token,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
