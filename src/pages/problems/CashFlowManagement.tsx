import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { DollarSign, CheckCircle2, ExternalLink } from "lucide-react";

const CashFlowManagement = () => {
  const runwayData = [
    { month: "Jan", revenue: 120, expenses: 180, runway: 18 },
    { month: "Feb", revenue: 135, expenses: 185, runway: 17 },
    { month: "Mar", revenue: 155, expenses: 190, runway: 16 },
    { month: "Apr", revenue: 180, expenses: 195, runway: 16 },
    { month: "May", revenue: 210, expenses: 200, runway: 17 },
    { month: "Jun", revenue: 245, expenses: 205, runway: 18 },
  ];

  const survivalData = [
    { category: "< 6 months", percentage: 82 },
    { category: "6-12 months", percentage: 54 },
    { category: "12-18 months", percentage: 28 },
    { category: "> 18 months", percentage: 12 },
  ];

  const solutions = [
    "Maintain detailed monthly cash flow projections for 18+ months",
    "Separate growth spending from essential operational costs",
    "Implement milestone-based spending instead of time-based budgets",
    "Negotiate payment terms with vendors to improve working capital",
    "Create multiple fundraising scenarios and timelines",
    "Monitor key metrics: burn rate, runway, unit economics, and CAC payback",
  ];

  const references = [
    { title: "Financial Intelligence for Entrepreneurs", author: "Karen Berman & Joe Knight", url: "#" },
    { title: "The Art of Startup Fundraising", author: "Alejandro Cremades", url: "#" },
    { title: "SaaS Financial Planning Guide", author: "ChartMogul", url: "#" },
    { title: "Understanding Startup Metrics", author: "a16z", url: "#" },
  ];

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
            <DollarSign className="h-8 w-8 text-primary" />
          </div>
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">Cash Flow Management</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            29% of startups fail due to running out of cash. Poor financial planning and cash flow 
            mismanagement remain among the top reasons for startup failure across all industries.
          </p>
        </div>

        {/* Problem Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>The Challenge</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-invert max-w-none">
            <p className="text-muted-foreground">
              Many founders focus exclusively on revenue growth while neglecting cash flow management. 
              They underestimate burn rate, overestimate revenue projections, and fail to maintain adequate 
              runway. Even profitable startups can fail if they run out of cash due to timing mismatches 
              between receivables and payables. Understanding your unit economics, monitoring burn rate, 
              and maintaining sufficient runway are critical to survival.
            </p>
          </CardContent>
        </Card>

        {/* Cash Flow Analysis */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Monthly Cash Flow & Runway</CardTitle>
            <CardDescription>
              Revenue vs. expenses with projected runway months (example startup)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={runwayData}>
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
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stackId="1"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary) / 0.3)"
                  name="Revenue ($K)"
                />
                <Area
                  type="monotone"
                  dataKey="expenses"
                  stackId="2"
                  stroke="hsl(var(--destructive))"
                  fill="hsl(var(--destructive) / 0.3)"
                  name="Expenses ($K)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Failure Rate by Runway */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Failure Rate by Cash Runway</CardTitle>
            <CardDescription>
              Percentage of startups that fail based on available cash runway
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={survivalData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
                <YAxis dataKey="category" type="category" stroke="hsl(var(--muted-foreground))" width={120} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="percentage" fill="hsl(var(--primary))" name="Failure Rate (%)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Solutions */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Proven Solutions</CardTitle>
            <CardDescription>
              Essential practices for healthy cash flow management
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

export default CashFlowManagement;
