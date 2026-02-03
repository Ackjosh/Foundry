import { SignUp } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { ArrowLeft, Sparkles } from "lucide-react";

const Register = () => {
  return (
    <div className="min-h-screen bg-background selection:bg-primary/20 flex items-center justify-center relative overflow-hidden px-4">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      
      <Link
        to="/"
        className="absolute left-6 top-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </Link>
      
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-6">
            <Sparkles className="h-3 w-3" /> Join the Founders
          </div>
          
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3 leading-[1.1] text-foreground">
            Start Your{" "}
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500 bg-clip-text text-transparent">
              Journey
            </span>
          </h1>
          
          <p className="text-muted-foreground text-sm md:text-base font-medium">
            Build for the long term with AI-powered insights
          </p>
        </div>

        <div className="w-full bg-white rounded-3xl shadow-2xl border border-transparent mx-4">
          <div className="p-6">
            <SignUp 
              appearance={{
                elements: {
                  rootBox: "w-full",
                  formButtonPrimary: 
                    "bg-indigo-600 hover:bg-indigo-700 text-sm normal-case shadow-lg shadow-indigo-500/20",
                  cardBox: "border-none shadow-none p-2 m-0 bg-transparent",
                  card: "bg-transparent shadow-none w-full border-none p-0 m-0",
                  headerTitle: "text-black font-bold text-2xl tracking-tight",
                  headerSubtitle: "text-muted-foreground",
                  socialButtonsBlockButton: "rounded-xl border-2 border-border hover:bg-slate-100 transition-all",
                  footerActionLink: "text-indigo-500 hover:text-indigo-600 font-bold",
                  footer: "hidden",
                  footerAction: "hidden"
                }
              }}
              signInUrl="/login"
              afterSignUpUrl="/chatbot" 
            />
          </div>
          <div className="border-t border-slate-100 bg-slate-50/80 p-4 text-center">
            <p className="text-sm text-slate-600">
              Already have an account?{" "}
              <Link to="/login" className="text-indigo-600 font-semibold hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Register;
