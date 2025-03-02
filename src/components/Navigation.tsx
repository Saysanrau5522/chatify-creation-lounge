
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import PrimaryButton from "./ui/PrimaryButton";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6 md:px-10 lg:px-20",
        isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <h1 className="text-2xl font-semibold tracking-tight">lovable</h1>
          <span className="text-primary">.dev</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="#features" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
            Features
          </Link>
          <Link to="#how-it-works" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
            How it works
          </Link>
          <Link to="#pricing" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
            Pricing
          </Link>
          <Link to="#faq" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
            FAQ
          </Link>
        </nav>
        
        <div className="hidden md:flex items-center space-x-4">
          <PrimaryButton variant="outline">
            Log in
          </PrimaryButton>
          <PrimaryButton>
            Get started
          </PrimaryButton>
        </div>
        
        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-foreground p-2"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-x-0 top-[72px] p-6 md:hidden bg-white shadow-lg transition-all duration-300 ease-in-out transform",
          isMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        )}
      >
        <nav className="flex flex-col space-y-6">
          <Link 
            to="#features" 
            className="text-base font-medium py-2 border-b border-border"
            onClick={() => setIsMenuOpen(false)}
          >
            Features
          </Link>
          <Link 
            to="#how-it-works" 
            className="text-base font-medium py-2 border-b border-border"
            onClick={() => setIsMenuOpen(false)}
          >
            How it works
          </Link>
          <Link 
            to="#pricing" 
            className="text-base font-medium py-2 border-b border-border"
            onClick={() => setIsMenuOpen(false)}
          >
            Pricing
          </Link>
          <Link 
            to="#faq" 
            className="text-base font-medium py-2 border-b border-border"
            onClick={() => setIsMenuOpen(false)}
          >
            FAQ
          </Link>
          <div className="pt-4 flex flex-col space-y-4">
            <PrimaryButton variant="outline" fullWidth>
              Log in
            </PrimaryButton>
            <PrimaryButton fullWidth>
              Get started
            </PrimaryButton>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navigation;
