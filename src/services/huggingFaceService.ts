
// Hugging Face API service for code generation
export interface ProjectStructureResponse {
  projectStructure: string[];
  recommendedTech: string[];
  mainComponent?: string;
}

export interface CodeGenerationParams {
  inputValue: string;
  HF_TOKEN: string;
}

// Hugging Face API token
const DEFAULT_HF_TOKEN = "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";

export const getProjectStructure = async (
  params: CodeGenerationParams
): Promise<ProjectStructureResponse> => {
  const { inputValue, HF_TOKEN = DEFAULT_HF_TOKEN } = params;

  const structureResponse = await fetch(
    "https://api-inference.huggingface.co/models/meta-llama/Meta-Llama-3-8B-Instruct",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${HF_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: `Based on this app idea: "${inputValue}", 
        generate a JSON response with the following structure:
        {
          "projectStructure": ["folder/file paths"],
          "recommendedTech": ["list of recommended tech stack"],
          "mainComponent": "name of the main component file"
        }
        Make it realistic for a modern web application. Include around 5-10 files and 3-6 tech recommendations.`,
      }),
    }
  );

  if (!structureResponse.ok) {
    throw new Error("Failed to get project structure");
  }

  const structureData = await structureResponse.json();
  let parsedStructure: ProjectStructureResponse = {
    projectStructure: [],
    recommendedTech: [],
  };

  try {
    // Find JSON in the response text
    const jsonMatch = structureData[0].generated_text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      parsedStructure = JSON.parse(jsonMatch[0]);
    } else {
      throw new Error("No JSON found in response");
    }
  } catch (error) {
    console.error("Error parsing structure response:", error);
    // Fallback to default structure
    parsedStructure = {
      projectStructure: [
        "src/App.tsx",
        "src/components/MainComponent.tsx",
        "src/styles/main.css",
        "src/utils/helpers.ts",
        "src/api/api.ts",
      ],
      recommendedTech: ["React", "TypeScript", "Tailwind CSS"],
    };
  }

  return parsedStructure;
};

export const generateComponentCode = async (
  params: CodeGenerationParams
): Promise<string> => {
  const { inputValue, HF_TOKEN = DEFAULT_HF_TOKEN } = params;

  const codeResponse = await fetch(
    "https://api-inference.huggingface.co/models/meta-llama/Meta-Llama-3-8B-Instruct",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${HF_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: `Generate React TypeScript code for the main component of the following app: "${inputValue}".
        Use modern React (hooks, functional components).
        Include imports.
        Use Tailwind CSS for styling.
        Implement core functionality, don't just create a static UI.
        Ensure the code is complete, well-structured, and follows best practices.
        Provide only the code, no explanations.`,
      }),
    }
  );

  if (!codeResponse.ok) {
    throw new Error("Failed to generate code");
  }

  const codeData = await codeResponse.json();
  
  // Extract code from response
  let extractedCode = "";
  try {
    const codeMatch = codeData[0].generated_text.match(/```(?:tsx|jsx)?\s*([\s\S]*?)```/);
    if (codeMatch && codeMatch[1]) {
      extractedCode = codeMatch[1].trim();
    } else {
      extractedCode = codeData[0].generated_text.trim();
    }
  } catch (error) {
    console.error("Error parsing code response:", error);
    extractedCode = "// Error parsing the generated code";
  }

  return extractedCode;
};
