
import React from "react";
import { MessageSquareText, Wand2, Code, Rocket, RocketIcon, RefreshCw, PencilRuler } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
  className?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, delay, className }) => (
  <ScrollReveal 
    animation="scale-up" 
    delay={delay}
    className={cn("bg-white rounded-2xl p-6 card-shadow", className)}
  >
    <div className="h-12 w-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-5">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-3">{title}</h3>
    <p className="text-foreground/70">{description}</p>
  </ScrollReveal>
);

const Features = () => {
  return (
    <section id="features" className="py-20 px-6 md:px-10 lg:px-20 bg-secondary">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal animation="slide-up">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Designed for simplicity and power</h2>
            <p className="text-foreground/70 text-lg">
              Turn your ideas into reality with these powerful features
            </p>
          </div>
        </ScrollReveal>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            icon={<MessageSquareText className="h-6 w-6" />}
            title="AI Chat Interface"
            description="Describe your vision in natural language and watch as it transforms into functional code in real-time."
            delay={100}
          />
          <FeatureCard
            icon={<Code className="h-6 w-6" />}
            title="Full Stack Development"
            description="Generate complete frontends and backends with just a conversation. No coding knowledge required."
            delay={200}
          />
          <FeatureCard
            icon={<Wand2 className="h-6 w-6" />}
            title="Intelligent Edits"
            description="Request changes to your app and watch as the AI instantly implements them while maintaining context."
            delay={300}
          />
          <FeatureCard
            icon={<RefreshCw className="h-6 w-6" />}
            title="Iterative Refinement"
            description="Continuously improve your application through natural conversations with the AI assistant."
            delay={400}
          />
          <FeatureCard
            icon={<PencilRuler className="h-6 w-6" />}
            title="Custom Design"
            description="Create beautiful, responsive interfaces with modern design principles built in by default."
            delay={500}
          />
          <FeatureCard
            icon={<Rocket className="h-6 w-6" />}
            title="One-Click Deploy"
            description="Deploy your application to the web with a single click, ready to share with the world."
            delay={600}
          />
        </div>
      </div>
    </section>
  );
};

export default Features;
