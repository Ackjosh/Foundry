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
        <div className="container relative mx-auto px-4 py-16 md:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              Your AI-Powered Startup{" "}
              <span className="text-gradient">Success Partner</span>
            </h1>
            <p className="mb-6 text-base text-muted-foreground md:text-lg">
              Get personalized advice from our AI chatbot trained on real startup success stories. 
              Navigate challenges with data-driven insights and proven strategies from founders who've been there.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button size="lg" asChild>
                <Link to="/problems/product-market-fit">
                  Explore Solutions <ArrowRight className="ml-2 h-5 w-5" />
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
      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-3 text-2xl font-bold md:text-3xl">
            Empowering Founders with Knowledge
          </h2>
          <p className="text-base text-muted-foreground">
            We analyze thousands of startup failures and successes to bring you actionable insights. 
            Our platform combines industry research, real-world data, and expert analysis to help you 
            avoid common pitfalls and accelerate your path to success.
          </p>
        </div>
      </section>

      {/* Problems Grid */}
      <section className="border-t border-border/50 bg-muted/30">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="mb-8 text-center">
            <h2 className="mb-3 text-2xl font-bold md:text-3xl">
              Top Startup Challenges
            </h2>
            <p className="text-muted-foreground">
              Explore our in-depth analysis of the most common problems and their solutions
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {problems.map((problem) => {
              const Icon = problem.icon;
              return (
                <Link key={problem.path} to={problem.path}>
                  <Card className="h-full transition-all hover:border-primary/50 hover:shadow-lg">
                    <CardHeader>
                      <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{problem.title}</CardTitle>
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
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-3 text-2xl font-bold md:text-3xl">
              Ready to Overcome Your Challenges?
            </h2>
            <p className="mb-6 text-base text-muted-foreground">
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
