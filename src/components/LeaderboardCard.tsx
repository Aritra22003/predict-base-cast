import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Trophy, TrendingUp, Target, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface LeaderboardEntry {
  rank: number;
  fid: string;
  username: string;
  totalEarnings: string;
  winRate: number;
  totalPredictions: number;
  streak: number;
  isCurrentUser?: boolean;
}

interface LeaderboardCardProps {
  entry: LeaderboardEntry;
}

const LeaderboardCard = ({ entry }: LeaderboardCardProps) => {
  const getRankIcon = (rank: number) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return rank.toString();
  };

  const getRankColor = (rank: number) => {
    if (rank === 1) return "text-yellow-400";
    if (rank === 2) return "text-gray-300";
    if (rank === 3) return "text-amber-600";
    return "text-muted-foreground";
  };

  return (
    <Card className={cn(
      "glass-card p-4 transition-smooth",
      entry.isCurrentUser && "ring-2 ring-primary shadow-glow",
      "hover:shadow-soft"
    )}>
      <div className="flex items-center gap-4">
        {/* Rank */}
        <div className={cn(
          "flex items-center justify-center w-12 h-12 rounded-xl font-bold text-lg",
          entry.rank <= 3 ? "bg-gradient-cosmic" : "bg-muted",
          getRankColor(entry.rank)
        )}>
          {getRankIcon(entry.rank)}
        </div>

        {/* User Info */}
        <div className="flex items-center gap-3 flex-1">
          <Avatar className="w-10 h-10">
            <AvatarFallback className="bg-gradient-primary text-primary-foreground font-bold">
              {entry.username.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-card-foreground truncate">
                {entry.username}
              </h3>
              {entry.isCurrentUser && (
                <Badge variant="secondary" className="text-xs">You</Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground">FID: {entry.fid}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
          <div className="space-y-1">
            <div className="flex items-center justify-center gap-1 text-muted-foreground">
              <Trophy className="w-3 h-3" />
            </div>
            <p className="text-sm font-bold text-success">{entry.totalEarnings}</p>
            <p className="text-xs text-muted-foreground">Earnings</p>
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center justify-center gap-1 text-muted-foreground">
              <TrendingUp className="w-3 h-3" />
            </div>
            <p className="text-sm font-bold">{entry.winRate}%</p>
            <p className="text-xs text-muted-foreground">Win Rate</p>
          </div>
          
          <div className="space-y-1 hidden md:block">
            <div className="flex items-center justify-center gap-1 text-muted-foreground">
              <Target className="w-3 h-3" />
            </div>
            <p className="text-sm font-bold">{entry.totalPredictions}</p>
            <p className="text-xs text-muted-foreground">Predictions</p>
          </div>
          
          <div className="space-y-1 hidden md:block">
            <div className="flex items-center justify-center gap-1 text-muted-foreground">
              <Zap className="w-3 h-3" />
            </div>
            <p className="text-sm font-bold text-secondary">{entry.streak}</p>
            <p className="text-xs text-muted-foreground">Streak</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default LeaderboardCard;