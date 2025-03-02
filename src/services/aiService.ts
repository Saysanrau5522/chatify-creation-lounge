import { CodeError, ErrorType } from '../types/project';

interface AIServiceConfig {
  apiKey: string;
  endpoint: string;
}

class AIService {
  private static instance: AIService;
  private config: AIServiceConfig;

  private constructor() {
    this.config = {
      apiKey: process.env.VITE_AI_SERVICE_KEY || '',
      endpoint: process.env.VITE_AI_SERVICE_ENDPOINT || '',
    };
  }

  static getInstance(): AIService {
    if (!AIService.instance) {
      AIService.instance = new AIService();
    }
    return AIService.instance;
  }

  async analyzeCode(code: string): Promise<{
    quality: number;
    suggestions: string[];
    errors: CodeError[];
  }> {
    try {
      // Here we would make an API call to the AI service
      // For demonstration, we'll simulate the analysis
      const analysis = await this.simulateCodeAnalysis(code);
      return analysis;
    } catch (error) {
      console.error('Error analyzing code:', error);
      throw error;
    }
  }

  async fixCode(code: string, errors: CodeError[]): Promise<{
    fixedCode: string;
    remainingErrors: CodeError[];
  }> {
    try {
      // Here we would make an API call to the AI service
      // For demonstration, we'll simulate the fix
      const fix = await this.simulateCodeFix(code, errors);
      return fix;
    } catch (error) {
      console.error('Error fixing code:', error);
      throw error;
    }
  }

  async generateCode(prompt: string, context: any): Promise<{
    code: string;
    explanation: string;
  }> {
    try {
      // Here we would make an API call to the AI service
      // For demonstration, we'll simulate code generation
      const generated = await this.simulateCodeGeneration(prompt, context);
      return generated;
    } catch (error) {
      console.error('Error generating code:', error);
      throw error;
    }
  }

  private async simulateCodeAnalysis(code: string) {
    // Simulate AI analysis with some basic checks
    const errors: CodeError[] = [];
    const suggestions: string[] = [];

    // Example static analysis
    if (!code.includes('import React')) {
      errors.push({
        type: 'SYNTAX' as ErrorType,
        location: { file: 'unknown', line: 1, column: 1 },
        severity: 'major',
        message: 'Missing React import',
        suggestedFix: ["import React from 'react';"],
        context: 'React components require the React import',
      });
    }

    if (code.includes('var ')) {
      suggestions.push('Consider using const or let instead of var');
    }

    // Calculate a simple quality score
    const quality = Math.min(
      100,
      Math.max(0, 100 - errors.length * 10 - suggestions.length * 5)
    );

    return { quality, suggestions, errors };
  }

  private async simulateCodeFix(code: string, errors: CodeError[]) {
    // Simulate AI-powered code fixing
    let fixedCode = code;
    const remainingErrors: CodeError[] = [];

    for (const error of errors) {
      if (error.suggestedFix && error.suggestedFix.length > 0) {
        // Apply the first suggested fix
        fixedCode = fixedCode.replace(
          error.context,
          error.suggestedFix[0]
        );
      } else {
        remainingErrors.push(error);
      }
    }

    return { fixedCode, remainingErrors };
  }

  private async simulateCodeGeneration(prompt: string, context: any) {
    // Simulate AI code generation
    const code = `import React from 'react';
import { useState, useEffect } from 'react';

export default function GeneratedComponent() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Fetch data or perform initialization
    console.log('Component mounted');
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Generated Component</h1>
      <p>This component was generated based on your prompt:</p>
      <pre className="bg-gray-100 p-2 rounded mt-2">{prompt}</pre>
    </div>
  );
}`;

    return {
      code,
      explanation: 'Generated a basic React component with hooks and styling',
    };
  }
}

export const aiService = AIService.getInstance(); 