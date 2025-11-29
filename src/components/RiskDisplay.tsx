import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, CheckCircle, AlertTriangle } from "lucide-react";

interface RiskDisplayProps {
  riskScore: number;
  contributors: Array<{ factor: string; weight: number; contribution: number }>;
}

export const RiskDisplay = ({ riskScore, contributors }: RiskDisplayProps) => {
  const getRiskLevel = (score: number) => {
    if (score < 30) return { level: 'Low', color: 'clinical-low', icon: CheckCircle };
    if (score < 60) return { level: 'Moderate', color: 'clinical-moderate', icon: AlertTriangle };
    return { level: 'High', color: 'clinical-high', icon: AlertCircle };
  };

  const risk = getRiskLevel(riskScore);
  const RiskIcon = risk.icon;

  const sortedContributors = [...contributors].sort((a, b) => b.contribution - a.contribution);
  const topContributors = sortedContributors.slice(0, 5);

  return (
    <div className="space-y-6">
      <Card className="p-8 bg-gradient-medical shadow-elevated border-2 border-primary/20">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className={`rounded-full p-4 bg-${risk.color}/10`}>
              <RiskIcon className={`w-12 h-12 text-${risk.color}`} />
            </div>
          </div>
          <div>
            <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-2">
              Difficult Intubation Probability
            </h2>
            <div className="text-6xl font-bold text-foreground mb-1">
              {riskScore}%
            </div>
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-${risk.color}/10 text-${risk.color} font-semibold`}>
              {risk.level} Risk
            </div>
          </div>
          <Progress 
            value={riskScore} 
            className="h-3 bg-muted"
          />
        </div>
      </Card>

      <Card className="p-6 bg-clinical-surface shadow-clinical">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-primary" />
          Top Contributing Factors
        </h3>
        <div className="space-y-4">
          {topContributors.map((contributor, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-foreground">{contributor.factor}</span>
                <span className="text-sm font-semibold text-primary">+{contributor.contribution}%</span>
              </div>
              <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="absolute top-0 left-0 h-full bg-primary transition-all duration-500"
                  style={{ width: `${(contributor.contribution / riskScore) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6 bg-clinical-surface shadow-clinical">
        <h3 className="text-lg font-semibold text-foreground mb-4">Risk Interpretation</h3>
        <div className="space-y-3 text-sm text-foreground/90">
          {riskScore < 30 && (
            <>
              <p className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-clinical-low shrink-0 mt-0.5" />
                <span>Standard airway management approach is likely sufficient.</span>
              </p>
              <p className="ml-7 text-muted-foreground">
                Routine preparation with standard equipment. Clinical vigilance maintained.
              </p>
            </>
          )}
          {riskScore >= 30 && riskScore < 60 && (
            <>
              <p className="flex items-start gap-2">
                <AlertTriangle className="w-5 h-5 text-clinical-moderate shrink-0 mt-0.5" />
                <span>Enhanced airway preparation recommended.</span>
              </p>
              <p className="ml-7 text-muted-foreground">
                Consider video laryngoscopy, have backup devices readily available, and ensure experienced personnel present.
              </p>
            </>
          )}
          {riskScore >= 60 && (
            <>
              <p className="flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-clinical-high shrink-0 mt-0.5" />
                <span>High-risk airway requiring specialized planning.</span>
              </p>
              <p className="ml-7 text-muted-foreground">
                Consider awake fiberoptic intubation, ensure senior anaesthesiologist present, have complete difficult airway cart available.
              </p>
            </>
          )}
        </div>
      </Card>
    </div>
  );
};
