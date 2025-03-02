
import React from "react";
import { ChevronRight } from "lucide-react";

interface ExamplePromptsProps {
  prompts: string[];
  selectedPrompt: string;
  onSelect: (prompt: string) => void;
}

const ExamplePrompts: React.FC<ExamplePromptsProps> = ({
  prompts,
  selectedPrompt,
  onSelect,
}) => {
  return (
    <div className="mb-4 p-3 bg-secondary/50 rounded-lg">
      <p className="text-sm font-medium">Example prompts:</p>
      <div className="mt-2 space-y-2">
        {prompts.map((prompt, index) => (
          <button
            key={index}
            onClick={() => onSelect(prompt)}
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
  );
};

export default ExamplePrompts;
