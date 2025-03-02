import React, { useState } from 'react';
import { useProject } from '../../contexts/ProjectContext';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../ui/card';
import { CheckCircle, AlertCircle } from 'lucide-react';

export function IdeaRefinement() {
  const { state, dispatch } = useProject();
  const [feedback, setFeedback] = useState('');
  
  const handlePromptSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (state.ideaRefinement.originalPrompt) {
      // Here we would typically call an AI service to refine the idea
      // For now, we'll simulate it
      dispatch({
        type: 'UPDATE_REFINED_IDEA',
        payload: {
          refinedIdea: {
            coreFunctionality: ['Core feature 1', 'Core feature 2'],
            features: ['Feature 1', 'Feature 2'],
            requirements: ['Requirement 1', 'Requirement 2'],
            constraints: ['Constraint 1', 'Constraint 2'],
          },
        },
      });
    }
  };

  const handleFeedbackSubmit = () => {
    if (feedback) {
      dispatch({
        type: 'UPDATE_REFINED_IDEA',
        payload: {
          userFeedback: [...state.ideaRefinement.userFeedback, feedback],
        },
      });
      setFeedback('');
    }
  };

  const handleConfirmIdea = () => {
    dispatch({ type: 'CONFIRM_IDEA' });
    dispatch({ type: 'SET_STEP', payload: 'TECH_STACK_SELECTION' });
  };

  return (
    <div className="space-y-4">
      {/* Initial Prompt Section */}
      <Card>
        <CardHeader>
          <CardTitle>Describe Your Project</CardTitle>
          <CardDescription>
            Tell us about the app or website you want to build
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePromptSubmit}>
            <Textarea
              value={state.ideaRefinement.originalPrompt}
              onChange={(e) =>
                dispatch({ type: 'SET_PROMPT', payload: e.target.value })
              }
              placeholder="I want to build..."
              className="min-h-[100px]"
            />
            <Button type="submit" className="mt-4">
              Analyze Idea
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Refined Idea Section */}
      {state.ideaRefinement.refinedIdea.coreFunctionality.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Project Understanding</CardTitle>
            <CardDescription>
              Here's what I understand about your project
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <section>
                <h4 className="font-semibold mb-2">Core Functionality:</h4>
                <ul className="list-disc pl-5">
                  {state.ideaRefinement.refinedIdea.coreFunctionality.map(
                    (item, index) => (
                      <li key={index}>{item}</li>
                    )
                  )}
                </ul>
              </section>
              <section>
                <h4 className="font-semibold mb-2">Features:</h4>
                <ul className="list-disc pl-5">
                  {state.ideaRefinement.refinedIdea.features.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </section>
              <section>
                <h4 className="font-semibold mb-2">Requirements:</h4>
                <ul className="list-disc pl-5">
                  {state.ideaRefinement.refinedIdea.requirements.map(
                    (item, index) => (
                      <li key={index}>{item}</li>
                    )
                  )}
                </ul>
              </section>
              <section>
                <h4 className="font-semibold mb-2">Constraints:</h4>
                <ul className="list-disc pl-5">
                  {state.ideaRefinement.refinedIdea.constraints.map(
                    (item, index) => (
                      <li key={index}>{item}</li>
                    )
                  )}
                </ul>
              </section>
            </div>
          </CardContent>
          <CardFooter className="flex-col items-start gap-4">
            <div className="w-full">
              <Textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Need any adjustments? Let me know..."
                className="min-h-[80px]"
              />
              <Button
                onClick={handleFeedbackSubmit}
                variant="outline"
                className="mt-2"
              >
                Submit Feedback
              </Button>
            </div>
            <div className="w-full flex justify-between items-center">
              <Button
                onClick={() =>
                  dispatch({ type: 'SET_STEP', payload: 'INITIAL_PROMPT' })
                }
                variant="ghost"
              >
                <AlertCircle className="mr-2 h-4 w-4" />
                Start Over
              </Button>
              <Button onClick={handleConfirmIdea}>
                <CheckCircle className="mr-2 h-4 w-4" />
                Confirm & Continue
              </Button>
            </div>
          </CardFooter>
        </Card>
      )}
    </div>
  );
} 