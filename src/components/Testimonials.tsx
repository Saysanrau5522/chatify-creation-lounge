
import React from "react";
import { Quote } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  delay: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, author, role, delay }) => (
  <ScrollReveal
    animation="scale-up"
    delay={delay}
    className="bg-white rounded-2xl p-8 card-shadow flex flex-col"
  >
    <div className="text-primary mb-6">
      <Quote className="h-8 w-8 opacity-50" />
    </div>
    <p className="text-foreground/80 text-lg italic mb-6">{quote}</p>
    <div className="mt-auto">
      <h4 className="font-semibold text-foreground">{author}</h4>
      <p className="text-foreground/60 text-sm">{role}</p>
    </div>
  </ScrollReveal>
);

const Testimonials = () => {
  return (
    <section className="py-24 px-6 md:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal animation="slide-up">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Loved by creators worldwide</h2>
            <p className="text-foreground/70 text-lg">
              See what people are building with our AI-powered platform
            </p>
          </div>
        </ScrollReveal>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <TestimonialCard
            quote="I went from idea to working prototype in under an hour. This is revolutionary for non-technical founders like me."
            author="Sarah Johnson"
            role="Startup Founder"
            delay={100}
          />
          <TestimonialCard
            quote="As a designer, I've always struggled with implementing my ideas. This platform bridges the gap between design and development."
            author="Michael Chen"
            role="UX Designer"
            delay={200}
          />
          <TestimonialCard
            quote="My team uses this to quickly test new features before committing to development resources. It's become an essential part of our workflow."
            author="Priya Patel"
            role="Product Manager"
            delay={300}
          />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
