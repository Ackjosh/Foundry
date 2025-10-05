import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Target, DollarSign, ArrowRight } from "lucide-react";

const Home = () => {
  const problems = [
    {
      title: "Product-Market Fit",
      description: "Discover validated strategies to align your product with market demands",
      icon: Target,
      path: "/problems/product-market-fit",
    },
    {
      title: "Scaling Too Fast",
      description: "Learn sustainable growth practices to avoid common scaling pitfalls",
      icon: TrendingUp,
      path: "/problems/scaling-too-fast",
    },
    {
      title: "Cash Flow Management",
      description: "Master financial planning to ensure long-term startup sustainability",
      icon: DollarSign,
      path: "/problems/cash-flow-management",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border/50">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--gradient-hero),transparent_50%)]" />
        <div className="container relative mx-auto px-4 py-24 md:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
              Your AI-Powered Startup{" "}
              <span className="text-gradient">Success Partner</span>
            </h1>
            <p className="mb-8 text-lg text-muted-foreground md:text-xl">
              Get personalized advice from our AI chatbot trained on real startup success stories. 
              Navigate challenges with data-driven insights and proven strategies from founders who've been there.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" variant="default">
                Chat with AI Advisor <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" asChild>
                <Link to="/problems/product-market-fit">
                  Explore Solutions
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/register">Get Started Free</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Empowering Founders with Knowledge
          </h2>
          <p className="text-lg text-muted-foreground">
            We analyze thousands of startup failures and successes to bring you actionable insights. 
            Our platform combines industry research, real-world data, and expert analysis to help you 
            avoid common pitfalls and accelerate your path to success.
          </p>
        </div>
      </section>

      {/* Problems Grid */}
      <section className="border-t border-border/50 bg-muted/30">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Top Startup Challenges
            </h2>
            <p className="text-muted-foreground">
              Explore our in-depth analysis of the most common problems and their solutions
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {problems.map((problem) => {
              const Icon = problem.icon;
              return (
                <Link key={problem.path} to={problem.path}>
                  <Card className="h-full transition-all hover:border-primary/50 hover:shadow-lg">
                    <CardHeader>
                      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-xl">{problem.title}</CardTitle>
                      <CardDescription>{problem.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2 text-sm font-medium text-primary">
                        Learn More <ArrowRight className="h-4 w-4" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border/50">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Ready to Overcome Your Challenges?
            </h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Join thousands of founders who are making data-driven decisions to grow their startups
            </p>
            <Button size="lg" asChild>
              <Link to="/register">Start Your Journey</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
