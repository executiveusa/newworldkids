
import EveryOrgDonate from "@/components/EveryOrgDonate";
import { Github, Twitter, Linkedin, Heart } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="py-20 px-4 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-accent/5 backdrop-blur-3xl"></div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white">New World Kids</h3>
            <p className="text-white/60">
              Empowering the next generation through Web3 education and blockchain impact initiatives.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="hover:bg-white/10">
                <Twitter className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-white/10">
                <Github className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-white/10">
                <Linkedin className="w-5 h-5" />
              </Button>
            </div>
            <EveryOrgDonate
              className="inline-flex items-center justify-center rounded-md bg-[#F2FF44] px-5 py-2 text-black transition hover:bg-[#E2EF34]"
              aria-label="Donate via Every.org"
              target="_blank"
              rel="noreferrer"
            />
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Educational Resources</h4>
            <ul className="space-y-2">
              <li><Link to="/blockchain-basics" className="text-white/60 hover:text-white transition-colors">Blockchain Basics</Link></li>
              <li><Link to="/web3-curriculum" className="text-white/60 hover:text-white transition-colors">Web3 Curriculum</Link></li>
              <li><Link to="/ai-resources" className="text-white/60 hover:text-white transition-colors">AI Learning Tools</Link></li>
              <li><Link to="/parent-guides" className="text-white/60 hover:text-white transition-colors">Parent Guides</Link></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Get Involved</h4>
            <ul className="space-y-2">
              <li><Link to="/impact-projects" className="text-white/60 hover:text-white transition-colors">Impact Projects</Link></li>
              <li><Link to="/donate" className="text-white/60 hover:text-white transition-colors">Donate</Link></li>
              <li><Link to="/volunteer" className="text-white/60 hover:text-white transition-colors">Volunteer</Link></li>
              <li><Link to="/corporate-partnerships" className="text-white/60 hover:text-white transition-colors">Corporate Partnerships</Link></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">About Us</h4>
            <ul className="space-y-2">
              <li><Link to="/mission" className="text-white/60 hover:text-white transition-colors">Our Mission</Link></li>
              <li><Link to="/team" className="text-white/60 hover:text-white transition-colors">Team</Link></li>
              <li><Link to="/blog" className="text-white/60 hover:text-white transition-colors">Blog</Link></li>
              <li><Link to="/contact" className="text-white/60 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-center text-white/60 flex items-center justify-center">
            © 2024 New World Kids. Made with 
            <Heart className="h-4 w-4 mx-1 text-[#F2FF44]" /> 
            for a better future.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
