
import React, { useState } from "react";
import ScrollReveal from "./ScrollReveal";
import CodeViewer from "./codeDemo/CodeViewer";
import PreviewPanel from "./codeDemo/PreviewPanel";
import TabButtons from "./codeDemo/TabButtons";
import ChatPanel from "./codeDemo/ChatPanel";
import SamplePreview from "./codeDemo/SamplePreview";

const CodeDemo = () => {
  const [generatedCode, setGeneratedCode] = useState("");
  const [previewVisible, setPreviewVisible] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isError, setIsError] = useState(false);
  
  const handleTabChange = (tab: 'code' | 'preview') => {
    setPreviewVisible(tab === 'preview');
  };

  const handleGenerationStart = () => {
    setGeneratedCode("");
    setIsGenerating(true);
    setIsError(false);
    setPreviewVisible(false);
  };

  const handleGenerationError = () => {
    setIsError(true);
    setIsGenerating(false);
  };

  const handleGenerationComplete = () => {
    setIsGenerating(false);
    setTimeout(() => {
      setPreviewVisible(true);
    }, 500);
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
                
                <ChatPanel
                  onCodeGenerated={setGeneratedCode}
                  onGenerationStart={handleGenerationStart}
                  onGenerationError={handleGenerationError}
                  onGenerationComplete={handleGenerationComplete}
                />
              </div>
            </div>
            
            <div className="w-full lg:w-1/2">
              <div className="bg-white rounded-xl shadow-xl overflow-hidden h-full flex flex-col">
                <TabButtons
                  activeTab={previewVisible ? 'preview' : 'code'}
                  hasCode={!!generatedCode}
                  isGenerating={isGenerating}
                  onTabChange={handleTabChange}
                />
                
                <div className="flex-grow">
                  {!previewVisible ? (
                    <CodeViewer 
                      code={generatedCode}
                      isGenerating={isGenerating}
                      isError={isError}
                    />
                  ) : (
                    <PreviewPanel>
                      <SamplePreview />
                    </PreviewPanel>
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
