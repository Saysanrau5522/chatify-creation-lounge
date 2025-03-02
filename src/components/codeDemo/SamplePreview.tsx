
import React from "react";
import { Terminal } from "lucide-react";

const SamplePreview: React.FC = () => {
  return (
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
};

export default SamplePreview;
