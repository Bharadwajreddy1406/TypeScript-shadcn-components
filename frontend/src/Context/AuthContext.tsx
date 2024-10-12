import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  checkAuthStatus,
  loginUser,
  logoutUser,
} from "../Communicators/apiCommunications";

type User = {
  role: string;
  rollnumber: string;
};

type UserAuth = {
  isLoggedIn: boolean;
  user: User | null;
  login: (rollnumber: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<UserAuth | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Fetch if the user's cookies are valid then skip login
    async function checkStatus() {
      try {
        const data = await checkAuthStatus();
        if (data) {
          setUser({ rollnumber: data.rollnumber, role: data.role });
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Error checking auth status:", error);
        setIsLoggedIn(false);
      }
    }
    checkStatus();
  }, []);

  const login = async (rollnumber: string, password: string) => {
    const data = await loginUser(rollnumber, password);
    if (data) {
      setUser({ rollnumber: data.rollnumber, role: data.role });
      setIsLoggedIn(true);
    }
  };

  const logout = async () => {
    await logoutUser();
    setUser(null);
    setIsLoggedIn(false);
    window.location.reload();
  };

  const value = {
    user,
    isLoggedIn,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};