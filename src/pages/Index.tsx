import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
import MarketCard from "@/components/MarketCard";
import CreateMarketForm from "@/components/CreateMarketForm";
import LeaderboardCard from "@/components/LeaderboardCard";
import UserProfile from "@/components/UserProfile";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Filter, TrendingUp, Users, DollarSign } from "lucide-react";
import { mockMarkets, mockLeaderboard, type Market } from "@/data/mockData";
import heroImage from "@/assets/hero-bg.jpg";

const Index = () => {
  const [activeTab, setActiveTab] = useState("markets");
  const [searchQuery, setSearchQuery] = useState("");
  const [markets, setMarkets] = useState<Market[]>(mockMarkets);
  const { toast } = useToast();

  const handleBet = (marketId: string, position: "yes" | "no") => {
    toast({
      title: `Bet Placed! 🎯`,
      description: `You predicted "${position.toUpperCase()}" - Transaction submitted to Base`,
    });
    
    // Update market with user position
    setMarkets(prev => prev.map(market => 
      market.id === marketId 
        ? { ...market, userPosition: position }
        : market
    ));
  };

  const handleMarketCreated = () => {
    setActiveTab("markets");
  };

  const filteredMarkets = markets.filter(market =>
    market.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    market.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderContent = () => {
    switch (activeTab) {
      case "create":
        return <CreateMarketForm onMarketCreated={handleMarketCreated} />;
      
      case "profile":
        return <UserProfile />;
      
      case "leaderboard":
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold gradient-text mb-2">Leaderboard</h2>
              <p className="text-muted-foreground">Top predictors on the Base network</p>
            </div>
            <div className="space-y-4">
              {mockLeaderboard.map((entry) => (
                <LeaderboardCard key={entry.rank} entry={entry} />
              ))}
            </div>
          </div>
        );
      
      default:
        return (
          <div className="space-y-6">
            {/* Hero Section */}
            <div 
              className="relative rounded-2xl overflow-hidden p-8 md:p-12"
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${heroImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="relative z-10 text-center space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold gradient-text">
                  Predict the Future
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                  Make onchain predictions on trending topics and earn rewards on Base
                </p>
                <div className="flex flex-wrap justify-center gap-4 mt-6">
                  <Badge variant="secondary" className="px-4 py-2 text-sm">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    {markets.filter(m => m.status === "active").length} Active Markets
                  </Badge>
                  <Badge variant="secondary" className="px-4 py-2 text-sm">
                    <Users className="w-4 h-4 mr-2" />
                    {mockLeaderboard.length}+ Users
                  </Badge>
                  <Badge variant="secondary" className="px-4 py-2 text-sm">
                    <DollarSign className="w-4 h-4 mr-2" />
                    Base Network
                  </Badge>
                </div>
              </div>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search markets..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-input border-border"
                />
              </div>
              <Button variant="outline" className="gap-2">
                <Filter className="w-4 h-4" />
                Filter
              </Button>
            </div>

            {/* Markets Grid */}
            <div className="grid gap-6 md:grid-cols-2">
              {filteredMarkets.map((market) => (
                <MarketCard
                  key={market.id}
                  title={market.title}
                  description={market.description}
                  endTime={market.endTime}
                  totalStaked={market.totalStaked}
                  yesPercentage={market.yesPercentage}
                  noPercentage={market.noPercentage}
                  participants={market.participants}
                  status={market.status}
                  userPosition={market.userPosition}
                  onBet={(position) => handleBet(market.id, position)}
                />
              ))}
            </div>

            {filteredMarkets.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No markets found matching your search.</p>
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        <Navigation
          activeTab={activeTab}
          onTabChange={setActiveTab}
          userBalance="2.34 ETH"
          userFID="11111"
        />
        {renderContent()}
      </div>
    </div>
  );
};

export default Index;
