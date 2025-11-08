import { Link, useLocation } from "react-router-dom";
import { Rocket, Target, TrendingUp, DollarSign, Home } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const navigation = [
  {
    title: "Overview",
    items: [
      { title: "Home", path: "/", icon: Home },
    ],
  },
  {
    title: "Common Problems",
    items: [
      { 
        title: "Product-Market Fit", 
        path: "/problems/product-market-fit",
        icon: Target,
      },
      { 
        title: "Scaling Too Fast", 
        path: "/problems/scaling-too-fast",
        icon: TrendingUp,
      },
      { 
        title: "Cash Flow Management", 
        path: "/problems/cash-flow-management",
        icon: DollarSign,
      },
    ],
  },
];

export function AppSidebar() {
  const { open } = useSidebar();
  const location = useLocation();

  return (
    <Sidebar className="border-r border-border/50 bg-card">
      <SidebarContent>
        {/* Logo */}
        <div className="flex items-center gap-2 px-4 py-6">
          <Rocket className="h-6 w-6 text-primary" />
          {open && <span className="text-lg font-bold text-gradient">StratoGuide</span>}
        </div>

        {navigation.map((section) => (
          <SidebarGroup key={section.title}>
            {open && (
              <SidebarGroupLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground px-4">
                {section.title}
              </SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  
                  return (
                    <SidebarMenuItem key={item.path}>
                      <SidebarMenuButton
                        asChild
                        className={`
                          ${isActive ? 'bg-primary/10 text-primary border-l-2 border-primary' : 'text-foreground/80 hover:text-foreground hover:bg-muted/50'}
                          transition-colors
                        `}
                      >
                        <Link to={item.path} className="flex items-center gap-3 px-4">
                          <Icon className="h-4 w-4 flex-shrink-0" />
                          {open && <span className="text-sm font-medium">{item.title}</span>}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
