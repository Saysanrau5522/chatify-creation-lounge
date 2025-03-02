import { TechStackSelection, FolderStructure, CodeError } from '../types/project';
import { aiService } from './aiService';

interface GenerateCodeParams {
  prompt: string;
  refinedIdea: {
    coreFunctionality: string[];
    features: string[];
    requirements: string[];
    constraints: string[];
  };
  techStack: TechStackSelection;
  folderStructure: FolderStructure;
}

interface GeneratedCode {
  files: Record<string, string>;
  errors: CodeError[];
}

export async function generateCode(params: GenerateCodeParams): Promise<GeneratedCode> {
  const { code } = await aiService.generateCode(params.prompt, {
    refinedIdea: params.refinedIdea,
    techStack: params.techStack,
    folderStructure: params.folderStructure,
  });

  const files = {
    'src/App.tsx': code,
  };

  // Analyze the generated code for errors
  const analysis = await aiService.analyzeCode(code);
  
  return {
    files,
    errors: analysis.errors,
  };
}

export async function fixCodeErrors(
  files: Record<string, string>,
  errors: CodeError[]
): Promise<GeneratedCode> {
  const fixedFiles: Record<string, string> = {};
  const remainingErrors: CodeError[] = [];

  for (const [file, code] of Object.entries(files)) {
    const fileErrors = errors.filter(e => e.location.file === file);
    if (fileErrors.length > 0) {
      const { fixedCode, remainingErrors: remaining } = await aiService.fixCode(code, fileErrors);
      fixedFiles[file] = fixedCode;
      remainingErrors.push(...remaining);
    } else {
      fixedFiles[file] = code;
    }
  }

  return {
    files: fixedFiles,
    errors: remainingErrors,
  };
}

export async function validateCode(
  files: Record<string, string>
): Promise<CodeError[]> {
  const errors: CodeError[] = [];

  for (const [file, code] of Object.entries(files)) {
    const analysis = await aiService.analyzeCode(code);
    errors.push(...analysis.errors);
  }

  return errors;
} 