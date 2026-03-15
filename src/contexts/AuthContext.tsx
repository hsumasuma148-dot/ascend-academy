import { createContext, useContext, useState, ReactNode } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role: "student" | "instructor";
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string, role: "student" | "instructor") => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Generate a deterministic ID from email so the same email always gets the same userId
const emailToId = (email: string) => {
  let hash = 0;
  for (let i = 0; i < email.length; i++) {
    hash = ((hash << 5) - hash + email.charCodeAt(i)) | 0;
  }
  return "user-" + Math.abs(hash).toString(36);
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("lms_user");
    return stored ? JSON.parse(stored) : null;
  });

  const login = async (email: string, password: string): Promise<boolean> => {
    if (email && password.length >= 6) {
      const id = emailToId(email);
      // Check if user previously signed up
      const storedProfile = localStorage.getItem(`lms_profile_${id}`);
      const mockUser: User = storedProfile
        ? JSON.parse(storedProfile)
        : { id, name: email.split("@")[0], email, role: "student" as const };
      setUser(mockUser);
      localStorage.setItem("lms_user", JSON.stringify(mockUser));
      return true;
    }
    return false;
  };

  const signup = async (name: string, email: string, password: string, role: "student" | "instructor"): Promise<boolean> => {
    if (name && email && password.length >= 6) {
      const id = emailToId(email);
      const newUser: User = { id, name, email, role };
      setUser(newUser);
      localStorage.setItem("lms_user", JSON.stringify(newUser));
      localStorage.setItem(`lms_profile_${id}`, JSON.stringify(newUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("lms_user");
    // Cart context will react to user becoming null and clear its state
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
