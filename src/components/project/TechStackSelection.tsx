import React from 'react';
import { useProject } from '../../contexts/ProjectContext';
import { Button } from '../ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../ui/card';
import { Checkbox } from '../ui/checkbox';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface TechOption {
  id: string;
  label: string;
  description: string;
  isRequired?: boolean;
  dependencies?: string[];
}

const TECH_OPTIONS: Record<string, TechOption[]> = {
  frontend: [
    {
      id: 'react',
      label: 'React',
      description: 'A JavaScript library for building user interfaces',
      isRequired: true,
    },
    {
      id: 'typescript',
      label: 'TypeScript',
      description: 'Typed JavaScript for better development experience',
      isRequired: true,
    },
    {
      id: 'tailwind',
      label: 'Tailwind CSS',
      description: 'A utility-first CSS framework',
    },
    {
      id: 'redux',
      label: 'Redux Toolkit',
      description: 'State management for React applications',
    },
  ],
  backend: [
    {
      id: 'nodejs',
      label: 'Node.js',
      description: 'JavaScript runtime for server-side development',
    },
    {
      id: 'express',
      label: 'Express.js',
      description: 'Web framework for Node.js',
      dependencies: ['nodejs'],
    },
    {
      id: 'nestjs',
      label: 'NestJS',
      description: 'Progressive Node.js framework',
      dependencies: ['nodejs'],
    },
  ],
  database: [
    {
      id: 'mongodb',
      label: 'MongoDB',
      description: 'NoSQL database for modern applications',
    },
    {
      id: 'postgresql',
      label: 'PostgreSQL',
      description: 'Open source relational database',
    },
    {
      id: 'firebase',
      label: 'Firebase',
      description: 'Backend-as-a-Service platform by Google',
    },
  ],
  tools: [
    {
      id: 'git',
      label: 'Git',
      description: 'Version control system',
      isRequired: true,
    },
    {
      id: 'jest',
      label: 'Jest',
      description: 'Testing framework',
    },
    {
      id: 'docker',
      label: 'Docker',
      description: 'Containerization platform',
    },
  ],
};

export function TechStackSelection() {
  const { state, dispatch } = useProject();

  const handleToggleAll = (section: string, selected: boolean) => {
    const items = TECH_OPTIONS[section].map((option) => ({
      ...option,
      isSelected: selected,
    }));
    dispatch({
      type: 'UPDATE_TECH_STACK',
      payload: {
        [section]: {
          ...state.techStack[section as keyof typeof state.techStack],
          items,
          allSelected: selected,
        },
      },
    });
  };

  const handleToggleItem = (section: string, itemId: string) => {
    const currentItems = state.techStack[section as keyof typeof state.techStack].items;
    const updatedItems = currentItems.map((item) =>
      item.id === itemId ? { ...item, isSelected: !item.isSelected } : item
    );
    
    dispatch({
      type: 'UPDATE_TECH_STACK',
      payload: {
        [section]: {
          ...state.techStack[section as keyof typeof state.techStack],
          items: updatedItems,
          allSelected: updatedItems.every((item) => item.isSelected),
        },
      },
    });
  };

  const handleContinue = () => {
    dispatch({ type: 'SET_STEP', payload: 'FOLDER_STRUCTURE' });
  };

  const handleBack = () => {
    dispatch({ type: 'SET_STEP', payload: 'IDEA_REFINEMENT' });
  };

  return (
    <div className="space-y-6">
      {Object.entries(TECH_OPTIONS).map(([section, options]) => (
        <Card key={section}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="capitalize">{section} Stack</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  handleToggleAll(
                    section,
                    !state.techStack[section as keyof typeof state.techStack]
                      .allSelected
                  )
                }
              >
                {state.techStack[section as keyof typeof state.techStack]
                  .allSelected
                  ? 'Deselect All'
                  : 'Select All'}
              </Button>
            </CardTitle>
            <CardDescription>
              Choose the technologies for your {section} stack
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {options.map((option) => (
                <div
                  key={option.id}
                  className="flex items-start space-x-3 space-y-0"
                >
                  <Checkbox
                    id={option.id}
                    checked={
                      state.techStack[
                        section as keyof typeof state.techStack
                      ].items.find((item) => item.id === option.id)?.isSelected
                    }
                    onCheckedChange={() => handleToggleItem(section, option.id)}
                    disabled={option.isRequired}
                  />
                  <div className="space-y-1 leading-none">
                    <label
                      htmlFor={option.id}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {option.label}
                      {option.isRequired && (
                        <span className="ml-2 text-xs text-muted-foreground">
                          (Required)
                        </span>
                      )}
                    </label>
                    <p className="text-sm text-muted-foreground">
                      {option.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
      <div className="flex justify-between">
        <Button onClick={handleBack} variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button onClick={handleContinue}>
          Continue
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
} 