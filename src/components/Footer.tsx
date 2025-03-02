
import React from "react";
import { Link } from "react-router-dom";
import { Github, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-border py-12 px-6 md:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6 lg:gap-12 mb-10">
          <div className="col-span-1">
            <Link to="/" className="flex items-center mb-4">
              <h2 className="text-xl font-semibold tracking-tight">lovable</h2>
              <span className="text-primary">.dev</span>
            </Link>
            <p className="text-sm text-foreground/70 mb-6">
              Build web apps through conversation. No coding required.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-foreground/60 hover:text-foreground">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-foreground/60 hover:text-foreground">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-foreground/60 hover:text-foreground">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-medium mb-4">Product</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/features" className="text-sm text-foreground/70 hover:text-foreground">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-sm text-foreground/70 hover:text-foreground">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/roadmap" className="text-sm text-foreground/70 hover:text-foreground">
                  Roadmap
                </Link>
              </li>
              <li>
                <Link to="/changelog" className="text-sm text-foreground/70 hover:text-foreground">
                  Changelog
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-medium mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/blog" className="text-sm text-foreground/70 hover:text-foreground">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/docs" className="text-sm text-foreground/70 hover:text-foreground">
                  Documentation
                </Link>
              </li>
              <li>
                <Link to="/guides" className="text-sm text-foreground/70 hover:text-foreground">
                  Guides
                </Link>
              </li>
              <li>
                <Link to="/support" className="text-sm text-foreground/70 hover:text-foreground">
                  Help Center
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-medium mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-sm text-foreground/70 hover:text-foreground">
                  About
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-sm text-foreground/70 hover:text-foreground">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-foreground/70 hover:text-foreground">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/legal" className="text-sm text-foreground/70 hover:text-foreground">
                  Legal
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-foreground/60 mb-4 md:mb-0">
            © {new Date().getFullYear()} Lovable.dev. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link to="/privacy" className="text-sm text-foreground/60 hover:text-foreground">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-sm text-foreground/60 hover:text-foreground">
              Terms of Service
            </Link>
            <Link to="/cookies" className="text-sm text-foreground/60 hover:text-foreground">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
