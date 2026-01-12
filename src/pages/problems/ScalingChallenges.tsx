import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Users, Settings, Award, Heart, Wallet, CheckCircle2, MessageSquare, Quote, ArrowUpRight, ShieldAlert, ListChecks, ArrowRightLeft, Link as LinkIcon } from "lucide-react";

const ScalingChallengesArticle = () => {
  const talentStat = [{ name: "CEOs concerned about skills", value: 77 }];

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
            Beyond the Inflection Point: Scaling Without Breaking
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-serif italic">
            "Scaling up is the dream, but the execution is a gauntlet. Growth is not just about getting bigger—it's about building the systems to handle the weight."
          </p>
          <a
            href="https://tribexyz.com/scaleup-challenges/"
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
        
        <section className="flex flex-col md:flex-row gap-12 items-center max-w-4xl mx-auto w-full px-6">
          <div className="md:w-1/2 prose prose-lg dark:prose-invert">
            <h2 className="text-3xl font-bold mb-6 italic">The Scaling Paradox</h2>
            <p>
              When revenue increases faster than costs, you’ve reached the inflection point. But 
              <strong> scaling too fast or too soon</strong> is a common pitfall. Successful scaling requires 
              a shift from "founder heroics" to "systemic excellence."
            </p>
          </div>
          <div className="md:w-1/2 p-8 bg-primary/5 border rounded-3xl relative overflow-hidden">
             <Quote className="absolute -top-2 -right-2 h-24 w-24 text-primary/5" />
             <p className="text-lg font-serif italic relative z-10">
               "Hiring the right people is key. Find team members who match the culture, learn quickly, and help the company grow."
             </p>
             <p className="mt-4 text-sm font-bold uppercase tracking-widest text-primary">— Pedro Reis Silva</p>
          </div>
        </section>
        
        <section className="grid md:grid-cols-5 gap-8 items-center">
          <div className="md:col-span-2">
            <div className="text-7xl font-black text-primary mb-2">77%</div>
            <h3 className="text-xl font-bold mb-4 uppercase tracking-tighter">The Talent Threat</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              PwC reports that 77% of CEOs see skill availability as the biggest threat to growth. 
              In the tech sector, you are competing against giants for the same specialized minds.
            </p>
          </div>
          <div className="md:col-span-3 space-y-4">
             <div className="p-4 border rounded-xl bg-card hover:bg-muted/30 transition-colors">
                <h4 className="font-bold flex items-center gap-2 text-primary"><Users className="h-4 w-4" /> Define Values</h4>
                <p className="text-xs text-muted-foreground">Articulate what you stand for to attract vision-aligned talent.</p>
             </div>
             <div className="p-4 border rounded-xl bg-card hover:bg-muted/30 transition-colors">
                <h4 className="font-bold flex items-center gap-2 text-primary"><Award className="h-4 w-4" /> Potential over Pedigree</h4>
                <p className="text-xs text-muted-foreground">Hire for attitude and aptitude; skills can be taught, alignment cannot.</p>
             </div>
             <div className="p-4 border rounded-xl bg-card hover:bg-muted/30 transition-colors">
                <h4 className="font-bold flex items-center gap-2 text-primary"><ShieldAlert className="h-4 w-4" /> Invest in Growth</h4>
                <p className="text-xs text-muted-foreground">Retention is driven by coaching, mentoring, and clear career paths.</p>
             </div>
          </div>
        </section>
        
        <section>
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold mb-4">Scaling Operations</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Scaling means handling more output efficiently. This requires a choice in methodology.</p>
          </div>
          <div className="overflow-hidden rounded-2xl border bg-card">
            <table className="w-full text-left border-collapse">
              <thead className="bg-muted/50">
                <tr>
                  <th className="p-4 font-bold border-b">Dimension</th>
                  <th className="p-4 font-bold border-b text-primary">Horizontal Scaling</th>
                  <th className="p-4 font-bold border-b text-indigo-500">Vertical Scaling</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr>
                  <td className="p-4 border-b font-semibold bg-muted/20">Method</td>
                  <td className="p-4 border-b">Adding more resources of the same type.</td>
                  <td className="p-4 border-b">Adding specialized or advanced resources.</td>
                </tr>
                <tr>
                  <td className="p-4 border-b font-semibold bg-muted/20">Use Case</td>
                  <td className="p-4 border-b">Increased volume (Users/Demand).</td>
                  <td className="p-4 border-b">Increased complexity (Features/Quality).</td>
                </tr>
                <tr>
                  <td className="p-4 border-b font-semibold bg-muted/20">Strategy</td>
                  <td className="p-4 border-b">Replication and expansion.</td>
                  <td className="p-4 border-b">Reinvention and specialization.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="space-y-16">
          <h2 className="text-3xl font-bold border-b pb-4">The Pillars of Sustainable Scaling</h2>
          
          <div className="flex flex-col md:flex-row gap-8">
            <Settings className="h-12 w-12 text-primary shrink-0" />
            <div>
               <h4 className="text-xl font-bold mb-2">Optimized Operations</h4>
               <p className="text-muted-foreground leading-relaxed italic">"Standardize before you automate. Document your processes to ensure consistency and quality as you expand."</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            <Award className="h-12 w-12 text-primary shrink-0" />
            <div>
               <h4 className="text-xl font-bold mb-2">Product Integrity</h4>
               <p className="text-muted-foreground leading-relaxed italic">"Avoid the complexity trap. Prioritize features that deliver the most value and iterate fast using agile methodology."</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            <Heart className="h-12 w-12 text-primary shrink-0" />
            <div>
               <h4 className="text-xl font-bold mb-2">Cultural Identity</h4>
               <p className="text-muted-foreground leading-relaxed italic">"Culture is your set of behaviors. Communicate your vision clearly as you add locations to ensure no one loses the mission."</p>
            </div>
          </div>
        </section>

        <section className="p-10 bg-muted/30 text-white rounded-3xl">
          <div className="flex items-center gap-4 mb-10">
            <ListChecks className="h-8 w-8 text-primary" />
            <h2 className="text-3xl font-bold">The Scaling Blueprint</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="text-4xl font-serif text-primary italic opacity-50">01</div>
              <h5 className="font-bold uppercase tracking-widest text-xs opacity-70">Preparation</h5>
              <p className="text-sm opacity-80">Plan ahead with data-driven milestones. Leverage technology and RPO partners for non-core functions.</p>
            </div>
            <div className="space-y-4">
              <div className="text-4xl font-serif text-primary italic opacity-50">02</div>
              <h5 className="font-bold uppercase tracking-widest text-xs opacity-70">Iteration</h5>
              <p className="text-sm opacity-80">Listen to feedback across all stakeholders. Use agile sprints to release frequent, high-quality updates.</p>
            </div>
            <div className="space-y-4">
              <div className="text-4xl font-serif text-primary italic opacity-50">03</div>
              <h5 className="font-bold uppercase tracking-widest text-xs opacity-70">Vigilance</h5>
              <p className="text-sm opacity-80">Track cash flow statements, burn rates, and LTV/CAC ratios religiously to secure your financial future.</p>
            </div>
          </div>
        </section>

        <footer className="text-center py-10 border-t">
          <Quote className="h-10 w-10 text-primary/20 mx-auto mb-4" />
          <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">Final Perspective</p>
          <p className="text-muted-foreground max-w-md mx-auto italic">
            "Scaling is not about getting bigger; it's about staying better. Every smart pivot and optimized process increases your chances of eventual leadership."
          </p>
        </footer>
      </main>
    </div>
  );
};

export default ScalingChallengesArticle;