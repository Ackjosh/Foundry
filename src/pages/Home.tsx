import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Target, DollarSign, ArrowRight, MessageSquare } from "lucide-react";

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
        <div className="container relative mx-auto px-4 py-10 md:py-14">
          <div className="mx-auto max-w-4xl">
            <h1 className="mb-3 text-4xl font-bold tracking-tight md:text-5xl">
              Your AI-Powered Startup <span className="text-primary">Success Partner</span>
            </h1>
            <p className="mb-4 text-base text-muted-foreground md:text-lg max-w-3xl">
              Get personalized advice from our AI chatbot trained on real startup success stories. 
              Navigate challenges with data-driven insights and proven strategies from founders who have been there.
              Our AI analyzes patterns from thousands of successful startups to provide you with actionable recommendations
              tailored to your specific situation.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row mb-6">
              <Button size="lg" asChild>
                <Link to="/problems/product-market-fit">
                  Explore Solutions <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/register">Get Started Free</Link>
              </Button>
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

      {/* Mission Section */}
      <section className="container mx-auto px-4 py-8 md:py-12">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-3 text-2xl font-bold md:text-3xl">
            Empowering Founders with Knowledge
          </h2>
          <p className="text-base text-muted-foreground mb-4">
            We analyze thousands of startup failures and successes to bring you actionable insights. 
            Our platform combines industry research, real-world data, and expert analysis to help you 
            avoid common pitfalls and accelerate your path to success. Every recommendation is backed
            by data from successful founders who have navigated similar challenges.
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
      </section>

      {/* Problems Grid */}
      <section className="border-t border-border/50 bg-muted/30">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="mb-6 max-w-4xl mx-auto">
            <h2 className="mb-2 text-2xl font-bold md:text-3xl">
              Top Startup Challenges
            </h2>
            <p className="text-muted-foreground">
              Explore our in-depth analysis of the most critical problems facing startups today. 
              Each challenge includes real-world examples, failure patterns, and proven solutions 
              from founders who successfully overcame these obstacles.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            {problems.map((problem) => {
              const Icon = problem.icon;
              return (
                <Link key={problem.path} to={problem.path}>
                  <Card className="h-full transition-all hover:border-primary/50 hover:shadow-lg">
                    <CardHeader className="pb-3">
                      <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{problem.title}</CardTitle>
                      <CardDescription className="text-sm">{problem.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-xs text-muted-foreground mb-3">
                        Learn from real case studies and get actionable strategies to overcome this challenge effectively.
                      </p>
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
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-2 text-2xl font-bold md:text-3xl">
              Ready to Overcome Your Challenges?
            </h2>
            <p className="mb-4 text-base text-muted-foreground">
              Join thousands of founders who are making data-driven decisions to grow their startups. 
              Get instant access to our AI advisor, comprehensive problem analyses, and proven strategies
              that have helped startups raise over $500M in funding and achieve sustainable growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <Button size="lg" asChild>
                <Link to="/register">Start Your Journey</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/chatbot">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Try AI Advisor
                </Link>
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              No credit card required. Start with our free tier and upgrade as you grow.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
