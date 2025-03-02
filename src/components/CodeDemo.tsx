
import React, { useState, useEffect } from "react";
import { Code, PlayCircle, Terminal, ChevronRight } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const CodeDemo = () => {
  const [inputValue, setInputValue] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCode, setGeneratedCode] = useState("");
  const [previewVisible, setPreviewVisible] = useState(false);
  
  const examplePrompts = [
    "Create a product card with image, title, and price",
    "Build a sign-up form with email validation",
    "Make a notification component with dismiss button"
  ];
  
  const [selectedPrompt, setSelectedPrompt] = useState(examplePrompts[0]);
  
  // Sample code that would be "generated"
  const sampleCode = `import React from 'react';

function ProductCard({ image, title, price }) {
  return (
    <div className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl
                    transition-shadow duration-300 bg-white">
      <div className="h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover" 
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">{title}</h3>
        <p className="text-primary font-bold">${price}</p>
        <button className="mt-3 bg-primary text-white px-4 py-2 rounded-lg
                          hover:bg-primary/90 transition-colors">
          Add to cart
        </button>
      </div>
    </div>
  );
}`;

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

  const generateCode = () => {
    setIsGenerating(true);
    setGeneratedCode("");
    
    // Simulate API call with typing effect
    let i = 0;
    const interval = setInterval(() => {
      setGeneratedCode(sampleCode.substring(0, i));
      i += 5;
      if (i > sampleCode.length) {
        clearInterval(interval);
        setIsGenerating(false);
        setTimeout(() => {
          setPreviewVisible(true);
        }, 500);
      }
    }, 15);
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
                  </div>
                  
                  <form onSubmit={handleSubmit} className="relative">
                    <input
                      type="text"
                      value={inputValue || selectedPrompt}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Describe what you want to build..."
                      className="w-full p-3 pr-12 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                    <button
                      type="submit"
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-primary text-white rounded-lg"
                    >
                      <PlayCircle className="w-5 h-5" />
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
                      {isGenerating ? (
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
