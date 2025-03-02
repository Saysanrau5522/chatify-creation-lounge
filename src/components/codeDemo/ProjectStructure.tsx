
import React from "react";
import { FileCode, Folder } from "lucide-react";

interface ProjectStructureProps {
  structure: string[];
}

const ProjectStructure: React.FC<ProjectStructureProps> = ({ structure }) => {
  if (structure.length === 0) return null;

  return (
    <div className="mb-4 p-3 bg-secondary/30 rounded-lg">
      <p className="text-sm font-medium mb-2">Project Structure:</p>
      <div className="space-y-1 text-sm text-foreground/80">
        {structure.map((item, index) => (
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
  );
};

export default ProjectStructure;
