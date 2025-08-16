import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  Plus, 
  Trophy, 
  User, 
  Wallet, 
  Zap 
} from "lucide-react";
import { cn } from "@/lib/utils";
import PredictEarnLogo from "./PredictEarnLogo";

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  userBalance: string;
  userFID: string;
}

const Navigation = ({ activeTab, onTabChange, userBalance, userFID }: NavigationProps) => {
  const navItems = [
    { id: "markets", label: "Markets", icon: BarChart3 },
    { id: "create", label: "Create", icon: Plus },
    { id: "profile", label: "Profile", icon: User },
    { id: "leaderboard", label: "Leaderboard", icon: Trophy },
  ];

  return (
    <nav className="glass-card p-4 mb-6">
      <div className="flex items-center justify-between">
        <PredictEarnLogo />
        
        <div className="hidden md:flex items-center gap-2">
          {navItems.map((item) => (
            <Button
              key={item.id}
              variant={activeTab === item.id ? "default" : "ghost"}
              onClick={() => onTabChange(item.id)}
              className={cn(
                "gap-2",
                activeTab === item.id && "bg-gradient-primary text-primary-foreground shadow-glow"
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/50">
            <Zap className="w-4 h-4 text-secondary" />
            <span className="text-sm font-medium">FID: {userFID}</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-primary text-primary-foreground">
            <Wallet className="w-4 h-4" />
            <span className="text-sm font-bold">{userBalance}</span>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="flex md:hidden mt-4 gap-1">
        {navItems.map((item) => (
          <Button
            key={item.id}
            variant={activeTab === item.id ? "default" : "ghost"}
            onClick={() => onTabChange(item.id)}
            className={cn(
              "flex-1 gap-1 text-xs",
              activeTab === item.id && "bg-gradient-primary text-primary-foreground"
            )}
            size="sm"
          >
            <item.icon className="w-3 h-3" />
            {item.label}
          </Button>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;