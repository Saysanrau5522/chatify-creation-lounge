import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { ProjectFlow, ProjectStep, IdeaRefinement, TechStackSelection, FolderStructure, Implementation } from '../types/project';

// Initial state
const initialState: ProjectFlow = {
  currentStep: 'INITIAL_PROMPT',
  ideaRefinement: {
    originalPrompt: '',
    refinedIdea: {
      coreFunctionality: [],
      features: [],
      requirements: [],
      constraints: [],
    },
    userFeedback: [],
    isConfirmed: false,
  },
  techStack: {
    frontend: { title: 'Frontend', items: [], allSelected: false },
    backend: { title: 'Backend', items: [], allSelected: false },
    database: { title: 'Database', items: [], allSelected: false },
    tools: { title: 'Tools', items: [], allSelected: false },
  },
  folderStructure: {
    root: {
      name: 'root',
      type: 'directory',
      children: [],
    },
    template: 'default',
  },
  implementation: {
    files: {},
    errors: [],
    preview: {
      type: 'local',
      dependencies: {},
      entry: 'src/index.tsx',
    },
  },
};

// Action types
type ProjectAction =
  | { type: 'SET_STEP'; payload: ProjectStep }
  | { type: 'SET_PROMPT'; payload: string }
  | { type: 'UPDATE_REFINED_IDEA'; payload: Partial<IdeaRefinement> }
  | { type: 'CONFIRM_IDEA' }
  | { type: 'UPDATE_TECH_STACK'; payload: Partial<TechStackSelection> }
  | { type: 'UPDATE_FOLDER_STRUCTURE'; payload: Partial<FolderStructure> }
  | { type: 'UPDATE_IMPLEMENTATION'; payload: Partial<Implementation> }
  | { type: 'ADD_ERROR'; payload: { file: string; error: any } }
  | { type: 'CLEAR_ERRORS'; payload: string };

// Reducer
function projectReducer(state: ProjectFlow, action: ProjectAction): ProjectFlow {
  switch (action.type) {
    case 'SET_STEP':
      return { ...state, currentStep: action.payload };
    case 'SET_PROMPT':
      return {
        ...state,
        ideaRefinement: {
          ...state.ideaRefinement,
          originalPrompt: action.payload,
        },
      };
    case 'UPDATE_REFINED_IDEA':
      return {
        ...state,
        ideaRefinement: {
          ...state.ideaRefinement,
          ...action.payload,
        },
      };
    case 'CONFIRM_IDEA':
      return {
        ...state,
        ideaRefinement: {
          ...state.ideaRefinement,
          isConfirmed: true,
        },
      };
    case 'UPDATE_TECH_STACK':
      return {
        ...state,
        techStack: {
          ...state.techStack,
          ...action.payload,
        },
      };
    case 'UPDATE_FOLDER_STRUCTURE':
      return {
        ...state,
        folderStructure: {
          ...state.folderStructure,
          ...action.payload,
        },
      };
    case 'UPDATE_IMPLEMENTATION':
      return {
        ...state,
        implementation: {
          ...state.implementation,
          ...action.payload,
        },
      };
    case 'ADD_ERROR':
      return {
        ...state,
        implementation: {
          ...state.implementation,
          errors: [
            ...state.implementation.errors,
            {
              type: 'RUNTIME',
              location: {
                file: action.payload.file,
                line: 0,
                column: 0,
              },
              severity: 'major',
              message: action.payload.error.message,
              suggestedFix: [],
              context: '',
            },
          ],
        },
      };
    case 'CLEAR_ERRORS':
      return {
        ...state,
        implementation: {
          ...state.implementation,
          errors: state.implementation.errors.filter(
            (error) => error.location.file !== action.payload
          ),
        },
      };
    default:
      return state;
  }
}

// Context
const ProjectContext = createContext<{
  state: ProjectFlow;
  dispatch: React.Dispatch<ProjectAction>;
} | null>(null);

// Provider component
export function ProjectProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(projectReducer, initialState);

  return (
    <ProjectContext.Provider value={{ state, dispatch }}>
      {children}
    </ProjectContext.Provider>
  );
}

// Custom hook to use the project context
export function useProject() {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
} 