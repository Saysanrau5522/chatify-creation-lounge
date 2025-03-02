
import React from "react";
import { ArrowRight, Sparkles, Play } from "lucide-react";
import PrimaryButton from "./ui/PrimaryButton";
import ScrollReveal from "./ScrollReveal";

const Hero = () => {
  return (
    <section className="pt-32 pb-20 px-6 md:px-10 lg:px-20 min-h-screen flex flex-col justify-center relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-primary/5 rounded-full blur-3xl -z-10"></div>
      
      <div className="max-w-7xl mx-auto w-full relative">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <ScrollReveal animation="slide-up">
            <div className="inline-flex items-center px-3 py-1.5 mb-8 bg-primary/5 text-primary rounded-full text-sm font-medium backdrop-blur-sm border border-primary/10">
              <Sparkles className="h-4 w-4 mr-1.5" />
              <span>Introducing Lovable.dev</span>
            </div>
          </ScrollReveal>
          
          <ScrollReveal animation="slide-up" delay={100}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Build your software with a simple conversation
            </h1>
          </ScrollReveal>
          
          <ScrollReveal animation="slide-up" delay={200}>
            <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mb-10">
              Create, modify, and deploy web applications through a natural language chat interface. 
              No coding required. Just describe what you want, and watch it come to life.
            </p>
          </ScrollReveal>
          
          <ScrollReveal animation="slide-up" delay={300}>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <PrimaryButton 
                size="lg" 
                icon={<ArrowRight className="h-5 w-5" />} 
                iconPosition="right"
                glowing
              >
                Start building for free
              </PrimaryButton>
              <PrimaryButton 
                size="lg" 
                variant="outline"
                icon={<Play className="h-5 w-5" />}
                iconPosition="left"
              >
                Watch demo
              </PrimaryButton>
            </div>
          </ScrollReveal>
          
          <ScrollReveal animation="fade-in" delay={600} className="mt-16 w-full">
            <div className="relative w-full max-w-5xl mx-auto">
              <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none z-10"></div>
              <div className="rounded-xl overflow-hidden shadow-xl transition-all duration-500 hover:shadow-2xl">
                <div className="relative aspect-video bg-secondary">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="px-5 py-3 rounded-lg glass backdrop-blur-md border border-white/10 shadow-lg">
                      <div className="flex items-center space-x-2">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Play className="h-4 w-4 text-primary" />
                        </div>
                        <p className="text-foreground font-medium">Watch how it works</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white border-t border-border p-4">
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-[#ff5f57] mr-2"></div>
                    <div className="h-3 w-3 rounded-full bg-[#febc2e] mr-2"></div>
                    <div className="h-3 w-3 rounded-full bg-[#28c840]"></div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default Hero;
