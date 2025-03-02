import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { toast } from '../ui/use-toast';
import IdeaRefinement from './IdeaRefinement';
import TechStackSelection from './TechStackSelection';
import FolderStructure from './FolderStructure';
import Implementation from './Implementation';
import { generateCode, fixCodeErrors, validateCode } from '../../services/codeGeneration';
import { previewService } from '../../services/previewService';
import { aiService } from '../../services/aiService';
import type { ProjectState, Step } from '../../types/project';

const steps: Step[] = [
  { id: 'ideaRefinement', label: 'Idea Refinement' },
  { id: 'techStack', label: 'Tech Stack' },
  { id: 'folderStructure', label: 'Project Structure' },
  { id: 'implementation', label: 'Implementation' },
];

export default function ProjectFlow() {
  const [currentStep, setCurrentStep] = useState<string>('ideaRefinement');
  const [projectState, setProjectState] = useState<ProjectState>({
    originalPrompt: '',
    refinedIdea: {
      coreFunctionality: [],
      features: [],
      requirements: [],
      constraints: [],
    },
    techStack: {
      frontend: [],
      backend: [],
      database: [],
      deployment: [],
    },
    folderStructure: {
      root: '',
      directories: [],
    },
    generatedCode: {
      files: {},
      errors: [],
    },
    preview: null,
  });

  const handleStepComplete = async (stepId: string, data: any) => {
    setProjectState(prev => ({
      ...prev,
      ...data,
    }));

    if (stepId === 'implementation') {
      try {
        // Generate initial code
        const generatedCode = await generateCode({
          prompt: projectState.originalPrompt,
          refinedIdea: projectState.refinedIdea,
          techStack: projectState.techStack,
          folderStructure: projectState.folderStructure,
        });

        // Validate and fix any errors
        const errors = await validateCode(generatedCode.files);
        if (errors.length > 0) {
          const fixedCode = await fixCodeErrors(generatedCode.files, errors);
          setProjectState(prev => ({
            ...prev,
            generatedCode: fixedCode,
          }));
        } else {
          setProjectState(prev => ({
            ...prev,
            generatedCode,
          }));
        }

        // Create preview
        const preview = await previewService.createPreview({
          files: generatedCode.files,
          dependencies: projectState.techStack,
          entry: 'src/index.tsx',
        });

        setProjectState(prev => ({
          ...prev,
          preview,
        }));

        toast({
          title: 'Success',
          description: 'Your project has been generated successfully!',
        });
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to generate project. Please try again.',
          variant: 'destructive',
        });
      }
    } else {
      const nextStepIndex = steps.findIndex(step => step.id === stepId) + 1;
      if (nextStepIndex < steps.length) {
        setCurrentStep(steps[nextStepIndex].id);
      }
    }
  };

  const getCurrentComponent = () => {
    switch (currentStep) {
      case 'ideaRefinement':
        return (
          <IdeaRefinement
            onComplete={(data) => handleStepComplete('ideaRefinement', data)}
            initialData={projectState}
          />
        );
      case 'techStack':
        return (
          <TechStackSelection
            onComplete={(data) => handleStepComplete('techStack', data)}
            initialData={projectState}
          />
        );
      case 'folderStructure':
        return (
          <FolderStructure
            onComplete={(data) => handleStepComplete('folderStructure', data)}
            initialData={projectState}
          />
        );
      case 'implementation':
        return (
          <Implementation
            onComplete={(data) => handleStepComplete('implementation', data)}
            projectState={projectState}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className={`flex items-center ${
              index < steps.length - 1 ? 'flex-1' : ''
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step.id === currentStep
                  ? 'bg-primary text-primary-foreground'
                  : steps.findIndex(s => s.id === currentStep) > index
                  ? 'bg-primary/20'
                  : 'bg-muted'
              }`}
            >
              {index + 1}
            </div>
            {index < steps.length - 1 && (
              <div
                className={`h-1 flex-1 mx-2 ${
                  steps.findIndex(s => s.id === currentStep) > index
                    ? 'bg-primary/20'
                    : 'bg-muted'
                }`}
              />
            )}
            <span className="text-sm font-medium">{step.label}</span>
          </div>
        ))}
      </div>

      <Card className="p-6">
        {getCurrentComponent()}
      </Card>
    </div>
  );
} 