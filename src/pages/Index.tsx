import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AssessmentForm } from "@/components/AssessmentForm";
import { RiskDisplay } from "@/components/RiskDisplay";
import { PreparationPanel } from "@/components/PreparationPanel";
import { Stethoscope, Calculator } from "lucide-react";

const Index = () => {
  const [formData, setFormData] = useState({
    age: 0,
    gender: "",
    weight: 0,
    height: 0,
    mallampati: "",
    tmd: 0,
    interIncisor: 0,
    neckMobility: "",
    jawProtrusion: "",
    ulbt: "",
    osa: "",
    arthritis: "",
    radiationHistory: "",
    previousDifficulty: ""
  });

  const [showResults, setShowResults] = useState(false);

  const handleFormChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculateRisk = () => {
    let totalRisk = 0;
    const contributors: Array<{ factor: string; weight: number; contribution: number }> = [];

    // BMI calculation and contribution
    if (formData.weight > 0 && formData.height > 0) {
      const bmi = formData.weight / ((formData.height / 100) ** 2);
      if (bmi >= 35) {
        const contribution = 18;
        totalRisk += contribution;
        contributors.push({ factor: "Severe Obesity (BMI ≥35)", weight: 0.18, contribution });
      } else if (bmi >= 30) {
        const contribution = 10;
        totalRisk += contribution;
        contributors.push({ factor: "Obesity (BMI 30-35)", weight: 0.10, contribution });
      }
    }

    // Mallampati contribution
    const mallampatiScores: { [key: string]: number } = { "1": 0, "2": 5, "3": 15, "4": 22 };
    if (formData.mallampati && mallampatiScores[formData.mallampati] !== undefined) {
      const contribution = mallampatiScores[formData.mallampati];
      if (contribution > 0) {
        totalRisk += contribution;
        contributors.push({ factor: `Mallampati Class ${formData.mallampati}`, weight: 0.22, contribution });
      }
    }

    // TMD contribution
    if (formData.tmd > 0 && formData.tmd < 6.5) {
      const contribution = formData.tmd < 6 ? 16 : 8;
      totalRisk += contribution;
      contributors.push({ factor: "Reduced Thyromental Distance", weight: 0.16, contribution });
    }

    // Inter-incisor gap
    if (formData.interIncisor > 0 && formData.interIncisor < 3.5) {
      const contribution = 14;
      totalRisk += contribution;
      contributors.push({ factor: "Limited Mouth Opening", weight: 0.14, contribution });
    }

    // Neck mobility
    const neckMobilityScores: { [key: string]: number } = { 
      "normal": 0, 
      "reduced": 12, 
      "severely-reduced": 20 
    };
    if (formData.neckMobility && neckMobilityScores[formData.neckMobility] !== undefined) {
      const contribution = neckMobilityScores[formData.neckMobility];
      if (contribution > 0) {
        totalRisk += contribution;
        contributors.push({ factor: "Reduced Neck Mobility", weight: 0.20, contribution });
      }
    }

    // Jaw protrusion
    const jawScores: { [key: string]: number } = { "grade-a": 0, "grade-b": 8, "grade-c": 17 };
    if (formData.jawProtrusion && jawScores[formData.jawProtrusion] !== undefined) {
      const contribution = jawScores[formData.jawProtrusion];
      if (contribution > 0) {
        totalRisk += contribution;
        contributors.push({ factor: "Limited Jaw Protrusion", weight: 0.17, contribution });
      }
    }

    // ULBT
    const ulbtScores: { [key: string]: number } = { "1": 0, "2": 9, "3": 15 };
    if (formData.ulbt && ulbtScores[formData.ulbt] !== undefined) {
      const contribution = ulbtScores[formData.ulbt];
      if (contribution > 0) {
        totalRisk += contribution;
        contributors.push({ factor: `ULBT Class ${formData.ulbt}`, weight: 0.15, contribution });
      }
    }

    // OSA
    const osaScores: { [key: string]: number } = { "none": 0, "suspected": 8, "diagnosed": 13 };
    if (formData.osa && osaScores[formData.osa] !== undefined) {
      const contribution = osaScores[formData.osa];
      if (contribution > 0) {
        totalRisk += contribution;
        contributors.push({ factor: "Obstructive Sleep Apnea", weight: 0.13, contribution });
      }
    }

    // Arthritis
    const arthritisScores: { [key: string]: number } = { 
      "none": 0, "mild": 5, "moderate": 10, "severe": 16 
    };
    if (formData.arthritis && arthritisScores[formData.arthritis] !== undefined) {
      const contribution = arthritisScores[formData.arthritis];
      if (contribution > 0) {
        totalRisk += contribution;
        contributors.push({ factor: "Arthritis/Limited Mobility", weight: 0.16, contribution });
      }
    }

    // Radiation history
    if (formData.radiationHistory === "yes") {
      const contribution = 14;
      totalRisk += contribution;
      contributors.push({ factor: "Head/Neck Radiation History", weight: 0.14, contribution });
    }

    // Previous difficulty
    const previousDifficultyScores: { [key: string]: number } = { 
      "none": 0, 
      "difficult-laryngoscopy": 25, 
      "difficult-ventilation": 22, 
      "both": 35 
    };
    if (formData.previousDifficulty && previousDifficultyScores[formData.previousDifficulty] !== undefined) {
      const contribution = previousDifficultyScores[formData.previousDifficulty];
      if (contribution > 0) {
        totalRisk += contribution;
        contributors.push({ factor: "Previous Difficult Airway", weight: 0.35, contribution });
      }
    }

    // Age factor
    if (formData.age > 55) {
      const contribution = 6;
      totalRisk += contribution;
      contributors.push({ factor: "Age >55 years", weight: 0.06, contribution });
    }

    return {
      score: Math.min(Math.round(totalRisk), 100),
      contributors
    };
  };

  const handleCalculate = () => {
    setShowResults(true);
  };

  const handleReset = () => {
    setFormData({
      age: 0,
      gender: "",
      weight: 0,
      height: 0,
      mallampati: "",
      tmd: 0,
      interIncisor: 0,
      neckMobility: "",
      jawProtrusion: "",
      ulbt: "",
      osa: "",
      arthritis: "",
      radiationHistory: "",
      previousDifficulty: ""
    });
    setShowResults(false);
  };

  const riskData = calculateRisk();

  return (
    <div className="min-h-screen bg-clinical-bg">
      {/* Header */}
      <header className="bg-clinical-surface shadow-clinical border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Stethoscope className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">AirwayPredict</h1>
              <p className="text-sm text-muted-foreground">
                Clinical Scoring System for Difficult Intubation Prediction
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Assessment Form */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">Patient Assessment</h2>
              {showResults && (
                <Button onClick={handleReset} variant="outline" size="sm">
                  Reset Form
                </Button>
              )}
            </div>
            <AssessmentForm formData={formData} onChange={handleFormChange} />
            {!showResults && (
              <Button 
                onClick={handleCalculate} 
                className="w-full h-12 text-lg font-semibold"
                size="lg"
              >
                <Calculator className="w-5 h-5 mr-2" />
                Calculate Risk Score
              </Button>
            )}
          </div>

          {/* Right Column - Results */}
          <div className="space-y-6">
            {showResults ? (
              <>
                <h2 className="text-2xl font-bold text-foreground">Assessment Results</h2>
                <RiskDisplay riskScore={riskData.score} contributors={riskData.contributors} />
                <PreparationPanel riskScore={riskData.score} />
              </>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center text-muted-foreground space-y-4 p-8">
                  <Calculator className="w-16 h-16 mx-auto opacity-20" />
                  <p className="text-lg">Complete the patient assessment and click "Calculate Risk Score" to view results</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-border bg-clinical-surface">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-sm text-muted-foreground space-y-2">
            <p className="font-medium">
              ⚠️ Clinical Decision Support Tool - Not a Replacement for Clinical Judgement
            </p>
            <p className="text-xs">
              This tool provides predictions based on established anatomical and clinical risk factors. 
              Final airway management decisions must be made by qualified anaesthesiologists considering all clinical context.
            </p>
            <p className="text-xs">
              Based on ASA Difficult Airway Guidelines and validated clinical scoring systems.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
