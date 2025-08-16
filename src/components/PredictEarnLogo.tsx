import { TrendingUp } from "lucide-react";

const PredictEarnLogo = () => {
  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
          <TrendingUp className="w-5 h-5 text-primary-foreground" />
        </div>
        <div className="absolute inset-0 rounded-xl bg-gradient-primary opacity-50 blur-sm"></div>
      </div>
      <div className="flex flex-col">
        <h1 className="text-xl font-bold gradient-text">Predict-to-Earn</h1>
        <p className="text-xs text-muted-foreground">Onchain Predictions</p>
      </div>
    </div>
  );
};

export default PredictEarnLogo;