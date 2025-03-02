
import React from "react";
import { Package } from "lucide-react";

interface TechStackProps {
  technologies: string[];
}

const TechStack: React.FC<TechStackProps> = ({ technologies }) => {
  if (technologies.length === 0) return null;

  return (
    <div className="mb-4 p-3 bg-secondary/30 rounded-lg">
      <p className="text-sm font-medium mb-2">Recommended Stack:</p>
      <div className="flex flex-wrap gap-2">
        {technologies.map((tech, index) => (
          <div key={index} className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs flex items-center">
            <Package className="w-3 h-3 mr-1" />
            {tech}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechStack;
