
import React, { useState, useEffect } from "react";
import { Code, PlayCircle, Terminal, ChevronRight, Folder, FileCode, Package } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { toast } from "sonner";

const CodeDemo = () => {
  const [inputValue, setInputValue] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCode, setGeneratedCode] = useState("");
  const [previewVisible, setPreviewVisible] = useState(false);
  const [projectStructure, setProjectStructure] = useState<string[]>([]);
  const [recommendedStack, setRecommendedStack] = useState<string[]>([]);
  const [isError, setIsError] = useState(false);
  
  const examplePrompts = [
    "Create a task management app with drag and drop functionality",
    "Build an e-commerce product page with image gallery and reviews",
    "Make a realtime chat application with user presence indicators"
  ];
  
  const [selectedPrompt, setSelectedPrompt] = useState(examplePrompts[0]);
  
  // Hugging Face API token
  const HF_TOKEN = "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";
  
  const samplePreview = (
    <div className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white">
      <div className="h-48 overflow-hidden bg-secondary">
        <div className="w-full h-full flex items-center justify-center text-foreground/40">
          <Terminal className="w-8 h-8" />
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">Premium Headphones</h3>
        <p className="text-primary font-bold">$249.99</p>
        <button className="mt-3 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
          Add to cart
        </button>
      </div>
    </div>
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    generateCode();
  };

  const handlePromptSelect = (prompt: string) => {
    setSelectedPrompt(prompt);
    setInputValue(prompt);
  };

  const generateCode = async () => {
    setIsGenerating(true);
    setGeneratedCode("");
    setProjectStructure([]);
    setRecommendedStack([]);
    setIsError(false);
    setPreviewVisible(false);
    
    try {
      // First call to get project structure and stack recommendations
      const structureResponse = await fetch("https://api-inference.huggingface.co/models/meta-llama/Meta-Llama-3-8B-Instruct", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${HF_TOKEN}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          inputs: `Based on this app idea: "${inputValue || selectedPrompt}", 
          generate a JSON response with the following structure:
          {
            "projectStructure": ["folder/file paths"],
            "recommendedTech": ["list of recommended tech stack"],
            "mainComponent": "name of the main component file"
          }
          Make it realistic for a modern web application. Include around 5-10 files and 3-6 tech recommendations.`
        })
      });

      if (!structureResponse.ok) {
        throw new Error("Failed to get project structure");
      }

      const structureData = await structureResponse.json();
      let parsedStructure;
      
      try {
        // Find JSON in the response text
        const jsonMatch = structureData[0].generated_text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          parsedStructure = JSON.parse(jsonMatch[0]);
          setProjectStructure(parsedStructure.projectStructure || []);
          setRecommendedStack(parsedStructure.recommendedTech || []);
        } else {
          throw new Error("No JSON found in response");
        }
      } catch (error) {
        console.error("Error parsing structure response:", error);
        // Fallback to default structure
        setProjectStructure([
          "src/App.tsx",
          "src/components/MainComponent.tsx",
          "src/styles/main.css",
          "src/utils/helpers.ts",
          "src/api/api.ts"
        ]);
        setRecommendedStack(["React", "TypeScript", "Tailwind CSS"]);
      }

      // Second call to generate the main component code
      const codeResponse = await fetch("https://api-inference.huggingface.co/models/meta-llama/Meta-Llama-3-8B-Instruct", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${HF_TOKEN}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          inputs: `Generate React TypeScript code for the main component of the following app: "${inputValue || selectedPrompt}".
          Use modern React (hooks, functional components).
          Include imports.
          Use Tailwind CSS for styling.
          Implement core functionality, don't just create a static UI.
          Ensure the code is complete, well-structured, and follows best practices.
          Provide only the code, no explanations.`
        })
      });

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

      // Type the code with a delay for effect
      let i = 0;
      const interval = setInterval(() => {
        setGeneratedCode(extractedCode.substring(0, i));
        i += 5;
        if (i > extractedCode.length) {
          clearInterval(interval);
          setIsGenerating(false);
          setTimeout(() => {
            setPreviewVisible(true);
          }, 500);
        }
      }, 15);
    } catch (error) {
      console.error("Error generating code:", error);
      setIsError(true);
      setIsGenerating(false);
      toast.error("Failed to generate code. Please try again.");
    }
  };

  return (
    <section className="py-24 px-6 md:px-10 lg:px-20 bg-secondary/30 relative overflow-hidden">
      <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-primary/5 rounded-full blur-3xl -z-10"></div>
      
      <ScrollReveal animation="slide-up">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">See it in action</h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Type a prompt describing what you want to build, and watch as Lovable instantly generates code and provides a live preview.
          </p>
        </div>
      </ScrollReveal>
      
      <div className="max-w-6xl mx-auto">
        <ScrollReveal animation="slide-up" delay={100}>
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-1/2">
              <div className="bg-white rounded-xl shadow-xl overflow-hidden h-full">
                <div className="bg-foreground px-4 py-2 flex items-center gap-2">
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-[#ff5f57] mr-2"></div>
                    <div className="h-3 w-3 rounded-full bg-[#febc2e] mr-2"></div>
                    <div className="h-3 w-3 rounded-full bg-[#28c840]"></div>
                  </div>
                  <div className="text-white ml-4 text-sm font-medium">Lovable AI Chat</div>
                </div>
                
                <div className="p-4 h-[500px] flex flex-col">
                  <div className="mb-6 flex-grow overflow-y-auto">
                    <div className="mb-4 p-3 bg-secondary/50 rounded-lg">
                      <p className="text-sm font-medium">Example prompts:</p>
                      <div className="mt-2 space-y-2">
                        {examplePrompts.map((prompt, index) => (
                          <button
                            key={index}
                            onClick={() => handlePromptSelect(prompt)}
                            className={`w-full text-left text-sm p-2 rounded-md flex items-center ${
                              selectedPrompt === prompt ? "bg-primary/10 text-primary" : "hover:bg-primary/5"
                            }`}
                          >
                            <ChevronRight className="w-4 h-4 mr-2" />
                            {prompt}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    {projectStructure.length > 0 && (
                      <div className="mb-4 p-3 bg-secondary/30 rounded-lg">
                        <p className="text-sm font-medium mb-2">Project Structure:</p>
                        <div className="space-y-1 text-sm text-foreground/80">
                          {projectStructure.map((item, index) => (
                            <div key={index} className="flex items-center">
                              {item.includes(".") ? (
                                <FileCode className="w-4 h-4 mr-2 text-primary/70" />
                              ) : (
                                <Folder className="w-4 h-4 mr-2 text-primary/70" />
                              )}
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {recommendedStack.length > 0 && (
                      <div className="mb-4 p-3 bg-secondary/30 rounded-lg">
                        <p className="text-sm font-medium mb-2">Recommended Stack:</p>
                        <div className="flex flex-wrap gap-2">
                          {recommendedStack.map((tech, index) => (
                            <div key={index} className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs flex items-center">
                              <Package className="w-3 h-3 mr-1" />
                              {tech}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <form onSubmit={handleSubmit} className="relative">
                    <input
                      type="text"
                      value={inputValue || selectedPrompt}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Describe what you want to build..."
                      className="w-full p-3 pr-12 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30"
                      disabled={isGenerating}
                    />
                    <button
                      type="submit"
                      className={`absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center ${
                        isGenerating ? "bg-gray-400" : "bg-primary"
                      } text-white rounded-lg`}
                      disabled={isGenerating}
                    >
                      {isGenerating ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <PlayCircle className="w-5 h-5" />
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>
            
            <div className="w-full lg:w-1/2">
              <div className="bg-white rounded-xl shadow-xl overflow-hidden h-full flex flex-col">
                <div className="flex">
                  <button 
                    className={`px-4 py-2 text-sm font-medium ${
                      !previewVisible ? "bg-primary text-white" : "bg-foreground/5"
                    }`}
                    onClick={() => setPreviewVisible(false)}
                  >
                    <div className="flex items-center gap-2">
                      <Code className="w-4 h-4" />
                      <span>Code</span>
                    </div>
                  </button>
                  <button 
                    className={`px-4 py-2 text-sm font-medium ${
                      previewVisible ? "bg-primary text-white" : "bg-foreground/5"
                    }`}
                    onClick={() => previewVisible && generatedCode && setPreviewVisible(true)}
                    disabled={!generatedCode || isGenerating}
                  >
                    <div className="flex items-center gap-2">
                      <PlayCircle className="w-4 h-4" />
                      <span>Preview</span>
                    </div>
                  </button>
                </div>
                
                <div className="flex-grow">
                  {!previewVisible ? (
                    <div className="p-4 font-mono text-sm overflow-auto h-[500px] bg-[#282c34] text-white">
                      {isError ? (
                        <div className="h-full flex items-center justify-center text-red-400">
                          <p>Error generating code. Please try again.</p>
                        </div>
                      ) : isGenerating ? (
                        <div className="whitespace-pre-wrap">{generatedCode}</div>
                      ) : generatedCode ? (
                        <div className="whitespace-pre-wrap">{generatedCode}</div>
                      ) : (
                        <div className="h-full flex items-center justify-center text-gray-400">
                          <p>Enter a prompt and click generate to see code here</p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="p-8 h-[500px] overflow-auto bg-gray-50 flex items-center justify-center">
                      {samplePreview}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default CodeDemo;
