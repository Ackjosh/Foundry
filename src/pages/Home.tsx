import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Target, DollarSign, ArrowRight, MessageSquare, ShieldCheck, Zap, Sparkles } from "lucide-react";

const Home = () => {
  const problems = [
    {
      title: "Product-Market Fit",
      description: "Discover validated strategies to align your product with market demands and find your 'North Star'.",
      icon: Target,
      path: "/problems/product-market-fit",
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      title: "Scaling Challenges",
      description: "Learn sustainable growth practices to avoid common scaling pitfalls and operational bottlenecks.",
      icon: TrendingUp,
      path: "/problems/scaling-challenges",
      color: "text-purple-500",
      bg: "bg-purple-500/10",
    },
    {
      title: "Cash Flow Management",
      description: "Master financial planning to ensure long-term startup sustainability and burn-rate optimization.",
      icon: DollarSign,
      path: "/problems/cash-flow-management",
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
  ];

  return (
    <div className="min-h-screen bg-background selection:bg-primary/20">
      <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        
        <div className="container mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-8 animate-fade-in">
            <Sparkles className="h-3 w-3" /> Powered by real startup case studies
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1] text-foreground">
            Your AI-Powered <br />
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500 bg-clip-text text-transparent">
            Success Partner
            </span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed font-medium">
            Navigate the startup gauntlet with Foundry. Get personalized, data-driven advice 
            distilled from thousands of real-world success stories and failure patterns.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button size="lg" className="h-12 px-8 text-base shadow-lg shadow-primary/20 hover:scale-105 transition-transform" asChild>
              <Link to="/chatbot">
                <MessageSquare className="mr-2 h-5 w-5" /> Consult AI Advisor
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-8 text-base border-2" asChild>
              <Link to="/problems/product-market-fit">View Common Problems</Link>
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-3xl mx-auto py-12 border-y border-border/50">
            <div>
              <p className="text-3xl font-bold text-foreground">10k+</p>
              <p className="text-sm text-muted-foreground uppercase tracking-widest font-semibold">Cases Indexed</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-foreground">24/7</p>
              <p className="text-sm text-muted-foreground uppercase tracking-widest font-semibold">AI advisor</p>
            </div>
            <div className="hidden md:block">
              <p className="text-3xl font-bold text-foreground"></p>
              <p className="text-sm text-muted-foreground uppercase tracking-widest font-semibold">Insights from real startup journeys</p>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border/50">
              <div>
                <div className="text-2xl font-bold text-primary">10,000+</div>
                <div className="text-sm text-muted-foreground">Startups Analyzed</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">94%</div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">24/7</div>
                <div className="text-sm text-muted-foreground">AI Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">The Foundry Advantage</h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg italic font-serif">
            "Ideas are easy, execution is everything. We give you the roadmap."
          </p>
          <div className="grid md:grid-cols-2 gap-4 mt-6">
            <div className="p-4 rounded-lg bg-card border border-border/50">
              <h3 className="font-semibold mb-2 text-foreground">Data-Driven Insights</h3>
              <p className="text-sm text-muted-foreground">
                Our AI processes real-world case studies and success patterns to provide you with 
                evidence-based strategies that have proven results in similar startup scenarios.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-card border border-border/50">
              <h3 className="font-semibold mb-2 text-foreground">Personalized Guidance</h3>
              <p className="text-sm text-muted-foreground">
                Get tailored advice specific to your industry, stage, and challenges. No generic
                solutions - just actionable steps designed for your unique situation.
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-primary/50 transition-all hover:bg-muted/50">
            <Zap className="h-10 w-10 text-primary mb-6 transition-transform group-hover:scale-110" />
            <h3 className="text-xl font-bold mb-3">Pattern Recognition</h3>
            <p className="text-muted-foreground leading-relaxed">
              Our AI analyzes thousands of real-world case studies to identify the subtle 
              signals that lead to breakthrough success or terminal failure.
            </p>
          </div>
          <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-primary/50 transition-all hover:bg-muted/50">
            <ShieldCheck className="h-10 w-10 text-primary mb-6 transition-transform group-hover:scale-110" />
            <h3 className="text-xl font-bold mb-3">Validated Frameworks</h3>
            <p className="text-muted-foreground leading-relaxed">
              Every insight is grounded in verified venture literature and strategic 
              frameworks used by the world's most successful accelerators.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-muted/20 border-y border-border/50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4 tracking-tight">Strategic Intelligence Pillars</h2>
            <p className="text-muted-foreground text-lg">
              We focus on the high-friction zones where founder decisions matter most.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
            {problems.map((problem) => {
              const Icon = problem.icon;
              return (
                <Link key={problem.path} to={problem.path} className="group">
                  <Card className="h-full border-2 border-transparent group-hover:border-primary/30 transition-all duration-300 shadow-none bg-background hover:shadow-xl hover:-translate-y-2">
                    <CardHeader>
                      <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl ${problem.bg}`}>
                        <Icon className={`h-6 w-6 ${problem.color}`} />
                      </div>
                      <CardTitle className="text-2xl group-hover:text-primary transition-colors">{problem.title}</CardTitle>
                      <CardDescription className="text-base leading-relaxed text-muted-foreground">{problem.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2 text-sm font-bold text-primary">
                        Master this Pillar <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-32 container mx-auto px-6">
        <div className="relative p-16 md:p-24 rounded-[4rem] bg-indigo-600 overflow-hidden text-center text-white shadow-2xl">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-400/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
          
          <h2 className="text-4xl md:text-6xl font-black mb-8 relative z-10 tracking-tighter">
            Build for the <br /> <span className="italic text-emerald-300 underline decoration-emerald-300/30">Long Term</span>.
          </h2>
          <p className="text-indigo-100 text-lg md:text-xl mb-12 max-w-2xl mx-auto relative z-10 font-medium">
            Stop guessing and start navigating with data. Your AI advisor is ready for your first consult.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
            <Button size="lg" className="h-14 px-12 bg-white text-indigo-600 hover:bg-slate-300 font-black rounded-2xl">
              Start Free Journey
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-12 border-white/30 text-white hover:bg-emerald-300 font-black rounded-2xl">
              Talk to Advisor
            </Button>
          </div>
        </div>
      </section>

      <footer className="py-16 border-t border-border/50 bg-background">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
            Foundry
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;