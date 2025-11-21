import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import Chatbot from "./Chatbot";

const Navigation = () => {
  const [chatbotOpen, setChatbotOpen] = useState(false);

  return (
    <>
      <div className="flex flex-1 items-center justify-end gap-3">
        <Button variant="secondary" size="sm" onClick={() => setChatbotOpen(true)}>
          <MessageSquare className="mr-2 h-4 w-4" />
          AI Advisor
        </Button>
        <Button variant="ghost" size="sm" asChild>
          <Link to="/login">Login</Link>
        </Button>
        <Button size="sm" asChild>
          <Link to="/register">Register</Link>
        </Button>
      </div>
      <Chatbot open={chatbotOpen} onOpenChange={setChatbotOpen} />
    </>
  );
};

export default Navigation;
