import React from 'react';
import { useProjectSetup } from '@/contexts/ProjectSetupContext';
import { IdeaCapture } from './IdeaCapture';
import { TechStackSelection } from './TechStackSelection';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const steps = [
  { id: 'idea', label: 'Project Idea' },
  { id: 'refinement', label: 'Refinement' },
  { id: 'tech-stack', label: 'Tech Stack' },
  { id: 'implementation', label: 'Implementation' },
];

export const ProjectSetup: React.FC = () => {
  const { state } = useProjectSetup();
  
  const currentStepIndex = steps.findIndex(step => step.id === state.currentStep);
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  const renderCurrentStep = () => {
    switch (state.currentStep) {
      case 'idea':
        return <IdeaCapture />;
      case 'tech-stack':
        return <TechStackSelection />;
      case 'refinement':
      case 'implementation':
        return (
          <Card className="p-6 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">
              {state.currentStep === 'refinement' ? 'Refining Your Idea' : 'Implementing Your Project'}
            </h2>
            <p className="text-muted-foreground">
              This section is under development...
            </p>
          </Card>
        );
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-2xl mx-auto mb-8">
        <div className="flex justify-between mb-2">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`text-sm ${
                index <= currentStepIndex ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              {step.label}
            </div>
          ))}
        </div>
        <Progress value={progress} className="h-2" />
      </div>
      {renderCurrentStep()}
    </div>
  );
};
