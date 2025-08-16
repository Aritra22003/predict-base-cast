import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Users, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface MarketCardProps {
  title: string;
  description: string;
  endTime: string;
  totalStaked: string;
  yesPercentage: number;
  noPercentage: number;
  participants: number;
  status: "active" | "ended" | "resolving";
  userPosition?: "yes" | "no" | null;
  onBet: (position: "yes" | "no") => void;
}

const MarketCard = ({
  title,
  description,
  endTime,
  totalStaked,
  yesPercentage,
  noPercentage,
  participants,
  status,
  userPosition,
  onBet,
}: MarketCardProps) => {
  return (
    <Card className="glass-card p-6 hover-glow transition-smooth">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-semibold text-card-foreground mb-2 line-clamp-2">
              {title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {description}
            </p>
          </div>
          <Badge
            variant={status === "active" ? "default" : "secondary"}
            className={cn(
              "ml-4",
              status === "active" && "bg-gradient-primary text-primary-foreground",
              status === "ended" && "bg-muted text-muted-foreground",
              status === "resolving" && "bg-gradient-secondary text-secondary-foreground"
            )}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="space-y-1">
            <div className="flex items-center justify-center gap-1 text-muted-foreground">
              <Clock className="w-3 h-3" />
              <span className="text-xs">Ends</span>
            </div>
            <p className="text-sm font-medium">{endTime}</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-center gap-1 text-muted-foreground">
              <Users className="w-3 h-3" />
              <span className="text-xs">Pool</span>
            </div>
            <p className="text-sm font-medium">{totalStaked}</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-center gap-1 text-muted-foreground">
              <Users className="w-3 h-3" />
              <span className="text-xs">Users</span>
            </div>
            <p className="text-sm font-medium">{participants}</p>
          </div>
        </div>

        {/* Betting Options */}
        <div className="space-y-3">
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => onBet("yes")}
              disabled={status !== "active"}
              className={cn(
                "flex-1 relative overflow-hidden border-success/30",
                "hover:bg-success/10 hover:border-success",
                userPosition === "yes" && "bg-success/20 border-success"
              )}
            >
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                <span>YES</span>
                <span className="font-bold">{yesPercentage}%</span>
              </div>
            </Button>
            <Button
              variant="outline"
              onClick={() => onBet("no")}
              disabled={status !== "active"}
              className={cn(
                "flex-1 relative overflow-hidden border-danger/30",
                "hover:bg-danger/10 hover:border-danger",
                userPosition === "no" && "bg-danger/20 border-danger"
              )}
            >
              <div className="flex items-center gap-2">
                <TrendingDown className="w-4 h-4" />
                <span>NO</span>
                <span className="font-bold">{noPercentage}%</span>
              </div>
            </Button>
          </div>

          {/* Progress Bar */}
          <div className="relative h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="absolute left-0 top-0 h-full bg-gradient-success transition-smooth"
              style={{ width: `${yesPercentage}%` }}
            />
            <div
              className="absolute right-0 top-0 h-full bg-gradient-danger transition-smooth"
              style={{ width: `${noPercentage}%` }}
            />
          </div>
        </div>

        {userPosition && (
          <div className="text-center">
            <Badge
              variant="secondary"
              className={cn(
                "text-xs",
                userPosition === "yes" && "bg-success/20 text-success-foreground",
                userPosition === "no" && "bg-danger/20 text-danger-foreground"
              )}
            >
              You predicted: {userPosition.toUpperCase()}
            </Badge>
          </div>
        )}
      </div>
    </Card>
  );
};

export default MarketCard;