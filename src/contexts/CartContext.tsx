import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Course } from "@/data/mockData";
import { useAuth } from "@/contexts/AuthContext";

interface CartContextType {
  items: Course[];
  addToCart: (course: Course) => void;
  removeFromCart: (courseId: string) => void;
  clearCart: () => void;
  isInCart: (courseId: string) => boolean;
  total: number;
  itemCount: number;
  purchasedCourseIds: string[];
  purchaseCourses: (courseIds: string[]) => void;
  isPurchased: (courseId: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const getUserKey = (userId: string | undefined) => userId ? `lms_purchased_${userId}` : null;

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [items, setItems] = useState<Course[]>([]);
  const [purchasedCourseIds, setPurchasedCourseIds] = useState<string[]>([]);

  // Load user-specific purchased courses whenever user changes
  useEffect(() => {
    const key = getUserKey(user?.id);
    if (key) {
      const stored = localStorage.getItem(key);
      setPurchasedCourseIds(stored ? JSON.parse(stored) : []);
    } else {
      // No user logged in — reset
      setPurchasedCourseIds([]);
      setItems([]);
    }
  }, [user?.id]);

  const addToCart = (course: Course) => {
    setItems((prev) => (prev.find((c) => c.id === course.id) ? prev : [...prev, course]));
  };

  const removeFromCart = (courseId: string) => {
    setItems((prev) => prev.filter((c) => c.id !== courseId));
  };

  const clearCart = () => setItems([]);

  const isInCart = (courseId: string) => items.some((c) => c.id === courseId);

  const total = items.reduce((sum, c) => sum + c.price, 0);

  const purchaseCourses = (courseIds: string[]) => {
    const key = getUserKey(user?.id);
    const updated = [...new Set([...purchasedCourseIds, ...courseIds])];
    setPurchasedCourseIds(updated);
    if (key) localStorage.setItem(key, JSON.stringify(updated));
  };

  const isPurchased = (courseId: string) => purchasedCourseIds.includes(courseId);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, clearCart, isInCart, total, itemCount: items.length, purchasedCourseIds, purchaseCourses, isPurchased }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
