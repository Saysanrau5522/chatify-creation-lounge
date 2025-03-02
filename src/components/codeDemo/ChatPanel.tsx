
import React, { useState } from "react";
import { toast } from "sonner";
import ExamplePrompts from "./ExamplePrompts";
import ProjectStructure from "./ProjectStructure";
import TechStack from "./TechStack";
import PromptInput from "./PromptInput";
import { getProjectStructure, generateComponentCode } from "../../services/huggingFaceService";

interface ChatPanelProps {
  onCodeGenerated: (code: string) => void;
  onGenerationStart: () => void;
  onGenerationError: () => void;
  onGenerationComplete: () => void;
}

const ChatPanel: React.FC<ChatPanelProps> = ({
  onCodeGenerated,
  onGenerationStart,
  onGenerationError,
  onGenerationComplete,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [projectStructure, setProjectStructure] = useState<string[]>([]);
  const [recommendedStack, setRecommendedStack] = useState<string[]>([]);
  
  const examplePrompts = [
    "Create a task management app with drag and drop functionality",
    "Build an e-commerce product page with image gallery and reviews",
    "Make a realtime chat application with user presence indicators"
  ];
  
  const [selectedPrompt, setSelectedPrompt] = useState(examplePrompts[0]);
  
  // Hugging Face API token
  const HF_TOKEN = "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";

  const handlePromptSelect = (prompt: string) => {
    setSelectedPrompt(prompt);
    setInputValue(prompt);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    generateCode();
  };

  const generateCode = async () => {
    setIsGenerating(true);
    setProjectStructure([]);
    setRecommendedStack([]);
    onGenerationStart();
    
    try {
      // First get project structure and stack recommendations
      const structureData = await getProjectStructure({
        inputValue: inputValue || selectedPrompt,
        HF_TOKEN
      });
      
      setProjectStructure(structureData.projectStructure || []);
      setRecommendedStack(structureData.recommendedTech || []);

      // Then generate the main component code
      const extractedCode = await generateComponentCode({
        inputValue: inputValue || selectedPrompt,
        HF_TOKEN
      });

      // Type the code with a delay for effect
      let i = 0;
      const interval = setInterval(() => {
        onCodeGenerated(extractedCode.substring(0, i));
        i += 5;
        if (i > extractedCode.length) {
          clearInterval(interval);
          setIsGenerating(false);
          onGenerationComplete();
        }
      }, 15);
    } catch (error) {
      console.error("Error generating code:", error);
      setIsGenerating(false);
      onGenerationError();
      toast.error("Failed to generate code. Please try again.");
    }
  };

  return (
    <div className="p-4 h-[500px] flex flex-col">
      <div className="mb-6 flex-grow overflow-y-auto">
        <ExamplePrompts 
          prompts={examplePrompts}
          selectedPrompt={selectedPrompt}
          onSelect={handlePromptSelect}
        />
        
        <ProjectStructure structure={projectStructure} />
        
        <TechStack technologies={recommendedStack} />
      </div>
      
      <PromptInput
        inputValue={inputValue}
        selectedPrompt={selectedPrompt}
        isGenerating={isGenerating}
        onChange={setInputValue}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default ChatPanel;
