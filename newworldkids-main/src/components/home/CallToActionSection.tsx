
import { Button } from "@/components/ui/button";
import { ArrowRight, Wallet } from "lucide-react";
import { Link } from "react-router-dom";

const CallToActionSection = () => {
  return (
    <div className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent to-black/30" />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-effect rounded-3xl p-10 md:p-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Join our community of educators, sponsors, and students building a brighter future through blockchain education.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/impact-projects">
              <Button size="lg" className="bg-[#F2FF44] text-black hover:bg-[#E2EF34] text-lg px-8">
                Browse Projects
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/blockchain-tracker">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 text-lg px-8"
              >
                <Wallet className="mr-2 h-5 w-5" />
                Connect Wallet
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallToActionSection;
