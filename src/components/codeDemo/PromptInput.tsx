
import React from "react";
import { PlayCircle } from "lucide-react";

interface PromptInputProps {
  inputValue: string;
  selectedPrompt: string;
  isGenerating: boolean;
  onChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const PromptInput: React.FC<PromptInputProps> = ({
  inputValue,
  selectedPrompt,
  isGenerating,
  onChange,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit} className="relative">
      <input
        type="text"
        value={inputValue || selectedPrompt}
        onChange={(e) => onChange(e.target.value)}
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
  );
};

export default PromptInput;
