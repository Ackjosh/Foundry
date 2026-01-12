import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell } from "recharts";
import { DollarSign, CheckCircle2, TrendingUp, AlertTriangle, ShieldCheck, Scale, BarChart3, Mail, Quote, Link as LinkIcon, Rocket } from "lucide-react";

const CashFlowManagementArticle = () => {
  const latePaymentData = [
    { range: "Up to £5k", percentage: 54, fill: "hsl(var(--primary) / 0.6)" },
    { range: "£10k - £30k", percentage: 22, fill: "hsl(var(--primary))" },
    { range: "Report Problem", percentage: 65, fill: "hsl(var(--destructive))" },
  ];

  const runwayData = [
    { month: "Jan", revenue: 120, expenses: 180 },
    { month: "Feb", revenue: 135, expenses: 185 },
    { month: "Mar", revenue: 155, expenses: 190 },
    { month: "Apr", revenue: 180, expenses: 195 },
    { month: "May", revenue: 210, expenses: 200 },
    { month: "Jun", revenue: 245, expenses: 205 },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 flex flex-col gap-10">
      <header className="py-20 border-b bg-muted/30">
        <div className="w-full px-6 text-center">
          <div className="flex justify-center mb-6">
            <span className="px-3 py-1 text-xs font-bold uppercase tracking-widest bg-primary/10 text-primary rounded-full">
              Founders Strategy Guide
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
            Cash is King: Mastering the Startup Balancing Act
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-serif italic">
            "Revenue is vanity, profit is sanity, but cash is reality. 
            29% of startups fail simply because the bank account hit zero."
          </p>
          <a
            href="https://mypulse.io/blog/cash-flow-management-challenges-and-techniques-for-better-cash-flow-control"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 mt-4 text-sm font-semibold text-primary hover:text-primary/80"
          >
            <LinkIcon className="h-4 w-4" />
            Read the original article
          </a>
        </div>
      </header>

      <main className="w-full px-6 py-12 flex flex-col gap-20">

        <section className="prose prose-lg dark:prose-invert max-w-none max-w-4xl mx-auto w-full px-6">
          <h2 className="text-3xl font-bold mb-6">The Lifeblood of the Enterprise</h2>
          <p>
            Cash flow management involves monitoring, analyzing, and optimizing cash flows to maintain liquidity. 
            It ensures sufficient funds to cover expenses, investments, and loan repayments, acting as the 
            <strong> main pillar of financial health</strong>.
          </p>
          <p>
            Whether you are scaling or navigating economic uncertainty, this is a <strong>balancing act</strong>. 
            Poor planning leads to mathematical liquidity problems that grow worse by the day, making 
            controlled, strategic movement essential.
          </p>

          <blockquote className="border-l-4 border-primary pl-6 my-10 italic text-2xl font-serif text-muted-foreground">
            "Cash flow management is not only essential in unpredictable economic times, 
            but it's also a means of outperforming the competition."
          </blockquote>
        </section>

        <section>
          <div className="bg-muted/50 rounded-3xl p-8 border">
            <h3 className="text-2xl font-bold mb-4">The "J-Curve" of Growth Cash Flow</h3>
            <p className="text-muted-foreground mb-8 text-sm">
              Visualizing the gap between operating expenses and revenue during a rapid scaling phase.
            </p>
            
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={runwayData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                  <XAxis dataKey="month" stroke="currentColor" fontSize={12} />
                  <YAxis stroke="currentColor" fontSize={12} />
                  <Tooltip 
                     contentStyle={{ backgroundColor: "hsl(var(--card))", borderRadius: "12px", border: "1px solid hsl(var(--border))" }}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" fill="hsl(var(--primary) / 0.1)" strokeWidth={3} name="Inflow" />
                  <Area type="monotone" dataKey="expenses" stroke="hsl(var(--destructive))" fill="hsl(var(--destructive) / 0.1)" strokeWidth={3} name="Outflow" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-10 text-center">Critical Cash Flow Challenges</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Economic Uncertainty", desc: "Volatile markets and inflation translate into higher operating costs.", icon: Scale },
              { title: "High Debt Levels", desc: "Large obligations reduce liquidity and impede essential reinvestment.", icon: DollarSign },
              { title: "Scaling Hurdles", desc: "Rapid growth requires investment that often outpaces available cash reserves.", icon: Rocket },
              { title: "Mismatched Terms", desc: "Quick supplier deadlines versus delayed customer payments create shortfalls.", icon: BarChart3 },
              { title: "Late Payments", desc: "65% of SMEs report that unpaid invoices compel reliance on outside funds.", icon: AlertTriangle },
              { title: "Currency Risks", desc: "Global businesses face exchange rate risks that slash profit margins.", icon: TrendingUp },
            ].map((challenge, i) => (
              <div key={i} className="p-6 rounded-2xl border bg-card hover:shadow-lg transition-shadow">
                <challenge.icon className="h-10 w-10 text-primary mb-4" />
                <h4 className="font-bold mb-2">{challenge.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{challenge.desc}</p>
              </div>
            ))}
          </div>
        </section>
        
        <section className="mb-20 p-10 bg-muted/30 text-foreground rounded-3xl">
          <h2 className="text-3xl font-bold mb-8">Techniques for Optimization</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h4 className="font-black uppercase text-sm tracking-widest opacity-70 mb-2">Forecasting</h4>
                <p className="font-serif italic text-lg text-white">Predicting future shortfalls to make intelligent, data-driven financial decisions.</p>
              </div>
              <div>
                <h4 className="font-black uppercase text-sm tracking-widest opacity-70 mb-2">Dynamic Discounting</h4>
                <p className="font-serif italic text-lg text-white">Paying suppliers early in exchange for discounts to lower procurement costs.</p>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <h4 className="font-black uppercase text-sm tracking-widest opacity-70 mb-2">Inventory Lean</h4>
                <p className="font-serif italic text-lg text-white">Optimizing stock levels to avoid holding cash in unsold inventory.</p>
              </div>
              <div>
                <h4 className="font-black uppercase text-sm tracking-widest opacity-70 mb-2">Conversion Cycle</h4>
                <p className="font-serif italic text-lg text-white">Reducing the time taken to turn inventory and receivables back into cash.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="prose prose-lg dark:prose-invert max-w-none max-w-4xl mx-auto w-full border-t">
          <h2 className="text-3xl font-bold mb-8 mt-5 text-center">Technology & Modern Systems</h2>
          <div className="p-8 border-2 border-dashed rounded-2xl bg-muted/20 text-center">
            <p className="text-lg leading-relaxed mb-6">
              AI tools and modern accounting software give real-time visibility. By automating reminders, 
              SMEs can minimize late payments and make more informed operations.
            </p>
          </div>
        </section>

        <footer className="text-center py-10 border-t">
          <Quote className="h-10 w-10 text-primary/20 mx-auto mb-4" />
          <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">Financial Sanity</p>
          <p className="text-muted-foreground max-w-md mx-auto italic">
            "Remember: Cash is king, profit is sanity, and revenue is vanity. Your financial agility is your greatest competitive edge."
          </p>
        </footer>
      </main>
    </div>
  );
};

export default CashFlowManagementArticle;