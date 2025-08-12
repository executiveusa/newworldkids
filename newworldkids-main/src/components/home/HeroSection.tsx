
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-float">
            Empowering Kids Through
            <span className="bg-gradient-to-r from-[#F2FF44] to-[#8989DE] text-transparent bg-clip-text">
              {" "}Web3{" "}
            </span>
            Education
          </h1>
          <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
            Join us in creating a future where every child has access to cutting-edge technology 
            education and can make a positive impact through blockchain initiatives.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/impact-projects">
              <Button size="lg" className="bg-[#F2FF44] text-black hover:bg-[#E2EF34]">
                View Impact Projects
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/blockchain-tracker">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-[#F2FF44] text-[#F2FF44] hover:bg-[#F2FF44] hover:text-black"
              >
                Track Impact
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_40%_at_50%_60%,rgba(242,255,68,0.13),transparent)]" />
    </div>
  );
};

export default HeroSection;
