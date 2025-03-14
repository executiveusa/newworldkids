
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Info, Bird, Paw, Fish } from 'lucide-react';

const Animated3DAnimals = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Animated 3D Animals</h1>
        <p className="text-xl text-white/80 max-w-2xl mx-auto">
          Explore interactive 3D models of endangered species that your donations help protect.
        </p>
      </div>

      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="h-[400px] bg-gradient-to-b from-blue-900/30 to-green-900/30 rounded-lg flex items-center justify-center">
            <div className="text-center p-8">
              <Bird className="h-20 w-20 mx-auto mb-4 text-[#F2FF44]" />
              <h3 className="text-2xl font-bold mb-2">3D Animal Viewer</h3>
              <p className="text-white/60 mb-4">Interactive 3D animal models will be displayed here</p>
              <Button className="bg-[#F2FF44] text-black hover:bg-[#E2EF34]">
                Load 3D Models
              </Button>
            </div>
          </div>

          <Card className="glass-effect">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Info className="mr-2 h-5 w-5 text-[#F2FF44]" />
                Animal Information
              </CardTitle>
              <CardDescription>
                Learn about this endangered species
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-bold text-xl">Rainforest Parrot</h3>
                <p className="text-white/80">
                  The Rainforest Parrot is a colorful bird native to the Amazon rainforest. These birds are known for their intelligence and ability to mimic human speech.
                </p>
              </div>
              
              <div className="space-y-1">
                <p className="font-medium">Conservation Status</p>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                  <p>Endangered</p>
                </div>
              </div>
              
              <div className="space-y-1">
                <p className="font-medium">Habitat</p>
                <p className="text-white/80">Tropical and subtropical rainforests</p>
              </div>
              
              <div className="space-y-1">
                <p className="font-medium">Threats</p>
                <ul className="list-disc pl-5 text-white/80 space-y-1">
                  <li>Deforestation</li>
                  <li>Illegal wildlife trade</li>
                  <li>Climate change</li>
                </ul>
              </div>
              
              <div className="bg-white/5 p-4 rounded-lg">
                <p className="text-sm text-white/80">
                  Your donations help fund conservation efforts to protect the habitats of these endangered species and support breeding programs.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['Parrot', 'Tiger', 'Elephant', 'Gorilla', 'Panda', 'Turtle', 'Whale', 'Jaguar'].map((animal, index) => (
            <Button 
              key={index} 
              variant="outline" 
              className="h-auto py-4 flex flex-col items-center gap-2 hover:bg-white/10"
            >
              {index % 2 === 0 ? (
                <Bird className="h-8 w-8 text-[#F2FF44]" />
              ) : index % 3 === 0 ? (
                <Fish className="h-8 w-8 text-[#F2FF44]" />
              ) : (
                <Paw className="h-8 w-8 text-[#F2FF44]" />
              )}
              <span>{animal}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Animated3DAnimals;
