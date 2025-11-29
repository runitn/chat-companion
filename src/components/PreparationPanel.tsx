import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Package, AlertTriangle, Users } from "lucide-react";

interface PreparationPanelProps {
  riskScore: number;
}

export const PreparationPanel = ({ riskScore }: PreparationPanelProps) => {
  const getRecommendations = (score: number) => {
    if (score < 30) {
      return {
        approach: "Standard Airway Management",
        equipment: [
          "Standard laryngoscope with appropriate blades",
          "Endotracheal tubes (multiple sizes)",
          "Stylet",
          "Suction available"
        ],
        personnel: [
          "Single anaesthesiologist",
          "Standard OR team"
        ],
        backup: [
          "LMA available",
          "Bougie readily accessible"
        ]
      };
    } else if (score < 60) {
      return {
        approach: "Enhanced Preparation - Video Laryngoscopy First",
        equipment: [
          "Video laryngoscope (primary device)",
          "Hyperangulated blade",
          "Bougie/stylet",
          "Multiple LMA sizes",
          "Standard direct laryngoscope backup"
        ],
        personnel: [
          "Experienced anaesthesiologist",
          "Second anaesthesiologist on standby",
          "Skilled assistant"
        ],
        backup: [
          "Flexible bronchoscope available",
          "Cricothyrotomy kit at bedside",
          "Multiple rescue devices prepared"
        ]
      };
    } else {
      return {
        approach: "High-Risk Strategy - Consider Awake Technique",
        equipment: [
          "Flexible fiberoptic bronchoscope (primary)",
          "Video laryngoscope prepared",
          "Complete difficult airway cart",
          "LMAs (all sizes)",
          "Cricothyrotomy kit open and ready"
        ],
        personnel: [
          "Senior consultant anaesthesiologist",
          "Second experienced anaesthesiologist present",
          "ENT surgeon on standby",
          "Skilled airway assistant"
        ],
        backup: [
          "Front-of-neck access prepared",
          "ECMO team notification (if available)",
          "Multiple rescue device strategies planned"
        ]
      };
    }
  };

  const recommendations = getRecommendations(riskScore);

  return (
    <Card className="p-6 bg-clinical-surface shadow-elevated">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-bold text-foreground">Airway Management Plan</h2>
          <Badge variant="outline" className="text-primary border-primary">
            ASA Guidelines Based
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          Guideline-based recommendations tailored to predicted difficulty level
        </p>
      </div>

      <div className="space-y-6">
        <div className="p-4 bg-primary/5 border-l-4 border-primary rounded-r">
          <h3 className="font-semibold text-foreground mb-1">Recommended Approach</h3>
          <p className="text-sm text-foreground/90">{recommendations.approach}</p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-foreground">
            <Package className="w-5 h-5 text-primary" />
            <h3 className="font-semibold">Primary Equipment</h3>
          </div>
          <ul className="space-y-2 ml-7">
            {recommendations.equipment.map((item, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-clinical-low shrink-0 mt-0.5" />
                <span className="text-foreground/90">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-foreground">
            <Users className="w-5 h-5 text-primary" />
            <h3 className="font-semibold">Personnel Requirements</h3>
          </div>
          <ul className="space-y-2 ml-7">
            {recommendations.personnel.map((item, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-clinical-low shrink-0 mt-0.5" />
                <span className="text-foreground/90">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-foreground">
            <AlertTriangle className="w-5 h-5 text-warning" />
            <h3 className="font-semibold">Backup Plan & Rescue Devices</h3>
          </div>
          <ul className="space-y-2 ml-7">
            {recommendations.backup.map((item, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-warning shrink-0 mt-0.5" />
                <span className="text-foreground/90">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {riskScore >= 60 && (
          <div className="mt-4 p-4 bg-clinical-high/10 border border-clinical-high/30 rounded">
            <p className="text-sm font-medium text-clinical-high">
              ⚠️ High-risk airway: Consider awake fiberoptic intubation as primary strategy. 
              Discuss with patient and document consent for awake technique.
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};
