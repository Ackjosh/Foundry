import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Target, CheckCircle2, TrendingUp, Users, Zap, ShieldCheck, Rocket, MessageSquare, Quote, Link as LinkIcon } from "lucide-react";

const ProductMarketFitArticle = () => {
  const pmfScoreData = [
    { category: "Very Disappointed", score: 51, fill: "hsl(var(--primary))" },
    { category: "Somewhat Disappointed", score: 30, fill: "hsl(var(--destructive) / 0.55)" },
    { category: "Not Disappointed", score: 19, fill: "hsl(var(--destructive))" },
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
            The Holy Grail of Startups: Achieving Product-Market Fit
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-serif italic">
            "42% of startups fail because they build products nobody wants. 
            Understanding and achieving PMF is the single most important factor for startup survival."
          </p>
          <a
            href="https://foundersnetwork.com/product-market-fit/"
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
          <h2 className="text-3xl font-bold mb-6">What is Product-Market Fit?</h2>
          <p>
            At its core, <strong> Product-Market Fit (PMF)</strong> is the alignment between your product or service and the needs of your target market. 
            It is the moment when you find a group of customers who are not only interested in what you have to offer but are <em>"willing to pay for it"</em>.
          </p>
          <p>
            Industry giants like Apple (iPhone), Uber (ride-sharing), and Airbnb (vacation rentals) didn't just build great apps; 
            they found a way to provide solutions that resonated so deeply with their audience that it resulted in explosive, 
            self-sustaining growth. For startups, PMF is the boundary between "burning cash" and "building a business."
          </p>

          <blockquote className="border-l-4 border-primary pl-6 my-10 italic text-2xl font-serif text-muted-foreground">
            "Without PMF, you risk spending valuable resources building a product that no one wants. 
            With it, you reduce the risk of failure to its absolute minimum."
          </blockquote>
        </section>

        <section className="">
          <div className="bg-muted/50 rounded-3xl p-8 border">
            <h3 className="text-2xl font-bold mb-4">Measuring the Intangible: The "Sean Ellis Test"</h3>
            <p className="text-muted-foreground mb-8">
              How do you know you've arrived? The gold standard is a simple question: 
              <em> "How would you feel if you could no longer use this product?"</em>
            </p>
            
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={pmfScoreData} layout="vertical">
                    <XAxis type="number" hide />
                    <YAxis dataKey="category" type="category" width={140} stroke="currentColor" fontSize={12} />
                    <Tooltip
                      cursor={{ fill: 'transparent'}}
                      labelStyle={{ color: 'black' }}
                      itemStyle={{ color: 'black' }}
                    />
                    <Bar
                      dataKey="score"
                      radius={[0, 4, 4, 0]}
                      barSize={40}
                      className="cursor-pointer"
                      style={{ cursor: 'pointer' }}
                    >
                      {pmfScoreData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div>
                <h4 className="text-lg font-bold mb-2">The Benchmark</h4>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  A score above <strong> 40% </strong> in the "Very Disappointed" category indicates you've hit the mark. 
                  When Slack was gaining momentum, <strong> 51% </strong> of their half-million users responded that they would 
                  be devastated without the tool. This is the moment a product becomes a "painkiller" rather than a "vitamin."
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-5">
          <h2 className="text-3xl font-bold mb-10 text-center">The Ripple Effect of PMF</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Increased Retention", desc: "Happy customers come back, leading to a sustainable, low-churn business model.", icon: Users },
              { title: "Business Performance", desc: "Revenue rises, profit margins expand, and cash flow becomes predictable.", icon: TrendingUp },
              { title: "Easier Scaling", desc: "You can grow your marketing and production without worrying if a market exists.", icon: Rocket },
              { title: "Competitive Edge", desc: "You deliver so much value that competitors find it nearly impossible to steal your users.", icon: ShieldCheck },
              { title: "Lower CAC", desc: "Word-of-mouth spreads naturally, drastically reducing your customer acquisition costs.", icon: Zap },
            ].map((benefit, i) => (
              <div key={i} className="p-6 rounded-2xl border bg-card hover:shadow-lg transition-shadow">
                <benefit.icon className="h-10 w-10 text-primary mb-4" />
                <h4 className="font-bold mb-2">{benefit.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6 mt-5">
          <h2 className="text-3xl font-bold border-b pb-4 mb-10">Anatomy of Success: Case Studies</h2>
          
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="md:w-1/3">
              <h3 className="text-xl font-black uppercase text-primary">Zenefits</h3>
              <p className="text-sm font-bold text-muted-foreground">The Alternative Play</p>
            </div>
            <div className="md:w-2/3 text-lg text-muted-foreground">
              By offering a low-cost, easy-to-use alternative to traditional HR software, Zenefits reached a <strong> $4.5 billion valuation </strong> in just two years. They achieved this by leveraging relentless data analytics to iterate until the product was 
              indisputably more user-friendly than the status quo.
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="md:w-1/3">
              <h3 className="text-xl font-black uppercase text-primary">Buffer</h3>
              <p className="text-sm font-bold text-muted-foreground">The Transparency Model</p>
            </div>
            <div className="md:w-2/3 text-lg text-muted-foreground">
              Buffer's growth to <strong> 75,000 customers </strong> wasn't just about code; it was about engagement. By blogging openly about 
              their challenges and release cycles, they built a community that provided the feedback necessary to hit PMF before 
              their competitors even knew what users were asking for.
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="md:w-1/3">
              <h3 className="text-xl font-black uppercase text-primary">Zapier</h3>
              <p className="text-sm font-bold text-muted-foreground">The Niche Specialist</p>
            </div>
            <div className="md:w-2/3 text-lg text-muted-foreground">
              Serving over <strong> 3 million customers </strong>, Zapier focused on one specific pain point: web automation for small businesses. 
              By partnering with existing platforms rather than competing, they found a side-door into the market that established 
              immediate value and massive PMF.
            </div>
          </div>
        </section>

        <section className="p-10 bg-muted/30 text-white rounded-3xl mt-3">
          <h2 className="text-3xl font-bold mb-12">The Blueprint to Achieving PMF</h2>
          <div className="space-y-9">
            <div className="flex gap-10">
              <div className="text-4xl font-serif text-primary italic opacity-50">01</div>
              <div>
                <h4 className="text-xl font-bold mb-2 uppercase tracking-tight">Segment Your Supporters</h4>
                <p className="opacity-80">Identify your 'High-Expectation Customers.' Don't build for everyone; build for the segments whose pain is greatest.</p>
              </div>
            </div>
            <div className="flex gap-10">
              <div className="text-4xl font-serif text-primary italic opacity-50">02</div>
              <div>
                <h4 className="text-xl font-bold mb-2 uppercase tracking-tight">Convert the "On-The-Fence"</h4>
                <p className="opacity-80">Analyze feedback from users who aren't quite fans yet. What one feature would turn their 'No' into a 'Yes'?</p>
              </div>
            </div>
            <div className="flex gap-10">
              <div className="text-4xl font-serif text-primary italic opacity-50">03</div>
              <div>
                <h4 className="text-xl font-bold mb-2 uppercase tracking-tight">Invest in Love, Resolve Friction</h4>
                <p className="opacity-80">Build your roadmap around the features users love most, while ruthlessly cutting what holds them back.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="prose prose-lg dark:prose-invert max-w-none max-w-4xl mx-auto w-full px-6 border-t">
          <h2 className="text-3xl font-bold mb-8 mt-5">Common Inquiries</h2>
          <div className="grid gap-8">
            <div>
              <h4 className="font-bold flex items-center gap-2"><MessageSquare className="h-5 w-5 text-primary" /> Can I achieve PMF without marketing?</h4>
              <p className="text-base text-muted-foreground">Yes. While marketing helps, true PMF is often found through word-of-mouth and high-quality product iterations. In the early days, customer research and network-leveraging are far more powerful than paid ads.</p>
            </div>
            <div>
              <h4 className="font-bold flex items-center gap-2"><MessageSquare className="h-5 w-5 text-primary" /> How do I prove PMF to investors?</h4>
              <p className="text-base text-muted-foreground">Investors look for retention curves that flatten out, a declining CAC/LTV ratio, and qualitative testimonials. Data is your best friend when proving that the market actually wants what you've built.</p>
            </div>
          </div>
        </section>

        <footer className="text-center py-10 border-t">
          <Quote className="h-10 w-10 text-primary/20 mx-auto mb-4" />
          <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">Continuing the Journey</p>
          <p className="text-muted-foreground max-w-md mx-auto">
            Remember: PMF is not the end goal. It is the starting gun. Once you've validated your product, the real work of scaling begins.
          </p>
        </footer>
      </main>
    </div>
  );
};

export default ProductMarketFitArticle;