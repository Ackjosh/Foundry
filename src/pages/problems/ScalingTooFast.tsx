import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { TrendingUp, CheckCircle2, ExternalLink } from "lucide-react";

const ScalingTooFast = () => {
  const growthData = [
    { quarter: "Q1", sustainable: 25, aggressive: 45 },
    { quarter: "Q2", sustainable: 32, aggressive: 72 },
    { quarter: "Q3", sustainable: 41, aggressive: 95 },
    { quarter: "Q4", sustainable: 53, aggressive: 88 },
    { quarter: "Q1+1", sustainable: 68, aggressive: 62 },
    { quarter: "Q2+1", sustainable: 84, aggressive: 41 },
  ];

  const burnRateData = [
    { month: "M1", controlled: 50, rapid: 85 },
    { month: "M3", controlled: 52, rapid: 120 },
    { month: "M6", controlled: 55, rapid: 165 },
    { month: "M9", controlled: 58, rapid: 145 },
    { month: "M12", controlled: 60, rapid: 95 },
  ];

  const solutions = [
    "Establish clear unit economics before scaling operations",
    "Hire strategically based on revenue milestones, not projections",
    "Maintain 18-24 months of runway at all times",
    "Implement gradual scaling with regular performance checkpoints",
    "Build scalable systems and processes before expanding team",
    "Focus on retention metrics before acquisition at scale",
  ];

  const references = [
    { title: "Blitzscaling: When and How to Build at Lightning Speed", author: "Reid Hoffman", url: "#" },
    { title: "The Hard Thing About Hard Things", author: "Ben Horowitz", url: "#" },
    { title: "Stanford Study on Premature Scaling", author: "Stanford University", url: "#" },
    { title: "Startup Genome Report: Premature Scaling", author: "Startup Genome", url: "#" },
  ];

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
            <TrendingUp className="h-8 w-8 text-primary" />
          </div>
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">Scaling Too Fast</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            70% of startups that scale prematurely fail. Growing faster than your infrastructure, 
            processes, and unit economics can support leads to operational collapse and cash burn.
          </p>
        </div>

        {/* Problem Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>The Challenge</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-invert max-w-none">
            <p className="text-muted-foreground">
              After achieving initial traction, many founders rush to scale before establishing solid foundations. 
              They hire aggressively, expand to new markets, and increase marketing spend without proven unit economics. 
              This premature scaling often leads to quality issues, cultural dilution, unsustainable burn rates, and 
              ultimately, startup failure—even with significant funding.
            </p>
          </CardContent>
        </Card>

        {/* Growth Comparison Chart */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Sustainable vs. Aggressive Growth</CardTitle>
            <CardDescription>
              Revenue growth comparison over 18 months (indexed to 100)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={growthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="quarter" stroke="hsl(var(--muted-foreground))" />
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
                  dataKey="sustainable"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  name="Sustainable Growth"
                />
                <Line
                  type="monotone"
                  dataKey="aggressive"
                  stroke="hsl(var(--destructive))"
                  strokeWidth={2}
                  name="Aggressive Scaling"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Burn Rate Analysis */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Monthly Burn Rate Analysis</CardTitle>
            <CardDescription>
              Cash burn rate comparison ($K per month)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={burnRateData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Bar dataKey="controlled" fill="hsl(var(--primary))" name="Controlled Scaling" />
                <Bar dataKey="rapid" fill="hsl(var(--destructive))" name="Rapid Scaling" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Solutions */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Proven Solutions</CardTitle>
            <CardDescription>
              Strategic approaches to sustainable scaling
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

export default ScalingTooFast;
