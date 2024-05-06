import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
} from "react";
import { auth } from "@/firebase.config";
import {
  UserCredential,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { redirect } from "react-router-dom";
import Loader from "@/components/shared/Loader/Loader";

type userType = {
  name: string;
  email: string;
  role: string;
  _id: string;
  mobile?: string;
};
interface authContectType {
  user: userType | null;
  Register: (email: string, password: string) => Promise<UserCredential | void>;
  Login: (email: string, password: string) => Promise<UserCredential | void>;
  logOut: () => void;
  Loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

export const AuthProvider = createContext<authContectType>({
  user: null,
  Register: () => Promise.resolve(),
  Login: () => Promise.resolve(),
  logOut: () => null,
  Loading: true,
  setLoading: () => {},
});

export const useAuth = () => useContext(AuthProvider);

const AuthContext = ({ children }: { children: React.ReactNode }) => {
  const [Loading, setLoading] = React.useState(true);
  const [user, setUser] = React.useState<userType | null>(null);

  // Create User With Email and Password
  const Register = async (
    email: string,
    password: string
  ): Promise<UserCredential | void> => {
    try {
      setLoading(true);
      console.log("register");
      return await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error);
    }
  };

  //Sign In With Email and Password
  const Login = async (email: string, password: string) => {
    try {
      setLoading(true);
      console.log("login");
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error);
    }
  };

  //Accessing User
  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (User) => {
      try {
        const token = JSON.parse(localStorage.getItem("access-token")!);
        if (User) {
          const email = User?.email;
          const U = await fetch(`http://localhost:5000/users/${email}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await U.json();
          if (data?.success) {
            setUser(data.data);
          }
        } else {
          setUser(null);
          // await logOut();
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    });
    return unsubscribe;
  }, []);

  //Logout
  const logOut = async () => {
    localStorage.removeItem("access-token");
    await signOut(auth);
    redirect("/login");
  };
  const value = { Register, user, logOut, Login, Loading, setLoading };
  return (
    <AuthProvider.Provider value={value}>
      {Loading ? <Loader /> : children}
    </AuthProvider.Provider>
  );
};

export default AuthContext;
