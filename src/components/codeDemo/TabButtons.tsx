
import React from "react";
import { Code, PlayCircle } from "lucide-react";

interface TabButtonsProps {
  activeTab: 'code' | 'preview';
  hasCode: boolean;
  isGenerating: boolean;
  onTabChange: (tab: 'code' | 'preview') => void;
}

const TabButtons: React.FC<TabButtonsProps> = ({
  activeTab,
  hasCode,
  isGenerating,
  onTabChange,
}) => {
  return (
    <div className="flex">
      <button 
        className={`px-4 py-2 text-sm font-medium ${
          activeTab === 'code' ? "bg-primary text-white" : "bg-foreground/5"
        }`}
        onClick={() => onTabChange('code')}
      >
        <div className="flex items-center gap-2">
          <Code className="w-4 h-4" />
          <span>Code</span>
        </div>
      </button>
      <button 
        className={`px-4 py-2 text-sm font-medium ${
          activeTab === 'preview' ? "bg-primary text-white" : "bg-foreground/5"
        }`}
        onClick={() => hasCode && !isGenerating && onTabChange('preview')}
        disabled={!hasCode || isGenerating}
      >
        <div className="flex items-center gap-2">
          <PlayCircle className="w-4 h-4" />
          <span>Preview</span>
        </div>
      </button>
    </div>
  );
};

export default TabButtons;
