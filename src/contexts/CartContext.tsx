import { createContext, useContext, useState, ReactNode } from "react";
import { Course } from "@/data/mockData";

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

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<Course[]>([]);
  const [purchasedCourseIds, setPurchasedCourseIds] = useState<string[]>(() => {
    const stored = localStorage.getItem("lms_purchased");
    return stored ? JSON.parse(stored) : ["1", "3", "5"]; // pre-enrolled courses
  });

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
    const updated = [...new Set([...purchasedCourseIds, ...courseIds])];
    setPurchasedCourseIds(updated);
    localStorage.setItem("lms_purchased", JSON.stringify(updated));
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
