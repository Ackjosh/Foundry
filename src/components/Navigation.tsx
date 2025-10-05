import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Rocket } from "lucide-react";

const Navigation = () => {
  const location = useLocation();

  const problems = [
    { title: "Product-Market Fit", path: "/problems/product-market-fit" },
    { title: "Scaling Too Fast", path: "/problems/scaling-too-fast" },
    { title: "Cash Flow Management", path: "/problems/cash-flow-management" },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2 text-xl font-bold">
              <Rocket className="h-6 w-6 text-primary" />
              <span className="text-gradient">StartupSolve</span>
            </Link>

            <div className="hidden md:flex items-center gap-6">
              <Link
                to="/"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === "/" ? "text-primary" : "text-foreground/80"
                }`}
              >
                Home
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-foreground/80 transition-colors hover:text-primary">
                  Problems <ChevronDown className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56">
                  {problems.map((problem) => (
                    <DropdownMenuItem key={problem.path} asChild>
                      <Link
                        to={problem.path}
                        className="cursor-pointer"
                      >
                        {problem.title}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/login">Login</Link>
            </Button>
            <Button size="sm" asChild>
              <Link to="/register">Register</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
