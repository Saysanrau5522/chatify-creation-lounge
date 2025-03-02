import React, { createContext, useContext, useReducer } from 'react';

interface ProjectState {
  projectDescription: string;
  techStack: Record<string, boolean>;
  structure: Record<string, boolean>;
  dependencies: string[];
  currentStep: 'idea' | 'refinement' | 'tech-stack' | 'implementation';
}

const initialState: ProjectState = {
  projectDescription: '',
  techStack: {},
  structure: {},
  dependencies: [],
  currentStep: 'idea',
};

type Action =
  | { type: 'SET_DESCRIPTION'; payload: string }
  | { type: 'UPDATE_TECH_STACK'; payload: { key: string; value: boolean } }
  | { type: 'UPDATE_STRUCTURE'; payload: { key: string; value: boolean } }
  | { type: 'SET_DEPENDENCIES'; payload: string[] }
  | { type: 'SET_STEP'; payload: ProjectState['currentStep'] };

const projectReducer = (state: ProjectState, action: Action): ProjectState => {
  switch (action.type) {
    case 'SET_DESCRIPTION':
      return { ...state, projectDescription: action.payload };
    case 'UPDATE_TECH_STACK':
      return {
        ...state,
        techStack: { ...state.techStack, [action.payload.key]: action.payload.value },
      };
    case 'UPDATE_STRUCTURE':
      return {
        ...state,
        structure: { ...state.structure, [action.payload.key]: action.payload.value },
      };
    case 'SET_DEPENDENCIES':
      return { ...state, dependencies: action.payload };
    case 'SET_STEP':
      return { ...state, currentStep: action.payload };
    default:
      return state;
  }
};

const ProjectSetupContext = createContext<{
  state: ProjectState;
  dispatch: React.Dispatch<Action>;
} | null>(null);

export const ProjectSetupProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(projectReducer, initialState);

  return (
    <ProjectSetupContext.Provider value={{ state, dispatch }}>
      {children}
    </ProjectSetupContext.Provider>
  );
};

export const useProjectSetup = () => {
  const context = useContext(ProjectSetupContext);
  if (!context) {
    throw new Error('useProjectSetup must be used within a ProjectSetupProvider');
  }
  return context;
};
