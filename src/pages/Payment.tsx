import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { ShoppingCart, CreditCard, CheckCircle2, Trash2, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";

const Payment = () => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  const { items, removeFromCart, clearCart, total, purchaseCourses } = useCart();
  const [step, setStep] = useState<"cart" | "checkout" | "success">(items.length > 0 ? "cart" : "cart");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    setStep("checkout");
  };

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate payment
    await new Promise((r) => setTimeout(r, 2000));
    purchaseCourses(items.map((c) => c.id));
    clearCart();
    setLoading(false);
    setStep("success");
    toast.success("Payment successful! Courses unlocked.");
  };

  if (step === "success") {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center max-w-md">
          <div className="bg-lms-success/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="h-10 w-10 text-lms-success" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Payment Successful!</h1>
          <p className="text-muted-foreground mb-8">Your courses have been unlocked. Start learning now!</p>
          <div className="flex gap-3 justify-center">
            <Link to="/dashboard"><Button className="gradient-primary text-primary-foreground">Go to My Learning</Button></Link>
            <Link to="/courses"><Button variant="outline">Browse More</Button></Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-10 max-w-4xl">
        <h1 className="text-3xl font-extrabold text-foreground mb-8 flex items-center gap-2">
          <ShoppingCart className="h-7 w-7" /> {step === "cart" ? "Shopping Cart" : "Checkout"}
        </h1>

        {items.length === 0 && step === "cart" ? (
          <div className="text-center py-16">
            <ShoppingCart className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">Your cart is empty</p>
            <Link to="/courses"><Button className="gradient-primary text-primary-foreground">Browse Courses</Button></Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {step === "cart" ? (
                items.map((course) => (
                    <div key={course.id} className="bg-card border border-border rounded-xl p-4 flex items-center gap-4">
                     <img
                       src={course.thumbnail || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=80&h=80&fit=crop"}
                       alt={course.title}
                       className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                       onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=80&h=80&fit=crop"; }}
                     />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground text-sm">{course.title}</h3>
                      <p className="text-xs text-muted-foreground">{course.instructor} · {course.level}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="font-bold text-foreground">${course.price}</p>
                      <p className="text-xs text-muted-foreground line-through">${course.originalPrice}</p>
                    </div>
                    <button onClick={() => removeFromCart(course.id)} className="text-muted-foreground hover:text-destructive p-1">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))
              ) : (
                <form id="payment-form" onSubmit={handlePay} className="bg-card border border-border rounded-xl p-6 space-y-4">
                  <h2 className="font-bold text-foreground flex items-center gap-2"><CreditCard className="h-5 w-5" /> Payment Details</h2>
                  <p className="text-xs text-muted-foreground">Demo mode — no real payment is processed</p>
                  <div>
                    <Label>Card Number</Label>
                    <Input placeholder="4242 4242 4242 4242" defaultValue="4242 4242 4242 4242" className="mt-1" required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div><Label>Expiry</Label><Input placeholder="12/28" defaultValue="12/28" className="mt-1" required /></div>
                    <div><Label>CVC</Label><Input placeholder="123" defaultValue="123" className="mt-1" required /></div>
                  </div>
                  <div><Label>Name on Card</Label><Input placeholder="John Doe" className="mt-1" required /></div>
                </form>
              )}
            </div>
            <div>
              <div className="sticky top-20 bg-card border border-border rounded-xl p-6 space-y-4">
                <h2 className="font-bold text-foreground">Order Summary</h2>
                <div className="space-y-2 text-sm">
                  {items.map((c) => (
                    <div key={c.id} className="flex justify-between">
                      <span className="text-muted-foreground truncate mr-2">{c.title}</span>
                      <span className="font-medium text-foreground">${c.price}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-border pt-3 flex justify-between font-bold text-foreground">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                {step === "cart" ? (
                  <Button onClick={handleCheckout} className="w-full gradient-primary text-primary-foreground font-semibold">
                    Checkout
                  </Button>
                ) : (
                  <Button type="submit" form="payment-form" className="w-full gradient-primary text-primary-foreground font-semibold" disabled={loading}>
                    {loading ? "Processing..." : `Pay $${total.toFixed(2)}`}
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Payment;
