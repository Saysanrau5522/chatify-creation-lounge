import React, { useState } from 'react';
import { useProjectSetup } from '@/contexts/ProjectSetupContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';

export const IdeaCapture: React.FC = () => {
  const { state, dispatch } = useProjectSetup();
  const [description, setDescription] = useState(state.projectDescription);

  const handleSubmit = () => {
    dispatch({ type: 'SET_DESCRIPTION', payload: description });
    dispatch({ type: 'SET_STEP', payload: 'refinement' });
  };

  return (
    <Card className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Describe Your Project</h2>
      <p className="text-muted-foreground mb-4">
        Tell us about your project idea. What are you looking to build?
      </p>
      <Textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Describe your project idea..."
        className="min-h-[200px] mb-4"
      />
      <Button 
        onClick={handleSubmit}
        disabled={!description.trim()}
        className="w-full"
      >
        Continue to Refinement
      </Button>
    </Card>
  );
};
