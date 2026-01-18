import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageSquare, LogOut } from "lucide-react";
import { getAuth, signOut } from "firebase/auth";
import { app } from "../firebase";

const auth = getAuth(app);

const Navigation = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <div className="flex flex-1 items-center justify-end gap-3">
      <Button variant="secondary" size="sm" asChild>
        <Link to="/chatbot">
          <MessageSquare className="mr-2 h-4 w-4" />
          AI Advisor
        </Link>
      </Button>
      {!loading && !user ? (
        <>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/login">Login</Link>
          </Button>
          <Button size="sm" asChild>
            <Link to="/register">Register</Link>
          </Button>
        </>
      ) : !loading && user ? (
        <Button size="sm" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" /> Logout
        </Button>
      ) : null}
    </div>
  );
};

export default Navigation;
