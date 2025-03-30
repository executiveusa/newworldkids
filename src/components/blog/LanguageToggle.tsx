
import React from 'react';
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();
  
  return (
    <div className="flex items-center space-x-2">
      <Globe className="h-4 w-4 text-white/70" />
      <div className="flex rounded-md overflow-hidden">
        <Button
          variant="ghost"
          size="sm"
          className={`px-3 py-1 ${language === 'en' ? 'bg-[#F2FF44] text-black' : 'text-white/70'}`}
          onClick={() => setLanguage('en')}
        >
          EN
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className={`px-3 py-1 ${language === 'es' ? 'bg-[#F2FF44] text-black' : 'text-white/70'}`}
          onClick={() => setLanguage('es')}
        >
          ES
        </Button>
      </div>
    </div>
  );
};

export default LanguageToggle;
