import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Target, CheckCircle2, ExternalLink } from "lucide-react";

const ProductMarketFit = () => {
  const trendData = [
    { year: "2019", failures: 42, successes: 18 },
    { year: "2020", failures: 38, successes: 22 },
    { year: "2021", failures: 35, successes: 28 },
    { year: "2022", failures: 32, successes: 34 },
    { year: "2023", failures: 28, successes: 41 },
    { year: "2024", failures: 25, successes: 48 },
  ];

  const adoptionData = [
    { phase: "Discovery", percentage: 85 },
    { phase: "Validation", percentage: 62 },
    { phase: "Iteration", percentage: 45 },
    { phase: "PMF Achieved", percentage: 23 },
  ];

  const solutions = [
    "Conduct extensive customer interviews before building features",
    "Use MVP approach to test assumptions quickly",
    "Define clear success metrics and track them religiously",
    "Iterate based on user feedback, not founder intuition",
    "Focus on solving one problem exceptionally well",
    "Measure product-market fit using retention and engagement metrics",
  ];

  const references = [
    { title: "The Startup Owner's Manual", author: "Steve Blank & Bob Dorf", url: "#" },
    { title: "CB Insights: Why Startups Fail", author: "CB Insights Research", url: "#" },
    { title: "First Round Review: Finding PMF", author: "First Round Capital", url: "#" },
    { title: "Y Combinator: Achieving Product-Market Fit", author: "Y Combinator", url: "#" },
  ];

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
            <Target className="h-8 w-8 text-primary" />
          </div>
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">Product-Market Fit</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            42% of startups fail because they build products nobody wants. Understanding and achieving 
            product-market fit is the single most important factor for startup success.
          </p>
        </div>

        {/* Problem Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>The Challenge</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-invert max-w-none">
            <p className="text-muted-foreground">
              Many founders fall in love with their solution before validating the problem. They spend months 
              building features based on assumptions rather than customer needs. Product-market fit occurs when 
              your product satisfies a strong market demand—when customers actively seek out your product, use it 
              regularly, and recommend it to others.
            </p>
          </CardContent>
        </Card>

        {/* Trend Chart */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Success Rate Trends (2019-2024)</CardTitle>
            <CardDescription>
              Startups achieving PMF vs. those failing due to lack of market need
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="year" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="failures"
                  stroke="hsl(var(--destructive))"
                  strokeWidth={2}
                  name="Failures Due to No Market Need"
                />
                <Line
                  type="monotone"
                  dataKey="successes"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  name="Achieved PMF"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Adoption Funnel */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>PMF Achievement Funnel</CardTitle>
            <CardDescription>
              Percentage of startups progressing through each stage of finding product-market fit
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={adoptionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="phase" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="percentage"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary) / 0.2)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Solutions */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Proven Solutions</CardTitle>
            <CardDescription>
              Actionable strategies to achieve product-market fit
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {solutions.map((solution, index) => (
                <li key={index} className="flex gap-3">
                  <CheckCircle2 className="h-6 w-6 shrink-0 text-primary" />
                  <span className="text-muted-foreground">{solution}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* References */}
        <Card>
          <CardHeader>
            <CardTitle>References & Further Reading</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {references.map((ref, index) => (
                <li key={index}>
                  <a
                    href={ref.url}
                    className="flex items-start gap-2 text-primary hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="h-4 w-4 shrink-0 mt-1" />
                    <div>
                      <div className="font-medium">{ref.title}</div>
                      <div className="text-sm text-muted-foreground">{ref.author}</div>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProductMarketFit;
