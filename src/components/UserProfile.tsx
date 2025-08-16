import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Trophy, 
  TrendingUp, 
  Target, 
  Zap, 
  Calendar,
  DollarSign,
  Award,
  Lock,
  CheckCircle
} from "lucide-react";
import { mockUserProfile } from "@/data/mockData";

const UserProfile = () => {
  const profile = mockUserProfile;

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card className="glass-card p-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="relative">
            <Avatar className="w-24 h-24">
              <AvatarFallback className="bg-gradient-primary text-primary-foreground text-2xl font-bold">
                {profile.username.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-cosmic rounded-full flex items-center justify-center">
              <Zap className="w-4 h-4 text-primary-foreground" />
            </div>
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold gradient-text mb-2">{profile.username}</h1>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-muted-foreground">
              <div className="flex items-center gap-1">
                <Zap className="w-4 h-4" />
                <span>FID: {profile.fid}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>Joined {profile.joinedDate}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="cosmic" className="gap-2">
              <Award className="w-4 h-4" />
              Share Profile
            </Button>
          </div>
        </div>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="glass-card p-4 text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-gradient-success rounded-xl mx-auto mb-3">
            <Trophy className="w-6 h-6 text-success-foreground" />
          </div>
          <p className="text-2xl font-bold text-success">{profile.totalEarnings}</p>
          <p className="text-sm text-muted-foreground">Total Earnings</p>
        </Card>

        <Card className="glass-card p-4 text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-gradient-primary rounded-xl mx-auto mb-3">
            <TrendingUp className="w-6 h-6 text-primary-foreground" />
          </div>
          <p className="text-2xl font-bold">{profile.winRate}%</p>
          <p className="text-sm text-muted-foreground">Win Rate</p>
        </Card>

        <Card className="glass-card p-4 text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-gradient-secondary rounded-xl mx-auto mb-3">
            <Target className="w-6 h-6 text-secondary-foreground" />
          </div>
          <p className="text-2xl font-bold">{profile.totalPredictions}</p>
          <p className="text-sm text-muted-foreground">Predictions</p>
        </Card>

        <Card className="glass-card p-4 text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-gradient-cosmic rounded-xl mx-auto mb-3">
            <Zap className="w-6 h-6 text-primary-foreground" />
          </div>
          <p className="text-2xl font-bold text-secondary">{profile.currentStreak}</p>
          <p className="text-sm text-muted-foreground">Current Streak</p>
        </Card>
      </div>

      {/* Detailed Stats */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="glass-card p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <DollarSign className="w-5 h-5" />
            Financial Summary
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Total Staked</span>
              <span className="font-semibold">{profile.totalStaked}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Total Earnings</span>
              <span className="font-semibold text-success">{profile.totalEarnings}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Net Profit</span>
              <span className="font-semibold text-success">
                {(parseFloat(profile.totalEarnings.split(' ')[0]) - parseFloat(profile.totalStaked.split(' ')[0])).toFixed(1)} ETH
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">ROI</span>
              <span className="font-semibold text-success">
                {(((parseFloat(profile.totalEarnings.split(' ')[0]) / parseFloat(profile.totalStaked.split(' ')[0])) - 1) * 100).toFixed(1)}%
              </span>
            </div>
          </div>
        </Card>

        <Card className="glass-card p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Target className="w-5 h-5" />
            Prediction Stats
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Correct Predictions</span>
              <span className="font-semibold">{profile.correctPredictions}/{profile.totalPredictions}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Win Rate</span>
              <span className="font-semibold">{profile.winRate}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Current Streak</span>
              <span className="font-semibold text-secondary">{profile.currentStreak}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Best Streak</span>
              <span className="font-semibold">{profile.longestStreak}</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Achievements */}
      <Card className="glass-card p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Award className="w-5 h-5" />
          Achievements
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {profile.achievements.map((achievement, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border transition-smooth ${
                achievement.unlocked
                  ? "bg-gradient-primary/10 border-primary/30"
                  : "bg-muted/20 border-muted opacity-50"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  achievement.unlocked
                    ? "bg-gradient-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}>
                  {achievement.unlocked ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <Lock className="w-5 h-5" />
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{achievement.name}</h4>
                  <p className="text-xs text-muted-foreground">{achievement.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default UserProfile;