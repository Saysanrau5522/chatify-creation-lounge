// Project Flow Types
export interface ProjectFlow {
  currentStep: ProjectStep;
  ideaRefinement: IdeaRefinement;
  techStack: TechStackSelection;
  folderStructure: FolderStructure;
  implementation: Implementation;
}

export type ProjectStep = 
  | 'INITIAL_PROMPT'
  | 'IDEA_REFINEMENT'
  | 'TECH_STACK_SELECTION'
  | 'FOLDER_STRUCTURE'
  | 'IMPLEMENTATION'
  | 'PREVIEW';

export interface IdeaRefinement {
  originalPrompt: string;
  refinedIdea: RefinedIdea;
  userFeedback: string[];
  isConfirmed: boolean;
}

export interface RefinedIdea {
  coreFunctionality: string[];
  features: string[];
  requirements: string[];
  constraints: string[];
}

export interface TechStackSelection {
  frontend: string[];
  backend: string[];
  database: string[];
  deployment: string[];
}

export interface FolderStructure {
  root: string;
  directories: string[];
}

export interface Implementation {
  currentFile?: string;
  files: Record<string, string>;
  errors: CodeError[];
  preview: PreviewConfig;
}

export interface CodeError {
  message: string;
  severity: 'error' | 'warning' | 'info';
  location: {
    file: string;
    line: number;
    column: number;
  };
}

export interface GeneratedCode {
  files: Record<string, string>;
  errors: CodeError[];
}

export interface Preview {
  url: string;
  type: 'local' | 'sandbox';
}

export interface ProjectState {
  originalPrompt: string;
  refinedIdea: RefinedIdea;
  techStack: TechStackSelection;
  folderStructure: FolderStructure;
  generatedCode: GeneratedCode;
  preview: Preview | null;
}

export interface Step {
  id: string;
  label: string;
}

export interface PreviewConfig {
  type: 'local' | 'sandbox';
  url?: string;
  dependencies: Record<string, string>;
  entry: string;
} 