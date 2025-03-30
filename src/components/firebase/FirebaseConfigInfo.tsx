
import React from 'react';
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Database } from "lucide-react";

const FirebaseConfigInfo: React.FC = () => {
  return (
    <div className="p-6 rounded-lg bg-white/5 backdrop-blur border border-white/10">
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-2">Firebase Sync Configuration</h3>
        <p className="text-white/70 text-sm mb-4">
          Ensure your Firebase configuration is set in your environment variables for this feature to work properly.
        </p>
        <div className="aspect-w-16 aspect-h-9 max-w-md mx-auto">
          <AspectRatio ratio={16 / 9}>
            <div className="h-full w-full flex items-center justify-center bg-black/30 rounded-lg">
              <Database className="h-12 w-12 text-[#F2FF44]" />
            </div>
          </AspectRatio>
        </div>
      </div>
    </div>
  );
};

export default FirebaseConfigInfo;
