import React from 'react';
import { useProjectSetup } from '@/contexts/ProjectSetupContext';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';

interface TechOption {
  id: string;
  label: string;
  children?: TechOption[];
}

const techOptions: TechOption[] = [
  {
    id: 'frontend',
    label: 'Frontend',
    children: [
      { id: 'react', label: 'React' },
      { id: 'vue', label: 'Vue.js' },
      { id: 'angular', label: 'Angular' },
    ],
  },
  {
    id: 'backend',
    label: 'Backend',
    children: [
      { id: 'node', label: 'Node.js' },
      { id: 'python', label: 'Python' },
      { id: 'java', label: 'Java' },
    ],
  },
  {
    id: 'database',
    label: 'Database',
    children: [
      { id: 'mongodb', label: 'MongoDB' },
      { id: 'postgresql', label: 'PostgreSQL' },
      { id: 'mysql', label: 'MySQL' },
    ],
  },
];

export const TechStackSelection: React.FC = () => {
  const { state, dispatch } = useProjectSetup();

  const handleTechSelect = (key: string, value: boolean) => {
    dispatch({ type: 'UPDATE_TECH_STACK', payload: { key, value } });
  };

  const handleContinue = () => {
    dispatch({ type: 'SET_STEP', payload: 'implementation' });
  };

  const renderTechOption = (option: TechOption) => {
    const isChecked = state.techStack[option.id] || false;
    
    return (
      <div key={option.id} className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id={option.id}
            checked={isChecked}
            onCheckedChange={(checked) => handleTechSelect(option.id, checked as boolean)}
          />
          <label htmlFor={option.id} className="font-medium">
            {option.label}
          </label>
        </div>
        {option.children && (
          <div className="ml-6 space-y-2">
            {option.children.map((child) => renderTechOption(child))}
          </div>
        )}
      </div>
    );
  };

  return (
    <Card className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Select Your Tech Stack</h2>
      <p className="text-muted-foreground mb-6">
        Choose the technologies you want to use in your project.
      </p>
      <div className="space-y-6 mb-6">
        {techOptions.map(renderTechOption)}
      </div>
      <Button 
        onClick={handleContinue}
        className="w-full"
        disabled={Object.keys(state.techStack).length === 0}
      >
        Continue to Implementation
      </Button>
    </Card>
  );
};
