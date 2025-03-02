
import React from "react";

interface CodeViewerProps {
  code: string;
  isGenerating: boolean;
  isError: boolean;
}

const CodeViewer: React.FC<CodeViewerProps> = ({ code, isGenerating, isError }) => {
  return (
    <div className="p-4 font-mono text-sm overflow-auto h-[500px] bg-[#282c34] text-white">
      {isError ? (
        <div className="h-full flex items-center justify-center text-red-400">
          <p>Error generating code. Please try again.</p>
        </div>
      ) : isGenerating ? (
        <div className="whitespace-pre-wrap">{code}</div>
      ) : code ? (
        <div className="whitespace-pre-wrap">{code}</div>
      ) : (
        <div className="h-full flex items-center justify-center text-gray-400">
          <p>Enter a prompt and click generate to see code here</p>
        </div>
      )}
    </div>
  );
};

export default CodeViewer;
