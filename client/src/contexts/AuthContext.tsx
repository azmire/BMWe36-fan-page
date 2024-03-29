import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useState,
} from "react";

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

  setUser: Dispatch<SetStateAction<boolean>>;
  logout: () => void;
  checkForToken: () => void;
  checkForId: () => void;
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
  checkForId: () => {},
  setUser: () => {},
};

export const AuthContext = createContext<AuthContextType>(defaultValue);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState(false);
  const [userId, setId] = useState("");
  const [token, setToken] = useState("");
  console.log("user :>> ", user);

  const checkForId = () => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      setId(userId);
    }
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
        setUser,
        logout,
        checkForToken,
        checkForId,
        userId,
        token,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
