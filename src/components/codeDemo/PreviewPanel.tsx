
import React from "react";

interface PreviewPanelProps {
  children: React.ReactNode;
}

const PreviewPanel: React.FC<PreviewPanelProps> = ({ children }) => {
  return (
    <div className="p-8 h-[500px] overflow-auto bg-gray-50 flex items-center justify-center">
      {children}
    </div>
  );
};

export default PreviewPanel;
