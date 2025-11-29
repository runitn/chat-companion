import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";

interface AssessmentFormProps {
  formData: any;
  onChange: (field: string, value: any) => void;
}

export const AssessmentForm = ({ formData, onChange }: AssessmentFormProps) => {
  return (
    <div className="space-y-6">
      <Card className="p-6 bg-clinical-surface shadow-clinical">
        <h3 className="text-lg font-semibold text-foreground mb-4">Patient Demographics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="age">Age (years)</Label>
            <Input
              id="age"
              type="number"
              value={formData.age}
              onChange={(e) => onChange('age', parseInt(e.target.value) || 0)}
              placeholder="Enter age"
              className="bg-background"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="gender">Gender</Label>
            <Select value={formData.gender} onValueChange={(value) => onChange('gender', value)}>
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="weight">Weight (kg)</Label>
            <Input
              id="weight"
              type="number"
              value={formData.weight}
              onChange={(e) => onChange('weight', parseFloat(e.target.value) || 0)}
              placeholder="Enter weight"
              className="bg-background"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="height">Height (cm)</Label>
            <Input
              id="height"
              type="number"
              value={formData.height}
              onChange={(e) => onChange('height', parseFloat(e.target.value) || 0)}
              placeholder="Enter height"
              className="bg-background"
            />
          </div>
        </div>
        {formData.weight > 0 && formData.height > 0 && (
          <div className="mt-3 text-sm text-muted-foreground">
            BMI: <span className="font-semibold text-foreground">
              {(formData.weight / ((formData.height / 100) ** 2)).toFixed(1)}
            </span>
          </div>
        )}
      </Card>

      <Card className="p-6 bg-clinical-surface shadow-clinical">
        <h3 className="text-lg font-semibold text-foreground mb-4">Airway Anatomy Assessment</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="mallampati">Mallampati Score</Label>
            <Select value={formData.mallampati} onValueChange={(value) => onChange('mallampati', value)}>
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="Select score" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Class I</SelectItem>
                <SelectItem value="2">Class II</SelectItem>
                <SelectItem value="3">Class III</SelectItem>
                <SelectItem value="4">Class IV</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="tmd">Thyromental Distance (cm)</Label>
            <Input
              id="tmd"
              type="number"
              step="0.1"
              value={formData.tmd}
              onChange={(e) => onChange('tmd', parseFloat(e.target.value) || 0)}
              placeholder="Enter distance"
              className="bg-background"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="interIncisor">Inter-Incisor Gap (cm)</Label>
            <Input
              id="interIncisor"
              type="number"
              step="0.1"
              value={formData.interIncisor}
              onChange={(e) => onChange('interIncisor', parseFloat(e.target.value) || 0)}
              placeholder="Enter gap"
              className="bg-background"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="neckMobility">Neck Mobility</Label>
            <Select value={formData.neckMobility} onValueChange={(value) => onChange('neckMobility', value)}>
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="Select mobility" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="normal">Normal (&gt;90°)</SelectItem>
                <SelectItem value="reduced">Reduced (60-90°)</SelectItem>
                <SelectItem value="severely-reduced">Severely Reduced (&lt;60°)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="jawProtrusion">Jaw Protrusion</Label>
            <Select value={formData.jawProtrusion} onValueChange={(value) => onChange('jawProtrusion', value)}>
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="Select ability" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="grade-a">Grade A (Lower incisors beyond upper)</SelectItem>
                <SelectItem value="grade-b">Grade B (Lower incisors to upper lip)</SelectItem>
                <SelectItem value="grade-c">Grade C (Cannot reach upper lip)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="ulbt">Upper Lip Bite Test (ULBT)</Label>
            <Select value={formData.ulbt} onValueChange={(value) => onChange('ulbt', value)}>
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="Select class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Class I (Can cover upper lip)</SelectItem>
                <SelectItem value="2">Class II (Partial coverage)</SelectItem>
                <SelectItem value="3">Class III (Cannot reach upper lip)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-clinical-surface shadow-clinical">
        <h3 className="text-lg font-semibold text-foreground mb-4">Medical History</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="osa">Obstructive Sleep Apnea</Label>
            <Select value={formData.osa} onValueChange={(value) => onChange('osa', value)}>
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="suspected">Suspected</SelectItem>
                <SelectItem value="diagnosed">Diagnosed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="arthritis">Arthritis/Limited Mobility</Label>
            <Select value={formData.arthritis} onValueChange={(value) => onChange('arthritis', value)}>
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="mild">Mild</SelectItem>
                <SelectItem value="moderate">Moderate</SelectItem>
                <SelectItem value="severe">Severe</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="radiationHistory">Head/Neck Radiation History</Label>
            <Select value={formData.radiationHistory} onValueChange={(value) => onChange('radiationHistory', value)}>
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="yes">Yes</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="previousDifficulty">Previous Difficult Airway</Label>
            <Select value={formData.previousDifficulty} onValueChange={(value) => onChange('previousDifficulty', value)}>
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="Select history" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None Documented</SelectItem>
                <SelectItem value="difficult-laryngoscopy">Difficult Laryngoscopy</SelectItem>
                <SelectItem value="difficult-ventilation">Difficult Ventilation</SelectItem>
                <SelectItem value="both">Both</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>
    </div>
  );
};
