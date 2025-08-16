import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Calendar, DollarSign, HelpCircle, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CreateMarketFormProps {
  onMarketCreated: () => void;
}

const CreateMarketForm = ({ onMarketCreated }: CreateMarketFormProps) => {
  const [formData, setFormData] = useState({
    question: "",
    description: "",
    endDate: "",
    stakeAmount: "0.01"
  });
  const [isCreating, setIsCreating] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.question || !formData.endDate) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setIsCreating(true);
    
    // Simulate market creation transaction
    setTimeout(() => {
      toast({
        title: "Market Created! 🎉",
        description: "Your prediction market is now live on Base",
      });
      setIsCreating(false);
      onMarketCreated();
      setFormData({ question: "", description: "", endDate: "", stakeAmount: "0.01" });
    }, 2000);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="glass-card p-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-cosmic flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-primary-foreground" />
              </div>
            </div>
            <h2 className="text-2xl font-bold gradient-text">Create Prediction Market</h2>
            <p className="text-muted-foreground">
              Launch your own prediction market on Base blockchain
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Question */}
            <div className="space-y-2">
              <Label htmlFor="question" className="text-card-foreground font-medium">
                Prediction Question *
              </Label>
              <Input
                id="question"
                value={formData.question}
                onChange={(e) => setFormData(prev => ({ ...prev, question: e.target.value }))}
                placeholder="Will ETH reach $3500 by August 30th?"
                className="bg-input border-border"
                required
              />
              <p className="text-xs text-muted-foreground">
                Make it clear and verifiable with a yes/no answer
              </p>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-card-foreground font-medium">
                Description
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Additional context about the prediction..."
                className="bg-input border-border min-h-[80px]"
                rows={3}
              />
            </div>

            {/* End Date */}
            <div className="space-y-2">
              <Label htmlFor="endDate" className="text-card-foreground font-medium">
                Resolution Date *
              </Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  id="endDate"
                  type="datetime-local"
                  value={formData.endDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                  className="bg-input border-border pl-10"
                  required
                />
              </div>
            </div>

            {/* Stake Amount */}
            <div className="space-y-2">
              <Label htmlFor="stakeAmount" className="text-card-foreground font-medium">
                Minimum Stake Amount (ETH)
              </Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  id="stakeAmount"
                  type="number"
                  step="0.001"
                  min="0.001"
                  value={formData.stakeAmount}
                  onChange={(e) => setFormData(prev => ({ ...prev, stakeAmount: e.target.value }))}
                  className="bg-input border-border pl-10"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Users must stake at least this amount to participate
              </p>
            </div>

            {/* Cost Breakdown */}
            <Card className="bg-muted/20 border-muted p-4">
              <div className="flex items-start gap-3">
                <HelpCircle className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div className="space-y-2">
                  <h4 className="font-medium text-card-foreground">Creation Cost</h4>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div className="flex justify-between">
                      <span>Gas Fee (estimated):</span>
                      <span>~0.002 ETH</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Platform Fee:</span>
                      <span>2%</span>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    Deployed on Base Network
                  </Badge>
                </div>
              </div>
            </Card>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isCreating}
              className="w-full bg-gradient-primary text-primary-foreground hover:opacity-90 shadow-glow h-12 text-lg font-semibold"
            >
              {isCreating ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Creating Market...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Create Market
                </div>
              )}
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default CreateMarketForm;